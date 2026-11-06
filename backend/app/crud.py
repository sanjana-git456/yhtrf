from sqlalchemy.orm import Session
from . import models, schemas, security
import uuid

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = security.get_password_hash(user.password)
    db_user = models.User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password,
        referral_code=str(uuid.uuid4())[:8]
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_projects(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Project).order_by(models.Project.created_at.desc()).offset(skip).limit(limit).all()

def create_project(db: Session, project: schemas.ProjectCreate, user_id: int):
    db_project = models.Project(**project.model_dump(), maker_id=user_id)
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

def get_workshops(db: Session):
    return db.query(models.Workshop).all()

def create_workshop(db: Session, workshop: schemas.WorkshopCreate, user_id: int):
    db_workshop = models.Workshop(**workshop.model_dump(), host_id=user_id)
    db.add(db_workshop)
    db.commit()
    db.refresh(db_workshop)
    return db_workshop

def purchase_workshop(db: Session, user_id: int, workshop_id: int):
    db_purchase = models.WorkshopPurchase(user_id=user_id, workshop_id=workshop_id)
    db.add(db_purchase)
    db.commit()
    return db_purchase

def get_workspaces(db: Session, user_id: int):
    return db.query(models.Workspace).filter(models.Workspace.owner_id == user_id).all()

def create_workspace(db: Session, name: str, user_id: int):
    db_ws = models.Workspace(name=name, owner_id=user_id)
    db.add(db_ws)
    db.commit()
    db.refresh(db_ws)
    return db_ws