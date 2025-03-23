from app.models.schemas.defaults import SchemaBase


class SettingStringResponse(SchemaBase):
    setting: str
