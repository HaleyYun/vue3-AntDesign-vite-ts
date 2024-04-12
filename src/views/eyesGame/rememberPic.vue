<template>
    <div class="remember-box">
        <!--  第几组图片提示  isShowVoice-->
        <div style="width: 100vw; height: 100vh;" v-if="isShowVoice" :key="setNumberKey + 2">
            <div style="width: 100%; height: 100%;" class="pic-tips">
                <div class="pic-tips-font">{{ text }}</div>
            </div>
        </div>

        <!--  照片列表部分  isShowPicList-->
        <div v-if="isShowPicList" :key="setNumberKey + 3">
            <div class="pic-list-box">
                <div class="head-box">
                    <div style="width: 100%; height: 100%; position: relative;" v-for="(item, index) in nowShowPicArr"
                        :key="index">
                        <img :style="{ left: item.x + 'px', top: item.y + 'px', width: item.imageSize + 'px' }"
                            class="picture" :src="item.content" alt="" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { onMounted, reactive, toRefs, ref } from "vue";
import { useRouter } from "vue-router";
import { useEyesGameStore } from '../../stores/eyes_game'
import { listItemType, memoryImagesType, memoryImagesItemTypeETD } from '../../stores/types/eyes_game'

export default {
    setup() {
        const store = useEyesGameStore();
        const router = useRouter();
        const setAttr = reactive({
            isShowVoice: true, // 是否显示倒计时播放
            isShowPicList: false, // 是否显示图片列表
            currentIndexPic: 0, // 当前正在处理第几轮图片的索引
            text: "", // 当前显示的文字
            step: 0,
            setNumberKey: 0, // 随机数
            loadingShow: false,
            getHttpConfig: [],
            voiceArrList: [""], // 当前文字数组
            videoNumber: 0, // 播放的第N组语音
        });

        const currentProcedure = ref<listItemType | undefined>(undefined);
        currentProcedure.value = store.currentProcedure;
        const needRemenberArr = ref<memoryImagesType[]>([]);// 需要记忆的所有图片
        const nowShowPicArrObj = ref<memoryImagesType | undefined>(undefined);// 当前需要显示的图片对象
        const nowShowPicArr = ref<memoryImagesItemTypeETD[] | undefined>(undefined);// 当前需要显示的数组图片
        setAttr.voiceArrList = [];
        for (let i = 0; i < currentProcedure.value!.steps[0]!.memoryImages!.length; i++) {
            let text = `第${i + 1}组图片`
            setAttr.voiceArrList.push(text)
        }

        const picListShowHandle = () => {
            // 图片依次显示
            nowShowPicArr.value = [];
            setAttr.isShowVoice = false;
            setAttr.isShowPicList = true;
            // 处理依次显示
            let count = 0;
            let timer: NodeJS.Timeout | null = setInterval(() => {
                setAttr.step = count;
                nowShowPicArr.value!.push(nowShowPicArrObj.value!.memoryImages[count]);
                if (count + 1 === nowShowPicArrObj.value!.memoryImages.length) {
                    if (timer) {
                        clearInterval(timer);
                    }
                    timer = null;
                    let timer2: NodeJS.Timeout | null = setTimeout(() => {
                        // 两秒显示后重新倒计时
                        if (timer2) {
                            clearTimeout(timer2);
                        }
                        timer2 = null;
                        // 三个模块显示隐藏
                        if (
                            setAttr.currentIndexPic + 1 >=
                            needRemenberArr.value.length
                        ) {
                            setAttr.isShowVoice = false;
                            setAttr.isShowPicList = false;
                            let timer3: NodeJS.Timeout | null = setTimeout(() => {
                                store.eyeProcedureActive += 1;
                                router.push("/xmBeforeVideoVoice");
                                if (timer3) {
                                    clearTimeout(timer3);
                                }
                                timer3 = null;
                            }, 500);
                            return;
                        }
                        setAttr.isShowVoice = true;
                        setAttr.isShowPicList = false;
                        setAttr.currentIndexPic++;
                        setAttr.videoNumber++
                        handleNowShowPicList();
                        handleFontShow(setAttr.voiceArrList[setAttr.videoNumber])
                    }, Number((nowShowPicArr.value as memoryImagesItemTypeETD[])[0].imageTime));
                    return;
                }
                count++;
            }, 0);
        };

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
        };

        const handleFontShow = (text: string) => { // 处理文字显示
            setAttr.text = text;
            let timer: NodeJS.Timeout | null = setTimeout(() => {
                if (timer) {
                    clearTimeout(timer)
                }
                timer = null
                picListShowHandle();
            }, 2000)
        }

        const getAllList = () => {
            needRemenberArr.value = currentProcedure.value!.steps[0].memoryImages as memoryImagesType[];
            handleNowShowPicList();
            handleFontShow(setAttr.voiceArrList[setAttr.videoNumber])
        };

        onMounted(() => {
            getAllList()
        });

        return {
            ...toRefs(setAttr),
            nowShowPicArr
        };
    },
};
</script>

<style lang="less" scoped>
.audio-box {
    position: fixed;
    z-index: -1;
}

.loadingMask {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 9;

    img {
        width: 256px;
        height: 256px;
        position: absolute;
        left: calc(50% - 128px);
        top: 30%;
    }
}

.remember-box {
    width: 100%;
    height: 100%;
    background: #fcf8e6;
    overflow: hidden;
}

.pic-list-box {
    width: 100%;
    height: 100%;
    background: #fcf8e6;
    position: absolute;
    left: 0;
    top: 0;
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

.pic-tips {
    background: #fcf8e6;
}

.pic-tips-font {
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 120px;
    white-space: nowrap;
    color: #654925;
}

.picture {
    width: 450px;
    height: 450px;
    background: #fff;
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 0;
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

.numberpic-box {
    width: 478px;
    height: 478px;
    margin: 193px 0 0 481px;
    position: relative;
}

.voice-box {
    position: absolute;
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
</style>