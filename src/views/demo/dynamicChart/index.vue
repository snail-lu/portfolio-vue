<template>
    <div class="dynamic-charts-container">
        <div class="title">
            <!-- 实时销售数据可视化平台 -->
            <div class="date-time">
                {{ time }}
                <i class="el-icon-full-screen" :title="isScreenFull ? '退出全屏' : '全屏'" @click="handleFullScreen"></i>
            </div>
        </div>
        <el-row :gutter="10">
            <el-col :xs="24" :sm="24" :md="6" :lg="6">
                <div class="grid-content">
                    <panel title="销售额">
                        <div class="amount-item flex-box flex-h-between flex-v-center">
                            <span class="label">全年</span>
                            <span class="amount">143244321434</span>
                        </div>
                        <div class="amount-item flex-box flex-h-between flex-v-center">
                            <span class="label">本月</span>
                            <span class="amount">324325343</span>
                        </div>
                        <div class="amount-item flex-box flex-h-between flex-v-center">
                            <span class="label">今日</span>
                            <span class="amount">423432</span>
                        </div>
                    </panel>
                    <panel title="销售额排名"> </panel>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12">
                <div class="grid-content">
                    <panel>
                        <div class="nationwide-box"></div>
                    </panel>
                    <panel title="销售额统计">
                        <div class="nationwide-box"></div>
                    </panel>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="6" :lg="6">
                <div class="grid-content">
                    <panel title="全国顾客实时总数">
                        <div class="nationwide-box"></div>
                    </panel>
                    <panel title="店铺库存">
                        <div class="nationwide-box"></div>
                    </panel>
                </div>
            </el-col>
        </el-row>
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
    width: 100%;
    overflow-x: hidden;
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

.grid-content {
    .amount-item {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }

        .label {
            font-size: 20px;
        }
        .amount {
            position: relative;
            margin-right: 20px;
            font-size: 30px;
            line-height: 1;

            &::after {
                position: absolute;
                content: '元';
                display: block;
                bottom: 3px;
                right: -16px;
                font-size: 10px;
                line-height: 1;
            }
        }
    }
}
</style>
