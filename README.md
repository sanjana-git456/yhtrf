# CraftCircle

A privacy-first web platform for makers, DIY hobbyists, and artisans.

## Tech Stack
- **Backend:** FastAPI (Python), SQLAlchemy, PostgreSQL
- **Frontend:** React (Vite), Tailwind CSS, Lucide Icons
- **Auth:** JWT-based authentication

## Setup

### Backend
1. `cd backend`
2. `pip install -r requirements.txt`
3. Set up `.env` with your `DATABASE_URL`
4. `uvicorn app.main:app --reload`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## Features
- **Showcase:** Post your DIY projects with images and step-by-step guides.
- **Workshops:** Host or join live build sessions with integrated ticket simulation.
- **Dashboard:** Track your projects, points, and referral status.
- **AI Assist:** Generate project templates for common DIY tasks.