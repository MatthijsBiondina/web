import logging
from fastapi import APIRouter, Depends, HTTPException
from app.dependencies.authorization import authorize
from app.models.domain.roles import Role
from app.models.mongo.user_models import UserDocument
from app.models.schemas.defaults import SuccessResponse
from app.models.schemas.email_schemas import AskProfessorRequest
from app.services.email_service import EmailService

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/ask-professor")
async def ask_professor_route(
    request: AskProfessorRequest,
    user: UserDocument = Depends(authorize(Role.VERIFIED_USER)),
):
    try:
        EmailService.ask_professor(
            user, request.user_name, request.user_email, request.chat_id
        )

        return SuccessResponse(success=True, message="Question forwarded to professor")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
