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
    super(new THREE.BoxBufferGeometry(), new THREE.MeshBasicMaterial());
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

  changeTransform(x:number,y:number,z:number){
    this.position.set(x,y,z);
    this.updateMatrix();
    SocketClientInstance.sendInteractables();
  }

  changeColor(newColor: string){
    this.material.color.set(newColor);
    SocketClientInstance.sendInteractables();
  }

  changeSwitch(newBoolean: boolean){
    
    SocketClientInstance.sendInteractables();

  }

  dropDownButton1(){
    console.log("Button1")
    SocketClientInstance.sendInteractables();
  }
  dropDownButton2(){
    console.log("Button2")
    SocketClientInstance.sendInteractables();
  }
  dropDownButton3(){
    console.log("Button3")
    SocketClientInstance.sendInteractables();
  }

  // changeToggle(newBoolean: boolean){
    
  //   SocketClientInstance.sendInteractables();

  // }

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
      translateX: {
        label: "Translate [X]",
        typeOf: ChangeableTypes.NUMBER_INPUT,
        value: this.position.x,
        onChange: (v: number) => this.changeTransform(v,this.position.y,this.position.z),
      },
      translateY: {
        label: "Translate [Y]",
        typeOf: ChangeableTypes.NUMBER_INPUT,
        value: this.position.y,
        onChange: (v: number) => this.changeTransform(this.position.x,v,this.position.z),
      },
      translateZ: {
        label: "Translate [Z]",
        typeOf: ChangeableTypes.NUMBER_INPUT,
        value: this.position.z,
        onChange: (v: number) => this.changeTransform(this.position.x,this.position.y,v),
      },



      color: {
        label: "Color",
        typeOf: ChangeableTypes.COLOR_PICKER,
        value: this.material.color, 
        onChange: (v: string) => this.changeColor(v),
      },
      switch: {
        label: "Switch",
        typeOf: ChangeableTypes.CHECKBOX,
        checked: false,
        
        onChange: (v: boolean) => this.changeSwitch(v),
      },

      dropdown: {
        label: "Testmenu",
        typeOf: ChangeableTypes.DROPDOWNMENU,
        options: [
          {
            
            name: "test1",
            onClick: ()=> this.dropDownButton1(),
          },
          {
            name: "test2",
            onClick: ()=> this.dropDownButton2(),
          },
          {
            name: "test3",
            onClick: ()=> this.dropDownButton3(),
          },
        ]
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
