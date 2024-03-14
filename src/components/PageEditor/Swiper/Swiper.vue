<template>
    <el-carousel height="150px">
        <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="small justify-center" text="2xl">{{ item }}</h3>
        </el-carousel-item>
    </el-carousel>
</template>

<script setup>
const props = defineProps({
    config: Object
});
</script>

<style lang="scss" scoped>
.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
    background-color: #39a11f;
}
</style>
