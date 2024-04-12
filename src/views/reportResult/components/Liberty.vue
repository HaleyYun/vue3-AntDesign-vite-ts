<script setup  lang='ts'>
import categoryPicture from "@/components/PictureCategory/index.vue"
// import PicturePie from "@/components/PicturePie/index.vue"

import { } from 'vue-router'
import { } from 'vue'

</script>
<template>
    <div class="eye-task">
        <div class="left">
            <div class="title">
                <span class="universal-title">图片记忆任务</span>
                <div class="btn">
                    <b></b>
                    <span>任务操作回放</span>
                </div>
            </div>
            <div class="eye-img">
                <img src="@/assets/images/ReportResult/report_04.png" alt="">
            </div>
            <div class="sm-box">
                <div>
                    <span class="two-universal-title">任务说明</span>
                </div>
                <div class="sm-txt">
                    图片记忆任务（Visual Paired Comparison，VPC)通过比较一个人花在看一张新图片和他们以前看过的图片的时间比例来评估识别记忆。在记忆功能正常的人中，会花更多时间看新图片。相比之下，有记忆困难的人表现在新的和熟悉的图片之间的注视时间分布比较平均。VPC任务已被证明能可靠地检测灵长类动物和人类的记忆功能障碍。
                </div>
            </div>
        </div>
        <div class="right">
            <div class="title">
                <span class="universal-title">数据统计</span>
                <div class="btn">
                    <b></b>
                    <span>数据统计详情</span>
                </div>
            </div>
            <div class="statistics">
                <div>
                    <categoryPicture />
                </div>
            </div>
            <div class="sm-box">
                <div>
                    <span class="two-universal-title">结果说明</span>
                </div>
                <div class="sm-txt">
                    新旧照片的驻留时长，体现了您在任务过程中观察新旧照片的时间。通常来说，新照片的驻留时间越长，意味着您对原有照片的记忆越清晰，表现出更强的记忆能力。凝视时长则反映了您在任务过程中对图片的关注稳定性。凝视时长越长，某种程度上表示您在关注图片时所展现出的信心更为充足。图表中展示的是您的成绩与正常老人成绩的对比情况。
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
        .eye-img {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            margin-top: 25px;

            img {
                display: block;
                width: 90%;
                margin: 0 auto;
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