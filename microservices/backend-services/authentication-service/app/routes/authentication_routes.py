from typing import Optional
from fastapi import APIRouter, Header
import logging

router = APIRouter()
logger = logging.getLogger("authentication-service")


@router.get("/")
async def authenticate(header: Optional[str] = Header(None)):
    logger.info("Authentication route ")
