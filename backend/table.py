from sqlalchemy import Integer,Boolean
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import Column, ForeignKey
from sqlalchemy import String, Date
from sqlalchemy import create_engine
from sqlalchemy.orm import Session

Base = declarative_base()
engine = create_engine("postgresql:///todolist", echo=True)
session = Session(engine)

class Users(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key = True)
    name = Column(String)
    email = Column(String)
    password = Column(String)
    todolists = relationship("Todolist", back_populates = "user")
class Todolist(Base):
    __tablename__ = "todolists"
    id = Column(Integer, primary_key =True)
    name = Column(String)
    user_id = Column(Integer, ForeignKey("users.id"), nullable = False)
    privacy = Column(String)
    user = relationship("Users", back_populates = "todolists")
    tasks = relationship("Task", back_populates = "todolist")


Base.metadata.create_all(engine)