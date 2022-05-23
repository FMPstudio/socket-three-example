import * as THREE from "three";

export enum ChangeableTypes {
  SLIDER,
  NUMBER_INPUT,
  BUTTON,
  COLOR_PICKER,
  CHECKBOX,
  DROPDOWNMENU,
}

export type ChangeableProperty = {
  label: string;
  typeOf: ChangeableTypes;
  value?: number | string;
  checked?: boolean;
  onChange?: Function;
  onTrigger?: Function;
  options?: Array<{name: string, onClick: Function}>;
};

export type ChangableProperties = {
  [key: string]: ChangeableProperty;
};

export interface Interactable extends THREE.Object3D {
  get changableProperties(): ChangableProperties;
}
