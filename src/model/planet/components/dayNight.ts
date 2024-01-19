import * as THREE from "three";

export function DayNightMAterial(LightDir, pos) {
  const loader = new THREE.TextureLoader();
  const uniforms = {
    texture1: { type: "t", value: loader.load("/model/textures/enight.png") }, // Текстура для материала 1
    texture2: { type: "t", value: loader.load("/model/textures/empty.png") }, // Текстура для материала 2
    lightDirection: { value: LightDir }, // Направление света
    sphereCenter: { value: pos}
  };

  const fragmentShader = `
       uniform sampler2D texture1;
       uniform sampler2D texture2;
       uniform vec3 lightDirection;
       uniform vec3 sphereCenter;

       varying vec3 vNormal;
       varying vec2 vUv;

    void main() {
        float light = dot(normalize(vNormal), normalize(lightDirection));
        light = clamp(light, 0.0, 1.0); // Ограничиваем значения между 0 и 1
        float brightness = max(dot(vNormal, lightDirection), 0.0);
        float intensity = dot(normalize(lightDirection), vNormal);
        vec3 centerToExternal = normalize(lightDirection - sphereCenter);
        float dotNormal = dot(vNormal, centerToExternal);

        vec4 color1 = texture2D(texture1, vUv);
        vec4 color2 = texture2D(texture2, vUv);

        vec4 finalColor = color1;

        if (intensity < 0.5) {
          finalColor = color2;
        } 
        
        float threshold = 0.1;
    
        float brights = dot(color1.rgb, vec3(0.299, 0.587, 0.114));

        if (brights < threshold) {
          discard;
        }

        gl_FragColor = finalColor;
        
    }`;

  const vertexShader = `
   varying vec2 vUv;
   varying vec3 vNormal;

   void main() {
     vUv = uv;
     vNormal = normalize(normalMatrix * normal);
     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
   }`;

  return new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: false
  });
}
