from fastapi import APIRouter, HTTPException, Depends
from typing import Annotated, List
from backend.api.core.models import User
from backend.api.core.schemas import MaterialPublic, MaterialSchema, MaterialUpdateSchema
from backend.api.services.material_service import MaterialService
#from backend.api.services.rent_material_service import RentMaterialService
from backend.api.dependencies import get_material_service#, get_rent_material_service
router = APIRouter(
    prefix="/material",
    tags=["material"]
)

@router.get("", response_model=List[MaterialPublic])
def getall_materials(
    material_service: Annotated[MaterialService, Depends(get_material_service)]
):
    try:   
        return material_service.all()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Deu erro: {str(e)}")


@router.post("", response_model=MaterialPublic)
def add_material(
    material: MaterialSchema,
    material_service: Annotated[MaterialService, Depends(get_material_service)]
):
    try:
        return material_service.create_material(material.cust, material.quantity, material.type) 
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Deu erro: {str(e)}")

@router.delete("/{id}", response_model=MaterialPublic)
def delete_material(
    id: str,
    material_service: Annotated[MaterialService, Depends(get_material_service)]
    #rent_material_service:  Annotated[RentMaterialService, Depends(get_rent_material_service)]
    ):
    try:
        return material_service.delete_material(id) 
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Deu erro: {str(e)}")
    
@router.put("/{id}", response_model=MaterialUpdateSchema)
def update_material(
    id: str,
    material: MaterialUpdateSchema,
    material_service: Annotated[MaterialService, Depends(get_material_service)]
    ):
    try:
        updated = material_service.update_material(id, material.cust, material.quantity, material.type)
        if isinstance(updated, str):
            raise HTTPException(status_code=404)
        return updated
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Deu erro: {str(e)}")
    
@router.get("/{id}", response_model=MaterialPublic)
def getMaterial(
    id: str,
    material_service: Annotated[MaterialService, Depends(get_material_service)]
):
    try:
        return material_service.get_byID(id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Deu erro: {str(e)}")