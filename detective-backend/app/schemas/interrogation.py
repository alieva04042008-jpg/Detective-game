from pydantic import BaseModel


class InterrogationRequest(BaseModel):
    game_id: int
    suspect_id: int
    question: str