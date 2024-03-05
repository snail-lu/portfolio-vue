<template>
    <div class="test-container">
        <div class="design-container">
            <page-editor ref="pageEditor" :list="targetList" @choose="onChoose" />
            <!-- <div class="col-content">
                    <div class="col-content-title flex-box flex-h-between flex-v-center">
                        页面编辑
                        <div>
                            <span class="save-btn">保存</span>
                            <span class="preview-btn">预览</span>
                        </div>
                    </div>
                    <div class="editor-box">
                    </div>
                </div> -->
        </div>
    </div>
</template>

<script setup>
import PageEditor from '@/components/PageEditor/PageEditor.vue';

const targetList = ref([]);

const pageEditor = ref(null);
</script>

<style lang="scss" scoped>
.test-container {
    background-color: #fff;
    width: 100vw;
    height: 100vh;
}

.design-container {
    min-height: 100vh;
    display: flex;
    box-sizing: border-box;

    .col-2 {
        width: 20%;
    }

    .col-8 {
        width: 80%;
    }

    .col-content {
        .save-btn {
            display: inline-block;
            background-color: hsl(204, 88%, 48%);
            height: 25px;
            width: 50px;
            text-align: center;
            line-height: 25px;
            color: #fff;
            font-size: 14px;
            border-radius: 4px;
            cursor: pointer;
        }

        .preview-btn {
            border: 1px solid #999;
            display: inline-block;
            height: 25px;
            width: 50px;
            text-align: center;
            line-height: 25px;
            color: #333;
            font-size: 14px;
            border-radius: 4px;
            cursor: pointer;
            margin-left: 10px;
        }
    }
}
</style>
