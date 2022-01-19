<template>
	<div class="topbar-logo-container">
		<transition name="topbarLogoFade">
			<router-link key="collapse" class="topbar-logo-link" to="/">
				<img src="../../../assets/images/logo.png" class="topbar-logo" />
			</router-link>
		</transition>
	</div>
</template>

<script>
export default {
	name: 'topbarLogo',
	props: {},
	data() {
		return {}
	}
}
</script>

<style lang="scss" scoped>
@keyframes swiming {
	0% {
		transform: rotate(-20deg);
	}

	50% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(10deg);
	}
}

.topbarLogoFade-enter-active {
	transition: opacity 1.5s;
}

.topbarLogoFade-enter,
.topbarLogoFade-leave-to {
	opacity: 0;
}

.topbar-logo-container {
	position: relative;
	width: 50px;
	height: 50px;
	line-height: 50px;
	text-align: center;
	overflow: hidden;

	.topbar-logo-link {
		height: 100%;
		width: 100%;

		.topbar-logo {
			width: 50px;
			height: 40px;
			vertical-align: middle;
			border-radius: 25px;
			// animation: swiming 0.8s linear alternate infinite;
		}

		.topbar-title {
			display: inline-block;
			margin: 0;
			color: #fff;
			font-weight: 600;
			line-height: 50px;
			font-size: 14px;
			font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
			vertical-align: middle;
		}
	}
}
</style>
