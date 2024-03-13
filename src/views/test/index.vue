<template>
    <div class="test-container">
        <page-editor ref="pageEditor" />
    </div>
</template>

<script setup>
import PageEditor from '@/components/PageEditor/PageEditor.vue';
</script>

<style lang="scss" scoped>
.test-container {
    background-color: #fff;
    width: 100vw;
    height: 100vh;
}

</style>
