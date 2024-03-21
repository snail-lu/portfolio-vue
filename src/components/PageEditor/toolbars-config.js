import Image from './Image/index';
import Swiper from './Swiper/index';
import GoodsList from './GoodsList/index';
// 配置数据格式
// {
//     title: '图片', // 组件库中显示的名称
//     icon: 'icon-image', // 组件库中显示的图标，来自iconfont
//     componentName: 'Image', // 组件名称，提交的页面数据中包含此名称，其他端根据此名称来渲染对应的组件
//     componentPack: Image // 组件数据，包含组件对象及其表单schema
// },

// 组件库配置数据
export default [
    {
        title: '图片',
        icon: 'icon-image',
        componentName: 'Image',
        componentPack: Image
    },
    {
        title: '轮播图',
        icon: 'icon-swiper',
        componentName: 'Swiper',
        componentPack: Swiper
    },
    {
        title: '商品列表',
        icon: 'icon-goodslist2',
        componentName: 'GoodsList',
        componentPack: GoodsList
    }
];
