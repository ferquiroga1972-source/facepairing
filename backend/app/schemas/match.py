from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class MatchProfile(BaseModel):
    user_id: int
    full_name: Optional[str]
    similarity_score: float

class MatchOut(BaseModel):
    matches: list[MatchProfile]

class MatchRequest(BaseModel):
    target_user_id: int
