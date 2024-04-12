<script setup  lang='ts'>
import PicturePie from "@/components/PicturePie/index.vue"
import { useRouter } from 'vue-router'
import { } from 'vue'

const router = useRouter()

// 查看任务统计详情
// const lookRask = (obj: any) => {
//     console.log(obj);
//     router.push({
//         path: "/report/statistics",
//         query: {
//             estimateNum: "ES_001",
//             type: 3,
//         }
//     })
// }

// 查看视频回放
const lookVideo = () => {
    // console.log(obj);
    router.push({
        path: "/report/back",
        query: {
            estimateNum: props.estimateNum,
            taskType: 4,
            type: 1,
        }
    })
}

const props = defineProps({
    firPhotoSduration: {
        type: Number,
    },
    secPhotoDuration: {
        type: Number,
    },
    thirdPhotoDuration: {
        type: Number,
    },
    estimateNum:{
        type:String
    }
})

</script>
<template>
    <div class="eye-task">
        <div class="left">
            <div class="title">
                <span class="universal-title">自由观看范式任务</span>
            </div>
            <div class="liberty-look">
                <div>
                    <img class="frame" src="@/assets/images/ReportResult/frame1_box.png" alt="">
                    <img class="eye" src="@/assets/images/ReportResult/eye.png" alt="">
                </div>
                <div>
                    <img class="frame" src="@/assets/images/ReportResult/frame2_box.png" alt="">
                    <img class="eye" src="@/assets/images/ReportResult/eye.png" alt="">
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
                <div class="btn">
                    <b></b>
                    <span @click="lookVideo">播放眼动视频</span>
                </div>
            </div>
            <div class="statistics">
                <div>
                    <PicturePie  :firPhotoSduration="firPhotoSduration" :secPhotoDuration="secPhotoDuration" :thirdPhotoDuration="thirdPhotoDuration"/>
                </div>
            </div>
            <div class="sm-box">

                <div>
                        <span class="two-universal-title">结果说明</span> 
                        <!-- <a-button type="link" @click="lookRask()">任务统计详情</a-button> -->
                </div>
                
                <div class="sm-txt">
                    它指的是一个人调节自己的情感以及他人情感的能力，并且适当地做出反应。情感敏感的人通常更加敏锐于社交暗示和人际交往细微差异，
                    他们可能更擅长捕捉非语言暗示，例如面部表情，身体语言，语音语调和其他情感信号。情感敏感度既是一种优势也是一种挑战。一方面，
                    它使个人能够同情他人，与周围人建立更深入的情感联系。另一方面，它也可能使它们更容易受到情感过载、压力和疲劳的影响。
                    通常地我们认为具有高情绪敏感性的个体发展成为抑郁症比低情绪敏感性的个体更高。
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
            font-size: 18px;
            font-weight: 400;
            color: #777777;
            margin-top: 10px;
        }
    }

    .left {
        .liberty-look {
            display: flex;
            justify-content: space-around;
            margin-top: 25px;
            margin-bottom: 60px;

            &>div {
                position: relative;
                width: 46%;
                height: 191px;

                .frame {
                    position: absolute;
                    display: block;
                    width: 100%;
                }

                .eye {
                    position: absolute;
                    display: block;
                    width: 137px;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, 6%);

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
    .clear{
        clear: both;
    }
}</style>