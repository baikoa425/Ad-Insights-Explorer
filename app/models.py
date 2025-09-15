from typing import List, Optional
from pydantic import BaseModel

class Post(BaseModel):
    userId: int
    title: str
    body: str
    id: int

class Anomaly(BaseModel):
    userId: int
    reason: List[str]
    title: str
    id: int

class SummaryUser(BaseModel):
    unique_words: List[str]
    unique_word_count: int
    userId: int

class SummaryResponse(BaseModel):
    top_users: List[SummaryUser]
    common_words: List[str]
