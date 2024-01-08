import React, { useState, useEffect, useContext } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { InteractionManager } from "three.interactive";
import gsap from "gsap";
import { camObject, pointVector } from "./types";
import * as config from "./config";
import { FarStars } from "./stars/objects/FarStars";
import { BigStar } from "./stars/objects/BigStar";
import { BigStar2 } from "./stars/objects/BigStar2";

// import vsStarPoints from './stars/shaders/pointstar/vertex.glsl';
// import fgStarPoints from './stars/shaders/pointstar/fragment.glsl';

const vsStarPoints = `
varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
    vNormal = normalize(normalMatrix * normal); // Нормаль вершины
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz; // Позиция вершины относительно камеры
    gl_Position = projectionMatrix * mvPosition;
}
`

const fgStarPoints = `
varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
    // Расчет угла между нормалью и направлением на камеру
    float intensity = dot(normalize(vViewPosition), vNormal);
    float edgeFactor = smoothstep(0.0, 1.0, intensity);

    // Цвет и прозрачность сферы
    vec4 color = vec4(1.0, 1.0, 0.0, edgeFactor); // Белый цвет с учетом прозрачности

    gl_FragColor = color;
}`

let isCamMoving = false;

const loader = new GLTFLoader();
const scene = new THREE.Scene();
const defaultMaterials = new Map<string, THREE.Material>();

const pointMaterial = new THREE.ShaderMaterial({
  vertexShader: vsStarPoints,
  fragmentShader: fgStarPoints,
  transparent: true,
  side: THREE.DoubleSide
});

const camera = new THREE.PerspectiveCamera(
  45,
  config.scenesize.x / config.scenesize.y,
  1,
  config.baseCamDistance
);

let cameraTarget = new THREE.Vector3();

const renderer = new THREE.WebGLRenderer({
  alpha: true,
});

scene.add(camera);

const ld = config.LightData;
const lf = config.FreeLights;

if (config.SetAmbientLight) {
  const light = new THREE.AmbientLight(
    config.baseLightIntense,
    config.lightStrength
  );
  scene.add(light);
}

ld.forEach((li) => {
    const light = new THREE.DirectionalLight(
      config.baseLightIntense,
      config.lightStrength
    );
    light.position.set(li.x, li.y, li.z);
    scene.add(light);
});

lf.forEach((li) => {
  const light = new THREE.PointLight(0xffffff, 1);
  light.position.set(li.x, li.y, li.z);
  scene.add(light);
});

const interactionManager = new InteractionManager(
  renderer,
  camera,
  renderer.domElement
);


const stars = new FarStars({
  starsCount: 6000
})

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  interactionManager.update();
  stars.update(1 / 60);
}

animate();

function onWindowResize() {
  camera.aspect = ((window.innerWidth * 0.98) / window.innerHeight) * 0.98;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth * 0.98, window.innerHeight * 0.98);
}

window.addEventListener("resize", onWindowResize, false);

renderer.setSize(config.scenesize.x, config.scenesize.y);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;

const controls = new OrbitControls(camera, renderer.domElement);

if (config.EnableMove) {
  controls.enableZoom = true;
  controls.enableRotate = true;
  controls.enablePan = true;
} else {
  controls.enableZoom = false;
  controls.enableRotate = false;
  controls.enablePan = false;
}

controls.listenToKeyEvents(window);
controls.update();

let framesNum = config.animFps;

let lastFrameTime = 0;
let frameCount = 0;

function updateFPS(currentTime: number) {
  frameCount++;
  if (currentTime >= lastFrameTime + 1000) {
    let fps = frameCount;
    framesNum = fps;
    frameCount = 0;
    lastFrameTime = currentTime;
  }
  requestAnimationFrame(updateFPS);
}

requestAnimationFrame(updateFPS);

controls.addEventListener("change", function () {
  // This function will be called when the controls change (e.g., when the user interacts with them)
  // You can put your custom code here to react to the changes
  console.log("Position: ")
  console.log(camera.position);
  console.log("Rotation: ")
  console.log(camera.rotation);
  var cameraTarget = new THREE.Vector3();
  console.log("Target: ")
  console.log(camera.getWorldDirection(cameraTarget));
});

function initCameraPosition(aDefaultConfig: camObject) {
  let c = aDefaultConfig;
  camera?.position.set(c.position.x, c.position.y, c.position.z);
  // camera?.rotation.set(c.rotation._x, c.rotation._y, c.rotation._z);
  cameraTarget?.copy(c.target as any);
  camera?.lookAt(cameraTarget);
}

export async function MoveCamera(aConfig: camObject) {
  // controls.target.set(point.x, point.y, point.z);
  // debugger;

  const DUR = config.animDuration / 1000;

  if (isCamMoving) return;
  isCamMoving = true;

  // move camera
  gsap.to(camera.position, {
    x: aConfig.position.x,
    y: aConfig.position.y,
    z: aConfig.position.z,
    duration: DUR,
    ease: "power1.out",
  });

  // move camera target
  if (!aConfig.target) {
    console.warn(`!aConfig.target`, aConfig);
    return;
  }
  gsap.to(cameraTarget, {
    x: aConfig.target.x,
    y: aConfig.target.y,
    z: aConfig.target.z,
    duration: DUR,
    ease: "power1.out",
    onUpdate: () => {
      camera.lookAt(cameraTarget);
    },
  });

  // TODO: так нельзя, с этим надо что-то делать
  setTimeout(() => {
    // controls.target.set(point.x, point.y, point.z); //Точка, вокруг которой идёт вращение мышкой
    isCamMoving = false;
  }, config.animDuration * 1 + 11);

  // controls.update()
}

export function ShowElements() {
  scene.children.forEach((subScene) => {
    if (subScene.type === "Group") {
      subScene.traverse((child: any) => {
        if (child.children.length === 0) {
          child.visible = true;
        }
      });
    }
  });
}

function animateModel(child: THREE.Mesh) {
  child.rotation.y += 0.001;
}

camera.position.set(
  config.defaultCam.position.x,
  config.defaultCam.position.y,
  config.defaultCam.position.z
);
camera.rotation.set(
  config.defaultCam.rotation._x,
  config.defaultCam.rotation._y,
  config.defaultCam.rotation._z
);

controls.target.set(0, 0, 0);
let rotatable: THREE.Group;
let childs : any = [];

function ScaleItem (name: string) {
  const item = scene.getObjectByName(name);
  if (item) {
    const scrW = window.innerWidth;
    if (scrW < 1200) {
      item.scale.set(0.012, 0.012, 0.012)
    }
  }
}

const labelMaterial = new THREE.SpriteMaterial({
  color: 0xff00000,
  side: THREE.DoubleSide,
  transparent: true,
});
const labelMaterial2 = new THREE.SpriteMaterial({
  color: 0x00000ff,
  side: THREE.DoubleSide,
  transparent: true,
});

const root = new THREE.Object3D();
root.position.x = 1;
const label = new THREE.Sprite(labelMaterial);
const label2 = new THREE.Sprite(labelMaterial2);
label.position.x = 1;
label2.position.x = 1;
label2.position.z = -1;
let bigStar: BigStar2;

const ModelSetup = (gltf: any) => {
  console.log(gltf)
  const model = gltf.scene;
  rotatable = new THREE.Group();
  rotatable.name="PlanetGroup";
  const container = document.querySelector(".render--zone");
  const clicker = document.querySelector(".planetClicker");
  const ev = new Event('click');
  container?.dispatchEvent(ev);
  let counter = 0;

  model.traverse((child: any) => {
    if (child.children.length === 0) {
      /* if (isFirstLoad) {
        defaultMaterials.set(child.name, child.material);
      } */
      childs.push(child);
      console.log(child.name);
      console.log(child.scale);

      if (child.name === "Sun") {
        // child.material.color.set(0xFFFB18);
        console.log("Position sun")
        console.log(child.position)
        // child.material = material;
        const material = new THREE.MeshStandardMaterial({
          color: 0xffff00, // основной цвет объекта
          emissive: 0xffff00 // цвет самосветящегося эффекта
      });
      const textureLoader = new THREE.TextureLoader();
      const sunTexture = textureLoader.load('model/textures/sun_detailed.jpg');
        const sunMaterial = new THREE.MeshPhongMaterial({
            map: sunTexture,
            lightMap: sunTexture,
            transparent: true,
            opacity: 0.85, // 0.8
            // shading: THREE.SmoothShading
          });
        child.material = sunMaterial;
        // child.material = pointMaterial;
      }

      if (child.name === "Planet") {
        child.material.color.set(0x141414); // 0x007fff
        const textureLoader = new THREE.TextureLoader();
        const nightTexture = textureLoader.load('model/textures/enight.jpg');
        const materialClouds = new THREE.MeshLambertMaterial( {

					map: textureLoader.load( 'model/textures/enight.jpg' ),
					transparent: true

				} );

        const material = new THREE.MeshPhongMaterial({
          map: nightTexture,
          emissiveMap: nightTexture,
          emissive: new THREE.Color(0x010101) });
        
        child.material = material;
      }

      if (child.name === "StarSky") {
        const textureLoader = new THREE.TextureLoader();
        // const texture = textureLoader.load('model/stars-hero.jpg'); // map: texture
        // const material = new THREE.MeshPhongMaterial({ color: 'transparent', side: THREE.DoubleSide  });
        child.rotateY(-0.3);
        // child.material = material;
        child.visible = false;
      }
      rotatable.add(child.clone());
      /* if (child.name !== "Sun") {
        rotatable.add(child.clone());
      } else {
        bigStar = new BigStar2(child.position, camera, 3, {starSize: 1, galaxyColor: {r: 0, g: 0, b: 0}});
        // bigStar.rotateX(camera.rotation.x);
        bigStar.rotateY(camera.rotation.y);
        // bigStar.rotateZ(camera.rotation.z);
        console.log(bigStar.rotation);
        rotatable.add(bigStar);
      } */
      child.visible = false;
    }
    counter++;
  });
  
  rotatable.add(stars)
  rotatable.add(label)
  rotatable.add(label2)

  scene.add(rotatable);

  stars.update(1);
  // ScaleItem("Sun");
  // ScaleItem("Planet");

  window.addEventListener("resize", () => {
    // ScaleItem("Sun");
    // ScaleItem("Planet");
  })

  // interactionManager.update();

  if (container) {
    container.appendChild(renderer.domElement);
  } else {
    console.log("Not found container!");
  }

  return true;
};


const SelectVRP = () => {
  const target1 = bigStar;
  if (rotatable) {
    gsap.to(rotatable.rotation, {
      duration: 1,  // Animation duration in seconds
      y: 0,  // Rotate 360 degrees around the y-axis
      repeat: 0,  // Repeat indefinitely
      ease: 'power1.inOut',  // Linear easing
      onUpdate: () => {
        frameCount++
        const delAngle = Math.PI - target1?.rotation.y || 0;
        // console.log(delAngle)
        stars.azimutAngle = delAngle;
        console.log(delAngle);
        stars.update(1000 / 140);
        if (bigStar) {
          bigStar.rotateY(delAngle);
          bigStar.update(1/140);
        }
        // stars.polarAngle = delAngle;
      },
      onComplete: () => {
        if (bigStar) {
          bigStar.rotateY(0);
          bigStar.update(1/140);
        }
      }
    })
  }
}

const SelectVAO = () => {
  // rotatable.rotation.y = Math.PI / 2
  const target1 = bigStar;
    let frameCount = 0;
    if (rotatable) {
      gsap.to(rotatable.rotation, {
        duration: 1,  // Animation duration in seconds
        y: Math.PI,  // Rotate 360 degrees around the y-axis
        repeat: 0,  // Repeat indefinitely
        ease: 'power1.inOut',  // Linear easing
        onUpdate: () => {
          frameCount++
          const delAngle = Math.PI - target1?.rotation.y || 0;
          console.log(rotatable.rotation.x)
          stars.azimutAngle = delAngle;
          if (bigStar) {
            bigStar.rotateY(bigStar.rotation.y + Math.PI * (frameCount / 140));
            bigStar.update(1/140);
          }
        },
        onComplete: () => {
          if (bigStar) {
            bigStar.rotateY(-Math.PI);
            bigStar.update(1/140);
          }
        }
      })
    }
  }

loader.load(config.url, ModelSetup); 


const Model3D = () => {
  const [clickable, setClickable] = useState(false);
  const [isFirstLoad, noteFirstLoad] = useState(true);
  const [menuHidden, HideMenu] = useState(true);
  const [menuHeading, SetHeading] = useState("");
  const [rightText, RTSetup] = useState(config.BorderContent[0]);
  const [choose, Choose] = useState('VRP');

  useEffect(() => {
    // loader.load(config.url, ModelSetup); 
    const vrpBtn = document.getElementById("selectVRP");
    const vaoBtn = document.getElementById("selectVAO");
    if (vrpBtn && vaoBtn) {
      vrpBtn.addEventListener('click', () => {
        vrpBtn.classList.add("selected");
        vaoBtn.classList.remove("selected");
        // MoveCamera(config.defaultCam);
        Choose('VRP')
        SelectVRP();
      })
      vaoBtn.addEventListener('click', () => {
        vrpBtn.classList.remove("selected");
        vaoBtn.classList.add("selected");
        // MoveCamera(config.finalCam);
        Choose('VAO')
       SelectVAO();
      })
    }
  }, []);

  return (
    <>
      <div className="renderBkg" style={{transform: `translateX(${choose === 'VRP' ? 0 : -100}vw)`}} />
      <div className="render--zone" />
    </>
  );
};

export default Model3D;
