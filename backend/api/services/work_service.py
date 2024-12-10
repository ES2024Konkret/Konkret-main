from backend.api.repositories.work_repository import WorkRepository
from sqlalchemy.orm import Session

class WorkService:
    def __init__(self, db: Session):
        self.work_repository = WorkRepository(db)

    def create_work(self, proprietary_id: str, address: str):
        return self.work_repository.create(proprietary_id, address)

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