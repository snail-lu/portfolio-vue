<template>
    <div class="anniversary-container">
        <full-page ref="fullpage" :options="options" id="fullpage">
            <div class="section">
                <div class="section-1 flex-box-column flex-h-center flex-v-center">
                    <div class="title">将进酒</div>
                    <img class="section-1-img" src="../../assets/anniversary/page1.webp" />
                    <div class="sub-title">For 李白</div>
                </div>
            </div>
            <div class="section">
                <div class="section-2 flex-box-column flex-h-center flex-v-center">
                    <img class="page2-img" src="../../assets/anniversary/page2.webp" />
                    <div class="desc-1">君不见黄河之水天上来</div>
                    <div class="desc-2">奔流到海不复回</div>
                </div>
            </div>
            <div class="section">
                <div class="section-3 flex-box-column flex-h-center flex-v-center">
                    <img src="../../assets/anniversary/page3.webp" />
                    <div class="desc-1">君不见高堂明镜悲白发</div>
                    <div class="desc-2">朝如青丝暮成雪</div>
                </div>
            </div>
            <div class="section">
                <div class="section-4 flex-box-column flex-h-center flex-v-center">
                    <img class="page-img" src="../../assets/anniversary/page4.webp" />
                    <div class="desc-1">人生得意须尽欢</div>
                    <div class="desc-2">莫使金樽空对月</div>
                </div>
            </div>
            <div class="section">
                <div class="section-5 flex-box-column flex-h-center flex-v-center">
                    <img class="page-img" src="../../assets/anniversary/page5.webp" />
                    <div class="desc-1">天生我材必有用</div>
                    <div class="desc-2">千金散尽还复来</div>
                </div>
            </div>
            <div class="section">
                <div class="section-6 flex-box-column flex-h-center flex-v-center">
                    <img class="page-img" src="../../assets/anniversary/page6.webp" />
                    <div class="desc-1">烹羊宰牛且为乐</div>
                    <div class="desc-2">会须一饮三百杯</div>
                </div>
            </div>
            <div class="section">
                <div class="section-7 flex-box-column flex-h-center flex-v-center">
                    <img src="../../assets/anniversary/page7.webp" />
                    <div class="desc-1">岑夫子，丹丘生</div>
                    <div class="desc-2">将进酒，杯莫停</div>
                </div>
            </div>
            <div class="section">
                <div class="section-8 flex-box-column flex-h-center flex-v-center">
                    <img src="../../assets/anniversary/page7.webp" />
                    <div class="desc-1">与君歌一曲</div>
                    <div class="desc-2">请君为我倾耳听</div>
                </div>
            </div>
        </full-page>
    </div>
</template>

<script setup>
const options = {
    licenseKey: '',
    menu: '#menu',
    verticalCentered: false,
    anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7', 'page8']
    // sectionsColor: ['#41b883', '#ff5f45', '#0798ec']
};
</script>

<style lang="scss" scoped>
@font-face {
    font-family: ZCOOLK;
    font-display: swap;
    src: url('../../assets/fonts/ZCOOLKuaiLe-Regular.ttf') format('truetype');
}
.anniversary-container {
    height: 100%;
    font-family: ZCOOLK;
    background-image: url(../../assets/anniversary/bg-1.webp);
}

.section-1 {
    height: 100vh;

    .title {
        writing-mode: vertical-rl;
        font-size: 24px;
        letter-spacing: 20px;
    }
    &-img {
        margin: 50px 0;
    }

    .sub-title {
        font-size: 22px;
        letter-spacing: 4px;
    }
}

.section-2,
.section-3,
.section-4,
.section-5,
.section-6,
.section-7,
.section-8 {
    height: 100vh;
    width: 100%;

    .desc-1 {
        font-size: 22px;
        margin-top: 40px;
    }

    .desc-2 {
        font-size: 22px;
        margin-top: 20px;
    }
}

.page-img {
    width: 60%;
    height: auto;
}
</style>
