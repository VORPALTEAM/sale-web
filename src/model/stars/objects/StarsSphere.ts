import * as THREE from "three";

const vertexSh = `
varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
    vNormal = normalize(normalMatrix * normal); // Нормаль вершины
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz; // Позиция вершины относительно камеры
    gl_Position = projectionMatrix * mvPosition;
}`

const fragmentSh = `
varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
    // Расчет угла между нормалью и направлением на камеру
    float intensity = dot(normalize(vViewPosition), vNormal);
    float edgeFactor = smoothstep(0.0, 1.0, intensity);

    // Цвет и прозрачность сферы
    vec4 color = vec4(1.0, 1.0, 1.0, edgeFactor); // Белый цвет с учетом прозрачности

    gl_FragColor = color;
}
`

const starMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexSh,
    fragmentShader: fragmentSh,
    transparent: true
  });

function CreateSingleFarStar (position: {x: number, y: number, z: number}) {
    const stgm = new THREE.SphereGeometry(0.2, 16, 16);
    const star = new THREE.Mesh(stgm, starMaterial);
    star.position.set(position.x, position.y, position.z);
    return star;
}

function randomPointBetween(minDistance: number, maxDistance: number) {
    // Сгенерировать случайное расстояние
    let distance = Math.random() * (maxDistance - minDistance) + minDistance;

    // Сгенерировать случайные углы
    let theta = Math.random() * 2 * Math.PI; // Азимутальный угол
    let phi = Math.acos(2 * Math.random() - 1); // Полярный угол

    // Преобразовать сферические координаты в декартовы
    let x = distance * Math.sin(phi) * Math.cos(theta);
    let y = distance * Math.sin(phi) * Math.sin(theta);
    let z = distance * Math.cos(phi);

    return ({ x, y, z });
}

export class StarSky extends THREE.Group {
     count: number;
     radiusMin: number;
     radiusMax: number;

     constructor(_count: number, _radiusMin: number, _radiusMax: number) {
        super();
        this.count = _count;
        this.radiusMin = _radiusMin;
        this.radiusMax = _radiusMax;
        this.position.set(0, 0, 0);

        for (let j = 0; j < this.count; j++) {
            const starCoords = randomPointBetween(this.radiusMin, this.radiusMax);
            const farStar = CreateSingleFarStar(starCoords);
            this.add(farStar);
        }
     }
}

