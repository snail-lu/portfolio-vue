<template>
    <div>
        <code-editor :code="code" :read-only="false" />
    </div>
</template>

<script>
import CodeEditor from '@/components/CodeEditor'
export default {
    components: {
        CodeEditor
    },
    data() {
        return {
            code: 'function myScript(){\n  return 100;\n}\n'
        }
    }
}
</script>

<style lang="scss" scoped></style>
