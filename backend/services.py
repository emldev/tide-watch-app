import httpx
from datetime import datetime
from sqlalchemy.orm import Session
from typing import List

import models, schemas

OPEN_METEO_URL = "https://marine-api.open-meteo.com/v1/marine"

def get_tides(db: Session, lat: float, lon: float) -> List[models.TidePrediction]:
    # 1. Define Station ID
    station_id = f"{lat:.1f}_{lon:.1f}"
    
    # 2. Check DB
    now = datetime.utcnow()
    existing_predictions = db.query(models.TidePrediction).filter(
        models.TidePrediction.station_id == station_id,
        models.TidePrediction.timestamp > now
    ).all()
    
    # 3. If data exists (count > 24), return it
    if len(existing_predictions) > 24:
        return existing_predictions
        
    # 4. If no data, fetch from Open-Meteo
    params = {
        "latitude": lat,
        "longitude": lon,
        "hourly": "sea_level_height_msl",
        "timezone": "auto",
        "forecast_days": 1
    }
    
    try:
        # Using httpx synchronously as requested
        with httpx.Client() as client:
            response = client.get(OPEN_METEO_URL, params=params)
            response.raise_for_status()
            data = response.json()
            
        hourly_data = data.get("hourly", {})
        times = hourly_data.get("time", [])
        heights = hourly_data.get("sea_level_height_msl", [])
        
        new_predictions = []
        
        for time_str, height in zip(times, heights):
            # Open-Meteo returns ISO strings like "2024-01-01T00:00"
            timestamp = datetime.fromisoformat(time_str)
            
            # Applying estimated Offset for Sydney LAT (Chart Datum) vs MSL
            if height is not None:
                calibrated_height = height + 0.8
            else:
                calibrated_height = 0.0 # Fallback should not happen often
            
            prediction = models.TidePrediction(
                station_id=station_id,
                timestamp=timestamp,
                height_m=calibrated_height,
                source="Open-Meteo"
            )
            db.add(prediction)
            new_predictions.append(prediction)
            
        db.commit()
        return new_predictions
        
    except Exception as e:
        print(f"Error fetching tide data: {e}")
        # In case of error, return empty list or handle gracefully
        # For now, suppressing error to avoid crashing, but could raise HTTPException
        return []
