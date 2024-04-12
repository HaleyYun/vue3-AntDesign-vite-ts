import httpRequest from '@/utils/httpRequest'
import { PageQueryRes, PageQueryReq, EquityExchangeReq, EquityExchangeRes, PadUpdateTicketsEquityReq, QueryLogsByCodeTypeReq, QueryByCodeRes, QueryLogsByCodeTypeRes } from "./type"

enum API {
    PAGE_QUERY_URL = '/ticketsEquity/pageQuery',
    EQUITY_CHANGE_URL = '/ticketsEquity/equityExchange',
    UPDETD_EQUITY_URL = '/ticketsEquity/padUpdateTicketsEquity',
    QUERY_CODE_URL = '/ticketsEquity/queryByCode',
    QUERY_LOGS_CODE_URL = '/ticketsBooking/queryLogsByCodeType',
}
export const pageQuery = (data: PageQueryReq) => httpRequest.post<any, PageQueryRes>(API.PAGE_QUERY_URL, data)
export const equityExchange = (data: EquityExchangeReq) => httpRequest.post<any, EquityExchangeRes>(API.EQUITY_CHANGE_URL, data)
export const padUpdateTicketsEquity = (data: PadUpdateTicketsEquityReq) => httpRequest.post<any, EquityExchangeRes>(API.UPDETD_EQUITY_URL, data)
export const queryByCode = (params: { code: string }) => httpRequest.get<any, QueryByCodeRes>(API.QUERY_CODE_URL, { params: params })
export const queryLogsByCodeType = (data: QueryLogsByCodeTypeReq) => httpRequest.post<any, QueryLogsByCodeTypeRes>(API.QUERY_LOGS_CODE_URL, data)
