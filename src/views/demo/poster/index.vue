<template>
    <Demo :data="demoInfo">
        <canvas ref="posterCanvas"></canvas>
    </Demo>
</template>

<script setup>
import Demo from '@/components/Demo/index.vue';
import { onMounted, ref } from 'vue';
const demoInfo = {
    title: '商品海报',
    url: ''
};

const posterCanvas = ref(null);
onMounted(() => {
    const ctx = posterCanvas.value.getContext('2d');
    ctx.fillStyle = 'green';
    ctx.fillRect(10, 10, 150, 100);
});
</script>

<style lang="scss" scoped></style>
