from fastapi import APIRouter
from app.api.routes import game, interrogation, accusation

router = APIRouter()

router.include_router(game.router, prefix="/game", tags=["game"])
router.include_router(interrogation.router, prefix="", tags=["interrogation"])
router.include_router(accusation.router, prefix="", tags=["accusation"])