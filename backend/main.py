from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import os
from openai import OpenAI

from database import engine
import models
from auth import router as auth_router

from aizynth import predict_route  # 👈 NEW import for retrosynthesis

app = FastAPI()

# Enable CORS (adjust for production!)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use your frontend domain in prod
    allow_methods=["*"],
    allow_headers=["*"],
)

# 👇 NEW: Create all tables (users, etc.)
models.Base.metadata.create_all(bind=engine)

# 👇 NEW: Add all /register, /login, /verify-email endpoints!
app.include_router(auth_router)

def get_openai_client():
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY is not set")
    return OpenAI(api_key=api_key)

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
        model="gpt-4",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": question}
        ]
    )

    answer = response.choices[0].message.content
    return {"answer": answer}

# ===========================
#  NEW: RETROSYNTHESIS ENDPOINT
# ===========================
@app.post("/retrosynthesis")
async def retrosynthesis(req: Request):
    body = await req.json()
    smiles = body.get("smiles", "")
    if not smiles:
        return {"answer": "⚠️ No SMILES provided."}
    return predict_route(smiles)
