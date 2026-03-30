from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.schemas.interrogation import InterrogationRequest
from app.db.session import get_db
from app.models.game import Game
from app.models.suspect import Suspect
from app.models.message import Message
from app.services.ai_service import generate_suspect_reply

router = APIRouter()


@router.post("/interrogate")
def interrogate(data: InterrogationRequest, db: Session = Depends(get_db)):
    game = db.query(Game).filter(Game.id == data.game_id).first()
    if not game:
        raise HTTPException(status_code=404, detail="Game not found")

    suspect = db.query(Suspect).filter(
        Suspect.id == data.suspect_id,
        Suspect.game_id == data.game_id
    ).first()

    if not suspect:
        raise HTTPException(status_code=404, detail="Suspect not found")

    if suspect.questions_left <= 0:
        raise HTTPException(status_code=400, detail="No questions left")

    all_suspects = db.query(Suspect).filter(Suspect.game_id == data.game_id).all()

    case_data = {
        "title": game.title,
        "case_summary": game.case_summary,
        "victim_name": game.victim_name,
        "location": game.location,
        "solution_explanation": game.solution_explanation,
        "suspects": [
            {
                "id": s.id,
                "name": s.name,
                "role": s.role,
                "personality": s.personality,
                "motive": s.motive,
                "secret": s.secret,
                "is_killer": s.is_killer
            }
            for s in all_suspects
        ]
    }

    db.add(Message(
        game_id=data.game_id,
        suspect_id=data.suspect_id,
        sender="player",
        content=data.question
    ))
    db.commit()

    reply = generate_suspect_reply(
        case_data,
        {
            "id": suspect.id,
            "name": suspect.name,
            "role": suspect.role,
            "personality": suspect.personality,
            "motive": suspect.motive,
            "secret": suspect.secret,
            "is_killer": suspect.is_killer
        },
        data.question
    )

    db.add(Message(
        game_id=data.game_id,
        suspect_id=data.suspect_id,
        sender="suspect",
        content=reply
    ))

    suspect.questions_left -= 1
    db.commit()
    db.refresh(suspect)

    return {
        "answer": reply,
        "questions_left": suspect.questions_left
    }