export interface PageQueryReq {
    activeCode?: string
    blurName?: string
    clientId?: string
    clientName?: string
    createTime?: string
    equityId?: number
    pageNum?: number
    pageSize?: number
    phone?: string
    status?: number | string
    ticketsEquityCode?: string
    updateTime?: string
}
export interface PageQueryRes {
    code: number
    data: {
        data: PageQueryResData[],
        pageIndex: number
        pageSize: number
        total: number
    },
    msg: string
}

export interface PageQueryResData {
    activeCode: string
    age: number
    archivesNo: string
    begnTime: string
    checkName: string
    checkService: string
    checkedCount: number
    clientName: string
    createUser: string
    describe: string
    endTime: string
    equityId: number
    equityName: string
    equityNameApplet: string
    mainPic: string
    phone: string
    price: number
    productId: string
    serviceTimes: string
    sex: number
    source: string
    status: number
    sumCheckCount: number
    isUpperLimit: number
    checkInterval: number
    ticketsEquityCode: string
    type: number
    updateTime: string
    updateUser: string
    useTime: string
}

export interface EquityExchangeReq {
    activeCode: string
    archivesNo?: string
    clientName?: string
    phone?: string
    status?: number
}

export interface EquityExchangeRes {
    code: number
    data: {}
    msg: string
}

export interface QueryByCodeRes {
    code: number
    data: {
        ticketsEquityCode: string
        activeCode: string
        equityId: number
        equityName: string
        equityNameApplet: string
        archivesNo: string
        clientName: string
        phone: string
        status: number
        begnTime: string
        endTime: string
        price: number
        productId: string
        describe: string
        sumCheckCount: number
        checkedCount: number
        checkService: string
        useTime: null,
        mainPic: string
        type: number
        age: number
        sex: number
        serviceTimes: string
        source: string
        updateTime: string
        updateUser: string
        createUser: string
        checkName: string
    }
    msg: string
}

export interface PadUpdateTicketsEquityReq {
    activeCode: string
    archivesNo: string
    name: string
    phone: string
}

export interface QueryLogsByCodeTypeReq {
    pageNum: number
    pageSize: number
    ticketCode: string
    ticketsTypeId: number
}

export interface QueryLogsByCodeTypeRes {
    code: number
    data: {
        data: QueryLogsByCodeTypeResData[]
        pageIndex: number
        pageSize: number
        total: number
    },
    msg: string
}

export interface QueryLogsByCodeTypeResData {
    content: string
    createTime: string
    createUser: string
    id: number
    isDelete: number
    remark: string
    ticketsCode: string
    ticketsTypeId: number
    ticketsTypeName: string
    updateTime: string
    updateUser: string
}
