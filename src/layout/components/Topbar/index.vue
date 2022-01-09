<template>
	<div class="topbar-wrapper flex-box flex-v-center" :style="{ background: variables.menuBg }">
		<logo />

		<el-menu
			:background-color="variables.menuBg"
			:text-color="variables.menuText"
			:unique-opened="false"
			:active-text-color="variables.menuActiveText"
			mode="horizontal"
			:router="true"
		>
			<!-- <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" /> -->
			<el-menu-item index="home">首页</el-menu-item>
			<el-menu-item index="projects">项目</el-menu-item>
			<el-menu-item index="demo">示例</el-menu-item>
			<el-menu-item index="about">关于</el-menu-item>
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

	.el-menu {
		border-bottom: none;
		margin-left: 50px;
		&-item {
			border-bottom: none;
		}
	}
}
</style>
