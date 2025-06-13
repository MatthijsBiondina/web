from app.models.schemas.defaults import SchemaBase


class AskProfessorRequest(SchemaBase):
    chat_id: str
    user_name: str
    user_email: str
