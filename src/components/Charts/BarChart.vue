<template>
    <div :style="{ width, height }"></div>
</template>

<script>
import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

let chart = null;
echarts.use([GridComponent, BarChart, CanvasRenderer]);
export default {
    props: {
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '100%'
        }
    },
    mounted() {
        this.initCharts();
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.resizeCharts);
    },
    methods: {
        initCharts() {
            chart = echarts.init(this.$el);
            this.setOptions();
            window.addEventListener('resize', this.resizeCharts);
        },
        resizeCharts() {
            chart && chart.resize();
        },
        setOptions() {
            const option = {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                grid: {
                    top: '10%',
                    left: '10%',
                    right: '5%',
                    bottom: '15%'
                },
                series: [
                    {
                        data: [120, 200, 150, 80, 70, 110, 130],
                        type: 'bar'
                    }
                ]
            };

            chart.setOption(option);
        }
    }
};
</script>

<style lang="scss" scoped></style>
