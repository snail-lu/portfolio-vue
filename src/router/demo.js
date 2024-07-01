// demo配置数据备份
export default {
    path: '/demo',
    component: () => import('@/components/Layout/index.vue'),
    children: [
        {
            path: '',
            component: () => import('@/views/demo/index.vue'),
            meta: {
                title: 'DEMO实验室'
            }
        },
        {
            path: 'tree-expand',
            component: () => import('@/views/demo/tree/tree.vue'),
            name: '',
            meta: {
                title: '节点树展开/收缩'
            }
        },
        {
            path: 'table-sort',
            component: () => import('@/views/demo/tableSort/index.vue'),
            name: '',
            meta: {
                title: '表格自定义排序'
            }
        },
        {
            path: 'table-select',
            component: () => import('@/views/demo/tableSelect/index.vue'),
            name: '',
            meta: {
                title: '表格分页多选'
            }
        },
        {
            path: 'table-transfer',
            component: () => import('@/views/demo/tabletransfer/index.vue'),
            name: '',
            meta: {
                title: '表格穿梭'
            }
        },
        {
            path: 'phone-model',
            component: () => import('@/views/demo/phoneModel/index.vue'),
            name: '',
            meta: {
                title: '手机模型',
                hidden: true
            }
        },
        {
            path: 'hotspot',
            component: () => import('@/views/demo/hotspot/index.vue'),
            name: '',
            meta: {
                title: '图片上绘制热区'
            }
        },
        {
            path: 'large-file-upload',
            component: () => import('@/views/demo/largeFileUpload/index.vue'),
            name: '',
            meta: {
                title: '常用大文件上传组件使用实践'
            }
        },
        {
            path: 'lazy-load',
            component: () => import('@/views/demo/lazyLoad/index.vue'),
            name: '',
            meta: {
                title: '图片懒加载'
            }
        },
        {
            path: 'masonry',
            component: () => import('@/views/demo/masonry/index.vue'),
            name: '',
            meta: {
                title: '瀑布流'
            }
        },
        {
            path: 'css-demos',
            component: () => import('@/views/demo/cssDemos/index.vue'),
            meta: {
                title: 'CSS DEMO'
            }
        },
        {
            path: 'promotion-calendar',
            component: () => import('@/views/demo/promotionCalendar/index.vue'),
            meta: {
                title: '促销日历'
            }
        },
        {
            path: 'el-upload',
            component: () => import('@/views/demo/elUpload/index.vue'),
            meta: {
                title: 'el-upload文件上传用例'
            }
        },
        {
            path: 'dynamic-form',
            component: () => import('@/views/demo/dynamicForm/index.vue'),
            meta: {
                title: '基于json数据动态生成表单'
            }
        },
        {
            path: 'watermarker',
            component: () => import('@/views/demo/watermarker/index.vue'),
            meta: {
                title: '图片水印'
            }
        },
        {
            path: 'music-player',
            component: () => import('@/views/demo/musicPlayer/index.vue'),
            meta: {
                title: '音乐播放器'
            }
        },
        {
            path: 'poster',
            component: () => import('@/views/demo/poster/index.vue'),
            meta: {
                title: '商品海报'
            }
        }
    ]
};
