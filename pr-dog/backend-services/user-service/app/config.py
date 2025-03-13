import os
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # General settings
    APP_NAME: str = "User Service"
    DEBUG: bool = True

    MONGODB_HOST: str = os.environ.get(
        "MONGODB_HOST", "mongodb+srv://username:password@your-cluster.mongodb.net"
    )
    MONGODB_DB: str = os.environ.get("MONGODB_DB", "user_service")


settings = Settings()
MONGODB_HOST = settings.MONGODB_HOST
MONGODB_DB = settings.MONGODB_DB
