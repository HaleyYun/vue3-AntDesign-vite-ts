
export interface QueryDictionariesType {
    createTime: string,
    createUser: string,
    dictLabel: string,
    dictSort: number,
    dictType: string,
    dictValue: string,
    enable: number,
    extraInfo: string,
    id: number,
    isDefault: string,
    isDelete: number,
    remark: string,
    updateTime: string,
    updateUser: string,
    duration?: number 
    motionFrequency?: number
}

export interface resData {
    code: number
    msg: string
    data: QueryDictionariesType[]
}
export interface archivesData {
    code: number
    msg: string
    data: any
}






