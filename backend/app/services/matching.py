import json
from sqlalchemy.orm import Session
from app.models.user import User
from app.services.face_analysis import cosine_similarity
from typing import List, Dict

def find_similar_faces(current_user_id: int, db: Session, top_k: int = 10) -> List[Dict]:
    """
    Find users with the most similar face embeddings to the current user.
    """
    current_user = db.query(User).filter(User.id == current_user_id).first()
    if not current_user or not current_user.face_embedding:
        return []

    current_embedding = json.loads(current_user.face_embedding)

    # Get all other users with embeddings
    other_users = db.query(User).filter(
        User.id != current_user_id,
        User.face_embedding.isnot(None),
        User.is_active == True
    ).all()

    scored = []
    for user in other_users:
        try:
            other_embedding = json.loads(user.face_embedding)
            score = cosine_similarity(current_embedding, other_embedding)
            scored.append({
                "user_id": user.id,
                "full_name": user.full_name,
                "similarity_score": round(score, 4)
            })
        except Exception:
            continue

    scored.sort(key=lambda x: x["similarity_score"], reverse=True)
    return scored[:top_k]
