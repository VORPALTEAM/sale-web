import { camObject, pointVector } from "./types";

export const url: string = "model/stars3.glb";

export const inactiveNameSelector: string = "inactive";

export const wireframeColor = 0xe5e5e5;
export const colorBlack = 0x000000;
export const baseLightIntense = 0xfdfcf0;
export const lightStrength = 9;
export const baseCamDistance = 25000;
export const animDuration = 300;
export const animFrames = 20;
export const animFps = 120;

export const defaultCam: camObject = {
  position: {
    x: 4.162671473134066, y: 0.4196273812798987, z: 3.9894729623442213 
  },
  rotation: {
    _x: -0.15128983435038482, _y: 0.9141115624499687, _z: 0.12016555953791716
  },
  target: {
    x: -0.7920205133080184, y: -0.09200967311074568, z: -0.6035211069659095
  },
};

export const finalCam: camObject = {
  position: {
    x: 2.995211995673477,
    y: -0.09143843121505468,
    z: -8.117225026212708,
  },
  rotation: {
    _x: 3.1074466915934806,
    _y: 0.210661320557139,
    _z: -3.134449851168178,
  },
  target: {
    x: 1.79387366771698,
    y: 0,
    z: -2.776439666748047,
  },
};

export const EnableMove = false;

export const MovePath: pointVector[] = [
  { x: 0.4889499843120575, y: 0, z: 0.7810499668121338 }, // Sun
  { x: 1.708150029182434, y: 0, z: 0.5905500054359436 }, // PlaceSun1
  { x: 2.5971500873565674, y: 0, z: -0.044449999928474426 }, // PlaceSun2
  { x: 1.3906500339508057, y: 0, z: -0.6667500138282776 }, // PlaceSun3
  { x: -0.5146437883377075, y: 0, z: -0.7454371452331543 }, // Planet
  { x: -1.885949969291687, y: 0, z: -0.5651500225067139 }, // PlacePlanet1
  { x: -2.6098499298095703, y: 0, z: -0.019050000235438347 }, // PlacePlanet2
  { x: -1.2636499404907227, y: 0, z: 0.6667500138282776 }, // PlacePlanet3
];

export const CAMERA_POS: camObject[] = [];

export const MenuBorders = [
  1486.7547046835043, 846.7547046835043, 586.7547046835043, 326.7547046835043,
];

export const BorderContent = ["Shape 1", "Shape 2", "Shape 3", "Shape 4"];

export const camStep = 20;

export const camEdges: camObject[] = [];

export const useEdgeMinAngle = 1;
export const useEdgeMinDistance = 9;

export const LightData: pointVector[] = [];

export const FreeLights: pointVector[] = [
  {
    x: 0.8923791558530315,
    y: -0.40590313037652653,
    z: 0.1137383534006568,
  },
  {
    x: 0.8923791558530315,
    y: 0.40590313037652653,
    z: 0.1137383534006568,
  },
];

export const defaultPoint: pointVector = {
  x: 0,
  y: 0,
  z: 0,
};

export const SetAmbientLight = true;

export const scenesize = {
  x: window.innerWidth * 0.98,
  y: window.innerHeight * 0.98,
};
