import { defineStore } from 'pinia'
import { ref } from 'vue';
export const pageTabStatus = defineStore('pageTabStatus', () => {
    const equityTab = ref<number>(0)// 权益
    const equityStr = ref<string>('')// 权益筛条件


    const subscribeList = ref<number>(2)// 待筛查
    const subscribeStr = ref<string>('')// 筛查筛条件



    const evaluationRecord = ref<string>('BHI报告')// 评估记录
    const clearItem = () => {
        equityTab.value = 0
        subscribeList.value = 2
        evaluationRecord.value = 'BHI报告'
        equityStr.value = ''
        subscribeStr.value = ''
        
    }
    return {
        equityTab,
        subscribeList,
        evaluationRecord,
        equityStr,
        subscribeStr,
        clearItem
    }
})