from sqlalchemy import Column, Integer, String, Float, DateTime
from database import Base

class TidePrediction(Base):
    __tablename__ = "tide_predictions"

    id = Column(Integer, primary_key=True, index=True)
    station_id = Column(String, index=True)
    timestamp = Column(DateTime)
    height_m = Column(Float)
    source = Column(String)
