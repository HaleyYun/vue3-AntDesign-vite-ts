import httpRequest from '@/utils/httpRequest'
import type { ResponseUserData, ResponseUpdateData, ResponseEditPassword,ResponseData } from "./type"

enum API {
  USER_INFO_URL = '/employee/getEmployeeInfo',
  UPDATE_USER_URL = '/employee/updateEmployeeInfo',
  EDIT_PASSWORD = '/editPassword/editPassword',
  AGREEMENT_API = '/agreement/query'
}

export const personInfo = (value: {} | any) => httpRequest.post<any, ResponseUserData>(API.USER_INFO_URL, value)

export const updatePersonInfo = (value: { birthDate: string, name: string, phone: string, pictureUrl: string, sex: number } | any) => httpRequest.post<any, ResponseUpdateData>(API.UPDATE_USER_URL, value)

export const editPassword = (value: { oldPassword: string, firstNewPassword: string, secondNewPassword: string, }) => httpRequest.post<any, ResponseEditPassword>(API.EDIT_PASSWORD, value)

export const agreement = (params: {channelSource:number}) => httpRequest.get<any, ResponseData>(API.AGREEMENT_API, { params: params })