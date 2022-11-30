<template>
    <demo :data="demoInfo">
        <div class="css-demos-list">
            <el-collapse v-model="activeNames">
                <!-- demo 1 -->
                <el-collapse-item name="1">
                    <template v-slot:title>
                        <div class="flex-box">
                            <div class="idx-label">1</div>
                            <div class="title-txt">文字光影掠过效果</div>
                        </div>
                    </template>
                    <div class="demo-content flex-box-column">
                        <el-link
                            class="view-code-btn color-black"
                            icon="el-icon-connection"
                            href="https://codepen.io/snaillu/pen/qBxgopK"
                            target="_blank"
                            >查看代码</el-link
                        >
                        <div class="demo-1" data-text="长风破浪会有时，直挂云帆济沧海。">长风破浪会有时，直挂云帆济沧海。</div>
                    </div>
                    <div></div>
                </el-collapse-item>
                <!-- demo 2 -->
                <el-collapse-item name="2">
                    <template v-slot:title>
                        <div class="flex-box">
                            <div class="idx-label">2</div>
                            <div class="title-txt">图片3D翻转及镜面投影</div>
                        </div>
                    </template>
                    <div class="demo-content flex-box-column">
                        <el-link class="view-code-btn" icon="el-icon-connection" href="https://codepen.io/snaillu/pen/WNMPddX" target="_blank"
                            >查看代码</el-link
                        >
                        <div class="demo-2">
                            <div class="card">
                                <div class="card-item card-item-front">
                                    <img class="card-item-img" src="https://i.loli.net/2019/11/16/FLnzi5Kq4tkRZSm.jpg" />
                                </div>
                                <div class="card-item card-item-back">
                                    <img class="card-item-img" src="https://i.loli.net/2019/10/18/buDT4YS6zUMfHst.jpg" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div></div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </demo>
</template>

<script>
import Demo from '@/components/Demo/index.vue';
export default {
    components: {
        Demo
    },
    data() {
        return {
            demoInfo: {
                title: 'CSS DEMO合集',
                url: ''
            },
            activeNames: []
        };
    }
};
</script>

<style lang="scss" scoped>
.el-collapse {
    border-top: none;
    border-bottom: none;
}
.el-collapse-item {
    border-radius: 12px;
    background: #ffffff;
    box-shadow: 0px 2px 4px rgba(100, 100, 100, 0.5);
    margin-bottom: 20px;
    border: none;
    overflow: hidden;
}

:deep(.el-collapse-item__header) {
    border-bottom: none;
}

.idx-label {
    width: 60px;
    position: relative;
    text-align: center;
    margin-right: 25px;

    &::after {
        content: '';
        display: block;
        position: absolute;
        width: 1px;
        height: 16px;
        background-color: #e9e9e9;
        top: calc(50% - 8px);
        right: 0;
    }
}

.title-txt {
    user-select: none;
}
.demo-content {
    background-color: #f2f2f2;
    min-height: 100px;
    position: relative;
}

.view-code-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #fff;
    z-index: 10;
}

.color-black {
    color: #000;
}

.demo-1 {
    position: relative;
    margin: auto;
    font-size: 30px;
    word-spacing: 0.2em;
    line-height: 1;
    color: transparent;
    background-color: #e8a95b;
    background-clip: text;

    &::after {
        content: attr(data-text);
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 5;
        //生成的光影渐变背景
        background-image: linear-gradient(
            120deg,
            transparent 0%,
            transparent 6rem,
            white 11rem,
            transparent 11.15rem,
            transparent 15rem,
            rgba(255, 255, 255, 0.3) 20rem,
            transparent 25rem,
            transparent 27rem,
            rgba(255, 255, 255, 0.6) 32rem,
            white 33rem,
            rgba(255, 255, 255, 0.3) 33.15rem,
            transparent 38rem,
            transparent 40rem,
            rgba(255, 255, 255, 0.3) 45rem,
            transparent 50rem,
            transparent 100%
        );
        background-clip: text;
        background-size: 50% 100%;
        background-repeat: no-repeat;
        animation: shine 4s infinite linear;
    }
}

@keyframes shine {
    0% {
        background-position: -100% 0;
    }
    100% {
        background-position: 130% 0;
    }
}

.demo-2 {
    width: 100%;
    height: 600px;
    background-color: #000;
    display: flex;
    justify-content: center;
    padding-top: 100px;
    perspective: 500px;

    .card {
        position: relative;
        width: 200px;
        height: 280px;
        cursor: pointer;
        transition: 1s ease-in-out;
        transform-style: preserve-3d;

        &:hover {
            transform: rotateY(0.5turn);
        }

        &-item {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            // 隐藏背面的元素
            backface-visibility: hidden;
            transition: 1s ease-in-out;
            // 镜像效果，暂不支持firefox及IE
            -webkit-box-reflect: below 0 linear-gradient(transparent, transparent, rgba(0, 0, 0, 0.6));

            &-img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            &-back {
                transform: rotateY(0.5turn);
            }
        }
    }
}
</style>
