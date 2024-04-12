<!-- 综合能力 -->
<script setup  lang='ts'>
import * as echarts from "echarts"
import { } from 'vue-router'
import { ref, onMounted } from 'vue'
let charts = ref();
const props = defineProps(['line'])
onMounted(() => {
    let data: number[] = []
    let xData: string[] = []
    if (props.line && props.line.length > 0) {
        props.line.forEach((item: any) => {
            xData.push(item.dateTime.slice(5, item.length))
            data.push(item.score)
        })
    }
    let Mycharts = echarts.init(charts.value)
    let option = {
        grid: {
            top: '10%',
            left: "12%"
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: '#fff',
            textStyle: {
                color: '#5c6c7c'
            },
        },
        xAxis: {
            name: "(日期)",
            type: 'category',
            axisLabel: {
                textStyle: {
                    color: '#556677'
                }
            },
            boundaryGap: false,
            data: xData,
            axisTick: {
                show: false
            },
            axisLine: {
                show: true,
                lineStyle: {
                    with: 2,
                    color: '#3D7EFF'
                }
            },
            splitLine: {
                show: true
            }
        },
        yAxis: {
            type: 'value',
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            axisTick: {
                show: false
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#DCE2E8'
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#556677'
                }
            },
        },
        series: [
            {
                type: 'line',
                data: data,
                showAllSymbol: true,
                symbol: 'circle',
                symbolSize: 5,
                lineStyle: {
                    normal: {
                        color: "#3D7EFF",
                        shadowColor: '#3D7EFF',
                    },
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                            offset: 0,
                            color: 'rgba(255, 255, 255, 0)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(61, 126, 255, 0.5)'
                        }
                        ], false),
                    }
                },
            }
        ]
    }
    Mycharts.setOption(option)
})
</script>
<template>
    <div class="charts" ref="charts"></div>
</template>

<style lang='less' scoped>
.charts {
    width: 100%;
    height: 100%;
}
</style>