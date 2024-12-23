from fastapi import FastAPI, HTTPException, APIRouter
from transformers import AutoTokenizer, AutoModelForCausalLM

# Carregar modelo e tokenizer
tokenizer = AutoTokenizer.from_pretrained("gpt2")
model = AutoModelForCausalLM.from_pretrained("gpt2")

router = APIRouter(
    prefix="/generate",
    tags=["generate"]
)

@router.post("/generate/")
async def generate_text(prompt: str, max_length: int = 50):
    try:
        # Tokenizar entrada
        inputs = tokenizer.encode(prompt, return_tensors="pt")
        
        # Gerar texto
        outputs = model.generate(inputs, max_length=max_length, num_return_sequences=1)
        result = tokenizer.decode(outputs[0], skip_special_tokens=True)
        
        return {"generated_text": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Roda o servidor com: uvicorn main:app --reload
