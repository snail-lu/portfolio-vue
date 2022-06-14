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
        <div ref="codeEditor"></div>
    </div>
</template>

<script>
import CodeMirror from 'codemirror/lib/codemirror' // 引入codemirror js文件
import 'codemirror/lib/codemirror.css' // 引入codemirror css文件

// import 'codemirror/theme/gruvbox-dark.css' // 引入主题 可以从 codemirror/theme/ 下引入多个
import 'codemirror/theme/lesser-dark.css' // 引入主题 可以从 codemirror/theme/ 下引入多个

import 'codemirror/mode/javascript/javascript' // 引入语言模式 可以从codemirror/mode/ 下引入多个
import 'codemirror/mode/css/css' // 引入语言模式 可以从codemirror/mode/ 下引入多个

// 搜索功能
// find：Ctrl-F (PC), Cmd-F (Mac)
// findNext：Ctrl-G (PC), Cmd-G (Mac)
// findPrev：Shift-Ctrl-G (PC), Shift-Cmd-G (Mac)
// replace：Shift-Ctrl-F (PC), Cmd-Alt-F (Mac)
// replaceAll：Shift-Ctrl-R (PC), Shift-Cmd-Alt-F (Mac)
import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/addon/dialog/dialog'
import 'codemirror/addon/search/searchcursor'
import 'codemirror/addon/search/search'
import 'codemirror/addon/search/jump-to-line'
import 'codemirror/addon/search/matchesonscrollbar'
import 'codemirror/addon/search/match-highlighter'

// 代码提示 具体语言可以从 codemirror/addon/hint/ 下引入多个
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/hint/javascript-hint'
import 'codemirror/addon/hint/css-hint'

// 高亮行
import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/selection/selection-pointer'

// 自动括号匹配
import 'codemirror/addon/edit/matchbrackets'

export default {
    name: 'CodeEditor',
    props: {
        // 编辑器标题
        title: {
            type: String,
            default: '代码编辑器'
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
                theme: 'lesser-dark', // 主题
                indentWithTabs: true, // tab缩进
                smartIndent: true, // 智能缩进
                lineNumbers: true, // 显示行号
                lineWrapping: true, // 超长行自动换行
                readOnly: this.readOnly, // 只读
                matchBrackets: true, // 自动匹配括号
                styleActiveLine: true, // 高亮行功能
                hintOptions: {
                    // 提示选项
                    completeSingle: false
                }
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
            // 在普通元素上创建编辑器
            const myCodeEditor = CodeMirror(this.$refs.codeEditor, options)
            // 在textarea元素上创建编辑器
            // const myCodeEditor = CodeMirror.fromTextArea(this.$refs.codeEditor, options)

            // 代码自动提示功能
            myCodeEditor.on('inputRead', function () {
                myCodeEditor.showHint()
            })
            this.myCodeEditor = myCodeEditor
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
<style lang="scss">
// 编辑器字体大小修改
.CodeMirror {
    font-size: 16px;
}
</style>
<style lang="scss" lang="scss">
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
</style>
