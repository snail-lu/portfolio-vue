<template>
    <i-ep-full-screen :title="isScreenFull ? '退出全屏' : '全屏'" @click="handleFullScreen"></i-ep-full-screen>
</template>

<script>
import fullScreenMixins from '@/mixins/fullScreenMixins';
export default {
    name: 'FullScreenButton',
    mixins: [fullScreenMixins],
    mounted() {
        // this.handleFullScreen();
    }
};
</script>

<style lang="scss" scoped>
.fullscreen-btn {
    cursor: pointer;
}
</style>
