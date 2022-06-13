<template>
    <div class="code-editor-container">
        <div class="header">
            <div>{{ title }}</div>
            <div class="btn-groups">
                <el-button
                    type="text"
                    icon="el-icon-document-copy"
                    class="copy-btn"
                    v-clipboard="options.value"
                    v-clipboard:success="onCopySuccess"
                    v-clipboard:error="onCopyError"
                    >复制</el-button
                >
            </div>
        </div>
        <textarea ref="codeEditor" class="code-editor" v-model="options.value"></textarea>
    </div>
</template>

<script>
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/hint/show-hint.css'
import CodeMirror from 'codemirror/lib/codemirror'
import 'codemirror/mode/javascript/javascript' // 语言模式引入
import 'codemirror/mode/css/css' // 语言模式引入
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/hint/javascript-hint'
// 引入主题 可以从 codemirror/theme/ 下引入多个
import 'codemirror/theme/gruvbox-dark.css'
export default {
    name: 'CodeEditor',
    props: {
        // 编辑器标题
        title: {
            type: String,
            default: '示例代码'
        },
        // 代码只读
        readOnly: {
            type: Boolean,
            default: true
        },
        // 代码语言类型
        mode: {
            type: String,
            default: 'javascript'
        },
        // 代码内容
        code: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            options: {
                value: this.code, // 代码内容
                mode: 'javascript', // 编辑器的语言
                theme: 'gruvbox-dark', // 主题
                indentWithTabs: true,
                smartIndent: true,
                lineNumbers: true, // 显示行号
                lineWrapping: true, // 超长行自动换行
                readOnly: this.readOnly // 只读
                // matchBrackets: true
            },
            myCodeEditor: null
        }
    },
    mounted() {
        this.codeEditorInit()
    },
    methods: {
        codeEditorInit() {
            const { options } = this
            console.log(options, 'options')
            // this.myCodeEditor = CodeMirror(this.$refs.codeEditor, options)
            this.myCodeEditor = CodeMirror.fromTextArea(this.$refs.codeEditor, options)
            // 代码自动提示功能，记住使用cursorActivity事件不要使用change事件，这是一个坑，那样页面直接会卡死
            // myCodeEditor.on('cursorActivity', function () {
            //     myCodeEditor.showHint()
            // })
        },
        onCopySuccess() {
            this.$message.success('复制成功')
        },
        onCopyError() {
            this.$message.error('复制失败')
        }
    }
}
</script>

<style lang="scss" scoped>
.code-editor-container {
    .header {
        background-color: #333;
        color: #fff;
        display: flex;
        justify-content: space-between;
        padding: 16px 10px;
        font-size: 14px;

        .copy-btn {
            cursor: pointer;
            padding: 0;
        }
    }
}

// .code-editor {
//     width: 100%;
//     height: 100px;
//     animation: editorShow 3s;
//     // overflow: hidden;
// }

// @keyframes editorShow {
//     0% {
//         height: 0;
//     }
//     100% {
//         height: 100px;
//     }
// }
</style>
