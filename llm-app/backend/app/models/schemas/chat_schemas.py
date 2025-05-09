from app.models.schemas.defaults import SchemaBase
from datetime import datetime


class MessageSchema(SchemaBase):
    id: str
    text: str
    sender: str
    created_at: datetime


class CreateChatRequest(SchemaBase):
    subject: str
    text: str


class CreateChatResponse(SchemaBase):
    chat_id: str


class MessageSendRequest(SchemaBase):
    text: str
    chat_id: str | None = None


class MessageSendResponse(SchemaBase):
    user_message_id: str
    assistant_message_id: str


class MessageStatusRequest(SchemaBase):
    chat_id: str


class MessageStatusResponse(SchemaBase):
    complete: bool
    failed: bool
    message: MessageSchema | None = None


class RetrieveMessagesRequest(SchemaBase):
    chat_id: str


class RetrieveMessagesResponse(SchemaBase):
    messages: list[MessageSchema]


class ChatSchema(SchemaBase):
    id: str
    subject: str
    created_at: datetime
    nr_of_reads: int
    first_user_message: MessageSchema | None = None
    first_assistant_message: MessageSchema | None = None


class GetAllChatsResponse(SchemaBase):
    chats: list[ChatSchema]
