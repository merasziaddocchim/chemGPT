# ======================================================
# 🚀 ChemGPT Dockerfile — Final Version (Pure-DAWG + CDE2)
# Compatible with: FastAPI, OpenAI, RDKit, AiZynthFinder, ChemDataExtractor2
# Target: Railway or cloud deployment (no DAWG issues)
# ======================================================

FROM python:3.10-slim

# ⚙️ Minimal runtime dependencies only — no compilers
RUN apt-get update && apt-get install -y --no-install-recommends \
    libxml2 \
    libxslt1.1 \
    libjpeg62-turbo \
    libpng16-16 \
    libfreetype6 \
    libboost-system1.74.0 \
    libboost-python1.74.0 \
    curl \
    && rm -rf /var/lib/apt/lists/*

# ✅ ADD THIS LINE BELOW 👇
ENV CDE_PURE_PYTHON=1

# Set working directory
WORKDIR /app

# 📂 Set working directory
WORKDIR /app

# 🧪 Install dependencies in correct order to avoid wheel conflicts
COPY requirements.txt .

# ✅ Working Python DAWG alternative + CDE deps
RUN pip install --upgrade pip setuptools wheel && \
    pip install --no-cache-dir dawg-python lxml && \
    pip install --no-cache-dir -r requirements.txt && \
    python -m nltk.downloader punkt averaged_perceptron_tagger wordnet && \
    python -m spacy download en_core_web_sm


# 📦 Copy rest of your backend code
COPY . .

# ⏬ Preload ChemDataExtractor2 models to avoid cold start delays
RUN python -c "from chemdataextractor2 import Document; Document('Init')"

# 🌐 Expose default FastAPI port
EXPOSE 8000

# 🚀 Launch server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
