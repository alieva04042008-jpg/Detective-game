from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.game import Game
from app.models.suspect import Suspect
from app.models.accusation import Accusation
from app.schemas.accusation import AccusationRequest
from app.services.ai_service import grade_accusation

router = APIRouter()


@router.post("/accuse")
def accuse(data: AccusationRequest, db: Session = Depends(get_db)):
    game = db.query(Game).filter(Game.id == data.game_id).first()
    if not game:
        raise HTTPException(status_code=404, detail="Game not found")

    suspects = db.query(Suspect).filter(Suspect.game_id == data.game_id).all()
    if not suspects:
        raise HTTPException(status_code=404, detail="No suspects found")

    chosen = db.query(Suspect).filter(
        Suspect.id == data.chosen_suspect_id,
        Suspect.game_id == data.game_id
    ).first()
    if not chosen:
        raise HTTPException(status_code=404, detail="Chosen suspect not found")

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
            for s in suspects
        ]
    }

    result = grade_accusation(case_data, data.chosen_suspect_id, data.reasoning)

    real_culprit = next(s.name for s in suspects if s.is_killer)

    accusation = Accusation(
        game_id=data.game_id,
        chosen_suspect_id=data.chosen_suspect_id,
        reasoning=data.reasoning,
        score=result["score"],
        feedback=result["feedback"],
        is_correct=result["is_correct"]
    )
    db.add(accusation)

    game.status = "finished"
    db.commit()

    return {
        "is_correct": result["is_correct"],
        "score": result["score"],
        "culprit_name": real_culprit,
        "feedback": result["feedback"]
    }