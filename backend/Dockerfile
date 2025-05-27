# ✅ Base Python image (Python 3.10 recommended for compatibility)
FROM python:3.10-slim

# ✅ Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# ✅ Install essential Linux packages
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

# ✅ Set working directory
WORKDIR /app

# ✅ Copy all backend code
COPY . .

# ✅ Upgrade pip first, then install requirements
RUN pip install --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# ✅ Start FastAPI app using Uvicorn
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]
