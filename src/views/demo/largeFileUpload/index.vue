<template>
    <Demo :data="demoInfo">
        <!-- <uploader :options="options" class="uploader-example" :auto-start="false">
            <uploader-unsupport></uploader-unsupport>
            <uploader-drop>
                <p>Drop files here to upload or</p>
                <uploader-btn>select files</uploader-btn>
                <uploader-btn :attrs="attrs">select images</uploader-btn>
                <uploader-btn :directory="true">select folder</uploader-btn>
            </uploader-drop>
            <uploader-list></uploader-list>
        </uploader> -->
        <div style="text-align: center">开发中...</div>
    </Demo>
</template>

<script setup>
import Demo from '@/components/Demo/index.vue';

const demoInfo = { title: '大文件上传', url: '' };
</script>

<style lang="scss" scoped>
.uploader-example {
    width: 100%;
    padding: 15px;
    margin: 40px auto 0;
    font-size: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}
.uploader-example .uploader-btn {
    margin-right: 4px;
}
.uploader-example .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
}
</style>
