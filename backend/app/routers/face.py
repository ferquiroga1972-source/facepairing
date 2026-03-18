import json
import os
import tempfile
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from app.dependencies import get_db, get_current_user
from app.models.user import User
from app.models.scan import FaceScan
from app.schemas.scan import ScanResult
from app.services.face_analysis import analyze_face
from app.services.ai_diagnostic import generate_diagnostic
from app.services.storage import upload_image_to_s3

router = APIRouter()

@router.post("/scan", response_model=ScanResult)
async def scan_face(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    # Save to temp file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name

    try:
        attributes, embedding = analyze_face(tmp_path)
        diagnostic = generate_diagnostic(attributes)
        try:
            image_url = upload_image_to_s3(tmp_path, file.filename or "face.jpg")
        except Exception:
            image_url = f"/local/scans/{os.path.basename(tmp_path)}"
    except Exception as e:
        raise HTTPException(status_code=422, detail=f"Face analysis failed: {str(e)}")
    finally:
        os.unlink(tmp_path)

    # Save embedding to user profile
    current_user.face_embedding = json.dumps(embedding)
    db.commit()

    # Save scan record
    scan = FaceScan(
        user_id=current_user.id,
        image_url=image_url,
        attributes=json.dumps(attributes),
        diagnostic=diagnostic,
    )
    db.add(scan)
    db.commit()
    db.refresh(scan)

    return ScanResult(
        image_url=image_url,
        attributes=attributes,
        diagnostic=diagnostic,
        scan_id=scan.id,
    )
