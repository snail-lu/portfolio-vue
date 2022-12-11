<template>
    <div class="demo-list-container">
        <el-row class="demo-list" :gutter="20" v-if="loadingStatus === '加载成功'">
            <el-col class="demo-item" v-for="demo in demoList" :key="demo.path" :sm="12" :md="12" :lg="8">
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

const demoList = ref([]);

const instance = getCurrentInstance();
const loadingStatus = ref('加载中'); //  加载中 | 加载成功 | 加载失败
async function getDemoList() {
    try {
        let res = await instance.proxy.req({
            url: '/demo/list'
        });
        if (res.result && res.result.list) {
            demoList.value = res.result.list;
            loadingStatus.value = '加载成功';
        }
    } catch (e) {
        console.log(e, 'e');
        loadingStatus.value = '加载失败';
    }
}

getDemoList();

// 刷新
function onRefresh() {
    loadingStatus.value = '加载中';
    getDemoList();
}
</script>

<style lang="scss" scoped>
@for $i from 0 through 30 {
    .bg-color#{$i} {
        color: #000;
        background-image: linear-gradient(
            random(360) + deg,
            rgba(random(255), random(255), random(255), 0.5),
            rgba(random(255), random(255), random(255), 0.5)
        );
    }
}

.demo-list-container {
    overflow-x: hidden;
    padding-top: 60px;
}

.demo-list {
    padding: 50px 25%;

    .demo-item {
        margin-bottom: 20px;
    }
}

.loading-box {
    height: 100vh;
}

.footer {
    text-align: center;
    margin-bottom: 20px;
    font-size: 12px;
    color: #999;

    .link {
        text-decoration: underline;
    }
}
</style>
