<template>
    <div class="demo-list-container">
        <el-row class="demo-list" :gutter="40">
            <el-col class="demo-item" v-for="demo in demoList" :key="demo.path" :span="8">
                <!-- <div class="grid-content flex-box-column flex-h-end" @click="pushUrl(demoItem.path)">
                    <div class="demo-info">
                        <div class="demo-item-title">{{ demoItem.title }}</div>
                        <div class="demo-item-desc">{{ demoItem.desc }}</div>
                    </div>
                </div> -->
                <card :data="demo" />
            </el-col>
        </el-row>
    </div>
</template>

<script>
import config from '@/config/index'
import Card from '@/components/Card'
export default {
    components: {
        Card
    },
    data() {
        return {}
    },
    computed: {
        demoList() {
            return config.demoList || []
        }
    },

    methods: {
        pushUrl(path) {
            this.$router.push({ path: `/demo/${path}` })
        }
    }
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
}

.demo-list {
    padding: 50px 25%;

    .demo-item {
        margin-bottom: 20px;
    }
}
</style>
