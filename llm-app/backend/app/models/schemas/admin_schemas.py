from app.models.schemas.defaults import SchemaBase
from datetime import datetime


class GetAllChatsRequest(SchemaBase):
    page_number: int = 1


class ChatDocument(SchemaBase):
    id: str
    subject: str
    created_at: datetime
    user_id: str
    user_name: str
    user_email: str
    user_photo_url: str
    status: str
    email_sent: bool


class GetAllChatsResponse(SchemaBase):
    chats: list[ChatDocument]
    total_pages: int
    total_chats: int
