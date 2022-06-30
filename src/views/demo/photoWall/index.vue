<template>
    <div class="photo-wall-container">
        <div class="btn-groups flex-box flex-h-center">
            <el-upload action="#" multiple :auto-upload="false" :on-change="onUploadFile" :show-file-list="false">
                <i class="btn el-icon-picture-outline upload-btn" title="打开本地图片"></i>
            </el-upload>

            <div class="btn">
                <FullScreenButton />
            </div>
        </div>

        <div class="photo-list" v-if="fileList.length == 0">
            <photo
                :src="file.src"
                v-for="file in exampleList"
                :key="file.uid"
                :start-x="file.startX"
                :start-y="file.startY"
                :initial-width="file.initialWidth"
                :initial-height="file.initialHeight"
                @onDelete="onDelete(file.uid)"
            />
        </div>
        <div class="photo-list" v-else>
            <Photo :src="imgUrlFilter(file.raw)" v-for="file in fileList" :key="file.uid" @onDelete="onDelete(file.uid)" />
        </div>
    </div>
</template>

<script setup>
import Photo from './components/photo.vue';
import photo_1 from '../../../assets/images/photo-1.jpg';
import photo_2 from '../../../assets/images/photo-2.jpg';
import photo_3 from '../../../assets/images/photo-3.jpg';
import FullScreenButton from '@/components/FullScreenButton/index.vue';
import { reactive } from 'vue';

const fileList = reactive([]);
const exampleList = reactive([
    {
        uid: 1,
        src: photo_1,
        initialWidth: 577,
        initialHeight: 346,
        startX: 430,
        startY: 330
    },
    {
        uid: 2,
        src: photo_2,
        initialWidth: 426,
        initialHeight: 258,
        startX: 830,
        startY: 56
    },
    {
        uid: 3,
        src: photo_3,
        initialWidth: 486,
        initialHeight: 290,
        startX: 147,
        startY: 38
    }
]);

function onUploadFile(file, list) {
    this.fileList = list;
}
// 删除
function onDelete(uid) {
    let fileIndex = -1;
    if (this.fileList.length > 0) {
        fileIndex = this.fileList.findIndex((item) => item.uid === uid);
        this.fileList.splice(fileIndex, 1);
    } else {
        fileIndex = this.exampleList.findIndex((item) => item.uid === uid);
        this.exampleList.splice(fileIndex, 1);
    }
}

function imgUrlFilter(val) {
    return URL.createObjectURL(val);
}
</script>

<style lang="scss" scoped>
.photo-wall-container {
    height: 100vh;
    width: 100%;
    position: relative;

    .btn-groups {
        position: absolute;
        top: 20px;
        right: 30px;
        padding: 10px;
        background-color: rgba(255, 255, 255, 0.5);
        width: 100px;
        border-radius: 6px;
        z-index: 10;

        .btn {
            font-size: 20px;
            color: #333;
            cursor: pointer;
        }

        .upload-btn {
            margin-right: 20px;
        }
    }

    .photo-list {
        position: relative;
        height: 100%;
    }
}
</style>
