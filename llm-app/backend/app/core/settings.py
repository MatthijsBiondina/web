# app/core/settings.py
from pydantic import Field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    mongodb_uri: str = Field(..., env="MONGODB_URI")
    mollie_api_key: str = Field(..., env="MOLLIE_API_KEY")
    frontend_url: str = Field(..., env="FRONTEND_URL")
    ngrok_authtoken: str = Field(..., env="NGROK_AUTHTOKEN")
    uchat_api_key: str = Field(..., env="UCHAT_API_KEY")
    openai_api_key: str = Field(..., env="OPENAI_API_KEY")

    mail_server: str = Field(..., env="MAIL_SERVER")
    mail_port: int = Field(..., env="MAIL_PORT")
    mail_use_tls: bool = Field(..., env="MAIL_USE_TLS")
    mail_use_ssl: bool = Field(..., env="MAIL_USE_SSL")
    mail_username: str | None = Field(None, env="MAIL_USERNAME")
    mail_password: str | None = Field(None, env="MAIL_PASSWORD")


settings = Settings()
