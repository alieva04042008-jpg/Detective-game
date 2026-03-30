from sqlalchemy import Column, Integer, Text, ForeignKey, Boolean
from app.db.base import Base


class Accusation(Base):
    __tablename__ = "accusations"

    id = Column(Integer, primary_key=True, index=True)
    game_id = Column(Integer, ForeignKey("games.id"), nullable=False)
    chosen_suspect_id = Column(Integer, ForeignKey("suspects.id"), nullable=False)
    reasoning = Column(Text, nullable=False)
    score = Column(Integer, nullable=False)
    feedback = Column(Text, nullable=False)
    is_correct = Column(Boolean, nullable=False)