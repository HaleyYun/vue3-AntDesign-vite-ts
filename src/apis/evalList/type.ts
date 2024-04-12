
export interface listData {
    archivesNo: string
    asserrorId: number
    assessor: string
    customName: string
    customOrigin: string
    customPhone: string
    estimateNum: number
    estimateResult: string
    estimateServeCode: string
    estimateServeName: string
    estimateServerType: string
    estimateTime: number
    organNum: string
    score: string
    status: number
    type: number
}
export interface evaluateType {
    data: listData[],
    pageIndex: number,
    pageSize: number,
    total: number
}
export interface evalListResponseData {
    code: number
    message: string
    data: evaluateType
}
export interface searrchlistType {
    pageNum?: number,
    pageSize?: number,
    keyword?: string,
    permissions: number
}
export interface whetherType {
    archivesNo?: string
}
export interface getCodeType {
    phone?: string
    estimateNum?: string
}
export interface setCodeType {
    phone?: string
    estimateNum?: string
    code?: string
}
export interface verifyCodeType {
    archivesNo?: string,
    code?: string,
    phone?: string
}

export interface GetBHIPageReq {
    keyword: string
    pageNum: number
    pageSize: number
}

export interface GetBHIPageRes {
    code: number
    data: {
        data: GetBHIPageResDataItem[]
        pageIndex: number
        pageSize: number
        total: number
        totalPage: number
    },
    msg: string
}
export interface GetBHIPageResDataItem {
    archivesNo: string
    bhiRiskType: number
    bhiRiskTypeDesc: string
    customName: string
    customPhone: string
    estimateTime: string
    sex: number
}

export interface GetGroupListReq {
    archivesNo: string
    pageNum: number
    pageSize: number
}
export interface GetEstimatePageRes {
    code: number
    data: {
        data: GetEstimatePageResData[]
        pageIndex: number
        pageSize: number
        total: number
        totalPage: number
    },
    msg: string
}

export interface GetEstimatePageResData {
    archivesNo: string
    assessor: string
    assessorId: number
    customName: string
    customPhone: string
    estimateNum: string
    estimateServeCode: string
    estimateServeName: string
    estimateTime: string
    lookReport: boolean
    prodName: string
    risk: string
    riskResult: string
    status: number
    type: number
}

