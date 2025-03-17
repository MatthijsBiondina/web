import os
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # General settings
    APP_NAME: str = "Authentication Service"
    DEBUG: bool = True


settings = Settings()
