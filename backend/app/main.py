from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base, SessionLocal
from .config import settings
from .routers import auth, projects, workshops
from . import models, crud, schemas, dependencies
from datetime import datetime

Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.PROJECT_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.CORS_ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api")
app.include_router(projects.router, prefix="/api")
app.include_router(workshops.router, prefix="/api")

@app.get("/api/auth/me", response_model=schemas.UserOut)
def get_me(user = Depends(dependencies.get_current_user)):
    return user

@app.get("/api/dashboard/stats", response_model=schemas.DashboardStats)
def get_stats(db=Depends(SessionLocal), user=Depends(dependencies.get_current_user)):
    project_count = db.query(models.Project).filter(models.Project.maker_id == user.id).count()
    workshop_count = db.query(models.Workshop).filter(models.Workshop.host_id == user.id).count()
    return {"project_count": project_count, "workshop_count": workshop_count, "points": user.points}

if settings.SEED_DEMO_DATA:
    db = SessionLocal()
    if not db.query(models.User).first():
        # Seed logic here if needed
        pass
    db.close()