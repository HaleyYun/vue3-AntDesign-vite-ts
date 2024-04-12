<template>
    <div class="page-box">
        <div class="title-box">
            <div class="out-box" @click="back"><img src="../../assets/images/depressedResult/out_btn.png" alt="">评估记录</div>
            <h1>评估结果报告</h1>
        </div>
        <div class="result-report">
            <titleCard title="结果报告"></titleCard>
            <p class="result-report-title">抑郁评估风险程度</p>
            <div class="result-report-schedule">
                <span>低</span>
                <span>高</span>
                <div class="result-report-slider" :style="{ left: scaleReport?.riskValue! / 10 * 100 + '%' }">
                    <img src="../../assets/images/depressedResult/slider.png" alt="">您的位置
                </div>
            </div>
            <illustrateCard title="报告说明" class="result-report-illustrate-card"></illustrateCard>
            <p class="result-report-text">
                您的抑郁风险程度是根据综合分析您在任务过程中的眼动数据得出的，它反映了您患有抑郁的整体风险。风险程度越靠近“<span>10</span>”，则意味着您面临的抑郁风险越大。您的风险值为“<span>2.3</span>”。
            </p>
        </div>
        <div class="info-capacity">
            <div class="info-box">
                <titleCard title="用户信息"></titleCard>
                <div class="info-box-content">
                    <img class="info-picture" src="../../assets/images/depressedResult/picture.png" alt="">
                    <img class="info-divider" src="../../assets/images/depressedResult/divider.png" alt="">
                    <div class="info-content">
                        <p>姓&emsp;&emsp;名：<span>{{ archiveInfo?.name || "--" }}</span></p>
                        <p>性&emsp;&emsp;别：<span>{{ archiveInfo?.sex || "--" }}</span></p>
                        <p>年&emsp;&emsp;龄：<span>{{ archiveInfo?.age || "--" }}</span></p>
                        <p>教育背景：<span>{{ archiveInfo?.education || "--" }}</span></p>
                    </div>
                </div>
            </div>
            <div class="capacity-box">
                <titleCard title="分项能力"></titleCard>
                <div class="capacity-content">
                    <div class="round-box" v-for="(item, index) in roundList" :key="index">
                        <div class="round" :style="{ color: item.color, backgroundImage: `url(${getIcon(item.bg)})` }">
                            {{ item.value }}
                        </div>
                        <p>{{ item.text }}</p>
                    </div>
                </div>
                <illustrateCard title="分项能力说明"></illustrateCard>
                <p>情绪敏感性：通常地我们认为具有高情绪敏感性的个体发展成为抑郁症比低情绪敏感性的个体更高。情感沉浸度：一般认为具有较强负面情感沉浸度的个体更容易产生对于负面刺激的整体性的注意偏向 </p>
            </div>
        </div>
        <div class="free-look">
            <div class="left-box">
                <titleCard title="自由观看范式任务"></titleCard>
                <img class="free-look-img" src="../../assets/images/depressedResult/free_look.png" alt="">
                <illustrateCard title="任务说明"></illustrateCard>
                <p>自由观看范式任务（Free-viewing
                    tasks）首先要求用户看屏幕中间数字，当屏幕出现人物相册，用户要做的事情就是自由观看这些人物表情。研究表明，不同的图像区域或对象可能引起不同的注视持续时间。可以用于表现情绪敏感性的状态。</p>
            </div>
            <div class="right-box">
                <titleCard title="数据统计"></titleCard>
                <div class="free-look-charts" id="freeLookCharts"></div>
                <illustrateCard title="结果说明"></illustrateCard>
                <p>它指的是一个人调节自己的情感以及他人情感的能力，并且适当地做出反应。情感敏感的人通常更加敏锐于社交暗示和人际交往细微差异，他们可能更擅长捕捉非语言暗示，例如面部表情，身体语言，语音语调和其他情感信号。情感敏感度既是一种优势也是一种挑战。一方面，它使个人能够同情他人，与周围人建立更深入的情感联系。另一方面，它也可能使它们更容易受到情感过载、压力和疲劳的影响。通常地我们认为具有高情绪敏感性的个体发展成为抑郁症比低情绪敏感性的个体更高。
                </p>
            </div>
        </div>
        <div class="gaze">
            <div class="left-box">
                <titleCard title="凝视范式任务"></titleCard>
                <div class="gaze-left-content">
                    <div class="gaze-content-text-box">
                        <span class="span-p-l">注意环节</span>
                        <span class="span-r">约20秒</span>
                        <span class="span-p-r">注意环节</span>
                    </div>
                    <img class="gaze-img" src="../../assets/images/depressedResult/gaze.png" alt="">
                </div>
                <illustrateCard title="任务说明"></illustrateCard>
                <p>凝视范式任务（Gaze Paradigm Task）用户盯着屏幕中心的红点，保持注意力直到任务结束，经调研表明，如果注意力足够集中，会发现旁边的圆圈会消失。有研究指出，抑郁患者更难集中注意力。</p>
            </div>
            <div class="right-box">
                <titleCard title="数据统计"></titleCard>
                <div class="gaze-charts-box">
                    <div class="gaze-charts" id="gazeCharts"></div>
                    <div class="tags">
                        <div class="tags-top">
                            <div></div>用户
                        </div>
                        <div class="tags-btm">
                            <div></div>常模
                        </div>
                    </div>
                </div>
                <illustrateCard title="结果说明"></illustrateCard>
                <p>它指的是一个完全集中注意力于特定的目标，研究注意力、视觉加工和视错觉等领域情况，它使视觉系统会在我们的盲点附近产生一种”填充效应”，使周围的圆圈似乎消失或淡化。一般抑郁患者更难集中注意力。</p>
            </div>
        </div>
        <div class="attention">
            <div class="left-box">
                <titleCard title="注意力切换范式任务"></titleCard>
                <img class="attention-img" src="../../assets/images/depressedResult/attention.png" alt="">
                <div class="attention-text-box"><span>注意环节</span><span>测试环节</span></div>
                <illustrateCard title="任务说明"></illustrateCard>
                <p>注意切换范式任务（Visual attention shifting
                    task）首先屏幕左右呈现两张头像，任务开始后，会出现一个绿框提示，用户需要看向绿框提示的头像，当另一边的头像上出现绿框提示时，立刻看向另一边头像直到提示结束。研究表明，倾向于过度关注消极刺激，并且难以将注意从消极刺激转移到其他刺激上。
                </p>
            </div>
            <div class="right-box">
                <titleCard title="数据统计"></titleCard>
                <div class="attention-content">
                    <div id="timeCharts"></div>
                    <div id="accuracyCharts"></div>
                    <div class="tags">
                        <div class="tags-top">
                            <div></div>用户
                        </div>
                        <div class="tags-btm">
                            <div></div>常模
                        </div>
                    </div>
                    <div class="tags2">
                        <div class="tags-top">
                            <div></div>用户
                        </div>
                        <div class="tags-btm">
                            <div></div>常模
                        </div>
                    </div>
                </div>
                <illustrateCard title="结果说明"></illustrateCard>
                <p>它指的是一个人完全沉浸和深深陷入其情感、思想和经验中的能力。情感沉浸是情感处理的一个重要方面，它使一个人能够探索和理解他们对生活中事件的感受和反应。一般认为具有较强负面情感沉浸度的个体更容易产生对于负面刺激的整体性的注意偏向。
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import titleCard from "./components/titleCard.vue"
import illustrateCard from "./components/illustrateCard.vue"
import { onMounted, onUnmounted, ref } from "vue";
import * as echarts from 'echarts';
import { getEstimateResult } from '../../apis/estimateResult/index'
import { archiveInfoResponseType, scaleReportType } from '../../apis/estimateResult/type'
import { useRoute } from "vue-router";
import router from "@/router";


interface optionTion extends echarts.EChartsOption {
    series: any
}

const route = useRoute()

const roundList = ref([
    {
        color: "#0B59FF",
        bg: "round_blue",
        text: "情绪敏感性",
        key: "firCapacityValue",
        value: ""
    },
    {
        color: "#FF5401",
        bg: "round_orange",
        text: "积极情绪",
        key: "secCapacityValue",
        value: ""
    },
    {
        color: "#0DA80C",
        bg: "round_green",
        text: "消极情绪",
        key: "thirdCapacityValue",
        value: ""
    },
])

const archiveInfo = ref<archiveInfoResponseType | null>()
const scaleReport = ref<scaleReportType | null>()

onMounted(() => {
    initEcharts();
    getResult();
})

onUnmounted(() => {
    chartDispose()
})

const back = () => {
    router.push('/assessment/record')
}
let freeLookChartsDom: echarts.ECharts | null = null;
let gazeChartsDom: echarts.ECharts | null = null;
let timeChartsDom: echarts.ECharts | null = null;
let accuracyChartsDom: echarts.ECharts | null = null;

const getResult = () => {
    // estimateNum "CAY20230802141305250"
    getEstimateResult({ estimateNum: route.query.estimateNum as string }).then(res => {
        if (res.code === 200) {
            console.log(res)
            archiveInfo.value = res.data.archiveInfoResponse!;
            scaleReport.value = res.data.report!;
            for (let i = 0; i < roundList.value.length; i++) {
                roundList.value[i].value = Math.round(scaleReport.value[roundList.value[i].key] * 100) + "%";
            }
            setEchartsData(scaleReport.value);
        }
    })
}

const initEcharts = () => {
    let freeLookChartsDiv = document.getElementById('freeLookCharts')!;
    freeLookChartsDom = echarts.init(freeLookChartsDiv);

    let gazeChartsDiv = document.getElementById('gazeCharts')!;
    gazeChartsDom = echarts.init(gazeChartsDiv);

    let timeChartsDiv = document.getElementById('timeCharts')!;
    timeChartsDom = echarts.init(timeChartsDiv);

    let accuracyChartsDiv = document.getElementById('accuracyCharts')!;
    accuracyChartsDom = echarts.init(accuracyChartsDiv);

}

const setEchartsData = (echartsData: scaleReportType) => {
    console.log(echartsData)

    let pieOptionData = [
        { value: echartsData.firPhotoSduration || 0, name: '积极照片' },
        { value: echartsData.secPhotoDuration || 0, name: '消极照片' },
        { value: echartsData.thirdPhotoDuration || 0, name: '中立照片' }
    ]
    let pieOption: echarts.EChartsOption = getPieOption(pieOptionData)
    pieOption && freeLookChartsDom!.setOption(pieOption);

    let barOptionData = [echartsData.gazingDuration || 0, echartsData.defaultGazingDuration!]
    let barOption: optionTion = getBarOption(barOptionData, 1, '凝视持续时间')
    barOption && gazeChartsDom!.setOption(barOption);

    let timeChartsBarOptionUData = [echartsData.customForwardDelayTime || 0, echartsData.defaultForwardDelayTime || 0]
    // let timeChartsBarOptionDData = [echartsData.defaultForwardDelayTime!, echartsData.defaultReverseDelayTime!]
    // let timeChartsBarOption: echarts.EChartsOption = getAttentionBarOption("延迟时间", timeChartsBarOptionUData, timeChartsBarOptionDData)
    let timeChartsBarOption: optionTion = getBarOption(timeChartsBarOptionUData, 2, "延迟时间")
    barOption && timeChartsDom!.setOption(timeChartsBarOption);

    let accuracyChartsBarOptionUData = [echartsData.customForwardCorrectRatio || 0, echartsData.defaultForwardCorrectRatio || 0]
    // let accuracyChartsBarOptionDData = [echartsData.defaultForwardCorrectRatio!, echartsData.defaultReverseCorrectRatio!]
    // let accuracyChartsBarOption: echarts.EChartsOption = getAttentionBarOption("正确率", accuracyChartsBarOptionUData, accuracyChartsBarOptionDData)
    let accuracyChartsBarOption: optionTion = getBarOption(accuracyChartsBarOptionUData, 2, "正确率")
    barOption && accuracyChartsDom!.setOption(accuracyChartsBarOption);
}

const getPieOption = (data: { value: number, name: string }[]): echarts.EChartsOption => {
    let option: echarts.EChartsOption = {
        title: {
            text: '照片停留时间',
            left: 'center',
            bottom: '12px',
        },
        legend: {
            orient: 'vertical',
            left: 'right',
            align: 'left',
            textStyle: {
                color: '#515151',
                fontWeight: 'bold'
            }
        },
        tooltip: {
            trigger: 'item'
        },
        color: ['#D0D4FF', '#5766FE', '#ACB3FF'],
        series: [
            {
                name: 'Access From',
                type: 'pie',
                center: ['50%', '38%'],
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: data
            }
        ]
    }
    return option
}

const getBarOption = (data: number[], status: number, title: string): optionTion => {
    let option: optionTion = {
        // legend: {
        //     orient: 'vertical',
        //     left: 'right'
        // },
        title: {
            text: title,
            left: 'center',
            bottom: '10%'
        },
        grid: status === 1 ? {
            left: '26%',
            right: '26%',
            bottom: '25%',
            containLabel: true
        } : {
            left: '3%',
            right: '3%',
            bottom: '25%',
            containLabel: true
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLine: {
                show: true
            },
            axisTick: {
                show: true
            }
        },
        xAxis: {
            type: 'category',
            data: ['用户', '常模']
        },
        series: [
            {
                name: '常模',
                itemStyle: {
                    normal: {
                        //这里是颜色
                        color: function (params: any) {
                            //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                            var colorList = ['#D0D4FF', '#5766FE'];
                            return colorList[params.dataIndex]
                        }
                    }
                },
                data: data,
                type: "bar",
                barWidth: 34,
            }
        ]
    };
    return option
}

// const getAttentionBarOption = (title: string, uData: number[], dData: number[]): echarts.EChartsOption => {
//     let option: echarts.EChartsOption = {
//         legend: {
//             orient: 'vertical',
//             left: 'right',
//             align: 'left',
//             textStyle: {
//                 color: '#515151',
//                 fontWeight: 'bold'
//             }
//         },
//         title: {
//             text: title,
//             left: 'center',
//             bottom: '10%'
//         },
//         grid: {
//             left: '3%',
//             right: '3%',
//             bottom: '25%',
//             containLabel: true
//         },
//         yAxis: {
//             type: 'value',
//             boundaryGap: [0, 0.01],
//             axisLine: {
//                 show: true
//             },
//             axisTick: {
//                 show: true
//             }
//         },
//         xAxis: {
//             type: 'category',
//             data: ['朝向眼跳', '反向眼跳']
//         },
//         series: [
//             {
//                 name: '用户',
//                 itemStyle: {
//                     color: "#D0D4FF",
//                 },
//                 data: uData,
//                 type: "bar",
//                 barWidth: 34,
//             },
//             {
//                 name: '常模',
//                 itemStyle: {
//                     color: "#5766FE",
//                 },
//                 data: dData,
//                 type: "bar",
//                 barWidth: 34,
//             }
//         ]
//     };
//     return option
// }

const chartDispose = () => {
    freeLookChartsDom?.dispose();
    freeLookChartsDom = null;
    gazeChartsDom?.dispose();
    gazeChartsDom = null;
    timeChartsDom?.dispose();
    timeChartsDom = null;
    accuracyChartsDom?.dispose();
    accuracyChartsDom = null;
}

const getIcon = (name: string) => {
    return new URL(`../../assets/images/depressedResult/${name}.png`, import.meta.url).href;
}
</script>

<style lang="less" scoped>
.page-box {
    width: 100%;
    background: #F6F6F6;
    padding: 132px 18px 92px;
    position: relative;
    overflow: hidden;

    .title-box {
        width: 100%;
        height: 114px;
        background-image: url(../../assets/images/depressedResult/title_bg.png);
        background-size: 100% 114px;
        position: absolute;
        top: 0;
        left: 0;

        .out-box {
            position: absolute;
            left: 41px;
            top: 36px;
            font-size: 28px;
            font-family: PingFang-SC-Bold, PingFang-SC;
            font-weight: bold;
            color: #FFFFFF;
            line-height: 40px;

            img {
                width: 40px;
                height: 40px;
                margin-right: 12px;
            }
        }

        h1 {
            text-align: center;
            font-size: 44px;
            font-family: SourceHanSansCN-Bold, SourceHanSansCN;
            font-weight: bold;
            color: #FFFFFF;
            margin: 0;
            line-height: 110px;
        }
    }

    .result-report {
        width: 100%;
        padding: 20px 28px;
        box-sizing: border-box;
        background: #FFFFFF;
        box-shadow: 0px 2px 16px 0px rgba(87, 102, 254, 0.07);
        border-radius: 14px;

        .result-report-title {
            text-align: center;
            font-size: 21px;
            font-family: PingFang-SC-Bold, PingFang-SC;
            font-weight: bold;
            color: #222222;
            line-height: 29px;
        }

        .result-report-schedule {
            width: 1112px;
            height: 37px;
            background: linear-gradient(90deg, #2EAE1D 0%, #29D30E 40%, #FFBC0C 82%, #D42114 100%);
            border-radius: 22px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;

            span {
                padding: 0 18px;
                font-size: 20px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: #FFFFFF;
                line-height: 27px;
                text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
            }

            .result-report-slider {
                position: absolute;
                top: 0;
                width: 100px;
                font-size: 20px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: #636262;
                line-height: 27px;
                text-align: center;
                transform: translateX(-50%);

                img {
                    width: 54px;
                    height: 55px;
                    display: block;
                    margin: 0 auto;
                }
            }
        }

        .result-report-illustrate-card {
            margin-top: 50px;
        }

        .result-report-text {
            margin: 0;
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #777777;
            line-height: 22px;

            span {
                color: #5766FE;
            }
        }
    }

    .info-capacity {
        width: 100%;
        height: 321px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 18px;

        .info-box {
            width: 542px;
            height: 321px;
            padding: 20px 28px;
            box-sizing: border-box;
            background: #FFFFFF;
            box-shadow: 0px 2px 16px 0px rgba(87, 102, 254, 0.07);
            border-radius: 14px;

            .info-box-content {
                padding-top: 34px;
                display: flex;
                align-items: center;

                .info-picture {
                    width: 96px;
                    height: 96px;
                    margin-left: 16px;
                }

                .info-divider {
                    width: 3px;
                    height: 154px;
                    margin-left: 28px;
                }

                .info-content {
                    margin-left: 26px;
                    font-size: 21px;
                    font-family: PingFang-SC-Bold, PingFang-SC;
                    font-weight: bold;
                    color: #222222;
                    line-height: 29px;

                    p {
                        margin: 0 0 20px 0;

                        &:nth-child(4) {
                            margin: 0;
                        }

                        span {
                            margin-left: 18px;
                        }
                    }
                }
            }
        }

        .capacity-box {
            width: 684px;
            height: 321px;
            padding: 20px 28px;
            box-sizing: border-box;
            background: #FFFFFF;
            box-shadow: 0px 2px 16px 0px rgba(87, 102, 254, 0.07);
            border-radius: 14px;

            .capacity-content {
                height: 142px;
                display: flex;
                align-items: center;
                justify-content: space-around;

                .round-box {
                    .round {
                        width: 85px;
                        height: 85px;
                        font-size: 18px;
                        font-family: PingFang-SC-Bold, PingFang-SC;
                        font-weight: bold;
                        line-height: 25px;
                        background-size: 85px 85px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    p {
                        margin-top: 8px;
                        text-align: center;
                        font-size: 18px;
                        font-family: PingFang-SC-Bold, PingFang-SC;
                        font-weight: bold;
                        color: #222222;
                        line-height: 25px;
                    }
                }
            }

            p {
                font-size: 16px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #777777;
                line-height: 22px;
            }
        }
    }

    .free-look,
    .gaze,
    .attention {
        width: 100%;
        height: 503px;
        background: #FFFFFF;
        box-shadow: 0px 2px 16px 0px rgba(87, 102, 254, 0.07);
        border-radius: 14px;
        margin-top: 18px;
        padding: 20px 27px 27px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;

        .left-box,
        .right-box {
            width: 560px;

            .free-look-img {
                width: 539px;
                height: 212px;
                margin: 68px auto 17px;
            }

            .free-look-charts {
                height: 236px;
            }

            .gaze-left-content {
                height: 315px;
                overflow: hidden;
                text-align: center;

                .gaze-content-text-box {
                    margin: 30px auto 0;
                    font-size: 21px;
                    font-family: PingFang-SC-Bold, PingFang-SC;
                    font-weight: bold;
                    color: #505050;
                    line-height: 29px;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;

                    .span-p-l {
                        padding-left: 55px;
                    }

                    .span-r {
                        font-size: 20px;
                        font-family: PingFang-SC-Bold, PingFang-SC;
                        font-weight: bold;
                        color: #F06C18;
                        line-height: 20px;
                        position: relative;
                        top: -18px;
                    }

                    .span-p-r {
                        padding-right: 55px;
                    }
                }

                .gaze-img {
                    width: 539px;
                    height: 244px;
                    position: relative;
                    top: -18px;
                }
            }

            .gaze-charts-box {
                position: relative;

                .gaze-charts {
                    height: 315px;
                }

                .tags {
                    position: absolute;
                    top: 60px;
                    right: 50px;

                    .tags-top,
                    .tags-btm {
                        width: 70px;
                        height: 19px;
                        font-size: 13px;
                        font-family: PingFang-SC-Bold, PingFang-SC;
                        font-weight: bold;
                        color: #515151;
                        line-height: 19px;
                        display: flex;
                        align-items: center;

                        div {
                            width: 25px;
                            height: 14px;
                            border-radius: 4px;
                            margin-right: 5px;
                        }
                    }

                    .tags-top {
                        div {
                            background: #D0D4FF;
                        }
                    }

                    .tags-btm {
                        div {
                            background: #5766FE;
                        }
                    }
                }
            }

            .attention-img {
                width: 539px;
                height: 161px;
                margin: 60px auto 8px;
            }

            .attention-text-box {
                font-size: 21px;
                font-family: PingFang-SC-Bold, PingFang-SC;
                font-weight: bold;
                color: #505050;
                line-height: 29px;
                margin-bottom: 22px;
                display: flex;
                align-items: center;
                justify-content: space-around;

                span {
                    padding-right: 16px;
                }
            }

            .attention-content {
                height: 304px;
                display: flex;
                align-items: center;
                position: relative;

                div {
                    width: 50%;
                    height: 304px;
                }

                .tags,
                .tags2 {
                    position: absolute;
                    top: 18px;
                    left: 220px;

                    .tags-top,
                    .tags-btm {
                        width: 70px;
                        height: 19px;
                        font-size: 13px;
                        font-family: PingFang-SC-Bold, PingFang-SC;
                        font-weight: bold;
                        color: #515151;
                        line-height: 19px;
                        display: flex;
                        align-items: center;

                        div {
                            width: 25px;
                            height: 14px;
                            border-radius: 4px;
                            margin-right: 5px;
                        }
                    }

                    .tags-top {
                        div {
                            background: #D0D4FF;
                        }
                    }

                    .tags-btm {
                        div {
                            background: #5766FE;
                        }
                    }
                }

                .tags2 {
                    position: absolute;
                    top: 18px;
                    left: 490px;
                }
            }

            p {
                margin-top: 2px;
                font-size: 16px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #777777;
                line-height: 22px;
            }
        }
    }
}
</style>