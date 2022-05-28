<template>
    <div class="photo-wall-container">
        <div>
            <el-upload class="upload-demo" drag action="#" multiple :auto-upload="false" :on-change="onUploadFile">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </div>
        <!-- <photo /> -->
        <div>
            <img :src="file.raw" v-for="file in fileList" :key="file.uid" />
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
    position: relative;
    height: 1000px;
    width: 100%;
}
</style>
