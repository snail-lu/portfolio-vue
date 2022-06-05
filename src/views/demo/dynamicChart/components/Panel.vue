<template>
    <div class="panel">
        <div class="panel-title">{{ title }}</div>
        <div class="panel-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: ''
    }
}
</script>

<style lang="scss" scoped>
.panel {
    width: 100%;
    margin-bottom: 50px;
    &-title {
        color: #fff;
        font-size: 22px;
        font-weight: bold;
        margin-bottom: 10px;
    }
    &-content {
        width: 100%;
        border-radius: 6px;
        padding: 20px;
        color: #fff;
        width: 100%;
        height: 100%;
        position: relative;
        box-sizing: border-box;
        background: rgba(75, 139, 247, 0.05);
        box-shadow: inset 1px 1px 16px #7ccef4;
    }
}
</style>
