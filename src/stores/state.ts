import { defineStore } from 'pinia'
import { ref } from 'vue';
export const useState = defineStore('state', () => {
    const scheduleNumberState = ref<number>(0)
    const RandomState = ref<number>(0) //
    const addAssessOrderData = ref<any>()//新增筛查订单data
    const evaluationResultData = ref<any>()// 评估结果data
    const QueryProData = ref<any>()// 去评估结果
    const estimateNum = ref<any>()//抑郁评估单号
    const depressData = ref<any>()// 抑郁流程数据
    const pageNum = ref<number>(1)//记录分页数
    const pageSubNum = ref<number>(1)//记录分页数
    const pageUrl = ref<string>('')//页面路由
    
    const fromUrl = ref<string>('')//页面路由
    const isView = ref<number>(-1)//页面路由

    const carouselIndex = ref<number>(0)//页面路由
    
    const ticketCode = ref("")//页面路由
    const gaugeTime = ref(0)

    const audioTime = ref(0)//录音30分钟计时

    const arrCft = ref<any>(['','','','','','','','','','','','','','','','','',''])//cft数组
    const cftNum = ref<Number>(0)//第几个评分

    const cftBol = ref<boolean>(false)

    const mocaList = ref<any>([])
    const getMocaList = (value: any) => {
        mocaList.value = value
    }

    const mocaAllDataList = ref<any>([])//所有题目数据以及入参
    const getMocaAllDataList = (value: any) => {
        mocaAllDataList.value = value
    }

    const getPageUrl = (value: string) => {
        pageUrl.value = value
    }
    const changePageNumNumberState = (num: number) => {
        pageNum.value = num
    }
    const changePageSubNumNumberState = (num: number) => {
        pageSubNum.value = num
    }

    const changeScheduleNumberState = (num: number) => {
        scheduleNumberState.value = num
    }
    const addScheduleNumberState = () => {
        scheduleNumberState.value++
    }
    const changeRandomState = (num: number) => {
        RandomState.value = num
    }
    const addRandomState = () => {
        RandomState.value++
    }

    const getAddAssessOrderData = (value: any) => {
        addAssessOrderData.value = value
    }
    const getEvaluationResultData = (value: any) => {
        evaluationResultData.value = value
    }

    const getQueryProData = (value: any) => {
        QueryProData.value = value
    }
    const getDepressData = (value: any) => {
        depressData.value = value
    }

    const getEstimateNum = (value: any) => {
        estimateNum.value = value
    }


    return {
        scheduleNumberState,
        RandomState,
        addAssessOrderData,
        evaluationResultData,
        QueryProData,
        depressData,
        estimateNum,
        pageNum,
        pageSubNum,
        pageUrl,
        mocaList,
        mocaAllDataList,
        getMocaList,
        getMocaAllDataList,
        getPageUrl,
        changePageNumNumberState,
        changePageSubNumNumberState,
        changeScheduleNumberState,
        addScheduleNumberState,
        changeRandomState,
        addRandomState,
        getAddAssessOrderData,
        getEvaluationResultData,
        getQueryProData,
        getDepressData,
        getEstimateNum,
        fromUrl,
        isView,
        carouselIndex,
        ticketCode,
        gaugeTime,
        audioTime,
        arrCft,
        cftNum,
        cftBol
    }
}, {
    persist: true,
})