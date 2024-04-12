<script setup lang="ts">
import { onMounted, ref } from 'vue';
// import { useRouter } from 'vue-router';
import { endVideo, reupload } from "@/utils/voice"
import { useModeStateStore } from '@/stores/bootMode'
import { useState } from '@/stores/state'
import { uploadVideoUrl } from "@/apis/getSourceMaterial"
// const router = useRouter()
const state = useState()
const modeStateStore = useModeStateStore()
const props= defineProps<{
    startTime:number | undefined
}>();
const emit = defineEmits(['change'])
const endTime = ref<number>()
const endUploadvideo = (val: string) => {
    if (val === 'upload_ok') {
        // 录制视频上传接口 
        uploadVideoUrl({
            assessOrderNum: state.addAssessOrderData.assessOrderNum,
            ossKey: state.addAssessOrderData.dataParams[0].ossKeys[state.scheduleNumberState],
            videoUrl: state.addAssessOrderData.dataParams[0].ossKeys[state.scheduleNumberState],
            startVideoTimeStamp: props.startTime,
            endVideoTimeStamp: endTime.value
        })
        emit('change')
    } else {
        // alert('网络错误，请重试...')
        reupload(state.addAssessOrderData.dataParams[0].ossKeys[state.scheduleNumberState])
    }
};
window.endUploadVideo  = endUploadvideo
onMounted(() => {
    let id: number = state.addAssessOrderData.dataParams[0].ossKeys[state.scheduleNumberState]
    let code: string = 'zskj-object/depressed/' + state.addAssessOrderData.assessOrderNum
    let execute: number = (modeStateStore.freeParadigm.taskMaterials[state.RandomState].timeData.allTimes) * 1000
    let times = setTimeout(() => {
        endVideo({ id: id, project_code: code }, () => {
            endTime.value = Date.parse(new Date().toString())
        })
        clearTimeout(times)
    }, execute)
})
</script>
<template>
    <div class="main" v-if="modeStateStore.freeParadigm.taskMaterials">
        <img :src="modeStateStore.freeParadigm.taskMaterials[state.RandomState].stepFiles[0].fileUrl" alt="">
    </div>
</template>
<style lang="less" scoped>
.main {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    background-color: #94826B;

    img {
        display: block;
    }
}
</style>