<template>
    <demo :data="demoInfo">
        <div class="css-demos-list">
            <el-collapse v-model="activeNames">
                <el-collapse-item name="1">
                    <template slot="title">
                        <div class="flex-box">
                            <div class="idx-label">1</div>
                            <div>光影掠过文字</div>
                        </div>
                    </template>
                    <div class="demo-content flex-box flex-v-center flex-h-center">
                        <div class="demo-1" data-text="长风破浪会有时，直挂云帆济沧海。">长风破浪会有时，直挂云帆济沧海。</div>
                    </div>
                    <div></div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </demo>
</template>

<script>
import Demo from '@/components/Demo'
export default {
    components: {
        Demo
    },
    data() {
        return {
            demoInfo: {
                title: '纯CSS效果DEMO合集',
                url: ''
            },
            activeNames: []
        }
    }
}
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

::v-deep .el-collapse-item__header {
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
.demo-content {
    background-color: #fbfbfb;
    min-height: 100px;
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
</style>
