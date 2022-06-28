<template>
    <div :style="{ width, height }"></div>
</template>

<script>
import * as echarts from 'echarts/core';
import { TitleComponent, TooltipComponent, GridComponent, ToolboxComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TitleComponent, TooltipComponent, GridComponent, LineChart, CanvasRenderer, UniversalTransition, ToolboxComponent]);
let chart = null;
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
    beforeDestroy() {
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
            function randomData() {
                now = new Date(+now + steps);
                value = value + Math.random() * 21 - 10;
                return {
                    name: now.toString(),
                    // value: [[now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'), Math.round(value)]
                    value: [now, Math.round(value)]
                };
            }
            let data = [];
            let now = new Date() - 60 * 1000;
            let steps = 1000;
            let value = Math.random() * 1000;
            for (var i = 0; i < 60; i++) {
                data.push(randomData());
            }

            const option = {
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        params = params[0];
                        var date = new Date(params.name);
                        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
                    },
                    axisPointer: {
                        animation: false
                    }
                },
                xAxis: {
                    type: 'time',
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        formatter: '{HH}:{mm}:{ss}',
                        hideOverlap: true
                    }
                },
                grid: {
                    top: '10%',
                    left: '10%',
                    right: '5%',
                    bottom: '15%'
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '100%'],
                    splitLine: {
                        show: false
                    },
                    max: function (value) {
                        return value.max + 20;
                    },
                    min: function (value) {
                        return value.min - 100;
                    }
                },
                series: [
                    {
                        name: 'Fake Data',
                        type: 'line',
                        showSymbol: false,
                        data: data,
                        itemStyle: {
                            color: 'rgba(255, 255, 255, 1)'
                        }
                    }
                ]
            };
            setInterval(() => {
                data.shift();
                data.push(randomData());
                chart.setOption({
                    series: [
                        {
                            data: data
                        }
                    ]
                });
            }, 1000);

            chart.setOption(option);
        }
    }
};
</script>

<style lang="scss" scoped></style>
