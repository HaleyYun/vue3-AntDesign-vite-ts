<template>
    <div class="corrent_box">
        <audio class="videoTd" id="audioPlay" src="" autoplay="true" controls="false"></audio>
        <div v-if="setAttr.showText">
            <div>
                <div class="msg" v-if="setAttr.showText1">{{ currentProcedure?.steps[0].elements[0].content }}</div>
            </div>
            <div>
                <div class="msg" v-if="setAttr.showText2">{{ currentProcedure?.steps[0].elements[2].content }}</div>
            </div>
            <div>
                <div class="msg" v-if="setAttr.showText3">{{ currentProcedure?.steps[0].elements[4].content }}</div>
            </div>
        </div>
        <div class="corrent_content">
            <div class="cont-img" :style="{ left: (posPoint.x) + 'px', top: (posPoint.y) + 'px' }">
                <div v-if="setAttr.showRound"
                    :class="[setAttr.animateStr, 'corrent_round animate__animated animate__zoomIn']">
                    <img class="corrent_round" :style="{
                        width: currentProcedure?.steps[0].checkPoints[0].size + 'px', height: currentProcedure?.steps[0].checkPoints[0].size + 'px', position: 'relative', left: 0, top: 0
                    }" :src="currentProcedure?.steps[0].checkPoints[0].pointContent">
                </div>
                <div v-if="setAttr.showCha" :class="[setAttr.animateStr1, 'imgCha animate__animated animate__rotateOut']">
                    <img class="imgCha"
                        :style="{ width: currentProcedure?.steps[0].checkPoints[0].size + 'px', height: currentProcedure?.steps[0].checkPoints[0].size + 'px', position: 'relative', left: 0, top: 0 }"
                        :src="currentProcedure?.steps[0].checkPoints[0].crossContent">
                </div>
                <div v-if="setAttr.showBao" class="imgBao animate__animated animate__zoomIn">
                    <img class="imgBao"
                        :style="{ width: currentProcedure?.steps[0].checkPoints[0].size + 'px', height: currentProcedure?.steps[0].checkPoints[0].size + 'px', position: 'relative', left: 0, top: 0 }"
                        :src="currentProcedure?.steps[0].checkPoints[0].boomContent">
                </div>
            </div>
            <div class="end_text" v-if="setAttr.showCountdown">
                <div class="downMsg" v-if="setAttr.text1">
                    <div style="margin: 100px 0;">{{ currentProcedure?.steps[0].elements[4].content }}</div>
                    <div class="cicle" @click="jumpPage">下一步</div>
                </div>
                <div class="downMsg" v-if="setAttr.text2">
                    {{ currentProcedure?.steps[0].elements[6].content }}
                </div>
                <div class="downMsg" v-if="setAttr.text3">
                    <div style="margin: 100px 0;">{{ currentProcedure?.steps[0].elements[6].content }}</div>
                    <div class="cicle" @click="again">重新校准</div>
                </div>
            </div>
        </div>
        <div class="maskBox" v-if="isShowLoading">
            <a-spin size="large" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, createVNode } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import 'animate.css';
import { setCorrect } from '../../apis/eyes_game/index'
import { useState } from "@/stores/state"
import { startVideo, endVideo, reupload } from '../../utils/voice'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { Modal } from 'ant-design-vue';
const router = useRouter()
const route = useRoute();
const store = useState()
const currentProcedure = ref<any>(undefined)
let isShowLoading = ref<boolean>(false)
const posPoint = ref<any>({
    x: 0,
    y: 0
})
let timer8: NodeJS.Timeout | number
const setAttr = reactive({
    showText: true,
    showCountdown: false,
    showText1: true,
    showText2: false,
    showText3: false,
    showRound: false,
    showCha: false,
    showBao: false,
    text1: false,
    text2: false,
    text3: false,
    timerShow: 0,
    countdown: 10,
    animateStr: '',
    animateStr1: '',
    popUpState: false,
    upLoadUrl: "zskj-object/depressed",
    progressNumber: 0, // 当前进度显示
    fistCheckPointTime: 0,
    startTime: 0,
    endTime: 0,
    switch: true,
    codeNo: 0,
    audioUrl: '',
})
setAttr.upLoadUrl = "zskj-object/depressed/" + store.estimateNum + "/yy_check/" + setAttr.progressNumber;

onMounted(() => {
    console.log(setAttr.upLoadUrl)
    getFontConfig();
    startVideoUrl(setAttr.audioUrl)
})

const publicFun = (i: number, fn: () => void = () => { }) => {
    console.log('这是i=', i)
    let timerS = setTimeout(() => {
        clearTimeout(timerS)
        if (i <= currentProcedure.value!.steps[0].checkPoints.length - 1) {
            if (i === 0) {
                let timer1 = setTimeout(() => {
                    clearTimeout(timer1)
                    setAttr.showText = false
                    setAttr.showRound = true
                    let timerX = setTimeout(() => {
                        clearTimeout(timerX)
                        setAttr.showRound = false
                        setAttr.showCha = true
                        setAttr.animateStr = "animate__fadeOut"
                    }, 800)
                    let timerH = setTimeout(() => {
                        clearTimeout(timerH)
                        setAttr.showBao = true
                        setAttr.showRound = false
                        setAttr.showCha = false
                        let timerI = setTimeout(() => {
                            clearTimeout(timerI)
                            isShowLoading.value = true
                            let timerY = setTimeout(() => {
                                clearTimeout(timerY)
                                isShowLoading.value = false
                            }, 600)
                        }, 1000)
                    }, 1500)
                }, 2000)
            }
            if (i === 1) {
                let para = { id: setAttr.progressNumber, project_code: setAttr.upLoadUrl }
                startVideo(para, () => {
                    setAttr.startTime = new Date().getTime()
                })
                setAttr.fistCheckPointTime = new Date().getTime()
                posPoint.value.x = currentProcedure.value?.steps[0].checkPoints[i].x
                posPoint.value.y = currentProcedure.value?.steps[0].checkPoints[i].y
                console.log(posPoint.value.x)
                console.log(posPoint.value.y)
                fn()
            }
            if (i === 5) {
                let timerH = setTimeout(() => {
                    clearTimeout(timerH)
                    setAttr.showBao = false
                    setAttr.showCountdown = true
                    isShowLoading.value = true;
                }, 3000)
                let para = { id: setAttr.progressNumber, project_code: setAttr.upLoadUrl }
                endVideo(para, () => {
                    setAttr.endTime = new Date().getTime();
                })
                let timerY = setTimeout(() => {
                    clearTimeout(timerY)
                    isShowLoading.value = false;
                }, 2000)
            }
            posPoint.value.x = currentProcedure.value?.steps[0].checkPoints[i].x
            posPoint.value.y = currentProcedure.value?.steps[0].checkPoints[i].y
            console.log(posPoint.value.x)
            console.log(posPoint.value.y)
            fn()
            i++
            publicFun(i, timeOutFun)
        }
        return
    }, 4500)
}

//抽出公共部分
const timeOutFun = () => {
    setAttr.showBao = false
    setAttr.showRound = true
    let timerX = setTimeout(() => {
        clearTimeout(timerX)
        setAttr.showRound = false
        setAttr.showCha = true
        setAttr.animateStr = "animate__fadeOut"
    }, 1000)
    let timerH = setTimeout(() => {
        clearTimeout(timerH)
        setAttr.showBao = true
        setAttr.showRound = false
        setAttr.showCha = false
    }, 2000)
}

const setTime = () => {
    timer8 = setInterval(() => {
        if (setAttr.countdown > 0) {
            setAttr.countdown--;
        } else {
            clearInterval(timer8);
            setAttr.switch = false
        }
    }, 1000);
}

const getFontConfig = () => {
    // 获取语音及文字配置
    currentProcedure.value = store.depressData[1];
    posPoint.value.x = currentProcedure.value.steps[0].checkPoints[0].x;
    posPoint.value.y = currentProcedure.value.steps[0].checkPoints[0].y;
    setAttr.audioUrl = currentProcedure.value.steps[0].elements[1].content;
    setAttr.timerShow = Number(currentProcedure.value.steps[0].checkPoints[0].pointTime);
    console.log(currentProcedure.value);
    let timer = setTimeout(() => {
        clearTimeout(timer)
        setAttr.showText1 = false
        setAttr.showText2 = true
        setAttr.showText3 = false
        setAttr.audioUrl = currentProcedure.value?.steps[0].elements[3].content as string
        startVideoUrl(setAttr.audioUrl)
    }, 3000)
    publicFun(0, () => { })
}
window['endUploadVideo'] = (val: string) => {
    if (val === 'upload_ok') {
        uploadVideoWatch(() => {
            isShowLoading.value = false
        })
    } else {
        Modal.warning({
            title: '提示',
            icon: createVNode(ExclamationCircleOutlined),
            content: '上传失败，请检查网络后重试',
            closable: false,
            okText: '重试',
            zIndex: 9999999999,
            onOk: () => {
                reupload(setAttr.progressNumber)
            }
        });
    }
}

//重新校验
const again = () => {
    router.push({
        path: '/startDepress',
        query: {
            ticketCode: route.query.ticketCode
        }
    })
}

const jumpPage = () => {
    router.push("/gazeGuide")
}

// 开始播放语音
const startVideoUrl = (url: string, cd: () => void = () => { }) => {
    // alert(url + '播放语音')
    let audio: HTMLAudioElement = document.getElementById("audioPlay") as HTMLAudioElement;
    audio.src = url
    let timer = setTimeout(() => {
        clearTimeout(timer)
        audio.load();
        audio.play();
    }, 0)
    // 监听语音播放结束
    audio.addEventListener(
        "ended",
        () => {
            cd()
        },
        false
    );
}


const uploadVideoWatch = (cb: () => void) => {
    let questionText = currentProcedure.value!.steps[0].checkPoints.map((item: any) => {
        return { ...item }
    })
    questionText.map((res: any) => {
        delete res.boomContent
        delete res.crossContent
        delete res.pointContent
    })
    let para = {
        deviceNum: window.innerWidth + "_" + window.innerHeight,
        fistCheckPointTimeStamp: setAttr.fistCheckPointTime,//第一点爆炸结束时间
        startVideoTimeStamp: setAttr.startTime, //打开摄像头的时间戳
        endVideoTimeStamp: setAttr.endTime, //结束摄像头的时间戳
        index: 0,//标识
        estimateNum: store.estimateNum,
        taskType: 4,
        type: 0,
        questionText: JSON.stringify(questionText),
        videoPath: setAttr.upLoadUrl + "/" + setAttr.progressNumber + ".mp4" //录制视频路径
    }
    setCorrect(para).then((res: any) => {
        setTime()
        cb()
        setAttr.codeNo = res.code
        if (res.code === 200) {
            setAttr.switch = false;
            setAttr.text1 = true
            setAttr.text2 = false;
            setAttr.text3 = false;
            currentProcedure.value = store.depressData[1];
            setAttr.audioUrl = currentProcedure.value.steps[0].elements[5].content
            clearInterval(timer8)
            startVideoUrl(setAttr.audioUrl, () => {
                isShowLoading.value = false;
                return;
            })
        }
        if (res.code === 1202 && setAttr.switch) {
            setAttr.switch = false;
            setAttr.showCountdown = true
            setAttr.text1 = false
            setAttr.text2 = false
            setAttr.text3 = true
            currentProcedure.value = store.depressData[1];
            setAttr.audioUrl = currentProcedure.value.steps[0].elements[7].content
            startVideoUrl(setAttr.audioUrl, () => {
                return;
            })
        }
        if (res.code === 1201 && setAttr.switch) {
            setAttr.switch = false;
            setAttr.showCountdown = true
            setAttr.text1 = false
            setAttr.text2 = false
            setAttr.text3 = true
            currentProcedure.value = store.depressData[1];
            setAttr.audioUrl = currentProcedure.value.steps[0].elements[7].content
            startVideoUrl(setAttr.audioUrl, () => {
                return
            })
        }
    })
}

</script>

<style lang="less" scoped>
.corrent_box {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: #FBF9E8;
}

.maskBox {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99;
}

.videoTd {
    display: none;
}

.msg {
    line-height: 100vh;
    text-align: center;
    font-size: 80px;
}

.corrent_content {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.cicle {
    width: 120px;
    height: 120px;
    background: #65472B;
    border-radius: 50%;
    color: #fff;
    text-align: center;
    font-size: 25px;
    font-weight: bold;
    line-height: 120px;
    margin: auto;
}

.cont-img {
    margin: auto;
    position: absolute;
    left: 0;
    top: 0;
}

.end_text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.downMsg {
    text-align: center;
    font-size: 80px;
    color: #65472B;
    box-sizing: border-box;
}

.downNum {
    width: 84px;
    height: 84px;
    background: #65472B;
    border-radius: 50%;
    line-height: 84px;
    text-align: center;
    font-size: 40px;
    color: #FFFFFF;
}

.animate__animated.animate__rotateOut {
    -webkit-animation-name: rotateOut;
    animation-name: rotateOut;
    -webkit-transform-origin: center;
    transform-origin: center;
}

@keyframes rotateOut {
    from {
        opacity: 1;
    }

    to {
        -webkit-transform: rotate3d(0, 0, 1, 560deg);
        transform: rotate3d(0, 0, 1, 560deg);
        opacity: 0;
    }
}

.animate__animated.animate__zoomIn {
    -webkit-animation-name: zoomIn;
    animation-name: zoomIn;
}

@keyframes zoomIn {
    from {
        opacity: 0;
        -webkit-transform: scale3d(0.3, 0.3, 0.3);
        transform: scale3d(0.3, 0.3, 0.3);
    }

    50% {
        opacity: 1;
    }
}
</style>