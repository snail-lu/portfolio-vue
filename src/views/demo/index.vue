<template>
    <div class="demo-list-container">
        <el-row class="demo-list" :gutter="40">
            <el-col class="demo-item" v-for="demo in demoList" :key="demo.path" :span="8">
                <card :data="demo" />
            </el-col>
        </el-row>
        <div class="footer">
            Illustration by <a class="link" href="https://icons8.com/illustrations/" target="_blank">Icons 8</a> from
            <a class="link" href="https://icons8.com/illustrations" target="_blank">Ouch!</a>
        </div>
    </div>
</template>

<script>
import Card from '@/components/Card/index.vue';
export default {
    components: {
        Card
    },
    data() {
        return {
            demoList: []
        };
    },

    created() {
        this.getDemoList();
    },

    methods: {
        pushUrl(path) {
            this.$router.push({ path: `/demo/${path}` });
        },
        async getDemoList() {
            let res = await this.req({
                url: '/demo/list'
            });
            if (res.result && res.result.list) {
                this.demoList = res.result.list;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@for $i from 0 through 30 {
    .bg-color#{$i} {
        color: #000;
        background-image: linear-gradient(random(360) + deg,
                rgba(random(255), random(255), random(255), 0.5),
                rgba(random(255), random(255), random(255), 0.5));
    }
}

.demo-list-container {
    overflow-x: hidden;
}

.demo-list {
    padding: 50px 25%;

    .demo-item {
        margin-bottom: 20px;
    }
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
