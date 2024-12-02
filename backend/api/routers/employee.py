from fastapi import APIRouter, HTTPException, Query, Depends
from typing import Annotated, List
from backend.api.core.models import User
from backend.api.services.employee_service import EmployeeService
from backend.api.core.schemas import EmployeeSchema, EmployeePublic
from backend.api.dependencies import get_employee_service, get_current_user

router = APIRouter(
    prefix="/employee",
    tags=["employee"]
)

@router.post("", response_model=EmployeePublic)
def add_employee(
    employee: EmployeeSchema,
    employee_service: Annotated[EmployeeService, Depends(get_employee_service)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    try:
        return employee_service.create_employee(employee.name, employee.rg, employee.cpf, employee.role, employee.salary, employee.work_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Deu erro: {str(e)}")
    
@router.put("/{id}/update", response_model=EmployeePublic)
def update_employee(
    id: str,
    employee: EmployeeSchema,
    employee_service: Annotated[EmployeeService, Depends(get_employee_service)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    try: 
        updated_employee = employee_service.update(id, employee.salary, employee.role, employee.work_id)
        if isinstance(updated_employee, str):
            raise HTTPException(status_code=404)
        return updated_employee
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Deu erro: {str(e)}")
    
@router.get("", response_model=List[EmployeePublic])
def getall_employees(
    employee_service: Annotated[EmployeeService, Depends(get_employee_service)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    try:
        return employee_service.all()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Deu erro: {str(e)}")
    
@router.get("/{id}", response_model=EmployeePublic)
def get_employee(
    id: str,
    employee_service: Annotated[EmployeeService, Depends(get_employee_service)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    try:
        employee = employee_service.get(id)
        if employee is None:
            raise HTTPException(status_code=404, detail=f"ID: '{id}'não encontrado.")
        return employee
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Deu erro: {str(e)}")
    
@router.delete("/{id}", response_model=EmployeePublic)
def delete_employee(
    id:str,
    employee_service: Annotated[EmployeeService, Depends(get_employee_service)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    try:
        result = employee_service.delete(id)
        if result is None:
            raise HTTPException(status_code=404, detail=f"ID: '{id}'não encontrado.")
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Deu erro: {str(e)}")