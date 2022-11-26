import { PCFSoftShadowMap, WebGLRenderer } from 'three';

function createRenderer() {
    const renderer = new WebGLRenderer();

    // 开启阴影渲染
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;

    // renderer.physicallyCorrectLights = true;

    return renderer;
}

export { createRenderer };
