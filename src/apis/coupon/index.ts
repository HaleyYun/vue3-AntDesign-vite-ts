import httpRequest from '@/utils/httpRequest'
import { couponHistoryResponse, couponListResponse, setCouponResponse } from "./type"

enum API {
    GET_COUPON_HISTORY = '/couponApp/couponReleasePage',
    GET_COUPON_LIST = '/couponApp/couponPage',
    SET_COUPON_APPLY = '/couponApp/couponApply',
}

export const getCouponHistoryAPI = (data: { pageNum: number, pageSize: number, phone: string }) => httpRequest.post<any, couponHistoryResponse>(API.GET_COUPON_HISTORY, data)
export const getCouponListAPI = (data: { pageNum: number, pageSize: number }) => httpRequest.post<any, couponListResponse>(API.GET_COUPON_LIST, data)
export const setCouponApplyAPI = (data: { couponId: number | null, phone: string }) => httpRequest.post<any, setCouponResponse>(API.SET_COUPON_APPLY, data)
