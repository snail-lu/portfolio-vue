import Image from './Image/index';
import Swiper from './Swiper/index';
import GoodsList from './GoodsList/index';

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
        name: '商品列表',
        icon: 'icon-goodslist2',
        componentName: 'GoodsList',
        componentPack: GoodsList
    }
];
