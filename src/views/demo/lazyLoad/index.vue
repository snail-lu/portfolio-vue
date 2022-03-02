<template>
	<div class="demo-container">
		<el-row>
			<el-link icon="" href="https://snail-lu.github.io/portfolio-vue/#/demo/lazy-load">图片懒加载</el-link>
		</el-row>
		<div class="goods-list">
			<div class="goods-item" v-for="(item, index) in list" :key="index">
				<lazy-load-img :src="item" width="400px" height="500px"></lazy-load-img>
			</div>
		</div>
	</div>
</template>

<script>
import LazyLoadImg from '@/components/LazyLoadImg/index.vue'
export default {
	name: 'lazyLoad',
	components: {
		LazyLoadImg
	},
	data() {
		return {
			list: [
				'https://img0.baidu.com/it/u=1935280827,2072276192&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281',
				'https://img2.baidu.com/it/u=4255816616,2719846955&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
				'https://img1.baidu.com/it/u=2925040134,2161267160&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313',
				'https://img0.baidu.com/it/u=3810029785,1422155344&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
				'https://img2.baidu.com/it/u=1378801680,115323224&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800',
				'https://img1.baidu.com/it/u=1055292963,704550004&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
				'https://img2.baidu.com/it/u=1463605021,1779581844&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
				'https://img2.baidu.com/it/u=3316751696,261998796&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
				'https://img1.baidu.com/it/u=3906918928,3518209927&fm=253&fmt=auto&app=138&f=PNG?w=889&h=500'
			]
		}
	},
	mounted() {},
	methods: {}
}
</script>

<style lang="scss" scoped>
.demo-container {
	padding: 50px 25%;

	.el-row {
		text-align: center;
		margin-bottom: 10px;
	}

	.el-link {
		font-size: 18px;
		margin-bottom: 10px;
		text-align: center;
	}

	.goods-list {
		width: 100%;
	}

	.goods-item {
		width: 100%;
		height: 500px;

		img {
			width: 100%;
		}
	}
}
</style>
