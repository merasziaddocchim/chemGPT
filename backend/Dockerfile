# ======================================================
# 🚀 ChemGPT Dockerfile — Final (DAWG-Free + Stable)
# Compatible with: FastAPI, OpenAI, RDKit, AiZynthFinder, ChemDataExtractor2
# ======================================================

FROM python:3.10-slim

# ⚙️ Minimal runtime dependencies only
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

# ✅ Fix pip warning
ENV PIP_ROOT_USER_ACTION=ignore

# ✅ Enable DAWG-free ChemDataExtractor mode
ENV CDE_PURE_PYTHON=1

# 📁 Set working directory
WORKDIR /app

# 📦 Install dependencies
COPY requirements.txt .

RUN pip install --upgrade pip setuptools wheel && \
    pip install --no-cache-dir dawg-python lxml && \
    pip install --no-cache-dir -r requirements.txt && \
    python -m nltk.downloader punkt averaged_perceptron_tagger wordnet && \
    python -m spacy download en_core_web_sm

# 📁 Copy code
COPY . .

# ⏬ Preload ChemDataExtractor2 models
RUN python -c "from chemdataextractor2 import Document; Document('Init')"

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
