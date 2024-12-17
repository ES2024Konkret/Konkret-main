from fastapi import APIRouter, HTTPException, Depends, Query, Response
from typing import Annotated, List
from backend.api.core.models import User
from backend.api.core.schemas import (PhotoPublic, PhotoSchema, ReportPublic, ReportSchema, ObservationPublic, 
                                  ObservationSchema, ActivityPublic, ActivitySchema, ClimatePublic, ClimateSchema)
from backend.api.services.report_service import ReportService
from backend.api.dependencies import get_report_service, get_current_user
import pandas as pd
from fastapi.responses import StreamingResponse
from fpdf import FPDF

router = APIRouter(
    prefix="/report",
    tags=["report"]
)

@router.post("", response_model=ReportPublic)
def add_report(
    report: ReportSchema,
    report_service: Annotated[ReportService, Depends(get_report_service)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    try:
        return report_service.create_report(report.work_id, report.photos, report.observations)
    except Exception as e:
        raise HTTPException(status_code=400,detail=f"Deu erro: {str(e)}") 

@router.get("", response_model=List[ReportPublic])
def getall_reports(
    report_service: Annotated[ReportService, Depends(get_report_service)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    try:
        return report_service.all()
    except Exception as e:
        raise HTTPException(status_code=400,detail=f"Deu erro: {str(e)}")

@router.delete("/{id}", response_model=ReportPublic)
def delete_report(
    id: str,
    report_service: Annotated[ReportService, Depends(get_report_service)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    try:
        return report_service.delete(id)
    except Exception as e:
        raise HTTPException(status_code=400,detail=f"Deu erro: {str(e)}")

@router.put("/{id}/addphoto", response_model=PhotoPublic)
def add_photo(
    photo: PhotoSchema,
    report_service: Annotated[ReportService, Depends(get_report_service)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    try:
        photo_path = report_service.add_photo(photo.report_id, photo.photo)
        result = PhotoPublic(photo = photo_path)
        return result
    except Exception as e:
        raise HTTPException(status_code=400,detail=f"Deu erro: {str(e)}")
    
@router.put("/{id}/removephoto", response_model= PhotoPublic)
def remove_photo(
    photo: PhotoSchema,
    report_service: Annotated[ReportService, Depends(get_report_service)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    try:
        photo_path = report_service.remove_photo(photo.report_id, photo.photo)
        return PhotoPublic(photo = photo_path)
    except Exception as e:
        raise HTTPException(status_code=400,detail=f"Deu erro: {str(e)}")
    
@router.put("/{id}/addobservation", response_model=ObservationPublic)
def add_observation(
    observation: ObservationSchema,
    report_service: Annotated[ReportService, Depends(get_report_service)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    try:
        result = report_service.add_observation(observation.report_id, observation.observation)
        return ObservationPublic(observation= result)
    except Exception as e:
        raise HTTPException(status_code=400,detail=f"Deu erro: {str(e)}")
    
@router.put("/{id}/removeobservation", response_model=ObservationPublic)
def remove_observation(
    observation: ObservationSchema,
    report_service: Annotated[ReportService, Depends(get_report_service)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    try:
        return ObservationPublic(observation= report_service.remove_observation(observation.report_id, observation.observation))
    except Exception as e:
        raise HTTPException(status_code=400,detail=f"Deu erro: {str(e)}")

@router.get("/{id}", response_model=ReportPublic)
def get_report(
    id: str,
    report_service: Annotated[ReportService, Depends(get_report_service)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    try:
        return report_service.get(id)
    except Exception as e:
        raise HTTPException(status_code=400,detail=f"Deu erro: {str(e)}")
    
@router.get("/{id}/climate")
def get_climate(
    id: str,
    report_service: Annotated[ReportService, Depends(get_report_service)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    try:
        return report_service.get_climate(id)
    except Exception as e:
        raise HTTPException(status_code=400,detail=f"Deu erro: {str(e)}")
    
@router.get("/csv/")
def getall_csv(
    report_service: Annotated[ReportService, Depends(get_report_service)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    try:
        reports = report_service.all()
        data = []
        for report in reports:
            weather = report_service.get_climate(report.id)
            data.append({
                "ID": report.id,
                "Observações": report.observations,
                "Atividades": report.activities,
                "Clima": weather
            })
        df = pd.DataFrame(data)
        return StreamingResponse(df.to_csv(index=False), media_type="text/csv", headers={"Content-Disposition": "attachment; filename=reports.csv"})
    except Exception as e:
        raise HTTPException(status_code=400,detail=f"Deu erro: {str(e)}")
    
@router.get("/{id}/csv")
def get_csv(
    id: str,
    report_service: Annotated[ReportService, Depends(get_report_service)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    try:
        report = report_service.get(id)
        weather = report_service.get_climate(id)
        data = [{
            "ID": report.id,
            "Observações": report.observations,
            "Atividades": report.activities,
            "Clima": weather
        }]
        df = pd.DataFrame(data)
        return StreamingResponse(
            df.to_csv(index=False), 
            media_type="text/csv", 
            headers={"Content-Disposition": "attachment; filename=report.csv"})
    except Exception as e:
        raise HTTPException(status_code=400,detail=f"Deu erro: {str(e)}")
    
    
@router.get("/{id}/pdf")
def get_pdf(
    id: str,
    report_service: Annotated[ReportService, Depends(get_report_service)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    try:
        
        report = report_service.get(id)
        weather = report_service.get_climate(id)

        
        data = [{
            "ID": report.id,
            "Observações": ", ".join(report.observations),
            "Atividades": ", ".join(report.activities),
            "Clima": weather
        }]
        
      
        pdf = FPDF()
        pdf.set_auto_page_break(auto=True, margin=15)
        pdf.add_page()
        pdf.set_font("Arial", size=12)

       
        pdf.set_font("Arial", style="B", size=16)
        pdf.cell(200, 10, txt=f"Relatório do Trabalho ID: {id}", ln=True, align="C")
        pdf.ln(10)  # Espaço entre título e conteúdo

        
        pdf.set_font("Arial", size=12)
        for col in data[0].keys():
            pdf.cell(0, 10, txt=f"{col}: {data[0][col]}", ln=True)

       
        pdf_output = pdf.output(dest='S').encode('latin1')  # 'S' gera o PDF como bytes

        return Response(
            content=pdf_output,
            media_type="application/pdf",
            headers={"Content-Disposition": f"attachment; filename=report_{id}.pdf"}
        )

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Erro ao gerar o PDF: {str(e)}")

@router.get("/{id}/materials")
def get_materials(
    id: str,
    report_service: Annotated[ReportService, Depends(get_report_service)],
):
    try:
        return report_service.get_materials(id)
    except Exception as e:
        raise HTTPException(status_code=400,detail=f"Deu erro: {str(e)}")
