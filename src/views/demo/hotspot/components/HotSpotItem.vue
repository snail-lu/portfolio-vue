<template>
	<div
		class="areaBox"
		:style="{
			width: areaInit.width + 'px',
			height: areaInit.height + 'px',
			left: areaInit.startX + 'px',
			top: areaInit.startY + 'px'
		}"
		@dblclick="editBoxShow = true"
		@mousedown.left.stop="mouseDown($event)"
		@mouseup.left.stop="mouseUp($event)"
	>
		<span class="promptText">热区{{ id }}</span>
		<!--删除-->
		<div class="del" @click.stop="del()">×</div>
		<!--形变点-->
		<div class="shape" @mousedown.left.stop="shapeDown($event)" @mouseup.left.stop="mouseUp($event)" />
	</div>
</template>

<script>
export default {
	name: 'HotSpotItem',
	props: {
		areaInit: {
			type: Object,
			default: () => {}
		},
		id: {
			type: Number,
			default: null
		}
	},
	data() {
		return {}
	},
	methods: {
		// 删除
		del() {
			this.$emit('del', this.id)
		},
		// 开始拖动
		mouseDown(e) {
			this.startX = e.clientX
			this.startY = e.clientY
			if (!document.onmousemove) {
				const initX = this.areaInit.startX
				const initY = this.areaInit.startY
				document.onmousemove = ev => {
					this.areaInit.startX = initX + ev.clientX - this.startX
					this.areaInit.startY = initY + ev.clientY - this.startY
				}
			}
		},
		// 结束拖动/变形
		mouseUp() {
			document.onmousemove = null
		},
		// 形变开始
		shapeDown(e) {
			this.start1X = e.clientX
			this.start1Y = e.clientY
			if (!document.onmousemove) {
				const initX = this.areaInit.width
				const initY = this.areaInit.height
				document.onmousemove = ev => {
					this.areaInit.width = initX + ev.clientX - this.start1X
					this.areaInit.height = initY + ev.clientY - this.start1Y
				}
			}
		}
	}
}
</script>

<style scoped lang="scss" ref="stylesheet/scss">
.areaBox {
	position: absolute;
	background: rgba(#2980b9, 0.3);
	border: 0.7px dashed #34495e;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	font-size: 14px;
	cursor: move;
	user-select: none;
	.del {
		width: 10px;
		height: 10px;
		line-height: 10px;
		background: #bdc3c7;
		border-radius: 50%;
		position: absolute;
		right: 0;
		top: 0;
		transform: translate(50%, -50%);
		cursor: default;
		text-align: center;
	}
	.shape {
		position: absolute;
		width: 7px;
		height: 7px;
		background: transparent;
		right: 0;
		bottom: 0;
		transform: translate3d(50%, 50%, 0);
		cursor: nwse-resize;
	}
}
</style>
