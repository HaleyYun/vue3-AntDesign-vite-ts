import httpRequest from '@/utils/httpRequest'
import type { resData,archivesData } from "./type"

enum API {
    QUERYDICTIONARIES_URL = '/dict/data/type',
    ARCHIVES_URL = '/healthRecords/checkArchivesOwnerByPhone',
    GET_CODE_URL = '/healthRecords/archivesAuthorizeVerificationCode',
    VERIFY_CODE_URL = '/smsSendCode/archivesAuthorizeSendCode',
}
export const QueryDictionaries = (values: any) => httpRequest.get<any, resData>(API.QUERYDICTIONARIES_URL, { params: values }) 

// 校验手机号有无档案
export const archives = (params: any) => httpRequest.get<any, archivesData>(API.ARCHIVES_URL, { params: params }) 

// 获取验证码
export const getCode = (data: any) => httpRequest.post<any, archivesData>(API.GET_CODE_URL, data) 

// 验证验证码
export const verifyCode = (params: any) => httpRequest.get<any, archivesData>(API.VERIFY_CODE_URL, { params: params }) 