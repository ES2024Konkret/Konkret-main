from backend.api.repositories.job_repository import JobRepository
from sqlalchemy.orm import Session

class JobService:
    def __init__(self, db: Session):
        self.job_repository = JobRepository(db)

    def create_job(self, work_id: str, employee_id: str):
        return self.job_repository.create_job(work_id, employee_id)

    def all(self):
        return self.job_repository.all()

    def get(self, id: str):
        return self.job_repository.get(id)
    
    def delete(self, id: str):
        return self.job_repository.delete(id)
        