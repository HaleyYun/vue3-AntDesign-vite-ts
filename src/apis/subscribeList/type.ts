

export interface headerTh {
    title: string
    dataIndex: string
    key: string
    align?: string
}

// export interface listData {
//     age: number
//     education: string
//     startTime:string
//     endTime:string
//     project:string
//     reservationOrder:number
//     sex:number
//     state:number
//     username:string
// }
export interface product {

}
export interface listData {
    "ticketsBookingCode": string,
    "serviceProductId": number,
    "product": product,
    "servName": string,
    "prodDescribe": string,
    "clientId": string,
    "clientName": string,
    "clientResource": number,
    "phone": string,
    "institutionId": string,
    "institutionName": string,
    "institutionAddress": string,
    "institutionPhone": string,
    "bookingTime": string,
    "payWay": number,
    "money": number,
    "status": number,
    "studentId": number,
    "checkName": string,
    "checkType": string,
    "canUseCount": string,
    "createUser": string,
    "createTime": string,
    "updateUser": string,
    "updateTime": string,
    "remarke": string,
    "isDelete": number
}
export interface tasksType {
    data: listData[],
    pageNum: number,
    pageSize: number,
    total: number

}
export interface subscribeListResponseData {
    code: number
    message: string
    data: tasksType
}
export interface queryNumberResponseData {
    code: number
    message: string
    data: {
        notEndNumber: number
        waitStartNumber: number
    }
}
export interface querySubscribeListType {
    pageNum: number
    pageSize: number
    status: number
    queryString?: string
}