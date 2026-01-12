from pydantic import BaseModel
from datetime import datetime
from typing import List, Dict, Any

class TidePredictionBase(BaseModel):
    timestamp: datetime
    height_m: float

class TidePredictionCreate(TidePredictionBase):
    station_id: str
    source: str

class TidePrediction(TidePredictionBase):
    id: int
    station_id: str
    source: str

    class Config:
        from_attributes = True

class TideResponse(BaseModel):
    meta: Dict[str, Any]
    data: List[TidePredictionBase]
