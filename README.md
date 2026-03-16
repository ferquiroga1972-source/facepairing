# FacePairing

Face analysis + personality diagnostic + face-similarity matching app.

## Features
- **Face Scan** — Upload or capture a photo; AI extracts facial attributes via DeepFace
- **Personality Diagnostic** — Claude AI generates a detailed physiognomy-based personality report
- **Face Matching** — Find users with similar facial embeddings (premium, paid via Stripe)

## Stack
| Layer | Tech |
|---|---|
| Backend | Python + FastAPI |
| Face Analysis | DeepFace + OpenCV |
| AI Diagnostic | Anthropic Claude API |
| Matching | Cosine similarity on face embeddings |
| Web | React + TypeScript + Vite |
| Mobile | React Native + Expo |
| Database | PostgreSQL |
| Payments | Stripe |
| Storage | AWS S3 |

## Setup

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env       # Fill in your keys
uvicorn main:app --reload
```

### Web
```bash
cd web
npm install
cp .env.example .env
npm run dev
```

### Mobile
```bash
cd mobile
npm install
npx expo start
```

## Environment Variables

### Backend (.env)
- `DATABASE_URL` — PostgreSQL connection string
- `SECRET_KEY` — JWT secret
- `ANTHROPIC_API_KEY` — From console.anthropic.com
- `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET` — From Stripe dashboard
- `AWS_ACCESS_KEY_ID` + `AWS_SECRET_ACCESS_KEY` + `S3_BUCKET_NAME` — For image storage
- `FRONTEND_URL` — Web app URL (for CORS + Stripe redirects)

### Web (.env)
- `VITE_API_URL` — Backend URL
- `VITE_STRIPE_PUBLISHABLE_KEY` — Stripe publishable key

## Project Structure
```
facepairing/
├── backend/          FastAPI API
│   ├── app/
│   │   ├── models/   SQLAlchemy models
│   │   ├── routers/  API routes
│   │   ├── schemas/  Pydantic schemas
│   │   └── services/ Business logic
│   └── main.py
├── web/              React web app (facepairing.com)
│   └── src/
│       ├── api/      API client layer
│       ├── components/
│       └── pages/
├── mobile/           React Native + Expo
│   └── src/screens/
└── shared/types/     Shared TypeScript interfaces
```
