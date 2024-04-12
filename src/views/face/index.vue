<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { faceCorrect } from "@/apis/getSourceMaterial/type";
import { useModeStateStore } from "@/stores/bootMode"
import { useSubscribeData } from "@/stores/SubscribeData"
import { visibleVideo } from "@/utils/voice"
import { onMounted, ref } from 'vue';
import { CloseOutlined } from '@ant-design/icons-vue';
import { getaddAssessOrder } from "@/apis/getSourceMaterial/index"
import { useState } from "@/stores/state"

const modeStateStore = useModeStateStore()
const subscribeData = useSubscribeData()
const route = useRoute()
const router = useRouter()
const faceCorrect = ref<faceCorrect>()
const isShowNext = ref<boolean>(false)
const isShowReturn = ref<boolean>(false)
const isShowReturnState = ref<number>(0)
const state = useState()
onMounted(async () => {
    await modeStateStore.getBootModeData()
    urlstr.value = modeStateStore.faceCorrect.stepFiles[0].fileUrl
    let res = await getaddAssessOrder(subscribeData.listParams)
    state.getAddAssessOrderData(res.data)
    console.log(state.addAssessOrderData);
})
const urlstr = ref<string | any>("")
const handleClick = () => {
    videoRef.value.style.display='none';
    isShowNext.value = true;
    visibleVideo(isTrue.value + '')
    router.push('/free/paradigm')
}
const handleClickReturn = () => {
    router.replace("/")
}
const isMuted = ref<boolean>()
const videoRef = ref<any>()
const test = (url: string) => {
    let video = videoRef.value;
    video.src = url
    isMuted.value = false
    let timer = setTimeout(() => {
        clearTimeout(timer)
        video.play();
    }, 1000)
    video.addEventListener("ended", () => {
        isShowNext.value = true
        let timer = setTimeout(() => {
            Repetition()
            clearTimeout(timer)
        }, 5000)
    }, false)
}
const Repetition = () => {
    if (route.path === '/face' && isShowReturnState.value < 2) {
        isShowReturnState.value = 2
        test(urlstr.value)
    }
}

// 唤起人脸 
const isTrue = ref<boolean>(false)
const isShowFace = ref<boolean>(true)

// 弹窗
const isShowPoput = ref<boolean>(true)
const changeShowPoput = (state: boolean) => {
    router.replace("/subscribelist")
    isShowPoput.value = state
}
const handleNotarize = () => {
    isShowPoput.value = false
    let timer = setTimeout(() => {
        isShowReturnState.value = 1
        test(urlstr.value)
        isShowFace.value = false
        visibleVideo(!isTrue.value + '')
        clearTimeout(timer)
    })
}


</script>
<template>
    <div class="main">
        <div class="content" v-if="!isShowPoput">
            <div class="people" v-if="isShowFace"></div>
            <div v-if="isShowNext" class="next" @click="handleClick">下一步</div>
            <div v-if="isShowReturn" :class="isShowReturn ? 'active' : ''" class="next" @click="handleClickReturn">返回</div>
            <video ref="videoRef" class="videoTd" :muted="isMuted" src="" controls autoplay></video>
        </div>
    </div>
    <div class="filter-prompt" v-if="isShowPoput">
        <div class="poput">
            <span class="btn-close" @click="changeShowPoput(false)"><close-outlined /></span>
            <p class="title">筛查提示</p>
            <p class="small-title">本次筛查预计用时10分钟，过程中请勿离开设备</p>
            <p class="poput-content" v-if="modeStateStore.faceCorrect">{{ modeStateStore.faceCorrect.textDesc }}</p>
            <span class="btn" @click="handleNotarize">我已知晓!</span>
        </div>
    </div>
</template>
<style lang="less" scoped>
.main {
    position: fixed;
    background: #94826B;
    height: 100vh;
    width: 100vw;
    display: table;

    .content {
        vertical-align: middle;
        display: table-cell;

        .people {
            width: 400px;
            height: 400px;
            background-image: url('@/assets/images/bg-people.png');
            background-repeat: no-repeat;
            background-size: 100% auto;
            background-position: top center;
            background-color: #fff;
            border-radius: 50%;
            margin: 0 auto;
        }

        .next {
            width: 90px;
            text-align: center;
            height: 90px;
            line-height: 90px;
            color: #fff;
            font-size: 20px;
            background: #b2895e;
            border-radius: 50%;
            transition: all .5s ease;
            position: fixed;
            bottom: 5px;
            transform: translateX(-50%);
            left: 50%;
        }

        &.active {
            visibility: visible;
            opacity: 1;
        }
    }
}

.videoTd {
    position: fixed;
    top: 0;
    visibility: hidden;
    opacity: 0;
    visibility: hidden;
    opacity: 0;
}

.filter-prompt {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #000;

    .poput {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 540px;
        height: 293px;
        background-color: #fff;
        border-radius: 11px;
        padding: 20px 20px 0 20px;

        .title {
            text-align: center;
            font-weight: 600;
            letter-spacing: 2px;
            font-size: 25px;
            margin-bottom: 10px !important;
            margin-top: 6px;
        }
    }

    .small-title {
        font-size: 19px;
        text-align: center;
        font-weight: 600;
        letter-spacing: 1px;
        margin-bottom: 3px !important;
    }

    .poput-content {
        letter-spacing: 2px;
        font-size: 16px;
        color: #4e4a4ae6;
        font-weight: 500;
    }

    .btn {
        display: block;
        width: 163px;
        height: 35px;
        line-height: 35px;
        font-size: 15px;
        font-weight: 600;
        text-align: center;
        color: #fff;
        border-radius: 30px;
        background-color: #634926;
        margin: 0 auto;
        margin-top: 24px;
        cursor: pointer;
    }

    .btn-close {
        position: absolute;
        top: 10px;
        font-size: 20px;
        color: #a7a39e;
    }
}
</style>