<template>
    <div class="photo-wall-container">
        <div>
            <el-upload class="upload-demo" action="#" multiple :auto-upload="false" :on-change="onUploadFile">
                本地图片
            </el-upload>
            <button @click="handleFullScreen">全屏</button>
        </div>

        <div class="photo-list">
            <photo :src="file.raw | imgUrlFilter" v-for="file in fileList" :key="file.uid" />
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import Photo from './components/photo'
export default {
    components: {
        Photo
    },
    filters: {
        imgUrlFilter(val) {
            return URL.createObjectURL(val)
        }
    },
    data() {
        return {
            fileList: []
        }
    },
    destroyed() {
        window.removeEventListener('fullscreenchange', this.fullscreenchangeHandler)
    },
    methods: {
        ...mapActions('settings', ['changeSetting']),
        onUploadFile(file, list) {
            const { fileList } = this
            this.fileList = [...fileList, ...list]
        },
        // 全屏事件
        handleFullScreen() {
            let element = document.documentElement
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
            window.addEventListener('fullscreenchange', this.fullscreenchangeHandler)
            this.changeSetting({ key: 'isScreenFull', value: true })
        },
        // 退出全屏事件监听
        fullscreenchangeHandler() {
            const isFull = document.fullscreenElement
            if (!isFull) {
                this.changeSetting({ key: 'isScreenFull', value: false })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.photo-wall-container {
    height: 1000px;
    width: 100%;

    .photo-list {
        position: relative;
        height: 1000px;
    }
}
</style>
