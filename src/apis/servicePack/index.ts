import httpRequest from '@/utils/httpRequest'
import { resultResponseData } from "./type"

enum API {
  RESULT_URL = '/ticketsBooking/padTicketsDetail'
}

export const getResultDetail = (value: { ticketCode: string, isView?: number | string }) => httpRequest.post<any, resultResponseData>(API.RESULT_URL, value)
