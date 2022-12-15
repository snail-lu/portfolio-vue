<template>
    <div class="anniversary-container">
        <full-page ref="fullpage" :options="options" id="fullpage">
            <div class="section">
                <div class="section-1 flex-box-column flex-h-center flex-v-center">
                    <div class="title">一封情书</div>
                    <div class="letter">
                        <img class="section-1-letter" src="../../assets/anniversary/page1.webp" />
                        <img class="section-1-flower" src="../../assets/anniversary/page1-s1.webp" />
                    </div>
                    <div class="sub-title">For 张佳丽</div>
                    <div class="sub-title-2">8周年快乐❥(^_-)</div>
                </div>
            </div>
            <div class="section">
                <div class="section-2 flex-box-column flex-h-center flex-v-center">
                    <img class="page-img" src="../../assets/anniversary/2014.jpg" v-if="show[2014]" @click="changeShow(2014)" />
                    <img class="page2-img" src="../../assets/anniversary/page2.webp" v-else @click="changeShow(2014)" />
                    <div class="desc-1">2014年12月16日</div>
                    <div class="desc-2">我们正式在一起</div>
                </div>
            </div>
            <div class="section">
                <div class="section-3 flex-box-column flex-h-center flex-v-center">
                    <img class="page-img" src="../../assets/anniversary/2015.jpg" v-if="show[2015]" @click="changeShow(2015)" />
                    <img src="../../assets/anniversary/page3.webp" v-else @click="changeShow(2015)" />
                    <div class="desc-1">到今天，</div>
                    <div class="desc-2">我们已经恋爱了8个年头</div>
                </div>
            </div>
            <div class="section">
                <div class="section-4 flex-box-column flex-h-center flex-v-center">
                    <img class="page-img" src="../../assets/anniversary/2016.jpg" v-if="show[2016]" @click="changeShow(2016)" />
                    <img class="page-img" src="../../assets/anniversary/page4.webp" v-else @click="changeShow(2016)" />
                    <div class="desc-1">在这8年宝贵的时光里，</div>
                    <div class="desc-2">我们彼此陪伴，</div>
                    <div class="desc-2">一起度过了人生中很多重要的阶段，</div>
                    <div class="desc-2">我们俩也从懵懂，到成熟</div>
                </div>
            </div>
            <div class="section">
                <div class="section-5 flex-box-column flex-h-center flex-v-center">
                    <img class="page-img" src="../../assets/anniversary/2017.jpg" v-if="show[2017]" @click="changeShow(2017)" />
                    <img class="page-img" src="../../assets/anniversary/page5.webp" v-else @click="changeShow(2017)" />
                    <div class="desc-1">感谢你在我一无所有的时候，</div>
                    <div class="desc-1">一直对我不离不弃，</div>
                    <div class="desc-1">你的陪伴，</div>
                    <div class="desc-1">是我不断向前的最大动力</div>
                </div>
            </div>
            <div class="section">
                <div class="section-6 flex-box-column flex-h-center flex-v-center">
                    <img class="page-img" src="../../assets/anniversary/2019.jpg" v-if="show[2019]" @click="changeShow(2019)" />
                    <img class="page-img" src="../../assets/anniversary/page6.webp" v-else @click="changeShow(2019)" />
                    <div class="desc-1">2021年，</div>
                    <div class="desc-2">我们终于见了家长，</div>
                    <div class="desc-2">也买了属于我们两个的第一套房子</div>
                </div>
            </div>
            <div class="section">
                <div class="section-7 flex-box-column flex-h-center flex-v-center">
                    <img class="page-img" src="../../assets/anniversary/2022.jpg" v-if="show[2022]" @click="changeShow(2022)" />
                    <img src="../../assets/anniversary/page7.webp" v-else @click="changeShow(2022)" />
                    <div class="desc-1">2022年，</div>
                    <div class="desc-2">我们产生了矛盾</div>
                    <div class="desc-2">但最终我们还是战胜了一切困难</div>
                </div>
            </div>
            <div class="section">
                <div class="section-8 flex-box-column flex-h-center flex-v-center">
                    <img class="page-img" src="../../assets/anniversary/2023.jpg" v-if="show[2023]" @click="changeShow(2023)" />
                    <img src="../../assets/anniversary/page8.webp" v-else @click="changeShow(2023)" />
                    <div class="desc-1">2023年，</div>
                    <div class="desc-2">我们即将一起组建我们自己的小家，</div>
                    <div class="desc-2">我会好好爱你，</div>
                    <div class="desc-2">我们以后再也不分开❥(^_-)</div>
                </div>
            </div>
            <div class="section">
                <div class="section-8 flex-box-column flex-h-center flex-v-center">
                    <img class="page-img" src="../../assets/anniversary/2021.jpg" />
                    <div class="desc-1">8周年快乐</div>
                    <div class="desc-1">我会永远爱你❥(^_-)</div>
                </div>
            </div>
        </full-page>
    </div>
</template>

<script setup>
import { reactive } from 'vue';

const options = {
    licenseKey: '',
    menu: '#menu',
    verticalCentered: false,
    anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7', 'page8']
    // sectionsColor: ['#41b883', '#ff5f45', '#0798ec']
};

const show = reactive({
    2014: false,
    2015: false,
    2016: false,
    2017: false,
    2018: false,
    2019: false,
    2021: false,
    2022: false
});

const changeShow = (year) => {
    show[year] = !show[year];
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
    .letter {
        margin: 50px 0;
        position: relative;

        .section-1-flower {
            position: absolute;
            left: 72%;
            top: 30%;
            transform: translate(-50%, -50%);
        }
    }

    .sub-title {
        font-size: 22px;
        letter-spacing: 4px;

        &-2 {
            margin-top: 15px;
            font-size: 22px;
        }
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

.fp-warning .fp-watermark {
    bottom: -100px;
}
</style>
