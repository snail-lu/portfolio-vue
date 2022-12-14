<template>
    <div class="anniversary-container">
        <full-page ref="fullpage" :options="options" id="fullpage">
            <div class="section">
                <div class="section-1 flex-box-column flex-h-center flex-v-center">
                    <div class="title">一封情书</div>
                    <img src="../../assets/anniversary/heart.webp" />
                    <div class="sub-title">献给你</div>
                </div>
            </div>
            <div class="section">
                <div class="section-2 flex-box-column flex-h-center flex-v-center">
                    <img src="../../assets/anniversary/page2.webp" />
                    <div class="desc-1">2014年12月16日</div>
                    <div class="desc-2">我们正式在一起</div>
                </div>
            </div>
            <div class="section">Third section ...</div>
            <div class="section">Forth section ...</div>
            <div class="section">fifth section ...</div>
            <div class="section">sixth section ...</div>
            <div class="section">Seventh section ...</div>
            <div class="section">Eighth section ...</div>
        </full-page>
    </div>
</template>

<script setup>
const options = {
    licenseKey: '',
    menu: '#menu',
    anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7', 'page8']
    // sectionsColor: ['#41b883', '#ff5f45', '#0798ec']
};
</script>

<style lang="scss" scoped>
.anniversary-container {
    // background-color: #fff;
    // min-height: 100vh;
    background-image: url(../../assets/anniversary/bg_paper.webp);
}

.section-1 {
    height: 100vh;
    width: 100%;
    .title {
        writing-mode: vertical-rl;
        font-size: 24px;
        letter-spacing: 20px;
        margin-bottom: 40px;
    }

    .sub-title {
        font-size: 22px;
        margin-top: 30px;
        letter-spacing: 4px;
    }
}

.section-2 {
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
</style>
