import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../components/layout'
import demoRoutes from './demo'

Vue.use(Router)

/* Layout */
export const routes = [
    // 主页面
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/home/home.vue'),
                meta: {
                    title: '首页',
                    icon: 'el-icon-s-home'
                }
            },
            {
                path: '/projects',
                component: {
                    render: (h) => h('router-view')
                },
                children: [
                    {
                        path: '',
                        component: () => import('@/views/projects/index')
                    }
                ]
            },
            {
                path: 'about',
                component: {
                    render: (h) => h('router-view')
                },
                children: [
                    {
                        path: '',
                        component: () => import('../views/about/index.vue')
                    },
                    {
                        path: 'resume',
                        component: () => import('../views/about/resume/resume.vue'),
                        meta: {
                            title: '我的简历'
                        }
                    },
                    {
                        path: 'image',
                        component: () => import('../views/about/resume/images/images.vue'),
                        meta: {
                            title: '作品图'
                        }
                    }
                ]
            }
        ]
    },
    {
        path: '*',
        redirect: '/404',
        hidden: true
    },
    // 404 page must be placed at the end !!!
    {
        path: '/404',
        component: () => import('@/views/common/404.vue'),
        hidden: true
    }
]

// 合并demo路由
routes[0].children.push(demoRoutes)

const createRouter = () =>
    new Router({
        mode: 'hash',
        base: '/portfolio-vue',
        scrollBehavior: () => ({
            y: 0
        }),
        routes
    })

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
