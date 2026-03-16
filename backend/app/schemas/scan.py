from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Dict, Any

class ScanResult(BaseModel):
    image_url: str
    attributes: Dict[str, Any]
    diagnostic: str
    scan_id: int

class DiagnosticOut(BaseModel):
    id: int
    image_url: str
    attributes: Dict[str, Any]
    diagnostic: str
    created_at: datetime

    class Config:
        from_attributes = True
