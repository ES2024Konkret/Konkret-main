from fastapi import APIRouter, Request, Query, Depends, HTTPException
from typing import Annotated, List
from backend.api.core.models import User
from backend.api.services.work_service import WorkService
from backend.api.core.schemas import WorkSchema, WorkPublic, EmployeePublic, ReportPublic, EquipmentPublic, ResponsabilityType
from backend.api.dependencies import get_work_service, get_current_user

router = APIRouter(
    prefix="/work",
    tags=["work"]
)

@router.post("", response_model=WorkPublic)
def add_work(
    work: WorkSchema,
    work_service: Annotated[WorkService, Depends(get_work_service)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")

    if user_logged.responsability_type.value != ResponsabilityType.Engenheiro.value:
        raise HTTPException(
            status_code=403, 
            detail="Apenas engenheiros podem criar obras"
        )

    try:
        return work_service.create_work(
            engineer_id=user_logged.id,
            owner_id=work.owner_id,
            name=work.name,
            zip_code=work.zip_code,
            state=work.state,
            public_place=work.public_place,
            neighborhood=work.neighborhood,
            number_addres=work.number_addres,
            start_date=work.start_date,
            end_date=work.end_date
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Deu erro: {str(e)}")
    
@router.get("",response_model=List[WorkPublic])
def getall_works(
    work_service: Annotated[WorkService, Depends(get_work_service)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    try:
        return work_service.all()
    except Exception as e:
        raise HTTPException(status_code=400,detail=f"Deu erro: {str(e)}")
    
@router.get("/proprietary/{owner_id}/works", response_model=list[WorkPublic])
def get_works_by_owner_id(
    owner_id: str,
    work_service: Annotated[WorkService, Depends(get_work_service)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")

    try:
        works = work_service.get_works_by_owner_id(owner_id)
        if not works:
            raise HTTPException(status_code=404, detail="Nenhuma obra encontrada para este proprietário.")
        return works
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Deu erro: {str(e)}")
    
@router.get("/{id}", response_model=WorkPublic)
def get_work(
    id: str,
    work_service: Annotated[WorkService, Depends(get_work_service)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    try:
        return work_service.get(id)
    except Exception as e:
        raise HTTPException(status_code=400,detail=f"Deu erro: {str(e)}")
    
@router.delete("/{id}", response_model=WorkPublic)
def delete_work(
    id: str,
    work_service: Annotated[WorkService, Depends(get_work_service)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    try:
        return work_service.delete(id)
    except Exception as e:
        raise HTTPException(status_code=e.status_code,detail=f"Deu erro: {e.detail}")
    
@router.put("/{id}/addreport", response_model=WorkPublic)
def add_report(
    id: str,
    report_id: str,
    work_service: Annotated[WorkService, Depends(get_work_service)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    try:
        return work_service.add_report(id, report_id)
    except Exception as e:
        raise HTTPException(status_code=400,detail=f"Deu erro: {str(e)}")
    
@router.put("/{id}/removereport", response_model=WorkPublic)
def remove_report(
    id: str,
    report_id: str,
    work_service: Annotated[WorkService, Depends(get_work_service)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    try:
        return work_service.remove_report(id, report_id)
    except Exception as e:
        raise HTTPException(status_code=400,detail=f"Deu erro: {str(e)}")
    
@router.get("/{id}/proprietary", response_model=WorkPublic)
def get_proprietary(
    id: str,
    work_service: Annotated[WorkService, Depends(get_work_service)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    try:
        return work_service.proprietary(id)
    except Exception as e:
        raise HTTPException(status_code=400,detail=f"Deu erro: {str(e)}")
    
@router.get("/{id}/reports", response_model=List[ReportPublic])
def get_reports(
    id: str,
    work_service: Annotated[WorkService, Depends(get_work_service)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    try:
        return work_service.reports(id)
    except Exception as e:
        raise HTTPException(status_code=400,detail=f"Deu erro: {str(e)}")
    
@router.get("/{id}/workers", response_model=List[EmployeePublic])
def get_workers(
    id: str,
    work_service: Annotated[WorkService, Depends(get_work_service)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    try:
        return work_service.workers(id)
    except Exception as e:
        raise HTTPException(status_code=400,detail=f"Deu erro: {str(e)}")
    
@router.get("/{id}/equipments", response_model=List[EquipmentPublic])
def get_equipments(
    id: str,
    work_service: Annotated[WorkService, Depends(get_work_service)]
):
    try:
        return work_service.get_equipments(id)
    except Exception as e:
        raise HTTPException(status_code=400,detail=f"Deu erro: {str(e)}")
    
@router.get("/{id}/employees", response_model=List[EmployeePublic])
def get_employees(
    id: str,
    work_service: Annotated[WorkService, Depends(get_work_service)]
):
    try:
        return work_service.get_employees(id)
    except Exception as e:
        raise HTTPException(status_code=400,detail=f"Deu erro: {str(e)}")
