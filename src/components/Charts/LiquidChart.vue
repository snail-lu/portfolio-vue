<template>
    <div :style="{ width, height }"></div>
</template>

<script>
import * as echarts from 'echarts/core'
import 'echarts-liquidfill'

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
            let value = 66 / 100
            const option = {
                series: [
                    {
                        type: 'liquidFill',
                        radius: '75%',
                        center: ['51%', '50%'],
                        data: [0.5, 0.45], // data个数代表波浪数
                        color: ['#8190E3', '#71B1FC'],
                        outline: {
                            // 轮廓设置
                            show: true,
                            borderDistance: 0, // 边框与球中间间距
                            itemStyle: {
                                borderWidth: 5,
                                borderColor: '#7ccef4'
                            }
                        },
                        itemStyle: {
                            normal: {
                                shadowColor: 'rgba(22, 22, 22, 0.5)',
                                shadowBlur: 10
                            }
                        },
                        backgroundStyle: {
                            borderWidth: 0,
                            // borderColor: '#EEF2FD',
                            // shadowColor: '#008DCE',
                            color: '#001348'
                        },
                        label: {
                            position: ['50%', '35%'],
                            formatter: (value * 100).toFixed(1) + '%',
                            textStyle: {
                                color: '#fff',
                                fontSize: 10
                            }
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
