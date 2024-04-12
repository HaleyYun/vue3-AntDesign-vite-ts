import httpRequest from '@/utils/httpRequest'
import { evalListResponseData, searrchlistType, GetBHIPageReq, GetBHIPageRes, whetherType, setCodeType, getCodeType, verifyCodeType, GetGroupListReq, GetEstimatePageRes } from "./type"



enum API {
  // EVAL_LIST_URL = '/estimateOrder/getLitePage',
  EVAL_LIST_URL = '/estimateOrder/findEstimatePage',
  WHETHER_URL = '/comprehensiveReport/pad/permissionVerification',
  GET_CODE_URL = '/comprehensiveReport/pad/sendReportVerificationCode',
  VERIFY_CODE_URL = '/comprehensiveReport/pad/reportVerificationCode',
  CODE_URL = '/estimateOrder/findDepressedEstimatesPage',
  BHI_LIST_URL = '/customerOrder/customerWithBHIPage',
  BHI_ESTIMATE_COUNT_URL = '/customerOrder/customerWithBHIPageCountAndEstimateCount',
  GET_GROUP_LIST_URL = '/estimateOrder/findEstimateOrderGroupByOrderNum',
  GET_ESTIMATE_LIST_URL = '/estimateOrder/findEstimatesList',
  GET_ESTIMATE_CODE_URL = '/smsSendCode/estimateReportCode',
  SET_ESTIMATE_CODE_URL = '/estimateOrder/giveEstimateOrderRight',
  GET_BHI_CODE_URL = '/smsSendCode/bhiEstimateListCode',
  SET_BHI_CODE_URL = '/customerOrder/verificationBhiEstimateListCode',
}
// 评估记录列表
export const getEvalList = (value?: searrchlistType) => httpRequest.post<any, evalListResponseData>(API.EVAL_LIST_URL, value)

//  BHI列表
export const getBHIPage = (value?: GetBHIPageReq) => httpRequest.post<any, GetBHIPageRes>(API.BHI_LIST_URL, value)

// 查看是否允许查看报告
export const whether = (value?: whetherType) => httpRequest.post<any, evalListResponseData>(API.WHETHER_URL, value)

// 发送短信验证码
export const getCode = (params?: getCodeType) => httpRequest.get<any, evalListResponseData>(API.GET_CODE_URL, { params: params })

export const getEstimateCode = (data?: getCodeType) => httpRequest.post<any, evalListResponseData>(API.GET_ESTIMATE_CODE_URL, data)

export const setEstimateCode = (data?: setCodeType) => httpRequest.post<any, evalListResponseData>(API.SET_ESTIMATE_CODE_URL, data)

export const getBHICode = (params?: getCodeType) => httpRequest.get<any, evalListResponseData>(API.GET_BHI_CODE_URL, {params: params})

export const setBHICode = (data?: setCodeType) => httpRequest.post<any, evalListResponseData>(API.SET_BHI_CODE_URL, data)

// 查看是否允许查看报告
export const verifyCode = (value?: verifyCodeType) => httpRequest.post<any, evalListResponseData>(API.VERIFY_CODE_URL, value)

// 查看抑郁
export const findDepressedEstimatesPag = (value?: searrchlistType) => httpRequest.post<any, evalListResponseData>(API.CODE_URL, value)

// BHI列表及评估列表数量
export const getBHIEstimateCount = () => httpRequest.get<any, evalListResponseData>(API.BHI_ESTIMATE_COUNT_URL)

// 评估列表查询单个档案编号的评估信息
export const getGroupList = (value?: GetGroupListReq) => httpRequest.post<any, evalListResponseData>(API.GET_GROUP_LIST_URL, value)

// 评估记录-报告列表
export const getEstimateList = (value?: GetBHIPageReq) => httpRequest.post<any, GetEstimatePageRes>(API.GET_ESTIMATE_LIST_URL, value)



