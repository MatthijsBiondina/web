from app.models.mongo.credit_models import CreditPriceDocument
from fastapi import HTTPException
import logging
from app.models.mongo.user_models import UserDocument

logger = logging.getLogger(__name__)


class PriceService:
    @staticmethod
    def get_credit_price(product: str):
        try:
            credit_price = CreditPriceDocument.objects.get(key=product)
        except CreditPriceDocument.DoesNotExist:
            raise HTTPException(status_code=404, detail="Credit price not found")
        return (
            credit_price.amount_cents / 100,
            credit_price.amount_credits / 100,
        )

    @staticmethod
    def get_amount_of_credits(product: str):
        try:
            credit_price = CreditPriceDocument.objects.get(key=product)
        except CreditPriceDocument.DoesNotExist:
            raise HTTPException(status_code=404, detail="Credit price not found")
        return credit_price.amount_credits

    @staticmethod
    def get_one_time_access_price(user: UserDocument):
        from app.services.subscription_service import SubscriptionService

        subscription_level = SubscriptionService.get_subscription_level(user)

        try:
            product = {
                "free": "one-time-access",
                "standard": "one-time-access-discounted",
            }[subscription_level]
        except KeyError:
            logger.warning(
                f"User {str(user)} has an unknown/unexpected subscription level: {subscription_level}"
            )
            product = "one-time-access"

        price, _ = PriceService.get_credit_price(product)

        return price
