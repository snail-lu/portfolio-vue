<template>
    <div :style="{ width, height }"></div>
</template>

<script>
import * as echarts from 'echarts/core'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { PieChart } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([TitleComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer, LabelLayout])

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
    data() {
        return {
            chart: null
        }
    },
    mounted() {
        this.initCharts()
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.resizeCharts)
    },
    methods: {
        initCharts() {
            this.chart = echarts.init(this.$el)
            this.setOptions()
            window.addEventListener('resize', this.resizeCharts)
        },
        resizeCharts() {
            this.chart.resize()
        },
        setOptions() {
            const option = {
                title: {
                    text: '',
                    left: 'center'
                },
                // tooltip: {
                //     trigger: 'item'
                // },
                legend: {
                    orient: 'vertical',
                    left: 'right',
                    textStyle: {
                        color: '#ccc'
                    }
                },
                grid: {
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0
                },
                series: [
                    {
                        type: 'pie',
                        radius: '50%',
                        top: '0%',
                        left: '0%',
                        right: '15%',
                        data: [
                            { value: 1048, name: '手机' },
                            { value: 735, name: '电脑' },
                            { value: 580, name: '平板' },
                            { value: 484, name: '冰箱' },
                            { value: 300, name: '电视' }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        label: {
                            formatter: '{d}%',
                            color: '#ccc'
                        }
                    }
                ]
            }

            this.chart.setOption(option)
        }
    }
}
</script>

<style lang="scss" scoped></style>
