import { MeshBasicMaterial, MeshPhongMaterial, TextureLoader } from 'three';
import moonTexture from '@/assets/three3d/moon.jpg';

function createMaterials() {
    // 实例化纹理加载器
    const textureLoader = new TextureLoader();
    const moonMaterial = new MeshPhongMaterial({
        map: textureLoader.load(moonTexture)
    });

    return moonMaterial;
}

export { createMaterials };
