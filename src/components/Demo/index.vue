<template>
    <div class="demo-wrapper">
        <div class="header flex-box flex-v-center">
            <div class="flex-item-1 title">{{ data.title }}</div>
            <el-tooltip class="item" effect="dark" content="查看文章" placement="top-start" v-if="data.url">
                <el-link class="article-link" :underline="false" :href="data.url">
                    <i-ep-view></i-ep-view>
                </el-link>
            </el-tooltip>
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        data: Object
    }
};
</script>

<style lang="scss" scoped>
.demo-wrapper {
    margin: 100px 25%;
    background-color: #fff;
    border-radius: 6px;
    padding: 20px;

    @media (max-width: 768px) {
        margin: 100px 20px;
    }

    .header {
        margin-bottom: 20px;
    }

    .title {
        text-align: center;
        font-size: 20px;
    }

    .article-link {
        font-size: 18px;
    }
}
</style>
