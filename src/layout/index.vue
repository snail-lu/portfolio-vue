<template>
	<div :class="classObj" class="app-wrapper">
		<div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
		<topbar />
		<app-main />
	</div>
</template>

<script>
import { Navbar, Sidebar, AppMain, Topbar } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { logout } from '@/api/system'

export default {
	data() {
		return {
			userInfo: {}
		}
	},
	name: 'Layout',
	components: {
		Navbar,
		Sidebar,
		AppMain,
		Topbar
	},
	mixins: [ResizeMixin],
	computed: {
		sidebar() {
			return this.$store.state.app.sidebar
		},
		device() {
			return this.$store.state.app.device
		},
		fixedHeader() {
			return this.$store.state.settings.fixedHeader
		},
		classObj() {
			return {
				hideSidebar: !this.sidebar.opened,
				openSidebar: this.sidebar.opened,
				withoutAnimation: this.sidebar.withoutAnimation,
				mobile: this.device === 'mobile'
			}
		}
	},
	mounted() {
		let userInfo = localStorage.getItem('userInfo')
		if (userInfo) {
			this.userInfo = JSON.parse(userInfo)
		}
	},
	methods: {
		handleClickOutside() {
			this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
		},
		handleCommand(command) {
			if (command == 'resume') {
				this.$router.push({ path: '/resume/index' })
			}
		},
		logout() {
			const that = this
			this.$confirm('确定退出登录吗?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' })
				.then(() => {
					// 利用接口登出
					// that.logoutLogin();

					// 利用本地登出
					localStorage.clear()
					that.$router.go(0)
				})
				.catch(() => {
					this.$message({ type: 'info', message: '已取消退出' })
				})
		},
		logoutLogin() {
			logout().then(res => {
				console.log(res)
				if (res.result.logoutUrl) {
					window.location.href = res.result.logoutUrl
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
	@include clearfix;
	position: relative;
	height: 100%;
	width: 100%;
	background-color: #f0f0f0;
	&.mobile.openSidebar {
		position: fixed;
		top: 0;
	}
	.header {
		height: 70px;
		background: #242f42;
		padding: 0 55px 0 30px;
		box-sizing: border-box;
		display: flex;
		font-size: 18px;
		justify-content: space-between;
		align-items: center;
		position: relative;
		z-index: 1003;
		.title {
			width: 192px;
			font-family: MicrosoftYaHei;
			font-size: 22px;
			font-weight: normal;
			font-stretch: normal;
			line-height: 33px;
			letter-spacing: 2px;
			color: #ffffff;
		}
		.option {
			display: flex;
			justify-content: space-between;
			color: white;
			.el-dropdown-link {
				cursor: pointer;
				color: #fff;
			}
			div {
				display: flex;
				align-items: center;
			}
		}
		.iconfont {
			font-size: 20px;
			margin-right: 10px;
		}
		.icon-quit {
			font-size: 16px;
		}
		.line {
			margin: 0 23px 0 23px;
		}
		.logout {
			cursor: pointer;
		}
	}
	.main {
		height: calc(100vh - 60px);
		overflow: hidden;
		position: relative;
		.sidebar-container {
			margin-top: 70px;
		}
	}
}
.drawer-bg {
	background: #000;
	opacity: 0.3;
	width: 100%;
	top: 0;
	height: 100%;
	position: absolute;
	z-index: 999;
}

.fixed-header {
	position: fixed;
	top: 0;
	right: 0;
	z-index: 9;
	width: calc(100% - #{$sideBarWidth});
	transition: width 0.28s;
}

.hideSidebar .fixed-header {
	width: calc(100% - 54px);
}

.mobile .fixed-header {
	width: 100%;
}
</style>
