from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class FaceScan(Base):
    __tablename__ = "face_scans"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    image_url = Column(String, nullable=False)
    attributes = Column(Text)   # JSON string of face attributes
    diagnostic = Column(Text)   # AI-generated personality diagnostic
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="scans")
