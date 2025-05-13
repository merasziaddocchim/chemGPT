from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
import os

app = FastAPI()

# Allow frontend access via CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set up OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Pydantic model for incoming question
class QuestionRequest(BaseModel):
    question: str

@app.get("/")
def read_root():
    return {"message": "ChemGPT Backend is alive!"}

@app.post("/ask")
async def ask_question(payload: QuestionRequest):
    try:
        if not payload.question:
            return {"answer": "⚠️ No question provided."}

        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are ChemGPT, an expert chemistry tutor. "
                        "When answering questions, always use a clear, structured, and educational tone. "
                        "Explain reactions like Wittig, SN1, Diels-Alder using:
"
                        "- What the reaction does
"
                        "- Reagents and conditions
"
                        "- Step-by-step mechanism
"
                        "- Final product and notes
"
                        "Your tone should be informative and helpful for students and researchers. Avoid short or vague answers."
                    )
                },
                {"role": "user", "content": payload.question}
            ]
        )

        return {"answer": response.choices[0].message.content}

    except Exception as e:
        return {"error": f"❌ Error from backend: {str(e)}"}
