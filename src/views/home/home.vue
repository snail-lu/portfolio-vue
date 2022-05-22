<template>
    <div class="home-container flex-box-column flex-v-center flex-h-center">
        <div class="bear"></div>
        <!-- <video
            class="home-video"
            src="https://fastly.jsdelivr.net/gh/Snail-Lu/imageGalleries/portfolio-vue/videos/bg.mp4"
            muted
            autoplay
            loop
            controls
        ></video> -->
    </div>
</template>

<script>
export default {
    name: 'Home'
}
</script>

<style lang="scss" scoped>
.home-container {
    height: calc(100vh - 60px);

    .bear {
        position: absolute;
        top: calc(50% - 50px);
        width: 200px;
        height: 100px;
        background: url('../../assets/images/bear.png') no-repeat;
        animation: run 1s steps(8) infinite;
    }

    @keyframes run {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: -1600px 0;
        }
    }

    @keyframes run2 {
        0% {
            left: 0px;
        }
        100% {
            left: 100%;
            transform: translateX(-100%);
        }
    }

    @keyframes bg {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: 100% 0;
        }
    }

    .home-video {
        width: 50%;
        border-radius: 30px;
        margin: 0 auto;
    }
}
</style>
