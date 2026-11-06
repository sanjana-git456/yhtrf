from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import crud, schemas, database, dependencies

router = APIRouter(prefix="/projects", tags=["projects"])

@router.get("/", response_model=List[schemas.ProjectOut])
def read_projects(db: Session = Depends(database.get_db)):
    return crud.get_projects(db)

@router.post("/", response_model=schemas.ProjectOut)
def create_project(project: schemas.ProjectCreate, db: Session = Depends(database.get_db), current_user = Depends(dependencies.get_current_user)):
    return crud.create_project(db, project, current_user.id)