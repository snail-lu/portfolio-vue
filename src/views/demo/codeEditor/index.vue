<template>
    <div class="demo-wrapper">
        <code-editor :read-only="false" v-model="code" height="calc(100vh - 40px)" title="代码编辑器" />
    </div>
</template>

<script>
import CodeEditor from '@/components/CodeEditor/index.vue';
export default {
    components: {
        CodeEditor
    },
    data() {
        return {
            code: '<!DOCTYPE html>\n<html lang="en">\n    <head>\n        <meta charset="utf-8" />\n        <meta http-equiv="X-UA-Compatible" content="IE=edge" />\n        <meta name="viewport" content="width=device-width,initial-scale=1.0" />\n        <link rel="icon" href="/favicon.ico" />\n        <title>VUE 项目集</title>\n        <style type="text/css">\n            .page-init-loading {\n                position: fixed;\n                top: 50%;\n                left: 50%;\n                transform: translate(-50%, -50%);\n                display: flex;\n                flex-direction: column;\n                align-items: center;\n            }\n            .loading-icon {\n                width: 30px;\n                height: 30px;\n                animation: animationContainer 1s ease infinite;\n            }\n\n            .loading-text {\n                font-size: 14px;\n                color: #2580b3;\n                margin-top: 5px;\n            }\n\n            .shape {\n                width: 10px;\n                height: 10px;\n                border-radius: 50%;\n                position: absolute;\n            }\n\n            .shape-1 {\n                background-color: #1875e5;\n                left: 0;\n                animation: animationShape1 0.5s ease infinite alternate;\n            }\n\n            .shape-2 {\n                background-color: #c5523f;\n                right: 0;\n                animation: animationShape2 0.5s ease infinite alternate;\n            }\n\n            .shape-3 {\n                background-color: #499255;\n                bottom: 0;\n                animation: animationShape3 0.5s ease infinite alternate;\n            }\n\n            .shape-4 {\n                background-color: #f2b736;\n                right: 0;\n                bottom: 0;\n                animation: animationShape4 0.5s ease infinite alternate;\n            }\n\n            @keyframes animationContainer {\n                0% {\n                    transform: rotate(0);\n                }\n\n                100% {\n                    transform: rotate(360deg);\n                }\n            }\n\n            @keyframes animationShape1 {\n                0% {\n                    transform: translate(0, 0);\n                }\n\n                100% {\n                    transform: translate(20px, 20px);\n                }\n            }\n\n            @keyframes animationShape2 {\n                0% {\n                    transform: translate(0, 0);\n                }\n\n                100% {\n                    transform: translate(-20px, 20px);\n                }\n            }\n\n            @keyframes animationShape3 {\n                0% {\n                    transform: translate(0, 0);\n                }\n\n                100% {\n                    transform: translate(20px, -20px);\n                }\n            }\n\n            @keyframes animationShape4 {\n                0% {\n                    transform: translate(0, 0);\n                }\n\n                100% {\n                    transform: translate(-20px, -20px);\n                }\n            }\n        </style>\n    </head>\n    <body>\n        <div id="app">\n            <div class="page-init-loading">\n                <div class="loading-icon">\n                    <div class="shape shape-1"></div>\n                    <div class="shape shape-2"></div>\n                    <div class="shape shape-3"></div>\n                    <div class="shape shape-4"></div>\n                </div>\n                <div class="loading-text">页面加载中，请稍候...</div>\n            </div>\n        </div>\n    </body>\n</html>\n'
        };
    }
};
</script>

<style lang="scss" scoped>
.demo-wrapper {
    height: 100vh;
}
</style>
