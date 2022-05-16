import { makeAutoObservable, runInAction } from "mobx";
import { createContext } from "react";
import { RendererInstance } from "./Renderer";
import { TestInteractable } from "./interactables";
import { SocketClientInstance } from "./SocketClient";
import { Interactable } from "./interactables/Interactable";

export class InteractionStore {
  public _interactables: Array<TestInteractable> = [];

  constructor() {
    makeAutoObservable(this);
  }

  public addInteractable() {
    runInAction(() => {
      const interactableObject = new TestInteractable();
      this._interactables.push(interactableObject);
      RendererInstance.addObjectToScene(interactableObject);
      SocketClientInstance.sendInteractables();
    });
  }

  public deleteInteractable(removeIa: Interactable) {
    runInAction(() => {
      this._interactables = this._interactables.filter((ia) => {
        return ia.uuid !== removeIa.uuid;
      });
    });
    console.log(this._interactables);
  }

  get interactables(): Array<Interactable> {
    return this._interactables;
  }
}

export const InteractionStoreInstance = new InteractionStore();
export const InteractionStoreContext = createContext(InteractionStoreInstance);
