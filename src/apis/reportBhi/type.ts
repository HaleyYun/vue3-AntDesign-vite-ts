export interface resultResponseData{
    code: number
    message: string
    data: resultType
}
export interface resultType{
    healthBhiResponse: healthBhiResponseData 
    healthRecordsBaseResponse:healthRecordsBaseResponseData
    healthRiskFactors:healthRiskFactorsData[]
    radarChartResponse:radarChartResponseData
    label1:string
    label2:string
}

export interface healthBhiResponseData{
    archivesNo:string
    bhi:number
    createTime:string
    createUser:string
    futureTrends:futureTrendsData[]
    reportInterpretation:string
    riskType:string
    riskTypeDesc:string
    updateTime:string
    bhiComments:string
}
export interface futureTrendsData{
    age: number
    score: number
}


export interface healthRecordsBaseResponseData{
    address: string
    age: number
    alternateContact:string
    archivesNo:string
    associatedChannelId:number
    associatedOrganId: number
    associatedOrganName:string
    associatedUsers: string
    associatedUsersSource: string
    birthday: string
    contactPhone:string
    createTime:string
    education: string
    educationDesc:string
    expertAnalysis:string
    homeAddress: string
    hospitalId: string
    idNo:string
    medicalInsuranceCard:string
    name: string
    neighborhoodCommittee: string
    phone: string
    proportion: number
    relations: string
    relationsDesc:string
    riskType: string
    riskTypeDesc:string
    score: number
    sex: number
    sexDesc: string
    street: string
    updateTime: string
}
export interface healthRiskFactorsData{
    project: string
	recommendation: string
}


export interface radarChartResponseData{
    emotionalStateScore: number
	emotionalStateScoreHistory:scoreData  [],
	executionAbilityScore: number
	executionAbilityScoreHistory:scoreData [],
	languageAbilityScore: number
	languageAbilityScoreHistory: scoreData[],
	mathematicalLogicScore:number
	mathematicalLogicScoreHistory: scoreData[],
	memoryScore: number
	memoryScoreHistory: scoreData[],
    visualSpatialAbilityScore: number
	visualSpatialAbilityScoreHistory: scoreData[]
}


export interface scoreData{
    dateTime: string
	score: number
}


export interface tabelData{
    code: number
    message: string
    data: listData
}


export interface listData{
    archivesNo: string
    customOrigin: string
    estimateNum: string
    estimateServerType: string
    estimateTime:string
    prodName: string
    risk:string
    riskValue: number
    type: number
}





