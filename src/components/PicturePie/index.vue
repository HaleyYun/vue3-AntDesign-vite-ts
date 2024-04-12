<script setup  lang='ts'>
import * as echarts from "echarts"
import { } from 'vue-router'
import { ref, onMounted } from 'vue'
let charts = ref();
const props = defineProps({
    firPhotoSduration: {
        type: Number,
    },
    secPhotoDuration: {
        type: Number,
    },
    thirdPhotoDuration: {
        type: Number,
    }
})
onMounted(() => {
    let Mycharts = echarts.init(charts.value)
    let option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                // name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 30,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [

                    { value: props.firPhotoSduration, name: '新照片' },
                    { value: props.secPhotoDuration, name: '旧照片' },


                    //抑郁
                    // { value: props.firPhotoSduration, name: '积极照片' },
                    // { value: props.secPhotoDuration, name: '消极照片' },
                    // { value: props.thirdPhotoDuration, name: '中立' }
                ]
            }
        ]
    };
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