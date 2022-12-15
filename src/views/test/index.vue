<template>
    <div>
        <div class="markImg"></div>

        <el-upload action="#" multiple :auto-upload="false" :on-change="onUploadFile" :show-file-list="false">
            <i-ep-picture class="btn el-icon-picture-outline upload-btn" title="打开本地图片"></i-ep-picture>
        </el-upload>
    </div>
</template>

<script setup>
import { getCurrentInstance, ref } from 'vue';

function onUploadFile(file, list) {
    addWaterMarker(file);
}
const data = ref([]);
const instance = getCurrentInstance();
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
.masonry {
    display: flex;
    justify-content: center;
}
</style>
