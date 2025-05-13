from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import openai
import os

# ⛔️ Optional: Uncomment these when aizynth or spectroscopy modules are installed
# from aizynth import predict_route
# from spectroscopy import get_spectrum

app = FastAPI()

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load OpenAI key from environment
openai.api_key = os.getenv("OPENAI_API_KEY")

# Health check route
@app.get("/")
def read_root():
    return {"message": "ChemGPT Backend is alive!"}

# Flexible chat endpoint
@app.post("/ask")
async def ask_question(req: Request):
    body = await req.json()
    question = body.get("question", "")

    if not question:
        return {"answer": "⚠️ No question provided."}

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": question}]
    )
    return {"answer": response["choices"][0]["message"]["content"]}

# Optional: Uncomment when needed
# @app.post("/retrosynthesis")
# def retrosynthesis(data: Molecule):
#     return predict_route(data.smiles)

# @app.get("/spectrum/{compound}")
# def spectrum(compound: str):
#     return get_spectrum(compound)
