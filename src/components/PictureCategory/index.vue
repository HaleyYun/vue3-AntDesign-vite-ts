<script setup  lang='ts'>
import * as echarts from "echarts"
// import { } from 'vue-router'
import { ref, onMounted } from 'vue'

const props = defineProps({
    gazingDuration: {
        type: Number,
    },
    defaultGazingDuration: {
        type: Number,
    },
    customForwardDelayTime: {
        type: Number,
    },
    customForwardCorrectRatio: {
        type: Number,
    },
    defaultForwardDelayTime: {
        type: Number,
    },
    defaultForwardCorrectRatio: {
        type: Number,
    },
    way: {
        type: Number,
    },
    way1: {
        type: Number,
    },
    way2: {
        type: Number,
    },
    way_eye: {
        type: Number,
    },
    way_eye1: {
        type: Number,
    },
    way_eye2: {
        type: Number,
    },
    way_eye3: {
        type: Number,
    }
})


let charts = ref();
let charts1 = ref();
let charts2 = ref();

let charts3 = ref();
let charts4 = ref();
let charts5 = ref();
let charts6 = ref();
onMounted(() => {

    if (props.way == 1) {
        let Mycharts = echarts.init(charts.value)
        let option = {
            xAxis: {
                type: 'category',
                data: ['用户数据', '常模数据']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [props.gazingDuration, props.defaultGazingDuration],
                    type: 'bar'
                }
            ]
        };
        Mycharts.setOption(option)
    }

    if (props.way1 == 2) {
        let Mycharts1 = echarts.init(charts1.value)
        let option = {
            xAxis: {
                type: 'category',
                data: ['用户眼跳延时时间(正向)', '用户眼跳正确率(正向)']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [props.customForwardDelayTime, props.customForwardCorrectRatio],
                    type: 'bar'
                }
            ]
        };
        Mycharts1.setOption(option)
    }

    if (props.way2 == 3) {
        let Mycharts2 = echarts.init(charts2.value)
        let option = {
            xAxis: {
                type: 'category',
                data: ['常规眼跳延时时间(正向)', '常规眼跳正确率(正向)']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [props.defaultForwardDelayTime, props.defaultForwardCorrectRatio],
                    type: 'bar'
                }
            ]
        };
        Mycharts2.setOption(option)
    }

    if (props.way_eye == 1) {
        let Mycharts3 = echarts.init(charts3.value)
        let option = {
            xAxis: {
                type: 'category',
                data: ['用户数据', '常模数据']
            },
            grid: {
                x: 42,
                x2: 50,
                y2: 55
            },
            // grid: {
            //     top: "15%",
            //     left: "2%",
            //     // right: "2%",
            //     // bottom: "2%",
            //     containLabel: true
            // },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [props.gazingDuration, props.defaultGazingDuration],
                    type: 'bar'
                }
            ]
        };
        Mycharts3.setOption(option)
    }

    if (props.way_eye1 == 2) {
        let Mycharts4 = echarts.init(charts4.value)
        let option = {
            xAxis: {
                type: 'category',
                data: ['用户眼跳延时时间(正向)', '用户眼跳正确率(正向)']
            },
            grid: {
                x: 42,
                x2: 50,
                y2: 55
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [props.customForwardDelayTime, props.defaultForwardDelayTime],
                    type: 'bar'
                }
            ]
        };
        Mycharts4.setOption(option)
    }

    if (props.way_eye2 == 3) {
        let Mycharts5 = echarts.init(charts5.value)
        let option = {
            xAxis: {
                type: 'category',
                data: ['常规眼跳延时时间(正向)', '常规眼跳正确率(正向)']
            },
            grid: {
                x: 42,
                x2: 50,
                y2: 55
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [props.customForwardCorrectRatio, props.defaultForwardCorrectRatio],
                    type: 'bar'
                }
            ]
        };
        Mycharts5.setOption(option)
    }


    if (props.way_eye3 == 4) {
        let Mycharts6 = echarts.init(charts6.value)
        let option = {
            xAxis: {
                type: 'category',
                data: ['常规眼跳延时时间(正向)', '常规眼跳正确率(正向)']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [100, 50],
                    type: 'bar'
                }
            ]
        };
        Mycharts6.setOption(option)
    }

})

</script>
<template>
    <div v-if="way == 1" class="charts" ref="charts"></div>
    <div v-if="way1 == 2" class="charts" ref="charts1"></div>
    <div v-if="way2 == 3" class="charts" ref="charts2"></div>
    <div v-if="way_eye == 1" class="charts " ref="charts3"></div>
    <div v-if="way_eye1 == 2" class="charts" ref="charts4"></div>
    <div v-if="way_eye2 == 3" class="charts" ref="charts5"></div>
    <div v-if="way_eye3 == 4" class="charts" ref="charts6"></div>
</template>

<style lang='less' scoped>
.charts {
    width: 100%;
    height: 100%;
}
</style>