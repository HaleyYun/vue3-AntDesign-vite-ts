export interface GetQuestionListReq {
    estimateServerCode: string
    questionIndex: string
}
export interface GetQuestionListRes {
    code: number
    data: GetQuestionListResData[]
    msg: string
}

export interface ResponseData {
    code: number,
    msg: string,
    data: boolean
}

export interface getMocaApiData {
    archNo: string
    estimateNum: string
    isUnableAnswer: boolean
    riskLabel: number
    riskLabelDesc: string
}

export interface GetQuestionListResData {
    affiliation: number
    children: GetQuestionListResDataChildren[]
    content: string
    evaluationType: number
    id: number
    imgPathList: string[]
    imgUrl: string
    menu: number
    patternRule: string
    questionIndex: number
    time: number
    voicePath: string
    isSkip: number
    submitType: number
    takeTime: number | string
}

export interface GetQuestionListResDataChildren {
    answers: string
    content: string
    contentIndex: number
    contentList: string[]
    option: string | null
    id: number
    questionContentEntityResponseList: QuestionContentEntityResponseList[],
    questionId: number
    questionVoice: string
    rightKey: string
    rightValue: boolean
    score: number
    isRight: number
    wrongValue: boolean
    remark: string
    classification: string
    sequence: number
}
export interface getDegreeRisk {
    answers: string
    content: string
    contentIndex: number
    contentList: string[]
    option: string | null
    id: number
    questionContentEntityResponseList: QuestionContentEntityResponseList[],
    questionId: number
    questionVoice: string
    rightKey: string
    rightValue: boolean
    score: number
    isRight: number
    wrongValue: boolean
    remark: string
    classification: string
}

export interface QuestionContentEntityResponseList {
    content: string
    rightValue: boolean
}

export interface AddQuestionResultReq {

}
export interface AddQuestionResultReqItem {
    answers: string | undefined
    content: string
    contentIndex: number
    estimateNum: string
    imgUrl: string
    isRight: number
    option: string | null | undefined
    photoUrl: string
    playRecord: string
    questionId: number
    remark: string,
    sequence?: number
    takeTime?: number | string
}

export interface GetAnswerDetails {
    estimateNum: string
    archNo: string
}

export interface AddQuestionResultRes {
    code: number
    data: boolean
    msg: string
}
export interface GetAnswerDetailsRes {
    code: number
    data: GetAnswerDetailsResDate
    msg: string
}

export interface GetAnswerDetailsResDate {
    name: string,
    score: number,
    estimateServerCode: string
    answerConcreteDetailsResponseList: answerConcreteDetailsResponseListItem[]
}
export interface answerConcreteDetailsResponseListItem {
    questionIndex: number
    content: string
    answerSequenceDetailsResponseList: answerSequenceDetailsResponseListItem[],
    score: number
    takeTime: number | string
    patternRule: string
    scoreRule: number
    category: null
    answerAttachmentsResponseList: {
        remark: string
        photoUrl: null | string
        playRecord: null | string
    },
    imgUrl: null | string
}
export interface answerSequenceDetailsResponseListItem {
    contentIndex: null | number
    isRight: number
    rightKey: string
    answers: null | string
    answerScoreList?: any
    imgUrl: string
    definition: null
    content: string
}

