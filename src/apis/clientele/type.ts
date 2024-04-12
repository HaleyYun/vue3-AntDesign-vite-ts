export interface recordType {
    address:string,
    age: number,
    alternateContact: string,
    archivesNo: string,
    associatedChannelId: number,
    associatedOrganId: number,
    associatedOrganName: string,
    associatedUsers: string,
    associatedUsersSource: string,
    birthday: string,
    contactPhone: string,
    createTime: string,
    education: string,
    educationDesc: string,
    expertAnalysis: string,
    homeAddress: string,
    hospitalId: string,
    idNo: string,
    medicalInsuranceCard: string,
    name: string,
    neighborhoodCommittee: string,
    phone: string,
    proportion: number,
    relations: string,
    relationsDesc: string,
    riskType: string,
    score: number,
    sex: number,
    sexDesc: string,
    street: string,
    updateTime: string
}

export interface QueryClient {
    beginCreateDate?: string,
    endCreateDate?: string,
    pageNum?: number,
    pageSize?: number
}


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
}

export interface resData {
    code: number
    msg: string
    data?: QueryDictionariesType[]
}


// 查询服务分类
export interface ServiceCategoryType{
    channelType?: number,
    pageNum?: number,
    pageSize?: number,
}
// 查询分类下产品列表
export interface ProductListType{
    id?: number,//分类ID
    pageNum?: number,
    pageSize?: number,
}

// 新增预约工单
export interface addTicketsBOOKType{
    bookingTime: string
    clientId: string
    clientName: string
    phone: string
    servName: string
    serviceProductId: number
    studentId?: number
}






