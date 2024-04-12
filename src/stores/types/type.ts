import type { RouteRecordRaw } from 'vue-router'
//定义小仓库数据state类型
export interface UserState {
    token: string | null
    menuRoutes: RouteRecordRaw[]
    username: string
    avatar: string
    buttons: string[]
}
export interface ExerciseType {
    archivesNo?: string
    duration?: number
    durationUnit?: string
    id?: number
    motionFrequency?: number
    sportsEvents?: string
    sportsEventsDesc?:string
}
export interface recordsDetailRequest {
    arthritis?: string
    bloodPressureSituation?: string
    bloodSugar?: string
    carryApoe?: string
    cerebrovascularDisease?: string
    depressiveState?: string
    diabetes?: string
    diastolicPressure?: number
    gastrointestinalDisease?: string,
    heartDisease?: string
    diet1?: string
    diet2?: string
    diet3?: string
    drinking?: string
    smoking?: string
    height?: number
    lipidStatus?: string
    littleExercise?: string
    memory?: string
    osteoporosis?: string
    respiratoryDiseases?: string
    sleepDisorders?: string
    spondylopathy?: string
    systolicPressure?: number
    totalCholesterol?: number
    tumorDiseases?: string
    weeklyExerciseFrequency?: number
    weight?: number
}

export interface recordsBaseRequest {
    archivesNo?:string
    birthday: any,
    education: string,
    name: string,
    phone: string,
    // relations: string,
    sex: number,
}
export interface healthRecordsBase {
    address: string
    age: number,
    alternateContact: string
    archivesNo: string
    associatedChannelId: number,
    associatedOrganId: number,
    associatedOrganName: string
    associatedUsers: string
    associatedUsersSource: string
    birthday: string
    contactPhone: string
    createTime: string
    education: string
    educationDesc: string
    expertAnalysis: string
    homeAddress: string
    hospitalId: string
    idNo: string
    medicalInsuranceCard: string
    name: string
    neighborhoodCommittee: string
    phone: string
    proportion: number,
    relations: string
    relationsDesc: string
    riskType: string
    score: number,
    sex: number,
    sexDesc: string
    street: string
    updateTime: string
}
export interface healthRecordsDetail {
    arthritis: string
    bloodPressureSituation: string
    bloodSugar: string
    carryApoe: string
    cerebrovascularDisease: string
    depressiveState: string
    diabetes: string
    diastolicPressure: number
    diet1: string
    diet2: string
    diet3: string
    drinking: string
    gastrointestinalDisease: string
    heartDisease: string
    height: number,
    id: number,
    lipidStatus: string
    littleExercise: string
    memory: string
    osteoporosis: string
    respiratoryDiseases: string
    sleepDisorders: string
    smoking: string
    spondylopathy: string
    systolicPressure: number
    totalCholesterol: number
    tumorDiseases: string
    weeklyExerciseFrequency: number
    weight: number
}
export interface ClientFormType {
    capabilityList?: string[],
    familyHistoryList?: string[],
    prevalenceList?: string[],
    recordsBaseRequest?: recordsBaseRequest,
    healthRecordsDetail?: healthRecordsDetail,
    recordsDetailRequest?: recordsDetailRequest,
    sportsHobbiesList?: ExerciseType[],
}
// 档案详情
export interface RecordInfoType {
    capabilityDescList?: string[]
    capabilityList?: string[]
    familyHistoryDescList?: string[]
    familyHistoryList?: string[]
    healthRecordsBase?: healthRecordsBase
    healthRecordsDetail?: healthRecordsDetail
    prevalenceDescList?: string[]
    prevalenceList?: string[]
    sportsHobbiesList?:ExerciseType[]
}