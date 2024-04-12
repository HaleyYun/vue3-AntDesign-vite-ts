import { defineStore } from 'pinia'
// import { message } from 'ant-design-vue';
import { QueryAssessmentReport } from "@/apis/EvaluationRecord/index"
import type { archiveInfoResponse,eyeTable,imageMemoryTable,ReportType} from "@/apis/EvaluationRecord/type"
import { ref,reactive} from 'vue';
// import router from '@/router';

export const getReportStore = defineStore('report', () => {

  const customInfo = reactive<archiveInfoResponse>({
    age: 20,
    education: '大专',
    name: '默认客户',
    sex: 1,
    organName:'织生平台',
    phone:'18888888888'
  })

  const firCapacityValue = ref<number>(0)
  const secCapacityValue = ref<number>(0)
  const thirdCapacityValue = ref<number>(0)

  const riskValue = ref<number>(10)

  //图片记忆任务
  const firPhotoSduration = ref<number>(10)
  const secPhotoDuration = ref<number>(10)
  const thirdPhotoDuration = ref<number>(10)
  const gazingDuration = ref<number>(10)  //用户数据
  const defaultGazingDuration = ref<number>(10) //常模数据

  //眼跳任务
  const customForwardDelayTime = ref<number>(10) //用户眼跳延时时间(正向)
  const customForwardCorrectRatio = ref<number>(10) //用户眼跳正确率(正向)
  const defaultForwardDelayTime = ref<number>(10)  // 常规眼跳延时时间(正向)
  const defaultForwardCorrectRatio = ref<number>(10)  //常规眼跳正确率(正向

  //数据统计详情
  const eyeTableList = ref<eyeTable[]>()
  const imageMemoryTableList = ref<imageMemoryTable[]>()



  //报告接口返回
  const getReportInfo = async (options:ReportType)=>{
    const res= await QueryAssessmentReport(options)

    customInfo.age = res.data.archiveInfoResponse.age
    customInfo.education = res.data.archiveInfoResponse.education
    customInfo.name = res.data.archiveInfoResponse.name
    customInfo.sex = res.data.archiveInfoResponse.sex
    customInfo.organName = res.data.archiveInfoResponse.organName
    customInfo.phone = res.data.archiveInfoResponse.phone

    firCapacityValue.value = res.data.report.firCapacityValue*100
    secCapacityValue.value = res.data.report.secCapacityValue*100
    thirdCapacityValue.value = res.data.report.thirdCapacityValue*100

    riskValue.value = res.data.report.riskValue*10

    firPhotoSduration.value = res.data.report.firPhotoSduration
    secPhotoDuration.value = res.data.report.secPhotoDuration
    thirdPhotoDuration.value = res.data.report.thirdPhotoDuration

    gazingDuration.value = res.data.report.gazingDuration
    defaultGazingDuration.value = res.data.report.defaultGazingDuration

    customForwardDelayTime.value = res.data.report.customForwardDelayTime
    customForwardCorrectRatio.value = res.data.report.customForwardCorrectRatio
    defaultForwardDelayTime.value = res.data.report.defaultForwardDelayTime
    defaultForwardCorrectRatio.value = res.data.report.defaultForwardCorrectRatio

    eyeTableList.value = res.data.report.eyeTable
    imageMemoryTableList.value = res.data.report.imageMemoryTable

    return res
  }


  return {
    getReportInfo,
    customInfo,
    firCapacityValue,
    secCapacityValue,
    thirdCapacityValue,
    riskValue,
    firPhotoSduration,
    secPhotoDuration,
    thirdPhotoDuration,
    gazingDuration,
    defaultGazingDuration,
    customForwardDelayTime,
    customForwardCorrectRatio,
    defaultForwardDelayTime,
    defaultForwardCorrectRatio,
    eyeTableList,
    imageMemoryTableList
  }
},{
  persist:true,
})

