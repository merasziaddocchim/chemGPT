FROM python:3.10
RUN apt-get update && apt-get install -y build-essential
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
