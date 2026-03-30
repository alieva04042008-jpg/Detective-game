from pydantic import BaseModel


class AccusationRequest(BaseModel):
    game_id: int
    chosen_suspect_id: int
    reasoning: str