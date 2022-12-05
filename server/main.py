import pymongo
import dns # required for connecting with SRV
import uvicorn
from motor.motor_asyncio import AsyncIOMotorClient
from config.celery_utils import create_celery
from routers import trends
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI


def create_app() -> FastAPI:
    current_app = FastAPI(title="Get google trends using asynchronous tasks processing with Celery and RabbitMQ",
                          description="FastAPI Application to get google trends with Celery and RabbitMQ",
                          version="1.0.0", )
    current_app.celery_app = create_celery()
    current_app.include_router(trends.router)
    return current_app

app = create_app()
celery = app.celery_app

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.on_event("startup")
async def startup_db_client():
    mongo_pass='28DsIhH0mAqKKvfV'
    DB_URL = f"mongodb+srv://mongouser:{mongo_pass}@cluster0.lvnnmax.mongodb.net/?retryWrites=true&w=majority"
    DB_NAME = 'rss-google-db'
    app.mongodb_client = AsyncIOMotorClient(DB_URL)
    app.mongodb = app.mongodb_client[DB_NAME]

@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()



if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        reload=True,
        port=8000,
    )
