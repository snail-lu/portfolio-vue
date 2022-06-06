<template>
    <div :style="{ width, height }"></div>
</template>

<script>
import * as echarts from 'echarts/core'
import { TitleComponent, TooltipComponent, GridComponent, ToolboxComponent } from 'echarts/components'
import { LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([TitleComponent, TooltipComponent, GridComponent, LineChart, CanvasRenderer, UniversalTransition, ToolboxComponent])
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
        this.initCharts()
    },
    beforeMount() {
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
            function randomData() {
                now = new Date(+now + oneDay)
                value = value + Math.random() * 21 - 10
                return {
                    // name: now.toString(),
                    name: echarts.number.parseDate(now),
                    value: [[now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'), Math.round(value)]
                }
            }
            let data = []
            let now = new Date(2022, 9, 3)
            let oneDay = 24 * 3600 * 1000
            let value = Math.random() * 1000
            for (var i = 0; i < 1000; i++) {
                data.push(randomData())
            }
            console.log(data, 'data')

            const option = {
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        params = params[0]
                        var date = new Date(params.name)
                        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1]
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
                        formatter: '{MM}月'
                    }
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '100%'],
                    splitLine: {
                        show: false
                    },
                    max: function (value) {
                        return value.max + 20
                    },
                    min: function (value) {
                        return value.min - 100
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
            }
            setInterval(() => {
                for (var i = 0; i < 5; i++) {
                    data.shift()
                    data.push(randomData())
                }
                this.chart.setOption({
                    series: [
                        {
                            data: data
                        }
                    ]
                })
            }, 1000)

            this.chart.setOption(option)
        }
    }
}
</script>

<style lang="scss" scoped></style>
