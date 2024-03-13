import Swiper from './Swiper.vue';
export default {
    component: Swiper,
    schema: {
        title: '轮播图',
        type: 'object',
        properties: {
            autoplay: {
                title: '自动切换',
                type: 'string',
                'ui:widget': 'SelectWidget',
                default: 'true',
                enum: ['true', 'false'],
                enumNames: ['是', '否']
            },
            loop: {
                title: '循环切换',
                type: 'string',
                'ui:widget': 'SelectWidget',
                description: '轮播切换到第一张或最后一张时，是否可以循环显示',
                default: 'true',
                enum: ['true', 'false'],
                enumNames: ['是', '否']
            },
            interval: {
                title: '自动切换间隔',
                type: 'string',
                description: '单位：毫秒，默认3000',
                default: '3000',
                'ui:options': {
                    placeholder: '请输入'
                }
            },
            imgList: {
                title: '图片项配置',
                type: 'array',
                items: {
                    type: 'object',
                    required: ['imgUrl'],
                    properties: {
                        imgUrl: {
                            title: '图片地址',
                            type: 'string',
                            'ui:options': {
                                placeholder: '请输入'
                            }
                        },
                        linkUrl: {
                            title: '跳转链接',
                            type: 'string',
                            'ui:options': {
                                placeholder: '请输入'
                            }
                        }
                    },
                    'ui:order': ['imgUrl', 'linkUrl']
                },
                uniqueItems: false,
                minItems: 1,
                maxItems: 100
            }
        },
        'ui:order': ['autoplay', 'loop', 'interval', 'imgList']
    },
    uiSchema: {},
    formFooter: {
        show: false,
        okBtn: '应用'
    },
    formProps: {
        labelPosition: 'right',
        labelWidth: '172px',
        labelSuffix: '：'
    }
};
