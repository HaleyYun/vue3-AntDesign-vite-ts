export interface resData {
    code: number
    msg: string
    data: {
        dataList?: {
            firCapacityValue: number,
            secCapacityValue: number,
            thirdCapacityValue: number,
            fourthCapacityValue: number,
            firPhotoSduration: number,
            secPhotoDuration: number,
            thirdPhotoDuration: number,
            riskValue: number,
        }
        archiveInfoResponse?: archiveInfoResponseType
        estimateInfoResponse?: estimateInfoResponseType
        report?: scaleReportType
    }
}

export interface estimateInfoResponseType {
    prodName: null | number | string,
    estimateNum: null | string,
    archivesNo: null | string,
    estimateServerType: null | number | string,
    type: null | number,
    status: null | number,
    estimateTime: null | string,
    assessor: null | number | string,
    customOrigin: null | number | string,
    remark: null | string
}

export interface archiveInfoResponseType {
    age: null | number | string
    education: null | number | string
    name: null | string
    organName: null | string
    phone: null | string
    sex: null | number | string
    birthDay: null | number | string
}

export interface scaleReportType {
    estimateNum: null | string
    riskValue: number | null
    firCapacityValue: number | null
    secCapacityValue: number | null
    thirdCapacityValue: number | null
    fourthCapacityValue: null
    customForwardDelayTime: number | null
    customForwardCorrectRatio: number | null
    customReverseDelayTime: null
    customReverseCorrectRatio: null
    defaultForwardDelayTime: number | null
    defaultForwardCorrectRatio: number | null
    defaultReverseDelayTime: null
    defaultReverseCorrectRatio: null
    firPhotoSduration: number | null
    secPhotoDuration: number | null
    thirdPhotoDuration: number | null
    gazingDuration: number | null
    defaultGazingDuration: number | null
    resList: resListType[]
    [key: string]: any
}

export interface resListType {
    sortIndex: number
    videoName: null | string
    videoPath: null | string
    analysisVideoPath: null | string
    taskType: null | string
    type: number
}
