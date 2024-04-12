import httpRequest from '@/utils/httpRequest'
import type {ReportType} from "./type"

enum API {
  QUERYRECORDLIST_URL= '/estimateOrder/getLitePage',
  ASSESSMENTREPORT_URL='/report/getReport',
}
export const QueryRecordList=(values?:any) => httpRequest.post<any>(API.QUERYRECORDLIST_URL,values) 
export const QueryAssessmentReport=(values?:ReportType) => httpRequest.post<any>(API.ASSESSMENTREPORT_URL,values) 