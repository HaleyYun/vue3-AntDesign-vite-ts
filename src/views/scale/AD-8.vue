<template>
    <div class="ad-8-page">

        <div class="content-box">
            <a-carousel :after-change="onChange" :dots="false" ref="carousel">
                <div class="content-item" v-for="(item, index) in questionsList" :key="index">
                    <h3 v-html="item.title"></h3>
                    <div class="options-item">
                        <div v-for="(optionItem, optionIndex) in item.options" :key="optionIndex"
                            :class="optionItem.key === answerList[index] ? 'active' : ''"
                            @click="selectAnswer(index, optionItem.key)">
                            {{ optionItem.text }}
                        </div>
                    </div>
                </div>
            </a-carousel>
        </div>

        <div class="operate-box">
            <audio src="#" id="titleAudio"></audio>
            <img class="out-btn" src="../../assets/images/AD-8/out_btn.png" @click="maskShow = true" alt="">
            <img class="btn-img" v-if="scheduleNum > 0" src="../../assets/images/AD-8/prev_btn.png"
                @click="carousel!.prev()" alt="">
            <div class="btn-img" v-if="scheduleNum == 0"></div>
            <img class="play-audio" @click="playAudio" src="../../assets/images/AD-8/play_audio.png" alt="">
            <img class="btn-img" @click="nextTopic" v-if="scheduleNum < questionsList.length - 1"
                src="../../assets/images/AD-8/next_btn.png" alt="">
            <div class="btn-img submit-btn" v-if="scheduleNum === questionsList.length - 1" @click="submit(1)">提交</div>
            <div class="tips-box">
                <div class="schedule">{{ scheduleNum + 1 }}/{{ questionsList.length }}</div>
                <div class="time" :key="countTime">{{ countTimeNum }}</div>
            </div>
        </div>

        <div class="tipMask" v-if="maskShow">
            <div class="tip-box">
                <div class="title-box">提示</div>
                <h2>你确定要退出当前操作吗？</h2>
                <div class="btnBox">
                    <button @click="router.back()">
                        仍然退出
                    </button>
                    <button @click="submit(0)">
                        无法作答
                    </button>
                    <button @click="maskShow = false">
                        返回操作
                    </button>
                </div>
            </div>
        </div>

        <div class="maskBox" v-if="isShowLoading">
            <a-spin size="large" />
        </div>
    </div>
</template>


<script setup lang='ts'>
import { onMounted, ref, onUnmounted } from "vue"
import { submitRestli } from "@/apis/scale/AD-8"
import { getEstimateNum } from '../../apis/eyes_game'
import { message, Carousel } from 'ant-design-vue';
import { useRouter } from "vue-router";
import { useEyesGameStore } from '../../stores/eyes_game'
import { useState } from '../../stores/state'

const store = useEyesGameStore()
const serveStore = useState()
const router = useRouter()
const maskShow = ref(false)
const isShowLoading = ref(false)
const questionsList = ref([
    {
        title: "判断近几年以来出现的变化<br/>判断力出现问题（例如，做决定存在困难，错误的财务决定，思考障碍等）",
        audio: new URL('../../assets/audio/AD-8/1.mp3', import.meta.url).href,
        options: [
            { text: "是，有改变", key: "A" },
            { text: "否，无改变", key: "B" },
            { text: "不知道", key: "C" },
        ]
    },
    {
        title: "判断近几年以来出现的变化<br/>兴趣减退，爱好改变，活动减少",
        audio: new URL('../../assets/audio/AD-8/2.mp3', import.meta.url).href,
        options: [
            { text: "是，有改变", key: "A" },
            { text: "否，无改变", key: "B" },
            { text: "不知道", key: "C" },
        ]
    },
    {
        title: "判断近几年以来出现的变化<br/>不断重复同一件事（例如：总是相同的问题，重复讲同一个故事或者同一句话等）",
        audio: new URL('../../assets/audio/AD-8/3.mp3', import.meta.url).href,
        options: [
            { text: "是，有改变", key: "A" },
            { text: "否，无改变", key: "B" },
            { text: "不知道", key: "C" },
        ]
    },
    {
        title: "判断近几年以来出现的变化<br/>学习使用某些简单的日常工具或家用电器、器械有困难（比如VCD、电脑、遥控器、微波炉等）",
        audio: new URL('../../assets/audio/AD-8/4.mp3', import.meta.url).href,
        options: [
            { text: "是，有改变", key: "A" },
            { text: "否，无改变", key: "B" },
            { text: "不知道", key: "C" },
        ]
    },
    {
        title: "判断近几年以来出现的变化<br/>记不清当前月份或年份等",
        audio: new URL('../../assets/audio/AD-8/5.mp3', import.meta.url).href,
        options: [
            { text: "是，有改变", key: "A" },
            { text: "否，无改变", key: "B" },
            { text: "不知道", key: "C" },
        ]
    },
    {
        title: "判断近几年以来出现的变化<br/>处理复杂的个人经济事务有困难（忘了如何对帐、忘了如何交付水、电、煤气账单等）",
        audio: new URL('../../assets/audio/AD-8/6.mp3', import.meta.url).href,
        options: [
            { text: "是，有改变", key: "A" },
            { text: "否，无改变", key: "B" },
            { text: "不知道", key: "C" },
        ]
    },
    {
        title: "判断近几年以来出现的变化<br/>记不住和别人的约定",
        audio: new URL('../../assets/audio/AD-8/7.mp3', import.meta.url).href,
        options: [
            { text: "是，有改变", key: "A" },
            { text: "否，无改变", key: "B" },
            { text: "不知道", key: "C" },
        ]
    },
    {
        title: "判断近几年以来出现的变化<br/>日常记忆和思考能力出现问题",
        audio: new URL('../../assets/audio/AD-8/8.mp3', import.meta.url).href,
        options: [
            { text: "是，有改变", key: "A" },
            { text: "否，无改变", key: "B" },
            { text: "不知道", key: "C" },
        ]
    },
])
const answerList = ref<string[]>([])
const carousel = ref<typeof Carousel | null>(null)
let scheduleNum = ref(0)
let countTime = ref(0)
let timerKey: null | NodeJS.Timeout = null
const countTimeNum = ref("00:00:00")

onMounted(() => {
    console.dir("carousel.value", carousel.value);
    timerKey = setInterval(() => {
        countTime.value += 1;
        let hour: any, minute: any, second: any;
        second = countTime.value % 60
        minute = parseInt(countTime.value / 60 as any) % 60; //分钟
        hour = parseInt(countTime.value / 3600 as any) % 60; //小时
        if (second < 10) {
            second = "0" + second;
        }
        if (minute < 10) {
            minute = "0" + minute;
        }
        if (hour < 10) {
            hour = "0" + hour;
        }
        countTimeNum.value = hour + ":" + minute + ":" + second
    }, 1000)
    getCode()
})
onUnmounted(() => {
    if (timerKey) {
        clearInterval(timerKey)
    }
})


const onChange = (current: number) => {
    scheduleNum.value = current
};
const playAudio = () => {
    let audioE: HTMLAudioElement = document.getElementById('titleAudio') as HTMLAudioElement;
    audioE.src = questionsList.value[scheduleNum.value].audio;
    audioE.load();
    audioE.play();
};
const selectAnswer = (index: number, key: string) => {
    answerList.value[index] = key;
    console.log(answerList.value)
    if (index === questionsList.value.length - 1) return
    let timer: NodeJS.Timeout = setTimeout(() => {
        clearTimeout(timer)
        carousel.value!.next()
    }, 300)
};
const nextTopic = () => {
    if (answerList.value[scheduleNum.value]) {
        carousel.value!.next()
    } else {
        message.warning('请作答后再下一步');
    }
}
const submit = (status: number) => {
    if (status === 1 && !answerList.value[scheduleNum.value]) {
        message.warning('请作答后再提交');
        return
    }
    isShowLoading.value = true;
    let data = {
        answerList: answerList.value,
        archiveNum: serveStore.QueryProData.clientId,
        serviceCode: store.estimateNum,
        status
    }
    if (serveStore.QueryProData.status == 4 || serveStore.QueryProData.status == 1) {
        data = {
            archiveNum: serveStore.QueryProData.archivesNo,
            answerList: answerList.value,
            serviceCode: store.estimateNum,
            status
        }
    }
    submitRestli(data).then(res => {
        if (res.code === 200) {
            router.back()
        }
        isShowLoading.value = false;
    })
}
const getCode = () => {
    let data = {
        archivesNo: serveStore.QueryProData.clientId,
        customName: serveStore.QueryProData.clientName,
        customPhone: serveStore.QueryProData.phone,
        deviceNum: window.innerWidth + "_" + window.innerHeight,
        estimateServeCode: serveStore.QueryProData.checkService,
        estimateServeName: serveStore.QueryProData.checkName,
        orderNum: serveStore.QueryProData.ticketsBookingCode,
        status: null,
        estimateNum: null,
    }
    if (serveStore.QueryProData.status == 4) {
        data = {
            archivesNo: serveStore.QueryProData.archivesNo,
            customName: serveStore.QueryProData.customName,
            customPhone: serveStore.QueryProData.customPhone,
            deviceNum: window.innerWidth + "_" + window.innerHeight,
            estimateServeCode: serveStore.QueryProData.estimateServeCode,
            estimateServeName: serveStore.QueryProData.estimateServeName,
            orderNum: serveStore.QueryProData.orderNum,
            status: serveStore.QueryProData.status,
            estimateNum: serveStore.QueryProData.estimateNum
        }
    }
    getEstimateNum(data).then(res => {
        if (res.code === 200) {
            store.estimateNum = res.data;
        }
    })
}
</script>


<style lang='less' scoped>
.ad-8-page {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    overflow: hidden;

    .content-box {
        width: 100%;
        padding: 25px;
        flex: 1;
        background: #EFEFEF;

        .ant-carousel {
            height: 100%;

            .content-item {
                width: 100%;
                height: 79.5vh;
                background: #FFFFFF;
                box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.12);
                border-radius: 14px;

                h3 {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 246px;
                    font-size: 36px;
                    font-family: PingFang-SC-Bold, PingFang-SC;
                    font-weight: bold;
                    color: #222222;
                    line-height: 50px;
                    padding: 0 84px;
                    margin-bottom: 0;
                    text-align: center;
                }

                .options-item {
                    padding: 12px 144px 0;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    box-sizing: border-box;

                    div {
                        width: 444px;
                        height: 114px;
                        background: #F6F6F6;
                        border-radius: 14px;
                        margin: 0 26px 34px 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 28px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 600;
                        color: #333333;
                        line-height: 40px;
                    }

                    .active {
                        background: #5765FE;
                        color: #FFFFFF;
                    }
                }
            }
        }
    }

    .operate-box {
        width: 100%;
        height: 130px;
        background: #FFFFFF;
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.12);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        .out-btn {
            width: 66px;
            height: 66px;
            position: absolute;
            left: 28px;
            top: 32px;
        }

        .btn-img {
            width: 197px;
            height: 73px;
            margin: 0 178px;
        }

        .submit-btn {
            background-image: url(../../assets/images/AD-8/submit_btn.png);
            background-size: 100%;
            font-size: 28px;
            font-family: PingFang-SC-Bold, PingFang-SC;
            font-weight: bold;
            color: #FFFFFF;
            line-height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .play-audio {
            width: 43px;
            height: 60px;
            margin-bottom: 30px;
        }

        .tips-box {
            position: absolute;
            bottom: 0;
            width: 242px;
            height: 42px;
            background: #F0F1FF;
            border-radius: 33px 33px 0px 0px;
            display: flex;
            overflow: hidden;

            div {
                width: 50%;
                height: 100%;
                text-align: center;
                font-size: 20px;
                font-family: PingFang-SC-Bold, PingFang-SC;
                font-weight: bold;
                color: #555555;
                line-height: 42px;
            }
        }
    }

    .tipMask {
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.6);
        position: fixed;
        top: 0;
        left: 0;

        .tip-box {
            width: 839px;
            height: 258px;
            background: #FFFFFF;
            box-shadow: inset 0px 1px 5px 0px rgba(133, 133, 133, 0.5);
            border-radius: 14px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            .title-box {
                width: 100%;
                height: 60px;
                background: #f4f6fb;
                box-shadow: inset 0px 1px 6px 0px rgba(171, 154, 255, 0.5);
                border-radius: 14px 14px 0px 0px;
                text-align: center;
                font-size: 25px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: #1c2482;
                line-height: 60px;
            }

            h2 {
                padding: 30px 0 30px 0;
                text-align: center;
                font-size: 21px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #262626;
                line-height: 29px;
            }

            .btnBox {
                width: 754px;
                height: 59px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                align-items: center;

                button {
                    width: 231px;
                    height: 59px;
                    border-radius: 29px;
                    font-size: 25px;
                    font-weight: bold;
                    line-height: 59px;
                    border: none;
                    text-align: center;
                    margin: 0 15px;
                }

                button:nth-child(1),
                button:nth-child(2) {
                    color: #5765fe;
                    background: #ffffff;
                    box-shadow: inset 0rem 0.06rem 0.44rem 0rem rgba(171, 154, 255, 0.5);
                }

                button:nth-child(3) {
                    color: #ffffff;
                    background: #5765fe;
                    box-shadow: inset 0rem 0.06rem 0.44rem 0rem rgba(255, 255, 255, 0.5);
                }
            }
        }
    }

    .maskBox {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

}
</style>