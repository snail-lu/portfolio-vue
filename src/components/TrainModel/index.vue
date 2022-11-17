<template>
    <div class="three-js-container" id="train-container">
        <!-- <canvas id="container" ref="container"></canvas> -->
    </div>
</template>

<script>
import { createCamera } from './components/camera.js';
import { createAxesHelper, createGridHelper } from './components/helpers.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';
import { Train } from './Train/Train.js';

import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';

let camera;
let renderer;
let scene;
let loop;

export default {
    name: 'Train',
    data() {
        return {};
    },
    mounted() {
        this.init();
    },
    methods: {
        // 模型初始化
        init() {
            // const container = this.$refs.container;
            const container = document.querySelector('#train-container');
            camera = createCamera();
            renderer = createRenderer();
            scene = createScene();
            loop = new Loop(camera, scene, renderer);
            container.append(renderer.domElement);

            const controls = createControls(camera, renderer.domElement);
            const { ambientLight, mainLight } = createLights();
            const train = new Train();

            loop.updatables.push(controls, train);
            scene.add(ambientLight, mainLight, train);

            const resizer = new Resizer(container, camera, renderer);

            scene.add(createAxesHelper(), createGridHelper());
            loop.start();
        },

        render() {
            render.render(scene, camera);
        },

        start() {
            loop.start();
        },

        stop() {
            loop.stop;
        }
    }
};
</script>

<style lang="scss" scoped>
#train-container {
    width: 100vw;
    height: 100vh;
}
#container {
    display: block;
    cursor: pointer;
}
</style>
