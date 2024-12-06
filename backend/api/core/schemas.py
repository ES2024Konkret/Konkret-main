from fastapi import Query
from pydantic import BaseModel, ConfigDict
from typing import Annotated, Optional
from datetime import datetime
from enum import Enum

class ProprietarySchema(BaseModel):
    name: Annotated[str, Query()]
    cpf: Annotated[str, Query()]
    
    
class ProprietaryPublic(BaseModel):
    name: Annotated[str, Query()]
    id: Annotated[str, Query()]
    created_at: Annotated[datetime,Query()]
    updated_at: Annotated[datetime,Query()]
    class Config:
        orm_mode = True

class EmployeeSchema(BaseModel):
    name: Annotated[Optional[str], Query()]
    rg: Annotated[int, Query()]
    cpf: Annotated[int, Query()]
    role: Annotated[Optional[str], Query()]
    salary: Annotated[float, Query()]
    work_id: Annotated[Optional[str], Query(default=None)]

class EmployeePublic(BaseModel):
    name: Annotated[Optional[str], Query()]
    id: Annotated[str, Query()]
    role: Annotated[Optional[str], Query()]
    salary: Annotated[Optional[float], Query()]
    work_id: Annotated[Optional[str], Query(default=None)]

class UserType(Enum):
    PF = "PF"
    PJ = "PJ"

class UserSchema(BaseModel):
    name: Annotated[str, Query()]
    email: Annotated[str, Query()]
    password: Annotated[str, Query()]
    user_type: Annotated[UserType, Query()]
    cpf: Annotated[Optional[str], Query()] | None
    cnpj: Annotated[Optional[str], Query()] | None
    model_config = ConfigDict(arbitrary_types_allowed=True)

class UserPublic(BaseModel):
    id: Annotated[str, Query()]
    name: Annotated[str, Query()]
    cpf: Annotated[str, Query()] | None
    cnpj: Annotated[str, Query()] | None
    email: Annotated[str, Query()]

class LoginSchema(BaseModel):
    email: str
    password: str

class ReportSchema(BaseModel):
    work_id: Annotated[str, Query()]
    photos: Annotated[Optional[list], Query()]
    observations: Annotated[Optional[list], Query()]
    activities: Annotated[Optional[list], Query()]

class ReportPublic(BaseModel):
    id: Annotated[str, Query()]
    work_id: Annotated[str, Query()]
    photos: Annotated[Optional[list], Query()]
    observations: Annotated[Optional[list], Query()]
    activities: Annotated[Optional[list], Query()]
    created_at: Annotated[datetime,Query()]
    updated_at: Annotated[datetime,Query()]
    class Config:
        orm_mode = True

class WorkSchema(BaseModel):
    proprietary_id: Annotated[str, Query()]
    address: Annotated[str, Query()]

class WorkPublic(BaseModel):
    id: Annotated[str, Query()]
    address: Annotated[str, Query()]
    proprietary_id: Annotated[str, Query()]
    created_at: Annotated[datetime,Query()]
    updated_at: Annotated[datetime,Query()]
    class Config:
        orm_mode = True

class EquipmentSchema(BaseModel):
    brand: Annotated[str, Query()] | None
    type: Annotated[str, Query()]
    description: Annotated[str, Query()] | None
    quantity: Annotated[int, Query()]

class EquipmentPublic(BaseModel):
    id: Annotated[str, Query()]
    brand: Annotated[str, Query()] | None
    type: Annotated[str, Query()]
    description: Annotated[str, Query()] | None
    quantity: Annotated[int, Query()]
    created_at: Annotated[datetime, Query()]
    updated_at: Annotated[datetime, Query()]

class PhotoSchema(BaseModel):
    report_id: Annotated[str, Query()]
    photo: Annotated[str, Query()]

class PhotoPublic(BaseModel):
    photo: Annotated[str, Query()]

class ObservationSchema(BaseModel):
    report_id: Annotated[str, Query()]
    observation: Annotated[str, Query()]

class ObservationPublic(BaseModel):
    observation: Annotated[str, Query()]

class ActivitySchema(BaseModel):
    report_id: Annotated[str, Query()]
    activity: Annotated[str, Query()]

class ActivityPublic(BaseModel):
    activity: Annotated[str, Query()]

class ClimateSchema(BaseModel):
    work_id: Annotated[str, Query()]

class ClimatePublic(BaseModel):
    temperature: Annotated[float, Query()]
    pressure: Annotated[float, Query()]
    humidity: Annotated[float, Query()]
    wind_speed: Annotated[float, Query()]
    visibility: Annotated[float, Query()]
