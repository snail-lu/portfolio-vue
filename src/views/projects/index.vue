<template>
	<div class="demo-list-container">
		<el-row class="header"></el-row>
		<el-row class="demo-list" :gutter="20">
			<el-col class="demo-item" v-for="(demoItem, demoIndex) in demoList" :key="demoItem.path" :span="8">
				<div class="demo-item-header" :class="`bg-color${demoIndex % 30}`">{{ demoItem.title }}</div>
				<div class="demo-item-content">
					<a class="demo-item-path" :href="demoItem.reposity" target="__blank">
						{{ demoItem.path }}
					</a>
					<div class="demo-item-desc">
						{{ demoItem.desc }}
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	data() {
		return {
			demoList: [
				{
					path: 'vue-management-system',
					title: '后台管理系统项目框架',
					reposity: 'https://github.com/Snail-Lu/vue-management-system',
					desc: '基于Element-UI的后台管理系统项目框架'
				},
				{
					path: 'vue-vant-mall',
					title: '移动端商城项目框架',
					reposity: 'https://github.com/Snail-Lu/vue-vant-mall',
					desc: '基于vue-cli + vant创建的移动端项目框架'
				}
			]
		}
	},

	methods: {
		pushUrl(path) {
			this.$router.push({ path: `/demo/${path}` })
		}
	}
}
</script>

<style lang="scss" scoped>
@for $i from 0 through 30 {
	.bg-color#{$i} {
		color: #fff;
		background-image: linear-gradient(
			to right,
			rgba(random(255), random(255), random(255), 0.5),
			rgba(random(255), random(255), random(255), 0.5)
		);
	}
}
.header {
	text-align: center;
	font-size: 20px;
	height: 70px;
	line-height: 70px;
}

.demo-list {
	padding: 0 20%;

	.demo-item {
		margin-bottom: 20px;

		&-header {
			// background-color: rgb(224, 63, 63);
			color: #fff;
			height: 100px;
			line-height: 100px;
			text-align: center;
		}

		&-content {
			background-color: #fff;
			height: 150px;
			padding: 20px 10px 10px 10px;
			text-align: center;
		}

		&-path {
			display: inline-block;
			font-size: 18px;
			border-bottom: 1px solid #aaa;
			margin-bottom: 30px;
			cursor: pointer;
		}

		&-desc {
			color: #999;
			font-size: 14px;
		}
	}
}
</style>
