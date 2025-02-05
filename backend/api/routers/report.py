from fastapi import APIRouter, HTTPException, Depends, Query, Response
from typing import Annotated, List
from backend.api.core.models import User
from backend.api.core.schemas import (PhotoPublic, PhotoSchema, ReportPublic, ReportSchema, ObservationPublic, 
                                  ObservationSchema, ActivityPublic, ActivitySchema, ClimatePublic, ClimateSchema)
from backend.api.services.report_service import ReportService
from backend.api.services.work_service import WorkService
from backend.api.dependencies import get_report_service, get_current_user, get_work_service
import pandas as pd
from fastapi.responses import StreamingResponse
from fpdf import FPDF
from datetime import datetime
from io import StringIO
import csv

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
        print(f"Chamando create_report com: work_id={report.work_id}, photos={report.photos}, observations={report.observations}, activities={report.activities}")
        created_report = report_service.create_report(report.work_id, report.photos, report.observations, report.activities)
        print(f"Relatório criado: {created_report}")
        return created_report
    except Exception as e:
        print(f"Erro ao criar relatório: {e}")
        raise HTTPException(status_code=400, detail=f"Deu erro: {str(e)}")

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

@router.put("/{id}/addactivity", response_model=ActivityPublic)
def add_activity(
    activity: ActivitySchema,
    report_service: Annotated[ReportService, Depends(get_report_service)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    try:
        return ActivityPublic(activity= report_service.add_activity(activity.report_id, activity.activity))
    except Exception as e:
        raise HTTPException(status_code=400,detail=f"Deu erro: {str(e)}")

@router.put("/{id}/removeactivity", response_model=ActivityPublic)
def remove_activity(
    activity: ActivitySchema,
    report_service: Annotated[ReportService, Depends(get_report_service)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")
    try:
        return ActivityPublic(activity= report_service.remove_activity(activity.report_id, activity.activity))
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
    work_service: Annotated[WorkService, Depends(get_work_service)],
    user_logged: User = Depends(get_current_user)
):
    if not user_logged:
        raise HTTPException(status_code=404, detail="Usuário logado não encontrado.")

    try:
        report = report_service.get(id)
        if not report:
            raise HTTPException(status_code=404, detail="Relatório não encontrado.")
        
        weather = report_service.get_climate(id)
        employees = work_service.get_employees(report.work_id)
        equipment = work_service.get_equipments(report.work_id)
        material = report_service.get_materials(id)

        print(f"Employees: {employees}")  # Verificando se a lista de funcionários está correta

        data = [
            ["", "", "", "", "", "", ""],  # Linha vazia para espaçamento
            ["ID DO RELATÓRIO", "", "", "", "", "", ""],  
            [report.id, "", "", "", "", "", ""],  
            ["", "", "", "", "", "", ""],  # Linha vazia para espaçamento
            ["NOME DO USUÁRIO:", "", "LOCALIZAÇÃO", "", "DATA DE EMISSÃO", "", "CLIMA"],
            [user_logged.name, "", getattr(report, "location", "NÃO informado"), "", report.created_at.strftime("%d/%m/%Y"), "", weather],
            ["", "", "", "", "", "", ""],  # Linha vazia para espaçamento
            ["Observações", "", "", "", "", "", ""],  
            [report.observations, "", "", "", "", "", ""],  
            ["", "", "", "", "", "", ""],  # Linha vazia para espaçamento
            ["ATIVIDADES REALIZADAS", "", "", "", "", "", ""],  
            [report.activities, "", "", "", "", "", ""],  
            ["", "", "", "", "", "", ""],  # Linha vazia para espaçamento
            ["FOTOS", "", "", "", "", "", ""],
            ["", "", "", "", "", "", ""],
        ]

        # Adicionando funcionários
        data.append(["Funcionários", "Nome", "ID", "Função", "Início do Contrato", "Fim do Contrato"])
        for emp in employees:
            data.append([
                    "",  # Coluna vazia para manter alinhamento
                    emp.name,  # Trocar emp["name"] por emp.name
                    emp.id,  # Trocar emp["id"] por emp.id
                    emp.role,  # Trocar emp["role"] por emp.role
                    emp.contract_start.strftime("%d/%m/%Y"),  # Formatando data
                    emp.contract_end.strftime("%d/%m/%Y")  # Formatando data
                ])

        # Adicionando materiais
        data.append(["", "", "", "", "", "", ""])
        data.append(["Materiais", "", "", "", "", "", ""])
        for mat in material:
            data.append(["", mat, "", "", "", "", ""])

        # Adicionando equipamentos
        data.append(["", "", "", "", "", "", ""])
        data.append(["Equipamentos", "", "", "", "", "", ""])
        for equip in equipment:
            data.append(["", equip, "", "", "", "", ""])

        # Criando CSV em memória
        output = StringIO()
        writer = csv.writer(output, delimiter=";", quoting=csv.QUOTE_MINIMAL)
        writer.writerows(data)

        output.seek(0)

        return StreamingResponse(
            output,
            media_type="text/csv",
            headers={"Content-Disposition": f"attachment; filename=report_{id}.csv"}
        )

    except Exception as e:
        print(f"Erro ao gerar CSV: {str(e)}")  # Log do erro
        raise HTTPException(status_code=400, detail=f"Erro ao gerar CSV: {str(e)}")
    
class EngineeringReportPDF(FPDF):
    def header(self):
        # Logo (assumindo que existe na pasta assets)
        # self.image("assets/logo.png", 10, 8, 33)
        
        # Fonte Arial bold 15
        self.set_font('Arial', 'B', 15)
        # Título
        self.cell(0, 10, 'Relatório de Engenharia Civil', 0, 1, 'C')
        # Line break
        self.ln(20)

    def footer(self):
        # Position at 1.5 cm from bottom
        self.set_y(-15)
        # Arial italic 8
        self.set_font('Arial', 'I', 8)
        # Page number
        self.cell(0, 10, f'Página {self.page_no()}/{{nb}}', 0, 0, 'C')

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
        weather_str = str(weather) if weather else "Não disponível"

        # Criar PDF
        pdf = EngineeringReportPDF()
        pdf.alias_nb_pages()
        pdf.add_page()
        
        # Informações do Relatório
        pdf.set_font('Arial', 'B', 12)
        pdf.cell(0, 10, f'Relatório Nº: {id}', 0, 1)
        pdf.cell(0, 10, f'Data: {datetime.now().strftime("%d/%m/%Y")}', 0, 1)
        pdf.cell(0, 10, f'Responsável: {user_logged.name}', 0, 1)
        pdf.ln(10)

        # Seção do Clima
        pdf.set_fill_color(240, 240, 240)
        pdf.set_font('Arial', 'B', 12)
        pdf.cell(0, 10, 'Condições Climáticas', 0, 1, 'L', 1)
        pdf.set_font('Arial', '', 11)
        pdf.multi_cell(0, 10, weather_str)
        pdf.ln(5)

        # Seção de Atividades
        pdf.set_font('Arial', 'B', 12)
        pdf.cell(0, 10, 'Atividades Realizadas', 0, 1, 'L', 1)
        pdf.set_font('Arial', '', 11)
        if hasattr(report, 'activities') and report.activities:
            for activity in report.activities:
                pdf.cell(10, 10, '-', 0, 0)
                pdf.multi_cell(0, 10, str(activity))
        else:
            pdf.multi_cell(0, 10, "Nenhuma atividade registrada")
        pdf.ln(5)

        # Seção de Observações
        pdf.set_font('Arial', 'B', 12)
        pdf.cell(0, 10, 'Observações', 0, 1, 'L', 1)
        pdf.set_font('Arial', '', 11)
        if hasattr(report, 'observations') and report.observations:
            for observation in report.observations:
                pdf.cell(10, 10, '-', 0, 0)
                pdf.multi_cell(0, 10, str(observation))
        else:
            pdf.multi_cell(0, 10, "Nenhuma observação registrada")
        
        # Área para Assinatura
        pdf.ln(20)
        pdf.line(30, pdf.get_y(), 180, pdf.get_y())
        pdf.set_font('Arial', 'I', 10)
        pdf.cell(0, 10, f'Assinatura do Responsável: {user_logged.name}', 0, 1, 'C')

        pdf_output = bytes(pdf.output(dest='S'))
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
