from backend.api.core.models import Work
from sqlalchemy.orm import Session
from sqlalchemy import Date

class WorkRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, proprietary_id: str, name: str, zip_code: str, state: str, public_place: str, neighborhood: str = None, number_addres: int = None, start_date: Date = None, end_date: Date = None ):
        new_work = Work(
        proprietary_id=proprietary_id,
        name=name,
        zip_code=zip_code,
        state=state,
        public_place=public_place,
        neighborhood=neighborhood,
        number_addres=number_addres,
        start_date=start_date,
        end_date=end_date
        )
        self.db.add(new_work)
        self.db.commit()
        self.db.refresh(new_work)
        return new_work
    
    def all(self):
        work = self.db.query(Work).all()
        return work
    
    def get(self, id: str):
        work = self.db.query(Work).filter(Work.id == id).first()
        if work:
            return work
        return None
    
    def delete(self, id: str):
        work = self.db.query(Work).filter(Work.id == id).first()
        if work:
            self.db.delete(work)
            self.db.commit()
            return True
        return False
    
    def reports(self, id: str):
        work = self.db.query(Work).filter(Work.id == id).first()
        if work:
            return work.reports
        return None

    def proprietary(self, id: str):
        work = self.db.query(Work).filter(Work.id == id).first()
        if work:
            return work.proprietary
        return None

    def workers(self, id: str):
        work = self.db.query(Work).filter(Work.id == id).first()
        if work:
            return work.workers
        return None

