<template>
	<div class="topbar-wrapper flex-box flex-v-center" :style="{ background: variables.menuBg }">
		<logo />
		<el-menu
			:collapse="isCollapse"
			:background-color="variables.menuBg"
			:text-color="variables.menuText"
			:unique-opened="false"
			:active-text-color="variables.menuActiveText"
			mode="horizontal"
		>
			<!-- <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" /> -->
			<el-menu-item index="1">ELEMENT-UI</el-menu-item>
			<el-menu-item index="2">DEMO</el-menu-item>
			<el-menu-item index="3">OTHER</el-menu-item>
			<el-menu-item index="4">ABOUT</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
// import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
	name: 'Topbar',
	components: { Logo },
	computed: {
		...mapGetters(['sidebar']),
		routes() {
			return this.$router.options.routes
		},
		activeMenu() {
			const route = this.$route
			const { meta, path } = route
			// if set path, the sidebar will highlight the path you set
			if (meta.activeMenu) {
				return meta.activeMenu
			}
			return path
		},
		showLogo() {
			return this.$store.state.settings.sidebarLogo
		},
		variables() {
			return variables
		},
		isCollapse() {
			return !this.sidebar.opened
		}
	}
}
</script>
<style lang="scss" scoped>
.topbar-wrapper {
	width: 100%;
	padding-left: 20%;
}
</style>
