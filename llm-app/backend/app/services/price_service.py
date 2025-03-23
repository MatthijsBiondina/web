from app.models.mongo.credit_models import CreditPriceDocument
from fastapi import HTTPException


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
            credit_price.currency_symbol,
        )
