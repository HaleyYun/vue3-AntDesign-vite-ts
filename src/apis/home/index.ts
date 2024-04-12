import httpRequest from '@/utils/httpRequest'
import { homeListResponseData, rankInfoResponseData, achieveListResponseData, updateAchieveResponseData, EstimatesChartResponseData, AppVersionResponseData } from "./type"


//我的筛查
enum API {
  HOMELIST_URL = '/proHomePage/getMyEstimates',
  RANK_URL = '/proHomePage/getRank',//排名
  ACHIEVE_URL = '/proHomePage/getachieve',//我的成就
  UPDATEACHIEVE_URL = '/proHomePage/updateAchieve',//更新资质
  ESTIMATES_CHART_URL = '/proHomePage/getEstimatesChart',//七日筛查数量走势
  APP_VERSION_URL = '/version/getAppVersion',//七日筛查数量走势

  MESSAGE_LIST_API = '/estimateMoCA/getNoticeList', //通知中心列表
  CLEAR_ALL_API = '/estimateMoCA/clearNoticeList', //清除通知信息
}

export const getHomeList = (value: { pageNum: number, pageSize: number, queryDate: string } | any) => httpRequest.post<any, homeListResponseData>(API.HOMELIST_URL, value)

export const rankInfo = (value: {} | any) => httpRequest.post<any, rankInfoResponseData>(API.RANK_URL, value)

export const achieveList = (value: {} | any) => httpRequest.post<any, achieveListResponseData>(API.ACHIEVE_URL, value)

export const updateAchieve = (value: { aptitudeUrl: string } | any) => httpRequest.post<any, updateAchieveResponseData>(API.UPDATEACHIEVE_URL, value)

export const getEstimatesChart = (value: { queryDate: string } | any) => httpRequest.post<any, EstimatesChartResponseData>(API.ESTIMATES_CHART_URL, value)

export const getAppVersion = () => httpRequest.get<any, AppVersionResponseData>(API.APP_VERSION_URL)


export const getMessage = () => httpRequest.get<any, AppVersionResponseData>(API.MESSAGE_LIST_API)
export const clearMessage = () => httpRequest.get<any, AppVersionResponseData>(API.CLEAR_ALL_API)



