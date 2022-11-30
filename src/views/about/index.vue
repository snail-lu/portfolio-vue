<template>
    <div class="contact-area">
        <div class="contact">
            <main>
                <section>
                    <div class="content">
                        <img src="../../assets/icons/logo.png" alt="Profile Image" />

                        <aside>
                            <h1>{{ userInfo.name }}</h1>
                            <p>{{ userInfo.introduction }}</p>
                        </aside>

                        <button :class="{ active: active }" @click="onToggle">
                            <span>Contact Me</span>

                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                                <g class="nc-icon-wrapper" fill="#444444"><path d="M14.83 30.83L24 21.66l9.17 9.17L36 28 24 16 12 28z"></path></g>
                            </svg>
                        </button>
                    </div>

                    <div class="title" :class="{ active: active }"><p>Contact Me</p></div>
                </section>
            </main>

            <nav :class="{ active: active }">
                <a :href="userInfo.blog" class="facebook" target="_blank">
                    <div class="icon">
                        <svg
                            t="1669776594765"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="2397"
                            width="200"
                            height="200"
                        >
                            <path
                                d="M419.2 451.2h89.6c16 0 32-12.8 32-32 0-16-12.8-32-32-32h-89.6c-16 0-32 12.8-32 32 3.2 16 16 32 32 32zM601.6 572.8h-182.4c-16 0-32 12.8-32 32 0 16 12.8 32 32 32h182.4c16 0 32-12.8 32-32s-12.8-32-32-32z"
                                fill="#444444"
                                p-id="2398"
                            ></path>
                            <path
                                d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z m252.8 608c0 89.6-73.6 160-163.2 160H416c-86.4 0-160-73.6-160-160v-188.8C256 329.6 329.6 256 419.2 256h112c48 0 102.4 41.6 124.8 89.6 6.4 12.8 9.6 22.4 16 54.4 3.2 19.2 3.2 35.2 12.8 44.8 12.8 12.8 57.6 6.4 70.4 9.6 12.8 6.4 12.8 22.4 12.8 22.4l-3.2 131.2z"
                                fill="#444444"
                                p-id="2399"
                            ></path>
                        </svg>
                    </div>

                    <div class="content">
                        <h1>Blog</h1>
                        <span>{{ userInfo.blog }}</span>
                    </div>

                    <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                        <g class="nc-icon-wrapper" fill="#444444"><path d="M17.17 32.92l9.17-9.17-9.17-9.17L20 11.75l12 12-12 12z"></path></g>
                    </svg>
                </a>

                <a :href="userInfo.github" class="github">
                    <div class="icon">
                        <svg
                            t="1653228132654"
                            class="icon"
                            viewBox="0 0 1049 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="3463"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            width="65.5625"
                            height="64"
                        >
                            <path
                                d="M524.979332 0C234.676191 0 0 234.676191 0 524.979332c0 232.068678 150.366597 428.501342 358.967656 498.035028 26.075132 5.215026 35.636014-11.299224 35.636014-25.205961 0-12.168395-0.869171-53.888607-0.869171-97.347161-146.020741 31.290159-176.441729-62.580318-176.441729-62.580318-23.467619-60.841976-58.234462-76.487055-58.234463-76.487055-47.804409-32.15933 3.476684-32.15933 3.476685-32.15933 53.019436 3.476684 80.83291 53.888607 80.83291 53.888607 46.935238 79.963739 122.553122 57.365291 152.97411 43.458554 4.345855-33.897672 18.252593-57.365291 33.028501-70.402857-116.468925-12.168395-239.022047-57.365291-239.022047-259.012982 0-57.365291 20.860106-104.300529 53.888607-140.805715-5.215026-13.037566-23.467619-66.926173 5.215027-139.067372 0 0 44.327725-13.906737 144.282399 53.888607 41.720212-11.299224 86.917108-17.383422 131.244833-17.383422s89.524621 6.084198 131.244833 17.383422C756.178839 203.386032 800.506564 217.29277 800.506564 217.29277c28.682646 72.1412 10.430053 126.029806 5.215026 139.067372 33.897672 36.505185 53.888607 83.440424 53.888607 140.805715 0 201.64769-122.553122 245.975415-239.891218 259.012982 19.121764 16.514251 35.636014 47.804409 35.636015 97.347161 0 70.402857-0.869171 126.898978-0.869172 144.282399 0 13.906737 9.560882 30.420988 35.636015 25.205961 208.601059-69.533686 358.967656-265.96635 358.967655-498.035028C1049.958663 234.676191 814.413301 0 524.979332 0z"
                                fill="#000000"
                                p-id="3464"
                            ></path>
                            <path
                                d="M199.040177 753.571326c-0.869171 2.607513-5.215026 3.476684-8.691711 1.738342s-6.084198-5.215026-4.345855-7.82254c0.869171-2.607513 5.215026-3.476684 8.691711-1.738342s5.215026 5.215026 4.345855 7.82254z m-6.953369-4.345856M219.900283 777.038945c-2.607513 2.607513-7.82254 0.869171-10.430053-2.607514-3.476684-3.476684-4.345855-8.691711-1.738342-11.299224 2.607513-2.607513 6.953369-0.869171 10.430053 2.607514 3.476684 4.345855 4.345855 9.560882 1.738342 11.299224z m-5.215026-5.215027M240.760389 807.459932c-3.476684 2.607513-8.691711 0-11.299224-4.345855-3.476684-4.345855-3.476684-10.430053 0-12.168395 3.476684-2.607513 8.691711 0 11.299224 4.345855 3.476684 4.345855 3.476684 9.560882 0 12.168395z m0 0M269.443034 837.011749c-2.607513 3.476684-8.691711 2.607513-13.906737-1.738342-4.345855-4.345855-6.084198-10.430053-2.607513-13.037566 2.607513-3.476684 8.691711-2.607513 13.906737 1.738342 4.345855 3.476684 5.215026 9.560882 2.607513 13.037566z m0 0M308.555733 853.526c-0.869171 4.345855-6.953369 6.084198-13.037566 4.345855-6.084198-1.738342-9.560882-6.953369-8.691711-10.430053 0.869171-4.345855 6.953369-6.084198 13.037566-4.345855 6.084198 1.738342 9.560882 6.084198 8.691711 10.430053z m0 0M351.145116 857.002684c0 4.345855-5.215026 7.82254-11.299224 7.82254-6.084198 0-11.299224-3.476684-11.299224-7.82254s5.215026-7.82254 11.299224-7.82254c6.084198 0 11.299224 3.476684 11.299224 7.82254z m0 0M391.126986 850.049315c0.869171 4.345855-3.476684 8.691711-9.560882 9.560882-6.084198 0.869171-11.299224-1.738342-12.168395-6.084197-0.869171-4.345855 3.476684-8.691711 9.560881-9.560882 6.084198-0.869171 11.299224 1.738342 12.168396 6.084197z m0 0"
                                fill="#000000"
                                p-id="3465"
                            ></path>
                        </svg>
                    </div>

                    <div class="content">
                        <h1>Github</h1>
                        <span>{{ userInfo.github }}</span>
                    </div>

                    <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                        <g class="nc-icon-wrapper" fill="#444444"><path d="M17.17 32.92l9.17-9.17-9.17-9.17L20 11.75l12 12-12 12z"></path></g>
                    </svg>
                </a>
                <a href="#" class="gmail">
                    <div class="icon">
                        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M16 3v10c0 .567-.433 1-1 1h-1V4.925L8 9.233 2 4.925V14H1c-.567 0-1-.433-1-1V3c0-.283.108-.533.287-.712C.467 2.107.718 2 1 2h.333L8 6.833 14.667 2H15c.283 0 .533.108.713.288.179.179.287.429.287.712z"
                                fill-rule="evenodd"
                            />
                        </svg>
                    </div>

                    <div class="content">
                        <h1>Email</h1>
                        <span>{{ userInfo.email }}</span>
                    </div>

                    <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                        <g class="nc-icon-wrapper" fill="#444444"><path d="M17.17 32.92l9.17-9.17-9.17-9.17L20 11.75l12 12-12 12z"></path></g>
                    </svg>
                </a>
            </nav>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const active = ref(false);

const onToggle = () => {
    active.value = !active.value;
};

const userInfo = {
    name: 'Snail Lu',
    introduction: 'A web developer based in Shanghai.',
    blog: 'https://snaillu.gitee.io',
    portfolio: 'https://snail-lu.gitee.io/portfolio-vue',
    github: 'https://github.com/Snail-Lu/',
    email: 'snaillu@yeah.net'
};
</script>

<style lang="scss" scoped>
/* COLORS
========================================== */

$bg-color: #051321;
$color-1: #eb524a;
$color-2: #c63535;
$color-3: #ffbe44;

$white: #ffffff;
$black: #000000;

// Social media

$gmail: #d14836;
$facebook: #3b5998;
$twitter: #1da1f2;
$github: #000000;

/* MIXINS
========================================== */

@mixin animation($animation) {
    -webkit-animation: #{$animation};
    -moz-animation: #{$animation};
    -o-animation: #{$animation};
    animation: #{$animation};
}

@mixin keyframes($keyframes) {
    @-webkit-keyframes #{$keyframes} {
        @content;
    }
    @-moz-keyframes #{$keyframes} {
        @content;
    }
    @-o-keyframes #{$keyframes} {
        @content;
    }
    @keyframes #{$keyframes} {
        @content;
    }
}

@mixin transform($transform) {
    -webkit-transform: $transform;
    -moz-transform: $transform;
    -ms-transform: $transform;
    -o-transform: $transform;
    transform: $transform;
}

@mixin transition($transition) {
    -webkit-transition: #{$transition};
    -moz-transition: #{$transition};
    -o-transition: #{$transition};
    transition: #{$transition};
}

@mixin transition-delay($transition-delay) {
    -webkit-transition-delay: #{$transition-delay};
    -moz-transition-delay: #{$transition-delay};
    -o-transition-delay: #{$transition-delay};
    transition-delay: #{$transition-delay};
}

/* RESET
========================================== */

*,
*:before,
*:after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background: $bg-color;
    //font-family: 'Open Sans', sans-serif;
    font-family: 'Roboto Condensed', sans-serif;
}

/* CONTACT
========================================== */

.contact-area {
    width: 100%;
    height: 100vh;
    position: relative;
}

.contact {
    position: relative;
    max-width: 420px;
    padding: 40px 20px;
    overflow: hidden;
    margin: 0 auto;

    @media (min-width: 1024px) {
        position: absolute;
        top: 50%;
        left: 50%;
        @include transform(translate(-50%, -50%));
    }

    main {
        float: left;
        width: 100%;
        position: relative;

        section {
            border-radius: 5px;
            float: left;
            width: 100%;
            background-color: $color-1;

            .content {
                float: left;
                width: 100%;
                padding: 20px 30px 50px 30px;
                position: relative;
                text-align: center;

                @media (min-width: 414px) {
                    text-align: left;
                }

                img {
                    display: inline-block;
                    width: 140px;
                    border-radius: 50%;

                    @media (min-width: 414px) {
                        float: left;
                        width: 30%;
                        margin-right: 10%;
                    }
                }

                aside {
                    float: left;
                    width: 100%;
                    color: $white;
                    margin-top: 10px;

                    @media (min-width: 414px) {
                        width: 60%;
                    }

                    h1 {
                        font-weight: 100;
                        font-size: 22px;
                        margin-bottom: 10px;
                    }

                    p {
                        font-size: 14px;
                        letter-spacing: 0.5px;
                        line-height: 160%;
                    }
                }
            }
        }

        .title {
            float: left;
            width: 100%;
            background-color: $color-2;
            max-height: 0px;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            overflow: hidden;
            @include transition(all 0.55s);

            &.active {
                max-height: 100px;
                @include transition(all 1.3s);

                p {
                    @include transform(scale(1));
                    transition-delay: 0.2s;
                }
            }

            p {
                padding: 15px 30px;
                color: $white;
                font-size: 16px;
                display: inline-block;
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                @include transition(all 0.3s);
                @include transform(scale(0));
            }
        }

        button {
            position: absolute;
            bottom: 0;
            right: 50%;
            background-color: $color-3;
            color: $color-2;
            border: 0;
            width: 200px;
            height: 48px;
            text-align: center;
            border-radius: 30px;
            font-size: 16px;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            margin-bottom: -24px;
            margin-right: -100px;
            @include transition(all 0.4s);
            transition-delay: 0.1s;
            outline: none;
            overflow: hidden;
            z-index: 10;
            font-family: inherit;
            cursor: pointer;

            span {
                opacity: 1;
                @include transition(opacity 0.2s);
                transition-delay: 0.4s;
                display: block;
                width: 200px;
                float: left;
                padding: 15px 0px;
            }

            svg {
                position: absolute;
                top: 50%;
                left: 50%;
                @include transform(translate(-50%, -50%));
                opacity: 0;
                @include transition(all 0.4s);

                path {
                    fill: $color-2;
                }
            }

            &.active {
                margin-right: 0;
                right: 20px;
                width: 65px;
                height: 65px;
                margin-bottom: -32.5px;
                text-indent: 100%;
                white-space: nowrap;
                overflow: hidden;
                border-radius: 65px;
                box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);

                span {
                    opacity: 0;
                    transition-delay: 0s;
                    width: 200px;
                }

                svg {
                    opacity: 1;
                    transition-delay: 0.5s;
                }
            }
        }
    }

    nav {
        float: left;
        width: 100%;
        overflow: hidden;
        max-height: 0px;
        @include transition(all 0.5s);

        &.active {
            max-height: 600px;
            @include transition(all 1s);

            a {
                opacity: 1;
                @include transform(translateY(0px));
                @include transition(all 0.7s);

                &:nth-of-type(1) {
                    transition-delay: 0.5s;
                }

                &:nth-of-type(2) {
                    transition-delay: 0.7s;
                }

                &:nth-of-type(3) {
                    transition-delay: 0.9s;
                }
            }
        }

        a {
            float: left;
            width: 100%;
            margin-top: 18px;
            background-color: $white;
            padding: 18px 20px;
            border-radius: 5px;
            text-decoration: none;
            @include transition(all 0.3s);
            opacity: 0;
            @include transform(translateY(-10px));
            position: relative;

            @media (min-width: 414px) {
                padding: 18px 30px;
            }

            .arrow {
                position: absolute;
                right: 15px;
                top: 50%;
                @include transform(translateY(-50%));

                path {
                    fill: darken($white, 10%);
                }
            }

            &.gmail {
                .icon {
                    svg {
                        background-color: $gmail;
                    }
                }

                .content {
                    h1 {
                        color: $gmail;
                    }
                }
            }

            &.facebook {
                .icon {
                    svg {
                        background-color: $facebook;
                    }
                }

                .content {
                    h1 {
                        color: $facebook;
                    }
                }
            }

            &.github {
                .icon {
                    svg {
                        background-color: $github;
                    }
                }

                .content {
                    h1 {
                        color: $github;
                    }
                }
            }

            .icon {
                float: left;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                overflow: hidden;
                margin-right: 20px;

                svg {
                    width: 100%;
                    height: 100%;
                    padding: 14px;

                    path {
                        fill: $white;
                    }
                }
            }

            .content {
                h1 {
                    font-size: 20px;
                    font-weight: 400;
                    line-height: 160%;
                    letter-spacing: 0.4px;
                }

                span {
                    font-size: 14px;
                    color: darken($white, 30%);
                    display: block;
                    letter-spacing: 0.4px;
                }
            }
        }
    }
}
</style>
