from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from aizynth import predict_route
from spectroscopy import get_spectrum
import openai
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

openai.api_key = os.getenv("OPENAI_API_KEY")

@app.post("/ask")
async def ask_question(req: Request):
    body = await req.json()
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": body["query"]}]
    )
    return {"answer": response["choices"][0]["message"]["content"]}

@app.post("/retrosynthesis")
def retrosynthesis(smiles: str):
    return predict_route(smiles)

@app.get("/spectrum/{compound}")
def spectrum(compound: str):
    return get_spectrum(compound)
