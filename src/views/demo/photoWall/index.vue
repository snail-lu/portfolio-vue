<template>
    <div @click="handleFullScreen">照片墙</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['isScreenFull'])
    },
    methods: {
        ...mapActions('settings', ['changeSetting']),
        // 全屏事件
        handleFullScreen() {
            let element = document.documentElement
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen()
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen()
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen()
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen()
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen()
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen()
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen()
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen()
                }
            }
            this.changeSetting({ key: 'isScreenFull', value: !this.isScreenFull })
        }
    }
}
</script>

<style lang="scss" scoped></style>
