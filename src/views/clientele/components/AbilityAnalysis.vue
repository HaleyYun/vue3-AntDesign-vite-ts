<!-- 综合能力 -->
<script setup  lang='ts'>
import * as echarts from "echarts"
import { } from 'vue-router'
import { onMounted } from 'vue'
const props = defineProps({
    radarMap: {
        type: Array,
    },
})
onMounted(() => {
    let options = {
        radar: {
            indicator: [
                { name: '记忆能力', max: 10 },
                { name: '言语理解', max: 10 },
                { name: '数据逻辑', max: 10 },
                { name: '视空间', max: 10 },
                { name: '情绪状态', max: 10 },
                { name: '执行能力', max: 10 }
            ],
            center: ['40%', '50%'],
            name: {
                textStyle: {
                    color: "#000",
                    fontSize: 14,
                },
            },
            splitLine: {
                lineStyle: {
                    color: "rgba(87, 102, 254,.4)",
                },
            },
            splitArea: {
                show: false,
            },
            axisLine: {
                lineStyle: {
                    color: "rgba(87, 102, 254,.4)",
                },
            },
        },
        series: {
            type: 'radar',
            symbolSize: 8,
            color: "rgba(61, 126, 255, 1)",
            label: {
                show: true,
                formatter: function (params: any) {
                    return params.value;
                },
                color: "#8E88FE",
                align: "center",
                distance: 10,
            },
            data: [
                {
                    value: props.radarMap ? props.radarMap : []
                },
            ],
            areaStyle: {
                normal: {
                    color: "rgba(87, 102, 254,.4)",
                },
            },
            lineStyle: {
                normal: {
                    color: "rgba(87, 102, 254,.4)",
                    shadowColor: '#3D7EFF',
                },
            },
        }
    };
    let Mycharts = echarts.init(<HTMLElement>document.getElementById('charts'))
    Mycharts.setOption(options)
})
</script>
<template>
    <div id="charts" ref="charts"></div>
</template>

<style lang='less' scoped>
#charts {
    width: 100%;
    height: 100%;
}
</style>