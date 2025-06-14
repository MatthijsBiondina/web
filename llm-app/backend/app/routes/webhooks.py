import datetime
from fastapi import APIRouter, Form, Request, Response
import logging
from app.models.mongo.order_models import OrderDocument
from app.services.credit_service import CreditService
from app.services.mollie_service import MollieService
from app.services.order_service import OrderService
from app.services.subscription_service import SubscriptionService

logger = logging.getLogger(__name__)

router = APIRouter()


@router.get("/mollie")
async def mollie_webhook_get():
    """Test endpoint for Mollie webhook"""
    logger.info("Mollie webhook GET request received (for testing)")
    return {"status": "webhook endpoint is active"}


@router.post("/mollie")
async def mollie_webhook(request: Request, id: str = Form(...)):
    try:
        payment_id = id
        status, order_id = MollieService.update_payment_status(payment_id)
        if status == "paid":
            OrderService.process_paid_order(order_id)
        logger.info(f"Mollie webhook received for payment {payment_id}")

        return Response(status_code=200)
    except Exception as e:
        logger.error(f"Error updating payment status: {e}")
        return Response(status_code=500)


@router.post("/mollie/subscription")
async def mollie_subscription_webhook(request: Request, id: str = Form(...)):
    raise NotImplementedError("Not implemented")
    return Response(status_code=200)


@router.get("/mollie/subscription")
async def mollie_subscription_webhook_get():
    """Test endpoint for Mollie subscription webhook"""
    logger.info("Mollie subscription webhook GET request received (for testing)")
    return Response(
        content="Mollie subscription webhook endpoint is active", status_code=200
    )


@router.post("/mollie/subscription-setup")
async def mollie_subscription_setup_webhook(request: Request, id: str = Form(...)):
    """
    Handle webhook for subscription setup payments (first payment with mandate creation)
    """
    try:
        payment_id = id
        status, order_id = MollieService.update_payment_status(payment_id)
        if status == "paid":
            order = OrderDocument.objects.get(id=order_id)
            SubscriptionService.create_subscription_after_mandate(
                order.user,
                datetime.datetime.now() + datetime.timedelta(days=31),
            )
            CreditService.award_credits("subscription-standard-monthly", order.user)

        return Response(status_code=200)
    except Exception as e:
        logger.error(f"Error updating payment status: {e}")


@router.get("/mollie/subscription-setup")
async def mollie_subscription_setup_mandate_webhook(
    request: Request, id: str = Form(...)
):
    """Test endpoint for Mollie subscription webhook"""
    logger.info(
        "Mollie subscription-setup   webhook GET request received (for testing)"
    )
    return Response(
        content="Mollie subscription-setup webhook endpoint is active",
        status_code=200,
    )
