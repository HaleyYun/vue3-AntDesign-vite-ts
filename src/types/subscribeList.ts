export interface pareState {
    id: number
    project_code: string
}
export interface DataItem {
    key: string
    name: string
    screen: string
    date: string
    time: string
    tel: string
    status: string
}

export interface headerTh {
    title: string
    dataIndex: string
    key: string
}

export interface listData {
    age: number
    education: string
    startTime: string
    endTime: string
    project: string
    reservationOrder: number
    sex: number
    state: number
    username: string
}
export interface tasksType {
    tasks: listData[]
}
export interface subscribeListResponseData {
    code: number
    message: string
    data: tasksType
}

export interface addScreeningOrderData {
    ticketsBookingCode:string,
    clientName:string, 
    checkName:string,
    bookingTime:string ,
    status:number,
    phone:string
}

export interface uploadAssessVideoData {
    assessOrderNum:string
    ossKey:number
    videoUrl:string
}