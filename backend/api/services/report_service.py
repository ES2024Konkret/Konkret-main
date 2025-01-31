from backend.api.repositories.report_repository import ReportRepository
from sqlalchemy.orm import Session

class ReportService:
    def __init__(self, db: Session):
        self.report_repository = ReportRepository(db)

    def create_report(self, work_id: str, photos: list, observations: str, activities: list):
        return self.report_repository.create(work_id, photos, observations, activities)

    def all(self):
        return self.report_repository.all()

    def get(self, id: str):
        return self.report_repository.get(id)

    def add_photo(self, id: str, photo: str):
        return self.report_repository.add_photo(id, photo)

    def remove_photo(self, id: str, photo: str):
        return self.report_repository.remove_photo(id, photo)
    
    def delete(self, id: str):
        return self.report_repository.delete(id)
    
    def add_observation(self, id: str, observation: str):
        return self.report_repository.add_observation(id, observation)
    
    def remove_observation(self, id: str, observation: str):
        return self.report_repository.remove_observation(id, observation)
    
    def add_activity(self, id: str, activity: str):
        return self.report_repository.add_activity(id, activity)
    
    def remove_activity(self, id: str, activity: str):
        return self.report_repository.remove_activity(id, activity)
    
    def get_climate(self, id: str):
        return self.report_repository.climate(id)
    
    def get_materials(self, id:str):
        return self.report_repository.get_materials(id)