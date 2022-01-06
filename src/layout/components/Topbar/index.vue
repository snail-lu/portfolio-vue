<template>
	<div :class="{ 'has-logo': showLogo }">
		<logo v-if="showLogo" :collapse="isCollapse" />
		<el-menu
			:default-active="activeMenu"
			:collapse="isCollapse"
			:background-color="variables.menuBg"
			:text-color="variables.menuText"
			:unique-opened="false"
			:active-text-color="variables.menuActiveText"
			:collapse-transition="false"
			mode="horizontal"
		>
			<!-- <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" /> -->
			<el-menu-item index="1">ELEMENT-UI</el-menu-item>
			<el-submenu index="2">
				<template slot="title"
					>DEMO</template
				>
				<el-menu-item index="2-1">选项1</el-menu-item>
				<el-menu-item index="2-2">选项2</el-menu-item>
				<el-menu-item index="2-3">选项3</el-menu-item>
			</el-submenu>
			<el-menu-item index="3">OTHER</el-menu-item>
			<el-menu-item index="4"><a href="https://www.ele.me" target="_blank">ABOUT</a></el-menu-item>
		</el-menu>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Logo from './Logo'
// import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
	name: 'Topbar',
	// components: { SidebarItem, Logo },
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
