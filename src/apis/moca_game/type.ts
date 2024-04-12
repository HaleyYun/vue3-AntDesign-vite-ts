//请求素材入参
export interface getDictTypeData {
    estimateServerCode: string
}
//素材返参
export interface getDictTypeResponseData {
    code: number
    msg: string
    data: getDictTypeResponseDataContent[]
}

export interface getDictTypeResponseDataContent {
    affiliation: number,
    children: childrenData[],
    content: string,
    id: number,
    imgPathList: [],
    menu: string,
    radarChartInputId: number,
    score: number,
    scoreRule: number,
    sort: number,
    time: number,
    type: number,
    voicePath: string,
    answers: string,
    remarkText: string,
    templateEnumcode: string,
    practice: string,
}

export interface childrenData {
    content: string,
    id: number,
    questionId: number,
    questionVoice: string,
    rightKey: string,
    rightValue: boolean,
    wrongValue: boolean,
    score: number,
    sortIndex?: number,
}
//提交题目入参
export interface getsedResultData {
    answers: string,
    estimateNum: string,
    imgUrl: string,
    isRight: number,
    playRecord: string,
    questionId: number,
    radarChartInputId: number,
    remark: string,
    score: string,
    sortIndex: number,
}
//提交题目返参
export interface ResponseData {
    code: number,
    msg: string,
    data: boolean
}
export interface getEstimateNumData {
    archivesNo?: string
    customName?: string
    customPhone?: string
    deviceNum?: string
    estimateServeCode?: string
    estimateServeName?: string
    estimateServeType?: string
    orderNum?: string
    type?: number
}

export interface getEstimateNumDataResponseData {
    code: number,
    msg: string,
    data: string
}


export interface getMocaApiData {
    archNo: string
    estimateNum: string
    isUnableAnswer: boolean
    riskLabel: number
    riskLabelDesc: string
}

export interface getInfoApiData {
    estimateNum: String
    questionId: number
}


export interface infoResponseData {
    code: number,
    msg: string,
    data: []
}

