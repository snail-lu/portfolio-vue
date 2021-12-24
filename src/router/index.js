import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
export const constantRoutes = [
	// 主页面
	{
		path: '/',
		component: Layout,
		redirect: '/home',
		children: [
			{
				path: 'home',
				name: 'home',
				component: () => import('@/views/home/home.vue'),
				meta: {
					title: '首页',
					icon: 'el-icon-s-home'
				}
			}
		]
	},

	// 公用DEMO
	{
		path: '/example',
		component: Layout,
		meta: {
			title: '后台管理常用实现',
			icon: 'el-icon-menu'
		},
		children: [
			{
				path: 'tree',
				component: () => import('../views/example/tree/tree.vue'),
				name: '',
				meta: {
					title: '节点树展开/收缩'
				}
			},
			{
				path: 'table',
				component: () => import('../views/example/table/table.vue'),
				name: '',
				meta: {
					title: '表格自定义排序'
				}
			},
			{
				path: 'table-select',
				component: () => import('../views/example/tableSelect/index.vue'),
				name: '',
				meta: {
					title: '表格分页多选'
				}
			},
			{
				path: 'tabletransfer',
				component: () => import('../views/example/tabletransfer/tabletransfer.vue'),
				name: '',
				meta: {
					title: '表格穿梭'
				}
			}
		]
	},
	{
		path: '/resume',
		component: Layout,
		meta: {
			title: '简历',
			icon: 'el-icon-menu'
		},
		children: [
			{
				path: 'index',
				component: () => import('../views/Resume/resume.vue'),
				meta: {
					title: '我的简历'
				}
			},
			{
				path: 'image',
				component: () => import('../views/Resume/images/images.vue'),
				meta: {
					title: '作品图'
				}
			}
		]
	},
	{
		path: '/404',
		component: () => import('@/views/common/404.vue'),
		hidden: true
	},
	// 404 page must be placed at the end !!!
	{
		path: '*',
		redirect: '/404',
		hidden: true
	}
]

const createRouter = () =>
	new Router({
		mode: 'hash', // require service support
		scrollBehavior: () => ({
			y: 0
		}),
		routes: constantRoutes
	})

const router = createRouter()

export function resetRouter() {
	const newRouter = createRouter()
	router.matcher = newRouter.matcher // reset router
}

export default router
