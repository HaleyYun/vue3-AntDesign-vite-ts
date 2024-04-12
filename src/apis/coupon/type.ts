export interface couponHistoryResponse {

    code: number
    data: {
        data: couponHistoryResponseData[],
        pageIndex: number,
        pageSize: number,
        total: number
    },
    msg: string
}
export interface couponHistoryResponseData {
    actualPay: number,
    afterDiscountPrice: number,
    beginTime: string,
    couponCode: string,
    couponId: number,
    couponName: string,
    couponType: number,
    createTime: string,
    discount: string,
    endTime: string,
    id: number,
    price: number,
    productCode: string,
    productName: string,
    releaseAccount: string,
    serviceType: string,
    status: number,
    threshold: string,
    useAccount: string
}

export interface couponListResponse {

    code: number
    data: {
        data: couponListResponseData[],
        pageIndex: number,
        pageSize: number,
        total: number
    },
    msg: string

}
export interface couponListResponseData {
    afterDiscountPrice: string,
    beginTime: string,
    channelCode: string,
    channelName: string,
    channelProductRelationId: number,
    couponDescription: string,
    couponName: string,
    couponType: number,
    discount: string,
    endTime: string,
    id: number,
    offerContent: string,
    onceRelease: number,
    productCode: string,
    released: number,
    serviceType: number,
    status: number,
    stock: number,
    threshold: string,
    updateTime: string,
    updateUser: string,
    validDays: number
}

export interface setCouponResponse {
    code: number
    data: {}
    msg: string
}