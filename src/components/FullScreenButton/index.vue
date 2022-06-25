<template>
    <i class="fullscreen-btn el-icon-full-screen" :title="isScreenFull ? '退出全屏' : '全屏'" @click="handleFullScreen"></i>
</template>

<script>
import fullScreenMixins from '@/mixins/fullScreenMixins';
export default {
    name: 'FullScreenButton',
    mixins: [fullScreenMixins],
    mounted() {
        this.handleFullScreen();
    }
};
</script>

<style lang="scss" scoped>
.fullscreen-btn {
    cursor: pointer;
}
</style>
