
export interface personInfoType {
    "empCode": string,
    "name": string,
    "sex": number,
    "phone": string,
    "birthDate": string,
    "pictureUrl": string,
    "channelCode": string,
    "permissions": number
}


export interface ResponseUserData {
    code: number
    msg: string
    data: personInfoType
}

export interface ResponseUpdateData {
    code: number
    msg: string
    data: null
}
export interface ResponseEditPassword {
    code: number
    msg: string
    data: {
        updateSuccess: boolean
        failMessage: string
    }
}

export interface ResponseData {
    code: number
    msg: string
    data: listData[]
}


export interface listData {
    agreementName: string,
    serviceAgreement: string
}