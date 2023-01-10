<template>
    <demo :data="demoInfo">
        <el-form :model="form">
            <el-form-item label="水印内容：">
                <el-input v-model="form.text" />
            </el-form-item>
            <el-form-item label="图片类型：">
                <el-radio-group v-model="form.type">
                    <el-radio :label="1">网络图片</el-radio>
                    <el-radio :label="2">本地图片</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="图片地址：" v-if="form.type == 1">
                <el-input v-model="form.imgUrl">
                    <template #append>
                        <el-button @click="add">添加水印</el-button>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="本地图片：" v-if="form.type == 2">
                <el-upload class="avatar-uploader" action="#" :auto-upload="false" :on-change="onUploadFile" :show-file-list="false">
                    <el-image v-if="imageUrl" :src="imageUrl" class="avatar" fit="contain" />
                    <el-icon v-else class="avatar-uploader-icon"><i-ep-plus /></el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="水印效果：">
                <el-image style="width: 150px; height: 150px" :src="form.transformedImgUrl" :preview-src-list="previewList" fit="contain" />
            </el-form-item>
        </el-form>
        <!-- <div class="markImg"></div> -->
    </demo>
</template>

<script setup>
import { getCurrentInstance, reactive, ref, watch } from 'vue';
import { getNowTime } from '@/utils/date';
import { imgUrlToFile, fileOrBlobToImg, imgToDataURL, dataURLToFile } from '@/utils/file';
import Demo from '@/components/Demo/index.vue';
const demoInfo = {
    title: '图片水印',
    url: ''
};
const instance = getCurrentInstance();

const form = reactive({
    text: getNowTime(),
    imgUrl: 'https://t7.baidu.com/it/u=2168645659,3174029352&fm=193&f=GIF',
    transformedImgUrl: '',
    type: 1
});

watch(
    () => form.type,
    () => {
        form.transformedImgUrl = '';
    }
);

// 预览列表
const previewList = ref([]);

const imageUrl = ref('');
// 本地图片上传时添加水印
async function onUploadFile(file) {
    console.log(file, 'upload file');
    imageUrl.value = URL.createObjectURL(file.raw);
    // 上传的文件转换为img标签
    let image = await fileOrBlobToImg(file.raw);
    const dataUrl = imgToDataURL(image, form.text);
    const imgFile = dataURLToFile(dataUrl, 'a');
    const imgUrl = URL.createObjectURL(imgFile);
    form.transformedImgUrl = imgUrl;
    previewList.value = [imgUrl];
}

// 网络图片添加水印
async function add() {
    if (form.imgUrl) {
        // 将url图片添加水印后再输出为file文件
        const imgFile = await imgUrlToFile(form.imgUrl, form.text);
        // 将文件转换为可以展示的URL
        const imgUrl = URL.createObjectURL(imgFile);
        form.transformedImgUrl = imgUrl;
        previewList.value = [imgUrl];
    } else {
        instance.proxy.$message.error('请输入网络图片地址');
    }
}
</script>

<style lang="scss" scoped>
.test-container {
    background-color: #fff;
    width: 50%;
    // height: 100vh;
    padding: 40px;
    margin: 40px auto 0;
}

:deep(.el-upload) {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);

    &:hover {
        border-color: var(--el-color-primary);
    }
}

.el-icon.avatar-uploader-icon,
.avatar {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>
