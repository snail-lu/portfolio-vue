<template>
    <div class="three-js-container">
        <canvas id="container" ref="container"></canvas>
    </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import moonTexture from '@/assets/three3d/moon.jpg';

let camera, scene, renderer, labelRenderer;
let controls, light, moon, earth;
let clock, textureLoader;
export default {
    name: 'Earth',
    data() {
        return {};
    },
    mounted() {
        this.init();
        this.animate();
    },
    methods: {
        // 模型初始化
        init() {
            // 实例化时钟
            clock = new THREE.Clock();
            // 实例化纹理加载器
            textureLoader = new THREE.TextureLoader();

            // 初始化地球、月球半径
            const EARTH_RADIUS = 2.5;
            const MOON_RADIUS = 0.27;

            // 实例化相机
            const { innerWidth, innerHeight, devicePixelRatio } = window;
            camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200);
            camera.position.set(10, 5, 20); // 设置相机位置

            // 实例化场景
            scene = new THREE.Scene();

            // 创建光源
            light = new THREE.SpotLight(0xffffff);
            light.position.set(0, 0, 10); // 光源位置
            light.intensity = 2; // 光强
            light.castShadow = true; // 投射阴影
            scene.add(light);

            const moonGeometry = new THREE.SphereGeometry(MOON_RADIUS, 16, 16);
            const moonMaterial = new THREE.MeshPhongMaterial({
                map: textureLoader.load(moonTexture)
            });
            moon = new THREE.Mesh(moonGeometry, moonMaterial);
            scene.add(moon);

            // 创建渲染器对象
            renderer = new THREE.WebGLRenderer({
                canvas: this.$refs.container
            });
            renderer.setPixelRatio(devicePixelRatio); // 设置设备像素比

            // 现在电脑的高分辨率屏幕一般都会设置缩放（我的屏幕设置了125%）
            // 此时window.innerHeight = Math.round(屏幕缩放后分辨率)
            // 这时候如果给元素设置的高度 = window.innerHeight，可能就会出现滚动条
            // 这里利用devicePixelRatio计算一下window.innerHeight缩放前的高度
            // 对缩放前的高度抹零后再计算缩放值，这样就能保证永远不会出现滚动条
            const canvasHeight = (Math.floor(innerHeight * devicePixelRatio) / devicePixelRatio).toFixed(2);
            renderer.setSize(innerWidth, canvasHeight); // 设置渲染区域尺寸
            // renderer.toneMapping = THREE.ACESFilmicToneMapping; // 设置色调映射

            // 轨道控制器，实现缩放平移等效果
            controls = new OrbitControls(camera, renderer.domElement);
            controls.maxPolarAngle = Math.PI * 0.495;
            controls.target.set(0, 10, 0);
            controls.minDistance = 40.0;
            controls.maxDistance = 200.0;
            controls.update();

            // 监听窗口缩放
            window.addEventListener('resize', this.onWindowResize);
        },

        onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);
        },

        animate() {
            requestAnimationFrame(this.animate);
            this.render();
        },

        render() {
            renderer.render(scene, camera);
        }
    }
};
</script>

<style lang="scss" scoped>
.three-js-container {
    position: relative;
    .full-screen-btn {
        position: absolute;
        top: 20px;
        right: 30px;
        font-size: 18px;
    }
}
#container {
    display: block;
    cursor: pointer;
}
</style>
