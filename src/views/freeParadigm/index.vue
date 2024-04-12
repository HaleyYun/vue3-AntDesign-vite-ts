<!-- 自由观看范式任务 -->
<script setup lang="ts">
import scheduleNumber from "@/components/scheduleNumber/index.vue"
import mathNumber from "@/components/mathNumber/index.vue"
import nextStepVoice from "@/components/nextStepVoice/index.vue"
import indicate from "@/components/indicate/index.vue"
import Twelve from "./components/Twelve.vue"
import { startVideo} from "@/utils/voice"
import { useModeStateStore } from '@/stores/bootMode'
import { useState } from '@/stores/state'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from "vue-router"

const router = useRouter()
const modeStateStore = useModeStateStore()
const state = useState()
let BtnState = computed(() => {
    return modeStateStore.freeParadigm.taskGuide.length - 1
})
// mp3音频操作
const videoRef = ref<any>()
const isMuted = ref<boolean>(true)
const isShowIndicate = ref<boolean>(true)
const currentAudioState = ref<number>(0)
onMounted(() => {
    audioOperation()
})
const audioOperation = () => {
    let len = modeStateStore.freeParadigm.taskGuide.length
    if (currentAudioState.value === len) {
        currentAudioState.value = len - 1
        return
    }
    let timer = setTimeout(() => {
        videoRef.value.play()
        isMuted.value = false
        clearTimeout(timer)
    }, 1000)
    videoRef.value.addEventListener('ended', () => {
        isMuted.value = true
        currentAudioState.value++
        audioOperation()
    }, false)
}
// 确认
const handleClickBtn = () => {
    isScheduleNumber.value = true
    isShowIndicate.value = false
    btnRef.value.audioPlay()
}
const btnRef = ref<any>()

// 滚动数字
const isScheduleNumber = ref<boolean>(false)
// 随机数字
const isShowMathNumber = ref<boolean>(false)
// 数字滚动的回调
const changeSurrentStep = () => {
    isScheduleNumber.value = false
    isShowMathNumber.value = true
    startVd()
}
// 随机数字的回调
const changeMath = (res: number) => {
    currentCar.value = res
    isShowMathNumber.value = false
    isShowTwelve.value = true
}

// 十二图 
const isShowTwelve = ref<boolean>(false)
const currentCar = ref<number>(0)
const changeCar = () => {
    if (state.scheduleNumberState === 15) {
        state.changeScheduleNumberState(0)
        state.changeRandomState(0)
        isScheduleNumber.value = false
        router.replace("/gazeParadigm")
    } else {
        state.addRandomState()
        isShowTwelve.value = false
        isScheduleNumber.value = true
    }
}
const start_time=ref<number>()
const startVd=()=>{
    let id: number = state.addAssessOrderData.dataParams[0].ossKeys[state.scheduleNumberState]
    let code:string= 'zskj-object/depressed/'+ state.addAssessOrderData.assessOrderNum
    startVideo({ id: id, project_code: code }, () => {
        start_time.value=Date.parse(new Date().toString())
    })
}
</script>

<template v-if="modeStateStore">
    <div v-if="isShowIndicate" class="step-one content">
        <indicate :title="modeStateStore.freeParadigm.taskGuide[currentAudioState].textDesc"
            :image="modeStateStore.freeParadigm.taskGuide[currentAudioState].stepFiles[1].fileUrl">
            <video ref="videoRef" class="videodom" :muted="isMuted"
                :src="modeStateStore.freeParadigm.taskGuide[currentAudioState].stepFiles[0].fileUrl" controls>
                <button>播放</button>
            </video>
            <a-button v-if="currentAudioState === BtnState" class="btn" @click="handleClickBtn">确 定</a-button>
        </indicate>
    </div>
    <scheduleNumber v-if="isScheduleNumber" :max="16" @callBack="changeSurrentStep"/>
    <mathNumber v-if="isShowMathNumber" @callBack="changeMath" />
    <Twelve  v-if="isShowTwelve" @change="changeCar" :startTime="start_time" />
    <nextStepVoice ref="btnRef" />
</template> 

<style lang="less" scoped>
.content {
    display: flex;
    background: #fbf8e8;
    height: 100vh;
    align-items: center;
    justify-content: center;
}

.roll-number {
    height: 40px;
    font-size: 27px;
    font-weight: 500;
}

.ul-num {
    display: flex;
    height: 40px;
    transition: height .5s ease-in-out;
    overflow: hidden;
    text-align: center;
}

.step-one {
    background-color: #94826B;

    .step-one-box {

        // display: flex;
        p {
            font-size: 22px;
            font-weight: 500;
        }

        &>div {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 200px;
            height: 100px;
            border: 2px solid #b3aaaa;
            border-radius: 10px;
            overflow: hidden;
            margin: 0 auto;
            img {
                display: block;
                // width: 65%;
                height: 82%;
            }
        }

        .btn {
            display: block;
            margin: 0 auto;
            margin-top: 40px;
            width: 180px;
            height: 60px;
            background-color: #61749e;
            color: #fff;
            font-size: 20px;
            border-radius: 6px;
        }
    }
}

.num {
    // width: 25px;
    height: 40px;
    overflow: hidden;

    &>div {
        transform: translateY(-840px);
        transition: transform .5s;
        // transition-delay:1s
    }

    p {
        display: block;
        // width: 25px;
        height: 40px;
        line-height: 40px;
        text-align: right;
        color: #000;
        margin-bottom: 0;
    }
}

.videodom {
    position: absolute;
    top: 0;
    left: 0;
    visibility: hidden;
    opacity: 0;
}
</style>