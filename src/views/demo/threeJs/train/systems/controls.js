import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function createControls(camera, canvas) {
    const controls = new OrbitControls(camera, canvas);

    // 启用阻尼感
    controls.enableDamping = true;

    controls.target.y = 1;

    // 启用自动旋转
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;

    // 限制放大和缩小的距离
    // controls.minDistance = 50;
    // controls.maxDistance = 100;

    controls.tick = () => controls.update();

    return controls;
}

export { createControls };
