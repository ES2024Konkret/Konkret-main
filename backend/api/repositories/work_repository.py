from backend.api.core.models import Work, RentEquipment
from sqlalchemy.orm import Session, joinedload
from fastapi import HTTPException

class WorkRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, proprietary_id: str, address: str, ):
        new_work = Work(proprietary_id=proprietary_id, address=address)
        self.db.add(new_work)
        self.db.commit()
        self.db.refresh(new_work)
        return new_work
    
    def all(self):
        work = self.db.query(Work).options(joinedload(Work.rentequipment).joinedload(RentEquipment.equipments)).all()
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
            return work
        else:
            raise HTTPException(status_code=404,detail="Não da pra deletar o que não existe bonzão")
    
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

