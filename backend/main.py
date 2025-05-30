# ================================
# 🚀 ChemGPT API Gateway (Clean)
# ================================

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging
import traceback
import os

from openai import OpenAI
from spectroscopy import router as spectroscopy_router
from database import engine
import models
from auth import router as auth_router
# ❌ REMOVED: from aizynth import predict_route
# ❌ REMOVED: from chemdata_wrapper import create_chem_extractor

# -------------------------------
# Logging & Error Handling
# -------------------------------
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception: {str(exc)}")
    logger.error(traceback.format_exc())
    return JSONResponse(
        status_code=500,
        content={"error": "Internal server error", "detail": str(exc)}
    )

# -------------------------------
# CORS Configuration
# -------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TODO: Lock down in production!
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------
# Initialize Database (if needed)
# -------------------------------
models.Base.metadata.create_all(bind=engine)

# -------------------------------
# API Routers (User/Auth/Etc.)
# -------------------------------
app.include_router(auth_router)
app.include_router(spectroscopy_router)

# -------------------------------
# OpenAI Client Factory
# -------------------------------
def get_openai_client():
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY is not set")
    return OpenAI(api_key=api_key)

# ================================
# API Endpoints
# ================================

@app.get("/")
def read_root():
    """Health check endpoint."""
    return {"message": "ChemGPT Backend is alive!"}

@app.post("/chat")
async def chat(req: Request):
    """Chat endpoint: Sends chemistry questions to OpenAI LLM."""
    body = await req.json()
    question = body.get("question", "")

    if not question:
        return {"answer": "⚠️ No question provided."}

    system_prompt = (
        "You are ChemGPT, an expert chemistry tutor. "
        "Always explain chemistry questions clearly and in steps. "
        "Use bullet points, numbered lists, or headers when needed. "
        "Avoid dense text blocks. Keep formatting clean and easy to read. "
        "If the user asks about a chemical reaction, always include:\n"
        "- Step-by-step mechanism\n"
        "- Key intermediates and transition states\n"
        "- Any important notes for students\n\n"
        "Respond like a human tutor who really wants the student to understand."
    )

    client = get_openai_client()
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": question}
        ]
    )
    answer = response.choices[0].message.content
    return {"answer": answer}

# ❌ REMOVED: /retrosynthesis and /extract endpoints (now handled by microservices)
# - In the future, to support these, this API gateway should call microservices via HTTP (httpx), NOT via local import.

# Example: To call your microservices in the future, use:
"""
import httpx

@app.post("/retrosynthesis")
async def retrosynthesis(req: Request):
    body = await req.json()
    smiles = body.get("smiles", "")
    if not smiles:
        return {"answer": "⚠️ No SMILES provided."}
    # Forward request to the retrosynthesis microservice
    async with httpx.AsyncClient() as client:
        r = await client.post("https://chemgpt-retro-url/retrosynthesis", json={"smiles": smiles})
        return r.json()
"""

# ================================
# END main.py
# ================================
