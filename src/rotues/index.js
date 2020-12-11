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
            }
        ]
        
    }
]