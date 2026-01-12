from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
import models, database, schemas, services

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "tide-backend"}

@app.get("/tides", response_model=schemas.TideResponse)
async def get_tides(lat: float, lon: float, db: Session = Depends(database.get_db)):
    data = services.get_tides(db, lat, lon)
    
    station_id = f"{lat:.1f}_{lon:.1f}"
    
    return {
        "meta": {"station_id": station_id, "lat": lat, "lon": lon},
        "data": data
    }
