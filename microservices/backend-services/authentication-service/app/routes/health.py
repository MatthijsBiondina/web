from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class HealthResponse(BaseModel):
    status: str
    service: str
    version: str

@router.get("/health", response_model=HealthResponse)
async def health_check():
    """
    Simple health check endpoint
    """
    return {
        "status": "ok",
        "service": "authentication-service",
        "version": "1.0.0"
    }