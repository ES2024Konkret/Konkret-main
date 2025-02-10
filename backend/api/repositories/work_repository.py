from backend.api.core.models import Work, RentEquipment, Job, User, ResponsabilityType
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import Date
from datetime import date
from fastapi import HTTPException
from datetime import datetime

class WorkRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(
        self, 
        engineer_id: str,
        owner_id: str,
        name: str, 
        zip_code: str, 
        state: str, 
        public_place: str, 
        neighborhood: str = None, 
        number_addres: int = None, 
        start_date: date = None, 
        end_date: date = None
    ):
        # Verifica se o engenheiro existe
        engineer = self.db.query(User).filter(
            User.id == engineer_id,
            User.responsability_type == ResponsabilityType.Engenheiro
        ).first()

        if not engineer:
            raise ValueError("Apenas engenheiros podem criar obras")

        # Verifica se o proprietário existe
        owner = self.db.query(User).filter(
            User.id == owner_id,
            User.responsability_type == ResponsabilityType.Proprietario
        ).first()

        if not owner:
            raise ValueError("Proprietário não encontrado ou não tem permissão de proprietário")

        # Cria a obra
        new_work = Work(
            engineer_id=engineer_id,
            owner_id=owner_id,
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
        work = self.db.query(Work).options(joinedload(Work.rentequipment).joinedload(RentEquipment.equipments)).all()
        return work
    
    def get_works_by_owner_id(self, owner_id: str):
        works = self.db.query(Work).filter(Work.owner_id == owner_id).all()
        return works
    
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

    def get_equipments(self, id: str):
        equipment_list = []
        work = self.db.query(Work).filter(Work.id == id).first()
        if work:
            for rent in work.rentequipment:
                equipment_list.append(rent.equipments)
        return equipment_list
    
    def get_employees(self, id: str):
        employees_list = []
        work = self.db.query(Work).filter(Work.id == id).first()
        if work:
            for job in work.jobs:
                employees_list.append(job.employees)
        return employees_list
    
    def retrieve_notifications(self, user_id: str):
        notifications_list = []
        today = datetime.now().date()
        works = self.db.query(Work).filter(Work.user_id == user_id).all()
        for work in works:
            if work.end_date and work.end_date < today:
                notifications_list.append(f"A obra {work.name} já passou da data de término.")
            employees = self.get_employees(work.id)
            for employee in employees:
                if employee.contract_end and employee.contract_end.date() < today:
                    notifications_list.append(f"O funcionário {employee.name} da obra {work.name} teve seu contrato encerrado em {employee.contract_end.date()}.")
        return notifications_list