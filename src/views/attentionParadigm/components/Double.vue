<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useModeStateStore } from '@/stores/bootMode'
import { useState } from '@/stores/state'
import { uploadVideoUrl } from "@/apis/getSourceMaterial"
import {endVideo, reupload } from "@/utils/voice"
const emit = defineEmits(['change'])
const props= defineProps<{
    startTime:number | undefined
}>();
const modeStateStore = useModeStateStore()
const timeData=modeStateStore.attentionParadigm.taskMaterials
const state = useState()
const endTime = ref<number>()
const firstPhotoChangeTimes = ref<number>()
const secondPhotoChangeTimes = ref<number>()
const endUploadvideo = (val: string) => {
    if (val === 'upload_ok') {
        // 录制视频上传接口 
        uploadVideoUrl({
            assessOrderNum: state.addAssessOrderData.assessOrderNum,
            ossKey: state.addAssessOrderData.dataParams[2].ossKeys[state.scheduleNumberState],
            videoUrl: state.addAssessOrderData.dataParams[2].ossKeys[state.scheduleNumberState],
            startVideoTimeStamp: props.startTime,
            endVideoTimeStamp: endTime.value,
            firstPhotoChangeTimes: firstPhotoChangeTimes.value,
            secondPhotoChangeTimes: secondPhotoChangeTimes.value
        })
        emit('change')
    } else {
        // alert('网络错误，请重试...')
        reupload(state.addAssessOrderData.dataParams[2].ossKeys[state.scheduleNumberState])
    }
};
window.endUploadVideo  = endUploadvideo
const currenState = ref<number | any>()
onMounted(async () => {
    let id: number = state.addAssessOrderData.dataParams[2].ossKeys[state.scheduleNumberState]
    let code: string = 'zskj-object/depressed/' + state.addAssessOrderData.assessOrderNum
    let execute: number = (timeData[state.RandomState].timeData.allTimes) * 1000 //
    let tielone: number = (timeData[state.RandomState].timeData.firstPhotoChangeTimes) * 1000
    let tieltwo: number = (timeData[state.RandomState].timeData.firstPhotoChangeTimes + timeData[state.RandomState].timeData.firstPhotoChangeDisplayTimes) * 1000
    let timer = setTimeout(() => {
        currenState.value = timeData[state.RandomState].stepFiles[0].select_sort
        firstPhotoChangeTimes.value = Date.parse(new Date().toString())
        clearTimeout(timer)
    }, tielone)
    let timers = setTimeout(() => {
        currenState.value = timeData[state.RandomState].stepFiles[1].select_sort
        secondPhotoChangeTimes.value = Date.parse(new Date().toString())
        clearTimeout(timers)
    }, tieltwo)
    let times = setTimeout(() => {
        endVideo({ id: id, project_code: code }, () => {
            endTime.value = Date.parse(new Date().toString())
        })
        clearTimeout(times)
    }, execute)
})
</script>
<template v-if="modeStateStore.taskMaterials">
    <div class="box">
        <div :class="currenState == 1 ? 'active' : ''">
            <img :src="timeData[state.RandomState].stepFiles[0].fileUrl" />
        </div>
        <div :class="currenState == 2 ? 'active' : ''">
            <img :src="timeData[state.RandomState].stepFiles[1].fileUrl" />
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
}

.box>div {
    width: 25%;
    // height: 75vh;
    border: 1vw solid #94826B;
}

.box>div.active {
    border: 1vw solid #12f421;
}

img {
    display: block;
    width: 100%;
    // height: 100%;
    // object-fit: cover;
}
</style>