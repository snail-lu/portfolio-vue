<template>
    <div class="panel-box">
        <div class="title">{{ title }}</div>
        <div class="content">
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
.panel-box {
    .title {
        color: #fff;
        font-size: 14px;
    }
    .content {
        width: 200px;
        height: 200px;
        color: #5f8bb5;
        background-color: rgba(95, 139, 181, 0.5);
    }
}
</style>
