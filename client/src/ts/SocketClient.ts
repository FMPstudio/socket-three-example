import { io, Socket } from "socket.io-client";
import { makeAutoObservable } from "mobx";
import { createContext } from "react";

export class SocketClient {
  // No good practice to use `any` as types, but ok here as example
  private client: Socket<any, any>;
  private eventMap: Map<string, Function> = new Map();

  constructor() {
    makeAutoObservable(this);
    this.client = io("http://localhost:7777");

    this.client.on("rotation", this.onReceiveRotation.bind(this));
  }

  get connected() {
    return this.client.connected;
  }

  get socketId() {
    return this.client.id;
  }

  sendCameraMatrix(cameraMatrixArray: Array<number>) {
    this.client.emit("rotation", cameraMatrixArray);
  }

  onReceiveRotation(data: Array<number>) {
    const eventFn = this.eventMap.get("rotation");
    if (eventFn) {
      eventFn(data);
    }
  }

  on(event: string, cb: Function) {
    this.eventMap.set(event, cb);
  }
}

export const SocketClientInstance = new SocketClient();
export const SocketClientContext = createContext(SocketClientInstance);
