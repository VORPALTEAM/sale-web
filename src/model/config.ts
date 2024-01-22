import { camObject, pointVector } from "./types";

export const url: string = "model/stars3.glb";

export const inactiveNameSelector: string = "inactive";

export const wireframeColor = 0xe5e5e5;
export const colorBlack = 0x000000;
export const baseLightIntense = 0xfdfcf0;
export const lightStrength = 0.03;
export const baseCamDistance = 25000;
export const animDuration = 300;
export const animFrames = 20;
export const animFps = 120;

/* 
Position: index.tsx:131:11
Object { x: 3.9017520963843686, y: 0.30514418644864605, z: 4.269604085709361 }
index.tsx:132:11
Rotation: index.tsx:133:11
Object { isEuler: true, _x: -0.104798314773686, _y: 0.8038921910189447, _z: 0.07559447215292867, _order: "XYZ", _onChangeCallback: onRotationChange()
 }
index.tsx:134:11
Target: index.tsx:135:11
Object { x: -0.720062365988804, y: -0.07258749265903412, z: -0.690102343856388 }

position: {
    x: 4.162671473134066, y: 0.4196273812798987, z: 3.9894729623442213 
  },
  rotation: {
    _x: -0.15128983435038482, _y: 0.9141115624499687, _z: 0.12016555953791716
  },
  target: {
    x: -0.7920205133080184, y: -0.09200967311074568, z: -0.6035211069659095
  },
*/

export const defaultCam: camObject = {
  position: {
    x: 3.9017520963843686,
    y: 0.30514418644864605,
    z: 4.269604085709361,
  },
  rotation: {
    _x: -0.104798314773686,
    _y: 0.8038921910189447,
    _z: 0.07559447215292867,
  },
  target: {
    x: -0.720062365988804,
    y: -0.07258749265903412,
    z: -0.690102343856388,
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

export const MovePath: pointVector[] = [];

export const CAMERA_POS: camObject[] = [];

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

export const SetAmbientLight = false;

export const scenesize = {
  x: window.innerWidth * 0.98,
  y: window.innerHeight * 0.98,
};
