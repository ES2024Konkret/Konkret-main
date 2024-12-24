from fastapi import FastAPI, HTTPException, APIRouter
from transformers import AutoTokenizer, AutoModelForCausalLM
from pydantic import BaseModel

router = APIRouter(
    prefix="/generate",
    tags=["generate"]
)

tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-2-7b-chat-hf")
model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-2-7b-chat-hf", device_map="auto")

class InputData(BaseModel):
    prompt: str
    max_length: int = 128

@router.post("/generate")
async def generate_text(data: InputData):
    try:
        # Tokenizar a entrada
        inputs = tokenizer(data.prompt, return_tensors="pt", truncation=True)
        
        # Gerar texto
        outputs = model.generate(inputs["input_ids"], max_length=data.max_length)
        
        # Decodificar a saída
        result = tokenizer.decode(outputs[0], skip_special_tokens=True)
        return {"prompt": data.prompt, "response": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))