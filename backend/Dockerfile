FROM python:3.10-slim

# System deps
RUN apt-get update && \
    apt-get install -y build-essential gcc g++ python3-dev libxml2-dev libxslt1-dev && \
    apt-get clean

# Set workdir
WORKDIR /app

# Copy and install
COPY requirements.txt .
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

# Copy app source
COPY . .

# Start server
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]
