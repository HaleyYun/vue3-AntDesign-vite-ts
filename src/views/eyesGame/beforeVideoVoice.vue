<template>
    <div class="all-box">
        <video id="video4" class="audio-box" :muted="isMuted" autoplay="true" src="" controls="true">
        </video>
        <div class="box-content">
            <div class="font-show">
                <div class="pic-tips-font">{{ fontText }}</div>
            </div>
            <div class="voice-box" v-if="!isSpeak">
                <img class="headbg-stop" src="../../static/images/eyesGame/stop.png" alt="">
                <img @click="jumpPage" class="headbg-voice" src="../../static/images/eyesGame/voice.png" alt="">
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
import { useEyesGameStore } from '../../stores/eyes_game'
import { listItemType, elementsType } from '../../stores/types/eyes_game'
type fontTimerArrItem = NodeJS.Timeout | null
export default {
    setup() {
        const router = useRouter()
        const store = useEyesGameStore()
        const setAttr = reactive({
            isSpeak: false, // 用户是否说话
            fontText: '',
            isMuted: true,
            getHttpVideo: "#",
            setVoiceCount: 2,
            isStartVoice: false
        })
        const currentProcedure = ref<listItemType | undefined>(undefined)
        const getHttpConfig = ref<elementsType[] | undefined>(undefined);
        const fontTimerArr = ref<fontTimerArrItem[]>([]);
        currentProcedure.value = store.currentProcedure;

        getHttpConfig.value = currentProcedure.value.steps[0].elements.slice(1, 3);
        setAttr.getHttpVideo = currentProcedure.value.steps[0].elements[0].content;

        const handleFontShow = () => { // 处理文字显示
            console.log(getHttpConfig.value)
            getHttpConfig.value!.forEach((item, index) => {
                item.waitTime = parseInt(item.waitTime as string)
                // 累加时间
                if (index > 0 && index + 1 <= getHttpConfig.value!.length) {
                    item.waitTime = ((getHttpConfig.value as elementsType[])[index - 1].waitTime as number) + ((getHttpConfig.value as elementsType[])[index].waitTime as number)
                }

                fontTimerArr.value[index] = setTimeout(() => {
                    clearTimeout(fontTimerArr.value[index] as NodeJS.Timeout)
                    fontTimerArr.value[index] = null
                    setAttr.fontText = item.content
                    if (getHttpConfig.value!.length === index + 1) {
                        setAttr.isStartVoice = true
                        setAttr.isSpeak = true
                    }
                }, item.waitTime as number)
            })
            startVideoUrl(setAttr.getHttpVideo)
        }

        const startVideoUrl = (url: string) => { // 开始播放语音
            setAttr.isStartVoice = false;
            let video: HTMLVideoElement = document.getElementById("video4") as HTMLVideoElement;
            if (video) {
                video.src = url;
            }
            setAttr.isMuted = false;
            let timer: NodeJS.Timeout | null = setTimeout(() => {
                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }
                video.play();
            }, 0)
            video.addEventListener( // 监听语音播放结束
                "ended",
                function () {
                    setAttr.isStartVoice = true;
                    setAttr.isSpeak = true;
                    voiceCountFunc();
                },
                false
            );
        }
        const voiceCountFunc = () => {
            setAttr.setVoiceCount--;
            if (setAttr.setVoiceCount <= 0) return;
            let timer: NodeJS.Timeout | null = setTimeout(() => {
                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }
                handleFontShow();
                setAttr.isStartVoice = false;
                setAttr.isSpeak = false;
            }, 5000)
        }

        onMounted(() => {
            let timer: NodeJS.Timeout | null = setTimeout(() => {
                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }
                handleFontShow();
            }, 10)
        })
        const jumpPage = () => {
            store.eyeProcedureActive += 1;
            router.push('/xmEyesVideo');
        }
        return {
            router,
            jumpPage,
            ...toRefs(setAttr)
        }
    },
    methods: {


    }
}
</script>
<style lang="less" scoped>
.audio-box {
    position: fixed;
    z-index: 9;
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
    z-index: 10;
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
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 50px;
    font-family: Helvetica;
    color: #654925;
    text-align: center;
}

.voice-box {
    position: absolute;
    /* // left: 309px;
    // bottom: 61px; */
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

.pic-tips-font {
    width: 90%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 108px;
    color: #654925;
}
</style>