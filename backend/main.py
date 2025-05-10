from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import os

# ⛔️ Comment these until you confirm they exist and work
# from aizynth import predict_route
# from spectroscopy import get_spectrum

app = FastAPI()

# Enable CORS for all domains
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load your OpenAI API key from environment
openai.api_key = os.getenv("OPENAI_API_KEY")

# Models
class Question(BaseModel):
    query: str

class Molecule(BaseModel):
    smiles: str

# Root route for health check
@app.get("/")
def read_root():
    return {"message": "ChemGPT Backend is alive!"}

# Ask endpoint
@app.post("/ask")
async def ask_question(body: Question):
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": body.query}]
    )
    return {"answer": response["choices"][0]["message"]["content"]}

# Retrosynthesis endpoint (TEMP disabled for testing)
# @app.post("/retrosynthesis")
# def retrosynthesis(data: Molecule):
#     return predict_route(data.smiles)

# Spectrum endpoint (TEMP disabled for testing)
# @app.get("/spectrum/{compound}")
# def spectrum(compound: str):
#     return get_spectrum(compound)
