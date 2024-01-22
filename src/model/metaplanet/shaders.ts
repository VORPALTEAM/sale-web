export const surfVertShader = `
uniform float rotation;

varying vec2 vUv;
varying vec3 vNormal;

void main() {
    vUv = uv;
    vNormal = normal;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
}
`
export const surfFragShader = `
uniform float uTime;
uniform sampler2D dayTexture;
uniform sampler2D nightTexture;
uniform sampler2D cloudsTexture;
uniform vec3 sunDirection;
uniform vec3 cameraDirection;
uniform float rotation;
 
varying vec2 vUv;
varying vec3 vNormal;

#define PI 3.141592

void main( void ) {

    vec2 uv = vUv;

    vec3 dayColor = texture2D(dayTexture, uv).rgb;
    vec3 nightColor = texture2D(nightTexture, uv).rgb;
    vec3 cloudColor = texture2D(cloudsTexture, uv).rgb;

    // vec3 bumpedNormal = perturbNormal2Arb(cameraDirection, vNormal, uv);
    vec3 bumpedNormal = vNormal;

    // compute cosine sun to normal so -1 is away from sun and +1 is toward sun.
    float cosineAngleSunToNormal = dot(bumpedNormal, sunDirection);
 
    // sharpen the edge beween the transition
    // cosineAngleSunToNormal = clamp(cosineAngleSunToNormal * .5, -1.0, 1.0);
    float deriveCosineAngleSun = clamp(cosineAngleSunToNormal * 10., -1.0, 1.0);

    // float nightLightIntensity = clamp(dot(-normal, sunDirection) + .1, smoothstep(1., 0., pow((uSunIntensity + uAmbientLight), .3)), 1.);
    float nightLightIntensity = .8;
 
    // convert to 0 to 1 for mixing
    float mixAmount = deriveCosineAngleSun * 0.5 + 0.5;
 
    // Select day or night texture based on mixAmount.
    vec3 color = mix(nightColor * nightLightIntensity, dayColor, mixAmount);

    // clouds
    float deriveCosineAngleSunClouds = clamp(cosineAngleSunToNormal * 2., -1.0, 1.0);
    float mixClouds = deriveCosineAngleSunClouds * 0.5 + 0.5;
    cloudColor *= mixClouds;
    color += cloudColor;

    gl_FragColor = vec4(color, 1.);
 
    // comment in the next line to see the mixAmount
    // gl_FragColor = vec4(mixAmount, mixAmount, mixAmount, 1.0);
}`

export const atmoVertShader = `
uniform float fresnelBias;
uniform float fresnelScale;
uniform float fresnelPower;

varying vec2 vUv;
varying vec3 vNormal;
varying float vReflectionFactor;

void main() {
    
    vUv = uv;
    vNormal = normal;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vec3 worldNormal = normalize(mat3(modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz) * normal);
    vec3 I = worldPosition.xyz - cameraPosition;
    vReflectionFactor = fresnelBias + fresnelScale * pow(1. + dot(normalize(I), worldNormal), fresnelPower);
    gl_Position = projectionMatrix * mvPosition;

}
`

export const atmoFragShader = `
uniform vec3 sunDirection;
uniform vec3 color1;
uniform vec3 color2;
uniform float opacity;

varying vec2 vUv;
varying vec3 vNormal;
varying float vReflectionFactor;

// Zavie - https://www.shadertoy.com/view/lslGzl
vec3 simpleReinhardToneMapping(vec3 color) {
  float exposure = 1.5;
  color *= exposure / (1. + color / exposure);
  color = pow(color, vec3(1. / 2.4));
  return color;
}

void main( void ) {
 
    // // compute cosine sun to normal so -1 is away from sun and +1 is toward sun.
    float cosineAngleSunToNormal = dot(normalize(vNormal), sunDirection);
 
    // // sharpen the edge beween the transition
    cosineAngleSunToNormal = clamp(cosineAngleSunToNormal * 5.0, -1.0, 1.0);
 
    // // convert to 0 to 1 for mixing
    float mixAmount = cosineAngleSunToNormal * 0.5 + 0.5;
    
    // // comment in the next line to see the mixAmount
    // gl_FragColor = vec4(mixAmount, mixAmount, mixAmount, .5);
    
    
    float f = clamp(vReflectionFactor, 0.0, 1.0);
    vec3 clr = mix(color2, color1, f);

    // vec3 tm = simpleReinhardToneMapping(clr);
    clr = simpleReinhardToneMapping(clr);

    float a = opacity * .9 * mixAmount * (clr.x + clr.y + clr.z) / 3.;

    gl_FragColor = vec4(clr, a);

}`

