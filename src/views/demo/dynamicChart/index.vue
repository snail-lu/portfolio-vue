<template>
    <div class="dynamic-charts-container">
        <div class="page-title">
            全国销售数据可视化平台
            <div class="date-time flex-box flex-v-center">
                {{ time }}
                <div class="btn">
                    <full-screen-button />
                </div>
            </div>
        </div>
        <el-row :gutter="10" class="page-content">
            <el-col :xs="24" :sm="24" :md="6" :lg="6" class="page-content-col">
                <div class="grid-content flex-box-column flex-h-around">
                    <panel title="销售额" height="32%">
                        <count-chart />
                    </panel>
                    <panel title="销售目标完成度" height="32%">
                        <liquid-chart />
                    </panel>
                    <panel title="销售额排名" height="32%">
                        <ranking-chart />
                    </panel>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" class="page-content-col">
                <div class="grid-content flex-box-column flex-h-around">
                    <panel :showBgColor="false">
                        <map-chart />
                    </panel>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="6" :lg="6" class="page-content-col">
                <div class="grid-content flex-box-column flex-h-around">
                    <panel title="热销单品分布" height="32%">
                        <pie-chart />
                    </panel>
                    <panel title="店铺库存" height="32%">
                        <bar-chart />
                    </panel>
                    <panel title="今日销售走势" height="32%">
                        <line-chart />
                    </panel>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { getNowTime } from '@/utils/date';
import Panel from './components/Panel.vue';
import RankingChart from '@/components/Charts/RankingChart.vue';
import LineChart from '@/components/Charts/LineChart.vue';
import PieChart from '@/components/Charts/PieChart.vue';
import BarChart from '@/components/Charts/BarChart.vue';
import MapChart from '@/components/Charts/MapChart.vue';
import LiquidChart from '@/components/Charts/LiquidChart.vue';
import CountChart from '@/components/Charts/CountChart.vue';
import FullScreenButton from '@/components/FullScreenButton/index.vue';
export default {
    components: {
        Panel,
        RankingChart,
        LineChart,
        PieChart,
        BarChart,
        MapChart,
        LiquidChart,
        CountChart,
        FullScreenButton
    },
    data() {
        return {
            time: '',
            timer: null
        };
    },
    created() {
        this.initTime();
    },
    beforeUnmount() {
        // 清理定时器
        clearInterval(this.timer);
        this.timer = null;
    },
    methods: {
        // 初始化时间
        initTime() {
            this.timer = setInterval(() => {
                this.time = getNowTime();
            }, 200);
        }
    }
};
</script>

<style lang="scss" scoped>
.dynamic-charts-container {
    width: 100%;
    height: 100vh;
    // overflow: hidden;
    overflow-x: hidden;
    background: url('../../../assets/images/charts_bg.jpeg') no-repeat;
    background-position: center center;
    background-size: cover;

    .page-title {
        background: url('../../../assets/images/charts_nav.png') bottom center no-repeat;
        text-align: center;
        height: 80px;
        line-height: 80px;
        font-size: 20px;
        color: #fff;
        position: relative;
        margin-bottom: 5px;

        .date-time {
            position: absolute;
            top: 4px;
            right: 20px;
            line-height: 1;
            font-size: 14px;

            .btn {
                margin-left: 6px;
            }
        }
    }

    .page-content {
        height: calc(100vh - 85px);

        &-col {
            height: 100%;
        }
    }
}

.grid-content {
    width: 100%;
    height: 100%;
    padding: 0 16px;
    box-sizing: border-box;
}
</style>
