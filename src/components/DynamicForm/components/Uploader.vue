<template>
    <el-upload :file-list="fileList" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" v-bind="$attrs">
        <el-icon><Plus /></el-icon>
    </el-upload>

    <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { Plus } from '@element-plus/icons-vue';

const props = defineProps({
    modelValue: {
        type: Array,
        default: () => []
    }
});
const fileList = reactive(props.modelValue);

const dialogImageUrl = ref('');
const dialogVisible = ref(false);

const handleRemove = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles);
};

const handlePictureCardPreview = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url;
    dialogVisible.value = true;
};
</script>

<style lang="scss" scoped></style>
