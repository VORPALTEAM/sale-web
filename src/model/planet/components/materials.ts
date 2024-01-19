import * as THREE from "three";
import { planetFragmentShader, planetVertexShader } from "~/model/stars/strshaders";

const lightsMap = new THREE.TextureLoader().load(
    "/model/textures/enight.jpg" // globusnight.jpg
  );
  const atmMap = new THREE.TextureLoader().load("/model/textures/atm.png");
  const textureMap = new THREE.TextureLoader().load(
    "/model/textures/globusday.jpg"
  );
  
export const earthMaterial = (intensity: number) => {
    return new THREE.MeshStandardMaterial({
      map: textureMap,
      emissive: 0xffffff,
      emissiveIntensity: intensity,
      emissiveMap: lightsMap,
      side: THREE.DoubleSide,
    });
  };

const textureLoader = new THREE.TextureLoader();

export const planetShaderMaterial = (vector: THREE.Vector3) => {
    const uniforms = {
      sunDirection: { value: vector },
      dayTexture: { value: textureLoader.load("/model/textures/globusday.jpg") },
      nightTexture: {
        value: textureLoader.load("/model/textures/globusnight.jpg"),
      },
    };
  
    return new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: planetVertexShader,
      fragmentShader: planetFragmentShader,
    });
  };