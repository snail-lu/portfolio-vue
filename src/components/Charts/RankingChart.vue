<template>
    <div :style="{ width, height }"></div>
</template>
<script>
import * as echarts from 'echarts/core'
import { DatasetComponent, GraphicComponent, GridComponent } from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

// 注册必须的组件
echarts.use([DatasetComponent, GraphicComponent, GridComponent, BarChart, CanvasRenderer])

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
            chart: null,
            updateFrequency: 2000,
            startIndex: 10,
            flags: null,
            data: null
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
            var option
            const dimension = 0
            const countryColors = {
                Australia: '#FF6666',
                Canada: '#FFFF00',
                China: '#006699',
                Cuba: '#FF9966',
                Finland: '#0066CC',
                France: '#339933',
                Germany: '#99CC33',
                Iceland: '#99CCCC',
                India: '#333399',
                Japan: '#CCCC00',
                'North Korea': '#990066',
                'South Korea': '#FF9900',
                'New Zealand': '#009966',
                Norway: '#FF6600',
                Poland: '#663366',
                Russia: '#CCCC99',
                Turkey: '#993366',
                'United Kingdom': '#9999CC',
                'United States': '#CC99CC'
            }
            const promise1 = this.req({
                url: '/rankingChart/data',
                method: 'GET'
            })
            const promise2 = this.req({
                url: '/rankingChart/life-expectancy-table',
                method: 'GET'
            })
            Promise.all([promise1, promise2]).then((values) => {
                const flags = values[0]
                const data = values[1]
                const years = []
                for (let i = 0; i < data.length; ++i) {
                    if (years.length === 0 || years[years.length - 1] !== data[i][4]) {
                        years.push(data[i][4])
                    }
                }
                let startYear = years[this.startIndex]
                option = {
                    toolbox: {
                        feature: {
                            saveAsImage: {
                                title: '保存为图片'
                            }
                        }
                    },
                    grid: {
                        top: '18%',
                        left: '5%',
                        right: '20%',
                        bottom: 0
                    },
                    xAxis: {
                        max: 'dataMax',
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        }
                    },
                    dataset: {
                        source: data.slice(1).filter(function (d) {
                            return d[4] === startYear
                        })
                    },
                    yAxis: {
                        type: 'category',
                        inverse: true,
                        max: 4,
                        axisLabel: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        animationDuration: 300,
                        animationDurationUpdate: 300
                    },
                    series: [
                        {
                            realtimeSort: true,
                            seriesLayoutBy: 'column',
                            type: 'bar',
                            itemStyle: {
                                borderRadius: [5, 5, 5, 5],
                                color: function (param) {
                                    return countryColors[param.value[3]] || '#5470c6'
                                }
                            },
                            encode: {
                                x: dimension,
                                y: 3
                            },
                            label: {
                                show: true,
                                precision: 1,
                                position: 'right',
                                valueAnimation: true,
                                fontFamily: 'sans-serif',
                                color: '#fff'
                            }
                        }
                    ],
                    // Disable init animation.
                    animationDuration: 0,
                    animationDurationUpdate: this.updateFrequency,
                    animationEasing: 'linear',
                    animationEasingUpdate: 'linear'
                    // graphic: {
                    //     elements: [
                    //         {
                    //             type: 'text',
                    //             right: 160,
                    //             bottom: 60,
                    //             style: {
                    //                 text: startYear,
                    //                 font: 'bolder 80px monospace',
                    //                 fill: 'rgba(100, 100, 100, 1)'
                    //             },
                    //             z: 100
                    //         }
                    //     ]
                    // }
                }
                // console.log(option);
                this.option = option
                this.flags = flags
                this.data = data
                this.chart.setOption(option)
                this.updateData(years)
            })
        },
        updateData(years) {
            const { updateFrequency, startIndex } = this
            for (let i = startIndex; i < years.length - 1; ++i) {
                setTimeout(() => {
                    this.updateYear(years[i + 1])
                }, (i - startIndex) * updateFrequency)
            }
        },
        updateYear(year) {
            const { option } = this
            let source = this.data.slice(1).filter(function (d) {
                return d[4] === year
            })
            option.series[0].data = source
            // option.graphic.elements[0].style.text = year
            this.chart.setOption(option)
        }
    }
}
</script>
