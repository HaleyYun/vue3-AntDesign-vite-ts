<!-- 凝视范式任务 -->
<script setup lang="ts">
import mathNumber from "@/components/mathNumber/index.vue"
import nextStepVoice from "@/components/nextStepVoice/index.vue"
import { startVideo, endVideo, reupload } from "@/utils/voice"//reupload
import indicate from "@/components/indicate/index.vue"
import { useModeStateStore } from '@/stores/bootMode'
import { useState } from '@/stores/state'
import { useOperateString } from "@/hooks/useString"
import { uploadVideoUrl } from "@/apis/getSourceMaterial"
import { ref, onMounted, computed } from 'vue'
import { useRouter } from "vue-router"


const router = useRouter()
const modeStateStore = useModeStateStore()
const state = useState()
const operateString = useOperateString()
const urlstr = ref<string | any>("")
const startTime=ref<number>()
const endTime=ref<number>()
let BtnState = computed(() => {
    return modeStateStore.gazeParadigm.taskGuide.length - 1
})
const endUploadvideo = (val: string) => {
    if (val === 'upload_ok') {
        // 录制视频上传接口 
        uploadVideoUrl({
            assessOrderNum:state.addAssessOrderData.assessOrderNum,
            ossKey: state.addAssessOrderData.dataParams[1].ossKeys[0],
            videoUrl: state.addAssessOrderData.dataParams[1].ossKeys[0],
            startVideoTimeStamp:startTime.value,
            endVideoTimeStamp:endTime.value
        })
        let time = setTimeout(() => {
            router.replace("/attentionParadigm")
            clearTimeout(time)
        }, 1000)
    } else {
        // alert('网络错误，请重试...')
        reupload(state.addAssessOrderData.dataParams[1].ossKeys[0])
    }
};
window.endUploadVideo = endUploadvideo


// mp3音频操作 
const videoRef = ref<any>()
const isMuted = ref<boolean>(true)
const isShowIndicate = ref<boolean>(true)
const currentAudioState = ref<number>(0)
onMounted(() => {
    // audioOperation()
    urlstr.value = modeStateStore.gazeParadigm.taskGuide[currentAudioState.value].stepFiles[0].fileUrl
    test(urlstr.value)

})
const audioOperation = () => {
    let len = modeStateStore.gazeParadigm.taskGuide.length
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
    isShowMathNumber.value = true
    isShowIndicate.value = false
    btnRef.value.audioPlay()
    startVd()
}
const btnRef = ref<any>()

// 随机数字
const isShowMathNumber = ref<boolean>(false)
// 随机数字的回调
const changeMath = (res: number) => {
    console.log(res);
    isShowMathNumber.value = false
    isShowgaze.value = true
    gazeexecute()
}
const isShowgaze = ref<boolean>(false)

const startVd=()=>{
    let id: number = state.addAssessOrderData.dataParams[1].ossKeys[0]
    let code:string= 'zskj-object/depressed/'+ state.addAssessOrderData.assessOrderNum
    startVideo({ id: id, project_code: code}, () => {
        startTime.value=Date.parse(new Date().toString())
    })
}
const gazeexecute = () => {
    let id: number = state.addAssessOrderData.dataParams[1].ossKeys[0]
    let code:string= 'zskj-object/depressed/'+ state.addAssessOrderData.assessOrderNum
    let execute:number=(modeStateStore.gazeParadigm.taskMaterials[0].timeData.allTimes)*1000
    let times = setTimeout(() => {
        endVideo({ id: id, project_code: code}, () => {
            endTime.value=Date.parse(new Date().toString())
        })
        clearTimeout(times)
    }, execute)

}
const test = (url: string) => {
    let video = videoRef.value;
    let len = modeStateStore.gazeParadigm.taskGuide.length
    video.src = url
    isMuted.value = false
    if (currentAudioState.value === len) {
        currentAudioState.value = len - 1
        return
    }
    let timer = setTimeout(() => {
        clearTimeout(timer)
        video.play();
    }, 1000)
    video.addEventListener('ended', () => {
        isMuted.value = true
        currentAudioState.value++
        audioOperation()
    }, false)
}
</script>
<template v-if="modeStateStore">
    <div v-if="isShowIndicate" class="step-one content">
        <indicate :title="operateString.slicingString(modeStateStore.gazeParadigm.taskGuide[currentAudioState].textDesc)"
            :image="modeStateStore.gazeParadigm.taskGuide[currentAudioState].stepFiles[1].fileUrl">
            <template #oneTitle>
                <p class="one-title">{{ modeStateStore.gazeParadigm.taskGuide[currentAudioState].textDesc.split("。")[0] }}
                </p>
            </template>
            <video ref="videoRef" class="videodom" :muted="isMuted"
                :src="modeStateStore.gazeParadigm.taskGuide[currentAudioState].stepFiles[0].fileUrl" controls>
                <button>播放</button>
            </video>
            <a-button v-if="currentAudioState === BtnState" class="btn" @click="handleClickBtn">确 定</a-button>
        </indicate>
    </div>
    <mathNumber v-if="isShowMathNumber" @callBack="changeMath" />
    <nextStepVoice ref="btnRef" />
    <div v-if="isShowgaze" class="content gaze">
        <img :src="modeStateStore.gazeParadigm.taskMaterials[0].stepFiles[0].fileUrl" alt="">
    </div>
</template>

<style lang="less" scoped>
.content {
    display: flex;
    background: #94826B;
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
            font-size: 20px;
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

.gaze {
    background-color: #94826B;

    img {
        display: block;
        width: 50vw;
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