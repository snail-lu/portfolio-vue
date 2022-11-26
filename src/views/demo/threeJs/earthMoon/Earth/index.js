import { Clock, Mesh, Vector3 } from 'three';

import { createGeometries } from './geometries.js';
import { createMaterials } from './materials.js';

function Earth() {
    const earthGeometry = createGeometries();
    const earthMaterials = createMaterials();

    const earth = new Mesh(earthGeometry, earthMaterials);
    // 接受阴影及投射阴影
    earth.receiveShadow = true;
    earth.castShadow = true;

    let oldElapsed = 0;
    const clock = new Clock();
    earth.tick = () => {
        const axis = new Vector3(0, 1, 0);
        // 获取自时钟启动后的秒数
        const elapsed = clock.getElapsedTime();
        earth.rotateOnAxis(axis, (elapsed - oldElapsed) * Math.PI / 20);
        oldElapsed = elapsed;
    }

    return earth
}

export { Earth };
