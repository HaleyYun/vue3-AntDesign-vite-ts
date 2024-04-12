import httpRequest from '@/utils/httpRequest'
import { GetQuestionListReq, GetQuestionListRes, AddQuestionResultReqItem, AddQuestionResultRes, ResponseData, getMocaApiData, GetAnswerDetails, GetAnswerDetailsRes } from "./type"

enum API {
    QUESTION_FIND = "/estimateScale/questionFind",
    ADD_QUESTION_RESULT = "/estimateScale/addQuestionResult",
    GET_MOCARESULT_API = "/estimateMoCA/saveScaleResult",
    GET_ANSWER_DETAILS = "/estimateScale/answerDetails",
    GET_ITEM_ANSWER_DETAILS = "/estimateScale/serverCodeAndIndexByQuestion",
    SET_SUBMIT_SCALE = "/reportWhole/saveScaleQuestionTime",
    CFT_MINOUT_API = "/estimateMoCA/renegingScale"
}

export const saveScaleResult = (data: getMocaApiData) => httpRequest.post<any, ResponseData>(API.GET_MOCARESULT_API, data)

export const getQuestionList = (data: GetQuestionListReq) => httpRequest.post<any, GetQuestionListRes>(API.QUESTION_FIND, data)

export const addQuestionResult = (data: AddQuestionResultReqItem[]) => httpRequest.post<any, AddQuestionResultRes>(API.ADD_QUESTION_RESULT, data)

export const getAnswerDetails = (data: GetAnswerDetails) => httpRequest.post<any, GetAnswerDetailsRes>(API.GET_ANSWER_DETAILS, data)

export const getItemAnswerDetails = (data: { estimateNum: string, questionIndex: number }) => httpRequest.post<any, GetQuestionListRes>(API.GET_ITEM_ANSWER_DETAILS, data)

export const setScale = (data: { estimateNum: string, questionTime: number }) => httpRequest.post<any, ResponseData>(API.SET_SUBMIT_SCALE, data)

export const renegingScale = (data: { estimateNum: string, estimateServerCode: string,questionIndex:number,archivesNo:string,timeCount:number }) => httpRequest.post<any, ResponseData>(API.CFT_MINOUT_API, data)
