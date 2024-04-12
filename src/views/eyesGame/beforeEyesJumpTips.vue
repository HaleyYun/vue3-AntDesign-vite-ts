<template>
    <div class="all-box">
        <video id="video5" class="audio-box" :muted="isMuted" autoplay src="" controls>
        </video>
        <div class="box-content">
            <div class="voice-box">
                <img class="headbg-stop" v-if="isShowStart" src="../../static/images/eyesGame/stop.png" alt="">
                <img class="headbg-stop" v-if="!isShowStart" src="../../static/images/eyesGame/start.png" alt="">
                <img class="headbg-voice" src="../../static/images/eyesGame/voice.png" alt="">
            </div>
            <div class="video-end-tips">
                <div class="eye-box">
                    <img class="eye-pic1" src="../../static/images/eyesGame/xm_l_eye.png" alt="">
                    <img class="eye-pic1 eye-pic2" src="../../static/images/eyesGame/xm_r_eye.png" alt="">
                </div>
                <div class="eye-box">
                    <img @click="jumpPage" class="start-btn" src="../../static/images/eyesGame/start_btn.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { onMounted, reactive, toRefs, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useEyesGameStore } from '../../stores/eyes_game'

export default {
    setup() {
        const store = useEyesGameStore()
        const router = useRouter()
        const setAttr = reactive({
            isShowStart: false, // 波纹旁图片暂停开始按钮
            isMuted: true,
            getHttpVideo: "#",
            setVoiceCount: 2
        })
        setAttr.getHttpVideo = store.currentProcedure.steps[0].elements[0].content;
        console.log("eyeActions.value", store.eyeProcedureActive)
        const timer = ref<NodeJS.Timeout | null>(null)


        const handleFontShow = () => { // 处理文字显示
            startVideoUrl(setAttr.getHttpVideo)
        }

        const startVideoUrl = (url: string) => { // 开始播放语音
            setAttr.isShowStart = true
            let video: HTMLVideoElement = document.getElementById("video5") as HTMLVideoElement;
            video.src = url
            setAttr.isMuted = false
            let timer = setTimeout(() => {
                clearTimeout(timer)
                video.play();
            }, 0)
            video.addEventListener( // 监听语音播放结束
                "ended",
                function () {
                    setAttr.isShowStart = false
                    voiceCountFunc()
                },
                false
            );
        }
        const voiceCountFunc = () => {
            setAttr.setVoiceCount--
            if (setAttr.setVoiceCount <= 0) {
                setAttr.isShowStart = false
            } else {

                timer.value = setTimeout(() => {
                    if (timer.value) {
                        clearTimeout(timer.value)
                        timer.value = null
                    }
                    handleFontShow()
                    setAttr.isShowStart = true
                }, 5000)
            }
        }
        const jumpPage = () => {
            store.eyeProcedureActive += 1;
            router.push('/xmStartEyes')
        }

        onUnmounted(() => {
            clearTimeout(timer.value as NodeJS.Timeout)
        })

        onMounted(() => {
            let timer: NodeJS.Timeout | null = setTimeout(() => {
                if (timer) {
                    clearTimeout(timer)
                    timer = null
                }
                handleFontShow()
            }, 0)
        })

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
    z-index: -1;
}

.video-end-tips {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .eye-box {
        width: 100%;
        margin: 57px 0 0 141px;
        display: flex;
        overflow: hidden;

        .eye-pic1 {
            width: 424px;
            height: 258px;
        }

        .eye-pic2 {
            margin-left: 176px;
        }

        .start-btn {
            width: 280px;
            height: 280px;
            margin-left: 365px;
        }

        .look-again {
            width: 156px;
            height: 156px;
            margin: 66px 0 0 112px;
        }
    }
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
    width: 90%;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 50px;
    font-family: Helvetica;
    color: #654925;
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
</style>