export default {
    path: '/demo',
    component: {
        render: (h) => h('router-view')
    },
    children: [
        {
            path: '',
            component: () => import('../views/demo/index'),
            meta: {
                title: 'DEMO实验室'
            }
        },
        {
            path: 'tree-expand',
            component: () => import('../views/demo/tree/tree.vue'),
            name: '',
            meta: {
                title: '节点树展开/收缩'
            }
        },
        {
            path: 'table-sort',
            component: () => import('../views/demo/tableSort/index.vue'),
            name: '',
            meta: {
                title: '表格自定义排序'
            }
        },
        {
            path: 'table-select',
            component: () => import('../views/demo/tableSelect/index.vue'),
            name: '',
            meta: {
                title: '表格分页多选'
            }
        },
        {
            path: 'table-transfer',
            component: () => import('../views/demo/tabletransfer/index.vue'),
            name: '',
            meta: {
                title: '表格穿梭'
            }
        },
        {
            path: 'phone-model',
            component: () => import('../views/demo/phoneModel/index.vue'),
            name: '',
            meta: {
                title: '手机模型',
                hidden: true
            }
        },
        {
            path: 'hotspot',
            component: () => import('../views/demo/hotspot/index.vue'),
            name: '',
            meta: {
                title: '图片上绘制热区'
            }
        },
        {
            path: 'large-file-upload',
            component: () => import('../views/demo/largeFileUpload/index.vue'),
            name: '',
            meta: {
                title: '常用大文件上传组件使用实践'
            }
        },
        {
            path: 'three-js',
            component: () => import('../views/demo/threeJs/index.vue'),
            name: '',
            meta: {
                title: 'three.js实践'
            }
        },
        {
            path: 'lazy-load',
            component: () => import('../views/demo/lazyLoad/index.vue'),
            name: '',
            meta: {
                title: '图片懒加载'
            }
        },
        {
            path: 'masonry',
            component: () => import('../views/demo/masonry/index.vue'),
            name: '',
            meta: {
                title: '瀑布流'
            }
        },
        {
            path: 'photo-wall',
            component: () => import('../views/demo/photoWall/index.vue'),
            name: '',
            meta: {
                title: '照片墙'
            }
        },
        {
            path: 'dynamic-chart',
            component: () => import('../views/demo/dynamicChart/index.vue'),
            meta: {
                title: '动态图表'
            }
        }
    ]
}
