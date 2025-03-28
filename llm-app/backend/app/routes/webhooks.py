from fastapi import APIRouter, Form, Request, Response
import logging
from app.services.mollie_service import MollieService
from app.services.order_service import OrderService

logger = logging.getLogger(__name__)

router = APIRouter()


# At the top of webhooks.py
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
