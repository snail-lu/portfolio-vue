import Image from './Image.vue';
export default {
    view: Image,
    // 组件对应的动态表单json schema
    schema: {
        title: '图片配置',
        description: 'A simple form example.',
        type: 'object',
        required: ['imgUrl', 'width'],
        'ui:order': ['imgUrl', 'width', 'height'],
        properties: {
            imgUrl: {
                title: '图片地址',
                type: 'string',
                default: 'https://img11.360buyimg.com/imagetools/jfs/t1/98857/10/46727/701459/65eac152Fd89326e4/62da04c320575dcb.gif',
                'ui:options': {
                    placeholder: '请输入图片地址'
                }
            },
            width: {
                title: '宽度',
                type: 'string',
                default: '100%',
                'ui:options': {
                    placeholder: '请输入图片宽度'
                }
            },
            height: {
                title: '高度',
                type: 'string',
                default: 'auto',
                'ui:options': {
                    placeholder: '请输入'
                }
            }
        }
    },
    uiSchema: {
        'ui:description': '配置图片参数，图片初始宽度750px，高度750px，可修改'
    },
    formFooter: {
        show: false,
        okBtn: '应用'
    },
    formProps: {
        labelPosition: 'right',
        labelWidth: '100px',
        labelSuffix: '：'
    }
};