import httpRequest from '@/utils/httpRequest'
import type {getDictTypeData,getDictTypeResponseData,getsedResultData,ResponseData,getEstimateNumData,getEstimateNumDataResponseData,getMocaApiData,getInfoApiData,infoResponseData } from "./type"

enum API {
  GET_TEMPLET_URL = '/estimateScale/questionFind',
  SEND_RESULT_URL = '/estimateScale/addQuestionResult',
  GET_ESTIMATA_NUM_URL = '/estimate/getEstimateNum',
  GET_MOCARESULT_API= '/estimateMoCA/saveMoCAResult',
  GET_INFO_API= '/estimateScale/upQuestionInfo',

  
}

export const getQuestionFind = (params: getDictTypeData) => httpRequest.get<any, getDictTypeResponseData>(API.GET_TEMPLET_URL, { params: params })
export const sedResultAPI = (data: getsedResultData) => httpRequest.post<any, ResponseData>(API.SEND_RESULT_URL, data)
export const getEstimateNumApi = (data: getEstimateNumData) => httpRequest.post<any, getEstimateNumDataResponseData>(API.GET_ESTIMATA_NUM_URL, data)
export const getMocaApi = (data: getMocaApiData) => httpRequest.post<any, ResponseData>(API.GET_MOCARESULT_API, data)

export const getInfoApi = (data: getInfoApiData) => httpRequest.post<any, infoResponseData>(API.GET_INFO_API, data)