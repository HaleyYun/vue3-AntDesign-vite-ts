import httpRequest from '@/utils/httpRequest'
import type { getTempletData, ResponseData,setEstimateData,confirmTaskDataResponseData,getEstimateNumData,getEstimateNumDataResponseData} from "./type"

enum API {
  GET_TEMPLET_URL = '/estimate/getTemplet',
  SET_ESTIMATE_URL = '/estimate/getVideoInfoForAlgorithm',
  GET_ESTIMATA_NUM_URL = '/estimate/getEstimateNum',
}

export const getDepressedAPI = (data: getTempletData) => httpRequest.post<any, ResponseData>(API.GET_TEMPLET_URL, data)
export const depressedVideoUrl = (data: setEstimateData) => httpRequest.post<any, confirmTaskDataResponseData>(API.SET_ESTIMATE_URL, data)
export const getEstimateNumApi = (data: getEstimateNumData) => httpRequest.post<any, getEstimateNumDataResponseData>(API.GET_ESTIMATA_NUM_URL, data)

