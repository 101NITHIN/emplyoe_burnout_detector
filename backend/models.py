from sqlalchemy import Column, Integer, String, Float
from database import Base

class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)

    avg_key_interval = Column(Float)
    backspace_rate = Column(Float)
    mouse_move_count = Column(Integer)
    app_switch_count = Column(Integer)

    burnout_score = Column(Float)
    status = Column(String)
