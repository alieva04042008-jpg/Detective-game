from sqlalchemy import Column, Integer, Text, ForeignKey, String
from app.db.base import Base


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    game_id = Column(Integer, ForeignKey("games.id"), nullable=False)
    suspect_id = Column(Integer, ForeignKey("suspects.id"), nullable=False)
    sender = Column(String, nullable=False)  # player or suspect
    content = Column(Text, nullable=False)