from pydantic import BaseModel, Field
from typing import Optional

class CategoryOut(BaseModel):
    id: str = Field(alias="_id")
    name: str

    class Config:
        orm_mode = True
        allow_population_by_field_name = True
