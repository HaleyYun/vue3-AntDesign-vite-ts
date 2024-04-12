import { defineStore } from 'pinia'
import type { listData, } from "@/apis/home/type"
import { ref } from 'vue';
import type { addScreeningOrderData } from "@/types/homeList"


export const useEvaluateData = defineStore('EvaluateData', () => {
    const list = ref<listData[]>([])
    const pageSize = ref<number>(6) // 每页几个
    const total = ref<number>(list.value.length) //总共多少条
    const listParams = ref<addScreeningOrderData>()
    const changeListParams = (obj:listData) => {
        let {customName,estimateServeName,estimateTime,status } = obj;
        listParams.value = { 
            customName:customName.toString(),
            estimateServeName:estimateServeName.toString(),
            date:estimateTime.toString(), 
            time:estimateTime.toString(), 
            status:status, 
        }
    } 
    const changePage = (currentPage: number) => {
        return new Promise((res: (value: listData[]) => void) => {
            let start: number = 0
            let end: number = pageSize.value
            if (currentPage > 1) {
                start = (pageSize.value * currentPage) - pageSize.value,
                end = pageSize.value * currentPage
            }
            res(list.value.slice(start, end))
        })
    }
    const getList = (res: listData[],total_num:number,page_size_num:number) => {
        list.value = res
        total.value = total_num
        pageSize.value = page_size_num
    }

    return {
        list,
        pageSize,
        total,
        listParams,
        changePage,
        getList,
        changeListParams
    }
})