<template>
  <div class="report">
    <div class="re-top">
      <div class="re-back"><img src="@/assets/images/bg-back.png" @click="outPage" /></div>
      <div class="re-title">评估结果报告</div>
    </div>

    <div class="result-info">
      <div class="per-top">
        <div class="line"></div>
        <div class="name">结果报告</div>
      </div>

      <div class="re-circle">
        <div class="leftText">
          <span>0</span><span style="margin-left: 5px">低</span>
        </div>
        <div class="line-item">
          <div class="name">综合脑健康得分</div>
          <div class="line">
            <div class="slider-box" :style="{ left: `calc(${(resDate?.report!.riskValue as number) / 8 * 100}% - 50px)` }">
              <img src="../../assets//images/slider.png" alt="" />
              <div class="box-item">
                您的位置<span style="color: #3d7eff">{{ resDate?.report!.riskValue }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="rightText"><span>高</span><span style="margin-left: 5px">8</span></div>
      </div>
      <div class="re-text">
        <div class="remark"><img src="@/assets/images/line.png" />报告说明</div>
        <div>您的AD-8测评风险程度是根据综合分析您在任务过程中执行数据得出，它反映了您患有认知障碍的整体风险，风险程度2分及以上可能存在认知障碍。您的风险值为“{{ resDate?.report!.riskValue }}”</div>
      </div>
    </div>

    <div class="health-list">
      <div class="list-one width540">
        <div class="per-top">
          <div class="line"></div>
          <div class="name">用户信息</div>
        </div>
        <div class="per-l">
          <div class="l-headbg"><img class="bg" src="@/assets/images/head.png" /></div>
          <div class="l-text">
            <div class="l-text-item">
              <div>姓&emsp;&emsp;名：</div>
              {{ resDate?.archiveInfoResponse?.name || '--' }}
            </div>
            <div class="l-text-item">
              <div>性&emsp;&emsp;别：</div>
              {{ resDate?.archiveInfoResponse?.sex === 1 ? '男' : resDate?.archiveInfoResponse?.sex === 2 ? '女' : '未知' }}
            </div>
            <div class="l-text-item">
              <div>出生日期：</div>
              {{ resDate?.archiveInfoResponse?.birthDay || '--' }}
            </div>
          </div>
        </div>
      </div>
      <div class="list-one">
        <div class="per-top">
          <div class="line"></div>
          <div class="name">脑健康综合能力分析</div>
        </div>
        <div class="analyzeCharts" id="analyzeCharts"></div>
        <div class="chartsItem">
          <div class="c1"></div>
          <p>用户数据</p>
          <div class="c2"></div>
          <p>边界值</p>
        </div>
        <p>注：脑健康能力值在分界线以上均为正常</p>
      </div>
      <div class="statistics-box">
        <div class="per-top">
          <div class="line"></div>
          <div class="name">数据统计</div>
        </div>
        <div class="box-content">
          <div class="box-item">
            <div style="width: 24px;height: 8px;  background: #3A84FE;"></div>
            <div>是</div>
          </div>
          <div class="box-item">
            <div style="width: 24px;height: 8px;  background: #FF980C;"></div>
            <div>否</div>
          </div>
          <div class="box-item">
            <div style="width: 24px;height: 8px;  background: #FFD00C;"></div>
            <div>不知道</div>
          </div>
        </div>
        <div class="statisticsCharts" id="statisticsCharts"></div>
        <div class="text-box">
          <h5>结果说明：</h5>
          <p style="text-align: left">
            如果以上问题，您回答“是，有变化”达2项及以上，您需要去医生处就诊，并向医生描述您在您家人身上观察到的变化。很多因素会导致健忘，一些是可逆的。您也许并没有在您家人身上观察到以上这些具体表现，但是也许您对他们最近一些行为举止的改变感到担忧；这张筛查表能帮助您确定是否存在问题，但是，请注意，只有医生能诊断阿尔茨海默症或者其他类型痴呆，请和您的医生一起来确定您的家人究竟发生了什么问题。
          </p>
        </div>
      </div>
    </div>
    <p style="padding: 0 36px; text-align: left">
      AD-8记忆障碍自评量表是美国华盛顿大学于2005年开发的8题探访问卷，是临床使用的用于极早期痴呆症筛查的医学量表。它也可供家属使用，作为疾病风险的评估。就临床而言，痴呆可能是源于阿尔茨海默症、血管形痴呆、路易体痴呆或额颞叶痴呆。本量表侧重于患者是否产生了八种特定的“变化”，通过观察回答来帮助家属筛查痴呆症状。建议家属定期使用本量表，对比患者是否有特定的情形变化。
    </p>
    <p>注意：</p>
    <p>该筛查表不能用来诊断您的家人是否存在疾病，只能确定他／她是否需要就诊检查。</p>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getEstimateResult } from '@/apis/estimateResult';
import { resData } from '@/apis/estimateResult/type';

const router = useRouter();
const route = useRoute();
let search = reactive<any>({
  analyzeCharts: '',
  analyzeCharts2: ''
});

const resDate = ref<resData['data']>();

onMounted(() => {
  getData();

  let analyzeDom = document.getElementById('analyzeCharts');
  search.analyzeCharts = echarts.init(analyzeDom as any);
  let analyzeDom2 = document.getElementById('statisticsCharts');
  search.analyzeCharts2 = echarts.init(analyzeDom2 as any);
});
const getData = async () => {
  const res = await getEstimateResult({ estimateNum: route.query.estimateNum as string });
  // const res = await getEstimateResult({ estimateNum: 'CAB20230716002116278' })
  if (res.code === 200) {
    resDate.value = res.data;
    echartsAnalyze([res.data!.report!.thirdCapacityValue || 0, res.data!.report!.secCapacityValue || 0, res.data!.report!.fourthCapacityValue || 0, res.data!.report!.firCapacityValue || 0]);
    echartsAnalyze2([res.data!.report!.firPhotoSduration || 0, res.data!.report!.secPhotoDuration || 0, res.data!.report!.thirdPhotoDuration || 0]);
  }

  console.log(res);
};
onUnmounted(() => {
  if (search.analyzeCharts) search.analyzeCharts.dispose();
  if (search.analyzeCharts2) search.analyzeCharts2.dispose();
});
//分析analyzeData: any
const echartsAnalyze = (data: number[]) => {
  let option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    color: ['#3A84FE', '#3A84FE', '#3A84FE', '#3A84FE'],
    grid: {
      left: '10%',
      right: '10%',
      bottom: '8%',
      top: '8%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['记忆力', '数理能力', '语言能力', '情绪状态'],
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#8C99A6',
            fontSize: 12
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        max: 10,
        min: 0, //最小值
        splitNumber: 11,
        axisLabel: {
          show: true,
          textStyle: {
            color: '#8C99A6'
          }
        }
      }
    ],
    series: [
      {
        name: 'Direct',
        type: 'bar',
        barWidth: '50%',
        data: data,
        itemStyle: {
          normal: {
            //这里设置柱形图圆角 [左上角，右上角，右下角，左下角]
            barBorderRadius: [4, 4, 0, 0]
          }
        },
        markLine: {
          symbol: ['none', 'none'], //去掉箭头
          itemStyle: {
            normal: {
              lineStyle: {
                type: 'solid',
                color: {
                  type: 'linear',
                  colorStops: [
                    {
                      offset: 0,
                      color: '#FFBC44 ' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#FFBC44' // 100% 处的颜色
                    }
                  ],
                  global: false // 缺省为 false
                }
              },
              label: {
                show: false,
                position: 'middle'
              }
            }
          },
          data: [
            {
              yAxis: 8
            }
          ]
        }
      }
    ]
  };
  option && search.analyzeCharts.setOption(option);
};
const echartsAnalyze2 = (data: number[]) => {
  let option = {
    tooltip: {
      trigger: 'item'
    },
    // legend: {
    //   orient: 'vertical',
    //   left: 'right',
    //   type:'plain'
    // },
    grid: {
      left: '10%',
      right: '10%',
      bottom: '10%',
      top: '10%',
      containLabel: true
    },
    color: ['#3A92FE', '#FF980C', '#FFD00C'],
    series: [
      {
        type: 'pie',
        radius: '70%',
        data: [
          { value: data[0], name: '是' },
          { value: data[1], name: '否' },
          { value: data[2], name: '不知道' }
        ],
        labelLine: {
          show: false
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  option && search.analyzeCharts2.setOption(option);
};

const outPage = () => {
  // router.back();
  router.push({
      path: "/reportRelast",
      query: {
        archivesNo:route.query.archivesNo,
        checked:'false'
      }
  })
};
</script>

<style lang="less" scoped>
.report {
  width: 100%;
  background-color: #f6f6f6;
  padding-bottom: 30px;

  p {
    font-size: 15px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #a0a0a0;
    line-height: 23px;
    text-align: center;
  }

  .re-top {
    width: 100%;
    height: 130px;
    background-image: url('@/assets/images/report-top.png');
    background-size: 100% 130px;
    display: flex;

    .re-back {
      width: 40px;
      height: 40px;
      margin: 40px;
    }

    .re-title {
      font-size: 35px;
      font-weight: bold;
      color: #fff;
      margin: auto;
    }
  }

  .result-info {
    width: 98%;
    height: 260px;
    background: #fff;
    border-radius: 10px;
    margin: 20px auto;
    box-shadow: 0px 2px 16px 0px rgba(87, 102, 254, 0.07);
    padding: 30px;

    .per-top {
      display: flex;

      .line {
        width: 8px;
        height: 22px;
        background: #5766fe;
        border-radius: 4px;
        margin-top: 10px;
        position: relative;
      }

      .name {
        font-size: 26px;
        font-weight: 400;
        color: #222;
        margin-left: 10px;
      }
    }

    .re-circle {
      width: 100%;
      height: 120px;
      text-align: center;
      display: flex;
      .leftText {
        display: flex;
        width: 80px;
        height: 40px;
        justify-content: center;
        margin-right: 5px;
        margin-top:42px;
        align-items: center;
        background: url(../../assets/images/AD-8/tipsLeft.png);
        & > span {
          display: block;
          font-size: 22px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #757575;
          line-height: 30px;
          // margin-right: 5px;
        }
      }
      .rightText {
        width: 80px;
        height: 40px;
        display: flex;
        margin-left: 5px;
        margin-top:45px;
        justify-content: center;
        align-items: center;
        background: url(../../assets/images/AD-8/tipsRight.png);
        & > span {
          display: block;
          font-size: 22px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #757575;
          line-height: 30px;
          margin-left: 5px;
        }
      }
      .line-item {
        width: 100%;
        .name {
          font-size: 20px;
          color: #222;
          font-weight: bold;
        }

        .line {
          width: 98%;
          height: 38px;
          background: linear-gradient(90deg, #2eae1d 0%, #29d30e 10%, #ffbc0c 26%, #d42114 100%);
          border-radius: 22px;
          margin: 10px auto;
          display: flex;
          justify-content: space-between;
          position: relative;

          .slider-box {
            width: 100px;
            position: absolute;
            top: 0;
            left: 0;

            img {
              width: 54px;
              height: 55px;
            }

            p {
              font-size: 20px;
              font-family: PingFangSC-Semibold, PingFang SC;
              font-weight: 600;
              color: #636262;
              line-height: 27px;
            }
            .box-item {
              font-size: 20px;
              font-family: PingFangSC-Semibold, PingFang SC;
              font-weight: 600;
              color: #636262;
              line-height: 27px;
            }
          }

          .text {
            width: 38px;
            height: 38px;
            color: #fff;
            font-size: 15px;
            line-height: 38px;
            text-align: center;
          }
        }
      }
    }

    .re-text {
      div {
        padding-top: 5px;
        font-size: 15px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #777777;
        line-height: 22px;
      }
    }
  }

  .health-list {
    width: calc(100% - 36px);
    height: 948px;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    position: relative;

    .list-one {
      width: 690px;
      height: 581px;
      background: #fff;
      box-shadow: 0px 2px 16px 0px rgba(87, 102, 254, 0.07);
      border-radius: 10px;
      padding: 20px;
      .analyzeCharts{

          @media only screen and (max-width: 1280px) {
            width: 628px; 
            height: 430px;

            }
            @media only screen and (max-width: 1920px) {
              width: 628px; 
              height: 430px;
            }
            // @media only screen and (max-width: 1200px) {
            //   width: 580px; 
            //  height: 350px;
            // }


          }

      .per-top {
        display: flex;

        .line {
          width: 8px;
          height: 22px;
          background: #5766fe;
          border-radius: 4px;
          margin-top: 10px;
        }

        .name {
          font-size: 26px;
          font-weight: 400;
          color: #222;
          margin-left: 10px;
        }
      }

      p {
        text-align: center;
        font-size: 18px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #8d8d8d;
        line-height: 24px;
        margin-top: 15px;
      }

      .chartsItem {
        display: flex;
        align-items: center;
        justify-content: center;

        .c1 {
          width: 21px;
          height: 7px;
          background: linear-gradient(180deg, #5e99ff 0%, #3a84fe 100%);
          border-radius: 1px;
        }

        .c2 {
          margin-left: 80px;
          width: 21px;
          height: 7px;
          background: #ffbc44;
          border-radius: 1px;
        }

        p {
          font-size: 16px;
          font-family: PingFang-SC-Bold, PingFang-SC;
          font-weight: bold;
          color: #222222;
          line-height: 22px;
          margin: 0 0 0 20px;
        }
      }

      .replenishment {
        font-size: 18px;
        color: #8d8d8d;
        line-height: 35px;
        margin-top: 20px;
      }

      .swipe {
        width: 650px;
        height: 330px;
        margin: 20px auto;
        border: 1px solid #faffff;
        border-radius: 10px;
        background: #f1f6fc;
      }

      .per-l {
        height: 220px;
        display: flex;
        align-items: center;

        .l-headbg {
          width: 100px;
          height: 100px;
          margin-left: 36px;
        }

        .l-text {
          margin-left: 50px;
          color: #222;
          font-size: 17px;
          font-weight: bold;
          line-height: 37px;

          .l-text-item {
            display: flex;

            div {
              width: 107px;
              text-align: right;
            }
          }
        }
      }
    }

    .statistics-box {
      position: relative;
      width: 1268px;
      height: 620px;
      position: absolute;
      left: -11px;
      top: 320px;
      padding: 30px 39px;
      background-image: url(../../assets/images/statistics_bg.png);
      background-size: 1268px;
      .statisticsCharts{

        @media only screen and (max-width: 1280px) {
          width: 482px;
          height: 354px; 
        }
        @media only screen and (max-width: 1920px) {
          width: 482px;
          height: 354px;
        }
            // @media only screen and (max-width: 1200px) {
            //   width: 580px; 
            //  height: 350px;
            // }

      }
      .box-content{
        position: absolute;
        left: 427px;
        .box-item{
        display: flex;
        align-items: center;
      }
      }
    
      .per-top {
        display: flex;

        .line {
          width: 8px;
          height: 22px;
          background: #5766fe;
          border-radius: 4px;
          margin-top: 10px;
        }

        .name {
          font-size: 26px;
          font-weight: 400;
          color: #222;
          margin-left: 10px;
        }
      }

      .text-box {
        width: 1175px;
        height: 142px;
        margin: 20px auto 0;
        background: linear-gradient(180deg, #faffff 0%, #fafeff 100%);
        box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.05);
        border-radius: 5px;
        border: 1px solid #f1f6fc;
        padding: 19px 17px;
        box-sizing: border-box;

        h5 {
          font-size: 18px;
          font-family: PingFang-SC-Bold, PingFang-SC;
          font-weight: bold;
          color: #6c6b72;
          line-height: 16px;
        }

        p {
          font-size: 15px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #6c6b72;
          line-height: 27px;
        }
      }
    }

    .width540 {
      width: 542px;
      height: 321px;
    }
  }
}
</style>
