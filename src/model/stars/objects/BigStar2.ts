import * as THREE from "three";
import * as datGui from "dat.gui";
import { ThreeLoader } from "../utils/threejs/ThreeLoader";

// import vsSun from '../shaders/sunTextured/vert.glsl';
//import fsSun from '../shaders/sunTextured/frag.glsl';

const vsSun = `
varying vec2 vUv;
varying vec3 vNormal;

void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
}
`

const fsSun = `
varying vec2 vUv;
varying vec3 vNormal;

uniform vec2 cameraRelativePosition;
uniform sampler2D tSun;
uniform float iTime;
uniform float mx;
uniform float my;
uniform vec3 centerColor;
uniform vec3 coronaColor;
uniform float coronaNoiseParam1; // default: 2.
uniform float coronaNoiseParam2; // default: 3.
uniform float coronaResolution;
uniform vec3 hueShift;

#define GLOW_INTENSITY -.1
#define NOISE 0.
#define MOUSE_SENSIBILITY .5

#define iterations 22
#define formuparam .55

#define volstepsBack 20
#define volstepsFront 2
#define stepsize 0.11

#define zoom 0.800
#define tile 0.850
#define speed 0.0005 

#define brightnessStar 0.0015
#define darkmatter 0.300
#define distfading 0.730
#define saturation 0.750
   
float snoise(vec3 uv, float res)
{
	const vec3 s = vec3(1e0, 1e2, 1e4);
	uv *= res;
	vec3 uv0 = floor(mod(uv, res)) * s;
	vec3 uv1 = floor(mod(uv + vec3(1.), res)) * s;
	vec3 f = fract(uv);
    f = f * f * (3.0 - 2.0 * f);
	vec4 v = vec4(uv0.x + uv0.y + uv0.z, uv1.x + uv0.y + uv0.z, uv0.x + uv1.y + uv0.z, uv1.x + uv1.y + uv0.z);
	vec4 r = fract(sin(v * 1e-3) * 1e5);
	float r0 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);
	r = fract(sin((v + uv1.z - uv0.z) * 1e-3) * 1e5);
	float r1 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);
	return mix(r0, r1, f.z) * 2. - 1.;
}

vec3 GetRayDir(vec2 uv, vec3 ro)
{
    vec3 f = normalize(vec3(0) - ro),
        r = normalize(cross(vec3(0, 1, 0), f)),
        u = cross(f, r),
        c = ro + f,
        i = c + uv.x * r + uv.y * u,
        rd = normalize(i - ro);
    return rd;
}

vec2 normalizeVec2(vec2 aVec2)
{
    float newX = aVec2.x;
    float newY = aVec2.y;
    while (newX > 1.) newX -= 1.;
    while (newX < 0.) newX += 1.;
    while (newY > 1.) newY -= 1.;
    while (newY < 0.) newY += 1.;
    return vec2(newX, newY);
}

vec3 hsl2rgb(vec3 c) {
    vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return c.z + c.y * (rgb - 0.5) * (1.0 - abs(2.0 * c.z - 1.0));
}

vec3 rgb2hsl(vec3 c) {
    float 
        cMin = min(min(c.r, c.g), c.b),
        cMax = max(max(c.r, c.g), c.b),
        delta = cMax - cMin;
    vec3 hsl = vec3(0., 0., (cMax + cMin) / 2.);
    // If it has chroma and isn't gray.
    if (delta != 0.0) {
        if (hsl.z < .5) {
            hsl.y = delta / (cMax + cMin); // saturation
        }else{
            hsl.y = delta / (2. - cMax - cMin); // saturation
        }
        float deltaR = (((cMax - c.r) / 6.) + (delta / 2.)) / delta,
            deltaG = (((cMax - c.g) / 6.) + (delta / 2.)) / delta,
            deltaB = (((cMax - c.b) / 6.) + (delta / 2.)) / delta;
        // Hue
        if (c.r == cMax) {
            hsl.x = deltaB - deltaG;
        }
        else if (c.g == cMax) {
            hsl.x = (1. / 3.) + deltaR - deltaB;
        }
        else { // if(c.b==cMax){
            hsl.x = (2. / 3.) + deltaG - deltaR;
        }
        hsl.x = fract(hsl.x);
    }
    return hsl;
}

vec4 mainImage( vec4 fragColor, vec2 fragCoord )
{
	vec4 resultFragColor = vec4(.0, .0, .0, 1.);

    float mouseX = mx;
    float mouseY = my;

	float brightness = 0.;
	float radius = 0.24; // + brightness * 0.2;
	float invRadius = 1.0 / radius;
	
	vec3 glowColor = vec3( 0.1, 0.35, 0.8 );
	float time = iTime * 0.1;
	float aspect = 1.;
	// original: vec2 uv			= fragCoord.xy / iResolution.xy;
	vec2 uv = vUv;
	vec2 p = -0.5 + uv;
	p.x *= aspect;

	float fade  = pow( length( 2.05 * p ), 0.5 );
	float fVal1	= 1.0 - fade;
	float fVal2	= 1.0 - fade;
	
    // v1
	float angle = atan( p.x * clamp((cos(mouseX) + .5), .5, 1.), p.y * (sin(mouseY) + .5) ) / 6.2832;
    // v2
    // mouseX = 0.0;
    // mouseY = 0.0;
	// float angle = atan( p.x * clamp((cos(mouseX) + .5), .5, 1.), p.y * (sin(mouseY) + .5) ) / 6.2832;
	// float angle = atan( p.x * clamp((cos(mouseX) + .5), .5, 1.), p.y * (sin(0.0) + .5) ) / 6.2832;

	// float angle	= 1. / 6.2;
	float dist = length(p);
	vec3 coord = vec3( angle, dist, time * 0.1 );
	
    // 1st variant of corona

	float newTime1 = abs( snoise( coord + vec3(time * 0.015, -time * 0.35, time * 0.0), coronaResolution ) );
	float newTime2 = abs( snoise( coord + vec3(0.0, -time * 0.15, time * 0.015), 45.0 ) );	
	
	float power = pow(coronaNoiseParam1, coronaNoiseParam2);
	fVal1 += 0.5 / power * snoise( coord + vec3( 0.015, -time, time * 0.2 ), (power * 10.0 * (newTime1 + 1.0)) );
	fVal2 += 0.5 / power * snoise( coord + vec3( 0.0, -time, time * 0.2 ), (power * 25.0 * (newTime2 + 1.0)) );
	
	float corona = pow( fVal1 * max( 1.2 - fade, 0.0 ), 2. ) * 50.;
	corona += pow( fVal2 * max( 1.3 - fade, 0.0 ), 2. ) * 50.;
	corona *= 1.2 - newTime1;

    // end
	
	vec2 sp = -1.0 + 2.0 * uv;
	sp.x *= aspect;
	sp *= (2.0 - brightness);

  	float r = dot(sp, sp);
	// float f = float( ( 1.0 - sqrt( abs(1.0 - r) ) ) / r + brightness * 0.5 );
    float fs1 = ( 1.0 - sqrt( abs(1.0 - r) ) ) / r;
    float fs2 = brightness * 0.5;
	float f = fs1 + fs2;
    
	if (dist < radius) {
		corona *= pow(dist * invRadius, 24.0);
        vec2 newUv = vec2((snoise(vec3(uv * 8., uv.y), 5.) * 2.)) * .005;
 		newUv.x += sp.x * f - (iTime * .05) - mouseX;
  		newUv.y += sp.y * f - mouseY;
		
        // normalize coordinates
        vec2 newUvNormal = normalizeVec2(newUv);

		vec3 texSample = texture( tSun, newUvNormal ).rgb;
		float uOff = ( texSample.g * brightness * 4.5 );
		vec2 starUV	= newUv + vec2( uOff , 0.0 );

        vec2 starUVNormal = normalizeVec2(starUV);

		vec3 starSphere	= texture(tSun, starUVNormal).rgb;
        // resultFragColor.rgb += max(starSphere, .6) * fVal1 * .5;
        resultFragColor.rgb += max(starSphere, .96) * fVal1 * .95;
        resultFragColor.rgb += starSphere; 

        float maxRBG = max(resultFragColor.x, max(resultFragColor.y, resultFragColor.z));

        resultFragColor.x = maxRBG * centerColor.x;
        resultFragColor.y = maxRBG * centerColor.y;
        resultFragColor.z = maxRBG * centerColor.z;
	}
    else {
        // test
        // resultFragColor = vec4(0.2, 0.2, 0.5, .3);
    }
    
    vec3 ro = vec3(-mouseX, -mouseY, -5.4);
    vec3 rd = GetRayDir(uv, ro);
    
    float diam = 1.;
    float dia = clamp(1.0 - length(vec2(p * diam)), 0., 1.);
    
	//vec3 v = StarNest(rd, .1, 1., resultFragColor.rgb, ro, 0.);
    vec3 v = vec3(0.0, 0.0, 0.0);
    //v=mix(vec3(length(v)*.1),v,saturation); //color adjust
    //v *= mix(vec3(0.8),vec3(1.,1.,0.)+2.5,dia);
    resultFragColor.rgb += vec3(v * .01) * (1. - dia);  
    
	resultFragColor.rgb	+= vec3( f * coronaColor ) + corona * coronaColor; // + starGlow * glowColor;

	if (dist > radius) {
        resultFragColor.a = (resultFragColor.x + resultFragColor.y + resultFragColor.z) / 3.;
    }

    return resultFragColor;

    // test
    // return vec4(0.2, 0.2, 0.5, .3);

}

void main(void)
{
    gl_FragColor = mainImage(vec4(gl_FragColor), vec2(gl_FragCoord));
}
`

export type BigStar2Params = {
    starSize: number;
    galaxyColor: { r, g, b };
    mainColor?: { r, g, b };
    coronaColor?: { r, g, b };
};

export class BigStar2 extends THREE.Group {

    private _parentPos: THREE.Vector3;
    private _camera: THREE.Camera;
    private _starScale: number;
    private _params: BigStar2Params;
    private _light: THREE.PointLight;
    private _mesh: THREE.Mesh;
    private _uniforms: any;
    // debug
    private _gui: datGui.GUI;
    private _guiFolder: datGui.GUI;
    private _guiControllers: datGui.GUIController[];

    constructor(aParentPos: THREE.Vector3, aCamera: THREE.Camera, aStarScale: number, aParams: BigStar2Params) {

        super();

        this._parentPos = aParentPos;
        this._camera = aCamera;
        this._starScale = aStarScale;
        this._params = aParams;

        if (!this._params.mainColor) this._params.mainColor = { r: .9, g: .6, b: .3 };
        if (!this._params.coronaColor) this._params.coronaColor = { r: .9, g: .3, b: .1 };

        // RGB
        let centerClr = this._params.mainColor;
        let coronaClr = this._params.coronaColor;

        let loader = ThreeLoader.getInstance();
        let tSun = loader.getTexture('sun_surf');

        this._uniforms = {
            tSun: { value: tSun },
            centerColor: { value: { x: centerClr.r, y: centerClr.g, z: centerClr.b } },
            coronaColor: { value: { x: coronaClr.r, y: coronaClr.g, z: coronaClr.b } },
            coronaNoiseParam1: { value: 3.0 },
            coronaNoiseParam2: { value: 4.0 },
            coronaResolution: { value: 25 },
            iTime: { value: 0 },
            mx: { value: 0 },
            my: { value: 0 },
        };

        let shaderMaterial = new THREE.ShaderMaterial({
            vertexShader: vsSun,
            fragmentShader: fsSun,
            uniforms: this._uniforms,
            transparent: true,
            depthWrite: false,
            // blending: THREE.NormalBlending
        });

        let size = (this._params.starSize || 1) * this._starScale;
        let geom = new THREE.PlaneGeometry(size, size);
        this._mesh = new THREE.Mesh(geom, shaderMaterial);
        this.add(this._mesh);
    }

    public get starScale(): number {
        return this._starScale;
    }

    public set starScale(v: number) {
        this._starScale = v;
        if (this._mesh) this._mesh.scale.set(v, v, 1);
    }

    createDebugGui(aGui: datGui.GUI) {

        const GUI_PARAMS = {
            // coronaColor: MyMath.rgbToHex(this._uniforms.coronaColor.value.x * 255, this._uniforms.coronaColor.value.y * 255, this._uniforms.coronaColor.value.z * 255),
            coronaColor: {
                r: this._params.mainColor.r * 255,
                g: this._params.mainColor.g * 255,
                b: this._params.mainColor.b * 255
            },
            // centerColor: MyMath.rgbToHex(this._uniforms.centerColor.value.x * 255, this._uniforms.centerColor.value.y * 255, this._uniforms.centerColor.value.z * 255),
            centerColor: {
                r: this._params.coronaColor.r * 255,
                g: this._params.coronaColor.g * 255,
                b: this._params.coronaColor.b * 255
            },
            coronaNoiseParam1: this._uniforms.coronaNoiseParam1.value,
            coronaNoiseParam2: this._uniforms.coronaNoiseParam2.value,
            coronaResolution: this._uniforms.coronaResolution.value,
        }

        let gui = this._gui = aGui;

        this._guiFolder = gui.addFolder('Star');
        this._guiControllers = [];

        let ctrl = gui.addColor(GUI_PARAMS, 'centerColor').onChange((v) => {
            // let rgb = MyMath.hexToRGB(v);
            let rgb = v;
            this._uniforms.centerColor.value.x = rgb.r / 255;
            this._uniforms.centerColor.value.y = rgb.g / 255;
            this._uniforms.centerColor.value.z = rgb.b / 255;
            console.log('centerColor:', this._uniforms.centerColor.value);
        });
        this._guiControllers.push(ctrl);
        
        ctrl = gui.addColor(GUI_PARAMS, 'coronaColor').onChange((v) => {
            // let rgb = MyMath.hexToRGB(v);
            let rgb = v;
            this._uniforms.coronaColor.value.x = rgb.r / 255;
            this._uniforms.coronaColor.value.y = rgb.g / 255;
            this._uniforms.coronaColor.value.z = rgb.b / 255;
            console.log('coronaColor:', this._uniforms.coronaColor.value);
            
        });
        this._guiControllers.push(ctrl);

        ctrl = gui.add(GUI_PARAMS, 'coronaNoiseParam1', 1, 6, 0.01).onChange(() => {
            this._uniforms.coronaNoiseParam1.value = GUI_PARAMS.coronaNoiseParam1;
        });
        this._guiControllers.push(ctrl);

        ctrl = gui.add(GUI_PARAMS, 'coronaNoiseParam2', 0.5, 6, 0.01).onChange(() => {
            this._uniforms.coronaNoiseParam2.value = GUI_PARAMS.coronaNoiseParam2;
        });
        this._guiControllers.push(ctrl);

        ctrl = gui.add(GUI_PARAMS, 'coronaResolution', 1, 100, 1).onChange(() => {
            this._uniforms.coronaResolution.value = GUI_PARAMS.coronaResolution;
        });
        this._guiControllers.push(ctrl);

    }

    updateStar(aParams: BigStar2Params) {
        this._params = aParams;
        if (!this._params.mainColor) this._params.mainColor = { r: .9, g: .6, b: .3 };
        if (!this._params.coronaColor) this._params.coronaColor = { r: .9, g: .3, b: .1 };
        // RGB
        let centerClr = this._params.mainColor;
        let coronaClr = this._params.coronaColor;
        this._uniforms.centerColor.value = { x: centerClr.r, y: centerClr.g, z: centerClr.b };
        this._uniforms.coronaColor.value = { x: coronaClr.r, y: coronaClr.g, z: coronaClr.b };
    }

    free() {
        if (this._gui) {
            for (let i = 0; i < this._guiControllers.length; i++) {
                const gctrl = this._guiControllers[i];
                this._gui.remove(gctrl);
            }
            this._gui.removeFolder(this._guiFolder);
        }

    }

    update(dt: number) {

        this._uniforms.iTime.value += dt;

        let camera = this._camera;
        if (camera) {
            this._mesh.quaternion.copy(camera.quaternion);
            let p = camera.position.clone().sub(this._parentPos).normalize();
            this._uniforms.mx.value = Math.atan2(p.z, p.x);
            this._uniforms.my.value = Math.atan2(Math.sqrt(p.x * p.x + p.z * p.z), p.y);
        }
    }

}