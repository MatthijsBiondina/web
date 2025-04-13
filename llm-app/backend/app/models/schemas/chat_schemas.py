from app.models.schemas.defaults import SchemaBase
from datetime import datetime


class Message(SchemaBase):
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
    message: Message | None = None


class RetrieveMessagesRequest(SchemaBase):
    chat_id: str


class RetrieveMessagesResponse(SchemaBase):
    messages: list[Message]
