import { SpotLight } from 'three';

function createLights() {
    const light = new SpotLight(0xffffff);
    light.position.set(0, 0, 6); // 光源位置
    light.intensity = 2; // 光强
    light.castShadow = true; // 投射阴影

    return { light };
}

export { createLights };
