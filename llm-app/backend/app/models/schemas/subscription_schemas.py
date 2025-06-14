from app.models.schemas.defaults import SchemaBase
from datetime import datetime


class SubscriptionResponse(SchemaBase):
    id: str
    level: str
    amount: int
    currency: str
    interval: str
    status: str
    start_date: datetime | None = None
    next_payment_date: datetime | None = None
    cancelled_at: datetime | None = None
    created_at: datetime

    class Config:
        from_attributes = True


class CreateSubscriptionRequest(SchemaBase):
    product_key: str
    start_date: datetime | None = None


class CancelSubscriptionRequest(SchemaBase):
    subscription_id: str


class SubscriptionStatusResponse(SchemaBase):
    subscription_level: str
    subscription_active: bool
    active_subscription: SubscriptionResponse | None = None
