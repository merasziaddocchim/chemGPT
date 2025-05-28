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
from aizynth import predict_route  # Retrosynthesis
from chemdata_wrapper import create_chem_extractor  # NEW ChemDataExtractor wrapper

# ---------- Robust Logging & Error Handling ----------
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

# ---------- Enable CORS (Open during development) ----------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with frontend domain in production!
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- Initialize DB models ----------
models.Base.metadata.create_all(bind=engine)

# ---------- Include Routers ----------
app.include_router(auth_router)
app.include_router(spectroscopy_router)

# ---------- OpenAI Client Factory ----------
def get_openai_client():
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY is not set")
    return OpenAI(api_key=api_key)

# ---------- ChemDataExtractor (DAWG-free) with Safe Init ----------
try:
    chem_extractor = create_chem_extractor()
    logger.info("ChemDataExtractor initialized successfully")
except Exception as e:
    logger.error(f"Error initializing ChemDataExtractor: {e}")
    def chem_extractor(text):
        return {"error": "ChemDataExtractor unavailable"}

# ---------- API Endpoints ----------
@app.get("/")
def read_root():
    return {"message": "ChemGPT Backend is alive!"}

@app.post("/chat")
async def chat(req: Request):
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

@app.post("/retrosynthesis")
async def retrosynthesis(req: Request):
    body = await req.json()
    smiles = body.get("smiles", "")
    if not smiles:
        return {"answer": "⚠️ No SMILES provided."}
    return predict_route(smiles)

@app.post("/extract")
async def extract_chemical_info(req: Request):
    body = await req.json()
    text = body.get("text", "")
    if not text:
        return {"error": "⚠️ No text provided."}
    result = chem_extractor(text)
    return {"result": result}
