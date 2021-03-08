import Home from '../views/home/home';
import Example from '../views/example/index';
export default [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/example',
        component: Example,
        name: '',
        children: [
            {
                path: 'tree',
                component: () => import('../views/example/tree/tree.vue'),
                name: '',
                meta: {
                    title: ''
                }
            },
            {
                path: 'table',
                component: () => import('../views/example/table/table.vue'),
                name: '',
                meta: {
                    title: ''
                }
            },
            {
                path: 'tabletransfer',
                component: () => import('../views/example/tabletransfer/tabletransfer.vue'),
                name: '',
                meta: {
                    title: ''
                }
            }
        ]
    },
    {
        path: '/resume',
        component: () => import('../views/Resume/resume.vue')
    },
    {
        path: '/resume/image',
        component: ()=>import('../views/Resume/images/images.vue')
    }
]