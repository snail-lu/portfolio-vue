<template>
	<div class="topbar-logo-container">
		<transition name="sidebarLogoFade">
			<router-link key="collapse" class="sidebar-logo-link" to="/">
				<img src="../../../assets/images/logo.png" class="sidebar-logo" />
			</router-link>
		</transition>
	</div>
</template>

<script>
export default {
	name: 'SidebarLogo',
	props: {
		collapse: {
			type: Boolean,
			required: true
		}
	},
	data() {
		return {}
	}
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
	transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
	opacity: 0;
}

.topbar-logo-container {
	position: relative;
	width: 50px;
	height: 50px;
	line-height: 50px;
	text-align: center;
	overflow: hidden;

	.sidebar-logo-link {
		height: 100%;
		width: 100%;

		.sidebar-logo {
			width: 50px;
			height: 40px;
			vertical-align: middle;
			border-radius: 25px;
		}

		.sidebar-title {
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

	&.collapse {
		.sidebar-logo {
			margin-right: 0px;
		}
	}
}
</style>
