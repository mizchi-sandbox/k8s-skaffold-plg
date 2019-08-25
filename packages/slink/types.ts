export const NS = "slink:call";

export enum Msg {
  CMD = "1"
}

export type WrappedSocket = {
  _socket: SocketInterface;
  call(cmd: string, args: any): Promise<any>;
};

export interface SocketInterface {
  id: string;
  send: any;
  emit: any;
  on: any;
}

export type CmdRequest = {
  scope: typeof NS;
  cmd: string;
  id: string;
  args: any;
};

export type CmdResponse<T = any> =
  | {
      error: true;
      result: T;
      id: string;
    }
  | {
      error?: false;
      result: T;
      id: string;
    };
