/*
# slink

Comlink like RPC for socket.io

```
// server
const handlerMap = {
  async foo(args: { id: string }, socket) {
    return "foo:" + args.id + ":" + socket.id;
  }
}
io.on("connection", socket => {
  buildSocket(socket, handlerMap);
});

// client
import { wrapSocket } from "slink";

const socket = io();
socket.on("connect", async () => {
  const wrapped = wrapSocket(socket);
  const res = await wrapped.call("foo", { id: 'a' });
});
```
*/

export type WrappedSocket = {
  _socket: SocketInterface;
  call(cmd: string, args: any): Promise<any>;
};

export interface SocketInterface {
  id: string;
  send: any;
  on: any;
}

export type Request = {
  scope: "slink";
  cmd: string;
  id: string;
  args: any;
};

export type Response<T = any> =
  | {
      scope: "slink";
      error: true;
      result: T;
      id: string;
    }
  | {
      scope: "slink";
      error?: false;
      result: T;
      id: string;
    };

const _sender = new Map();

// for client
export function wrapSocket(socket: SocketInterface): WrappedSocket {
  socket.on("message", (data: Response) => {
    if (data && data.scope !== "slink") {
      return;
    }
    const { error, id, result } = data;
    if (id) {
      const deferred = _sender.get(id);
      _sender.delete(id);
      if (error) {
        deferred.reject(result);
      } else {
        deferred.resolve(result);
      }
    }
  });
  return {
    _socket: socket,
    call(cmd: string, args: any) {
      const id = Math.random().toString();
      return new Promise((resolve, reject) => {
        _sender.set(id, {
          resolve,
          reject
        });
        const request = {
          scope: "slink",
          cmd,
          id,
          args
        } as Request;
        socket.send(request);
      });
    }
  };
}

// for server
export function buildSocket(
  socket: SocketInterface,
  funcMap: { [key: string]: Function }
) {
  socket.on("message", async (data: Request) => {
    if (data && data.scope !== "slink") {
      return;
    }
    const cmd = data.cmd;
    const id = data.id;
    const args = data.args || {};
    try {
      const result = await funcMap[cmd](args, socket);
      socket.send({ result, id, scope: "slink" } as Response);
    } catch (err) {
      console.error(err);
      socket.send({ result: err, id, error: true, scope: "slink" } as Response);
    }
  });
}
