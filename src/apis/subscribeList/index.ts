import httpRequest from '@/utils/httpRequest'
import { subscribeListResponseData, querySubscribeListType, queryNumberResponseData } from "./type"



enum API {
  SUBSCRIBELIST_URL = '/ticketsBooking/pageQueryPro',
  UPDATET_URL = '/ticketsBooking/updateEvaluator',
  QUERY_NUMBER_URL = '/ticketsBooking/queryNumber',
}


export const getSubscribeList = (value: querySubscribeListType) => httpRequest.post<any, subscribeListResponseData>(API.SUBSCRIBELIST_URL, value)
export const update = (value: { ticketsCode: string }) => httpRequest.post<any, subscribeListResponseData>(API.UPDATET_URL, value)
export const queryNumber = () => httpRequest.get<any, queryNumberResponseData>(API.QUERY_NUMBER_URL)