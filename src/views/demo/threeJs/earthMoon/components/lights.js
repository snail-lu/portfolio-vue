import { AmbientLight, SpotLight } from 'three';

function createLights() {
    // 主光
    const mainLight = new SpotLight(0xffffff);
    mainLight.position.set(-3, 0, 20); // 光源位置
    mainLight.intensity = 2; // 光强
    mainLight.castShadow = true; // 投射阴影

    // 环境光
    const ambientLight = new AmbientLight(0xcccccc);
    ambientLight.intensity = 0.1;

    return { mainLight, ambientLight };
}

export { createLights };
