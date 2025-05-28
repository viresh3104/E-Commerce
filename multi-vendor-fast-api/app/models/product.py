from pydantic import BaseModel, Field
from typing import Optional
from bson import ObjectId

class Product(BaseModel):
    id: Optional[str] = Field(alias="_id")
    name: str
    description: Optional[str] = None
    price: float
    category: str
    vendor_id: str
    in_stock: int

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        allow_population_by_field_name = True
