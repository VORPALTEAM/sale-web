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
Position: index.tsx:124:11
Object { x: 23.40039165888183, y: 4.186618510121951, z: 24.174928204664532 }
index.tsx:125:11
Rotation: index.tsx:126:11
Object { isEuler: true, _x: -0.26206681851409125, _y: 0.8361720323196059, _z: 0.19648497572749113, _order: "XYZ", _onChangeCallback: onRotationChange()
 }
index.tsx:127:11
Target: index.tsx:128:11
Object { x: -0.7420826443391471, y: -0.17366172627503285, z: -0.6474217742691349 }
*/

export const defaultCam: camObject = {
  position: {
    x: 23.40039165888183,
    y: 4.186618510121951,
    z: 24.174928204664532,
  },
  rotation: {
    _x: -0.26206681851409125,
    _y: 0.8361720323196059,
    _z: 0.19648497572749113,
  },
  target: {
    x: -0.7420826443391471,
    y: -0.17366172627503285,
    z: -0.6474217742691349,
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
  y: window.innerHeight * 1.49,
};
