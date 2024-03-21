import GoodsList from './GoodsList.vue';
export default {
    component: GoodsList,
    schema: {
        title: '商品列表',
        description: 'A simple form example.',
        type: 'object',
        required: ['firstName', 'lastName'],
        'ui:order': ['lastName', 'firstName', '*', 'password'],
        properties: {
            firstName: {
                type: 'string',
                title: 'First name',
                default: 'Jun'
            },
            lastName: {
                type: 'string',
                title: 'Last name',
                'ui:options': {
                    description: '请输入你的姓'
                },
                'err:required': '必须输入Last Name'
            },
            price: {
                type: 'string',
                description: '最多输入两位小数点，最大值 999999.99',
                title: '价格',
                format: 'price'
            },
            age: {
                type: 'integer',
                title: 'Age',
                maximum: 80,
                minimum: 16
            },
            bio: {
                type: 'string',
                title: 'Bio',
                minLength: 10
            },
            password: {
                type: 'string',
                title: 'Password',
                minLength: 3
            },
            telephone: {
                type: 'string',
                title: 'Telephone',
                minLength: 10
            }
        }
    },
    uiSchema: {
        'ui:description': '简单表单例子（这里通过UiSchema覆盖了默认description描述配置）',
        firstName: {
            'ui:title': '名字',
            'ui:description': '比如：李白姓李、孙尚香姓孙、马可波罗姓马可波',
            'ui:emptyValue': '',
            'ui:options': {
                placeholder: '请输入你的姓',
                attrs: {
                    autofocus: true
                }
            }
        },
        bio: {
            'ui:options': {
                placeholder: '请输入你的签名',
                type: 'textarea',
                rows: 6
            }
        }
    }
};
