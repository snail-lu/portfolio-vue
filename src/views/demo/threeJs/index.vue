<template>
	<div class="demo-container">
		<canvas id="three" ref="three"></canvas>
	</div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export default {
	name: 'ThreeModel',
	data() {
		return {
			time: ':'
		}
	},
	mounted() {
		this.initThree()
	},
	methods: {
		initThree() {
			/**
			 * 创建场景对象Scene
			 */
			const scene = new THREE.Scene()
			// 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
			const axesHelper = new THREE.AxesHelper(250)
			scene.add(axesHelper)

			// 立方体网格模型
			const geometry1 = new THREE.BoxGeometry(100, 100, 100)
			const material1 = new THREE.MeshLambertMaterial({
				color: 0x0000ff
			}) //材质对象Material
			const mesh1 = new THREE.Mesh(geometry1, material1) //网格模型对象Mesh
			scene.add(mesh1) //网格模型添加到场景中

			// 球体网格模型
			const geometry2 = new THREE.SphereGeometry(60, 40, 40)
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
			}) //材质对象 高光效果
			const mesh2 = new THREE.Mesh(geometry2, sphereMaterial) //网格模型对象Mesh
			mesh2.translateY(110) //球体网格模型沿Y轴正方向平移120
			scene.add(mesh2)

			// 圆柱网格模型
			const geometry3 = new THREE.CylinderGeometry(50, 50, 100, 25)
			const material3 = new THREE.MeshLambertMaterial({
				color: 0xffff00
			})
			const mesh3 = new THREE.Mesh(geometry3, material3) //网格模型对象Mesh
			// mesh3.translateX(120); //球体网格模型沿Y轴正方向平移120
			mesh3.position.set(120, 0, 0) //设置mesh3模型对象的xyz坐标为120,0,0
			scene.add(mesh3)
			/**
			 * 光源设置
			 */
			//点光源
			const point = new THREE.PointLight(0xffffff)
			point.position.set(400, 200, 300) //点光源位置
			scene.add(point) //点光源添加到场景中

			// 点光源2  位置和point关于原点对称
			const point2 = new THREE.PointLight(0xffffff)
			point2.position.set(-400, -200, -300) //点光源位置
			scene.add(point2) //点光源添加到场景中

			//环境光
			const ambient = new THREE.AmbientLight(0x444444)
			scene.add(ambient)
			// console.log(scene)
			// console.log(scene.children)
			/**
			 * 相机设置
			 */
			const width = window.innerWidth //窗口宽度
			const height = window.innerHeight //窗口高度
			const k = width / height //窗口宽高比
			const s = 200 //三维场景显示范围控制系数，系数越大，显示的范围越大
			//创建相机对象
			const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
			camera.position.set(200, 100, 200) //设置相机位置
			camera.lookAt(scene.position) //设置相机方向(指向的场景对象)
			/**
			 * 创建渲染器对象
			 */
			const renderer = new THREE.WebGLRenderer({ canvas: this.$refs.three })
			renderer.setSize(width, height) //设置渲染区域尺寸
			renderer.setClearColor(0xb9d3ff, 1) //设置背景颜色
			//执行渲染操作   指定场景、相机作为参数
			// function render() {
			// 	renderer.render(scene, camera)
			// }
			// render()

			// 均匀旋转实现
			let T0 = new Date() //上次时间
			function render() {
				let T1 = new Date() //本次时间
				let t = T1 - T0 //时间差
				T0 = T1 //把本次时间赋值给上次时间
				renderer.render(scene, camera) //执行渲染操作
				// mesh.rotateY(0.001 * t) //绕y轴旋转0.001弧度每毫秒
				// requestAnimationFrame(render) //请求再次执行渲染函数render
			}
			render()

			// 鼠标缩放/旋转
			let controls = new OrbitControls(camera, renderer.domElement) //创建控件对象
			controls.addEventListener('change', render) //监听鼠标、键盘事件
		}
	}
}
</script>

<style lang="scss" scoped>
.demo-container {
	padding-top: 10px;
}
</style>
