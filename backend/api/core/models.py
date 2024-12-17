from sqlalchemy import Table, Column, String, Float, Integer, Text, ForeignKey, DateTime, Enum,func, JSON, Date
from sqlalchemy.orm import relationship, declarative_base, mapped_column, Mapped
from uuid import uuid4
from sqlalchemy.dialects.postgresql import ARRAY
import enum
from enum import Enum as PyEnum

Base = declarative_base()

class UserType(PyEnum):
    PF = "PF"
    PJ = "PJ"

class User(Base):
    __tablename__ = "users"

    id: Mapped[String] = mapped_column(String, primary_key=True, index=True, default=lambda: str(uuid4()))
    name = mapped_column(String, nullable=False)
    cpf = mapped_column(String, nullable=True, unique=True)
    cnpj = mapped_column(String, nullable=True, unique=True)
    email = mapped_column(String, nullable=False, unique=True)
    phone = mapped_column(String, nullable=False, unique=True)
    password = mapped_column(String, nullable=False)
    user_type = mapped_column(Enum(UserType, name="user_type_enum"), nullable=False)  
    created_at = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

class Proprietary(Base):
    __tablename__ = "proprietaries"

    id: Mapped[String] = mapped_column(String, primary_key=True, index=True,default=lambda: str(uuid4()))
    name = mapped_column(String, nullable=False)
    cpf = mapped_column(String, nullable=False, unique=True)
    works = relationship("Work", back_populates="proprietary")
    created_at = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class Employee(Base):
    __tablename__ = "employees"

    id: Mapped[String] = mapped_column(String, primary_key=True, index=True,default=lambda: str(uuid4()))
    name = mapped_column(String, nullable=True)
    rg = mapped_column(Integer, nullable=True, unique=True)
    cpf = mapped_column(Integer, nullable=False, unique=True)
    role = mapped_column(String, nullable=True)
    contract_start = mapped_column(DateTime(timezone=True), nullable=False) 
    contract_end = mapped_column(DateTime(timezone=True), nullable=False)
    jobs = relationship("Job", back_populates="employees")
    activities = relationship("Activity", back_populates="employee")
    created_at = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    
class Job(Base):
    __tablename__ = "jobs"
    
    id: Mapped[String] = mapped_column(String, primary_key=True, index=True,default=lambda: str(uuid4()))
    work_id = mapped_column(ForeignKey("works.id"), nullable=True)
    works = relationship("Work", back_populates="jobs")
    employee_id = mapped_column(ForeignKey("employees.id"), nullable=True)
    employees = relationship("Employee", back_populates="jobs")
    created_at = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
class Activity(Base):
    __tablename__ = 'activities'

    id: Mapped[String] = mapped_column(String, primary_key=True, index=True,default=lambda: str(uuid4()))
    employee_id = mapped_column(ForeignKey("employees.id"), nullable=True)
    employee = relationship("Employee", back_populates="activities")
    report_id = mapped_column(ForeignKey("reports.id"), nullable=True)
    report = relationship("Report", back_populates="activities")
    description = mapped_column(String, nullable=True)
    created_at = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

class Report(Base):
    __tablename__ = 'reports'

    id: Mapped[String] = mapped_column(String, primary_key=True, index=True,default=lambda: str(uuid4()))
    photos = mapped_column(ARRAY(String), nullable=True)
    observations = mapped_column(ARRAY(String), nullable=True)
    activities = relationship("Activity", back_populates="report")
    work_id = mapped_column(ForeignKey("works.id"), nullable=True)
    work = relationship("Work", back_populates="reports")
    materials = relationship("Material", back_populates="report")
    created_at = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

class Work(Base):
    __tablename__ = 'works'

    id: Mapped[String] = mapped_column(String, primary_key=True, index=True,default=lambda: str(uuid4()))
    name = mapped_column(String, nullable=False)
    zip_code = mapped_column(String, nullable=False)
    state = mapped_column(String, nullable=False)
    neighborhood = mapped_column(String, nullable=True)
    public_place = mapped_column(String, nullable=False)  
    number_addres = mapped_column(Integer, nullable=True)
    start_date = mapped_column(Date, nullable=True)
    end_date = mapped_column(Date, nullable=True)
    reports = relationship("Report", back_populates="work")
    proprietary_id = mapped_column(ForeignKey("proprietaries.id"), nullable=False)
    proprietary = relationship("Proprietary", back_populates="works")
    rentequipment = relationship("RentEquipment", back_populates="work")
    jobs = relationship("Job", back_populates="works")
    created_at = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

class RentEquipment(Base):
    __tablename__ = 'rents-equipments'
    id: Mapped[String] = mapped_column(String, primary_key=True, index= True, default=lambda: str(uuid4()))
    equipment_id = mapped_column(ForeignKey("equipments.id"), nullable=False)
    work_id = mapped_column(ForeignKey("works.id"), nullable=False)
    start_time = mapped_column(DateTime(timezone=True), default=func.now(), nullable=False) 
    end_time = mapped_column(DateTime(timezone=True), nullable=False) 
    comments = mapped_column(String, nullable= True)
    equipments = relationship("Equipment", back_populates="rentequipment")
    work = relationship("Work", back_populates="rentequipment")
    created_at = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class Equipment(Base):
    __tablename__ = 'equipments'
    id: Mapped[String] = mapped_column(String, primary_key=True, index= True, default=lambda: str(uuid4()))
    brand = mapped_column(String, nullable=True)
    type = mapped_column(String, nullable=True)
    description = mapped_column(String, nullable=True)
    quantity = mapped_column(Integer, nullable=True)
    created_at = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    rentequipment = relationship("RentEquipment", back_populates="equipments")

class Material(Base):
    __tablename__ = 'materials'
    id: Mapped[String] = mapped_column(String, primary_key=True, index= True, default=lambda: str(uuid4()))
    type = mapped_column(String, nullable=True)
    cust = mapped_column(Float, nullable=True)
    quantity = mapped_column(Integer, nullable=True)
    created_at = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    report_id = mapped_column(ForeignKey("reports.id"), nullable=True)
    report = relationship("Report", back_populates="materials")