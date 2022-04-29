import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class Renderer {
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private controls: OrbitControls;

  private mouseMoveCallbacks: Array<Function> = [];

  setup(canvas: HTMLCanvasElement) {
    if (canvas === undefined) return;

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x333333);

    this.scene = new THREE.Scene();

    const fov = 40;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 100;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.set(2, 2, 2);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    const interactableObject = new THREE.Mesh(
      new THREE.BoxBufferGeometry(),
      new THREE.MeshNormalMaterial()
    );
    this.scene.add(interactableObject);

    this.renderer.domElement.addEventListener(
      "pointermove",
      this.onMouseMove.bind(this)
    );

    this.renderer.setAnimationLoop(this.render.bind(this));
  }

  render() {
    this.renderer.render(this.scene, this.camera);
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

  updateMatrix(matrixElements: Array<number>) {
    this.controls.enabled = false;
    this.camera.matrixAutoUpdate = false;
    this.camera.matrixWorld.fromArray(matrixElements);
    this.camera.updateMatrixWorld();
  }
}

export { Renderer };
