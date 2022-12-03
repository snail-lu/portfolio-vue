<template>
    <div id="star-river"></div>
</template>

<script setup>
import {
    Scene,
    PerspectiveCamera,
    Color,
    WebGLRenderer,
    Vector3,
    Float32BufferAttribute,
    BufferGeometry,
    AdditiveBlending,
    PointsMaterial,
    Points,
    Clock
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { onMounted } from 'vue';

const init = () => {
    let scene = new Scene();
    scene.background = new Color(0x282a36);
    let camera = new PerspectiveCamera(60, innerWidth / innerHeight, 1, 1000);
    camera.position.set(0, 5, 49);
    let renderer = new WebGLRenderer();
    const canvasHeight = (Math.floor(innerHeight * devicePixelRatio) / devicePixelRatio).toFixed(2);
    renderer.setSize(innerWidth, canvasHeight);
    const container = document.querySelector('#star-river');
    container.appendChild(renderer.domElement);
    window.addEventListener('resize', (event) => {
        camera.aspect = innerWidth / innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(innerWidth, innerHeight);
    });

    let controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;

    let gu = {
        time: { value: 0 }
    };

    let sizes = [];
    let shift = [];
    let pushShift = () => {
        shift.push(Math.random() * Math.PI, Math.random() * Math.PI * 2, (Math.random() * 0.9 + 0.1) * Math.PI * 0.1, Math.random() * 0.9 + 0.1);
    };
    let pts = new Array(50000).fill().map((p) => {
        sizes.push(Math.random() * 1.5 + 0.5);
        pushShift();
        return new Vector3().randomDirection().multiplyScalar(Math.random() * 0.5 + 9.5);
    });
    for (let i = 0; i < 100000; i++) {
        let r = 10,
            R = 40;
        let rand = Math.pow(Math.random(), 1.5);
        let radius = Math.sqrt(R * R * rand + (1 - rand) * r * r);
        pts.push(new Vector3().setFromCylindricalCoords(radius, Math.random() * 2 * Math.PI, (Math.random() - 0.5) * 2));
        sizes.push(Math.random() * 1.5 + 0.5);
        pushShift();
    }

    let g = new BufferGeometry().setFromPoints(pts);
    g.setAttribute('sizes', new Float32BufferAttribute(sizes, 1));
    g.setAttribute('shift', new Float32BufferAttribute(shift, 4));
    let m = new PointsMaterial({
        size: 0.125,
        transparent: true,
        depthTest: false,
        blending: AdditiveBlending,
        onBeforeCompile: (shader) => {
            shader.uniforms.time = gu.time;
            shader.vertexShader = `
      uniform float time;
      attribute float sizes;
      attribute vec4 shift;
      varying vec3 vColor;
      ${shader.vertexShader}
    `
                .replace(`gl_PointSize = size;`, `gl_PointSize = size * sizes;`)
                .replace(
                    `#include <color_vertex>`,
                    `#include <color_vertex>
        float d = length(abs(position) / vec3(40., 10., 40));
        d = clamp(d, 0., 1.);
        vColor = mix(vec3(227., 155., 0.), vec3(100., 50., 255.), d) / 255.;
      `
                )
                .replace(
                    `#include <begin_vertex>`,
                    `#include <begin_vertex>
        float t = time;
        float moveT = mod(shift.x + shift.z * t, PI2);
        float moveS = mod(shift.y + shift.z * t, PI2);
        transformed += vec3(cos(moveS) * sin(moveT), cos(moveT), sin(moveS) * sin(moveT)) * shift.w;
      `
                );
            shader.fragmentShader = `
      varying vec3 vColor;
      ${shader.fragmentShader}
    `
                .replace(
                    `#include <clipping_planes_fragment>`,
                    `#include <clipping_planes_fragment>
        float d = length(gl_PointCoord.xy - 0.5);
        //if (d > 0.5) discard;
      `
                )
                .replace(
                    `vec4 diffuseColor = vec4( diffuse, opacity );`,
                    `vec4 diffuseColor = vec4( vColor, smoothstep(0.5, 0.1, d)/* * 0.5 + 0.5*/ );`
                );
        }
    });
    let p = new Points(g, m);
    p.rotation.order = 'ZYX';
    p.rotation.z = 0.2;
    scene.add(p);

    let clock = new Clock();

    renderer.setAnimationLoop(() => {
        controls.update();
        let t = clock.getElapsedTime() * 0.5;
        gu.time.value = t * Math.PI;
        p.rotation.y = t * 0.05;
        renderer.render(scene, camera);
    });
};

onMounted(() => {
    init();
});
</script>

<style lang="scss" scoped>
@import 'https://fonts.googleapis.com/css2?family=Megrim&display=swap';
#star-river {
    overflow: hidden;
}
</style>
