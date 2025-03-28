import datetime
from mollie.api.client import Client
import os
import logging
from app.models.mongo.order_models import OrderDocument
from app.services.service_container import mollie_client as container_mollie_client

logger = logging.getLogger(__name__)


class MollieService:
    @staticmethod
    def init_mollie():
        mollie_api_key = os.getenv("MOLLIE_API_KEY")
        if not mollie_api_key:
            raise ValueError("MOLLIE_API_KEY is not set")

        client = Client()
        client.set_api_key(mollie_api_key)

        # Update the container's reference
        global container_mollie_client
        container_mollie_client = client

        logger.info("Connected to Mollie")
        return client

    @staticmethod
    def get_client():
        global container_mollie_client
        if container_mollie_client is None:
            return MollieService.init_mollie()
        return container_mollie_client

    @staticmethod
    def update_payment_status(payment_id):
        client = MollieService.get_client()
        payment = client.payments.get(payment_id)

        if not payment.status in OrderDocument.PAYMENT_STATUS_CHOICES:
            logger.error(f"Invalid payment status: {payment.status}")
            raise ValueError(f"Invalid payment status: {payment.status}")

        try:
            order = OrderDocument.objects.get(payment_id=payment_id)
            order.update(status=payment.status, updated_at=datetime.datetime.now())
        except OrderDocument.DoesNotExist as e:
            logger.error(f"Order not found for payment {payment_id}")
            raise e

        return payment.status, order.id
