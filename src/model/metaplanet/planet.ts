import * as THREE from "three";

import {surfVertShader, surfFragShader, atmoVertShader, atmoFragShader } from './shaders';

export type MetaPlanetParams = {
    radius: number,
    textureDay: THREE.Texture,
    textureNight: THREE.Texture,
    textureClouds: THREE.Texture,
    sun: THREE.Object3D,
    camera: THREE.Object3D,
    rotationSpeed: number, // rad in sec
}

export class MetaPlanet extends THREE.Group {
    private _params: MetaPlanetParams;
    private _surfaceUniforms;
    private _surfMesh: THREE.Mesh;
    private _atmoUniforms: any[];
    private _currRotation = 0;

    constructor(aParams: MetaPlanetParams) {
        super();
        this._params = aParams;
        this.initSurface();
        this.initAtmo();
    }

    private initSurface() {
        const radius = this._params.radius;
        const tDay = this._params.textureDay;
        // tDay.wrapS = THREE.RepeatWrapping;
        // tDay.wrapT = THREE.RepeatWrapping;
        const tNight = this._params.textureNight;
        // tNight.wrapS = THREE.RepeatWrapping;
        // tNight.wrapT = THREE.RepeatWrapping;
        const tClouds = this._params.textureClouds;
        // tClouds.wrapS = THREE.RepeatWrapping;
        // tClouds.wrapT = THREE.RepeatWrapping;

        // planet
        this._surfaceUniforms = {
            uTime: { value: 0 },
            dayTexture: { value: tDay },
            nightTexture: { value: tNight },
            bumpScale: { value: .1 },
            cloudsTexture: { value: tClouds },
            sunDirection: { value: { x: 1, y: 0, z: 0 } },
            cameraDirection: { value: { x: 1, y: 0, z: 0 } },
            rotation: { value: 0 },
        };
        let geom = new THREE.SphereGeometry(radius, 40, 40);
        let mat = new THREE.ShaderMaterial({
            vertexShader: surfVertShader,
            fragmentShader: surfFragShader,
            uniforms: this._surfaceUniforms,
        });
        this._surfMesh = new THREE.Mesh(geom, mat);
        this.add(this._surfMesh);
    }

    private initAtmo() {
        const radius = this._params.radius;
        const atmoLayerCnt = 15;
        const atmoLayerDelta = .015;

        this._atmoUniforms = [];

        for (let i = 0; i < atmoLayerCnt; i++) {
            const opacityFactor = 1 / (atmoLayerCnt / 2.5);

            let atmoUniforms = {
                color1: { value: new THREE.Color(0x74c8fc) },
                color2: { value: new THREE.Color(0x0) },
                fresnelBias: { value: 0.1 },
                fresnelScale: { value: 1. },
                fresnelPower: { value: 2. },
                sunDirection: { value: { x: 1, y: 0, z: 0 } },
                opacity: { value: opacityFactor * (1 - i / atmoLayerCnt) }
            };
            this._atmoUniforms.push(atmoUniforms);

            let atmoGeom = new THREE.SphereGeometry(radius + .05 + i * atmoLayerDelta, 50, 40);
            let atmoMaterial = new THREE.ShaderMaterial({
                vertexShader: atmoVertShader,
                fragmentShader: atmoFragShader,
                uniforms: atmoUniforms,
                transparent: true,
                side: THREE.DoubleSide,
                depthWrite: false,
                blending: THREE.AdditiveBlending
            });

            let atmoMesh = new THREE.Mesh(atmoGeom, atmoMaterial);
            this.add(atmoMesh);
        }

    }

    private updateRotation(dt: number) {
        this._currRotation += this._params.rotationSpeed * dt;
        this._surfMesh.rotation.y = this._currRotation;
    }

    private updateSun() {
        let sun = this._params.sun;
        if (sun) {
            let sunDir = sun.position.clone().sub(this.position).normalize();
            let surfSunDir = sunDir.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), -this._surfMesh.rotation.y);
            // surf
            this._surfaceUniforms.sunDirection.value = surfSunDir;
            // atmo
            for (let i = 0; i < this._atmoUniforms?.length; i++) {
                const uf = this._atmoUniforms[i];
                uf.sunDirection.value = sunDir;
            }
        }
    }

    private updateCam() {
        let cam = this._params.camera;
        if (cam) {
            let camDir = cam.position.clone().sub(this.position).normalize();
            this._surfaceUniforms.cameraDirection.value = camDir;
        }
    }

    update(dt: number) {
        this.updateRotation(dt);
        this.updateSun();
        this.updateCam();
    }

}