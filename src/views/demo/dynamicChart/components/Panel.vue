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
        background-color: rgba(95, 139, 181, 0.5);
        border-radius: 6px;
        padding: 20px;
        color: #fff;
    }
}
</style>
