<!-- 正式眼跳任务 -->
<template>
    <div class="all-box">
        <video id="video6" class="audio-box" :muted="isMuted" autoplay="true" src="" controls="true">
        </video>
        <div v-if="!isShowDoBtn">
            <!-- 眼动数字倒计时  -->
            <div class="number-count" v-if="isShowNumber">
                <div class="set-question-wz">{{ progressNumber }} / {{ (eyeActions!.length) }}</div>
            </div>
            <div class="box-content" v-if="!isShowNumber">
                <!-- 眼动测试训练 -->
                <div class="yd-box">
                    <img v-if="cross"
                        :style="{ position: 'absolute', left: (eyeActions as eyeActions[])[0].center.x + 'px', top: (eyeActions as eyeActions[])[0].center.y + 'px' }"
                        :src="(eyeActions as eyeActions[])[0].center.content" alt="">
                    <div v-if="ydShow">
                        <img :style="{ position: 'absolute', left: (eyeActions as eyeActions[])[currentIndex].pointAction.brownPoint.x + 'px', top: (eyeActions as eyeActions[])[currentIndex].pointAction.brownPoint.y + 'px' }"
                            :src="(eyeActions as eyeActions[])[currentIndex].pointAction.brownPoint.content" alt="">
                        <img :style="{ position: 'absolute', left: (eyeActions as eyeActions[])[currentIndex].pointAction.redPoint.x + 'px', top: (eyeActions as eyeActions[])[currentIndex].pointAction.redPoint.y + 'px' }"
                            :src="(eyeActions as eyeActions[])[currentIndex].pointAction.redPoint.content" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="maskBox" v-if="isShowLoading">
            <a-spin size="large" />
        </div>
    </div>
</template>
<script lang="ts">
import { onMounted, ref, reactive, toRefs, createVNode } from "vue";
import { useRouter } from "vue-router";
import { useEyesGameStore } from '../../stores/eyes_game'
import { listItemType, eyeActions } from '../../stores/types/eyes_game'
import { setEstimate } from '../../apis/eyes_game/index'
import { startVideo, endVideo, reupload } from "../../utils/voice";
import { Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
export default {
    setup() {
        const store = useEyesGameStore()
        const router = useRouter();
        const setAttr = reactive({
            clickTureNum: 0, // 点击的正确数
            isShowDoBtn: true,
            isShowLeftBox: true,
            currentIndex: 0, // 当前正在处理的索引
            ydShow: false,
            isShowNumber: false, // 是否显示数字页面
            progressNumber: 1, // 当前进度显示
            isShowLoading: false,
            cross: false,
            isMuted: true,
            getHttpVideo: "#",
            upLoadUrl: "zskj-object/edb-ad",
            startTime: 0,
            endTime: 0,
            firstFrameTime: 0
        });
        const currentProcedure = ref<listItemType | undefined>(undefined)
        const eyeActions = ref<eyeActions[] | undefined>(undefined)
        currentProcedure.value = store.currentProcedure;
        eyeActions.value = currentProcedure.value.steps[1].eyeActions as eyeActions[];
        setAttr.getHttpVideo = currentProcedure.value.steps[0].elements[0].content;
        setAttr.upLoadUrl = "zskj-object/edb-ad/" + store.estimateNum + "/eye_move/" + setAttr.progressNumber;

        window['endUploadVideo'] = (val: string) => {
            if (val === 'upload_ok') {
                uploadVideoWatch(() => {
                    setAttr.isShowLoading = false
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
                        reupload(setAttr.progressNumber)
                        modal.destroy();
                    }
                });
            }
        }

        let eyeData = [{
            time: 0,
            els: [
                {
                    x: 0,
                    y: 0,
                    pic: ""
                }
            ]
        }]

        const timeCountHandle = () => {
            eyeData = [];
            setAttr.upLoadUrl = "zskj-object/edb-ad/" + store.estimateNum + "/eye_move/" + setAttr.progressNumber;
            // 倒计时时间处理
            let para = { id: setAttr.progressNumber, project_code: setAttr.upLoadUrl }
            startVideo(para, () => {
                setAttr.startTime = new Date().getTime()
            })
            setAttr.isShowDoBtn = false;
            setAttr.isShowNumber = true;
            setAttr.cross = false;
            setAttr.ydShow = false;
            let timer3: NodeJS.Timeout | null = setTimeout(() => {
                // 最后一次倒计时,开始显示题目
                if (timer3) {
                    clearTimeout(timer3);
                    timer3 = null;
                }
                setAttr.isShowNumber = false;
                setAttr.cross = true;
                setAttr.ydShow = false;
                let eyeDataItem = {
                    time: new Date().getTime(),
                    els: [
                        {
                            x: (eyeActions.value as eyeActions[])[0].center.x,
                            y: (eyeActions.value as eyeActions[])[0].center.y,
                            pic: (eyeActions.value as eyeActions[])[0].center.content
                        }
                    ]
                }
                eyeData.push(eyeDataItem);
                let timer4: NodeJS.Timeout | null = setTimeout(() => {
                    if (timer4) {
                        clearTimeout(timer4);
                        timer4 = null;
                    }
                    setAttr.isShowNumber = false;
                    setAttr.cross = false;
                    let eyeDataItem = {
                        time: new Date().getTime(),
                        els: []
                    }
                    eyeData.push(eyeDataItem);
                    let timer6: NodeJS.Timeout | null = setTimeout(() => {
                        if (timer6) {
                            clearTimeout(timer6);
                            timer6 = null;
                        };
                        setAttr.ydShow = true;
                        let eyeDataItem = {
                            time: new Date().getTime(),
                            els: [
                                {
                                    x: (eyeActions.value as eyeActions[])[setAttr.currentIndex].pointAction.brownPoint.x,
                                    y: (eyeActions.value as eyeActions[])[setAttr.currentIndex].pointAction.brownPoint.y,
                                    pic: (eyeActions.value as eyeActions[])[setAttr.currentIndex].pointAction.brownPoint.content
                                },
                                {
                                    x: (eyeActions.value as eyeActions[])[setAttr.currentIndex].pointAction.redPoint.x,
                                    y: (eyeActions.value as eyeActions[])[setAttr.currentIndex].pointAction.redPoint.y,
                                    pic: (eyeActions.value as eyeActions[])[setAttr.currentIndex].pointAction.redPoint.content
                                },
                            ]
                        }
                        eyeData.push(eyeDataItem);
                        let timer5: NodeJS.Timeout | null = setTimeout(() => {
                            if (timer5) {
                                clearTimeout(timer5);
                                timer5 = null;
                            };
                            setAttr.isShowNumber = false;
                            setAttr.cross = false;
                            setAttr.ydShow = false;
                            setAttr.isShowLoading = true
                            let para = { id: setAttr.progressNumber, project_code: setAttr.upLoadUrl }
                            endVideo(para, (data: any) => {
                                let obj = eval(`( ${data} )`);
                                setAttr.firstFrameTime = obj.firstFrameTime || 0;
                                setAttr.endTime = new Date().getTime();
                            })
                        }, Number((eyeActions.value as eyeActions[])[setAttr.currentIndex].pointAction.pointTime));
                    }, 200)
                }, (eyeActions.value as eyeActions[])[setAttr.currentIndex].center.wait);
            }, 2000);
        };

        const startVideoUrl = (url: string) => { // 开始播放语音
            let video: HTMLVideoElement = document.getElementById("video6") as HTMLVideoElement;
            video.src = url;
            setAttr.isMuted = false;
            video.addEventListener( // 监听语音播放结束
                "ended",
                () => {
                    timeCountHandle()
                },
                false
            );
            let timer = setTimeout(() => {
                clearTimeout(timer)
                video.play();
            }, 0)

        }
        const getList = () => {
            startVideoUrl(setAttr.getHttpVideo)
        }


        const uploadVideoWatch = (cb: () => void) => {
            let questionText = {
                data: eyeData,
                modelType: store.modelType,
                firstFrameTime: setAttr.firstFrameTime,
                width: window.innerWidth,
                height: window.innerHeight
            }
            let para = {
                endVideoTimeStamp: setAttr.endTime,
                estimateNum: store.estimateNum,
                index: setAttr.currentIndex + 1,
                questionText: JSON.stringify(questionText),
                startVideoTimeStamp: setAttr.startTime,
                taskType: 3,
                type: 1,
                videoPath: setAttr.upLoadUrl + "/" + setAttr.progressNumber + ".mp4"
            }
            setEstimate(para).then(res => {
                if (res.code === 200) {
                    if (setAttr.currentIndex + 1 === eyeActions.value?.length) {
                        console.log("要跳转了");
                        store.eyeProcedureActive += 1;;
                        router.push('/xmBeforeHyPicVoice');
                    } else {
                        setAttr.currentIndex++;
                        setAttr.progressNumber++;
                        setAttr.isShowDoBtn = true;
                        timeCountHandle();
                    }
                }
                cb()
            })
        }


        onMounted(() => {
            getList()
        });

        return {
            router,
            eyeActions,
            ...toRefs(setAttr),
        };
    }
};
</script>
<style lang="less" scoped>
.audio-box {
    position: fixed;
    z-index: 10;
    opacity: 0;
}

@media only screen and (min-width: 800px) and (max-width: 1001px) {
    .three-pic {
        width: 144px;
        height: 206px;
        margin: 64px 0 0 93px;
        position: absolute;
        z-index: 2;
    }

    .two-pic {
        width: 145px;
        height: 206px;
        margin: 60px 0 0 91px;
        position: absolute;
        z-index: 2;
    }

    .yuan {
        width: 332px;
        height: 332px;
        position: absolute;
        left: 0;
        top: 0;
    }

    .one-pic {
        width: 91px;
        height: 202px;
        margin: 64px 0 0 111px;
        position: absolute;
        z-index: 2;
    }

    .number-count {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }

    .numberpic-box {
        width: 332px;
        height: 332px;
        margin: 134px 0 0 334px;
        position: relative;
    }

    .add-animate {
        animation: changeSty 1s ease-in-out;
    }

    @keyframes changeSty {
        0% {
            transform: scale(1);
            opacity: 1;
        }

        100% {
            transform: scale(0);
            opacity: 0;
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

    .voice-box {
        position: absolute;
        left: 309px;
        bottom: 61px;
        z-index: 2;
        display: flex;
        align-items: center;
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

    .voice-box-speak {
        position: absolute;
        left: 445px;
        bottom: 15px;
        z-index: 2;
        display: flex;
        align-items: center;
    }

    .font-show {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 50px;
        font-family: Helvetica;
        color: #654925;
    }

    .yd-box {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }

    .left-d {
        position: absolute;
        left: 0;
        top: 0;
        width: 25px;
        height: 25px;

        img {
            width: 25px;
            height: 25px;
            border-radius: 50%;
        }
    }
}

@media only screen and (min-width: 1002px) and (max-width: 1600px) {
    .progress-box {
        width: 648px;
        height: 36px;
        background: rgba(101, 73, 37, 0.19);
        border-radius: 26px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 9;

        .infect-progress {
            height: 36px;
            background: #654925;
            border-radius: 26px;
        }

        .progress-box-tips {
            width: 145px;
            height: 107px;
            background: url("../../static/images/qipao.png") no-repeat 100%/100%;
            position: absolute;
            top: -110px;
            line-height: 92px;
            text-align: center;
            color: #fff;
            font-size: 40px;
        }
    }

    .number-count {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }

    .numberpic-box {
        width: 332px;
        height: 332px;
        margin: 134px 0 0 334px;
        position: relative;
    }

    .add-animate {
        animation: changeSty 1s ease-in-out;
    }

    @keyframes changeSty {
        0% {
            transform: scale(1);
            opacity: 1;
        }

        100% {
            transform: scale(0);
            opacity: 0;
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
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 50px;
        font-family: Helvetica;
        color: #654925;
    }

    .yd-box {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }

    .left-d {
        position: absolute;
        left: 0;
        top: 0;
        width: 25px;
        height: 25px;

        img {
            width: 24px;
            height: 24px;
            border-radius: 50%;
        }

        img.setTen {
            width: 60px;
            height: 60px;
        }
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

    .numberpic-box {
        width: 478px;
        height: 478px;
        margin: 193px 0 0 481px;
        position: relative;
    }

    .yuan {
        width: 478px;
        height: 478px;
        position: absolute;
        left: 0;
        top: 0;
    }

    .one-pic {
        width: 132px;
        height: 292px;
        margin: 92px 0 0 160px;
        position: absolute;
        z-index: 2;
    }

    .two-pic {
        width: 208px;
        height: 297px;
        margin: 87px 0 0 132px;
        position: absolute;
        z-index: 2;
    }

    .three-pic {
        width: 207px;
        height: 297px;
        margin: 92px 0 0 134px;
        position: absolute;
        z-index: 2;
    }
}

.font-show {
    width: 90%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 50px;
    font-family: Helvetica;
    color: #654925;
    text-align: center;
    background-color: #fcf8e6;

    .pic-tips-font {
        width: 90%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 120px;
        color: #654925;
    }
}

.maskBox {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.set-question-wz {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 46px !important;
    color: #333;
    font-weight: bold;
}
</style>
