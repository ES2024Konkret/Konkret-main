from fastapi import APIRouter, Request, Query, Depends, HTTPException
from typing import Annotated, List
from backend.api.core.models import User
from backend.api.services.work_service import WorkService
from backend.api.core.schemas import WorkSchema, WorkPublic, EmployeePublic, ReportPublic
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
    try:
        return work_service.create_work(work.proprietary_id, work.name, work.zip_code, work.state, work.public_place, work.neighborhood, work.number_addres, work.start_date, work.end_date)
    except Exception as e:
        raise HTTPException(status_code=400,detail=f"Deu erro: {str(e)}")
    
@router.get("", response_model=List[WorkPublic])
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
        raise HTTPException(status_code=400,detail=f"Deu erro: {str(e)}")
    
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