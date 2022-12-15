import demoRoutes from './demo';
import { h, resolveComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

/* Layout */
const routes = [
    // 首页
    {
        path: '/',
        component: () => import('@/components/Layout/index.vue'),
        children: [
            {
                path: '',
                component: () => import('@/views/home/home.vue'),
                meta: {
                    title: '首页'
                }
            }
        ]
    },
    // 项目
    {
        path: '/projects',
        component: () => import('@/components/Layout/index.vue'),
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
    // 关于
    {
        path: '/about',
        component: () => import('@/components/Layout/index.vue'),
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
    },
    {
        path: '/test',
        component: () => import('../views/test/index.vue'),
        meta: {
            title: '测试页面'
        }
    },
    {
        path: '/anniversary/8th',
        component: () => import('../views/anniversary/index.vue'),
        meta: {
            title: '8周年快乐',
            showTitleOnly: true
        }
    },
    {
        path: '/demo/dynamic-chart',
        component: () => import('../views/demo/dynamicChart/index.vue'),
        meta: {
            title: '可视化图表'
        }
    },
    {
        path: '/demo/photo-wall',
        component: () => import('../views/demo/photoWall/index.vue'),
        name: '',
        meta: {
            title: '照片墙'
        }
    },
    {
        path: '/demo/sea',
        component: () => import('../views/demo/threeJs/sea/index.vue'),
        name: '',
        meta: {
            title: 'three.js实践之海面'
        }
    },
    {
        path: '/demo/train',
        component: () => import('../views/demo/threeJs/train/index.vue'),
        meta: {
            title: 'three.js实践之火车'
        }
    },
    {
        path: '/demo/earth',
        component: () => import('../views/demo/threeJs/earthMoon/index.vue'),
        name: '',
        meta: {
            title: 'three.js实践之地月模型'
        }
    },
    {
        path: '/demo/code-editor',
        component: () => import('../views/demo/codeEditor/index.vue'),
        meta: {
            title: '代码编辑器'
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
routes.push(demoRoutes);

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
    history: createWebHistory('/portfolio/'),
    routes
});

export default router;

// export default createRouter();
