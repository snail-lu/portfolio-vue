<template>
	<div class="demo-list-container">
		<el-row class="header">演示示例</el-row>
		<el-row class="demo-list" :gutter="20">
			<el-col class="demo-item" v-for="(demoItem, demoIndex) in demoList" :key="demoItem.path" :span="8">
				<div class="demo-item-header" :class="`bg-color${demoIndex}`">{{ demoItem.title }}</div>
				<div class="demo-item-content">
					<div class="demo-item-path">
						{{ demoItem.path }}
					</div>
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
					path: 'tree-expand',
					title: '节点树展开/收缩',
					desc: 'Element-UI中el-tree中节点树控制节点全展开/全收缩'
				},
				{
					path: 'table-sort',
					title: '表格自定义排序',
					desc: 'Element-UI中el-table中表格自定义排序'
				},
				{
					path: 'table-select',
					title: '表格分页多选',
					desc: 'Element-UI中el-table中表格翻页后表格行选择'
				},
				{
					path: 'table-transfer',
					title: '表格穿梭',
					desc: 'Element-UI中el-table内容选中穿梭框简单实现'
				},
				{
					path: 'phone-model',
					title: '手机模型',
					desc: '手机模型简单实现'
				},
				{
					path: 'hotspot',
					title: '图片上绘制热区',
					desc: '图片上绘制热区实现'
				}
			]
		}
	}
}
</script>

<style lang="scss" scoped>
@for $i from 1 through 30 {
	.bg-color#{$i} {
		color: #fff;
		background-color: rgba(random(255), random(255), random(255), 0.8);
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

		&:nth-child(1) {
			.demo-item-header {
				background-color: rgba(134, 35, 63, 0.8) !important;
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
			background-color: #fff;
			height: 150px;
			padding: 10px;
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
