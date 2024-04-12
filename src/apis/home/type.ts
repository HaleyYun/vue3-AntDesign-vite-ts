
export interface listData {
    customName:string
    estimateResult:string
    estimateServeCode:string
    estimateServeName:string
    estimateServerType: string 
    estimateTime: number
    status:number
}
export interface evaluateType{
    data:listData[],
    pageIndex:number,
    pageSize:number,
    total:number
}
export interface homeListResponseData{
    code: number
    msg: string
    data: evaluateType
}


export interface rankType{
    channelRank:number,
    organRank:number
}
export interface rankInfoResponseData{
    code: number
    msg: string
    data: rankType
}

// export interface achieveType{
   
// }
export interface achieveListResponseData{
    code: number
    msg: string
    data: string
}


export interface upAchieveType{
   
}
export interface updateAchieveResponseData{
    code: number
    msg: string
    data: upAchieveType
}

export interface chartType{
   date:string
   estimateCount:number
}
export interface EstimatesChartResponseData{
    code: number
    msg: string
    data: chartType[]
}

export interface AppVersionResponseData{
    code: number
    msg: string
    data: string
}