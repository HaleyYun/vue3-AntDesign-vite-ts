<script setup  lang='ts'>
import * as echarts from "echarts"
import { } from 'vue-router'
import { ref, onMounted,watch } from 'vue'

const props = defineProps({
    chartX: {
        type: Array,
    },
    chartY: {
        type: Array,
    }
})

let charts = ref();

const showChart = ()=>{
    let Mycharts = echarts.init(charts.value)
    let option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(64, 183, 97,0)'
                        }, {
                            offset: 0.5,
                            color: 'rgba(255, 255, 255,1)',
                        }, {
                            offset: 1,
                            color: 'rgba(64, 183, 97,0)'
                        }],
                        global: false
                    }
                },
            },
        },
        grid: {
            top: '15%',
            left: '5%',
            right: '5%',
            bottom: '15%',
            // containLabel: true
        },
        xAxis: [{
            type: 'category',
            axisLine: {
                show: true
            },
            splitArea: {
                // show: true,
                color: '#f00',
                lineStyle: {
                    color: '#f00'
                },
            },
            axisLabel: {
                color: '#000'
            },
            splitLine: {
                show: false,
            },
            boundaryGap: false,
            data: props.chartX,
        }],
        yAxis: [{
            type: 'value',
            min: 0,
            // max: 140,
            splitNumber: 4,
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    color: '#D8D8D8'
                }
            },
            axisLine: {
                show: false,
            },
            axisLabel: {
                show: true,
                margin: 20,
                textStyle: {
                    color: '#000',
                },
            },
            axisTick: {
                show: false,
            },
        }],
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
            data: ['筛查数量']
        },
        series: [{
            name: '筛查数量',
            type: 'line',
            smooth: false, //是否平滑
            showAllSymbol: true,
            symbol: 'circle',
            symbolSize: 6,
            label: {
                show: true,
                position: 'bottom',
                textStyle: {
                    color: 'rgba(64, 183, 97, 1)',
                }
            },
            itemStyle: {
                color: "rgba(64, 183, 97, 1)",
            },
            tooltip: {
                show: false
            },
            areaStyle: {
                background: 'linear-gradient(180deg, rgba(64,183,97,0.28) 0%, rgba(255,255,255,0) 100%)',
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        offset: 0,
                        color: 'rgba(64, 183, 97, 0.3)'
                    },
                    {
                        offset: .6,
                        color: 'rgba(255, 255, 255,0.7)'
                    },
                    {
                        offset: .8,
                        color: 'rgba(255, 255, 255,0.9)' 
                    },
                    {
                        offset: 1,
                        color: 'rgba(255, 255, 255,1)'
                    }
                    ], false),
                },
                color: 'background: linear-gradient(180deg, rgba(64,183,97,0.28) 0%, rgba(255,255,255,0) 80%);',
                // color: 'rgba(0, 128, 255, 0.5)',
                origin: 'start',
                opacity: 0.8,
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.3)'

            },
            data: props.chartY
        }
        ]
    };
    Mycharts.setOption(option)
}

watch(props, async () => {
    showChart()
})

onMounted(() => {

    showChart()
})


</script>
<template>
    <div class="charts" ref="charts"></div>
</template>

<style lang='less' scoped>
.charts {
    width: 100%;
    height: 300px;
}
</style>