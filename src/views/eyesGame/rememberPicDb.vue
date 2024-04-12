<template>
    <div class="remember-box">
        <!-- 时间动画效果 isShowNumber-->
        <div v-if="isShowProgress">
            <div class="number-count">
                <div class="set-question-wz">{{ progressNumber }} / {{ (needRemenberArr.length) }}
                </div>
            </div>
        </div>
        <img v-if="isShowVoice"
            :style="{ width: currentProcedure?.steps[0].elements[0].size + 'px', position: 'absolute', left: currentProcedure?.steps[0].elements[0].x + 'px', top: currentProcedure?.steps[0].elements[0].y + 'px' }"
            :src="currentProcedure?.steps[0].elements[0].content" alt="">
        <!--  照片列表部分  -->
        <div v-if="isShowPicList" :key="setNumberKey + 3">
            <div class="pic-list-box">
                <div class="head-box">
                    <div v-for="(item, index) in nowShowPicArr" :key="index">
                        <img :style="{ 'left': item.x + 'px', 'top': item.y + 'px', width: item.imageSize + 'px' }"
                            class="picture" :src="item.content" alt="" />
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

import { onMounted, reactive, toRefs, ref, createVNode } from 'vue'
import { useRouter } from 'vue-router'
import { listItemType, memoryImagesType, memoryImagesItemTypeETD } from '../../stores/types/eyes_game'
import { useEyesGameStore } from '../../stores/eyes_game'
import { setEstimate } from '../../apis/eyes_game/index'
import { startVideo, endVideo, reupload } from '../../utils/voice'
import { Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { useState } from '../../stores/state'

export default {
    components: {
        // [Loading.name]: Loading,
    },
    setup() {
        const serveStore = useState()
        const store = useEyesGameStore();
        const router = useRouter();
        const setAttr = reactive({
            isShowLoading: false,
            isShowProgress: false,
            isShowVoice: false, // 十字
            isShowPicList: false, // 是否显示图片列表
            setNumberKey: 0, // 随机数
            currentIndexPic: 0, // 当前正在处理第几轮图片的索引
            progressNumber: 1, // 当前进度显示
            startTime: 0,
            endTime: 0,
            upLoadUrl: "zskj-object/edb-ad",
            firstFrameTime: 0
        })

        const currentProcedure = ref<listItemType | undefined>(undefined);
        const nowShowPicArrObj = ref<memoryImagesType | undefined>(undefined);// 当前需要显示的图片对象
        const nowShowPicArr = ref<memoryImagesItemTypeETD[] | undefined>(undefined);// 当前需要显示的数组图片
        const needRemenberArr = ref<memoryImagesType[]>([]);// 需要记忆的所有图片
        currentProcedure.value = store.currentProcedure;
        needRemenberArr.value = currentProcedure.value!.steps[0].interferograms as memoryImagesType[]
        setAttr.upLoadUrl = "zskj-object/edb-ad/" + store.estimateNum + "/image_memory/" + setAttr.progressNumber;

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

        let sel = [
            {
                x: 0,
                y: 0,
                pic: "",
                position: 0,
                select: 0
            }
        ]

        const uploadVideoWatch = (cb: () => void) => {
            let questionText = {
                els: sel,
                firstFrameTime: setAttr.firstFrameTime,
                modelType: store.modelType,
                width: window.innerWidth,
                height: window.innerHeight
            }
            let para = {
                endVideoTimeStamp: setAttr.endTime,
                estimateNum: store.estimateNum,
                index: setAttr.currentIndexPic + 1,
                questionText: JSON.stringify(questionText),
                startVideoTimeStamp: setAttr.startTime,
                taskType: 3,
                type: 2,
                failEstimateNum: serveStore.QueryProData.estimateNum,
                videoPath: setAttr.upLoadUrl + "/" + setAttr.progressNumber + ".mp4"
            }
            // alert(JSON.stringify(para))
            setEstimate(para).then(res => {
                if (res.code === 200) {
                    cb()
                    if (setAttr.currentIndexPic + 1 === needRemenberArr.value.length) {
                        store.eyeProcedureActive += 1;
                        router.push("/xmEndVoice")
                    } else {
                        setAttr.currentIndexPic += 1;
                        setAttr.progressNumber += 1;
                        setAttr.setNumberKey += 1;
                        handleNowShowPicList();
                    }
                }
            })
        }

        const picListShowHandlea = () => {
            setAttr.upLoadUrl = "zskj-object/edb-ad/" + store.estimateNum + "/image_memory/" + setAttr.progressNumber;
            nowShowPicArr.value = nowShowPicArrObj.value?.memoryImages;
            setAttr.isShowProgress = true;
            setAttr.isShowVoice = false;
            setAttr.isShowPicList = false;
            sel = []
            for (let i = 0; i < (nowShowPicArr.value as memoryImagesItemTypeETD[]).length; i++) {
                let selItem = {
                    x: (nowShowPicArr.value as memoryImagesItemTypeETD[])[i].x as number,
                    y: (nowShowPicArr.value as memoryImagesItemTypeETD[])[i].y as number,
                    pic: (nowShowPicArr.value as memoryImagesItemTypeETD[])[i].content,
                    position: i % 2,
                    select: (nowShowPicArr.value as memoryImagesItemTypeETD[])[i].select
                }
                sel.push(selItem)
            }
            let para = { id: setAttr.progressNumber, project_code: setAttr.upLoadUrl }
            startVideo(para, () => {
                setAttr.startTime = new Date().getTime()
            })
            let timer: NodeJS.Timeout | null = setTimeout(() => {
                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }
                setAttr.isShowProgress = false;
                setAttr.isShowVoice = true;
                setAttr.isShowPicList = false;
                let timer2: NodeJS.Timeout | null = setTimeout(() => {
                    if (timer2) {
                        clearTimeout(timer2);
                        timer2 = null;
                    }
                    setAttr.isShowProgress = false;
                    setAttr.isShowVoice = false;
                    setAttr.isShowPicList = true;
                    let timer3: NodeJS.Timeout | null = setTimeout(() => {
                        if (timer3) {
                            clearTimeout(timer3);
                            timer3 = null;
                        }
                        setAttr.isShowProgress = false;
                        setAttr.isShowPicList = false;
                        setAttr.isShowVoice = false;
                        let para = { id: setAttr.progressNumber, project_code: setAttr.upLoadUrl }
                        setAttr.isShowLoading = true;
                        endVideo(para, (data: any) => {
                            let obj = eval(`( ${data} )`);
                            setAttr.firstFrameTime = obj.firstFrameTime || 0;
                            setAttr.endTime = new Date().getTime();
                        })
                    }, Number((nowShowPicArr.value as memoryImagesItemTypeETD[])[0].imageTime))
                }, Number(currentProcedure.value!.steps[0]!.elements[0].waitTime))
            }, 2000)

        }

        const getAllList = () => { // 获取接口请求参数
            handleNowShowPicList()
        }


        const handleNowShowPicList = () => {
            // 处理当前正在显示的图片
            setAttr.setNumberKey = Math.random();
            nowShowPicArrObj.value = needRemenberArr.value[setAttr.currentIndexPic];
            nowShowPicArrObj.value!.memoryImages.forEach((item: memoryImagesItemTypeETD, index: number) => {
                item.y = currentProcedure.value!.steps[0].ypx as number;
                if (index % 2 === 1) {
                    item.x = currentProcedure.value!.steps[0].rightPx as number;
                } else {
                    item.x = currentProcedure.value!.steps[0].leftPx as number;
                }
            });
            picListShowHandlea()
        };

        onMounted(() => {
            getAllList()
        })

        return {
            nowShowPicArr,
            needRemenberArr,
            currentProcedure,
            ...toRefs(setAttr)
        }
    }
}
</script>

<style lang="less" scoped>
.four-pic {
    width: 60px;
    height: 60px;
    transform: translate(-50%, -50%);
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 2;
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

@media only screen and (min-width: 800px) and (max-width: 1001px) {
    .remember-box {
        width: 100vw;
        height: 100vh;
        background: #fcf8e6;
        overflow: hidden;
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

    .pic-tips-font {
        width: 95%;
        text-align: center;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 50px;
        color: #654925;
    }

    .pic-list-box {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }

    .picture {
        background: #fff;
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: 0;
    }

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

    // .numberpic-box {
    //     width: 332px;
    //     height: 332px;
    //     margin: 134px 0 0 334px;
    //     position: relative;
    // }

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
}

@media only screen and (min-width: 1002px) and (max-width: 1600px) {
    .remember-box {
        width: 100vw;
        height: 100vh;
        background: #fcf8e6;
        overflow: hidden;
    }

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

    .pic-tips-font {
        width: 95%;
        text-align: center;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 50px;
        color: #654925;
    }

    .pic-list-box {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }

    .picture {
        background: #fff;
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: 0;
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

    .three-pic {
        width: 207px;
        height: 297px;
        margin: 92px 0 0 134px;
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

    .number-count {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }

    // .numberpic-box {
    //     width: 478px;
    //     height: 478px;
    //     margin: 193px 0 0 481px;
    //     position: relative;
    // }

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
}

.maskBox {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>