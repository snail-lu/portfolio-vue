import { MeshPhongMaterial, TextureLoader } from 'three';
import earthTexture from '@/assets/texture/earth.jpg';

function createMaterials() {
    // 实例化纹理加载器
    const textureLoader = new TextureLoader();
    const earthMaterial = new MeshPhongMaterial({
        shininess: 5,
        map: textureLoader.load(earthTexture)
    });

    return earthMaterial;

}

export { createMaterials };
