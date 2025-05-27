FROM python:3.10-slim

# 🧠 Good practice environment settings
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# 🧱 Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    g++ \
    git \
    libxml2-dev \
    libxslt1-dev \
    zlib1g-dev \
    libjpeg-dev \
    libpng-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# 🚀 Set working directory
WORKDIR /app

# 📦 Copy and install Python dependencies
COPY requirements.txt .

RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

# 🧬 Copy rest of the code
COPY . .

# 🏃 Start FastAPI app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
