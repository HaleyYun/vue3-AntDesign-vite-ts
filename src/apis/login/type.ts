export interface loginFormData {
    username: string
    password: string
    appVersion: number
    deviceId: string
    manufacturer: string
    model: string
    osVersion: string
    resolutionX: number
    resolutionY: number
    memoryPassword: boolean
}
export interface loginState {
    isRead: boolean;
    visible: boolean;
}
//接口返回数据类型

export interface userInfoReponseData {
    appLogo: string
    token: string
}


export interface ResponseData {
    code: number
    msg: string
    data: userInfoReponseData | any
}

export interface loginOutData {
    token: string
}