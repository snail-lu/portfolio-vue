<template>
    <div class="upload-demo-container">
        <e-icon-picker v-model="icon" :options="options" />
        <e-icon :icon-name="icon" />
        <el-card class="box-card">
            <div slot="header" class="header">
                <span>上传方式1：即时上传</span>
                <el-upload
                    class="upload-add-btn"
                    name="importFile"
                    :action="commonUrls.importUrl"
                    :show-file-list="false"
                    :on-error="onImportFail"
                    :on-success="onImportSuccess"
                >
                    <el-button size="mini" class="btn-item" type="primary" icon="el-icon-upload2">上传</el-button>
                </el-upload>
            </div>
            <div class="text item">在action属性上绑定上传接口地址，利用on-success或on-error监听上传结果</div>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="header">
                <span>上传方式2：延时上传</span>
                <el-upload
                    class="upload-add-btn"
                    name="importFile"
                    ref="upload2"
                    :action="commonUrls.importUrl"
                    :on-error="onImportFail"
                    :on-success="onImportSuccess"
                    :auto-upload="false"
                >
                    <el-button size="mini" class="btn-item" type="primary" icon="el-icon-upload2">选择文件</el-button>
                </el-upload>
            </div>
            <div class="text item">
                <div>auto-upload设为false，文件选择后不会立即上传，后续可以通过this.$refs.upload.submit()上传</div>
                <el-button type="primary" @click="clickToUpload('upload2')">上传</el-button>
            </div>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="header">
                <span>上传方式3：自定义上传</span>
                <el-upload class="upload-add-demo" action="#" ref="upload3" multiple :limit="3" :http-request="httpUploadFile" :auto-upload="false">
                    <el-button size="small" type="primary" icon="el-icon-upload2">选择文件</el-button>
                </el-upload>
            </div>
            <div class="text item">
                <div>自定义上传，action需要使用任意字段填充，http-request上绑定自定义上传方法，如果需要延时上传，仿照上传方式2设置</div>
                <el-button type="primary" @click="clickToUpload('upload3')">上传</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    data() {
        return {
            commonUrls: {
                importUrl: '/api/fileUpload'
            },
            icon: ''
        };
    },
    methods: {
        // 上传成功，需要注意只要接口调用成功就会进入该回调
        onImportSuccess(res) {
            if (res.status === 'OK') {
                this.$message({
                    type: 'suceess',
                    message: res.message
                });
            } else {
                this.$message({
                    type: 'error',
                    message: res.message
                });
            }
        },

        // 上传失败
        onImportFail(err) {
            console.log(err, '导入失败回调');
            this.$message({
                type: 'error',
                message: '导入失败'
            });
        },

        // 上传
        httpUploadFile(content) {
            console.log(content, 'params');
            const file = content.file,
                fileType = file.type,
                isImage = fileType.indexOf('image') != -1,
                isLt2M = file.size / 1024 / 1024 < 2;
            // 这里常规检验，看项目需求而定
            if (!isImage) {
                this.$message.error('只能上传图片格式png、jpg、gif!');
                return;
            }
            if (!isLt2M) {
                this.$message.error('只能上传图片大小小于2M');
                return;
            }
            // 根据后台需求数据格式
            const form = new FormData();
            // 文件对象
            form.append('file', file);

            axios
                .post(this.commonUrls.importUrl, form, {
                    headers: { 'content-type': 'multipart/form-data' }
                })
                .then((res) => {
                    //自行处理各种情况
                    const code = res && parseInt(res.code, 10);
                    if (code === 200) {
                        // xxx
                    } else {
                        // xxx
                    }
                })
                .catch((e) => {
                    this.$message.error('上传失败');
                    console.log(e);
                });
        },

        // 手动上传
        clickToUpload(ref) {
            this.$refs[ref].submit();
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.upload-demo-container {
    height: 500px;
    display: flex;
    justify-content: space-between;
}
.box-card {
    width: 480px;
}
.header {
    display: flex;
    justify-content: space-between;
}
</style>
