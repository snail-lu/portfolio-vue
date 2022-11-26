import { MeshPhongMaterial, TextureLoader } from 'three';
import moonTexture from '@/assets/texture/moon.jpg';

function createMaterials() {
    // 实例化纹理加载器
    const textureLoader = new TextureLoader();
    // MeshPhongMaterial 具备高光效果的材质
    const moonMaterial = new MeshPhongMaterial({
        shininess: 5,
        map: textureLoader.load(moonTexture)
    });

    return moonMaterial;
}

export { createMaterials };
