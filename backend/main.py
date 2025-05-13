from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import os
from openai import OpenAI

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.get("/")
def read_root():
    return {"message": "ChemGPT Backend is alive!"}

@app.post("/ask")
async def ask_question(req: Request):
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

    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": question}
        ]
    )

    answer = response.choices[0].message.content
    return {"answer": answer}
