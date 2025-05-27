FROM python:3.10  # not slim, ensures C extensions build cleanly

# System dependencies
RUN apt-get update && \
    apt-get install -y build-essential python3-dev gcc g++ \
                       libxml2-dev libxslt1-dev libffi-dev && \
    apt-get clean

# Set working directory
WORKDIR /app

# Copy only requirements first to cache better
COPY requirements.txt .

# Install dependencies
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy full app
COPY . .

# Start the server
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]
