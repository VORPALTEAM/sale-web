import * as THREE from "three";

export class ThreejsUtils {
    
    public static toScreenPosition(renderer: { getContext: () => { (): any; new(): any; canvas: { (): any; new(): any; width: number; height: number; }; }; }, obj: { updateMatrixWorld: () => void; matrixWorld: THREE.Matrix4; }, camera: THREE.Camera, devicePixelRatio: number) {
        let vector = new THREE.Vector3();
        
        let widthHalf = 0.5 * renderer.getContext().canvas.width;
        let heightHalf = 0.5 * renderer.getContext().canvas.height;

        obj.updateMatrixWorld();
        vector.setFromMatrixPosition(obj.matrixWorld);
        vector.project(camera);

        vector.x = (vector.x * widthHalf) + widthHalf;
        vector.y = - (vector.y * heightHalf) + heightHalf;
        
        return {
            x: vector.x / devicePixelRatio,
            y: vector.y / devicePixelRatio
        };

    }

}