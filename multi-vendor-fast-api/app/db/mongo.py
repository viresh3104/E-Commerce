from motor.motor_asyncio import AsyncIOMotorClient
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    MONGO_URI: str = "mongodb://localhost:27017"
    DB_NAME: str = "multi_vendor"

settings = Settings()

client = AsyncIOMotorClient(settings.MONGO_URI)
db = client[settings.DB_NAME]

def get_user_collection():
    return db["users"]

def get_collection(name: str):
    return db[name]