import datetime
from http.client import HTTPException
import os
import logging
from pymongo.errors import DuplicateKeyError
from bson import ObjectId
import mollie
from app.models.mongo.user_models import UserDocument
from app.models.mongo.order_models import OrderDocument, OrderNumberSequence
from app.models.mongo.credit_models import CreditBalanceDocument, CreditPriceDocument
from app.services.price_service import PriceService
from app.services.settings_service import SettingsService
from app.services.mollie_service import MollieService

logger = logging.getLogger(__name__)


class OrderService:
    @staticmethod
    def create_one_time_access_order(
        user: UserDocument,
    ):
        amount = PriceService.get_one_time_access_price(user)
        currency = SettingsService.get_setting("currency")
        order_number = f"ORD-{OrderNumberSequence.get_next_value():06d}"
        redirect_url = f"{os.getenv('FRONTEND_URL')}/portaal/chat-sessie"
        webhook_url = f"{os.getenv('BACKEND_URL')}/api/webhooks/mollie"

        try:
            payment = MollieService.get_client().payments.create(
                {
                    "amount": {
                        "value": str(amount),
                        "currency": currency,
                    },
                    "description": f"Professor Dog - Eenmalige toegang ({order_number})",
                    "redirectUrl": redirect_url,
                    "webhookUrl": webhook_url,
                }
            )
        except mollie.api.error.UnprocessableEntityError as e:
            logger.error(f"Error creating mollie payment: {str(e)}")
            logger.error(f"Redirect URL: {redirect_url}")
            raise HTTPException(status_code=500, detail=str(e))

        if not payment["id"]:
            logger.error(f"Error creating mollie payment: {payment}")

        try:

            order = OrderDocument(
                user=user,
                order_number=order_number,
                payment_id=payment.id,
                amount=amount,
                currency=currency,
                product="one-time-access",
            )
            order.save()
        except DuplicateKeyError as e:
            logger.error(f"Error creating order: {str(e)}")
            raise HTTPException(status_code=500, detail=str(e))

        return payment.checkout_url

    @staticmethod
    def process_paid_order(order_id: ObjectId):
        # Attempt to atomically find and update the order
        # Only update if it's paid and not yet processed
        order_update_result = OrderDocument.objects(
            id=order_id,
            status="paid",
            processed=False,
        ).update_one(
            set__processed=True,
            set__updated_at=datetime.datetime.now(),
        )

        # Check if any document was updated
        if order_update_result == 0:
            order_doc = OrderDocument.objects.get(id=order_id)
            if not order_doc:
                logger.error(f"Order {order_id} not found")
                raise HTTPException(status_code=404, detail="Order not found")
            elif order_doc.processed:
                logger.error(f"Order {order_id} is already processed")
                raise HTTPException(
                    status_code=400, detail="Order is already processed"
                )
            else:
                logger.error(f"Order {order_id} is not paid")
                raise HTTPException(status_code=400, detail="Order is not paid")

        # If we got here, we successfully claimed the order for processing
        # Get the order details we need
        # todo: move to CreditService
        order_doc = OrderDocument.objects.get(id=order_id)
        product_doc = CreditPriceDocument.objects.get(key=order_doc.product)

        # Atomically update the credit balance
        credit_update_result = CreditBalanceDocument.objects(
            user=order_doc.user,
        ).update_one(
            inc__amount=product_doc.amount_credits,
            set__updated_at=datetime.datetime.now(),
        )

        if credit_update_result == 0:
            logger.error(
                f"Failed to update credit balance for user {str(order_doc.user)}"
            )
            order_doc.update(
                set__requires_manual_review=True,
                set__updated_at=datetime.datetime.now(),
            )
            raise HTTPException(
                status_code=500, detail="Failed to update credit balance"
            )
