<template>
	<div class="demo-list-container">
		<el-row class="demo-list" :gutter="20">
			<el-col class="demo-item" v-for="(demoItem, demoIndex) in projectsList" :key="demoItem.path" :span="8">
				<div class="grid-content">
					<div class="demo-item-header" :class="`bg-color${demoIndex % 30}`"></div>
					<div class="demo-item-content">
						<a class="demo-item-title" :href="demoItem.url ? demoItem.url : demoItem.reposity" target="__blank">
							{{ demoItem.title }}
						</a>
						<div class="demo-item-desc">
							{{ demoItem.desc }}
						</div>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import config from '@/config/index'
export default {
	data() {
		return {}
	},
	computed: {
		projectsList() {
			return config.projectsList || []
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

.demo-list-container {
	overflow-x: hidden;
}

.demo-list {
	padding: 50px 25%;

	.demo-item {
		margin-bottom: 20px;

		.grid-content {
			cursor: pointer;
			border-radius: 5px;
			background-color: #fff;
			overflow: hidden;

			&:hover {
				box-shadow: 0 0 10px #ccc;
			}
		}

		&-header {
			// background-color: rgb(224, 63, 63);
			color: #fff;
			height: 100px;
			line-height: 100px;
			text-align: center;
		}

		&-content {
			height: 150px;
			padding: 20px 10px 10px 10px;
			text-align: center;
		}

		&-title {
			display: inline-block;
			font-size: 18px;
			margin-bottom: 30px;
			box-sizing: border-box;

			&:hover {
				border-bottom: 1px solid #aaa;
			}
		}

		&-desc {
			color: #999;
			font-size: 13px;
		}
	}
}
</style>
