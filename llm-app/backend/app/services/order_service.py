from http.client import HTTPException
import os
import logging

import mollie
from app.models.mongo.user_models import UserDocument
from app.models.mongo.order_models import OrderDocument
from app.services.price_service import PriceService
from app.services.settings_service import SettingsService
from app.services.subscription_service import SubscriptionService
from app.services.mollie_service import MollieService

logger = logging.getLogger(__name__)


class OrderService:
    @staticmethod
    def create_one_time_access_order(
        user: UserDocument,
    ):
        order = OrderDocument.create_order(
            user=user,
            amount=PriceService.get_one_time_access_price(user),
            currency=SettingsService.get_setting("currency"),
            product=(
                "one-time-access"
                if SubscriptionService.get_subscription_level(user) == "free"
                else "one-time-access-discounted"
            ),
        )

        # Get the mollie client from the service
        mollie_client = MollieService.get_client()

        redirect_url = f"{os.getenv('FRONTEND_URL')}/portaal/betalingsverwerking"

        try:
            payment = mollie_client.payments.create(
                {
                    "amount": {
                        "value": str(order.amount),
                        "currency": order.currency,
                    },
                    "description": f"Professor Dog - Eenmalige toegang ({order.order_number})",
                    "redirectUrl": redirect_url,
                    "webhookUrl": f"{os.getenv('BACKEND_URL')}/webhooks/mollie",
                }
            )
        except mollie.api.error.UnprocessableEntityError as e:
            logger.error(f"Error creating mollie payment: {str(e)}")
            logger.error(f"Redirect URL: {redirect_url}")
            raise HTTPException(status_code=500, detail=str(e))

        return payment.checkout_url
