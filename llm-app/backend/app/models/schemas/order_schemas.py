from pydantic import BaseModel


class RedirectUrlResponse(BaseModel):
    url: str
