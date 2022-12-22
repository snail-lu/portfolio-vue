<template>
    <div class="example-images-container">
        <el-row class="page-title">小程序项目截图(点击图片可查看大图)</el-row>
        <el-row type="flex" justify="space-between" class="example-box" style="margin: 0 auto;">
            <el-col class="example-item" :span="5" v-for="mpItem in mpList" :key="mpItem.url">
                <el-image
                    style="width: 150px;"
                    :src="mpItem.url"
                    :preview-src-list="previewList">
                </el-image>
                <span class="example-title">{{mpItem.title}}</span>
            </el-col>
        </el-row>

        <el-row class="page-title">权限中心项目截图(点击图片可查看大图)</el-row>
        <el-row type="flex" justify="space-between" class="example-box" style="margin: 0 auto;">
            <el-col class="example-item" :span="24" v-for="backItem in backendList" :key="backItem.url">
                <el-image
                    style="width: 500px;"
                    :src="backItem.url"
                    :preview-src-list="backendPriviewList">
                </el-image>
                <span class="example-title">{{backItem.title}}</span>
            </el-col>
        </el-row>
    </div>
</template>

<script src="./images.js"></script>

<style lang="scss" scoped>
@import './images.scss';
</style>
