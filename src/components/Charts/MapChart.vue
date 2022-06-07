<template>
    <div :style="{ width, height }"></div>
</template>

<script>
import * as echarts from 'echarts/core'
import { TitleComponent, TooltipComponent, VisualMapComponent } from 'echarts/components'
import { MapChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import mapData from '@/assets/data/map.json'

echarts.use([TitleComponent, TooltipComponent, MapChart, CanvasRenderer, UniversalTransition, VisualMapComponent])
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
            let provincesName = [
                '上海',
                '河北',
                '山西',
                '内蒙古',
                '辽宁',
                '吉林',
                '黑龙江',
                '江苏',
                '浙江',
                '安徽',
                '福建',
                '江西',
                '山东',
                '河南',
                '湖北',
                '湖南',
                '广东',
                '广西',
                '海南',
                '四川',
                '贵州',
                '云南',
                '西藏',
                '陕西',
                '甘肃',
                '青海',
                '宁夏',
                '新疆',
                '北京',
                '天津',
                '重庆',
                '香港',
                '澳门',
                '台湾'
            ]
            let item = []
            provincesName.map((it) => {
                // 生成随机数
                const min = 10000
                const max = 99999
                const randomNum = Math.floor(Math.random() * (max - min + 1)) + min
                let obj = {
                    code: '12',
                    area: it,
                    name: it,
                    sales: randomNum,
                    value: randomNum
                }
                item.push(obj)
            })

            this.loadMap(item, 'China')
        },
        loadMap(item, name) {
            if (mapData) {
                echarts.registerMap(name, mapData)
                var option = {
                    title: {
                        text: '全国各省销售额',
                        left: 'center'
                    },
                    tooltip: {
                        formatter: function (params) {
                            if (params.data) {
                                return `${params.name} <br />销售额:${params.data.sales}`
                            } else {
                                return params.name + '<br>' + '销售额:' + 0
                            }
                        }
                    },
                    visualMap: {
                        min: 0,
                        max: 100000,
                        left: 'left',
                        top: 'bottom',
                        text: ['高', '低'],
                        calculable: true,
                        // seriesIndex: [1],
                        inRange: {
                            color: ['#A5DCF4', '#006edd']
                        },
                        show: true
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            saveAsImage: {
                                pixelRatio: 4
                            }
                        }
                    },
                    series: [
                        {
                            type: 'map',
                            mapType: name,
                            selectedMode: 'false', //是否允许选中多个区域
                            label: {
                                normal: {
                                    show: true
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            data: item
                        }
                    ]
                }
                this.chart.setOption(option)
            } else {
                alert('无法加载该地图')
            }
        }
    }
}
</script>

<style lang="scss" scoped></style>
