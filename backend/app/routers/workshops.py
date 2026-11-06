from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import crud, schemas, database, dependencies

router = APIRouter(prefix="/workshops", tags=["workshops"])

@router.get("/", response_model=List[schemas.WorkshopOut])
def read_workshops(db: Session = Depends(database.get_db)):
    return crud.get_workshops(db)

@router.post("/", response_model=schemas.WorkshopOut)
def create_workshop(workshop: schemas.WorkshopCreate, db: Session = Depends(database.get_db), current_user = Depends(dependencies.get_current_user)):
    return crud.create_workshop(db, workshop, current_user.id)

@router.post("/{workshop_id}/join")
def join_workshop(workshop_id: int, db: Session = Depends(database.get_db), current_user = Depends(dependencies.get_current_user)):
    crud.purchase_workshop(db, current_user.id, workshop_id)
    return {"message": "Joined successfully"}