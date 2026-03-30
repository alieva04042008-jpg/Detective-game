from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.game import Game
from app.models.suspect import Suspect
from app.services.ai_service import generate_case

router = APIRouter()


@router.post("/new")
def create_new_game(db: Session = Depends(get_db)):
    case = generate_case()

    new_game = Game(
        title=case["title"],
        case_summary=case["case_summary"],
        victim_name=case["victim_name"],
        location=case["location"],
        solution_explanation=case["solution_explanation"],
        status="active"
    )
    db.add(new_game)
    db.commit()
    db.refresh(new_game)

    suspects_response = []

    for suspect in case["suspects"]:
        db_suspect = Suspect(
            game_id=new_game.id,
            name=suspect["name"],
            role=suspect["role"],
            personality=suspect["personality"],
            motive=suspect["motive"],
            secret=suspect["secret"],
            is_killer=suspect["is_killer"],
            questions_left=3
        )
        db.add(db_suspect)
        db.commit()
        db.refresh(db_suspect)

        suspects_response.append({
            "id": db_suspect.id,
            "name": db_suspect.name,
            "role": db_suspect.role,
            "personality": db_suspect.personality,
            "questions_left": db_suspect.questions_left
        })

    return {
        "game_id": new_game.id,
        "title": new_game.title,
        "case_summary": new_game.case_summary,
        "victim_name": new_game.victim_name,
        "location": new_game.location,
        "suspects": suspects_response
    }