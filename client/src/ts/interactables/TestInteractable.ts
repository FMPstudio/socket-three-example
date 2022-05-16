import * as THREE from "three";
import { InteractionStoreInstance } from "../InteractionStore";
import { SocketClientInstance } from "../SocketClient";
import {
  ChangableProperties,
  ChangeableTypes,
  Interactable,
} from "./Interactable";

class TestInteractable extends THREE.Mesh implements Interactable {
  constructor() {
    super(new THREE.BoxBufferGeometry(), new THREE.MeshNormalMaterial());
  }

  changeScale(newScale: number) {
    this.scale.set(this.scale.x, newScale, this.scale.z);
    SocketClientInstance.sendInteractables();
  }

  changeRotation(newRot: number) {
    this.rotation.z = newRot;
    this.updateMatrix();
    SocketClientInstance.sendInteractables();
  }

  removeSelf() {
    this.removeFromParent();
    InteractionStoreInstance.deleteInteractable(this);
    SocketClientInstance.sendInteractables();
  }

  get changableProperties(): ChangableProperties {
    return {
      scaleY: {
        label: "Scale [Y]",
        typeOf: ChangeableTypes.SLIDER,
        value: this.scale.y,
        onChange: (v: number) => this.changeScale(v),
      },
      rotateX: {
        label: "Rotation [X]",
        typeOf: ChangeableTypes.NUMBER_INPUT,
        value: this.rotation.z,
        onChange: (v: number) => this.changeRotation(v),
      },
      remove: {
        label: "Delete",
        typeOf: ChangeableTypes.BUTTON,
        onTrigger: () => this.removeSelf(),
      },
    };
  }
}

export { TestInteractable };
