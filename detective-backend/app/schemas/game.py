from pydantic import BaseModel
from typing import List


class SuspectPreview(BaseModel):
    id: int
    name: str
    role: str
    personality: str
    questions_left: int


class NewGameResponse(BaseModel):
    game_id: int
    title: str
    case_summary: str
    victim_name: str
    location: str
    suspects: List[SuspectPreview]