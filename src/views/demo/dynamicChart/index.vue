<template>
    <div class="dynamic-charts-container">
        <div class="title">
            实时销售数据可视化平台
            <div class="date-time">
                {{ time }}
                <i
                    class="el-icon-full-screen"
                    :title="isScreenFull ? '退出全屏' : '全屏'"
                    @click="handleFullScreen"
                ></i>
            </div>
        </div>
        <div class="content flex-box">
            <div>
                <panel title="全国销售额" />
                <panel title="省市销售额排名" />
            </div>
            <div class="flex-item-1">
                <panel />
                <panel title="销售额统计" />
            </div>
            <div>
                <panel title="全国顾客实时总数" />
                <panel title="店铺库存" />
            </div>
        </div>
    </div>
</template>

<script>
import { getNowTime } from '@/utils/date'
import Panel from './components/Panel.vue'
import fullScreenMixins from '@/mixins/fullScreenMixins'
export default {
    mixins: [fullScreenMixins],
    components: {
        Panel
    },
    data() {
        return {
            time: ''
        }
    },
    created() {
        this.initTime()
    },
    methods: {
        // 初始化时间
        initTime() {
            let timer = setInterval(() => {
                this.time = getNowTime()
            }, 200)

            // 清理定时器
            this.$once('hook:beforeDestroy', () => {
                clearInterval(timer)
                timer = null
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.dynamic-charts-container {
    height: 100vh;
    background: url('../../../assets/images/charts_bg.jpeg') top center no-repeat;
}
.title {
    background: url('../../../assets/images/charts_nav.png') top center no-repeat;
    text-align: center;
    height: 80px;
    line-height: 80px;
    font-size: 20px;
    color: #fff;
    position: relative;

    .date-time {
        position: absolute;
        top: 10px;
        right: 20px;
        line-height: 1;
        font-size: 16px;
    }
}
</style>
