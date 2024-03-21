<template>
    <el-carousel :height="config.height" :autoplay="config.autoplay" :loop="config.loop" :interval="config.interval">
        <el-carousel-item v-for="(item, index) in config.imgList" :key="index">
            <img :src="item.imgUrl" :style="{height: config.height}"/>
        </el-carousel-item>
    </el-carousel>
</template>

<script setup>
const props = defineProps({
    config: Object
});

console.log(props.config, 'swiper setup')
</script>

<style lang="scss" scoped></style>
