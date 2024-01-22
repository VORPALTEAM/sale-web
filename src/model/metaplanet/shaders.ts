export const surfVertShader = `
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
uniform sampler2D specularMap;
uniform vec3 sunDirection;
uniform vec3 cameraDirection;
uniform sampler2D normalMap;
uniform float normalMapScale;
 
varying vec2 vUv;
varying vec3 vNormal;

#define PI 3.141592
#define shininess 1.

vec3 applyNormalMap(vec2 uv, vec3 aNormal) {
    vec3 normalMapValue = texture2D(normalMap, uv).xyz * 2.0 - 1.0;
    normalMapValue *= normalMapScale;
    // mix input normal with normal map
    return normalize(aNormal + normalMapValue);
}

float spec(vec2 uv, vec3 normal) {
    // Получаем значение из карты отраженного света в текущих текстурных координатах
    float specularIntensity = texture2D(specularMap, uv).r;

    float cosAnSunToNormal = dot(normal, sunDirection);
    float deriveCosAn = clamp((cosAnSunToNormal + 1.) / 2. * 80. - 79., 0., 1.0);
    // deriveCosAn *= .5;

    // Расчет направления бликов (например, использование модели Фонга)
    // vec3 reflectionDirection = reflect(-sunDirection, normal);

    // Расчет угла между направлением взгляда и направлением отраженного света
    // float specularAngle = max(dot(cameraDirection, reflectionDirection), 0.0);

    // Применяем карту спекулярности в зависимости от угла блика
    float finalSpecular = specularIntensity * deriveCosAn;

    return finalSpecular;
}

void main( void ) {

    vec2 uv = vUv;
    vec3 finalNormal = vNormal;

    vec3 dayColor = texture2D(dayTexture, uv).rgb;
    vec3 nightColor = texture2D(nightTexture, uv).rgb;
    vec3 cloudColor = texture2D(cloudsTexture, uv).rgb;

    // normal map
    finalNormal = applyNormalMap(uv, finalNormal);

    // compute cosine sun to normal so -1 is away from sun and +1 is toward sun.
    float cosAnSunToNormal = dot(finalNormal, sunDirection);
 
    // sharpen the edge beween the transition
    float deriveCosineAngleSun = clamp(cosAnSunToNormal * 10., -1.0, 1.0);

    // float nightLightIntensity = clamp(dot(-normal, sunDirection) + .1, smoothstep(1., 0., pow((uSunIntensity + uAmbientLight), .3)), 1.);
    float nightLightIntensity = .8;
 
    // convert to 0 to 1 for mixing
    float mixAmount = deriveCosineAngleSun * 0.5 + 0.5;
 
    // Select day or night texture based on mixAmount.
    vec3 color = mix(nightColor * nightLightIntensity, dayColor, mixAmount);

    // clouds
    float deriveCosineAngleSunClouds = clamp(cosAnSunToNormal * 2., -1.0, 1.0);
    float mixClouds = deriveCosineAngleSunClouds * 0.5 + 0.5;
    cloudColor *= mixClouds;
    color += cloudColor;

    // color += spec(uv, finalNormal);

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
uniform vec3 uCameraDirection;
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
    float deriveCosAnSunToNormal = clamp(cosineAngleSunToNormal * 5.0, -1.0, 1.0);
 
    // // convert to 0 to 1 for mixing
    float mixAmount = deriveCosAnSunToNormal * 0.5 + 0.5;
    
    // // comment in the next line to see the mixAmount
    // gl_FragColor = vec4(mixAmount, mixAmount, mixAmount, .5);
    
    float f = clamp(vReflectionFactor, 0.0, 1.0);
    vec3 clr = mix(color2, color1, f);

    // float cosAngleCamSun = dot(uCameraDirection, sunDirection);
    // vec3 redColor = vec3(1., .0, .0);
    // float redMix = cosineAngleSunToNormal * 0.5 + 0.5;
    // clr = mix(clr, redColor, redMix);

    clr = simpleReinhardToneMapping(clr);

    float a = opacity * .9 * mixAmount * (clr.x + clr.y + clr.z) / 3.;

    gl_FragColor = vec4(clr, a);

}`

