<script setup  lang='ts'>
import PictureCategory from "@/components/PictureCategory/index.vue"
import {useRouter } from 'vue-router'
// import { } from 'vue'

const router = useRouter()

const props = defineProps({
    customForwardDelayTime: {
        type: Number,
    },
    customForwardCorrectRatio: {
        type: Number,
    },
    defaultForwardDelayTime: {
        type: Number,
    },
    defaultForwardCorrectRatio: {
        type: Number,
    },
    estimateNum:{
        type:String
    }

})

// 查看视频回放
const lookVideo = () => {
    // console.log(obj);
    router.push({
        path: "/report/back",
        query: {
            estimateNum: props.estimateNum,
            taskType: 4,
            type: 3,
        }
    })
}

</script>
<template>
    <div class="eye-task">
        <div class="left">
            <div class="title">
                <span class="universal-title">凝视范式任务</span>
            </div>
            <div class="liberty-look">
                <div>
                    <img class="frame" src="@/assets/images/ReportResult/frame5_box.png" alt="">
                    <div>
                        注意环节
                    </div>
                </div>
                <div>
                    <img class="frame" src="@/assets/images/ReportResult/frame6_box.png" alt="">
                    <div>
                        测试环节
                    </div>
                </div>
            </div>
            <div class="sm-box">
                <div>
                    <span class="two-universal-title">任务说明</span>
                </div>
                <div class="sm-txt">
                    自由观看范式任务（Free-viewing tasks）首先要求用户看屏幕中间数字，当屏幕出现人物相册，用户要做的事情就是自由观看这些人物表情。
                    研究表明，不同的图像区域或对象可能引起不同的注视持续时间。可以用于表现情绪敏感性的状态。
                </div>
            </div>
        </div>
        <div class="right">
            <div class="title">
                <span class="universal-title">数据统计</span>
                <div class="btn" @click="lookVideo">
                    <b></b>
                    <span>播放眼动视频</span>
                </div>
            </div>
            <div class="statistics">
                <div>
                    <PictureCategory :way1="2" :customForwardDelayTime="customForwardDelayTime" :customForwardCorrectRatio="customForwardCorrectRatio"/>
                </div>
                <div>
                    <PictureCategory :way2="3" :defaultForwardDelayTime="defaultForwardDelayTime" :defaultForwardCorrectRatio="defaultForwardCorrectRatio"/>
                </div>
            </div>
            <div class="sm-box">
                <div>
                    <span class="two-universal-title">结果说明</span>
                </div>
                <div class="sm-txt">
                    反应延迟时间是指刺激出现与您产生首次眼动之间的时间间隔。通常认为，延迟时间越长，说明反应能力较差。正确率则衡量了您是否能够按照任务要求进行首次眼跳，并与任务要求的方向保持一致。一般而言，执行功能表现得越差，正确率就越低。图表中展示的是您的成绩与正常老人成绩的对比情况。
                </div>
            </div>

        </div>

    </div>
</template>

<style lang='less' scoped>
.universal-title {
    font-size: 34px;
    font-weight: 400;
    height: 45px;
    line-height: 45px;
    padding-left: 12px;

    &::after {
        width: 6px;
        height: 25px;
        transform: translateY(-44%);
    }
}

.eye-task {
    display: flex;
    justify-content: space-between;
    width: 100%;
    box-shadow: 0px 2px 18px 0px rgba(87, 102, 254, 0.07);
    border-radius: 16px;
    padding: 15px;
    margin-top: 15px;
    background: #fff;

    .title {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .btn {
        display: flex;
        align-items: center;
        box-shadow: 0px 2px 18px 0px rgba(87, 102, 254, 0.07);
        border-radius: 50px;
        border: 1px solid #5766FE;
        font-size: 21px;
        font-weight: 400;
        color: #5766FE;
        padding: 8px 18px;
        cursor: pointer;

        b {
            display: inline-block;
            width: 28px;
            height: 28px;
            background: url('@/assets/images/ReportResult/report_play.png')no-repeat;
            background-size: 100% 100%;
            background-position: 0px 0px;
        }
    }

    &>div {
        width: 49%;
    }

    .sm-box {
        .sm-txt {
            margin-top: 5px;
            font-size: 16px;
            font-weight: 400;
            color: #777777;
            margin-top: 10px;
            text-align: justify;
        }
    }

    .left {
        .liberty-look {
            display: flex;
            justify-content: space-around;
            margin-top: 25px;
            margin-bottom: 18px;

            &>div {
                width: 46%;

                .frame {
                    display: block;
                    width: 100%;
                    height: 191px;
                }

                &>div {
                    font-size: 24px;
                    font-weight: bold;
                    color: #505050;
                    text-align: center;
                    line-height: 44px;
                }
            }
        }
    }

    .right {
        .statistics {
            display: flex;
            justify-content: center;

            &>div {
                width: 49%;
                height: 270px;
            }
        }
    }
}</style>