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

let isCamMoving = false;

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

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  interactionManager.update();
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

const stars = new FarStars({
  starsCount: 6000
})

let bigStar : BigStar;

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
        bigStar = new BigStar(child.position, camera, { starSize: 320 });
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
      }

      if (child.name === "Planet") {
        child.material.color.set(0x141414); // 0x007fff
        const textureLoader = new THREE.TextureLoader();
        const nightTexture = textureLoader.load('model/textures/enight.jpg');
        const materialClouds = new THREE.MeshLambertMaterial( {

					map: textureLoader.load( 'model/textures/enight.jpg' ),
					transparent: true

				} );
        if (materialClouds && materialClouds.map) {
          materialClouds.map.colorSpace = THREE.SRGBColorSpace;
        }
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
        rotatable.add(bigStar);
      } */
      child.visible = false;
    }
    counter++;
  });
  
  rotatable.add(stars)

  scene.add(rotatable);

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
  const target1 = scene.getObjectByName("StarSky");
  if (rotatable) {
    gsap.to(rotatable.rotation, {
      duration: 1,  // Animation duration in seconds
      y: 0,  // Rotate 360 degrees around the y-axis
      repeat: 0,  // Repeat indefinitely
      ease: 'power1.inOut',  // Linear easing
      onUpdate: () => {
        frameCount++
        const delAngle = target1?.rotation.y || 0;
        // console.log(delAngle)
        stars.azimutAngle = delAngle;
        console.log(stars.azimutAngle)
        // stars.polarAngle = delAngle;
      }
    })
  }
}

const SelectVAO = () => {
  // rotatable.rotation.y = Math.PI / 2
    let frameCount = 0;
    if (rotatable) {
      gsap.to(rotatable.rotation, {
        duration: 1,  // Animation duration in seconds
        y: Math.PI,  // Rotate 360 degrees around the y-axis
        repeat: 0,  // Repeat indefinitely
        ease: 'power1.inOut',  // Linear easing
        onUpdate: () => {
          frameCount++
          const delAngle = Math.PI * (frameCount / 140)
          console.log(delAngle)
          stars.azimutAngle = delAngle;
          stars.polarAngle = delAngle;
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
