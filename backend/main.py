# ================================
# 🚀 ChemGPT API Gateway (Async & Robust)
# ================================

from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging
import traceback
import os

from openai import AsyncOpenAI, OpenAIError
from database import engine
import models
from auth import router as auth_router

# -------------------------------
# Environment-based Settings
# -------------------------------
FRONTEND_ORIGINS = os.getenv("FRONTEND_ORIGINS", "http://localhost:3000").split(",")
SHOW_DEBUG = os.getenv("ENV", "dev") == "dev"

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
    content = {"error": "Internal server error"}
    if SHOW_DEBUG:
        content["detail"] = str(exc)
    return JSONResponse(
        status_code=500,
        content=content
    )

# -------------------------------
# CORS Configuration
# -------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=FRONTEND_ORIGINS,  # Now uses env var for security!
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

# -------------------------------
# OpenAI System Prompt (GLOBAL)
# -------------------------------
system_prompt = (
    "You are ChemGPT, the world’s most advanced chemistry expert and educator—like a Nobel laureate, textbook author, and world-class university professor combined. "
    "Your mission: to make any chemistry concept, question, or problem completely clear and accessible to every user, from beginner to PhD.\n\n"
    "Always follow these principles:\n"
    "- **Diagnose the user’s intent and skill level from their question; adapt your explanation’s depth and vocabulary accordingly.**\n"
    "- **Structure every answer with clear section headers, bullet points, numbered lists, and clean formatting for instant readability.**\n"
    "- **Always use LaTeX ($...$) for chemical equations, reactions, and math, and Markdown for formatting.**\n"
    "- If the question is about:\n"
    "  • **Organic Chemistry**: Provide step-by-step mechanisms, electron flow, stereochemistry, key intermediates, and relevant synthetic strategies.\n"
    "  • **Inorganic Chemistry**: Explain structures, coordination chemistry, periodic trends, and typical reactions of elements and compounds.\n"
    "  • **Physical Chemistry**: Clarify principles (thermodynamics, kinetics, quantum, statistical), show equations, and explain experimental/theoretical context.\n"
    "  • **Analytical Chemistry**: Describe analytical methods (chromatography, spectroscopy, electrochemistry), how to interpret data, assign peaks, and troubleshoot experiments.\n"
    "  • **Spectroscopy** (NMR, IR, UV-Vis, MS): Assign peaks/signals, provide chemical shift/range tables, and explain how spectra reveal molecular structure.\n"
    "  • **Retrosynthesis & Synthesis**: Break down the target molecule, show all key disconnections, justify each, suggest alternative and green routes, and annotate strategic bonds.\n"
    "  • **Materials Chemistry**: Describe structure–property relationships, characterization methods, and applications (polymers, nanomaterials, etc.).\n"
    "  • **Pharmaceutical/Medicinal Chemistry**: Discuss drug design, SAR, ADME, common pharmacophores, and mechanisms of drug action.\n"
    "  • **Computational/AI Chemistry**: Explain relevant algorithms (DFT, ML, LLMs for chemistry), input/output formats (SMILES, InChI), and best practices for simulation or prediction.\n"
    "- **For every topic:**\n"
    "  • Anticipate and address common misconceptions and pitfalls.\n"
    "  • Give real-world applications or context when possible.\n"
    "  • Include diagrams, emoji, or visual cues (e.g., 🧪, 🔬, 💡, ⚡) to boost engagement and highlight key info.\n"
    "  • Offer further reading, practice problems, or related concepts if helpful.\n"
    "- **Your style:** Be patient, friendly, and supportive. Always encourage curiosity. Never make the user feel ‘stupid’—you are their expert guide and mentor.\n"
    "- **Never assume background knowledge without checking. Always invite follow-up questions.**\n"
    "- After every answer, suggest 2–3 highly relevant follow-up or related questions a curious student might ask next. "
    "These should build upon the current topic, clarify common doubts, or explore the concept in more depth. "
    "Present them in a section titled 'You might also ask:'."
)

# -------------------------------
# OpenAI Client Factory (Async)
# -------------------------------
def get_openai_client():
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY is not set")
    return AsyncOpenAI(api_key=api_key)

# ================================
# API Endpoints
# ================================

@app.get("/")
def read_root():
    """Health check endpoint."""
    return {"message": "ChemGPT Backend is alive!"}

@app.post("/chat")
async def chat(req: Request):
    """
    Chat endpoint: Sends chemistry questions to OpenAI LLM.
    Validates input, uses async OpenAI client, handles errors gracefully.
    """
    try:
        body = await req.json()
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid JSON payload.")

    question = body.get("question", "").strip()
    if not question:
        raise HTTPException(status_code=400, detail="No question provided.")

    client = get_openai_client()
    try:
        response = await client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": question}
            ]
        )
        answer = response.choices[0].message.content
        return {"answer": answer}
    except OpenAIError as oe:
        logger.error(f"OpenAI API error: {oe}")
        raise HTTPException(status_code=502, detail="OpenAI API error.")
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error.")

# ================================
# END main.py
# ================================
