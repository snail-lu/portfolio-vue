<template>
    <div class="test-container">
        <el-form :model="form" label-width="120px">
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
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><i-ep-plus /></el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="水印效果：">
                <el-image style="width: 150px; height: 150px" :src="form.transformedImgUrl" :preview-src-list="previewList" fit="contain" />
            </el-form-item>
        </el-form>
        <!-- <div class="markImg"></div> -->
    </div>
</template>

<script setup>
import { getCurrentInstance, reactive, ref } from 'vue';
import { getNowTime } from '@/utils/date';
import { imgUrlToFile } from '@/utils/file';

const instance = getCurrentInstance();

const form = reactive({
    text: getNowTime(),
    imgUrl: 'https://t7.baidu.com/it/u=2168645659,3174029352&fm=193&f=GIF',
    transformedImgUrl: '',
    type: 1
});

// 预览列表
const previewList = ref([]);

function onUploadFile(file, list) {
    console.log(file, 'upload file');
    // addWaterMarker(file);
}
const data = ref([]);

async function add() {
    if (form.imgUrl) {
        // 将url转换得到file文件
        const imgFile = await imgUrlToFile(form.imgUrl);
        // 将文件转换为可以展示的URL
        const imgUrl = URL.createObjectURL(imgFile);
        form.transformedImgUrl = imgUrl;
        previewList.value = [imgUrl];
    } else {
        instance.proxy.$message.error('请输入网络图片地址');
    }
}
/**
 * 添加水印
 */
async function addWaterMarker(file, el = '#markImg') {
    // 将文件blob转换成图片
    let img = await blobToImg(file);
    return new Promise(async (resolve, reject) => {
        try {
            // 创建canvas画布
            let canvas = document.createElement('canvas');
            //等比例调整canvas宽高，以缩小图片体积
            let imgRatio = img.naturalWidth / img.naturalHeight; //图片比例
            canvas.width = 750; //默认设置成750
            canvas.height = canvas.width / imgRatio;

            let ctx = canvas.getContext('2d');

            // 填充上传的图片
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // 生成水印图片
            const markWidth = document.querySelector(el).clientWidth;
            let zoom = (canvas.width * 0.3) / markWidth;
            let markEle = document.querySelector(el);
            // 先缩放水印html再转成图片
            markEle.style.transform = `scale(${zoom})`;
            const markImg = await htmlToCanvas(markEle);

            // 填充水印
            ctx.drawImage(
                markImg,
                canvas.width - markImg.width - 15 * zoom,
                canvas.height - markImg.height - 15 * zoom,
                markImg.width,
                markImg.height
            );

            // 将canvas转换成blob
            canvas.toBlob((blob) => resolve(blob));
        } catch (error) {
            reject(error);
        }
    });
}

/**
 * blob转img标签
 */
function blobToImg(blob) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.addEventListener('load', () => {
            let img = new Image();
            img.src = reader.result;
            img.addEventListener('load', () => resolve(img));
        });
        reader.readAsDataURL(blob);
    });
}

/**
 * html转成canvas，需要安装html2canvas.js插件
 */
function htmlToCanvas(el, backgroundColor = 'rgba(0,0,0,.1)') {
    return new Promise(async (resolve, reject) => {
        try {
            const markImg = await html2canvas(el, {
                allowTaint: false, //允许污染
                useCORS: true,
                backgroundColor //'transparent'  //背景色
            });
            resolve(markImg);
        } catch (error) {
            reject(error);
        }
    });
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

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>
