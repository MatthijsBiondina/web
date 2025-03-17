import os
from typing import List
from pydantic import AnyHttpUrl
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # API settings
    API_PREFIX: str = "/api/v1"
    DEBUG: bool = False

    # CORS settings:
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://minikube.local:3000"]



    # Service URLs
    AUTHENTICATION_SERVICE_URL: str = "http://authentication-service"
    USER_SERVICE_URL: str = "http://user-service"


    # Rate limiting
    RATE_LIMIT_ENABLED: bool = True
    RATE_LIMIT_DEFAULT: int = 100  # requests per minute


settings = Settings()
