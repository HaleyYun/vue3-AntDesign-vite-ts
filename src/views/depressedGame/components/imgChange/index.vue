<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { endVideo, reupload } from "@/utils/voice"
import { useState } from "@/stores/state"
import { depressedVideoUrl } from "@/apis/depressed_game/index"
const depressedState = useState()
const props = defineProps<{
    startTime: number,
    photoChangeTimes: number,
}>()

const widthCat = ref<number>(window.innerWidth)
const heightCat = ref<number>(window.innerHeight)
const emit = defineEmits(['change'])
onMounted(() => {
    let id: number = depressedState.depressData[3].steps[0].freeParadigm[0].stepId
    let code: string = 'zskj-object/depressed/' + depressedState.estimateNum + "/yy_free_paradigm/" + depressedState.depressData[3].steps[0].freeParadigm[0].stepId
    let execute: number = (depressedState.depressData[3].steps[0].freeParadigm[0].timeData.allTimes) * 1000
    let times = setTimeout(() => {
        endVideo({ id: id, project_code: code }, () => {
            endTime = new Date().getTime()
        })
        clearTimeout(times)
    }, execute)
})

let endTime: number = 0
const endUploadvideo = (val: string) => {
    if (val === 'upload_ok') {
        // emit('change')
        // alert('安卓回调成功！')
        // 录制视频上传接口 1-自由切换范式
        // alert(JSON.stringify({
        //     firstPhotoChangeTimes:0,
        //     secondPhotoChangeTimes:0,
        //     startVideoTimeStamp: props.startTime,
        //     endVideoTimeStamp: endTime,
        //     index: depressedState.depressData[3].steps[0].freeParadigm[depressedState.scheduleNumberState-1].stepId,
        //     estimateNum: depressedState.estimateNum,
        //     videoPath: 'zskj-object/depressed/' + depressedState.estimateNum + "/yy_free_paradigm/" + depressedState.depressData[3].steps[0].freeParadigm[depressedState.scheduleNumberState-1].stepId + '/'+ depressedState.depressData[3].steps[0].freeParadigm[depressedState.scheduleNumberState-1].stepId + ".mp4",
        //     questionText: '',
        //     stepProcess:depressedState.depressData[3].steps[0].freeParadigm[depressedState.scheduleNumberState-1],
        //     taskType: 4,
        //     type: 1,
        // }))
        depressedVideoUrl({
            firstPhotoChangeTimes: props.photoChangeTimes,
            secondPhotoChangeTimes: 0,
            startVideoTimeStamp: props.startTime,
            endVideoTimeStamp: endTime,
            index: depressedState.depressData[3].steps[0].freeParadigm[depressedState.scheduleNumberState - 1].stepId,
            estimateNum: depressedState.estimateNum,
            videoPath: 'zskj-object/depressed/' + depressedState.estimateNum + "/yy_free_paradigm/" + depressedState.depressData[3].steps[0].freeParadigm[depressedState.scheduleNumberState - 1].stepId + '/' + depressedState.depressData[3].steps[0].freeParadigm[depressedState.scheduleNumberState - 1].stepId + ".mp4",
            questionText: '',
            stepProcess: depressedState.depressData[3].steps[0].freeParadigm[depressedState.scheduleNumberState - 1],
            taskType: 4,
            type: 1,
            failEstimateNum: depressedState.QueryProData.estimateNum,
            deviceNum: window.innerWidth + "_" + window.innerHeight,
        }).then(res => {
            if (res.code == 200) {
                console.log(res)
                // emit('change')
            }
        })
        emit('change')
    } else {
        alert('网络错误，请重试...')
        reupload(depressedState.depressData[3].steps[0].freeParadigm[depressedState.scheduleNumberState - 1].stepId)
    }
}
window.endUploadVideo = endUploadvideo

</script>
<template>
    <div class="main" :style="{ width: widthCat + 'px', height: heightCat + 'px' }">
        <img :src="depressedState.depressData[3].steps[0].freeParadigm[depressedState.scheduleNumberState - 1].stepFiles[0].fileUrl"
            alt="">
    </div>
</template>
<style lang="less" scoped>
.main {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #94826B;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}
</style>