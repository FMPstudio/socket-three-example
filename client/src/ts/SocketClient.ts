import { io, Socket } from "socket.io-client";
import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { InteractionStoreInstance } from "./InteractionStore";
import { RendererInstance } from "./Renderer";

export class SocketClient {
  // No good practice to use `any` as types, but ok here as example
  private client: Socket<any, any>;
  private eventMap: Map<string, Function> = new Map();

  constructor() {
    makeAutoObservable(this);
    this.client = io("http://localhost:7777");
    this.client.on("rotation", this.onReceiveRotation.bind(this));
    this.client.on("interactables", this.onReceiveInteractables.bind(this));
  }

  initialize() {
    this.sendInteractables();
  }

  get connected() {
    return this.client.connected;
  }

  get socketId() {
    return this.client.id;
  }

  sendInteractables() {
    this.client.emit(
      "interactables",
      RendererInstance.getSceneRepresentation()
    );
  }

  onReceiveInteractables(data: Array<any>) {
    RendererInstance.updateScene(data);
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
