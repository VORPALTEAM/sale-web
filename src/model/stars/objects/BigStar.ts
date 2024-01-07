import * as THREE from "three";
import { Settings } from "../data/Settings";

// import vsSun from '../shaders/sun1/vs.glsl';
// import fsSun from '../shaders/sun1/fs.glsl';

const vsSun = `
varying vec2 vUv;
varying vec3 vNormal;

void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
}
`

const fsSun = `
varying vec2 vUv;

uniform float iTime;
uniform sampler2D tNoise;
uniform float mx;
uniform float my;

uniform vec3 sun_clr_1; // основной цвет солнца base: vec3(1.0, 1.0, .0)
uniform vec3 sun_clr_2; // основной цвет перелива base: vec3(1.0, .0, .0)
uniform vec3 sun_clr_3; // один цвет переливов base: vec3(1.0, .0, 1.0)
uniform vec3 sun_clr_4; // всплывающие пятнышки: vec3(1.0, 1.0, 1.0)
uniform vec3 sun_clr_5; // блики пробегающие по поверхности - base: vec3(1.0, 1.0, 1.0)
uniform vec3 sun_corona_clr_1; // нижний цвет короны base: vec3(1.0,0.95,1.0)
uniform vec3 sun_corona_clr_2; // верхний цвет короны base: vec3(1.0,0.6,0.1)
uniform float corona_size;

// test
// #d26800
// #define sun_clr_1 vec3(1.0, 1.0, .0) // основной цвет солнца base: vec3(1.0, 1.0, .0)
// #define sun_clr_2 vec3(1.0, .0, .0) // основной цвет перелива base: vec3(1.0, .0, .0)
// #define sun_clr_3 vec3(1.0, .0, 1.0) // один цвет переливов base: vec3(1.0, .0, 1.0)
// #define sun_clr_4 vec3(1.0, 1.0, 1.0) // всплывающие пятнышки: vec3(1.0, 1.0, 1.0)
// #define sun_clr_5 vec3(1.,0.894,0.) // блики пробегающие по поверхности - base: vec3(1.0, 1.0, 1.0)
// #define sun_corona_clr_1 vec3(1.0, .95, 1.0) // нижний цвет короны base: vec3(1.0,0.95,1.0)
// #define sun_corona_clr_2 vec3(1.0, 0.6, 0.1) // верхний цвет короны base: vec3(1.0,0.6,0.1)
// #define corona_size 1.0
            

// animated noise
vec4 NC0=vec4(0.0,157.0,113.0,270.0);
vec4 NC1=vec4(1.0,158.0,114.0,271.0);
//vec4 WS=vec4(10.25,32.25,15.25,3.25);
vec4 WS=vec4(0.25,0.25,0.25,0.25);

// mix noise for alive animation, full source
vec4 hash4( vec4 n ) { return fract(sin(n)*1399763.5453123); }
vec3 hash3( vec3 n ) { return fract(sin(n)*1399763.5453123); }
vec3 hpos( vec3 n ) { return hash3(vec3(dot(n,vec3(157.0,113.0,271.0)),dot(n,vec3(271.0,157.0,113.0)),dot(n,vec3(113.0,271.0,157.0)))); }
//vec4 hash4( vec4 n ) { return fract(n*fract(n*0.5453123)); }
//vec4 hash4( vec4 n ) { n*=1.987654321; return fract(n*fract(n)); }
float noise4q(vec4 x)
{
	vec4 n3 = vec4(0,0.25,0.5,0.75);
	vec4 p2 = floor(x.wwww+n3);
	vec4 b = floor(x.xxxx+n3) + floor(x.yyyy+n3)*157.0 + floor(x.zzzz +n3)*113.0;
	vec4 p1 = b + fract(p2*0.00390625)*vec4(164352.0, -164352.0, 163840.0, -163840.0);
	p2 = b + fract((p2+1.0)*0.00390625)*vec4(164352.0, -164352.0, 163840.0, -163840.0);
	vec4 f1 = fract(x.xxxx+n3);
	vec4 f2 = fract(x.yyyy+n3);
	f1=f1*f1*(3.0-2.0*f1);
	f2=f2*f2*(3.0-2.0*f2);
	vec4 n1 = vec4(0,1.0,157.0,158.0);
	vec4 n2 = vec4(113.0,114.0,270.0,271.0);	
	vec4 vs1 = mix(hash4(p1), hash4(n1.yyyy+p1), f1);
	vec4 vs2 = mix(hash4(n1.zzzz+p1), hash4(n1.wwww+p1), f1);
	vec4 vs3 = mix(hash4(p2), hash4(n1.yyyy+p2), f1);
	vec4 vs4 = mix(hash4(n1.zzzz+p2), hash4(n1.wwww+p2), f1);	
	vs1 = mix(vs1, vs2, f2);
	vs3 = mix(vs3, vs4, f2);
	vs2 = mix(hash4(n2.xxxx+p1), hash4(n2.yyyy+p1), f1);
	vs4 = mix(hash4(n2.zzzz+p1), hash4(n2.wwww+p1), f1);
	vs2 = mix(vs2, vs4, f2);
	vs4 = mix(hash4(n2.xxxx+p2), hash4(n2.yyyy+p2), f1);
	vec4 vs5 = mix(hash4(n2.zzzz+p2), hash4(n2.wwww+p2), f1);
	vs4 = mix(vs4, vs5, f2);
	f1 = fract(x.zzzz+n3);
	f2 = fract(x.wwww+n3);
	f1=f1*f1*(3.0-2.0*f1);
	f2=f2*f2*(3.0-2.0*f2);
	vs1 = mix(vs1, vs2, f1);
	vs3 = mix(vs3, vs4, f1);
	vs1 = mix(vs1, vs3, f2);
	float r=dot(vs1,vec4(0.25));
	//r=r*r*(3.0-2.0*r);
	return r*r*(3.0-2.0*r);
}

// body of a star
float noiseSphere(vec3 ray,vec3 pos,float r,mat3 mr,float zoom,vec3 subnoise,float anim)
{
  	float b = dot(ray,pos);
  	float c = dot(pos,pos) - b*b;
    
    vec3 r1=vec3(0.0);
    
    float s=0.0;
    float d=0.03125;
    float d2=zoom/(d*d); 
    float ar=5.0;
   
    for (int i=0;i<3;i++) {
		float rq=r*r;
        if(c <rq)
        {
            float l1=sqrt(rq-c);
            r1= ray*(b-l1)-pos;
            r1=r1*mr;
            s+=abs(noise4q(vec4(r1*d2+subnoise*ar,anim*ar))*d);
        }
        ar-=2.0;
        d*=4.0;
        d2*=0.0625;
        r=r-r*0.02;
    }
    return s;
}

// glow ring
float ring(vec3 ray,vec3 pos,float r,float size)
{
  	float b = dot(ray,pos);
  	float c = dot(pos,pos) - b*b;
   
    float s=max(0.0,(1.0-size*abs(r-sqrt(c))));
    
    return s;
}

// rays of a star
float ringRayNoise(vec3 ray,vec3 pos,float r,float size,mat3 mr,float anim)
{
  	float b = dot(ray,pos);
    vec3 pr=ray*b-pos;
       
    float c=length(pr);

    pr*=mr;
    
    pr=normalize(pr);
    
    float s=max(0.0,(1.0-size*abs(r-c)));
    
    float nd=noise4q(vec4(pr*1.0,-anim+c))*2.0;
    nd=pow(nd,2.0);
    float n=0.4;
    float ns=1.0;
    if (c>r) {
        n=noise4q(vec4(pr*10.0,-anim+c));
        ns=noise4q(vec4(pr*50.0,-anim*2.5+c*2.0))*2.0;
    }
    n=n*n*nd*ns;
    
    return pow(s,4.0)+s*s*n;
}

vec4 noiseSpace(vec3 ray,vec3 pos,float r,mat3 mr,float zoom,vec3 subnoise,float anim)
{
  	float b = dot(ray,pos);
  	float c = dot(pos,pos) - b*b;
    
    vec3 r1=vec3(0.0);
    
    float s=0.0;
    float d=0.0625*1.5;
    float d2=zoom/d;

	float rq=r*r;
    float l1=sqrt(abs(rq-c));
    r1= (ray*(b-l1)-pos)*mr;

    r1*=d2;
    s+=abs(noise4q(vec4(r1+subnoise,anim))*d);
    s+=abs(noise4q(vec4(r1*0.5+subnoise,anim))*d*2.0);
    s+=abs(noise4q(vec4(r1*0.25+subnoise,anim))*d*4.0);
    //return s;
    return vec4(s*2.0,abs(noise4q(vec4(r1*0.1+subnoise,anim))),abs(noise4q(vec4(r1*0.1+subnoise*6.0,anim))),abs(noise4q(vec4(r1*0.1+subnoise*13.0,anim))));
}

float sphereZero(vec3 ray,vec3 pos,float r)
{
  	float b = dot(ray,pos);
  	float c = dot(pos,pos) - b*b;
    float s=1.0;
    if (c<r*r) s=0.0;
    return s;
}

// original version
// vec4 mainImage( vec4 fragColor, vec2 fragCoord )
// {
// 	// vec2 p = (-iResolution.xy + 2.0*fragCoord.xy) / iResolution.y;
// 	vec2 p = (vUv - 0.5) * 4.;
    
// 	float mx = time*0.025;
//     float my = -0.6;
//     vec2 rotate = vec2(mx, my);

//     vec2 sins=sin(rotate);
//     vec2 coss=cos(rotate);
//     mat3 mr=mat3(vec3(coss.x,0.0,sins.x),vec3(0.0,1.0,0.0),vec3(-sins.x,0.0,coss.x));
//     mr=mat3(vec3(1.0,0.0,0.0),vec3(0.0,coss.y,sins.y),vec3(0.0,-sins.y,coss.y))*mr;    

//     mat3 imr=mat3(vec3(coss.x,0.0,-sins.x),vec3(0.0,1.0,0.0),vec3(sins.x,0.0,coss.x));
//     imr=imr*mat3(vec3(1.0,0.0,0.0),vec3(0.0,coss.y,-sins.y),vec3(0.0,sins.y,coss.y));
	
//     vec3 ray = normalize(vec3(p,2.0));
//     vec3 pos = vec3(0.0,0.0,3.0);
    
//     float s1=noiseSphere(ray,pos,1.0,mr,0.5,vec3(0.0),time);
//     s1=pow(min(1.0,s1*2.4),2.0);
//     float s2=noiseSphere(ray,pos,1.0,mr,4.0,vec3(83.23,34.34,67.453),time);
//     s2=min(1.0,s2*2.2);
//     fragColor = vec4( mix(vec3(1.0,1.0,0.0),vec3(1.0),pow(s1,60.0))*s1, 1.0 );
//     fragColor += vec4( mix(mix(vec3(1.0,0.0,0.0),vec3(1.0,0.0,1.0),pow(s2,2.0)),vec3(1.0),pow(s2,10.0))*s2, 1.0 );
	
//     fragColor.xyz -= vec3(ring(ray,pos,1.03,11.0))*2.0;
//     fragColor = max( vec4(0.0), fragColor );
    
//     float s3=ringRayNoise(ray,pos,0.96,1.0,mr,time);
//     fragColor.xyz += mix(vec3(1.0,0.6,0.1),vec3(1.0,0.95,1.0),pow(s3,3.0))*s3;

//     float zero=sphereZero(ray,pos,0.9);
//     if (zero>0.0) {
//     	//float s4=noiseSpace(ray,pos,100.0,mr,0.5,vec3(0.0),time*0.01);
// 	    // vec4 s4=noiseSpace(ray,pos,100.0,mr,0.05,vec3(1.0,2.0,4.0),0.0);
//     	//float s5=noiseSpace(ray,pos,100.0,vec3(mx,my,0.5),vec3(83.23,34.34,67.453),time*0.01);
//     	//s4=pow(s4*2.0,6.0);
//     	//s4=pow(s4*1.8,5.7);
//     	// s4.x=pow(s4.x,3.0);
//     	//s5=pow(s5*2.0,6.0);
//     	//fragColor.xyz += (vec3(0.0,0.0,1.0)*s4*0.6+vec3(0.9,0.0,1.0)*s5*0.3)*sphereZero(ray,pos,0.9);
//     	// fragColor.xyz += mix(mix(vec3(1.0,0.0,0.0),vec3(0.0,0.0,1.0),s4.y*1.9),vec3(0.9,1.0,0.1),s4.w*0.75)*s4.x*pow(s4.z*2.5,3.0)*0.2*zero;
//     	//fragColor.xyz += (mix(mix(vec3(1.0,0.0,0.0),vec3(0.0,0.0,1.0),s4*3.0),vec3(1.0),pow(s4*2.0,4.0))*s4*0.6)*sphereZero(ray,pos,0.9);
        
        
// 		/*float b = dot(ray,pos);
//   		float c = dot(pos,pos) - b*b;
//     	float l1 = sqrt(abs(10.0-c));
//     	vec3 spos = (ray*(b-l1))*mr;
//         vec3 sposr=ceil(spos)+spos/abs(spos)*0.5;
//         //sposr+=hpos(sposr)*0.2;
        
//         float ss3=max(0.0,ringRayNoise(ray,(sposr)*imr,0.001,10.0,mr,time));
//         fragColor.xyz += vec3(ss3);*/
//     }
    
//     //fragColor = max( vec4(0.0), fragColor );
//     //s+=noiseSpere(ray,vec3(0.0,0.0,3.0),0.96,vec2(mx+1.4,my),vec3(83.23,34.34,67.453));
//     //s+=noiseSpere(ray,vec3(0.0,0.0,3.0),0.90,vec2(mx,my),vec3(123.223311,956.34,7.45333))*0.6;
    
//     fragColor = max( vec4(0.0), fragColor );
// 	fragColor = min( vec4(1.0), fragColor );

//     return fragColor;
// }

// my old version
vec4 mainImage( vec4 fragColor, vec2 fragCoord )
{
	// vec2 p = (-iResolution.xy + 2.0*fragCoord.xy) / iResolution.y;
	vec2 p = (vUv-0.5)*3.;
        
    float time = iTime + 40.;
    float maxTime = 50.;
    // if (time > maxTime) time -= maxTime * mod(time, maxTime);
    // while (time > maxTime) time -= maxTime;

    // float mx = time*0.025;
    // float my = -0.6;
    vec2 rotate = vec2(mx, my);
    vec2 sins = sin(rotate);
    vec2 coss = cos(rotate);
    
    mat3 mr=mat3(vec3(coss.x,0.0,sins.x),vec3(0.0,1.0,0.0),vec3(-sins.x,0.0,coss.x));
    mr=mat3(vec3(1.0,0.0,0.0),vec3(0.0,coss.y,sins.y),vec3(0.0,-sins.y,coss.y))*mr;    

    vec3 ray = normalize(vec3(p,2.0));
    vec3 pos = vec3(0.0,0.0,3.0);
    
    float s1=noiseSphere(ray,pos,1.0,mr,0.5,vec3(0.0), time);
    s1=pow(min(1.0,s1*2.4),2.0);
    float s2=noiseSphere(ray,pos,1.0,mr,4.0,vec3(83.23, 34.34, 67.453), time);
    s2=min(1.0,s2*2.2);

    // sun color
    vec3 clr1 = sun_clr_1; // vec3(1.0, 1.0, .0); // основной цвет солнца base: 1, 1, 0
    vec3 clr2 = sun_clr_2; // vec3(1.0, .0, .0); // основной цвет перелива base: 1, 0, 0
    vec3 clr3 = sun_clr_3; // vec3(1.0, .0, 1.0); // один цвет переливов base: 1.0, 0.0, 1.0
    vec3 clr4 = sun_clr_4; // vec3(1.0, 1.0, 1.0); // всплывающие пятнышки
    vec3 clr5 = sun_clr_5; // vec3(1.0, 1.0, 1.0); // блики пробегающие по поверхности - base: 1

    vec4 newGLFragColor = vec4( mix(clr1, clr5, pow(s1,60.0)) * s1, 1.0 );
    // core release
    newGLFragColor += vec4( mix(mix(clr2, clr3, pow(s2,2.0)), clr4, pow(s2,10.0)) * s2, 1.0 );
    newGLFragColor.xyz -= vec3(ring(ray, pos, 1.03, 11.0)) * 2.0;
    newGLFragColor = max( vec4(0.0), newGLFragColor );
    
    // corona color
    vec3 corona_clr1 = sun_corona_clr_1; // vec3(1.0, .95, 1.0); // нижний цвет короны base: vec3(1.0,0.95,1.0)
    vec3 corona_clr2 = sun_corona_clr_2; // vec3(.0, 1.0, .0); // верхний цвет короны base: vec3(1.0,0.6,0.1)
    // corona
    float corona_radius = 0.96;
    float c_size = 1.0 / corona_size;
    float s3 = ringRayNoise(ray, pos, corona_radius, c_size, mr, time);
    newGLFragColor.xyz += mix(corona_clr2, corona_clr1, pow(s3,3.0)) * s3;
    
    newGLFragColor = clamp( vec4(0.0), vec4(1.0), newGLFragColor );
    
    // hide rectangle
    float zero = sphereZero(ray,pos,0.9);
    if (zero > 0.0) {
        newGLFragColor.a = max(newGLFragColor.r, max(newGLFragColor.g, newGLFragColor.b));
    }

    return newGLFragColor;
}

void main(void)
{
    gl_FragColor = mainImage(vec4(gl_FragColor), vec2(gl_FragCoord));
}
` 

export type BigStar1Params = {
    starSize: number;
    sunClr1?: { r: any, g: any, b: any };
    sunClr2?: { r: any, g: any, b: any };
    sunClr3?: { r: any, g: any, b: any };
    sunClr4?: { r: any, g: any, b: any };
    sunClr5?: { r: any, g: any, b: any };
    sunCoronaClr1?: { r: any, g: any, b: any };
    sunCoronaClr2?: { r: any, g: any, b: any };
    sun2Color?: { r: any, g: any, b: any };
    sun2CoronaColor?: { r: any, g: any, b: any };
};

export class BigStar extends THREE.Group {

    private _parentPos: THREE.Vector3;
    private _camera: THREE.Camera;
    private _params: BigStar1Params;
    private _light: THREE.PointLight | undefined;
    private _mesh: THREE.Mesh;
    private _uniforms: any;

    constructor(aParentPos: THREE.Vector3, aCamera: THREE.Camera, aParams: BigStar1Params) {

        super();

        this._parentPos = aParentPos;
        this._camera = aCamera;
        this._params = aParams;

        if (!this._params.sunClr1) this._params.sunClr1 = { r: 1.0, g: 1.0, b: .0 };
        if (!this._params.sunClr2) this._params.sunClr2 = { r: 1.0, g: .0, b: .0 };
        if (!this._params.sunClr3) this._params.sunClr3 = { r: 1.0, g: .0, b: 1.0 };
        if (!this._params.sunClr4) this._params.sunClr4 = { r: 1.0, g: 1.0, b: 1.0 };
        if (!this._params.sunClr5) this._params.sunClr5 = { r: 1.0, g: .894, b: .0 };
        if (!this._params.sunCoronaClr1) this._params.sunCoronaClr1 = { r: 1.0, g: .95, b: 1.0 };
        if (!this._params.sunCoronaClr2) this._params.sunCoronaClr2 = { r: 1.0, g: .6, b: .1 };
        
        // if (this.params.isShine == true) {
        //     this.light = new THREE.PointLight(this.data.color, this.data.shineIntensive, this.data.shineDistance);
        //     this.add(this.light);
        // }

        // test
        // let sun_clr_1 = new THREE.Color(1.0, 1.0, .0);
        // let sun_clr_2 = new THREE.Color(1.0, .0, .0);
        // let sun_clr_3 = new THREE.Color(1.0, .0, 1.0);
        // let sun_clr_4 = new THREE.Color(1.0, 1.0, 1.0);
        // let sun_clr_5 = new THREE.Color(1., 0.894, 0.);
        // let sun_corona_clr_1 = new THREE.Color(1.0, .95, 1.0);
        // let sun_corona_clr_2 = new THREE.Color(1.0, 0.6, 0.1);

        // from string to RGB
        // let sun_clr_1 = new THREE.Color(aStarData.sunClr1);
        // let sun_clr_2 = new THREE.Color(aStarData.sunClr2);
        // let sun_clr_3 = new THREE.Color(aStarData.sunClr3);
        // let sun_clr_4 = new THREE.Color(aStarData.sunClr4);
        // let sun_clr_5 = new THREE.Color(aStarData.sunClr5);
        // let sun_corona_clr_1 = new THREE.Color(aStarData.sunCoronaClr1);
        // let sun_corona_clr_2 = new THREE.Color(aStarData.sunCoronaClr2);
        
        // RGB
        let clr1 = this._params.sunClr1;
        let clr2 = this._params.sunClr2;
        let clr3 = this._params.sunClr3;
        let clr4 = this._params.sunClr4;
        let clr5 = this._params.sunClr5;
        let coronaClr1 = this._params.sunCoronaClr1;
        let coronaClr2 = this._params.sunCoronaClr2;

        this._uniforms = {
            iTime: { value: 0 },
            mx: { value: 0 },
            my: { value: 0 },
            sun_clr_1: { value: { x: clr1.r, y: clr1.g, z: clr1.b } },
            sun_clr_2: { value: { x: clr2.r, y: clr2.g, z: clr2.b } },
            sun_clr_3: { value: { x: clr3.r, y: clr3.g, z: clr3.b } },
            sun_clr_4: { value: { x: clr4.r, y: clr4.g, z: clr4.b } },
            sun_clr_5: { value: { x: clr5.r, y: clr5.g, z: clr5.b } },
            sun_corona_clr_1: { value: { x: coronaClr1.r, y: coronaClr1.g, z: coronaClr1.b } },
            sun_corona_clr_2: { value: { x: coronaClr2.r, y: coronaClr2.g, z: coronaClr2.b } },
            corona_size: { value: 1 } //aParams.coronaSize }
        };

        // GUI settings
        if (false && Settings.datGui) {
            let gui = Settings.datGui;
            let f = gui.addFolder('Big Star');
            let clr1 = gui.addFolder('clr 1');
            let clr2 = gui.addFolder('clr 2');
            let clr3 = gui.addFolder('clr 3');
            let clr4 = gui.addFolder('clr 4');
            let clr5 = gui.addFolder('clr 5');
            let corona1 = gui.addFolder('corona 1');
            let corona2 = gui.addFolder('corona 2');

            clr1.add(this._uniforms.sun_clr_1.value, 'x', 0, 1, 0.01);
            clr1.add(this._uniforms.sun_clr_1.value, 'y', 0, 1, 0.01);
            clr1.add(this._uniforms.sun_clr_1.value, 'z', 0, 1, 0.01);

            clr2.add(this._uniforms.sun_clr_2.value, 'x', 0, 1, 0.01);
            clr2.add(this._uniforms.sun_clr_2.value, 'y', 0, 1, 0.01);
            clr2.add(this._uniforms.sun_clr_2.value, 'z', 0, 1, 0.01);

            clr3.add(this._uniforms.sun_clr_3.value, 'x', 0, 1, 0.01);
            clr3.add(this._uniforms.sun_clr_3.value, 'y', 0, 1, 0.01);
            clr3.add(this._uniforms.sun_clr_3.value, 'z', 0, 1, 0.01);

            clr4.add(this._uniforms.sun_clr_4.value, 'x', 0, 1, 0.01);
            clr4.add(this._uniforms.sun_clr_4.value, 'y', 0, 1, 0.01);
            clr4.add(this._uniforms.sun_clr_4.value, 'z', 0, 1, 0.01);

            clr5.add(this._uniforms.sun_clr_5.value, 'x', 0, 1, 0.01);
            clr5.add(this._uniforms.sun_clr_5.value, 'y', 0, 1, 0.01);
            clr5.add(this._uniforms.sun_clr_5.value, 'z', 0, 1, 0.01);

            corona1.add(this._uniforms.sun_corona_clr_1.value, 'x', 0, 1, 0.01);
            corona1.add(this._uniforms.sun_corona_clr_1.value, 'y', 0, 1, 0.01);
            corona1.add(this._uniforms.sun_corona_clr_1.value, 'z', 0, 1, 0.01);

            corona2.add(this._uniforms.sun_corona_clr_2.value, 'x', 0, 1, 0.01);
            corona2.add(this._uniforms.sun_corona_clr_2.value, 'y', 0, 1, 0.01);
            corona2.add(this._uniforms.sun_corona_clr_2.value, 'z', 0, 1, 0.01);            
        }

        let shaderMaterial = new THREE.ShaderMaterial({
            vertexShader: vsSun,
            fragmentShader: fsSun,
            uniforms: this._uniforms,
            transparent: true,
            depthWrite: false,
            // blending: THREE.AdditiveBlending
        });

        let size = this._params.starSize || 1;

        let geom = new THREE.PlaneGeometry(size, size);

        this._mesh = new THREE.Mesh(geom, shaderMaterial);
        
        this.add(this._mesh);
    }

    update(dt: number) {
        // this.uf.iTime.value = Params.clock.getElapsedTime();
        this._uniforms.iTime.value += dt;

        let camera = this._camera;
        if (camera) {
            this._mesh.quaternion.copy(camera.quaternion);
            let p = camera.position.clone().sub(this._parentPos).normalize();
            this._uniforms.my.value = Math.atan2(Math.sqrt(p.x * p.x + p.z * p.z), p.y) - Math.PI / 2;
            this._uniforms.mx.value = Math.atan2(p.z, p.x);
        }
    }

}