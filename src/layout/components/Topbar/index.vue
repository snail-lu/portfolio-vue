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
			:default-active="currentRoute"
		>
			<el-menu-item :index="item.path" v-for="item in menuList" :key="item.path">{{ item.name }}</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
// import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
// import config from '@/config/index'

const settings = require('@/settings.js')
export default {
	name: 'Topbar',
	components: { Logo },
	computed: {
		...mapGetters(['sidebar']),
		currentRoute() {
			return '/' + this.$route.path.split('/')[1]
		},
		variables() {
			return variables
		},
		menuList() {
			return settings.menu || []
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
