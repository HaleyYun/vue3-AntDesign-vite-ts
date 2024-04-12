<script setup  lang='ts'>
import PictureCategory from "@/components/PictureCategory/index.vue"
// import { } from 'vue'
import {useRouter } from 'vue-router'
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
    },
    eyeTableList:{
        type:Array
    },

})

// 查看视频回放
const lookVideo = () => {
    // console.log(obj);
    router.push({
        path: "/report/back",
        query: {
            estimateNum: props.estimateNum,
            taskType: 3,
            type: 1,
        }
    })
}


// 数据统计详情
const lookRask = (obj: any) => {
    console.log(obj);
    router.push({
        path: "/report/statistics",
        query: {
            estimateNum: props.estimateNum,
            taskType: 3,
            type: 1,
        }
    })
}

</script>
<template>
    <div class="eye-task">
        <div class="left">
            <div class="title">
                <span class="universal-title">眼跳任务</span>
                <div class="btn" @click="lookVideo">
                    <b></b>
                    <span>任务操作回放</span>
                </div>
            </div>
            <div class="zy-time">
                <span>注意时间</span>
            </div>
            <div class="xs-mb">
                <span></span>
                <div>
                    <span>线索目标</span>
                    <span></span>
                    <span>反向眼跳</span>
                </div>
            </div>
            <div class="ty-fy">
                <span></span>
                <div>眼跳反应</div>
            </div>
            <div class="eye-img">
                <img src="@/assets/images/ReportResult/report_01.png" alt="">
                <img src="@/assets/images/ReportResult/report_02.png" alt="">
                <img src="@/assets/images/ReportResult/report_03.png" alt="">
            </div>
            <div class="sm-box">
                <div>
                    <span class="two-universal-title">任务说明</span>
                </div>
                <div class="sm-txt">
                    反向眼跳任务（Anti-saccade）首先要求用户看屏幕中间，当屏幕旁边出现刺激点的时候，看向屏幕另一边空白处。研究表明，反向眼跳任务的错误增加反映了大脑抑制加工的失败，可以用于表现执行功能的状况。
                </div>
            </div>
        </div>
        <div class="right">
            <div class="title">
                <span class="universal-title">数据统计</span> 
                <div class="btn" @click="lookRask">
                    <b></b>
                    <span >数据统计详情</span>
                </div>
            </div>
            <div class="statistics">
                    <div><PictureCategory :way_eye1=2 :customForwardDelayTime="customForwardDelayTime" :defaultForwardDelayTime="defaultForwardDelayTime" /></div>
                    <div><PictureCategory :way_eye2=3  :customForwardCorrectRatio="customForwardCorrectRatio" :defaultForwardCorrectRatio="defaultForwardCorrectRatio"/></div>
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
        .zy-time {
            width: 210px;
            height: 37px;
            background: #3D7EFF;
            border-radius: 19px;
            font-size: 16px;
            font-weight: bold;
            color: #FFFFFF;
            line-height: 37px;
            text-align: center;
            cursor: pointer;
            margin-top: 20px;
        }

        .xs-mb {
            display: flex;
            justify-content: space-between;

            &>span {
                display: inline-block;
                width: 210px;
            }

            div {
                display: flex;
                align-items: center;
                justify-content: center;
                width: calc(100% - 210px);
                height: 37px;
                background: #FFFFFF;
                border-radius: 19px;
                border: 1px solid #5766FE;
                cursor: pointer;

                &>span {
                    font-size: 16px;
                    font-weight: bold;
                    color: #5766FE;
                    line-height: 22px;

                    &:nth-child(1) {}

                    &:nth-child(2) {
                        display: inline-block;
                        width: 16px;
                        height: 16px;
                        background: #FF0000;
                        border-radius: 50%;
                        margin: 0px 8px;
                    }

                    &:nth-child(3) {
                        color: #FF0000;
                    }
                }
            }
        }

        .ty-fy {
            display: flex;
            justify-content: space-between;

            &>div {
                width: 323px;
                height: 37px;
                background: #3D7EFF;
                border-radius: 19px;
                font-size: 16px;
                font-weight: bold;
                color: #FFFFFF;
                line-height: 37px;
                text-align: center;
                cursor: pointer;
                margin-top: 8px;
            }
        }

        .eye-img {
            display: flex;
            justify-content: space-between;
            margin-top: 25px;

            img {
                display: block;
                width: 176px;
            }
        }
    }

    .right {
        .statistics{
            display: flex;
            justify-content: center;
            &>div{
                width: 49%;
                height: 270px;
            }
        }
    }
}
</style>