<template>
    <div class="all-box">
        <video id="video2" class="audio-box" :muted="isMuted" :autoplay="true" :src="videoSrc" controls="true">
        </video>
        <div class="box-content">
            <div class="font-show" v-if="!isShowTry">{{ pageTitle }}</div>
            <div class="voice-box" v-if="!isSpeak">
                <img class="headbg-stop" v-if="isStartVoice" src="../../static/images/eyesGame/start.png" alt="">
                <img class="headbg-stop" v-if="!isStartVoice" src="../../static/images/eyesGame/stop.png" alt="">
                <img class="headbg-voice" src="../../static/images/eyesGame/voice.png" alt="">
            </div>
            <div class="voice-box-speak" v-if="isSpeak">
                <img @click="jumpPage" class="headbg-speak" src="../../static/images/eyesGame/nextbtn.png" alt="">
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { onMounted, ref, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { listItemType, elementsType } from '../../stores/types/eyes_game'
import { useEyesGameStore } from '../../stores/eyes_game'

type fontTimerArrItem = NodeJS.Timeout | null
export default {
    setup() {
        const router = useRouter()
        const store = useEyesGameStore()
        const setAttr = reactive({
            isSpeak: false, // 用户是否说话
            isShowTry: false, // 是否显示试一试页面
            isStartVoice: true,
            pageTitle: '', // 页面标题
            isMuted: true,
            getHttpVideo: "",
            videoSrc: '',
            setVoiceCount: 2, // 设置语音次数
        })
        const getHttpConfig = ref<elementsType[] | undefined>(undefined);
        const currentProcedure = ref<listItemType | undefined>(undefined);
        const fontTimerArr = ref<fontTimerArrItem[]>([])
        currentProcedure.value = store.currentProcedure;
        getHttpConfig.value = currentProcedure.value.steps[0].elements.slice(1, 4);
        setAttr.getHttpVideo = currentProcedure.value.steps[0].elements[0].content;

        const handleFontShow = () => { // 处理文字显示
            startVideoUrl(setAttr.getHttpVideo)
            if (getHttpConfig.value) {
                getHttpConfig.value.forEach((item, index) => {
                    item.waitTime = parseInt(item.waitTime as string)
                    // 累加时间
                    if (index > 0 && index + 1 <= (getHttpConfig.value as elementsType[]).length) {
                        item.waitTime = ((getHttpConfig.value as elementsType[])[index - 1].waitTime as number) + ((getHttpConfig.value as elementsType[])[index].waitTime as number)
                    }
                    fontTimerArr.value[index] = setTimeout(() => {
                        clearTimeout(fontTimerArr.value[index] as NodeJS.Timeout)
                        fontTimerArr.value[index] = null
                        setAttr.pageTitle = item.content
                        return
                    }, item.waitTime)
                })
            }
        }

        const startVideoUrl = (url: string) => { // 开始播放语音
            setAttr.isStartVoice = false
            let video: HTMLVideoElement | null = document.getElementById("video2") as HTMLVideoElement | null;
            if (video) {
                setAttr.videoSrc = url;
                setAttr.isMuted = false;
                video.addEventListener( // 监听语音播放结束
                    "ended",
                    function () {
                        setAttr.isStartVoice = true;
                        setAttr.isSpeak = true;
                    },
                    false
                );
                video.play();
            }
        }

        onMounted(() => {
            handleFontShow()
        })
        const jumpPage = () => {
            store.eyeProcedureActive += 1;
            router.push('/xmRememberPicDb');
        }
        return {
            router,
            jumpPage,
            getHttpConfig,
            currentProcedure,
            ...toRefs(setAttr)
        }
    }
}
</script>
<style lang="less" scoped>
.audio-box {
    position: fixed;
    z-index: 1;
    opacity: 0;
}

.all-box {
    width: 100vw;
    height: 100vh;
    background: #fcf8e6;
}

.welcome-box {
    font-size: 68px;
}

.start-btn {
    font-size: 48px;
}

.video {
    width: 100%;
    height: 100%;
    display: block;
}

.box-content {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}

.headbg {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
}

.headbg-stop {
    width: 50px;
    height: 50px;
}

.headbg-voice {
    width: 320px;
    height: 61px;
    margin-left: 13px;
}

.headbg-speak {
    width: 110px;
    height: 110px;
}

.font-show {
    width: 95%;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 108px;
    font-family: Helvetica;
    color: #654925;
}

.voice-box {
    position: absolute;
    // left: 309px;
    // bottom: 61px;
    left: 50%;
    bottom: 60px;
    transform: translate(-50%, 0);
    z-index: 2;
    display: flex;
    align-items: center;
}

.voice-box-speak {
    position: absolute;
    left: 50%;
    bottom: 30px;
    transform: translate(-50%, 0);
    z-index: 2;
    display: flex;
    align-items: center;
}
</style>

