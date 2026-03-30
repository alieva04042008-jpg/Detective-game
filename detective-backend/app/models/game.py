from sqlalchemy import Column, Integer, String, Text
from app.db.base import Base


class Game(Base):
    __tablename__ = "games"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    case_summary = Column(Text, nullable=False)
    victim_name = Column(String, nullable=False)
    location = Column(String, nullable=False)
    solution_explanation = Column(Text, nullable=False)
    status = Column(String, default="active")