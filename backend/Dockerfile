# ======================================================
# 🚀 ChemGPT Dockerfile — Production-Ready (May 2025)
# Compatible with: FastAPI, OpenAI, RDKit, AiZynthFinder, ChemDataExtractor2, TensorFlow
# ======================================================

FROM python:3.10-slim

# System dependencies for RDKit, CDE2, TensorFlow, and general
RUN apt-get update && apt-get install -y --no-install-recommends \
    libxml2 \
    libxslt1.1 \
    libjpeg62-turbo \
    libpng16-16 \
    libfreetype6 \
    libboost-system1.74.0 \
    libboost-python1.74.0 \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# ENV variables for root pip, CDE2 pure python mode
ENV PIP_ROOT_USER_ACTION=ignore
ENV CDE_PURE_PYTHON=1

WORKDIR /app

# 📦 Install critical dependencies in correct order
COPY requirements.txt .

RUN pip install --upgrade pip setuptools wheel && \
    pip install --no-cache-dir requests==2.23.0 && \
    pip install --no-cache-dir dawg-python==0.7.2 lxml==4.9.3 && \
    pip install --no-cache-dir -r requirements.txt && \
    python -m nltk.downloader punkt averaged_perceptron_tagger wordnet && \
    python -m spacy download en_core_web_sm

# Copy all application code
COPY . .

# ⏬ Preload ChemDataExtractor2 models to avoid cold starts, but do NOT fail build if error
RUN python -c "try: from chemdataextractor2 import Document; Document('Init'); print('ChemDataExtractor2 initialized successfully'); except Exception as e: print(f'Warning: CDE2 init failed: {e}')"

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
