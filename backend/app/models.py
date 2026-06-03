from sqlalchemy import Column, Integer, Float, String
from app.database import Base

class SensorData(Base):
    __tablename__ = "sensor_data"

    id = Column(Integer, primary_key=True, index=True)
    device_id = Column(String)
    water_level = Column(Float)
    ph = Column(Float)
    temperature = Column(Float)
    tds = Column(Float)
    turbidity = Column(Float)


