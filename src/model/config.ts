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
Object { x: 22.404917718584638, y: 3.016383534612332, z: 25.279353907491927 }
index.tsx:132:11
Rotation: index.tsx:133:11
Object { isEuler: true, _x: -0.18240387251474438, _y: 0.7739803305253723, _z: 0.12822368232822232, _order: "XYZ", _onChangeCallback: onRotationChange()
 }
index.tsx:134:11
Target: index.tsx:135:11
Object { x: -0.6989872383959704, y: -0.12972110591632577, z: -0.7032704140225295 }
*/

export const defaultCam: camObject = {
  position: {
    x: 22.404917718584638,
    y: 3.016383534612332,
    z: 25.279353907491927,
  },
  rotation: {
    _x: -0.18240387251474438,
    _y: 0.7739803305253723,
    _z: 0.12822368232822232,
  },
  target: {
    x: -0.6989872383959704,
    y: -0.12972110591632577,
    z: -0.7032704140225295,
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
