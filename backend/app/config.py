import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "CraftCircle"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "super-secret-craft-key-123")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./craft_circle.db")
    CORS_ORIGINS: str = os.getenv("CORS_ORIGINS", "*")
    SEED_DEMO_DATA: bool = os.getenv("SEED_DEMO_DATA", "false").lower() == "true"

settings = Settings()