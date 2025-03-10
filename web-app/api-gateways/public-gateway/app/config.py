import os
from typing import List
from pydantic import AnyHttpUrl
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # API settings
    API_PREFIX: str = "/api/v1"
    DEBUG: bool = False

    # CORS settings:
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://minikube.local"]

    # Service URLs
    USER_SERVICE_URL: str = "http://user-service:8000"

    # Firebase Authentication
    FIREBASE_SERVICE_ACCOUNT_PATH: str = "./firebase-service-account.json"

    # Rate limiting
    RATE_LIMIT_ENABLED: bool = True
    RATE_LIMIT_DEFAULT: int = 100  # requests per minute


settings = Settings()
