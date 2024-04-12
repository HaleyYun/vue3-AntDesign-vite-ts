import httpRequest from '@/utils/httpRequest'
import type { resData } from "./type"

enum API {
    GET_ESTIMATE_RESULT_URL = '/report/getReport',
}

export const getEstimateResult = (data: { estimateNum: string }) => httpRequest.post<{ estimateNum: string }, resData>(API.GET_ESTIMATE_RESULT_URL, data) 