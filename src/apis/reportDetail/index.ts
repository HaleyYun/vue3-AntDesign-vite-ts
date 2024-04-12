import httpRequest from '@/utils/httpRequest'
import  {resultResponseData,videoResponseData} from "./type"



enum API {
  RESULT_URL = '/report/getEestimateResult',
  VIDEO_URL = '/report/getEstimateVideo',
}

export const getResult= (value:{estimateNum:string,type:number}|any) => httpRequest.post<any,resultResponseData>(API.RESULT_URL,value)

export const getVideo= (value:{estimateNum:string,taskType:number,type:number}|any) => httpRequest.post<any,videoResponseData>(API.VIDEO_URL,value)