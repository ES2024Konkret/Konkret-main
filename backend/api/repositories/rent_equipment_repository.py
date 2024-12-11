from backend.api.core.models import RentEquipment
from sqlalchemy.orm import Session
from fastapi import HTTPException
from datetime import datetime
class RentEquipmentRepository:
    def __init__(self, db: Session):
        self.db = db
    def create(self, work_id: str, equipment_id: str, comments: str,
    start_time: datetime | None,
    end_time: datetime):
        new_rentequipment = RentEquipment(work_id=work_id, equipment_id= equipment_id, comments= comments,
    start_time = start_time,
    end_time = end_time)
        self.db.add(new_rentequipment)
        self.db.commit()
        self.db.refresh(new_rentequipment)
        return new_rentequipment
    def get_all(self):
        return self.db.query(RentEquipment).all()
    
    def update(
            self, id: str, comments: str = None, start_time: datetime = None, end_time: datetime = None
            ):
        rent = self.db.query(RentEquipment).filter(RentEquipment.id == id).first()
        if rent:
            if comments is not None:
                rent.comments = comments
            if start_time is not None:
                rent.start_time = start_time
            if end_time is not None:
                rent.end_time = end_time
            self.db.commit()
            self.db.refresh(rent)
            return rent
        return None    
