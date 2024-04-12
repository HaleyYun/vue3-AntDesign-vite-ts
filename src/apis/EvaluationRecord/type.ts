export interface resData {
    code: number
    msg: string
    data?: string
}
export interface ReportType {
    estimateNum: string
    type: number
}
export interface archiveInfoResponse {
    age: number
    education: string,
    name: string,
    sex: number,
    organName:string,
    phone:string
}
export interface estimateInfoResponse {
    assessor: string,
    customOrigin: string,
    estimateNum: string,
    estimateServerType: string,
    estimateTime: string,
    prodName: string,
    remark: string,
    type: number
}
export interface attentionResult {
    attention: number,
    attentionStr: string,
    referenceValue: string,
    unit: string
}
export interface executionResult {
    errorNum: number,
    execution: number,
    executionStr: string,
    referenceValue: string,
    rightNum: number,
    score: string,
    unit: string
}
export interface eyeImageResult {
    delayTime: string,
    errorNum: number,
    referenceDelayTime: string,
    rigthNum: number
}
export interface eyeMovementResult {
    gazeTime: string,
    newImageTime: string,
    oldImageTime: string,
    referenceGazeTime: string
}
export interface memoryResult {
    errorNum: number,
    memory: number,
    memoryStr: string,
    referenceValue: string,
    rightNum: number,
    score: string,
    unit: string
}


export interface eyeTable {
    name:string,
    value: string,
    referValue: string,
    valueUnit: string
}

export interface imageMemoryTable {
    name: string,
    value: string,
    referValue: string,
    valueUnit: string
}

export interface capabilityTable {
    "name": string,
    "value": string,
    "referValue": string,
    "valueUnit": string
}

export interface report {
    // attentionResult: attentionResult,
    // executionResult: executionResult,
    // eyeImageResult: eyeImageResult,
    // eyeMovementResult: eyeMovementResult,
    // memoryResult: memoryResult,
    // riskScore: string,

    
    estimateNum: string,
    riskValue: number,
    firCapacityValue:number,
    secCapacityValue:number,
    thirdCapacityValue:number,
    customForwardDelayTime: null,
    customReverseDelayTime: null,
    defaultForwardDelayTime: null,
    defaultReverseDelayTime: null,
    firPhotoSduration: null,
    secPhotoDuration: null,
    thirdPhotoDuration: null,
    gazingDuration: null,
    resList:any
    eyeTable: eyeTable,
    imageMemoryTable: imageMemoryTable,
    capabilityTable: capabilityTable

}
export interface negativeEmotionsResult {
    referenceValue: string
    unit: string
    value: string
}
export interface positiveEmotionsResult {
    referenceValue: string
    unit: string
    value: string
}
export interface sensitiveEmotionsResult {
    referenceValue: string
    unit: string
    value: string
}

export interface scaleReport {
    // gazeTime: string,
    // negativeEmotionsResult: negativeEmotionsResult
    // negativeImageTime: string,
    // neutralityTime: string,
    // positiveEmotionsResult: positiveEmotionsResult
    // positiveImageTime: string,
    // referenceGazeTime: string,
    // riskScore: string,
    // sensitiveEmotionsResult: sensitiveEmotionsResult

    "estimateNum": string,
    "riskValue": number,
    "firCapacityValue": number,
    "secCapacityValue": number,
    "thirdCapacityValue": number,
    "customForwardDelayTime": null,
    "customReverseDelayTime": null,
    "defaultForwardDelayTime": null,
    "defaultReverseDelayTime": null,
    "firPhotoSduration": null,
    "secPhotoDuration": null,
    "thirdPhotoDuration": null,
    "gazingDuration": null,
    "resList": any,
    "eyeTable": any,
    "imageMemoryTable": any,
    "capabilityTable": any
}


export interface ReportTResult {
    archiveInfoResponse: archiveInfoResponse
    estimateInfoResponse: estimateInfoResponse
    report: report
    scaleReport: scaleReport
}









