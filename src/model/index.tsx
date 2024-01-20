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

const lightPos = new THREE.Vector3(1.5,
0,
-0.5)

const nightVector = new THREE.Vector3(0.05, 0, -0.1);
const dayVector = new THREE.Vector3(0.9, 0, 0.6);
const textureLoader = new THREE.TextureLoader();

const planetShaderMaterial = (vector: THREE.Vector3) => {
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

const lightsMap = new THREE.TextureLoader().load(
  "/model/textures/enight.jpg" // globusnight.jpg
);
const atmMap = new THREE.TextureLoader().load("/model/textures/atm.png");
const textureMap = new THREE.TextureLoader().load(
  "/model/textures/globusday.jpg"
);

const earthMaterial = (intensity: number) => {
  return new THREE.MeshStandardMaterial({
    map: textureMap,
    emissive: 0xffffff,
    emissiveIntensity: intensity,
    emissiveMap: lightsMap,
    side: THREE.DoubleSide,
  });
};

let isCamMoving = false;
let planet: THREE.Mesh;
let atm: THREE.Mesh;
let bigStar: BigStar2;
let labe: THREE.Mesh;

const loader = new GLTFLoader();
const scene = new THREE.Scene();
const defaultMaterials = new Map<string, THREE.Material>();

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

const stars = new StarSky(9000, 90, 1600);

let framesCount = 0;

function animate() {
  requestAnimationFrame(animate);

  earthMesh.rotation.y += 0.001;
  lightsMesh.rotation.y += 0.001;
  cloudsMesh.rotation.y += 0.0009;
  glowMesh.rotation.y += 0.001;
  stars.rotation.y -= 0.0001;
  renderer.render(scene, camera);

  if (bigStar) {
    bigStar.update(1 / 60);
    bigStar.lookAt(camera.position);
  }
}

animate();

setInterval(() => {
  framesCount = 0;
}, 1000);

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
  // This function will be called when the controls change (e.g., when the user interacts with them)
  // You can put your custom code here to react to the changes
  var cameraTarget = new THREE.Vector3();
  console.log("Target: ");
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

function rotateModel(child: THREE.Mesh) {
  const timer = setInterval(() => {
    child.rotation.y += 0.003;
  }, 10);
  return timer;
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
let childs: any = [];

function ScaleItem(name: string) {
  const item = scene.getObjectByName(name);
  if (item) {
    const scrW = window.innerWidth;
    if (scrW < 1200) {
      item.scale.set(0.012, 0.012, 0.012);
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
let label2: THREE.Sprite;
let sunLight: THREE.PointLight;
let sunLHelper: THREE.PointLightHelper;
label.position.x = 1;

const atmos = new THREE.MeshPhongMaterial({ map: atmMap, opacity: 0.8, transparent: true });

const ModelSetup = (gltf: any) => {
  console.log(gltf);
  const model = gltf.scene;
  rotatable = new THREE.Group();
  rotatable.name = "PlanetGroup";
  const container = document.querySelector(".render--zone");
  const clicker = document.querySelector(".planetClicker");
  const ev = new Event("click");
  container?.dispatchEvent(ev);
  let counter = 0;

  model.traverse((child: any) => {
    if (child.children.length === 0) {
      if (child.name === "Planet") {
        // child.material.color.set(0x141414); // 0x007fff
        planet = child.clone();
        /* atm = child.clone();
        atm.scale.x = child.scale.x * 1.05;
        atm.scale.y = child.scale.y * 1.05;
        atm.scale.z = child.scale.z * 1.05;
        atm.material = atmos;
        planet.material = earthMaterial(dayIntensity); // planetShaderMaterial(dayVector);
        planet.rotateZ(Math.PI);
        setInterval(() => {
          atm.rotateY(0.005);
          planet.rotateY(0.001);
        }, 10);
        rotatable.add(planet);
        rotatable.add(atm); */
        const pos = child.position
        earthGroup.position.set(pos.x, pos.y, pos.z)
        rotatable.add(earthGroup);
      }

      if (child.name === "Sun") {
        bigStar = new BigStar2(child.position, camera, 1, {
          starSize: 1,
          galaxyColor: { r: 0, g: 0, b: 0 },
        });
        let geometry = new THREE.PlaneGeometry(2.5, 2.5);
        let material = bigStar.getStarMaterial();
        labe = new THREE.Mesh(geometry, material);
        labe.position.set(child.position.x, child.position.y, child.position.z);
        labe.lookAt(camera.position);
        rotatable.add(labe);

        sunLight = new THREE.PointLight(0xffffff, 1.0, 10);
        sunLight.position.set(lightPos.x, lightPos.y, lightPos.z);
        sunLHelper = new THREE.PointLightHelper(sunLight, 1);
        scene.add(sunLight);
        // scene.add(sunLHelper);
      }

      child.visible = false;
    }
    counter++;
  });

  rotatable.add(stars);

  scene.add(rotatable);

  window.addEventListener("resize", () => {
    // ScaleItem("Sun");
    // ScaleItem("Planet");
  });

  if (container) {
    container.appendChild(renderer.domElement);
  } else {
    console.log("Not found container!");
  }

  return true;
};

const SelectVRP = () => {
  const target1 = bigStar;
  const planetMAterial = earthMaterial(dayIntensity); // planetShaderMaterial(dayVector);
  let isSwitched = false;
  if (rotatable) {
    const porgress = gsap.to(rotatable.rotation, {
      duration: 1, // Animation duration in seconds
      y: 0, // Rotate 360 degrees around the y-axis
      repeat: 0, // Repeat indefinitely
      ease: "power1.inOut", // Linear easing
      onUpdate: () => {
        frameCount++;
        if (porgress.progress() > 0.0 && !isSwitched) {
          planet.material = planetMAterial;
          isSwitched = true;
        }
        sunLight.position.set(lightPos.x, lightPos.y, lightPos.z)
        if (labe) {
          labe.lookAt(camera.position);
        }
      },
      onComplete: () => {},
    });
  }
};

const SelectVAO = () => {
  // rotatable.rotation.y = Math.PI / 2
  const planetMAterial = earthMaterial(nightIntensity); // planetShaderMaterial(nightVector);
  const sun = scene.getObjectByName("Sun")
  let startVector = { x: dayVector.x, y: dayVector.y, z: dayVector.z };
  let endVector = { x: nightVector.x, y: nightVector.y, z: nightVector.z };
  let isSwitched = false;
  const target1 = bigStar;
  let frameCount = 0;
  if (rotatable) {
    const porgress = gsap.to(rotatable.rotation, {
      duration: 1, // Animation duration in seconds
      y: Math.PI, // Rotate 360 degrees around the y-axis
      repeat: 0, // Repeat indefinitely
      ease: "power1.inOut", // Linear easing
      onUpdate: () => {
        if (porgress.progress() > 0.0 && !isSwitched) {
          planet.material = planetMAterial;
          isSwitched = true;
        }
        sunLight.position.set(lightPos.x, lightPos.y, lightPos.z)
        console.log(sunLight.position)
        console.log(target1.position)
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
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', handleWindowResize, false);

const Model3D = () => {
  const [clickable, setClickable] = useState(false);
  const [isFirstLoad, noteFirstLoad] = useState(true);
  const [menuHidden, HideMenu] = useState(true);
  const [menuHeading, SetHeading] = useState("");
  const [rightText, RTSetup] = useState(config.BorderContent[0]);
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
