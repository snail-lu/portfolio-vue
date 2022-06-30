<template>
    <div class="demo-wrapper">
        <code-editor :read-only="false" v-model="code" height="calc(100vh - 100px)" title="代码编辑器（JavaScript）" />
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
            code: 'function myScript(){\n  return 100;\n}\n'
        };
    }
};
</script>

<style lang="scss" scoped>
.demo-wrapper {
    height: calc(100vh - 60px);
}
</style>
