export interface resultType {
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

export interface videoType {
    videoName: string,
    videoPath: string,
    analysisVideoPath?: string | null
    sortIndex: number
}

export interface resultResponseData {
    code: number
    message: string
    data: resultType
}

export interface videoResponseData {
    code: number
    message: string
    data: videoType[]
}