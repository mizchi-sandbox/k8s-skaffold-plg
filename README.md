# k8s playground

My k8s node websocket cluster playground

- k8s
- Skaffold
- GKE
- node / socket.io

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

- dotenv
- production
- use cloud memorystore
- session handling

## LICENSE

MIT
