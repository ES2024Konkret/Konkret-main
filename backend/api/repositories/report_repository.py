from backend.api.core.models import Report, Work
from backend.api.services.work_service import WorkService
from sqlalchemy.orm import Session
from sqlalchemy.orm.attributes import flag_modified
from backend.api.utils import get_coordinates
from backend.api.utils import get_weather
from fastapi import HTTPException

class ReportRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, work_id: str, photos: list, observations: str, activities: list):
        new_report = Report(work_id=work_id, photos=photos, observations=observations, activities=activities)
        self.db.add(new_report)
        self.db.commit()
        self.db.refresh(new_report)
        return new_report
    
    def all(self):
        report = self.db.query(Report).all()
        return report
    
    def get(self, id: str):
        report = self.db.query(Report).filter(Report.id == id).first()
        if report:
            return report
        return None
    
    def get_materials(self, id:str):
        report = self.db.query(Report).filter(Report.id == id).first()
        if report:
            return report.materials
        raise HTTPException(status_code = 404, detail = "Diario nao encontrado")
    
    def add_photo(self, id: str, photo: str):
        report = self.db.query(Report).filter(Report.id == id).first()
        if report:
            if report.photos == None:
                report.photos = []
            report.photos.append(photo)
            flag_modified(report, "photos")
            self.db.commit()
            self.db.refresh(report)
            return report.photos[len(report.photos) - 1]
        return None
    
    def remove_photo(self, id: str, photo: str):
        report = self.db.query(Report).filter(Report.id == id).first()
        if report:
            try:
                result = None
                if photo in report.photos:
                    result= photo
                report.photos.remove(photo)
                flag_modified(report, "photos")
                self.db.commit()
                self.db.refresh(report)
                return result
            except ValueError:
                return ValueError(f"Foto {photo} não encontrada!")
        return None
    
    def add_observation(self, id: str, observation: str):
        report = self.db.query(Report).filter(Report.id == id).first()
        if report:
            if report.observations == None:
                report.observations = []
            report.observations.append(observation)
            flag_modified(report, "observations")
            self.db.commit()
            self.db.refresh(report)
            return report.observations[len(report.observations) -1]
        return None
    
    def remove_observation(self, id: str, observation: str):
        report = self.db.query(Report).filter(Report.id == id).first()
        if report:
            try:
                result = None
                if observation in report.observations:
                    result = observation
                report.observations.remove(observation)
                flag_modified(report, "observations")
                self.db.commit()
                self.db.refresh(report)
                return result
            except ValueError:
                return ValueError(f"Observação {observation} não encontrada!")
        return None
    
    def add_activity(self, id: str, activity: str):
        report = self.db.query(Report).filter(Report.id == id).first()
        if report:
            if report.activities == None:
                report.activities = []
            report.activities.append(activity)
            flag_modified(report, "activities")
            self.db.commit()
            self.db.refresh(report)
            return report.activities[len(report.activities) - 1]
        return None
    
    def remove_activity(self, id: str, activity: str):
        report = self.db.query(Report).filter(Report.id == id).first()
        if report:
            try:
                result = None
                if activity in report.activities:
                    result = activity
                report.activities.remove(activity)
                flag_modified(report, "activities")
                self.db.commit()
                self.db.refresh(report)
                return result
            except ValueError:
                return ValueError(f"Atividade {activity} não encontrada!")
        return None
    
    def climate(self, id: str):
        report = self.db.query(Report).filter(Report.id == id).first()
        work = WorkService(self.db).get(report.work_id)
        if report:
            loc = f"{work.public_place}, {work.state}"
            coordinates = get_coordinates(loc)
            if coordinates:
                weather = get_weather(coordinates[0], coordinates[1])
                return [{
                    'Descrição': weather["weather"][0]["description"],
                    'Temperatura': f'{weather["main"]["temp"]:.2f}ºC',
                    'Pressão': f'{weather["main"]["pressure"]} hPa',
                    'Umidade': f'{weather["main"]["humidity"]}%',
                    'Velocidade do vento': f'{weather["wind"]["speed"]}m/s',
                    'Visibilidade': f'{weather["visibility"]}m'
                }]
            else:
                return "Endereço não encontrado"
        return None
    
    def delete(self, id: str):
        report = self.db.query(Report).filter(Report.id == id).first()
        if report:
            self.db.delete(report)
            self.db.commit()
            return report
        return None