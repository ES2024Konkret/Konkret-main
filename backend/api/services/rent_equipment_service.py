from backend.api.repositories.rent_equipment_repository import RentEquipmentRepository
from sqlalchemy.orm import Session
from datetime import datetime
class RentEquipmentService:
    def __init__(self, db: Session):
        self.rent_equipment_repository = RentEquipmentRepository(db)

    def create_rent_equipment(self, work_id: str, equipment_id: str, comments: str,
    start_time: datetime | None,
    end_time: datetime):
        return self.rent_equipment_repository.create(work_id, equipment_id, comments, start_time, end_time)

    # def all(self):
    #     return self.work_repository.all()

    # def get(self, id: str):
    #     return self.work_repository.get(id)
    
    # def delete(self, id: str):
    #     return self.work_repository.delete(id)
    
    # def proprietary(self, id: str):
    #     return self.work_repository.proprietary(id)
    
    # def reports(self, id: str):
    #     return self.work_repository.reports(id)
    
    # def workers(self, id: str):
    #     return self.work_repository.workers(id)