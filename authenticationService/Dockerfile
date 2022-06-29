FROM tiangolo/uwsgi-nginx-flask:python3.8-alpine
RUN apk --update add bash nano gcc libc-dev libffi-dev
COPY ./app /app
COPY ./requirements.txt /requirements.txt
RUN pip install -r /requirements.txt