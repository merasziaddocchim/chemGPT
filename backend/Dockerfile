FROM python:3.10

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    python3-dev \
    libxml2-dev \
    libxslt1-dev \
    zlib1g-dev \
    libffi-dev \
    libjpeg-dev \
    gcc \
    g++ \
    default-jdk \
    git \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Upgrade pip and install dependencies
RUN pip install --upgrade pip && \
    pip install chemdataextractor && \
    pip install -r requirements.txt

# Run app
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]
