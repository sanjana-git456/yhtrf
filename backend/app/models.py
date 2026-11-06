from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, Float, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    bio = Column(Text, nullable=True)
    referral_code = Column(String, unique=True)
    points = Column(Integer, default=0)

    projects = relationship("Project", back_populates="maker")
    workshops = relationship("Workshop", back_populates="host")
    purchases = relationship("WorkshopPurchase", back_populates="user")

class Project(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(Text)
    image_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    maker_id = Column(Integer, ForeignKey("users.id"))
    
    maker = relationship("User", back_populates="projects")

class Workshop(Base):
    __tablename__ = "workshops"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(Text)
    price = Column(Float, default=0.0)
    scheduled_at = Column(DateTime)
    meeting_link = Column(String)
    host_id = Column(Integer, ForeignKey("users.id"))

    host = relationship("User", back_populates="workshops")
    attendees = relationship("WorkshopPurchase", back_populates="workshop")

class WorkshopPurchase(Base):
    __tablename__ = "workshop_purchases"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    workshop_id = Column(Integer, ForeignKey("workshops.id"))
    purchased_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="purchases")
    workshop = relationship("Workshop", back_populates="attendees")

class Workspace(Base):
    __tablename__ = "workspaces"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    shared_notes = Column(Text, default="")
    owner_id = Column(Integer, ForeignKey("users.id"))