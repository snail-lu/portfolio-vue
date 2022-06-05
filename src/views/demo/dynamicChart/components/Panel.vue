<template>
    <div class="panel" :style="{ width, height }">
        <div class="panel-title" v-if="title">{{ title }}</div>
        <div class="panel-content" :class="{ 'panel-content-with-bg': showBgColor }">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '100%'
        },
        showBgColor: {
            type: Boolean,
            default: true
        }
    }
}
</script>

<style lang="scss" scoped>
.panel {
    &-title {
        color: #fff;
        font-size: 18px;
        font-weight: bold;
        // margin-bottom: 10px;
        height: 20px;
        line-height: 20px;
    }
    &-content {
        width: 100%;
        border-radius: 6px;
        padding: 20px;
        color: #fff;
        height: calc(100% - 20px);
        position: relative;
        box-sizing: border-box;
        overflow: hidden;

        &-with-bg {
            background: rgba(75, 139, 247, 0.05);
            box-shadow: inset 1px 1px 16px #7ccef4;
        }
    }
}
</style>
