from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.dependencies import get_db, get_current_user
from app.models.user import User
from app.schemas.match import MatchOut
from app.services.matching import find_similar_faces

router = APIRouter()

@router.get("/find", response_model=MatchOut)
def find_matches(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if not current_user.is_premium:
        raise HTTPException(status_code=403, detail="Premium subscription required to access matches")
    if not current_user.face_embedding:
        raise HTTPException(status_code=400, detail="Please scan your face first")

    matches = find_similar_faces(current_user.id, db)
    return MatchOut(matches=matches)

@router.post("/contact")
def contact_match(
    target_user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if not current_user.is_premium:
        raise HTTPException(status_code=403, detail="Premium subscription required")
    target = db.query(User).filter(User.id == target_user_id).first()
    if not target:
        raise HTTPException(status_code=404, detail="User not found")
    # Future: implement messaging/contact system
    return {"message": f"Contact request sent to {target.full_name or target.email}"}
