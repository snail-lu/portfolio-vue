<template>
    <div class="home-container flex-box-column flex-v-center flex-h-center">
        <video
            class="home-video"
            src="https://fastly.jsdelivr.net/gh/Snail-Lu/imageGalleries/portfolio-vue/videos/bg.mp4"
            muted
            autoplay
            loop
            controls
        ></video>
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
    .home-video {
        width: 50%;
        border-radius: 30px;
        margin: 0 auto;
    }
}
</style>
