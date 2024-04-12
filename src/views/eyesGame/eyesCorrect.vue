<template>
    <div class="corrent_box">
        <audio class="videoTd" id="audioPlay" src="" autoplay="true" controls="false"></audio>
        <div class="msg_box" v-if="setAttr.showText">
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
            <div class="cont-img" v-for="(item, index) in checkPoints"
                :style="{ width: checkPoints[setAttr.checkPointsIndex].size + 'px', height: checkPoints[setAttr.checkPointsIndex].size + 'px', top: item.animationTop ? item.animationTop + 'px' : '', left: item.animationLeft ? item.animationLeft + 'px' : '', transform: item.animationTop && item.animationLeft ? 'translate(0, 0)' : 'translate(-50%, -50%)' }">
                <div v-if="setAttr.checkPointsIndex == index && setAttr.animationIndex >= 1">
                    <img v-if="setAttr.animationIndex === 1" class="corrent_round"
                        :style="{ width: item.size + 'px', height: item.size + 'px', animationDuration: item.pointTime + 'ms' }"
                        :src="item.pointContent">
                    <img v-if="setAttr.animationIndex === 2" class="imgCha"
                        :style="{ width: item.size + 'px', height: item.size + 'px', animationDuration: item.crossTime + 'ms' }"
                        :src="item.crossContent">
                    <img v-if="setAttr.animationIndex === 3" class="imgbao"
                        :style="{ width: item.size + 'px', height: item.size + 'px', animationDuration: item.boomTime + 'ms' }"
                        :src="item.boomContent">
                </div>
            </div>
            <div class="end_text" v-if="setAttr.showCountdown">
                <div class="downMsg" v-if="setAttr.text1">
                    <div style="margin: 100px 0;">{{ currentProcedure?.steps[0].elements[4].content }}</div>
                    <div class="cicle" @click="jumpPage">下一步</div>
                </div>
                <div class="downMsg" v-if="setAttr.text2">
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
import { setCorrect, getUrl } from '../../apis/eyes_game/index'
import { useEyesGameStore } from '../../stores/eyes_game'
import { startVideo, endVideo, reupload } from '../../utils/voice'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { useState } from "@/stores/state"
import { Modal } from 'ant-design-vue';
const state = useState()
const store = useEyesGameStore()
const router = useRouter()
const route = useRoute();
const routeStr = ref<string>('')
const currentProcedure = ref<any>(undefined)
const checkPoints = ref<any>([])
let isShowLoading = ref<boolean>(false)
let timer8: NodeJS.Timeout | number
const setAttr = reactive({
    showText: true,
    showCountdown: false,
    showText1: true,
    showText2: false,
    showText3: false,
    text1: false,
    text2: false,
    countdown: 10,
    upLoadUrl: "",//文件夹路径
    upLoadName: "",//文件夹名称
    progressNumber: 0, // 当前进度显示
    fistCheckPointTime: 0,
    startTime: 0,
    endTime: 0,
    switch: true,
    codeNo: 0,
    audioUrl: '',
    firstFrameTime: 0,
    animationIndex: 0,
    checkPointsIndex: 0,
})

onMounted(() => {
    routeStr.value = route.query.str as string
    // alert(routeStr.value +'来源')
    // alert(store.estimateNum +'眼动单号')
    // alert(state.estimateNum +'抑郁单号')
    getPageUrl()
    console.log(setAttr.upLoadUrl)
    getFontConfig();
    startVideoUrl(setAttr.audioUrl)
})
//获取上传视频路径
const getPageUrl = () => {
    let pamars = {
        estimateNum: route.query.estimateNum as string,
        index: 0,
        taskType: 3,
        type: 0,
    }

    if (routeStr.value == 'depress') {
        pamars = {
            estimateNum: route.query.estimateNum as string,
            index: 0,
            taskType: 4,
            type: 0,
        }
    }
    if (routeStr.value == 'eyes') {
        pamars = {
            estimateNum: route.query.estimateNum as string,
            index: 0,
            taskType: 3,
            type: 0,
        }
    }
    getUrl(pamars).then((res) => {
        console.log(res)
        setAttr.upLoadUrl = res.data.filePath
        setAttr.upLoadName = res.data.fileName
    })
}

const publicFun = () => {
    console.log('这是i=', setAttr.checkPointsIndex)
    setAttr.animationIndex = 1;
    let startTime = new Date().getTime();
    checkPoints.value[setAttr.checkPointsIndex].animationLeft = checkPoints.value[setAttr.checkPointsIndex].x;
    checkPoints.value[setAttr.checkPointsIndex].animationTop = checkPoints.value[setAttr.checkPointsIndex].y;
    let endTime: number = Number(currentProcedure.value?.steps[0].checkPoints[setAttr.checkPointsIndex].boomTime) + Number(currentProcedure.value?.steps[0].checkPoints[setAttr.checkPointsIndex].crossTime) + Number(currentProcedure.value?.steps[0].checkPoints[setAttr.checkPointsIndex].pointTime)
    let timerS = setTimeout(() => {
        clearTimeout(timerS)
        setAttr.showText = false
        if (setAttr.checkPointsIndex === 0) {
            let para = { id: setAttr.progressNumber, project_code: setAttr.upLoadUrl }
            startVideo(para, () => {
                setAttr.startTime = new Date().getTime()
            })
            setAttr.fistCheckPointTime = new Date().getTime()
        }
        let timerO = setTimeout(() => {
            clearTimeout(timerO)
            setAttr.animationIndex += 1
            let timerT = setTimeout(() => {
                clearTimeout(timerT)
                setAttr.animationIndex += 1
                let timerH = setTimeout(() => {
                    clearTimeout(timerH)
                    setAttr.animationIndex += 1
                    currentProcedure.value!.steps[0].checkPoints[setAttr.checkPointsIndex].stimulateStartTime = startTime;
                    currentProcedure.value!.steps[0].checkPoints[setAttr.checkPointsIndex].stimulateEndTime = startTime + endTime;
                    if (setAttr.checkPointsIndex < currentProcedure.value?.steps[0].checkPoints.length - 1) {
                        setAttr.checkPointsIndex += 1;
                        publicFun()
                    } else {
                        isShowLoading.value = true;
                        let para = { id: setAttr.progressNumber, project_code: setAttr.upLoadUrl }
                        endVideo(para, (data: any) => {
                            // alert(JSON.stringify(data));
                            let obj = eval(`( ${data} )`);
                            setAttr.firstFrameTime = obj.firstFrameTime || 0;
                            setAttr.endTime = new Date().getTime();
                        })
                    }
                }, Number(checkPoints.value[setAttr.checkPointsIndex].boomTime))
            }, Number(checkPoints.value[setAttr.checkPointsIndex].crossTime))
        }, Number(checkPoints.value[setAttr.checkPointsIndex].pointTime))
    }, 100)
}


const setTime = () => {
    timer8 = setInterval(() => {
        if (setAttr.countdown > 0) {
            setAttr.countdown--;
        } else {
            clearInterval(timer8);
            if (setAttr.switch) {
                setAttr.showCountdown = true;
                setAttr.text1 = true;
                setAttr.text2 = false;
                currentProcedure.value = store.currentProcedure;
                setAttr.audioUrl = currentProcedure.value.steps[0].elements[5].content
                startVideoUrl(setAttr.audioUrl)
            }
        }
    }, 1000);
}

const getFontConfig = () => {
    // 获取语音及文字配置
    if (routeStr.value == 'depress') {
        currentProcedure.value = state.depressData[1]
    }
    if (routeStr.value == 'eyes') {
        store.eyeProcedureActive = 1;
        currentProcedure.value = store.currentProcedure
    }
    for (let i = 0; i < currentProcedure.value.steps[0].checkPoints.length; i++) {
        currentProcedure.value.steps[0].checkPoints[i].animationLeft = null;
        currentProcedure.value.steps[0].checkPoints[i].animationTop = null;
        checkPoints.value.push(currentProcedure.value.steps[0].checkPoints[i]);
    }
    console.log(currentProcedure.value)
    setAttr.audioUrl = currentProcedure.value.steps[0].elements[1].content;
    let timers = setTimeout(() => {
        clearTimeout(timers)
        setAttr.audioUrl = currentProcedure.value?.steps[0].elements[1].content
        startVideoUrl(setAttr.audioUrl)
        let timerU = setTimeout(() => {
            clearTimeout(timerU)
            setAttr.showText1 = false
            setAttr.showText2 = true
            setAttr.showText3 = false
            setAttr.audioUrl = currentProcedure.value?.steps[0].elements[3].content as string
            // startVideoUrl(setAttr.audioUrl)
            // publicFun()
            startVideoUrl(setAttr.audioUrl, () => {
                publicFun()
            })
        }, Number(currentProcedure.value?.steps[0].elements[3].waitTime))
    }, Number(currentProcedure.value?.steps[0].elements[1].waitTime))
}
window['endUploadVideo'] = (val: string) => {
    checkPoints.value = []
    if (val === 'upload_ok') {
        uploadVideoWatch(() => {
            isShowLoading.value = false;
        })
    } else {
        const modal = Modal.warning({
            title: '提示',
            icon: createVNode(ExclamationCircleOutlined),
            content: '上传失败，请检查网络后重试',
            closable: false,
            okText: '重试',
            zIndex: 9999999999,
            onOk: () => {
                reupload(setAttr.progressNumber);
                modal.destroy();
            }
        });
    }
}

//重新校验
const again = () => {
    if (routeStr.value == 'depress') {
        router.push({
            path: '/startDepress',
            query: {
                ticketCode: route.query.ticketCode,
                estimateNum: route.query.estimateNum
            }
        })
    }
    if (routeStr.value == 'eyes') {
        router.replace({
            path: '/xmCameraCenter',
            query: {
                ticketCode: route.query.ticketCode,
                estimateNum: route.query.estimateNum
            }
        })
    }
}
const jumpPage = () => {
    if (routeStr.value == 'depress') {
        router.push("/freeGuide")
    }
    if (routeStr.value == 'eyes') {
        store.eyeProcedureActive += 1;
        router.push("/xmBeforeRemPicVoice")
    }
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
    // alert(JSON.stringify(questionText))
    let para = {
        deviceNum: window.innerWidth + "_" + window.innerHeight,
        fistCheckPointTimeStamp: setAttr.fistCheckPointTime,//第一点爆炸结束时间
        startVideoTimeStamp: setAttr.startTime, //打开摄像头的时间戳
        endVideoTimeStamp: setAttr.endTime, //结束摄像头的时间戳
        index: 0,//标识
        estimateNum: route.query.estimateNum as any,
        taskType: 3,
        type: 0,
        questionText: JSON.stringify(questionText),
        firstFrameTime: setAttr.firstFrameTime,
        videoPath: setAttr.upLoadName //录制视频
    }
    // alert(JSON.stringify(
    //     {
    //     deviceNum: window.innerWidth + "_" + window.innerHeight,
    //     fistCheckPointTimeStamp: setAttr.fistCheckPointTime,//第一点爆炸结束时间
    //     startVideoTimeStamp: setAttr.startTime, //打开摄像头的时间戳
    //     endVideoTimeStamp: setAttr.endTime, //结束摄像头的时间戳
    //     index: 0,//标识
    //     estimateNum: route.query.estimateNum as any,
    //     taskType: 3,
    //     type: 0,
    //     questionText: JSON.stringify(questionText),
    //     firstFrameTime: setAttr.firstFrameTime,
    //     videoPath: setAttr.upLoadName //录制视频
    // }))
    if (routeStr.value == 'depress') {
        para.taskType = 4
    }
    if (routeStr.value == 'eyes') {
        para.taskType = 3
    }
    // alert(JSON.stringify(para))
    setCorrect(para).then((res: any) => {
        setTime()
        cb()
        setAttr.codeNo = res.code;
        if (res.code == 200) {
            //眼动矫正成功
            if (routeStr.value == 'depress') {
                currentProcedure.value = state.depressData[1];
            }
            if (routeStr.value == 'eyes') {
                currentProcedure.value = store.currentProcedure
            }
            setAttr.audioUrl = currentProcedure.value.steps[0].elements[5].content
            setAttr.showCountdown = true
            setAttr.text1 = true
            setAttr.text2 = false
            setAttr.switch = false
            clearInterval(timer8)
            startVideoUrl(setAttr.audioUrl, () => {
                isShowLoading.value = false;
                return;
            })
        }
        if (res.code == 1202) {
            //未检测到人脸，矫正失败
            if (routeStr.value == 'depress') {
                currentProcedure.value = state.depressData[1]
            }
            if (routeStr.value == 'eyes') {
                currentProcedure.value = store.currentProcedure
            }
            setAttr.showCountdown = true
            setAttr.text2 = true
            setAttr.text1 = false
            setAttr.switch = false
            setAttr.audioUrl = currentProcedure.value.steps[0].elements[7].content
            startVideoUrl(setAttr.audioUrl, () => {
                isShowLoading.value = false;
                store.eyeProcedureActive = 0
                return;
            })
        }
        if (res.code == 1201) {
            //多张人脸，矫正失败
            if (routeStr.value == 'depress') {
                currentProcedure.value = state.depressData[1]
            }
            if (routeStr.value == 'eyes') {
                currentProcedure.value = store.currentProcedure
            }
            setAttr.showCountdown = true
            setAttr.text2 = true
            setAttr.text1 = false
            setAttr.switch = false
            setAttr.audioUrl = currentProcedure.value.steps[0].elements[7].content
            startVideoUrl(setAttr.audioUrl, () => {
                isShowLoading.value = false;
                store.eyeProcedureActive = 0
                return
            })
        }
    }).catch((res: any) => {
        console.log(res)
        isShowLoading.value = false;
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
.msg_box{
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.msg {
    width:100%;
    height:150px;
    text-align: center;
    font-size: 80px;
}

.corrent_content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.cicle {
    width: 120px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #65472B;
    border-radius: 50%;
    color: #fff;
    font-size: 25px;
    font-weight: bold;
    line-height: 120px;
    margin: auto;
}


.cont-img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.1s ease;
}

.corrent_round {
    animation: myzoom 0.1s;
}

.imgCha {
    animation: myrotate 0.1s;
}

.imgbao {
    animation: myrezoom 0.1s;
}

@keyframes myzoom {
    0% {
        transform: scale(1);
    }

    40% {
        transform: scale(1);
    }

    70% {
        transform: scale(0.5);
    }

    100% {
        transform: scale(0.8);
    }
}

@keyframes myrotate {
    0% {
        transform: rotateX(0);
    }

    50% {
        transform: rotateZ(630deg);
    }

    100% {
        transform: rotateZ(0);
    }
}

@keyframes myrezoom {
    0% {
        transform: scale(0.1);
    }

    100% {
        transform: scale(1);
    }
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
</style>