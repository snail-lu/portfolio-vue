<template>
    <div :style="{ width, height }"></div>
</template>

<script>
import * as echarts from 'echarts/core';
import { TitleComponent, TooltipComponent, VisualMapComponent } from 'echarts/components';
import { MapChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import mapData from '@/assets/data/map.json';

let chart = null;
echarts.use([TitleComponent, TooltipComponent, MapChart, CanvasRenderer, UniversalTransition, VisualMapComponent]);
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
            ];
            let item = [];
            provincesName.forEach((it) => {
                // 生成随机数
                const min = 10000;
                const max = 99999;
                const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
                let obj = {
                    code: '12',
                    area: it,
                    name: it,
                    sales: randomNum,
                    value: randomNum
                };
                item.push(obj);
            });

            this.loadMap(item, 'China');
        },
        loadMap(item, name) {
            if (mapData) {
                echarts.registerMap(name, mapData);
                let option = {
                    title: {
                        text: '全国销售额统计图',
                        left: 'center',
                        textStyle: {
                            color: '#fff',
                            fontWeight: 'normal'
                        },
                        top: '10%'
                    },
                    tooltip: {
                        formatter: function (params) {
                            if (params.data) {
                                return `${params.name} <br />销售额:${params.data.sales}`;
                            } else {
                                return params.name + '<br>' + '销售额:' + 0;
                            }
                        }
                    },
                    visualMap: {
                        type: 'continuous',
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
                                pixelRatio: 4,
                                title: '保存为图片'
                            }
                        }
                    },
                    series: [
                        {
                            type: 'map',
                            map: name,
                            selectedMode: 'false', // 是否允许选中多个区域
                            roam: true, // 开启缩放和移动
                            label: {
                                show: true
                            },
                            emphasis: {
                                label: {
                                    show: true
                                }
                            },
                            data: item
                        }
                    ]
                };
                chart.setOption(option);
            } else {
                alert('无法加载该地图');
            }
        }
    }
};
</script>

<style lang="scss" scoped></style>
