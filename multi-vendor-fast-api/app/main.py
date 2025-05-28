from fastapi import FastAPI
from app.db.mongo import db
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from app.api import (
    products, 
    routes_auth
    )

app = FastAPI(
    docs_url="/api/docs",    # Swagger UI
    redoc_url="/api/redoc",  # ReDoc UI
    openapi_url="/api/openapi.json",  # OpenAPI schema
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load environment variables
load_dotenv()

app.include_router(products.router, tags=["Products"])
app.include_router(routes_auth.router, tags=["Authentication"])

# commands for running the app server
# uvicorn app.main:app --host 127.0.0.1 --port 7000