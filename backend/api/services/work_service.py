from backend.api.repositories.work_repository import WorkRepository
from sqlalchemy.orm import Session
from sqlalchemy import Date

class WorkService:
    def __init__(self, db: Session):
        self.work_repository = WorkRepository(db)

    def create_work(self, engineer_id: str, proprietary_id: str, name: str, zip_code: str, state: str, public_place: str, neighborhood: str = None, number_addres: int = None, start_date: Date = None, end_date: Date = None ):
        return self.work_repository.create(engineer_id, proprietary_id, name, zip_code, state, public_place, neighborhood, number_addres, start_date, end_date)

    def all(self):
        return self.work_repository.all()

    def get(self, id: str):
        return self.work_repository.get(id)
    
    def delete(self, id: str):
        return self.work_repository.delete(id)
    
    def proprietary(self, id: str):
        return self.work_repository.proprietary(id)
    
    def reports(self, id: str):
        return self.work_repository.reports(id)
    
    def workers(self, id: str):
        return self.work_repository.workers(id)
    
    def get_equipments(self, id: str):
        return self.work_repository.get_equipments(id)
    
    def get_employees(self, id:str):
        return self.work_repository.get_employees(id)