# k8s playground

My k8s node websocket cluster playground

- k8s
- Skaffold
- node / socket.io
- GKE
  - Cloud Memorystore

## How to use

Edit `gcr.io/gcr.io/mizchi-k8s-plg/node-example` to your uploadable endpoint.

## Development

```bash
# client
cd client
yarn dev # start webpack --watch

# server
skaffold dev
```

## TODO

- production
- session handling
- HTTPS

## LICENSE

MIT
