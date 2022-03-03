<template>
	<div class="demo-list-container">
		<el-row class="demo-list" :gutter="20">
			<el-col class="demo-item" v-for="(demoItem, demoIndex) in demoList" :key="demoItem.path" :span="8"
				><div
					class="grid-content flex-box-column flex-h-end"
					:class="`bg-color${demoIndex % 30}`"
					@click="pushUrl(demoItem.path)"
				>
					<div class="demo-info">
						<div class="demo-item-title">{{ demoItem.title }}</div>
						<div class="demo-item-desc">{{ demoItem.desc }}</div>
					</div>
				</div></el-col
			>
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
		demoList() {
			return config.demoList || []
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
		color: #000;
		background-image: linear-gradient(
			random(360) + deg,
			rgba(random(255), random(255), random(255), 0.5),
			rgba(random(255), random(255), random(255), 0.5)
		);
	}
}
.demo-list-container {
	overflow-x: hidden;
}

.demo-list {
	padding: 50px 25%;

	.demo-item {
		margin-bottom: 20px;

		.grid-content {
			border-radius: 6px;
			height: 230px;
			cursor: pointer;
			&:hover {
				box-shadow: 0 8px 20px -12px rgba(0, 0, 0, 0.46), 0 4px 20px 0 rgba(0, 0, 0, 0.12),
					0 4px 6px -5px rgba(0, 0, 0, 0.2);
				.demo-item-title {
					display: inline-block;
					border-bottom: 1px solid #000;
				}
			}
		}

		.demo-info {
			height: 80px;
			padding: 10px 20px;
			background-color: rgba(255, 255, 255, 0.5);
			box-shadow: 0 -8px 8px 5px rgba(255, 255, 255, 0.5);
		}

		&-title {
			color: #000;
			font-size: 16px;
		}

		&-desc {
			color: #666;
			font-size: 13px;
			margin-top: 10px;
		}
	}
}
</style>
