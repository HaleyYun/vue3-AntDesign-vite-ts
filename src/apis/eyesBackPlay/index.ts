import httpRequest from '@/utils/httpRequest'
enum API {
    GET_VIDEO_URL = '/estimateVideo/drawEstimateVideo',
}

type DateType = {
    estimateNum: string
    index: number
    taskType: number
    type: number
}

export const getDrawEstimateVideo = (data: DateType) => httpRequest.post<any, any>(API.GET_VIDEO_URL, data)
