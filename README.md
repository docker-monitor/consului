# Consul ui

## Description
Provide a dashboard about consulgw, you can register a service or delete a services form consul by ui. (First version only provide a simple page)

## Update config before startup

Go to config folder, update **API_URL** in dev.env.js

* API_URL (this args reference to consulgw)

## Build and run setup from sources

``` bash
# cd work directory
cd consului

# install dependencies
npm install

# serve with hot reload at localhost:8088
npm run dev

# run all tests
npm test
```

## Build and run from docker
```bash
cd consului
docker build -t consul-ui:1.0.0 .
docker-compose up -d
```
