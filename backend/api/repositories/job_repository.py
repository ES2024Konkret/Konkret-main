from backend.api.core.models import Job
from sqlalchemy.orm import Session

class JobRepository:
    def __init__(self,db: Session):
        self.db = db

    def create_job(self,work_id: str, employee_id: str):
        new_job = Job(work_id=work_id, employee_id=employee_id)
        self.db.add(new_job)
        self.db.commit()
        self.db.refresh(new_job)
        return new_job
    
    def all(self):
        return self.db.query(Job).all()
    
    def get(self, id: str):
        job = self.db.query(Job).filter(Job.id == id).first()
        if job:
            return job
        return None
    
    #Usar firts() ao inves de one(), pois first considera que só terá um item a ser encontrado, como o id é único
    def delete(self, id: str):
        job = self.db.query(Job).filter(Job.id == id).first()
        if job:
            self.db.delete(job)
            self.db.commit()
            return job
        return None