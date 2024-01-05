import THREE from "three";

export default class CelestialObject {
  _diameter: number;
  _mass: number;
  private _gravity: number;
  _core: any;
  _density: number;
  _objectCentroid: THREE.Object3D<THREE.Object3DEventMap>;
  constructor(
    diameter: number,
    mass: number,
    gravity: number,
    density: number
  ) {
    this._diameter = diameter || 1;
    this._mass = mass || 1;
    this._gravity = gravity || 1;
    this._density = density || 1;
    this._core = new THREE.Object3D();
    this._objectCentroid = new THREE.Object3D();
  }

  get core() {
    return this._core;
  }

  get diameter() {
    return this._diameter;
  }

  get mass() {
    return this._mass;
  }

  get gravity() {
    return this._gravity;
  }

  get density() {
    return this._density;
  }

  get objectCentroid() {
    return this._objectCentroid;
  }
}
