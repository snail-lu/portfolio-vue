<template>
    <div class="earth-moon-container" id="earth-moon-container"></div>
</template>

<script>
import { createCamera } from './components/camera.js';
import { createAxesHelper, createGridHelper } from './components/helpers.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';
import { Moon } from './Moon/index.js';
import { Earth } from './Earth/index.js';

import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';

let camera, scene, renderer, loop, labelRenderer;
export default {
    name: 'EarthMoon',
    data() {
        return {};
    },
    mounted() {
        this.init();
    },
    methods: {
        // 模型初始化
        init() {
            const container = document.querySelector('#earth-moon-container');
            camera = createCamera();
            renderer = createRenderer();
            scene = createScene();
            loop = new Loop(camera, scene, renderer);
            container.append(renderer.domElement);

            const controls = createControls(camera, renderer.domElement);
            const { mainLight, ambientLight } = createLights();

            scene.add(mainLight, ambientLight);

            const resizer = new Resizer(container, camera, renderer);

            // 坐标系及栅格
            // scene.add(createAxesHelper(), createGridHelper());

            const moon = new Moon();
            scene.add(moon);

            const earth = new Earth();
            scene.add(earth);

            loop.updatables.push(controls, moon, earth);
            this.start();
        },

        start() {
            loop.start();
        },

        stop() {
            loop.stop();
        }
    }
};
</script>

<style lang="scss" scoped>
.earth-moon-container {
    width: 100vw;
    height: 100vh;
}
#container {
    display: block;
    cursor: pointer;
}
</style>
