import httpRequest from '@/utils/httpRequest'
import type {loginFormData,ResponseData} from "./type"

enum API {
  LOGIN_URL = '/pad/login',
  LOGIN_OUT_URL = '/pad/padLogout',
  MENU_URL ='/disposition/findProDisposition'
}

export const loginAPI = (values:loginFormData) => httpRequest.post<any,ResponseData>(API.LOGIN_URL,values)

export const loginOut = () => httpRequest.get<any,ResponseData>(API.LOGIN_OUT_URL)
  
export const menuApi = () => httpRequest.get<any,ResponseData>(API.MENU_URL)