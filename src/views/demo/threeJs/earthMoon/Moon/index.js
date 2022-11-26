import { Clock, Mesh } from 'three';

import { createGeometries } from './geometries.js';
import { createMaterials } from './materials.js';

function Moon() {
    const moonGeometry = createGeometries();
    const moonMaterials = createMaterials();

    const moon = new Mesh(moonGeometry, moonMaterials);
    // 接受阴影及投射阴影
    moon.receiveShadow = true;
    moon.castShadow = true;

    const clock = new Clock();

    moon.tick = () => {
        // 获取自时钟启动后的秒数
        const elapsed = clock.getElapsedTime()
        moon.position.set(Math.sin(elapsed) * 7, 0, Math.cos(elapsed) * 7);
    }

    return moon
}

export { Moon };
