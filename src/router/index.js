import demoRoutes from './demo';
import { h, resolveComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

/* Layout */
const routes = [
    // 主页面
    {
        path: '/',
        component: () => import('@/components/layout/index.vue'),
        redirect: '/home',
        children: [
            {
                path: '/home',
                component: () => import('@/views/home/home.vue'),
                meta: {
                    title: '首页'
                }
            },
            {
                path: '/projects',
                component: {
                    render: () => h(resolveComponent('router-view'))
                },
                children: [
                    {
                        path: '',
                        component: () => import('@/views/projects/index.vue'),
                        meta: {
                            title: '项目'
                        }
                    }
                ]
            },
            {
                path: '/about',
                component: {
                    render: () => h(resolveComponent('router-view'))
                },
                children: [
                    {
                        path: '',
                        component: () => import('../views/about/index.vue'),
                        meta: {
                            title: '关于'
                        }
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
        path: '/test',
        component: () => import('../views/test/index.vue'),
        meta: {
            title: '测试页面'
        }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        hidden: true
    },
    // 404 page must be placed at the end !!!
    {
        path: '/404',
        component: () => import('@/views/common/404.vue'),
        hidden: true
    }
];

// 合并demo路由
routes[0].children.push(demoRoutes);

// 停用浏览器自动恢复滚动位置的默认行为，改为手动触发
// if ('scrollRestoration' in history) {
//     // console.log(history, 'history')
//     // history.scrollRestoration = 'manual'
// }

// const createRouter = () =>
//     new Router({
//         mode: 'history',
//         scrollBehavior: (to, from, savedPosition) => {
//             // console.log(savedPosition, 'savedPostion');
//             // if (savedPosition) {
//             //     return savedPosition;
//             // } else {
//             //     return { y: 0 };
//             // }
//             return new Promise((resolve, reject) => {
//                 setTimeout(() => {
//                     resolve(savedPosition ? savedPosition : { x: 0, y: 0 });
//                 }, 300);
//             });
//         },
//         routes
//     });

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;

// export default createRouter();
