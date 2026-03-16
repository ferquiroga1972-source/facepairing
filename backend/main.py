from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import auth, face, matching, payments
from app.database import engine
from app.models import user, scan, match

user.Base.metadata.create_all(bind=engine)
scan.Base.metadata.create_all(bind=engine)
match.Base.metadata.create_all(bind=engine)

app = FastAPI(title="FacePairing API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL, "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(face.router, prefix="/face", tags=["face"])
app.include_router(matching.router, prefix="/matching", tags=["matching"])
app.include_router(payments.router, prefix="/payments", tags=["payments"])

@app.get("/health")
def health():
    return {"status": "ok"}
