from mongoengine import Document, StringField, FloatField


class ServicePriceDocument(Document):
    service_name = StringField(required=True, unique=True)
    amount = FloatField(required=True)

    meta = {"collection": "service_prices", "indexes": ["service_name"]}
