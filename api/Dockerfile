FROM python:latest

#RUN apt update -y && apt upgrade -y

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY ./app .

EXPOSE 8080
EXPOSE 443

CMD ["python", "main.py"]

