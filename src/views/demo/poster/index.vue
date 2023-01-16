<template>
    <div class="poster-container">
        <el-radio-group v-model="type" class="type-btn">
            <el-radio-button label="HTML" />
            <el-radio-button label="Canvas" />
        </el-radio-group>
        <!-- html方式绘制海报 -->
        <div class="demo-box" v-show="type === 'HTML'">
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
        <div class="demo-box" v-show="type === 'Canvas'">
            <!-- <canvas
                id="posterCanvas"
                ref="posterCanvas"
                :width="canvasWidth"
                :height="canvasHeight"
                :style="{ width: '340px', height: '570px' }"
            ></canvas> -->
            <canvas id="posterCanvas" ref="posterCanvas" width="340" height="570" :style="{ width: '340px', height: '570px' }"></canvas>
        </div>

        <div class="download-btn" @click="onDownload">下载海报</div>
    </div>
</template>

<script setup>
import vueQr from 'vue-qr/src/packages/vue-qr.vue';
import { ref } from 'vue';
import { toPng } from 'html-to-image';
import { fabric } from 'fabric';
import logoImg from '@/assets/icons/logo.png';

// 商品信息
const goods = {
    url: 'https://snaillu.gitee.io/portfolio/demo/poster',
    goodsName: '西服套装男西装整套修身商务正装 黑色',
    goodsImg: 'https://m.360buyimg.com/mobilecms/s1265x1265_jfs/t1/20988/35/20240/36277/637e5127Ee10e66b3/03b212c37d98de5f.jpg',
    goodsCode: '123456',
    goodsPrice: 5431,
    goodsSalePrice: 1233,
    guide: '导购9527'
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
const isInit = ref(true);
watch(
    type,
    (newType) => {
        if (newType === 'Canvas') {
            setTimeout(() => {
                if (isInit.value) {
                    // draw();
                    fabricDraw();
                }
            }, 300);
        }
    },
    {
        immediate: true
    }
);
const posterCanvas = ref(null);
// 解决高分屏下，文字和图片显示模糊的问题
const dpr = Math.round(window.devicePixelRatio || window.webkitDevicePixelRatio || window.mozDevicePixelRatio || 1);
const canvasWidth = Math.round(340 * dpr);
const canvasHeight = Math.round(570 * dpr);
// 使用canvas API进行海报绘制
const draw = () => {
    console.log(dpr, 'dpr');
    const ctx = posterCanvas.value.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    const logoImg = new Image();
    logoImg.onload = function () {
        ctx.drawImage(logoImg, 20 * dpr, 20 * dpr, 50 * dpr, 50 * dpr);
    };
    logoImg.src = '/portfolio/src/assets/icons/logo.png';
    ctx.fillStyle = '#000';
    ctx.font = `${16 * dpr}px 微软雅黑`;
    ctx.fillText('导购9527', 90 * dpr, 50 * dpr);
    const goodImg = new Image();
    goodImg.crossOrigin = 'Anonymous'; // 跨域图片需配置此项，不然canvas.toDataURL会报错
    goodImg.onload = function () {
        ctx.drawImage(goodImg, 20 * dpr, 80 * dpr, 300 * dpr, 300 * dpr);
    };
    goodImg.src = goods.goodsImg;
    drawText(goods.goodsName, 20 * dpr, 390 * dpr, 200 * dpr, 15 * dpr, 1.15, ctx);
    ctx.fillStyle = '#C21E1F';
    ctx.font = `${20 * dpr}px 微软雅黑`;
    ctx.textBaseline = 'top';
    ctx.fillText(`¥${goods.goodsSalePrice}`, 250 * dpr, 400 * dpr);
    ctx.fillStyle = '#BBBBBB';
    ctx.font = `${13 * dpr}px 微软雅黑`;
    ctx.fillText(`¥${goods.goodsPrice}`, 260 * dpr, 420 * dpr);
    const textWidth = ctx.measureText(`¥${goods.goodsPrice}`).width;
    ctx.moveTo(260 * dpr, 425 * dpr);
    ctx.lineTo(260 * dpr + textWidth, 425 * dpr);
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#bbb';
    ctx.stroke();

    const qrImg = new Image();
    qrImg.onload = function () {
        ctx.drawImage(qrImg, 121 * dpr, 430 * dpr, 98 * dpr, 98 * dpr);
    };
    qrImg.src = qrUrl.value;
    ctx.fillStyle = '#000';
    ctx.font = `${12 * dpr}px 微软雅黑`;
    ctx.fillText('扫码立即购买', 134 * dpr, 530 * dpr);
    isInit.value = false;
};

const fabricDraw = () => {
    const canvas = new fabric.Canvas('posterCanvas', {
        selection: false,
        allowTouchScrolling: true // fabric库的bug，_onTouchStart中阻止了滚动的默认行为，待修复
    });
    // 绘制海报背景
    const rect = new fabric.Rect({
        left: 0,
        top: 0,
        fill: '#fff',
        width: 340,
        height: 570,
        rx: 10, // 圆角
        ry: 10, // 圆角
        selectable: false // 禁止选中操作
    });
    canvas.add(rect);

    // 绘制头像
    fabric.Image.fromURL(
        logoImg,
        function (oImg) {
            // 背景
            const bg = new fabric.Rect({
                left: 0,
                top: 0,
                fill: '#eee',
                width: 300,
                height: 300,
                rx: 150,
                ry: 150
            });
            const group = new fabric.Group([bg, oImg], {
                left: 20,
                top: 20,
                selectable: false
            });
            group.scaleToWidth(45);
            canvas.add(group);
        },
        {
            left: 0,
            top: 0,
            width: 300,
            height: 300
        }
    );

    // 绘制昵称
    const nickName = new fabric.Text(goods.guide, {
        fill: '#000',
        left: 85,
        top: 43,
        originY: 'center',
        fontSize: 16,
        fontFamily: 'Microsoft YaHei',
        selectable: false
    });
    canvas.add(nickName);

    // 绘制商品图片
    fabric.Image.fromURL(
        goods.goodsImg,
        function (oImg) {
            oImg.scaleToWidth(300);
            canvas.add(oImg);
        },
        {
            left: 20,
            top: 75,
            selectable: false,
            crossOrigin: 'Anonymous' // 配置商品图跨域，解决canvas.toDataURL报错问题
        }
    );

    // 绘制商品名称
    const goodsName = new fabric.Textbox(goods.goodsName, {
        left: 20,
        top: 395,
        width: 220,
        fontSize: 15,
        lineHeight: 1.15,
        // fontFamily: 'Microsoft YaHei',
        splitByGrapheme: true,
        selectable: false
    });
    canvas.add(goodsName);

    // 商品价格
    const goodsSalePrice = new fabric.Text(`¥${goods.goodsSalePrice}`, {
        fill: '#C21E1F',
        left: 320,
        top: 395,
        width: 80,
        originX: 'right',
        fontSize: 20,
        fontFamily: 'Microsoft YaHei',
        selectable: false
    });
    const goodsPrice = new fabric.Text(`¥${goods.goodsPrice}`, {
        fill: '#BBBBBB',
        left: 320,
        top: 415,
        width: 120,
        originX: 'right',
        fontSize: 13,
        fontFamily: 'Microsoft YaHei',
        linethrough: true,
        selectable: false
    });
    canvas.add(goodsSalePrice);
    canvas.add(goodsPrice);

    // 绘制二维码
    fabric.Image.fromURL(
        qrUrl.value,
        function (oImg) {
            oImg.scaleToWidth(100);
            canvas.add(oImg);
        },
        {
            left: 121,
            top: 432,
            width: 200,
            height: 200,
            selectable: false
        }
    );

    // 绘制提示语
    const qrDesc = new fabric.Text('扫码立即购买', {
        left: 170, // 配合originX实现文字居中
        top: 530,
        width: 340,
        originX: 'center',
        fontSize: 12,
        fontFamily: 'Microsoft YaHei',
        selectable: false
    });
    canvas.add(qrDesc);

    isInit.value = false;
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
    link.download = 'poster.jpg';
    if (type.value === 'HTML') {
        link.href = posterUrl.value;
    } else {
        const dataUrl = posterCanvas.value.toDataURL('image/jpg');
        link.href = dataUrl;
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
    min-height: 570px;
    background-color: #fff;
    padding: 20px;
    font-family: 'Microsoft YaHei';

    border-radius: 10px;
    box-sizing: border-box;

    .share-info {
        display: flex;
        align-items: center;

        .logo-wrapper {
            width: 45px;
            height: 45px;
            border-radius: 45px;
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
            width: 100px;
            height: 100px;
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
