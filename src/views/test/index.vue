<template>
    <div class="masonry">
        <Waterfall :data="data" :gaps="['10px', '10px']" />
    </div>
</template>

<script setup>
import Waterfall from '@/components/Waterfall/index.vue';
import { getCurrentInstance, ref } from 'vue';

const data = ref([]);
const instance = getCurrentInstance();
async function initData() {
    let res = await instance.proxy.req({
        url: '/masonry/list'
    });
    if (res.result && res.result.list) {
        data.value = res.result.list;
    }
}

initData();
</script>

<style lang="scss" scoped>
.masonry {
    display: flex;
    justify-content: center;
}
</style>
