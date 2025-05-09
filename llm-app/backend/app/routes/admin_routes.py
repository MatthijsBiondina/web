from fastapi import APIRouter, Depends, HTTPException
import logging

from app.dependencies.authorization import authorize
from app.models.domain.roles import Role
from app.models.mongo.user_models import UserDocument
from app.services.chat_service import ChatService

logger = logging.getLogger(__name__)

router = APIRouter()


@router.delete("/chats-database/clear-chats-database")
async def clear_chats_database(
    user: UserDocument = Depends(authorize(Role.ADMIN)),
):
    try:
        ChatService.clear_chats_database()
        return {"message": "Chats database cleared successfully"}
    except Exception as e:
        logger.error(f"Error clearing chats database: {e}")
        raise HTTPException(status_code=500, detail=str(e))
