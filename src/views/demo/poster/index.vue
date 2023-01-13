<template>
    <div class="poster-container">
        <!-- <canvas ref="posterCanvas"></canvas> -->

        <!-- html方式实现海报生成 -->
        <div class="demo-box">
            <div class="poster-success" v-if="posterUrl">
                <img :src="posterUrl" alt="" />
            </div>
            <div class="poster-html" ref="posterRef" v-else>
                <div class="share-info">
                    <div class="logo-wrapper">
                        <img src="../../../assets/icons/logo.png" alt="" class="logo" />
                    </div>
                    <div>导购9527</div>
                </div>
                <img
                    class="poster-img"
                    src="//m.360buyimg.com/mobilecms/s1265x1265_jfs/t1/20988/35/20240/36277/637e5127Ee10e66b3/03b212c37d98de5f.jpg!q70.dpg.webp"
                    alt=""
                    @load="onImgLoad"
                />
                <div class="goods-info">
                    <div class="title">{{ goods.goodsName }}</div>
                    <div class="price">
                        <span class="new"><span>¥</span> {{ goods.goodsSalePrice }}</span>
                        <span class="old">¥ {{ goods.goodsPrice }}</span>
                    </div>
                </div>
                <div class="poster-info">
                    <vue-qr class="qr-img" :text="goods.url"></vue-qr>
                    <div class="tips">扫码立即购买</div>
                </div>
            </div>
        </div>

        <div class="download-btn" @click="onDownload">下载海报</div>
    </div>
</template>

<script setup>
import vueQr from 'vue-qr/src/packages/vue-qr.vue';
import { onMounted, ref } from 'vue';
import { toPng } from 'html-to-image';

const goods = {
    url: 'https://snaillu.gitee.io/portfolio/demo/poster',
    goodsName: '西服套装男西装整套修身商务正装 黑色',
    goodsCode: '123456',
    goodsPrice: 5431,
    goodsSalePrice: 1233
};

const posterRef = ref(null);
const posterUrl = ref('');
const onImgLoad = () => {
    // 此种方式，元素的margin也会被截进去，所以posterRef元素尽量不要设置margin
    toPng(posterRef.value).then((dataUrl) => {
        posterUrl.value = dataUrl;
    });
};

const onDownload = () => {
    let link = document.createElement('a');
    link.download = 'my-image-name.jpeg';
    link.href = posterUrl.value;
    link.click();
};

const draw = () => {
    const ctx = posterRef.value.getContext('2d');
    ctx.fillStyle = 'green';
    ctx.fillRect(10, 10, 150, 100);
};
onMounted(() => {
    // draw();
});
</script>

<style lang="scss" scoped>
.poster-container {
    margin-top: 100px;
}

.demo-box {
    margin: 0 auto;
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
