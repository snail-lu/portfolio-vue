// 此DEMO样式参考vue-phone-model，github地址：https://github.com/panio123/vue-phone-model
<template>
	<div id="vue-phone-model">
		<div class="phone-wrap" :class="type">
			<div class="phone-box">
				<div class="phone-receiver-wrap">
					<i class="phone-camera"></i>
					<div class="phone-receiver"></div>
				</div>
				<div class="phone-button"></div>
				<div class="phone-tool-bar">
					<span class="time">{{ time }}</span>
					<span class="network"
						>5G
						<i class="power"></i>
					</span>
				</div>
				<div class="phone-desktop" :style="{ background: background }" @touch="onTouch">
					<!-- 模型内显示内容写在这里 -->
					<!-- <slot></slot> -->
					<img src="https://cdn.jsdelivr.net/gh/Snail-Lu/imageGalleries/gh-pages/2021-12/3820f11f44f6ba81.jpg" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'v-phone',
	props: {
		type: {
			default: 'i5',
			type: String
		},
		background: {
			default: '',
			type: String
		}
	},
	data() {
		return {
			time: ':'
		}
	},
	methods: {
		onTouch(e) {
			console.log(e)
		},
		checkTime(i) {
			if (i < 10) {
				i = '0' + i
			}
			return i
		},
		timer() {
			let now = new Date()
			let h = this.checkTime(now.getHours())
			let m = this.checkTime(now.getMinutes())
			this.time = h + ':' + m
			setTimeout(() => {
				this.timer()
			}, 1000)
		}
	},
	created() {
		this.timer()
	}
}
</script>

<style lang="less">
#vue-phone-model .phone-wrap {
	border-bottom: 75px solid #383735;
	border-top: 50px solid #383735;
	border-left: 15px solid #383735;
	border-right: 15px solid #383735;
	border-radius: 50px;
	width: 320px;
	height: 568px;
	box-sizing: content-box;
	cursor: pointer;
}

#vue-phone-model .phone-wrap.i6 {
	width: 375px;
	height: 667px;
}

#vue-phone-model .phone-wrap.ipad {
	width: 1024px;
	height: 768px;
}

#vue-phone-model .phone-wrap.ipad .phone-receiver-wrap {
	display: none;
}

#vue-phone-model .phone-receiver-wrap {
	position: absolute;
	width: 100%;
	z-index: 5;
	top: -25px;
	text-align: center;
}

#vue-phone-model .phone-camera {
	width: 6px;
	height: 6px;
	border-radius: 30px;
	background: #92969f;
	float: left;
	margin-left: 40%;
	margin-top: 1px;
	vertical-align: middle;
}

#vue-phone-model .phone-receiver {
	background: #1c1d22;
	width: 52px;
	height: 6px;
	float: left;
	margin-left: 6px;
	border-radius: 50px;
	box-shadow: 1px 2px #52514e;
}

#vue-phone-model .phone-button {
	position: absolute;
	width: 50px;
	height: 50px;
	background: #464646;
	border: 2px solid #2f2f2f;
	border-radius: 50%;
	bottom: -70px;
	left: 135px;
	z-index: 9;
	cursor: pointer;
	box-shadow: inset 0px 0px 2px 1px rgba(111, 111, 111, 0.4);
}

#vue-phone-model .i6 .phone-button {
	left: 160px;
}

#vue-phone-model .ipad .phone-button {
	left: 480px;
}

#vue-phone-model .phone-tool-bar {
	width: 100%;
	height: 20px;
	background: #000;
	color: #fff;
	font-size: 12px;
	overflow: hidden;
	line-height: 20px;
	padding: 0 10px;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	border-top: 2px solid #282828;
	border-bottom: none;
	margin-top: -20px;
}

#vue-phone-model .phone-tool-bar .time {
	float: left;
}

#vue-phone-model .phone-tool-bar .network {
	float: right;
}

#vue-phone-model .phone-tool-bar .power {
	position: relative;
	display: inline-block;
	width: 20px;
	height: 7px;
	border-radius: 5px;
	overflow: hidden;
	border: 1px solid #fff;
}

#vue-phone-model .phone-tool-bar .power::before {
	content: '';
	display: inline-block;
	width: 80%;
	height: 100%;
	background: #fff;
	position: absolute;
	top: 0;
	right: -1px;
}

#vue-phone-model .phone-box {
	position: relative;
	width: 100%;
	height: 100%;
	background: #fff;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	padding-top: 20px;
	border: 2px solid #282828;
	border-top: none;
}

#vue-phone-model .phone-desktop {
	width: 100%;
	height: 100%;
	position: relative;
	/* background-image: url('./img/moon.jpg'); */
	/* background-color: cadetblue; */
	background-color: #fff;
	background-size: cover;
	background-repeat: no-repeat;
	overflow-y: scroll;

	// chrome
	&::-webkit-scrollbar {
		display: none;
	}

	// 兼容火狐
	scrollbar-width: none;
	// 兼容IE10+
	-ms-overflow-style: none;
}

#vue-phone-model .app-icon-box {
	width: 17%;
	overflow: hidden;
	margin: 7% 4% 2% 4%;
	float: left;
	cursor: pointer;
}

#vue-phone-model .ipad .app-icon-box {
	width: 8%;
	margin: 2%;
}

#vue-phone-model .app-icon-box .app-icon {
	width: 100%;
	background: #fff;
	border-radius: 3px;
	overflow: hidden;
	font-size: 30px;
	text-align: center;
	line-height: 1.8;
	background: #4878b1;
}

#vue-phone-model .i6 .app-icon-box .app-icon {
	font-size: 35px;
}

#vue-phone-model .ipad .app-icon-box .app-icon {
	font-size: 45px;
}

#vue-phone-model .app-icon-box .app-icon img {
	width: 100%;
	display: block;
	border: none;
}

#vue-phone-model .app-icon-box p {
	width: 100%;
	margin: 5px 0 0 0;
	color: #fff;
	font-size: 12px;
	text-align: center;
	font-weight: 300;
	text-shadow: 1px 1px 2px #000;
	display: inline-block;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

#vue-phone-model .ipad .app-icon-box p {
	font-size: 15px;
}

#vue-phone-model .v-zoom-enter {
	opacity: 0;
	transform: scale3d(0.3, 0.3, 0.3);
	-webkit-transform: scale3d(0.3, 0.3, 0.3);
	-ms-transform: scale3d(0.3, 0.3, 0.3);
}

#vue-phone-model .v-zoom-enter-active {
	transition: transform 0.3s;
	-webkit-transition: transform 0.3s;
	-ms-transition: transform 0.3s;
}
</style>
