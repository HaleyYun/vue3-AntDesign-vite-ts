<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { endVideo, reupload } from "@/utils/voice"
import { useState } from "@/stores/state"
import { depressedVideoUrl } from "@/apis/depressed_game/index"

const emit = defineEmits(['change'])
const props = defineProps<{
    startTime: number
}>();
const depressedState = useState()

let firstPhotoChangeTimes: number = 0
let secondPhotoChangeTimes: number = 0
let endTime: number = 0
const endUploadvideo = (val: string) => {
    if (val === 'upload_ok') {
        // 录制视频上传接口 1-自由切换范式
        // alert(JSON.stringify({
        //             firstPhotoChangeTimes:firstPhotoChangeTimes,
        //             secondPhotoChangeTimes:secondPhotoChangeTimes,
        //             startVideoTimeStamp: props.startTime,
        //             endVideoTimeStamp: endTime,
        //             index: depressedState.depressData[7].steps[0].attentionParadigm[depressedState.scheduleNumberState-1].stepId,
        //             estimateNum: depressedState.estimateNum,
        //             videoPath: 'zskj-object/depressed/' + depressedState.estimateNum + "/yy_attention_paradigm/" + depressedState.depressData[7].steps[0].attentionParadigm[depressedState.scheduleNumberState-1].stepId + '/'+ depressedState.depressData[7].steps[0].attentionParadigm[depressedState.scheduleNumberState-1].stepId +'.mp4',
        //             questionText: '',
        //             stepProcess:depressedState.depressData[7].steps[0].attentionParadigm[depressedState.scheduleNumberState-1],
        //             taskType: 4,
        //             type: 3,}))
        depressedVideoUrl({
            firstPhotoChangeTimes: firstPhotoChangeTimes,
            secondPhotoChangeTimes: secondPhotoChangeTimes,
            startVideoTimeStamp: props.startTime,
            endVideoTimeStamp: endTime,
            index: depressedState.depressData[7].steps[0].attentionParadigm[depressedState.scheduleNumberState - 1].stepId,
            estimateNum: depressedState.estimateNum,
            videoPath: 'zskj-object/depressed/' + depressedState.estimateNum + "/yy_attention_paradigm/" + depressedState.depressData[7].steps[0].attentionParadigm[depressedState.scheduleNumberState - 1].stepId + '/' + depressedState.depressData[7].steps[0].attentionParadigm[depressedState.scheduleNumberState - 1].stepId + '.mp4',
            questionText: '',
            stepProcess: depressedState.depressData[7].steps[0].attentionParadigm[depressedState.scheduleNumberState - 1],
            taskType: 4,
            failEstimateNum: depressedState.QueryProData.estimateNum,
            type: 3,
            deviceNum: window.innerWidth + "_" + window.innerHeight,
        }).then(res => {
            if (res.code == 200) {
                // alert(JSON.stringify(res) +'调用接口结束反参数' )
                console.log(res)
                emit('change')
            }
        })
    } else {
        // alert('网络错误，请重试...')
        reupload(depressedState.depressData[7].steps[0].attentionParadigm[depressedState.scheduleNumberState - 1].stepId)
    }
}
window.endUploadVideo = endUploadvideo


const currenState = ref<number | any>()
onMounted(async () => {

    let id: number = depressedState.depressData[7].steps[0].attentionParadigm[depressedState.scheduleNumberState - 1].stepId
    let code: string = 'zskj-object/depressed/' + depressedState.estimateNum + "/yy_attention_paradigm/" + depressedState.depressData[7].steps[0].attentionParadigm[depressedState.scheduleNumberState - 1].stepId
    let execute: number = (depressedState.depressData[7].steps[0].attentionParadigm[depressedState.scheduleNumberState - 1].timeData.allTimes) * 1000

    //出现绿框时间
    let greenShow: number = (depressedState.depressData[7].steps[0].attentionParadigm[depressedState.scheduleNumberState - 1].timeData.firstPhotoChangeTimes) * 1000
    let timer = setTimeout(() => {
        currenState.value = depressedState.depressData[7].steps[0].attentionParadigm[depressedState.scheduleNumberState - 1].stepFiles[0].selectSort
        firstPhotoChangeTimes = new Date().getTime()
        clearTimeout(timer)
    }, greenShow)

    //第一张图片变化时间
    let tielOne: number = (depressedState.depressData[7].steps[0].attentionParadigm[depressedState.scheduleNumberState - 1].timeData.firstPhotoChangeTimes + depressedState.depressData[7].steps[0].attentionParadigm[depressedState.scheduleNumberState - 1].timeData.firstPhotoChangeDisplayTimes) * 1000
    let timers = setTimeout(() => {
        currenState.value = depressedState.depressData[7].steps[0].attentionParadigm[depressedState.scheduleNumberState - 1].stepFiles[1].selectSort
        secondPhotoChangeTimes = new Date().getTime()
        clearTimeout(timers)
    }, tielOne)

    let times = setTimeout(() => {
        endVideo({ id: id, project_code: code }, () => {
            endTime = new Date().getTime()
        })
        clearTimeout(times)
    }, execute)

    console.log(depressedState.depressData[7].steps[0].depressedDeviceResponse.attentionParadigmWidth + '图片宽度')
    console.log(depressedState.depressData[7].steps[0].depressedDeviceResponse.attentionParadigmHeight + '图片高度')


    console.log(depressedState.depressData[7].steps[0].depressedDeviceResponse.attentionParadigmLeftTopX + '左边图片x轴坐标')
    console.log(depressedState.depressData[7].steps[0].depressedDeviceResponse.attentionParadigmLeftTopY + '左边图片y轴坐标')
    console.log(depressedState.depressData[7].steps[0].depressedDeviceResponse.attentionParadigmRightTopX + '右边图片x轴坐标')
    console.log(depressedState.depressData[7].steps[0].depressedDeviceResponse.attentionParadigmRightTopY + '右边图片y轴坐标')


})
</script>
<template>
    <div class="box">
        <div>
            <img :class="currenState == 1 ? 'active' : 'default'" :style="{
                width: depressedState.depressData[7].steps[0].depressedDeviceResponse.attentionParadigmWidth + 'px',
                height: depressedState.depressData[7].steps[0].depressedDeviceResponse.attentionParadigmHeight + 'px',
                top: depressedState.depressData[7].steps[0].depressedDeviceResponse.attentionParadigmLeftTopY + 'px',
                left: depressedState.depressData[7].steps[0].depressedDeviceResponse.attentionParadigmLeftTopX + 'px'
            }"
                :src="depressedState.depressData[7].steps[0].attentionParadigm[depressedState.scheduleNumberState - 1].stepFiles[0].fileUrl" />
        </div>
        <div>
            <img :class="currenState == 2 ? 'active' : 'default'"
                :style="{
                width: depressedState.depressData[7].steps[0].depressedDeviceResponse.attentionParadigmWidth + 'px',
                height: depressedState.depressData[7].steps[0].depressedDeviceResponse.attentionParadigmHeight + 'px',
                top: depressedState.depressData[7].steps[0].depressedDeviceResponse.attentionParadigmRightTopY + 'px',
                left: depressedState.depressData[7].steps[0].depressedDeviceResponse.attentionParadigmRightTopX + 'px'
            }"
                :src="depressedState.depressData[7].steps[0].attentionParadigm[depressedState.scheduleNumberState - 1].stepFiles[1].fileUrl" />
        </div>
    </div>
</template>

<style lang="less" scoped>
.box {
    width: 100vw;
    height: 100vh;
    display: flex;
    padding: 0 8%;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    background: #94826B;
    position: relative;
}

.box>div {
    width: 25%;

}

img {
    display: block;
    position: absolute;
}

.default {
    border: 1vw solid #94826B;
}

.active {
    border: 1vw solid #12f421;
}
</style>