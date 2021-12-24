<template>
	<div :class="classObj" class="app-wrapper">
		<div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
		<div class="header">
			<span class="title">VUE项目集</span>
			<div class="option">
				<el-dropdown @command="logout">
					<span class="el-dropdown-link" style="display:flex;align-items:center">
						<el-avatar
							src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
							style="margin-right:10px"
						></el-avatar>
					</span>
					<!-- <el-dropdown-menu slot="dropdown">
						<el-dropdown-item>退出登录</el-dropdown-item>
					</el-dropdown-menu> -->
				</el-dropdown>
			</div>
		</div>
		<div class="main">
			<sidebar class="sidebar-container" />
			<div class="main-container">
				<div :class="{ 'fixed-header': fixedHeader }">
					<navbar />
				</div>
				<app-main />
			</div>
		</div>
	</div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
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
		AppMain
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
		height: calc(100vh - 70px);
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
