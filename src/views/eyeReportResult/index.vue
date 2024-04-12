<script setup lang="ts">
import EyeTask from './components/EyeTask.vue';
import MemoryTask from './components/MemoryTask.vue';
// import {useRoute } from 'vue-router'
import { useRouter, useRoute } from 'vue-router';

import { onMounted, ref, reactive } from 'vue';
import type { archiveInfoResponse, eyeTable, imageMemoryTable } from '@/apis/EvaluationRecord/type';
// import { QueryAssessmentReport } from "@/apis/EvaluationRecord/index"

import { getReportStore } from '@/stores/Report';

const route = useRoute();
const router = useRouter();

const back = () => {
  router.go(-1);
};

const customInfo = reactive<archiveInfoResponse>({
  age: 20,
  education: '大专',
  name: '默认客户',
  sex: 1,
  organName: '织生平台',
  phone: '18888888888'
});

const echartsKey = ref<number>(0);

const firCapacityValue = ref<number>(0);
const secCapacityValue = ref<number>(0);
const thirdCapacityValue = ref<number>(0);

const riskValue = ref<number>(10);

//图片记忆任务
const firPhotoSduration = ref<number>(10);
const secPhotoDuration = ref<number>(10);
const thirdPhotoDuration = ref<number>(10);
const gazingDuration = ref<number>(10); //用户数据
const defaultGazingDuration = ref<number>(10); //常模数据

//眼跳任务
const customForwardDelayTime = ref<number>(10); //用户眼跳延时时间(正向)
const customForwardCorrectRatio = ref<number>(10); //用户眼跳正确率(正向)
const defaultForwardDelayTime = ref<number>(10); // 常规眼跳延时时间(正向)
const defaultForwardCorrectRatio = ref<number>(10); //常规眼跳正确率(正向)

const estimateNum = ref<string>('');

const reportStore = getReportStore();

onMounted(async () => {
  estimateNum.value = route.query.estimateNum as any;
  // let {estimateNum,type}=route.query
  const res = await reportStore.getReportInfo({
    // estimateNum:<string>estimateNum,
    // type:parseInt(<string>type)
    // estimateNum:"CAD20230708211051981",
    // type:3
    estimateNum: route.query.estimateNum as any,
    type: 3
  });
  console.log('pinia:');
  console.log(res);
  customInfo.age = res.data.archiveInfoResponse.age;
  customInfo.education = res.data.archiveInfoResponse.education;
  customInfo.name = res.data.archiveInfoResponse.name;
  customInfo.sex = res.data.archiveInfoResponse.sex;
  customInfo.organName = res.data.archiveInfoResponse.organName;
  customInfo.phone = res.data.archiveInfoResponse.phone;
  firCapacityValue.value = parseFloat((res.data.report.firCapacityValue * 100).toFixed(2));
  secCapacityValue.value = parseFloat((res.data.report.secCapacityValue * 100).toFixed(2));
  thirdCapacityValue.value = parseFloat((res.data.report.thirdCapacityValue * 100).toFixed(2));
  riskValue.value = parseFloat(res.data.report.riskValue.toFixed(2));
  firPhotoSduration.value = res.data.report.firPhotoSduration || 0;
  secPhotoDuration.value = res.data.report.secPhotoDuration || 0;
  thirdPhotoDuration.value = res.data.report.thirdPhotoDuration || 0;
  gazingDuration.value = res.data.report.gazingDuration || 0;
  defaultGazingDuration.value = res.data.report.defaultGazingDuration || 0;
  customForwardDelayTime.value = res.data.report.customForwardDelayTime || 0;
  customForwardCorrectRatio.value = res.data.report.customForwardCorrectRatio || 0;
  defaultForwardDelayTime.value = res.data.report.defaultForwardDelayTime || 0;
  defaultForwardCorrectRatio.value = res.data.report.defaultForwardCorrectRatio || 0;
  eyeTableList.value = res.data.report.eyeTable || [];
  imageMemoryTableList.value = res.data.report.imageMemoryTable || [];
  echartsKey.value += 1;
});

//数据统计详情
const eyeTableList = ref<eyeTable[]>();
const imageMemoryTableList = ref<imageMemoryTable[]>();
</script>
<template>
  <div class="report-conent">
    <div class="top">
      <div class="top_back" @click="back"><img src="@/assets/images/bg-back.png" alt="" /></div>
    </div>
    <div class="warp">
      <div class="jgbg">
        <div>
          <span class="universal-title">结果报告</span>
        </div>
        <div class="schedule-content">
          <div class="scheduleLeft">
            <span>0</span>
            <span>低</span>
          </div>
          <div class="schedule">
            <p>认知障碍风险程度</p>
            <div>
              <div class="pointer" :style="{ left: `calc(${riskValue * 10 + '%'} - 75px) ` }">
                <img src="@/assets/images/ReportResult/report_06.png" alt="" />
                <div>
                  您的位置<span style="color: #3d7eff">{{ riskValue }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="scheduleRight">
            <span>高</span>
            <span>10</span>
          </div>
        </div>

        <div class="explain">
          <div>
            <span class="two-universal-title">报告说明</span>
          </div>
          <div class="txt">您的认知障碍风险程度是根据综合分析您在任务过程中的眼动数据得出的，它反映了您患有认知功能障碍的整体风险。风险程度越靠近“10”，则意味着您面临的认知障碍风险越大。您的风险值为{{ riskValue }}</div>
          <p class="txt-p">请注意，该算法会根据您的年龄和成绩来计算风险值。因此，不同年龄段的成绩将会有所不同，不能直接进行比较。</p>
        </div>
      </div>
      <div class="userinfo-capacity">
        <div class="left">
          <div>
            <span class="universal-title">用户信息</span>
          </div>
          <div class="user">
            <div>
              <img src="@/assets/images/ReportResult/report_08.png" alt="" />
            </div>
            <div class="info">
              <div>姓名：{{ customInfo.name }}</div>
              <div v-if="customInfo.sex == 1">性别:男</div>
              <div v-if="customInfo.sex == 2">性别:女</div>
              <div v-if="customInfo.sex == 3">性别:未知</div>
              <div>年龄：{{ customInfo.age }}</div>
              <div>教育背景：{{ customInfo.education }}</div>
            </div>
          </div>
        </div>
        <div class="right">
          <div>
            <span class="universal-title">分项认知能力</span>
          </div>
          <div class="right-two-box">
            <div>
              <div class="circle">
                <span>{{ firCapacityValue }}%</span>
              </div>
              <div>注意能力</div>
            </div>
            <div>
              <div class="circle">
                <span>{{ secCapacityValue }}%</span>
              </div>
              <div>执行功能</div>
            </div>
            <div>
              <div class="circle">
                <span>{{ thirdCapacityValue }}%</span>
              </div>
              <div>记忆能力</div>
            </div>
          </div>
          <div class="sm-p">
            <span class="two-universal-title">报告说明</span>
          </div>
          <div class="sm-txt">依据您在眼跳任务和图片记忆任务中的表现，我们能够分析您的注意力、执行功能和记忆能力。每项能力值越接近100%，则代表您在该方面的表现越优秀。</div>
        </div>
      </div>
      <eye-task
        :customForwardDelayTime="customForwardDelayTime"
        :customForwardCorrectRatio="customForwardCorrectRatio"
        :defaultForwardDelayTime="defaultForwardDelayTime"
        :defaultForwardCorrectRatio="defaultForwardCorrectRatio"
        :estimateNum="estimateNum"
        :eyeTableList="eyeTableList"
        :key="echartsKey"
      ></eye-task>

      <memory-task
        :firPhotoSduration="firPhotoSduration"
        :secPhotoDuration="secPhotoDuration"
        :thirdPhotoDuration="thirdPhotoDuration"
        :estimateNum="estimateNum"
        :gazingDuration="gazingDuration"
        :defaultGazingDuration="defaultGazingDuration"
        :imageMemoryTableList="imageMemoryTableList"
        :key="echartsKey"
      ></memory-task>
    </div>
  </div>
</template>

<style lang="less" scoped>
.report-conent {
  background: #f6f6f6;
}

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

.warp {
  width: 1200px;
  margin: 0 auto;
}

.top {
  width: 100%;
  height: 108px;
  background: url('@/assets/images/ReportResult/report_top.png') no-repeat;
  background-size: 100% auto;
  background-position: 0px -89px;
  position: relative;

  .top_back {
    position: absolute;
    left: 30px;
    top: 32px;
    height: 40px;
  }

  .top_back > span {
    font-size: 28px;
    color: #ffffff;
    line-height: 40px;
  }
}

.jgbg {
  width: 100%;
  // height: 340px;
  box-shadow: 0px 2px 18px 0px rgba(87, 102, 254, 0.07);
  border-radius: 16px;
  padding: 15px;
  margin-top: 15px;
  background: #fff;
  .schedule-content {
    display: flex;
    align-items: center;
    justify-content: center;
    .schedule {
      width: 1000px;
      // margin: 0 auto;

      p {
        display: block;
        width: 240px;
        height: 42px;
        font-size: 30px;
        font-weight: 400;
        color: #222222;
        line-height: 42px;
        margin: 10px auto;
      }

      & > div {
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 42px;
        background: linear-gradient(90deg, #2eae1d 0%, #29d30e 26%, #ffbc0c 62%, #d42114 100%);
        border-radius: 25px;
        line-height: 42px;
        padding: 0 23px;

        .pointer {
          width: 150px;
          position: absolute;
          top: 0px;
          left: 70%;

          div {
            font-size: 22px;
            font-weight: 600;
            color: #636262;
            line-height: 30px;
            margin-top: -7px;
          }

          img {
            display: block;
            width: 60px;
            margin: 0 auto;
          }
        }

        & > span {
          display: block;
          width: 22px;
          font-size: 22px;
          font-weight: 600;
          color: #ffffff;
          line-height: 30px;
          text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
        }
      }
    }
    .scheduleLeft {
      display: flex;
      width: 71px;
      height: 40px;
      justify-content: center;
      margin-right: 10px;
      margin-top: 60px;
      align-items: center;
      background: url(../../assets/images/AD-8/tipsLeft.png);
      & > span {
        display: block;
        font-size: 22px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #757575;
        line-height: 30px;
        margin-right: 5px;
      }
    }
    .scheduleRight {
      width: 71px;
      height: 40px;
      display: flex;
      margin-left: 5px;
      margin-top: 60px;
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
  }

  .explain {
    margin-top: 50px;

    .txt {
      font-size: 18px;
      font-weight: 400;
      color: #777777;
      line-height: 30px;
      margin-top: 5px;
      text-align: justify;
    }

    .txt-p {
      font-size: 16px;
      font-weight: 400;
      color: #b7b7b7;
      line-height: 22px;
      text-align: center;
      margin-top: 5px;
      margin-bottom: 0;
      text-align: justify;
    }
  }
}

.userinfo-capacity {
  display: flex;
  justify-content: space-between;
  width: 100%;

  & > div {
    width: 45%;
    padding: 15px;
    margin-top: 15px;
    border-radius: 16px;
    background: #fff;
  }

  .left {
    .user {
      display: flex;
      margin-top: 10px;

      & > div {
        &:nth-child(1) {
          position: relative;
          display: flex;
          align-items: center;
          width: 270px;

          img {
            display: block;
            width: 167px;
            margin: 0 auto;
          }

          &::after {
            content: '';
            width: 5px;
            height: 100%;
            position: absolute;
            background: url('@/assets/images/ReportResult/report_7.png') no-repeat;
            background-size: 3px 100%;
            right: 0px;
          }
        }
      }

      .info {
        flex: 1;
        padding-left: 45px;

        div {
          display: flex;
          font-size: 24px;
          font-weight: bold;
          color: #222222;
          line-height: 33px;
          margin-bottom: 20px;
        }
      }
    }
  }

  .right {
    width: 54%;

    .right-two-box {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;

      & > div {
        .circle {
          position: relative;
          width: 80px;
          height: 80px;
          border-radius: 50%;

          span {
            position: absolute;
            display: block;
            width: 40px;
            height: 40px;
            background-color: #fff;
            border-radius: 50%;
            top: 50%;
            left: 50%;
            text-align: center;
            line-height: 40px;
            font-weight: bold;
            color: #0b59ff;
            transform: translate(-50%, -50%);
          }
        }

        & > div {
          // width: 80px;
          margin-top: 8px;
          height: 28px;
          font-size: 20px;
          font-weight: bold;
          color: #222222;
          line-height: 28px;
        }

        &:nth-child(1) {
          .circle {
            background: conic-gradient(from 90deg, #fff, #064eda);
          }
        }

        &:nth-child(2) {
          .circle {
            background: conic-gradient(from 90deg, #fff, #ff5300);
          }
        }

        &:nth-child(3) {
          .circle {
            background: conic-gradient(from 90deg, #fff, #09a708);
          }
        }
      }
    }

    .sm-p {
      margin-top: 10px;
    }

    .sm-txt {
      margin-top: 5px;
      font-size: 16px;
      font-weight: 400;
      color: #777777;
      text-align: justify;
    }
  }
}
</style>
