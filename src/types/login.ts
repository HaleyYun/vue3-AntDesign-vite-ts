export interface loginFormData {
    username: string
    password: string
}
export interface loginState {
    isRead: boolean;
    visible: boolean;
}
//接口返回数据类型

export interface userInfoReponseData {
    name: string
    photo: string
    token: string
}
export interface ResponseData {
    code: number
    message: string
    data: userInfoReponseData | any
}