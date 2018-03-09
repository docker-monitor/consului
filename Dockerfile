FROM node:8.3.0

RUN mkdir -p /app/consul-ui

WORKDIR /app/consul-ui

COPY . /app/consul-ui

RUN npm install

EXPOSE 8088