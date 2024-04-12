<!-- 正式眼跳任务 -->
<template>
    <div class="all-box">
        <div v-if="!isShowDoBtn">
            <!-- 眼动数字倒计时  -->
            <div class="number-count" v-if="isShowNumber">
                <div class="set-question-wz">{{ progressNumber }} / {{ (eyeActions!.length) }}</div>
            </div>
            <div class="box-content" v-if="!isShowNumber">
                <!-- 眼动测试训练 -->
                <div class="yd-box">
                    <img v-if="!ydShow"
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

        <!--提示部分-->
        <div class="tips-box" v-if="isShowDoBtn">
            <h1>您刚才看向这一侧了吗</h1>
            <!--看向左侧时-->
            <div class="look-left-box" v-if="isShowLeftBox">
                <img class="pic-1" src="../../static/images/eyesGame/yuan_cs.png" alt="">
                <img class="pic-2" src="../../static/images/eyesGame/lt_arrow.png" alt="">
                <img class="pic-3" src="../../static/images/eyesGame/hsyuan.png" alt="">
                <img class="pic-4" src="../../static/images/eyesGame/redyuan.png" alt="">
            </div>
            <!--看向右侧时-->
            <div class="look-right-box" v-if="!isShowLeftBox">
                <img class="pic-4" src="../../static/images/eyesGame/redyuan.png" alt="">
                <img class="pic-3" src="../../static/images/eyesGame/hsyuan.png" alt="">
                <img class="pic-2" src="../../static/images/eyesGame/rt_arrow.png" alt="">
                <img class="pic-1" src="../../static/images/eyesGame/yuan_cs.png" alt="">
            </div>
            <div class="yes-or-no">
                <img @click="questionSucBtn" class="pic-5" src="../../static/images/eyesGame/suc_cs.png" alt="">
                <img @click="questionErrBtn" class="pic-6" src="../../static/images/eyesGame/err_cs.png" alt="">
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { onMounted, reactive, toRefs, ref, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useEyesGameStore } from '../../stores/eyes_game'
import { listItemType, eyeActions } from '../../stores/types/eyes_game'
export default {
    setup() {
        const store = useEyesGameStore()
        const router = useRouter();
        const setAttr = reactive({
            clickTureNum: 0, // 点击的正确数
            isShowDoBtn: false,
            isShowLeftBox: true,
            currentIndex: 0, // 当前正在处理的索引
            ydShow: false,
            isShowNumber: false, // 是否显示数字页面
            progressNumber: 1, // 当前进度显示
        });
        onMounted(() => {
            getList()
        });
        onUnmounted(() => {})

        const currentProcedure = ref<listItemType | undefined>(undefined)
        const eyeActions = ref<eyeActions[] | undefined>(undefined)
        currentProcedure.value = store.currentProcedure;
        eyeActions.value = currentProcedure.value.steps[1].eyeActions as eyeActions[];

        const timeCountHandle = () => {
            // 倒计时时间处理
            setAttr.isShowDoBtn = false;
            setAttr.isShowNumber = true;
            let timer3: NodeJS.Timeout | null = setTimeout(() => {
                // 最后一次倒计时,开始显示题目
                if (timer3) {
                    clearTimeout(timer3);
                    timer3 = null;
                }
                setAttr.isShowNumber = false;
                setAttr.ydShow = false
                let timer4: NodeJS.Timeout | null = setTimeout(() => {
                    if (timer4) {
                        clearTimeout(timer4);
                        timer4 = null;
                    }
                    setAttr.ydShow = true
                    let timer5: NodeJS.Timeout | null = setTimeout(() => {
                        if (timer5) {
                            clearTimeout(timer5);
                            timer5 = null;
                        }
                        setAttr.currentIndex++;
                        setAttr.progressNumber++
                        setAttr.isShowDoBtn = true
                    }, Number((eyeActions.value as eyeActions[])[setAttr.currentIndex].pointAction.pointTime));
                }, (eyeActions.value as eyeActions[])[setAttr.currentIndex].center.wait);
            }, 2000);
        };

        const getList = () => {
            // 获取所有试用练习题
            timeCountHandle()

        };
        const questionSucBtn = () => { // 点击正确时
            clickMethods(1)
        }
        const questionErrBtn = () => { // 点击错误时
            clickMethods(0)
        }
        const clickMethods = (addNum: number) => {
            setAttr.clickTureNum = setAttr.clickTureNum + addNum
            if (setAttr.clickTureNum >= 2 && !setAttr.isShowLeftBox) {
                router.push('/xmBeforeEyesJumpTips')
                store.eyeProcedureActive += 1;
                return;
            }
            if (setAttr.clickTureNum < 2 && !setAttr.isShowLeftBox) {
                router.push('/xmTestSucErr') // 提示重做页面
                return;
            }
            setAttr.isShowDoBtn = false
            setAttr.isShowLeftBox = false
            timeCountHandle()
        }


        return {
            router,
            currentProcedure,
            eyeActions,
            questionErrBtn,
            questionSucBtn,
            ...toRefs(setAttr),
        };
    },
    methods: {

    },
};
</script>
<style lang="less" scoped>
.audio-box {
    position: fixed;
    z-index: 10;
    opacity: 0;
}

.tips-box {
    overflow: hidden;
    text-align: center;

    h1 {
        color: #614a2b;
        font-size: 90px;
        margin: 106px auto 56px;
    }

    .look-right-box {
        display: flex;
        align-items: center;
        justify-content: center;

        .pic-1 {
            width: 288px;
            height: 288px;
        }

        .pic-2 {
            width: 91px;
            height: 63px;
            margin-right: 45px;
        }

        .pic-3 {
            width: 25px;
            height: 25px;
            margin-right: 103px;
        }

        .pic-4 {
            width: 25px;
            height: 25px;
            margin-right: 400px;
        }
    }

    .look-left-box {
        display: flex;
        align-items: center;
        justify-content: center;

        .pic-1 {
            width: 288px;
            height: 288px;
        }

        .pic-2 {
            width: 91px;
            height: 63px;
            margin: 0 104px 0 45px;
        }

        .pic-3 {
            width: 25px;
            height: 25px;
            margin: 0 400px 0 0;
        }

        .pic-4 {
            width: 25px;
            height: 25px;
        }
    }

    .yes-or-no {
        margin: 42px 0 0 0;
        text-align: center;
        width: 100%;

        .pic-5,
        .pic-6 {
            width: 140px;
            height: 140px;
        }

        .pic-5 {
            margin-right: 132px;
        }
    }
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
        position: relative;
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
        position: relative;
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
            width: 25px;
            height: 25px;
            border-radius: 50%;
        }

        img.setTen {
            width: 80px;
            height: 80px;
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
