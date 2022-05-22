<template>
    <div class="about-container">
        <img src="@/assets/icons/logo.png" class="avatar-img" />
        <div class="user-info">
            <div class="nickname">Snail Lu</div>
            <div class="job">Web Developer</div>
            <div class="desc">
                A web developer based in Shanghai. Engaged in web development since 2019. Good at mini-program and web
                development.
            </div>
        </div>
        <div class="flex-box flex-h-between flex-v-center">
            <img src="@/assets/icons/email.svg" class="icon" title="email：snaillu@yeah.net" />
            <a href="https://snail-lu.vercel.app" target="_blank">
                <img src="@/assets/icons/blogs.svg" class="icon" title="blog"
            /></a>
            <a href="https://github.com/Snail-Lu" target="_blank">
                <img src="@/assets/icons/gitHub.svg" class="icon" title="github" />
            </a>
            <a href="https://snail-lu.github.io/portfolio-vue/" target="_blank">
                <img src="@/assets/icons/network.svg" class="icon" title="portfolio" />
            </a>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.about-container {
    text-align: center;
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    padding: 30px 20px;
    position: relative;
    width: 260px;
    margin: 100px auto 0;

    .avatar-img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: #fff;
        box-shadow: 0 0 8px #333;
        left: calc(50% - 50px);

        &:hover {
            animation: rotate 1s infinite;
        }
    }

    .user-info {
        margin-top: 20px;
        .nickname {
            font-weight: bold;
            font-size: 18px;
        }
        .job {
            color: #999;
            margin-top: 10px;
            font-size: 13px;
            font-weight: normal;
        }

        .desc {
            font-size: 12px;
            margin: 20px 0 30px;
            line-height: 1.5;
        }
    }

    .icon {
        width: 26px;
        cursor: pointer;
    }

    @keyframes rotate {
        from {
            transform: rotateY(0deg);
        }
        to {
            transform: rotateY(360deg);
        }
    }
}
</style>
