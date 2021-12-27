<template>
	<div class="content flex-box flex-h-center">
		<div class="img-box" @mouseup.left.stop="mouseUp($event)">
			<img
				class="img"
				src="https://m.360buyimg.com/babel/s1125x807_jfs/t1/172671/31/25159/274740/61c88e08Efd7f8050/29da51f1330c8aae.jpg!q70.dpg.webp"
				alt=""
				@mousedown.left.stop="mouseDown($event)"
				@mousemove.left.stop="mouseMove($event)"
			/>
			<!--当前正在绘制的热区蒙版-->
			<div
				v-show="drawBoxShow"
				class="area"
				:style="{ width: width + 'px', height: height + 'px', left: startX + 'px', top: startY + 'px' }"
			/>

			<!--已有的热区蒙版-->
			<div
				v-for="(item, index) in areaDataList"
				:id="index"
				:key="index"
				class="area flex-box-column flex-h-center flex-v-center"
				:style="{
					width: item.width + 'px',
					height: item.height + 'px',
					left: item.startX + 'px',
					top: item.startY + 'px'
				}"
			>
				{{ `热区${index}` }}
				<i class="el-icon-close" @click="delAreaBox(index)"></i>
				<div class="resize-area"></div>
			</div>
		</div>
		<div class="hot-area-list">
			<div class="hot-area-info" v-for="(item, index) in areaDataList" :key="index">
				<div class="info-header">热区{{ index }}</div>
				<div class="title">起点坐标：</div>
				<div class="flex-box flex-v-center">
					<div class="label">x：</div>
					<el-input v-model="item.startX" :disabled="true"></el-input>
					<div class="label" style="margin-left:20px;">y：</div>
					<el-input v-model="item.startY" :disabled="true"></el-input>
				</div>
				<div class="title">热区宽高：</div>
				<div class="flex-box flex-v-center">
					<div class="label">宽：</div>
					<el-input v-model="item.width" :disabled="true"></el-input>
					<div class="label" style="margin-left:20px;">高：</div>
					<el-input v-model="item.height" :disabled="true"></el-input>
				</div>
				<div class="title">热区链接：</div>
				<div class="flex-box">
					<el-input v-model="item.link"></el-input>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			areaDataList: [],
			startX: 0,
			startY: 0,
			width: 0,
			height: 0,
			drawBoxShow: false
		}
	},
	methods: {
		// 显示绘制热区弹窗
		showEditHotAreaDialog(index) {
			this.currentImgIndex = index
			this.dialogVisible = true
		},

		// 绘制热区开始
		mouseDown(e) {
			this.drawBoxShow = true
			this.startX = e.layerX
			this.startY = e.layerY
		},

		// 移动绘制热区
		mouseMove(ev) {
			if (this.drawBoxShow) {
				this.width = ev.layerX - this.startX
				this.height = ev.layerY - this.startY
			}
		},

		// 绘制热区结束
		mouseUp(e) {
			console.log(e, 'end')
			const { drawBoxShow, startX, startY, width, height } = this
			if (drawBoxShow && width > 10 && height > 10) {
				const data = {
					startX,
					startY,
					width,
					height,
					link: ''
				}
				this.areaDataList.push(data)
			}
			// 数据重置
			this.drawBoxShow = false
			this.startX = 0
			this.startY = 0
			this.width = 0
			this.height = 0
		},

		// 删除指定热区
		delAreaBox(index) {
			this.areaDataList.splice(index, 1)
		}
	}
}
</script>

<style lang="scss" scoped>
.flex-box {
	display: flex;
}

.flex-box-column {
	display: flex;
	flex-direction: column;
}

.flex-h-center {
	justify-content: center;
}

.flex-v-center {
	align-items: center;
}
.content {
	.img-box {
		position: relative;
		overflow: hidden;

		.img {
			width: 750px;
			cursor: crosshair;
		}

		.area {
			position: absolute;
			background: rgba(#2980b9, 0.3);
			border: 1px dashed #34495e;
			box-sizing: border-box;
			color: #fff;

			.el-icon-close {
				position: absolute;
				top: -6px;
				right: -6px;
				background-color: #fff;
				color: #000;
				border-radius: 100px;
				font-size: 12px;
			}

			.resize-area {
				width: 4px;
				height: 4px;
				position: absolute;
				bottom: 0;
				left: 0;
			}
		}
	}

	.hot-area-list {
		margin-left: 20px;

		.hot-area-info {
			background-color: #f5f5f5;
			padding: 10px 20px;
			margin-bottom: 10px;

			.info-header {
				font-weight: bold;
				margin-bottom: 10px;
				text-align: center;
			}

			.title {
				line-height: 2.5;
			}

			.label {
				width: 30px;
				flex-shrink: 0;
			}
		}
	}
}
</style>
