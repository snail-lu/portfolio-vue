<template>
    <div class="three-js-container">
        <canvas id="container" ref="container"></canvas>
        <div class="full-screen-btn">
            <full-screen-button />
        </div>
    </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import waterTexture from '@/assets/three3d/waternormals.jpg';
import FullScreenButton from '@/components/FullScreenButton/index.vue';

let camera, scene, renderer;
let controls, water, sun;
export default {
    name: 'ThreeModel',
    components: {
        FullScreenButton
    },
    data() {
        return {};
    },
    mounted() {
        // this.initExample();
        this.init();
        this.animate();
    },
    methods: {
        // three.js基本使用
        initExample() {
            /**
             * 创建场景对象Scene
             */
            const scene = new THREE.Scene();
            // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
            const axesHelper = new THREE.AxesHelper(250);
            scene.add(axesHelper);

            // 立方体网格模型
            const geometry1 = new THREE.BoxGeometry(100, 100, 100);
            const material1 = new THREE.MeshLambertMaterial({
                color: 0x0000ff
            }); //材质对象Material
            const mesh1 = new THREE.Mesh(geometry1, material1); //网格模型对象Mesh
            scene.add(mesh1); //网格模型添加到场景中

            // 球体网格模型
            const geometry2 = new THREE.SphereGeometry(60, 40, 40);
            // const material2 = new THREE.MeshLambertMaterial({
            // 	color: 0xff00ff,
            // 	opacity: 0.7, // 不透明度0~1
            // 	transparent: true, // 是否透明
            // 	wireframe: true // 将几何图形渲染为线框。 默认值为false
            // })
            const sphereMaterial = new THREE.MeshPhongMaterial({
                color: 0xff00ff,
                specular: 0x4488ee,
                shininess: 12
            }); //材质对象 高光效果
            const mesh2 = new THREE.Mesh(geometry2, sphereMaterial); //网格模型对象Mesh
            mesh2.translateY(110); //球体网格模型沿Y轴正方向平移120
            scene.add(mesh2);

            // 圆柱网格模型
            const geometry3 = new THREE.CylinderGeometry(50, 50, 100, 25);
            const material3 = new THREE.MeshLambertMaterial({
                color: 0xffff00
            });
            const mesh3 = new THREE.Mesh(geometry3, material3); //网格模型对象Mesh
            // mesh3.translateX(120); //球体网格模型沿Y轴正方向平移120
            mesh3.position.set(120, 0, 0); //设置mesh3模型对象的xyz坐标为120,0,0
            scene.add(mesh3);
            /**
             * 光源设置
             */
            //点光源
            const point = new THREE.PointLight(0xffffff);
            point.position.set(400, 200, 300); //点光源位置
            scene.add(point); //点光源添加到场景中

            // 点光源2  位置和point关于原点对称
            const point2 = new THREE.PointLight(0xffffff);
            point2.position.set(-400, -200, -300); //点光源位置
            scene.add(point2); //点光源添加到场景中

            //环境光
            const ambient = new THREE.AmbientLight(0x444444);
            scene.add(ambient);
            // console.log(scene)
            // console.log(scene.children)
            /**
             * 相机设置
             */
            // const width = window.innerWidth //窗口宽度
            // const height = window.innerHeight //窗口高度
            const width = 700;
            const height = 600;
            const k = width / height; //窗口宽高比
            const s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
            //创建相机对象
            const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
            camera.position.set(200, 100, 200); //设置相机位置
            camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
            /**
             * 创建渲染器对象
             */
            const renderer = new THREE.WebGLRenderer({ canvas: this.$refs.container });
            renderer.setSize(width, height); //设置渲染区域尺寸
            renderer.setClearColor(0xffffff, 1); //设置背景颜色
            //执行渲染操作   指定场景、相机作为参数
            // 均匀旋转实现
            let T0 = new Date(); //上次时间
            function render() {
                let T1 = new Date(); //本次时间
                let t = T1 - T0; //时间差
                T0 = T1; //把本次时间赋值给上次时间
                renderer.render(scene, camera); //执行渲染操作
                // mesh.rotateY(0.001 * t) //绕y轴旋转0.001弧度每毫秒
                // requestAnimationFrame(render) //请求再次执行渲染函数render
            }
            render();

            // 鼠标缩放/旋转
            let controls = new OrbitControls(camera, renderer.domElement); //创建控件对象
            controls.addEventListener('change', render); //监听鼠标、键盘事件
        },

        // 模型初始化
        init() {
            // 创建场景对象Scene
            scene = new THREE.Scene();
            // 创建渲染器对象
            renderer = new THREE.WebGLRenderer({
                canvas: this.$refs.container
            });

            const { innerWidth, innerHeight, devicePixelRatio } = window;

            renderer.setPixelRatio(devicePixelRatio); // 设置设备像素比

            // 现在电脑的高分辨率屏幕一般都会设置缩放（我的屏幕设置了125%）
            // 此时window.innerHeight = Math.round(屏幕缩放后分辨率)
            // 这时候如果给元素设置的高度 = window.innerHeight，可能就会出现滚动条
            // 这里利用devicePixelRatio计算一下window.innerHeight缩放前的高度
            // 对缩放前的高度抹零后再计算缩放值，这样就能保证永远不会出现滚动条
            const canvasHeight = (Math.floor(innerHeight * devicePixelRatio) / devicePixelRatio).toFixed(2);
            renderer.setSize(innerWidth, canvasHeight); // 设置渲染区域尺寸
            renderer.toneMapping = THREE.ACESFilmicToneMapping; // 设置色调映射

            // 创建透视相机对象
            camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 20000);
            camera.position.set(30, 30, 100); // 设置相机位置

            // 创建一个三维向量对象，用于渲染太阳
            // sun = new THREE.Vector3();

            // 创建一个平面几何体
            const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
            // 创建水平面对象
            water = new Water(waterGeometry, {
                textureWidth: 512,
                textureHeight: 512,
                waterNormals: new THREE.TextureLoader().load(waterTexture, function (texture) {
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                }),
                sunDirection: new THREE.Vector3(),
                sunColor: 0xffffff,
                waterColor: 0x001e0f,
                distortionScale: 3.7,
                fog: scene.fog !== undefined
            });

            water.rotation.x = -Math.PI / 2;

            scene.add(water);

            // 创建天空对象
            const sky = new Sky();
            sky.scale.setScalar(10000);
            scene.add(sky);

            const skyUniforms = sky.material.uniforms;

            skyUniforms['turbidity'].value = 10;
            skyUniforms['rayleigh'].value = 2;
            skyUniforms['mieCoefficient'].value = 0.005;
            skyUniforms['mieDirectionalG'].value = 0.8;

            const parameters = {
                elevation: 2,
                azimuth: 180
            };

            // 创建一个三维向量对象，用于渲染太阳
            sun = new THREE.Vector3();
            const pmremGenerator = new THREE.PMREMGenerator(renderer);

            function updateSun() {
                const phi = THREE.MathUtils.degToRad(90 - parameters.elevation); // 与y轴的极角
                const theta = THREE.MathUtils.degToRad(parameters.azimuth); // 与y轴的赤道角

                sun.setFromSphericalCoords(1, phi, theta); // 从球坐标中的radius、phi和theta设置该向量。

                sky.material.uniforms['sunPosition'].value.copy(sun);
                water.material.uniforms['sunDirection'].value.copy(sun).normalize();

                scene.environment = pmremGenerator.fromScene(sky).texture;
            }

            updateSun();

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
            water.material.uniforms['time'].value += 1.0 / 60.0;

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
