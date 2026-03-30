from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import router
from app.db.session import engine
from app.db.base import Base

import app.models.game
import app.models.suspect
import app.models.message
import app.models.accusation

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Detective Game API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api")


@app.get("/")
def root():
    return {"message": "Detective API is working"}