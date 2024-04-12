export interface ServiceType {
    id: number
    servTypeName: string
    servTypeOrder: number
    servTypeStatus: number
}
export interface productType {
    id: number,
    prodCode: string,
    servId: number,
    servName: string,
    checkType: string,
    checkName: string,
    prodName: string,
    prodDescribe: string,
    realPrice: number,
    prodPrice: number,
    prodStock: number,
    showSold: number,
    prodSold: number,
    prodStatus: number,
    remark: string,
    isDelete: number,
    mainPic: string,
    detailPic: string,
    playPicList: string
}
export interface bloodPressurStateType{
    bloodPressureSituation?:string
    systolicPressure?:number
    diastolicPressure?:number
}
export interface BloodFaStateType{
    lipidStatus:string
    totalCholesterol:number
}
export interface CardiovascularType{
    heartDisease?:string
    cerebrovascularDisease?:string
}
export interface PerceiveStatusType{
    memory?:string
    depressiveState?:string
}
export interface geneStateType{
    diabetes?: string
    carryApoe?: string
}