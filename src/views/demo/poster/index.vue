<template>
    <Demo :data="demoInfo">
        <!-- <canvas ref="posterCanvas"></canvas> -->
        <div class="poster-html" ref="posterRef">
            <img
                class="poster-img"
                src="https://s3.ap-southeast-1.amazonaws.com/imghweshop.hla.com/edm/image/2021-05/dc10ae5368d5437099360db6d4d6eefa.jpg"
                alt=""
                @load="imgLoad()"
                crossorigin="anonymous"
            />
            <div class="goods-info">
                <p class="title">{{ goods.goodsName }}</p>
                <p class="price">
                    <span class="new"><span>RM</span> {{ goods.goodsSalePrice }}</span>
                    <span class="old">RM {{ goods.goodsPrice }}</span>
                </p>
            </div>
            <div class="poster-info">
                <vue-qr class="qr-img" :text="goods.url"></vue-qr>
                <ul>
                    <li>Recommend to you by Snail</li>
                    <li>Code: {{ goods.goodsCode }}</li>
                    <li>Official E-mall Sale</li>
                    <li>Scan to shop in E-Mall</li>
                </ul>
                <img src="../../../assets/icons/logo.png" alt="" class="logo" />
            </div>
        </div>
        <!-- <div class="poster-success" v-show="!isPoster">
            <img :src="posterSrc" alt="" crossorigin="anonymous" @load="generatorSuccess" />
        </div> -->
    </Demo>
</template>

<script setup>
import Demo from '@/components/Demo/index.vue';
import vueQr from 'vue-qr/src/packages/vue-qr.vue';
import { onMounted, ref } from 'vue';
const demoInfo = {
    title: '商品海报',
    url: ''
};

const goods = {
    url: 'https://snaillu.gitee.io/portfolio/demo/poster',
    goodsName: '2023神秘盲盒',
    goodsCode: '123456',
    goodsPrice: 5431,
    goodsSalePrice: 1233
};

const posterCanvas = ref(null);
const draw = () => {
    const ctx = posterCanvas.value.getContext('2d');
    ctx.fillStyle = 'green';
    ctx.fillRect(10, 10, 150, 100);
};
onMounted(() => {
    // draw();
});

const imgLoad = () => {
    //   if (this.qrVisible && this.firstLoad) {
    //     this.$nextTick().then(() => {
    //       this.htmlToCanvas()
    //     })
    //   }
};
</script>

<style lang="scss" scoped>
.poster-html {
    background-color: #fff;
    margin: 0 auto;

    .poster-img {
        width: 100%;
        height: auto;
        vertical-align: middle;
    }

    .goods-info {
        // font-family: 'fzlthjw';
        font-size: 15px;
        color: #040000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 15px 0;
        margin-bottom: -40px;
        .title {
            margin-right: 60px;
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
            font-family: 'fzlthjw';
            display: flex;
            align-items: center;
            font-size: 14px;
            margin-top: 10px;
            span {
                font-size: 16px;
                margin-right: 20px;
            }
        }
    }
}
.poster-info {
    display: flex;
    align-items: center;
    padding: 70px 79px;
    font-size: 20px;
    color: #3e3a39;
    position: relative;
    .logo {
        width: 117px;
        height: auto;
        position: absolute;
        right: 79px;
        top: 50%;
        transform: translateY(-50%);
    }
    ul {
        margin-left: 29px;
    }
    li {
        line-height: 2em;
    }
}
.qr-img {
    width: 156px;
    height: 156px;
}
.popup-btn {
    display: block;
    font-family: 'fzlthjw';
    width: 380px;
    height: 96px;
    padding: 0;
    background-color: #cd2220;
    margin: 0 auto;
    color: #fff;
}
.poster-success {
    // display: flex;
    width: 100%;
    img {
        width: 100%;
        height: auto;
        vertical-align: middle;
    }
}
</style>
