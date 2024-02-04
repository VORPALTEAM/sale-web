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
import { StarSky } from "./stars/objects/StarsSphere";
import {
  planetFragmentShader,
  planetVertexShader,
  starFragment,
  starVertex,
} from "./stars/strshaders";
import { earthGroup, cloudsMesh, earthMesh, glowMesh, lightsMesh } from "./planet";
import { MetaPlanet } from "./metaplanet/planet";

const lightPos = new THREE.Vector3(9,
0,
-3)

const nightVector = new THREE.Vector3(0.05, 0, -0.1);
const dayVector = new THREE.Vector3(0.9, 0, 0.6);
const textureLoader = new THREE.TextureLoader();

let defaultSceneSize = {...config.scenesize}


let isCamMoving = false;
let planet: MetaPlanet;
let bigStar: BigStar2;
let labe: THREE.Mesh;

const loader = new GLTFLoader();
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  defaultSceneSize.x /  defaultSceneSize.y,
  1,
  config.baseCamDistance
);

let cameraTarget = new THREE.Vector3();

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});

// renderer.toneMapping = THREE.ReinhardToneMapping;

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

const stars = new StarSky(9000, 90, 1600);

let framesCount = 0;

const clock = new THREE.Clock();

function animate() {
  framesCount++
  requestAnimationFrame(animate);
  const dlt = clock.getDelta()
  if (bigStar) {
    bigStar.update(dlt / 2);
    bigStar.lookAt(camera.position);
  }

  if (planet) {
    planet.update(dlt);
  }
  renderer.render(scene, camera);
}

animate();

setInterval(() => {
  framesCount = 0;
}, 1000);

animate();

function onWindowResize() {
  defaultSceneSize = {
    x: window.innerWidth * 0.99,
    y: window.innerHeight * 1.49
  }
  camera.aspect = ( defaultSceneSize.x / defaultSceneSize.y);
  camera.updateProjectionMatrix();
  renderer.setSize( defaultSceneSize.x ,  defaultSceneSize.y);
}

window.addEventListener("resize", onWindowResize, false);

renderer.setSize( defaultSceneSize.x,  defaultSceneSize.y);
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
const dayIntensity = 1; //0.001
const nightIntensity = 1; // 1

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
  var cameraTarget = new THREE.Vector3();
  console.log("Position:")
  console.log(camera.position)
  console.log("Rotation:")
  console.log(camera.rotation)
  console.log("Target: ");
  console.log(camera.getWorldDirection(cameraTarget));
});

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

let sunLight: THREE.PointLight;
let sunLHelper: THREE.PointLightHelper;

const ModelSetup = (gltf: any) => {
  const model = gltf.scene;
  rotatable = new THREE.Group();
  rotatable.name = "PlanetGroup";
  const container = document.querySelector(".render--zone");
  const ev = new Event("click");
  container?.dispatchEvent(ev);
  let counter = 0;
  const abstLightPosition = { x: -9.318414180852855, y: 3.5, z: 31.77509357745408 }

  function CreatePlanet(position: THREE.Vector3) {
    const abstLight = new THREE.Mesh(new THREE.SphereGeometry(4), new THREE.MeshBasicMaterial({ color: 0xffffff}));
    abstLight.position.set(abstLightPosition.x, abstLightPosition.y, abstLightPosition.z )
    // rotatable.add(abstLight)
    planet = new MetaPlanet({
      textureDay: textureLoader.load('/model/textures/Earth_Diffuse_6K_final.webp'),
      textureNight: textureLoader.load('/model/textures/Earth_Illumination_6K_final.webp'),
      radius: 4,
      textureClouds: textureLoader.load('/model/textures/2k_earth_clouds.webp'),
      sun: abstLight,// labe,
      camera: camera,
      rotationSpeed: 0.1
    });
    rotatable.add(planet)
    planet.position.set(position.x * 5.9, position.y * 5.9, position.z * 5.9)
  }
  
  function CreateSun(position: THREE.Vector3) {
    bigStar = new BigStar2(position, camera, 1, {
      starSize: 1,
      galaxyColor: { r: 0, g: 0, b: 0 },
    });
    let geometry = new THREE.PlaneGeometry(15, 15);
    let material = bigStar.getStarMaterial();
    labe = new THREE.Mesh(geometry, material);
    labe.lookAt(camera.position);
    rotatable.add(labe);
    labe.position.set(position.x * 5.9, position.y * 5.9, position.z * 5.9)
    sunLight = new THREE.PointLight(0xffffff, 20.0, 10);
    sunLight.position.set(lightPos.x, lightPos.y, lightPos.z);
    sunLHelper = new THREE.PointLightHelper(sunLight, 1);
    scene.add(sunLight);
  }  

  const sunElement = model.getObjectByName("Sun");
  const planetElement = model.getObjectByName("Planet");

  if (sunElement && planetElement) {
    CreateSun(sunElement.position);
    CreatePlanet(planetElement.position);
  }

  model.traverse((child: any) => {
    if (child.children.length === 0) {

      child.visible = false;
    }
    counter++;
  });

  rotatable.add(stars);

  scene.add(rotatable);

  if (container) {
    container.appendChild(renderer.domElement);
  } else {
    console.log("Not found container!");
  }

  return true;
};

export const SelectVRP = () => {
  if (rotatable) {
    const porgress = gsap.to(rotatable.rotation, {
      duration: 1, // Animation duration in seconds
      y: Math.PI, // Rotate 360 degrees around the y-axis
      repeat: 0, // Repeat indefinitely
      ease: "power1.inOut", // Linear easing
      onUpdate: () => {
        if (labe) {
          labe.lookAt(camera.position);
        }
      },
    });
  }
};

export const SelectVAO = () => {
  // rotatable.rotation.y = Math.PI / 2
  if (rotatable) {
    const porgress = gsap.to(rotatable.rotation, {
      duration: 1, // Animation duration in seconds
      y: 0, // Rotate 360 degrees around the y-axis
      repeat: 0, // Repeat indefinitely
      ease: "power1.inOut", // Linear easing
      onUpdate: () => {
        if (labe) {
          labe.lookAt(camera.position);
        }
      },
      onComplete: () => {},
    });
  }
};

loader.load(config.url, ModelSetup);

function handleWindowResize () {
  camera.aspect =  defaultSceneSize.x /  defaultSceneSize.y;
  camera.updateProjectionMatrix();
  renderer.setSize( defaultSceneSize.x,  defaultSceneSize.y);
}

window.addEventListener('resize', handleWindowResize, false);

camera.updateProjectionMatrix();

const Model3D = () => {
  const [choose, Choose] = useState("VRP");

  useEffect(() => {
    // loader.load(config.url, ModelSetup);
    const vrpBtn = document.getElementById("selectVRP");
    const vaoBtn = document.getElementById("selectVAO");
    if (vrpBtn && vaoBtn) {
      vrpBtn.addEventListener("click", () => {
        vrpBtn.classList.add("selected");
        vaoBtn.classList.remove("selected");
        // MoveCamera(config.defaultCam);
        Choose("VRP");
        SelectVRP();
      });
      vaoBtn.addEventListener("click", () => {
        vrpBtn.classList.remove("selected");
        vaoBtn.classList.add("selected");
        // MoveCamera(config.finalCam);
        Choose("VAO");
        SelectVAO();
      });
    }
  }, []);

  return (
    <>
      <div
        className="renderBkg"
        style={{ transform: `translateX(${choose === "VRP" ? 0 : -100}vw)` }}
      />
      <div className="render--zone" />
    </>
  );
};

export default Model3D;
