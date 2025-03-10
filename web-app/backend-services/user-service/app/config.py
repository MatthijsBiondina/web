from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # General settings
    APP_NAME: str = "User Service"
    DEBUG: bool = True
    
    # Database settings (would be used in a real implementation)
    DATABASE_URL: str = "mongodb://localhost:27017/user_db"
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()