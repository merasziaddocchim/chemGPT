from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import os

from aizynth import predict_route
from spectroscopy import get_spectrum

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

openai.api_key = os.getenv("OPENAI_API_KEY")

class Question(BaseModel):
    query: str

class Molecule(BaseModel):
    smiles: str

@app.get("/")
def read_root():
    return {"message": "ChemGPT Backend is alive!"}

@app.post("/ask")
async def ask_question(body: Question):
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": body.query}]
    )
    return {"answer": response["choices"][0]["message"]["content"]}

@app.post("/retrosynthesis")
def retrosynthesis(data: Molecule):
    return predict_route(data.smiles)

@app.get("/spectrum/{compound}")
def spectrum(compound: str):
    return get_spectrum(compound)
