<template>
    <div class="demo-list-container">
        <el-row class="demo-list" :gutter="20" v-if="loadingStatus === '加载成功'">
            <el-col class="demo-item" v-for="demo in projectsList" :key="demo.path" :sm="12" :md="12" :lg="8">
                <Card :data="demo" />
            </el-col>
        </el-row>
        <div class="loading-box flex-box flex-h-center flex-v-center" v-else>
            <Loading :loading-status="loadingStatus" @refresh="onRefresh" />
        </div>
        <div class="footer">
            Illustration by <a class="link" href="https://icons8.com/illustrations/" target="_blank">Icons 8</a> from
            <a class="link" href="https://icons8.com/illustrations" target="_blank">Ouch!</a>
        </div>
    </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue';
import Card from '@/components/Card/index.vue';
import Loading from '@/components/Loading/index.vue';

const projectsList = ref([]);

const instance = getCurrentInstance();
const loadingStatus = ref('加载中'); //  加载中 | 加载成功 | 加载失败
async function getProjectList() {
    try {
        let res = await instance.proxy.req({
            url: '/project/list'
        });
        if (res.result && res.result.list) {
            projectsList.value = res.result.list;
            loadingStatus.value = '加载成功';
        }
    } catch (e) {
        console.log(e, 'e');
        loadingStatus.value = '加载失败';
    }
}

getProjectList();

// 刷新
function onRefresh() {
    loadingStatus.value = '加载中';
    getProjectList();
}
</script>

<style lang="scss" scoped>
.header {
    text-align: center;
    font-size: 20px;
    height: 70px;
    line-height: 70px;
}

.demo-list-container {
    padding-top: 60px;
    overflow-x: hidden;
}

.demo-list {
    padding: 50px 25%;

    .demo-item {
        margin-bottom: 20px;

        .grid-content {
            cursor: pointer;
            border-radius: 5px;
            background-color: #fff;
            overflow: hidden;

            &:hover {
                box-shadow: 0 0 10px #ccc;
            }
        }

        &-header {
            // background-color: rgb(224, 63, 63);
            color: #fff;
            height: 100px;
            line-height: 100px;
            text-align: center;
        }

        &-content {
            height: 150px;
            padding: 20px 10px 10px 10px;
            text-align: center;
        }

        &-title {
            display: inline-block;
            font-size: 18px;
            margin-bottom: 30px;
            box-sizing: border-box;

            &:hover {
                border-bottom: 1px solid #aaa;
            }
        }

        &-desc {
            color: #999;
            font-size: 13px;
        }
    }
}

.loading-box {
    height: 100vh;
}
.footer {
    text-align: center;
    margin-bottom: 20px;
    font-size: 13px;
    color: #999;

    .link {
        text-decoration: underline;
    }
}
</style>
