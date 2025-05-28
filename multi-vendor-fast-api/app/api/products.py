from app.db.mongo import db
from app.schemas.product import ProductCreate
from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user

router = APIRouter()

@router.post("/products")
async def create_product(product: ProductCreate, user: dict = Depends(get_current_user)):
    result = await db["products"].insert_one(product.dict())
    return {"id": str(result.inserted_id)}

@router.get("/me")
async def get_my_profile(user: dict = Depends(get_current_user)):
    return {"message": f"Welcome, {user['name']}"}
