import * as THREE from "three";
import { getFresnelMat } from "./components/getFresnelMat";


const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;

const detail = 12;
const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(0.8, detail);
const material = new THREE.MeshPhongMaterial({
  map: loader.load("/model/textures/earth/00_earthmap1k.jpg"),
  specularMap: loader.load("/model/textures/earth/02_earthspec1k.jpg"),
  bumpMap: loader.load("/model/textures/earth/01_earthbump1k.jpg"),
  bumpScale: 0.04,
});
const earthMesh = new THREE.Mesh(geometry, material);
earthGroup.add(earthMesh);

const lightsMat = new THREE.MeshBasicMaterial({
  map: loader.load("/model/textures/earth/03_earthlights1k.jpg"),
  blending: THREE.AdditiveBlending,
});
const lightsMesh = new THREE.Mesh(geometry, lightsMat);
earthGroup.add(lightsMesh);

const cloudsMat = new THREE.MeshStandardMaterial({
  map: loader.load("/model/textures/earth/04_earthcloudmap.jpg"),
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending,
  alphaMap: loader.load('/model/textures/earth/05_earthcloudmaptrans.jpg'),
  // alphaTest: 0.3,
});
const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
cloudsMesh.scale.setScalar(1.003);
earthGroup.add(cloudsMesh);

const fresnelMat = getFresnelMat();
const glowMesh = new THREE.Mesh(geometry, fresnelMat);
glowMesh.scale.setScalar(1.01);
earthGroup.add(glowMesh);

export {
    earthGroup,
    fresnelMat,
    cloudsMesh,
    cloudsMat,
    lightsMesh,
    lightsMat,
    earthMesh,
    glowMesh
}