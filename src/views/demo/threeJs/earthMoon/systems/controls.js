import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function createControls(camera, domElement) {
    const controls = new OrbitControls(camera, domElement);
    // 垂直旋转的角度的上限
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.target.set(0, 0, 0);

    // 限制放大和缩小的距离
    // controls.minDistance = 40.0;
    // controls.maxDistance = 200.0;
    // 启用阻尼感
    controls.enableDamping = true;

    controls.tick = () => controls.update();

    return controls;
}

export { createControls };
