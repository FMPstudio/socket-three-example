import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Interactable } from "./interactables/Interactable";

export class Renderer {
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private _scene: THREE.Scene;
  private controls: OrbitControls;

  private mouseMoveCallbacks: Array<Function> = [];

  constructor() {
    makeAutoObservable(this);
  }

  setup(canvas: HTMLCanvasElement) {
    if (canvas === undefined) return;

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x333333);

    this._scene = new THREE.Scene();

    const fov = 40;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 100;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.set(2, 2, 2);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.renderer.domElement.addEventListener(
      "pointermove",
      this.onMouseMove.bind(this)
    );

    this.renderer.setAnimationLoop(this.render.bind(this));
  }

  render() {
    this.renderer.render(this._scene, this.camera);
  }

  dispose() {
    this.renderer.domElement.removeEventListener(
      "pointermove",
      this.onMouseMove
    );
    this.renderer?.dispose();
  }

  onMouseMove(ev: MouseEvent) {
    this.controls.enabled = true;
    this.camera.matrixAutoUpdate = true;
    this.mouseMoveCallbacks.forEach((cb: Function) => cb(ev, this));
  }

  addMouseMoveListener(cb: Function) {
    this.mouseMoveCallbacks.push(cb);
  }

  get cameraMatrix(): THREE.Matrix4 {
    return this.camera.matrix;
  }

  addObjectToScene(o: THREE.Object3D) {
    this._scene.add(o);
  }

  updateMatrix(matrixElements: Array<number>) {
    this.controls.enabled = false;
    this.camera.matrixAutoUpdate = false;
    this.camera.matrixWorld.fromArray(matrixElements);
    this.camera.updateMatrixWorld();
  }

  get scene(): THREE.Scene {
    return this._scene;
  }

  // Update the scene with a scene json representation
  updateScene(json: any) {
    const loader = new THREE.ObjectLoader();
    this._scene.clear();
    loader.parse(json, (obj: any) => {
      this._scene.add(obj);
    });
  }

  // Get the scenes JSON representation
  getSceneRepresentation() {
    return this._scene.toJSON();
  }
}

export const RendererInstance = new Renderer();
export const RendererContext = createContext(RendererInstance);
