from app.models.schemas.defaults import SchemaBase


class CreditCheckRequest(SchemaBase):
    task_type: str


class CreditBalanceResponse(SchemaBase):
    amount: float


class CreditCheckResponse(SchemaBase):
    sufficient: bool
