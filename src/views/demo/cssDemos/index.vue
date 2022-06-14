<template>
    <demo :data="demoInfo">
        <div class="css-demos-list">
            <el-collapse v-model="activeNames">
                <el-collapse-item name="1">
                    <template slot="title">
                        <div class="flex-box">
                            <div class="idx-label">1</div>
                            <div class="title-txt">光影掠过文字</div>
                        </div>
                    </template>
                    <div class="demo-content flex-box-column">
                        <div class="demo-1" data-text="长风破浪会有时，直挂云帆济沧海。">长风破浪会有时，直挂云帆济沧海。</div>
                        <div class="code-box" v-if="activeNames.includes('1')">
                            <code-editor mode="html" v-model="demoList[0].code1" title="HTML代码" />
                            <code-editor mode="css" v-model="demoList[0].code2" title="CSS代码" />
                        </div>
                    </div>
                    <div></div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </demo>
</template>

<script>
import Demo from '@/components/Demo'
import CodeEditor from '@/components/CodeEditor'
export default {
    components: {
        Demo,
        CodeEditor
    },
    data() {
        return {
            demoInfo: {
                title: 'CSS DEMO合集',
                url: ''
            },
            activeNames: [],
            demoList: [
                {
                    idx: 1,
                    code1: '<div class="demo-1" data-text="长风破浪会有时，直挂云帆济沧海。">长风破浪会有时，直挂云帆济沧海。</div>',
                    code2: '.demo-1 {\n    position: relative;\n    margin: 20px auto;\n    font-size: 30px;\n    word-spacing: 0.2em;\n    line-height: 1;\n    color: transparent;\n    background-color: #e8a95b;\n    background-clip: text;\n\n    &::after {\n        content: attr(data-text);\n        position: absolute;\n        left: 0;\n        top: 0;\n        width: 100%;\n        height: 100%;\n        z-index: 5;\n        //生成的光影渐变背景\n        background-image: linear-gradient(\n            120deg,\n            transparent 0%,\n            transparent 6rem,\n            white 11rem,\n            transparent 11.15rem,\n            transparent 15rem,\n            rgba(255, 255, 255, 0.3) 20rem,\n            transparent 25rem,\n            transparent 27rem,\n            rgba(255, 255, 255, 0.6) 32rem,\n            white 33rem,\n            rgba(255, 255, 255, 0.3) 33.15rem,\n            transparent 38rem,\n            transparent 40rem,\n            rgba(255, 255, 255, 0.3) 45rem,\n            transparent 50rem,\n            transparent 100%\n        );\n        background-clip: text;\n        background-size: 50% 100%;\n        background-repeat: no-repeat;\n        animation: shine 4s infinite linear;\n    }\n}\n\n@keyframes shine {\n    0% {\n        background-position: -100% 0;\n    }\n    100% {\n        background-position: 130% 0;\n    }\n}'
                }
            ]
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

.title-txt {
    user-select: none;
}
.demo-content {
    background-color: #f2f2f2;
    min-height: 100px;
}

.demo-1 {
    position: relative;
    margin: 20px auto;
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

.code-box {
    width: 100%;
}
</style>
