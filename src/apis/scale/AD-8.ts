import httpRequest from '@/utils/httpRequest'
import { Ad8SubmitType, RestliData } from "./type"

enum API {
    AD_8_URL = '/estimateAd8/saveAd8Result',
}

export const submitRestli = (value: Ad8SubmitType) => httpRequest.post<any, RestliData>(API.AD_8_URL, value)