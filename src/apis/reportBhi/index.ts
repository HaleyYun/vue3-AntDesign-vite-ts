import httpRequest from '@/utils/httpRequest'
import  {resultResponseData,tabelData} from "./type"



enum API {
  RESULT_URL = '/comprehensiveReport/getReportByArchivesNo',
  TABEL_URL = '/estimateOrder/findEstimateOrderByProdCode'
}



export const getReport= (value:{archivesNo:string,checked:boolean}) => httpRequest.post<any,resultResponseData>(API.RESULT_URL,value)
export const getTabe= (value:{
  archivesNo: string,
  pageNum: number,
  pageSize: number,
  // prodCode: string
}) => httpRequest.post<any|tabelData>(API.TABEL_URL,value)