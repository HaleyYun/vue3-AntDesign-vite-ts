import httpRequest from '@/utils/httpRequest'
import  {getSourceMaterialResponseData,subscribeListResponseData,RetuenData} from "./type"
import {addScreeningOrderData,uploadAssessVideoData} from "@/types/subscribeList"

// 枚举
enum API {
    SOURCEMATERIAL_URL = '/depressed/getSourceMaterial',
    ADDASSESSORDER_URL = "/depressed/addAssessOrder",
    UPLOADASSESSVIDEOURL_URL = "/depressed/uploadAssessVideoUrl",
    GETASSESSRESULT_URL="/depressed/getAssessResult",
    ACCOMPLISHASSESS_URL="/depressed/getAssessResult",//获取评估完成结果接口
    EVALUATIONRESULT_URL="/evaluationResult",//评估结果推送接口
}

export const getSourceMaterial = (value:{channelCode:string,projectCode:string}|any) => httpRequest.post<any,getSourceMaterialResponseData>(API.SOURCEMATERIAL_URL,value)
export const getaddAssessOrder = (value:addScreeningOrderData|any) => httpRequest.post<any,subscribeListResponseData>(API.ADDASSESSORDER_URL,value)
export const uploadVideoUrl = (value:uploadAssessVideoData|any) => httpRequest.post<any,RetuenData>(API.UPLOADASSESSVIDEOURL_URL,value)
export const getAssessResult = (value:uploadAssessVideoData|any) => httpRequest.post<any,RetuenData>(API.UPLOADASSESSVIDEOURL_URL,value)
export const AccomplishAssess=(value:any) => httpRequest.post<any,RetuenData>(API.ACCOMPLISHASSESS_URL,value)
export const EvaluationResult = (value:any) => httpRequest.post<any,RetuenData>(API.EVALUATIONRESULT_URL,value)