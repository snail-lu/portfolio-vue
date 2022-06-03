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
            default: '550px'
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
    methods: {
        initCharts() {
            this.chart = echarts.init(this.$el)
            this.setOptions()
        },
        getFlag(countryName) {
            if (!countryName) {
                return ''
            }
            return (
                flags.find(function (item) {
                    return item.name === countryName
                }) || {}
            ).emoji
        },
        setOptions() {
            var option
            const dimension = 0
            const countryColors = {
                Australia: '#00008b',
                Canada: '#f00',
                China: '#ffde00',
                Cuba: '#002a8f',
                Finland: '#003580',
                France: '#ed2939',
                Germany: '#000',
                Iceland: '#003897',
                India: '#f93',
                Japan: '#bc002d',
                'North Korea': '#024fa2',
                'South Korea': '#000',
                'New Zealand': '#00247d',
                Norway: '#ef2b2d',
                Poland: '#dc143c',
                Russia: '#d52b1e',
                Turkey: '#e30a17',
                'United Kingdom': '#00247d',
                'United States': '#b22234'
            }
            const promise1 = this.req({
                url: 'https://fastly.jsdelivr.net/npm/emoji-flags@1.3.0/data.json',
                method: 'GET'
            })
            const promise2 = this.req({
                url: 'https://fastly.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/asset/data/life-expectancy-table.json',
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
                function getFlag(countryName) {
                    if (!countryName) {
                        return ''
                    }
                    return (
                        flags.find(function (item) {
                            return item.name === countryName
                        }) || {}
                    ).emoji
                }
                let startYear = years[this.startIndex]
                option = {
                    grid: {
                        top: 10,
                        bottom: 30,
                        left: 0,
                        right: 40
                    },
                    xAxis: {
                        max: 'dataMax',
                        axisLabel: {
                            formatter: function (n) {
                                return Math.round(n) + ''
                            }
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
                        max: 10,
                        axisLabel: {
                            show: false,
                            fontSize: 14,
                            formatter: function (value) {
                                return value + '{flag|' + getFlag(value) + '}'
                            },
                            rich: {
                                flag: {
                                    fontSize: 25,
                                    padding: 5
                                }
                            }
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
                                fontFamily: 'monospace'
                            }
                        }
                    ],
                    // Disable init animation.
                    animationDuration: 0,
                    animationDurationUpdate: this.updateFrequency,
                    animationEasing: 'linear',
                    animationEasingUpdate: 'linear',
                    graphic: {
                        elements: [
                            {
                                type: 'text',
                                right: 160,
                                bottom: 60,
                                style: {
                                    text: startYear,
                                    font: 'bolder 80px monospace',
                                    fill: 'rgba(100, 100, 100, 0.25)'
                                },
                                z: 100
                            }
                        ]
                    }
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
            option.graphic.elements[0].style.text = year
            this.chart.setOption(option)
        }
    }
}
</script>
