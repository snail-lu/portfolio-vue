// 此DEMO样式参考vue-phone-model，github地址：https://github.com/panio123/vue-phone-model
<template>
    <demo :data="demoInfo">
        <div class="phone-wrap">
            <div class="phone-box">
                <div class="phone-receiver-wrap">
                    <i class="phone-camera"></i>
                    <div class="phone-receiver"></div>
                </div>
                <div class="phone-button"></div>
                <div class="phone-tool-bar">
                    <span class="time">{{ time }}</span>
                    <span class="network"
                        >5G
                        <i class="power"></i>
                    </span>
                </div>
                <div class="phone-content" :style="{ background: background }" @touch="onTouch">
                    <!-- 模型内显示内容写在这里 -->
                    <!-- <slot></slot> -->
                    <img
                        class="phone-content-img"
                        src="https://fastly.jsdelivr.net/gh/Snail-Lu/imageGalleries/gh-pages/2021-12/3820f11f44f6ba81.jpg"
                    />
                </div>
            </div>
        </div>
    </demo>
</template>

<script>
import Demo from '@/components/Demo/index.vue';
export default {
    name: 'v-phone',
    components: {
        Demo
    },
    props: {
        type: {
            default: 'i5',
            type: String
        },
        background: {
            default: '',
            type: String
        }
    },
    data() {
        return {
            demoInfo: {
                title: '手机模型',
                url: ''
            },
            time: ':'
        };
    },
    methods: {
        onTouch(e) {
            console.log(e);
        },
        checkTime(i) {
            if (i < 10) {
                i = '0' + i;
            }
            return i;
        },
        timer() {
            let now = new Date();
            let h = this.checkTime(now.getHours());
            let m = this.checkTime(now.getMinutes());
            this.time = h + ':' + m;
            setTimeout(() => {
                this.timer();
            }, 1000);
        }
    },
    created() {
        this.timer();
    }
};
</script>

<style lang="scss">
.phone-wrap {
    border-bottom: 75px solid #383735;
    border-top: 50px solid #383735;
    border-left: 15px solid #383735;
    border-right: 15px solid #383735;
    border-radius: 50px;
    width: 320px;
    height: 568px;
    box-sizing: content-box;
    cursor: pointer;
    margin: 0 auto;
}

.phone-box {
    position: relative;
    width: 100%;
    height: 100%;
    background: #fff;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding-top: 20px;
    border: 2px solid #282828;
    border-top: none;
}

.phone-receiver-wrap {
    position: absolute;
    width: 100%;
    z-index: 5;
    top: -25px;
    text-align: center;
}

.phone-camera {
    width: 6px;
    height: 6px;
    border-radius: 30px;
    background: #92969f;
    float: left;
    margin-left: 40%;
    margin-top: 1px;
    vertical-align: middle;
}

.phone-receiver {
    background: #1c1d22;
    width: 52px;
    height: 6px;
    float: left;
    margin-left: 6px;
    border-radius: 50px;
    box-shadow: 1px 2px #52514e;
}

.phone-button {
    position: absolute;
    width: 50px;
    height: 50px;
    background: #464646;
    border: 2px solid #2f2f2f;
    border-radius: 50%;
    bottom: -70px;
    left: 135px;
    z-index: 9;
    cursor: pointer;
    box-shadow: inset 0px 0px 2px 1px rgba(111, 111, 111, 0.4);
}

.phone-tool-bar {
    width: 100%;
    height: 20px;
    background: #000;
    color: #fff;
    font-size: 12px;
    overflow: hidden;
    line-height: 20px;
    padding: 0 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-top: 2px solid #282828;
    border-bottom: none;
    margin-top: -20px;

    .time {
        float: left;
    }

    .network {
        float: right;
    }

    .power {
        position: relative;
        display: inline-block;
        width: 20px;
        height: 7px;
        border-radius: 5px;
        overflow: hidden;
        border: 1px solid #fff;

        &::before {
            content: '';
            display: inline-block;
            width: 80%;
            height: 100%;
            background: #fff;
            position: absolute;
            top: 0;
            right: -1px;
        }
    }
}

.phone-content {
    width: 100%;
    height: 100%;
    position: relative;
    /* background-image: url('./img/moon.jpg'); */
    /* background-color: cadetblue; */
    background-color: #fff;
    background-size: cover;
    background-repeat: no-repeat;
    overflow-y: scroll;

    // chrome
    &::-webkit-scrollbar {
        display: none;
    }

    // 兼容火狐
    scrollbar-width: none;
    // 兼容IE10+
    -ms-overflow-style: none;

    &-img {
        width: 100%;
        height: auto;
    }
}
</style>
