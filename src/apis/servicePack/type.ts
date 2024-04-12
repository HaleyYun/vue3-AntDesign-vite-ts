export interface resultResponseData {
    code: number,
    data: resultType,
    msg: string
}

export interface resultType {
    checkService: checkServiceData[]
    info: infoData
    product: productData
    checkOver: number
    progress: string
    haveEyeCheck: boolean
    ticketsStatus: number

}
export interface checkServiceData {
    checkService: string
    checkServiceName: string
    pic: string
    isCheck: number  //0未筛查1已筛查
    status: number
    startTmie:number
    endTmie:number
}
export interface infoData {
    age: number
    bookTime: string
    labels: [],
    name: string
    sex: number
}

export interface productData {
    mainPic: string
    prodName: string
    prodDescribe: string
    servName: string
    equityName: string
}