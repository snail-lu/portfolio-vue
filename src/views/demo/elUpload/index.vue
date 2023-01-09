<template>
    <demo :data="demoInfo">
        <el-card class="card-box">
            <template #header>
                <div class="header">方式1：即时上传</div>
            </template>

            <el-upload name="importFile" :action="commonUrls.importUrl" :on-error="onImportFail" :on-success="onImportSuccess">
                <el-button type="primary">
                    <i-ep-upload />
                    选择文件并上传</el-button
                >
                <template #tip>
                    <div class="el-upload__tip">在action属性上绑定上传接口地址，利用on-success或on-error监听上传结果</div>
                </template>
            </el-upload>
        </el-card>
        <el-card class="card-box">
            <template #header>
                <div class="header">方式2：延时上传</div>
            </template>
            <el-upload
                name="importFile"
                ref="upload2"
                :action="commonUrls.importUrl"
                :on-error="onImportFail"
                :on-success="onImportSuccess"
                :auto-upload="false"
            >
                <template #trigger>
                    <el-button type="primary"><i-ep-folderOpened />选择文件</el-button>
                </template>
                <el-button type="success" @click="clickToUpload2" class="ml-3"><i-ep-upload />上传</el-button>
                <template #tip>
                    <div class="el-upload__tip">auto-upload设为false，文件选择后不会立即上传，后续可以通过调用el-upload的submit()方法上传</div>
                </template>
            </el-upload>
        </el-card>
        <el-card class="card-box">
            <template #header>
                <div class="header">上传方式3：自定义上传</div>
            </template>
            <el-upload class="upload-add-demo" action="#" ref="upload3" multiple :limit="3" :http-request="httpUploadFile" :auto-upload="false">
                <template #trigger>
                    <el-button type="primary"><i-ep-folderOpened />选择文件</el-button>
                </template>

                <el-button type="success" @click="clickToUpload3" class="ml-3"><i-ep-upload />上传</el-button>
                <template #tip>
                    <div class="el-upload__tip">
                        action需要使用任意字段填充，http-request上绑定自定义上传方法，如果需要延时上传，仿照上传方式2设置
                    </div>
                </template>
            </el-upload>
        </el-card>
    </demo>
</template>

<script setup>
import axios from 'axios';
import Demo from '@/components/Demo/index.vue';
import { getCurrentInstance, ref } from 'vue';

const commonUrls = {
    importUrl: '/api/fileUpload'
};
const demoInfo = {
    title: 'el-upload文件上传用例',
    url: 'https://github.com/Snail-Lu/portfolio-vue/blob/main/src/views/demo/elUpload/index.vue'
};
const instance = getCurrentInstance();
// 上传成功，需要注意只要接口调用成功就会进入该回调
const onImportSuccess = (res) => {
    if (res.status === 'OK') {
        instance.proxy.$message({
            type: 'suceess',
            message: res.message
        });
    } else {
        instance.proxy.$message({
            type: 'error',
            message: res.message
        });
    }
};

// 上传失败
const onImportFail = (err) => {
    console.log(err, 'error');
    instance.proxy.$message({
        type: 'error',
        message: `上传失败${err}`
    });
};

// 上传
const httpUploadFile = (content) => {
    const file = content.file,
        fileType = file.type,
        isImage = fileType.indexOf('image') != -1,
        isLt2M = file.size / 1024 / 1024 < 2;
    // 这里常规检验，看项目需求而定
    if (!isImage) {
        instance.proxy.$message.error('只能上传图片格式png、jpg、gif!');
        return;
    }
    if (!isLt2M) {
        instance.proxy.$message.error('只能上传图片大小小于2M');
        return;
    }
    // 根据后台需求数据格式
    const form = new FormData();
    // 文件对象
    form.append('file', file);

    axios
        .post(commonUrls.importUrl, form, {
            headers: { 'content-type': 'multipart/form-data' }
        })
        .then((res) => {
            // 自行处理各种情况
            const code = res && parseInt(res.code, 10);
            if (code === 200) {
                // xxx
            } else {
                // xxx
            }
        })
        .catch((e) => {
            instance.proxy.$message.error(`上传失败${e}`);
        });
};

// 手动上传
const upload2 = ref(null);
const clickToUpload2 = () => {
    upload2.value.submit();
};

const upload3 = ref(null);
const clickToUpload3 = () => {
    upload3.value.submit();
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-box {
    margin-bottom: 30px;
}
.el-button {
    vertical-align: top;
}
.ml-3 {
    margin-left: 1rem;
}
.header {
    font-size: 18px;
}
</style>
