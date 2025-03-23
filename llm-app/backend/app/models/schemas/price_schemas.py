from app.models.schemas.defaults import SchemaBase


class CreditPriceRequest(SchemaBase):
    product: str


class CreditPriceResponse(SchemaBase):
    price: float
    credits: float


class OneTimeAccessPriceResponse(SchemaBase):
    price: float
