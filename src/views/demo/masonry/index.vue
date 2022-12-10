<template>
    <demo :data="demoInfo">
        <div class="masonry flex-box flex-h-center">
            <Waterfall :data="data" :gaps="['10px', '10px']" />
        </div>
    </demo>
</template>

<script setup>
import Waterfall from '@/components/Waterfall/index.vue';
import { getCurrentInstance, ref } from 'vue';

const demoInfo = ref({
    title: '瀑布流',
    url: ''
});

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
    background-color: #f5f5f5;
    padding: 30px 0;
}
</style>
