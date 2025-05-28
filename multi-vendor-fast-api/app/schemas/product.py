from pydantic import BaseModel, Field
from typing import Optional

class ProductCreate(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    category: str
    vendor_id: str
    in_stock: int

from app.schemas.categories import CategoryOut

class ProductOut(BaseModel):
    id: str = Field(alias="_id")
    name: str
    description: Optional[str]
    price: int
    category_id: Optional[str]

    class Config:
        orm_mode = True
        allow_population_by_field_name = True

