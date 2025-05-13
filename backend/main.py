from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import os
from openai import OpenAI

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

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

    system_prompt = """
You are ChemGPT, an advanced AI chemistry tutor designed to help students, researchers, and professionals understand organic chemistry reactions, retrosynthesis, and spectroscopy.

When a user asks about a chemical reaction (e.g., Wittig, SN1, E2), you must:
- Give a brief definition
- List detailed step-by-step mechanism
- Show important intermediates (if relevant)
- Explain electron flow in each step using clear text
- Format the answer using **Markdown**

Always aim to be educational, structured, and concise. Never leave vague or incomplete answers. Your responses should guide users like a real chemistry teacher.
"""

    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": question}
        ]
    )
    answer = response.choices[0].message.content
    return {"answer": answer}
