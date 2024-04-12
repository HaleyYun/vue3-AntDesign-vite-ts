<!-- 注意切换范式任务 -->
<script setup lang="ts">
import scheduleNumber from "@/components/scheduleNumber/index.vue"
import mathNumber from "@/components/mathNumber/index.vue"
import nextStepVoice from "@/components/nextStepVoice/index.vue"
import Double from "./components/Double.vue"
import indicate from "@/components/indicate/index.vue"
import { useModeStateStore } from '@/stores/bootMode'
import { useSubscribeData } from "@/stores/SubscribeData"
import { useState } from '@/stores/state'
import { ref, onMounted, computed } from 'vue'
import { message } from 'ant-design-vue';
import { useRouter } from "vue-router"
import { startVideo} from "@/utils/voice"
import { AccomplishAssess, EvaluationResult } from "@/apis/getSourceMaterial"


const router = useRouter()
const subscribeData = useSubscribeData()
const state = useState()
let BtnState = computed(() => {
    return modeStateStore.attentionParadigm.taskGuide.length - 1
})
const modeStateStore = useModeStateStore()


// mp3音频操作
const videoRef = ref<any>()
const isMuted = ref<boolean>(true)
const isShowIndicate = ref<boolean>(true)
const currentAudioState = ref<number>(0)
onMounted(() => {
    audioOperation()
})
const audioOperation = () => {
    let len = modeStateStore.attentionParadigm.taskGuide.length
    if (currentAudioState.value === len) {
        currentAudioState.value = len - 1
        return
    }
    let timer = setTimeout(() => {
        console.log(666, videoRef.value);
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
    videoRef.value.pause()
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
    currentCar.value = res//用不到了
    isShowMathNumber.value = false
    isShowDouble.value = true
}
// 卡片
const isShowDouble = ref<boolean>(false)
const currentCar = ref<number>(0)//用不到了
const changeCar = async () => {
    if (state.scheduleNumberState === 15) {
        state.changeScheduleNumberState(0)
        state.changeRandomState(0)
        isScheduleNumber.value = false
        spinning.value = true
        await GetAccomplishAssess()

    } else {
        state.addRandomState()
        isShowDouble.value = false
        isScheduleNumber.value = true
    }
}

// 弹窗 
const visible = ref<boolean>(false)
const requestHttpNum = ref<number>(0) //请求次数
const handleOk = async () => {
    await EvaluationResult(state.evaluationResultData)
    message.success('评估完成');
    router.replace("/subscribelist")
    visible.value = false;
};
const GetAccomplishAssess = async () => {
    requestHttpNum.value++
    const res = await AccomplishAssess({
        estimateNum: subscribeData.listParams?.ticketsBookingCode,
        type:4,
    });
    if (res.code == 200 || requestHttpNum.value === 5) {
        visible.value = true
        spinning.value = false
        state.getEvaluationResultData(res.data)
        return
    } else {
        let timer = setTimeout(() =>{
            GetAccomplishAssess()
            clearTimeout(timer)
        }, 3000)
    }
}
// 操作子组件 
const start_time=ref<number>()
const startVd=()=>{
    let id: number = state.addAssessOrderData.dataParams[2].ossKeys[state.scheduleNumberState]
    let code: string = 'zskj-object/depressed/' + state.addAssessOrderData.assessOrderNum
    startVideo({ id: id, project_code: code }, () => {
        start_time.value= Date.parse(new Date().toString())
    })
}

// 加载
const spinning = ref<boolean>(false);
// 字符串切割
const slicingString = (string: string) => {
    let StrArr: string[] = string.split("这是一个测试反应能力的任务")
    console.log(StrArr);
    return StrArr[1]
}
</script>
<template v-if="modeStateStore.attentionParadigm">
    <div v-show="spinning" class="loding">评估结果推送中...</div>
    <div class="step-one content" v-if="isShowIndicate">
        <indicate :title="slicingString(modeStateStore.attentionParadigm.taskGuide[currentAudioState].textDesc)"
            :image="modeStateStore.attentionParadigm.taskGuide[currentAudioState].stepFiles[1].fileUrl">
            <template #oneTitle>
                <p class="one-title">这是一个测试反应能力的任务</p>
            </template>
            <video ref="videoRef" class="videodom" :muted="isMuted"
                :src="modeStateStore.attentionParadigm.taskGuide[currentAudioState].stepFiles[0].fileUrl" controls>
                <button>播放</button>
            </video>
            <a-button v-if="currentAudioState === BtnState" class="btn" @click="handleClickBtn">确 定</a-button>
        </indicate>
    </div>
    <scheduleNumber v-if="isScheduleNumber" :max="16" @callBack="changeSurrentStep" />
    <mathNumber v-if="isShowMathNumber" @callBack="changeMath" />
    <Double v-if="isShowDouble" @change="changeCar" :startTime="start_time"></Double>
    <nextStepVoice ref="btnRef" />
    <a-modal class="popup" :centered="true" v-model:visible="visible" :closable="false" :maskClosable="false" title="结果提示"
        okText="确认" :footer="null">
        <div class="content-box">您已经完成本次评估</div>
        <div>
            <a-button class="btn-submit" type="primary" @click="handleOk">确 认</a-button>
        </div>
    </a-modal>
</template>

<style lang="less" scoped>
.content {
    display: flex;
    background: #94826B;
    height: 100vh;
    align-items: center;
    justify-content: center;
    overflow: hidden;
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

.loding {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: #00000091;
    z-index: 6;
    color: #fff;
    display: flex;
    letter-spacing: 3px;
    font-size: 20px;
    justify-content: center;
    align-items: center;
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
                width: 65%;
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

.content-box {
    font-size: 20px;
    font-weight: 500;
    height: 100px;
    text-align: center;
    line-height: 100px;
}

.btn-submit {
    display: block;
    width: 90px;
    height: 40px;
    margin: 0 auto;
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
</style>