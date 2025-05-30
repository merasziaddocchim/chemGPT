# ======================================================
# 🚀 ChemGPT Dockerfile — Minimal, Clean (May 2025)
# For FastAPI API Gateway / Minimal Backend
# No chemistry/ML dependencies!
# ======================================================

FROM python:3.10-slim

# Install only essential OS dependencies for FastAPI backend
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy requirements and install all Python dependencies
COPY requirements.txt .

RUN pip install --upgrade pip setuptools wheel && \
    pip install --no-cache-dir -r requirements.txt

# Copy the full application codebase into the container
COPY . .

# Expose port (default for FastAPI/Uvicorn)
EXPOSE 8000

# Command to launch FastAPI app with uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
