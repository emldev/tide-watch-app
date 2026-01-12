from sqlalchemy.orm import Session
from datetime import datetime
import models, schemas

def get_tides_for_station(db: Session, station_id: str, start_time: datetime = None):
    query = db.query(models.TidePrediction).filter(models.TidePrediction.station_id == station_id)
    if start_time:
        query = query.filter(models.TidePrediction.timestamp >= start_time)
    return query.all()

def create_tide_prediction(db: Session, prediction: schemas.TidePredictionCreate):
    db_prediction = models.TidePrediction(**prediction.model_dump())
    db.add(db_prediction)
    db.commit()
    db.refresh(db_prediction)
    return db_prediction
