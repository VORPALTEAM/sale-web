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
Position:
index.tsx:145 Vector3 {x: 41.782267576458814, y: 4.878114241475808, z: 42.25082454607541}
index.tsx:146 Rotation:
index.tsx:147 Euler {isEuler: true, _x: -0.26959227945499664, _y: 0.8081016242862483, _z: 0.1971767388635288, _order: 'XYZ', …}
index.tsx:148 Target: 
index.tsx:149 Vector3 {x: -0.72297694297289, y: -0.18400583054107678, z: -0.6659175581530068}
*/

export const defaultCam: camObject = {
  position: {
    x: 41.782267576458814,
    y: 4.878114241475808,
    z: 42.25082454607541,
  },
  rotation: {
    _x: -0.26959227945499664,
    _y: 0.8081016242862483,
    _z: 0.1971767388635288,
  },
  target: {
    x: -0.72297694297289,
    y: -0.18400583054107678,
    z: -0.6659175581530068,
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
