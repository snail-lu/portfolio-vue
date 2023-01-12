<template>
    <Demo :data="demoInfo">
        <!-- <canvas ref="posterCanvas"></canvas> -->
        <div class="poster-html" ref="posterRef">
            <div class="share-info">
                <img src="../../../assets/icons/logo.png" alt="" class="logo" />
                <div>Snail</div>
            </div>
            <img class="poster-img" src="https://s1.ax1x.com/2023/01/12/pSujg2T.jpg" alt="" @load="imgLoad()" />
            <div class="goods-info">
                <p class="title">{{ goods.goodsName }}</p>
                <p class="price">
                    <span class="new"><span>RM</span> {{ goods.goodsSalePrice }}</span>
                    <span class="old">RM {{ goods.goodsPrice }}</span>
                </p>
            </div>
            <div class="poster-info">
                <vue-qr class="qr-img" :text="goods.url"></vue-qr>
                <div>扫码立即购买</div>
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
    title: '',
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

    .share-info {
        display: flex;
        align-items: center;
        .logo {
            width: 50px;
            height: 50px;
            margin-right: 20px;
        }
    }

    .poster-img {
        width: 100%;
        height: auto;
        vertical-align: middle;
    }

    .goods-info {
        font-size: 15px;
        color: #040000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 15px 0;
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
    }
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
