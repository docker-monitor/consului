FROM consul-ui:1.0.0

WORKDIR /app/consul-ui

COPY . /app/consul-ui

EXPOSE 8088 
