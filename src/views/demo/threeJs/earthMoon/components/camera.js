import { PerspectiveCamera } from 'three';

function createCamera() {
    const { innerWidth, innerHeight } = window;
    const camera = new PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 1000);
    camera.position.set(10, 5, 20); // 设置相机位置

    return camera;
}

export { createCamera };
