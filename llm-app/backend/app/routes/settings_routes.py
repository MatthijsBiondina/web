from fastapi import APIRouter, Depends
from app.dependencies.authorization import authorize
from app.models.domain.roles import Role
from app.models.mongo.user_models import UserDocument
from app.services.settings_service import SettingsService
from app.models.schemas.settings_schemas import SettingStringResponse

router = APIRouter()


@router.get("/currency-symbol")
async def get_setting_currency_symbol(
    user: UserDocument = Depends(authorize(Role.UNVERIFIED_USER)),
):
    setting = SettingsService.get_setting("currency_symbol")
    return SettingStringResponse(setting=setting)


@router.get("/chat-initial-message")
async def get_setting_chat_initial_message(
    user: UserDocument = Depends(authorize(Role.UNVERIFIED_USER)),
):
    setting = SettingsService.get_setting("chat_initial_message")
    return SettingStringResponse(setting=setting)
