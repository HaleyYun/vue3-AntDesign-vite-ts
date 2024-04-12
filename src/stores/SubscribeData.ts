import { defineStore } from 'pinia'
import type { listData, } from "@/apis/subscribeList/type"
import type { addScreeningOrderData } from "@/types/subscribeList"
import { ref } from 'vue';

export const useSubscribeData = defineStore('SubscribeData', () => {
    const list = ref<listData[]>([])
    // const pageSize = ref<number>(5) // 每页几个
    // const total = ref<number>(list.value.length) //总共多少条
    const listParams = ref<addScreeningOrderData>()

    const changeListParams = (obj:listData) => {
        let { ticketsBookingCode,clientName,checkName,bookingTime, status,phone } = obj;
        listParams.value = { 
            ticketsBookingCode:ticketsBookingCode.toString(),
            clientName, 
            checkName,
            bookingTime,
            status,
            phone
        }
    }
    // const changePage = (currentPage: number) => {
    //     return new Promise((res: (value: listData[]) => void) => {
    //         let start: number = 0
    //         let end: number = pageSize.value
    //         if (currentPage > 1) {
    //             start = (pageSize.value * currentPage) - pageSize.value,
    //                 end = pageSize.value * currentPage
    //         }
    //         res(list.value.slice(start, end))
    //     })
    // }
    const getList = (res: listData[]) => {
        list.value = res
    }

    return {
        list,
        // pageSize,
        // total,
        listParams,
        // changePage,
        getList,
        changeListParams
    }
})