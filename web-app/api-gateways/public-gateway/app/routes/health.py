import httpx
from fastapi import APIRouter, status
from pydantic import BaseModel
from typing import Dict

from app.config import settings

router = APIRouter()


class HealthResponse(BaseModel):
    status: str
    version: str
    services: Dict[str, str]


@router.get("/health", response_model=HealthResponse)
async def health_check():
    """
    Check the health of the gateway and its dependent services
    """
    services_status = {}

    # Check user service
    try:
        async with httpx.AsyncClient() as client:
            user_response = await client.get(
                f"{settings.USER_SERVICE_URL}/health", timeout=2.0
            )
            services_status["user_service"] = (
                "up" if user_response.status_code == 200 else "down"
            )
    except Exception:
        services_status["user_service"] = "down"

    return {"status": "ok", "version": "1.0.0", "services": services_status}
