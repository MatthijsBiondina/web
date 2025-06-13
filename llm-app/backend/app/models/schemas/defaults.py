from datetime import datetime
from fastapi_camelcase import CamelModel


class SchemaBase(CamelModel):
    """
    Base model for all AIP schemas.

    - Automatically converts snake_case to camelCase responses
    - Accepts camelCase in requests and converts to snake_case
    - Provides consistent datetime serialization
    """

    class Config:
        json_encoders = {datetime: lambda dt: dt.isoformat()}


class SuccessResponse(SchemaBase):
    success: bool
    message: str
