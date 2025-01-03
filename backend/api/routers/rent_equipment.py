from fastapi import APIRouter, HTTPException, Depends
from typing import Annotated, List
from backend.api.core.models import User, Work, Equipment
from backend.api.core.schemas import RentEquipmentSchema, RentEquipmentSchemaPublic, RentEquipmentUpdateSchema
from backend.api.dependencies import get_rent_equipment_service
from backend.api.services.rent_equipment_service import  RentEquipmentService
router = APIRouter(
    prefix="/rentequipment",
    tags=["rentequipment"]
)
@router.get("", response_model=List[RentEquipmentSchemaPublic])
def getall_rent_equipments(
    rent_equipment_service: Annotated[RentEquipmentService, Depends(get_rent_equipment_service)]
):
    return rent_equipment_service.getall_rent_equipments()
@router.post("", response_model=RentEquipmentSchemaPublic)
def create_rent_equipment(
    rent_equipment: RentEquipmentSchema,
    rent_equipment_service: Annotated[RentEquipmentService, Depends(get_rent_equipment_service)]
):
    # tratar excessoes caso não exista o work ou equipamento status 404 
    work = rent_equipment_service.rent_equipment_repository.db.query(Work).filter(Work.id == rent_equipment.work_id).first()
    if not work:
        raise HTTPException(status_code=404, detail="Obra não encontrada.")
    equipment = rent_equipment_service.rent_equipment_repository.db.query(Equipment).filter(Equipment.id == rent_equipment.equipment_id).first()
    if not equipment:
        raise HTTPException(status_code=404, detail="Equipamento não encontrado.")
    try:
        return rent_equipment_service.create_rent_equipment(work_id=rent_equipment.work_id, equipment_id= rent_equipment.equipment_id, comments= rent_equipment.comments,
    start_time = rent_equipment.start_time,
    end_time = rent_equipment.end_time)
    except Exception as e:
        raise HTTPException(status_code=e.status, detail=e.description)

@router.put("/{id}/update", response_model=RentEquipmentSchemaPublic)
def update_rentequipment(
    id: str,
    rent_equipment: RentEquipmentUpdateSchema,
    rent_equipment_service: Annotated[RentEquipmentService, Depends(get_rent_equipment_service)],
):
    try: 
        updated_rent_equipment = rent_equipment_service.update(id, rent_equipment.comments, rent_equipment.start_time, rent_equipment.end_time)
        if isinstance(updated_rent_equipment, str):
            raise HTTPException(status_code=404)
        return updated_rent_equipment
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Deu erro: {str(e)}")