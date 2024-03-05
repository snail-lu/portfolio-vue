<template>
    <div class="block-title">常用组件</div>
    <draggable class="list-group" :list="toolsList" :group="{ name: 'componentsGroup', pull: 'clone', put: false }" @change="log" item-key="name">
        <template #item="{ element }">
            <div class="list-group-item">
                <div :class="`icon iconfont ${element.icon}`"></div>
                <div class="name">{{ element.name }}</div>
            </div>
        </template>
    </draggable>
</template>

<script setup>
import draggable from 'vuedraggable';

const toolsList = ref([
    {
        name: '图片',
        icon: 'icon-image',
        component: 'Image'
    },
    {
        name: '轮播图',
        icon: 'icon-swiper',
        component: 'Swiper'
    },
    {
        name: '商品列表',
        icon: 'icon-goodslist2',
        component: 'GoodsList'
    }
]);
</script>

<style lang="scss" scoped>
.block-title {
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    padding: 0 10px;
    background-color: #f5f5f5;
    text-align: center;
    border-right: 1px dashed #ccc;
}
.list-group {
    height: calc(100vh - 50px);
    padding: 0 40px;
    border-right: 1px dashed #ccc;
    &-item {
        display: inline-block;
        text-align: center;
        width: 50%;
        padding: 10px 0;
        margin-bottom: 40px;
        &:hover {
            background-color: #f5f5f5;
            cursor: move;
        }
    }

    .icon {
        font-size: 30px;
        margin-bottom: 10px;
    }

    .name {
        font-size: 14px;
    }
}
</style>
