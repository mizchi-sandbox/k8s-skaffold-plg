# k8s playground

My k8s node websocket cluster playground

- k8s
- skaffold
- node / socket.io
- GKE
  - Cloud Memorystore

## How to use

Edit `gcr.io/gcr.io/mizchi-k8s-plg/node-example` to your uploadable endpoint.

## Development local

```bash
# run redis
docker-compose up -d

# client
cd client && yarn install && yarn dev # start webpack --watch

# server
cd server && yarn install && yarn dev # start nodemon
```

## Development on k8s

```bash
# client always local on dev
cd client && yarn dev # start webpack --watch

# server
skaffold dev
```

## Deployment

```
skaffold run
```

## TODO

- production
- HTTPS

## LICENSE

MIT
