from app.models.schemas.defaults import SchemaBase


class MessageSendRequest(SchemaBase):
    text: str
    chat_id: str | None = None


class MessageSendResponse(SchemaBase):
    chat_id: str


class MessageStatusRequest(SchemaBase):
    chat_id: str


class MessageStatusResponse(SchemaBase):
    complete: bool
    message: str | None = None
