<template>
    <div class="poster-container">
        <el-radio-group v-model="type" class="type-btn">
            <el-radio-button label="HTML" />
            <el-radio-button label="Canvas" />
        </el-radio-group>
        <!-- html方式绘制海报 -->
        <div class="demo-box" v-if="type === 'HTML'">
            <div class="poster-html" ref="posterHtml">
                <div class="share-info">
                    <div class="logo-wrapper">
                        <img src="../../../assets/icons/logo.png" alt="" class="logo" />
                    </div>
                    <div>导购9527</div>
                </div>
                <img class="poster-img" :src="goods.goodsImg" alt="" @load="onImgLoad" />
                <div class="goods-info">
                    <div class="title">{{ goods.goodsName }}</div>
                    <div class="price">
                        <span class="new"><span>¥</span> {{ goods.goodsSalePrice }}</span>
                        <span class="old">¥ {{ goods.goodsPrice }}</span>
                    </div>
                </div>
                <div class="poster-info">
                    <vue-qr class="qr-img" :text="goods.url" :callback="onQrCallback"></vue-qr>
                    <div class="tips">扫码立即购买</div>
                </div>
            </div>
        </div>

        <!-- canvas方式绘制海报 -->
        <div class="demo-box" v-else>
            <canvas ref="posterCanvas" width="340" height="570"></canvas>
        </div>

        <div class="download-btn" @click="onDownload">下载海报</div>
    </div>
</template>

<script setup>
import vueQr from 'vue-qr/src/packages/vue-qr.vue';
import { ref } from 'vue';
import { toPng } from 'html-to-image';

// 商品信息
const goods = {
    url: 'https://snaillu.gitee.io/portfolio/demo/poster',
    goodsName: '西服套装男西装整套修身商务正装 黑色',
    goodsImg: 'https://m.360buyimg.com/mobilecms/s1265x1265_jfs/t1/20988/35/20240/36277/637e5127Ee10e66b3/03b212c37d98de5f.jpg',
    goodsCode: '123456',
    goodsPrice: 5431,
    goodsSalePrice: 1233
};

const type = ref('HTML');
const posterHtml = ref(null);
const posterUrl = ref('');
const onImgLoad = () => {
    // 此种方式，元素的margin也会被截进去，所以posterRef元素尽量不要设置margin
    toPng(posterHtml.value).then((dataUrl) => {
        posterUrl.value = dataUrl;
    });
};
// 二维码图片
const qrUrl = ref('');
const onQrCallback = (dataUrl, id) => {
    qrUrl.value = dataUrl;
};

// canvas绘制海报
watch(
    type,
    (newType) => {
        if (newType === 'Canvas') {
            setTimeout(() => {
                draw();
            }, 300);
        }
    },
    {
        immediate: true
    }
);
const posterCanvas = ref(null);
const draw = () => {
    const ctx = posterCanvas.value.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, 340, 570);
    const logoImg = new Image();
    logoImg.onload = function () {
        ctx.drawImage(logoImg, 20, 20, 50, 50);
    };
    logoImg.src = '/portfolio/src/assets/icons/logo.png';
    ctx.fillStyle = '#000';
    ctx.font = '16px 微软雅黑';
    ctx.fillText('导购9527', 90, 50);
    const goodImg = new Image();
    goodImg.crossOrigin = 'Anonymous'; // 跨域图片需配置此项，不然canvas.toDataURL会报错
    goodImg.onload = function () {
        ctx.drawImage(goodImg, 20, 80, 300, 300);
    };
    goodImg.src = goods.goodsImg;
    drawText(goods.goodsName, 20, 390, 200, 15, 1.15, ctx);
    ctx.fillStyle = '#C21E1F';
    ctx.font = '20px 微软雅黑';
    ctx.textBaseline = 'top';
    ctx.fillText(`¥${goods.goodsSalePrice}`, 250, 400);
    ctx.fillStyle = '#BBBBBB';
    ctx.font = '12px 微软雅黑';
    ctx.fillText(`¥${goods.goodsPrice}`, 260, 420);
    const textWidth = ctx.measureText(`¥${goods.goodsPrice}`).width;
    ctx.moveTo(260, 425);
    ctx.lineTo(260 + textWidth, 425);
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#bbb';
    ctx.stroke();

    const qrImg = new Image();
    qrImg.onload = function () {
        ctx.drawImage(qrImg, 121, 430, 98, 98);
    };
    qrImg.src = qrUrl.value;
    ctx.fillStyle = '#000';
    ctx.fillText('扫码立即购买', 134, 530);
};

/**
 * text         文本
 * x,y          轴
 * width        行宽
 * fontSize     字体大小
 * rowHeight    行高，如果字体16px，1.5倍行距应该是24px
 * ctx          画板内容对象
 */
function drawText(text, x, y, width, fs, rowHeight, ctx) {
    // 1 将字符串转换成数组
    let test = text.split('');
    let temp = '';
    let row = [];
    // // 1.1 设置样式
    ctx.font = `${fs}px 微软雅黑`;
    ctx.fillStyle = 'black';
    ctx.textBaseline = 'middle';
    // 1.2 计算文字宽度，若文字宽度大于设定的宽度，则push到数组下一个元素，否则将字符串++
    for (let i = 0; i < test.length; i++) {
        if (ctx.measureText(temp).width > width) {
            row.push(temp);
            temp = '';
        }
        temp += test[i];
    }
    // 1.3 循环结束将temp最后一段字符push
    row.push(temp);
    // 1.4 遍历数组,输出文字
    for (let j = 0; j < row.length; j++) {
        ctx.fillText(row[j], x, y + (j + 1) * fs * rowHeight);
    }
}

// 下载海报
const onDownload = () => {
    let link = document.createElement('a');
    link.download = 'my-image-name.jpeg';
    if (type.value === 'HTML') {
        link.href = posterUrl.value;
    } else {
        const dataUrl = posterCanvas.value.toDataURL('image/png');
        console.log(dataUrl, 'dataUrl');
        link.href = dataUrl;
    }
    link.click();
};
</script>

<style lang="scss" scoped>
.poster-container {
    margin-top: 100px;
}

.type-btn {
    margin-left: 50%;
    margin-bottom: 20px;
    transform: translateX(-50%);
}

.demo-box {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.poster-html {
    width: 340px;
    background-color: #fff;
    padding: 20px;

    border-radius: 10px;
    box-sizing: border-box;

    .share-info {
        display: flex;
        align-items: center;

        .logo-wrapper {
            width: 50px;
            height: 50px;
            border-radius: 50px;
            margin-right: 20px;
            background-color: #eee;
            overflow: hidden;
        }
        .logo {
            width: 100%;
            height: auto;
        }
    }

    .poster-img {
        width: 100%;
        height: auto;
        vertical-align: middle;
        margin-top: 10px;
    }

    .goods-info {
        font-size: 15px;
        color: #040000;
        display: flex;
        justify-content: space-between;
        padding-top: 20px;
        .title {
            margin-right: 20px;
        }
        .price {
            display: flex;
            align-items: flex-end;
            flex-direction: column;
            color: #c21e1f;
        }
        .old {
            font-size: 10px;
            color: #bbb;
            text-decoration: line-through;
        }
        .new {
            display: flex;
            align-items: center;
            font-size: 20px;
        }
    }

    .poster-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #3e3a39;
        position: relative;
        .qr-img {
            width: 98px;
            height: 98px;
        }

        .tips {
            font-size: 12px;
        }
    }
}

.download-btn {
    width: 340px;
    height: 36px;
    background-color: #fff;
    margin: 20px auto;
    border-radius: 10px;
    text-align: center;
    line-height: 36px;
    font-size: 15px;
}
.poster-success {
    width: 340px;
    margin: 0 auto;
    img {
        width: 100%;
        height: auto;
        vertical-align: middle;
    }
}
</style>
