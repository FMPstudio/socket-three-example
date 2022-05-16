import * as THREE from "three";

export enum ChangeableTypes {
  SLIDER,
  NUMBER_INPUT,
  BUTTON,
}

export type ChangeableProperty = {
  label: string;
  typeOf: ChangeableTypes;
  value?: number | string;
  onChange?: Function;
  onTrigger?: Function;
};

export type ChangableProperties = {
  [key: string]: ChangeableProperty;
};

export interface Interactable extends THREE.Object3D {
  get changableProperties(): ChangableProperties;
}
