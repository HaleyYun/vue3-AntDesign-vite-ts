import httpRequest from '@/utils/httpRequest'
import type { getTempletData, ResponseData, getEstimateNumData, getEstimateNumDataResponseData, confirmTaskDataResponseData, confirmTaskData, getDictTypeData, getDictTypeResponseData, setEstimateData, getUrlData, setCorrectData } from "./type"

enum API {
  GET_TEMPLET_URL = '/estimate/getTemplet',
  GET_ESTIMATA_NUM_URL = '/estimate/getEstimateNum',
  GET_CONFIRM_TASK_URL = '/estimate/confirmTask',
  GET_DICT_URL = '/dict/data/type',
  SET_ESTIMATE_URL = '/estimate/getVideoInfoForAlgorithm',
  GET_VIDEO_URL = '/estimate/uploadVideoUrl',
}

export const getTempletAPI = (data: getTempletData) => httpRequest.post<any, ResponseData>(API.GET_TEMPLET_URL, data)

export const getEstimateNum = (data: getEstimateNumData) => httpRequest.post<any, getEstimateNumDataResponseData>(API.GET_ESTIMATA_NUM_URL, data)

export const confirmTask = (data: confirmTaskData) => httpRequest.post<any, confirmTaskDataResponseData>(API.GET_CONFIRM_TASK_URL, data)

export const getDictType = (params: getDictTypeData) => httpRequest.get<any, getDictTypeResponseData>(API.GET_DICT_URL, { params: params })

export const setEstimate = (data: setEstimateData) => httpRequest.post<any, confirmTaskDataResponseData>(API.SET_ESTIMATE_URL, data)
export const setCorrect = (data: setCorrectData) => httpRequest.post<any, confirmTaskDataResponseData>(API.SET_ESTIMATE_URL, data)

export const getUrl = (data: getUrlData) => httpRequest.post<any, confirmTaskDataResponseData>(API.GET_VIDEO_URL, data)
