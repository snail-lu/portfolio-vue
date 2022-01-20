<template>
	<section class="app-main">
		<transition name="fade-transform" mode="out-in">
			<router-view :key="key" />
		</transition>
	</section>
</template>

<script>
export default {
	name: 'AppMain',
	computed: {
		key() {
			return this.$route.path
		}
	}
}
</script>

<style scoped>
.app-main {
	/*50 = navbar  */
	height: calc(100vh - 60px);
	/* height: 100%; */
	width: 100%;
	position: relative;
	overflow: auto;
	box-sizing: border-box;
	margin: 0 auto;
	/* padding: 0 10px; */
}
.root {
	/* margin: 25px; */
	background-color: #fff;
	border: 1px solid #ddd;
	border-radius: 5px;
	padding: 30px;
	min-height: calc(100vh - 170px);
	box-sizing: border-box;
}
.fixed-header + .app-main {
	padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
	.fixed-header {
		padding-right: 15px;
	}
}
</style>
