from sqlalchemy import Column, Integer, String, Text, Boolean, ForeignKey
from app.db.base import Base


class Suspect(Base):
    __tablename__ = "suspects"

    id = Column(Integer, primary_key=True, index=True)
    game_id = Column(Integer, ForeignKey("games.id"), nullable=False)
    name = Column(String, nullable=False)
    role = Column(String, nullable=False)
    personality = Column(Text, nullable=False)
    motive = Column(Text, nullable=False)
    secret = Column(Text, nullable=False)
    is_killer = Column(Boolean, default=False)
    questions_left = Column(Integer, default=3)