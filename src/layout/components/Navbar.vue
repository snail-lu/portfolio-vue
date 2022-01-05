<template>
	<div class="navbar">
		<hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

		<breadcrumb class="breadcrumb-container" />
		<!-- <div class="right-menu">
			{{ loginUser }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<el-button @click="logout">退出登录</el-button>
		</div> -->
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
// import {logout} from "@/api/system";

export default {
	data() {
		return {
			loginUser: ''
		}
	},
	components: {
		Breadcrumb,
		Hamburger
	},
	computed: {
		...mapGetters(['sidebar', 'avatar'])
	},
	methods: {
		toggleSideBar() {
			this.$store.dispatch('app/toggleSideBar')
		}
		// async logout() {
		//   const that = this
		//   this.$confirm("确定退出登录吗?", "提示", { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" })
		//         .then(() => {
		//           // this.$router.push({ path: "/" });
		//           that.logoutLogin();
		//         })
		//         .catch(() => {
		//           this.$message({ type: "info", message: "已取消退出" });
		//         });
		// },
		// logoutLogin() {
		//   logout().then(res=>{
		//     console.log(res)
		//     if(res.result.logoutUrl) {
		//         window.location.href = res.result.logoutUrl;
		//     }
		//   })
		// }
	},
	mounted() {
		// var storage = window.localStorage;displayName​
		// console.log(document.cookie)
		var arr = document.cookie.split('; ')
		// console.log(arr)
		arr.map(item => {
			// console.log(typeof(item),item.indexOf('displayName')>-1)
			if (item.indexOf('displayName') > -1) {
				//  console.log(item.split('=')[1])
				this.loginUser = item.split('=')[1]
				return true
			}
		})
		// console.log(Cookies.get(),Cookies.get('euid'),'获取cookie')
		// if(Cookies.get('displayName​')) {
		//   this.loginUser = Cookies.get('displayName​')
		// }
		//将JSON字符串转换成为JSON对象输出
		// var json = storage.getItem("userInfo");
		// var jsonObj = JSON.parse(json);
		// console.log("获取登录用户信息" + jsonObj.username);
		// this.loginUser = jsonObj.username;
	}
}
</script>

<style lang="scss" scoped>
.navbar {
	height: 50px;
	overflow: hidden;
	position: relative;
	background: #fff;
	box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
	.hamburger-container {
		line-height: 46px;
		height: 100%;
		float: left;
		cursor: pointer;
		transition: background 0.3s;
		-webkit-tap-highlight-color: transparent;

		&:hover {
			background: rgba(0, 0, 0, 0.025);
		}
	}

	.breadcrumb-container {
		float: left;
	}

	.right-menu {
		float: right;
		height: 100%;
		line-height: 50px;
		margin-right: 20px;

		&:focus {
			outline: none;
		}

		.right-menu-item {
			display: inline-block;
			padding: 0 8px;
			height: 100%;
			font-size: 18px;
			color: #5a5e66;
			vertical-align: text-bottom;

			&.hover-effect {
				cursor: pointer;
				transition: background 0.3s;

				&:hover {
					background: rgba(0, 0, 0, 0.025);
				}
			}
		}

		.avatar-container {
			margin-right: 30px;

			.avatar-wrapper {
				margin-top: 5px;
				position: relative;

				.user-avatar {
					cursor: pointer;
					width: 40px;
					height: 40px;
					border-radius: 10px;
				}

				.el-icon-caret-bottom {
					cursor: pointer;
					position: absolute;
					right: -20px;
					top: 25px;
					font-size: 12px;
				}
			}
		}
	}
}
</style>
