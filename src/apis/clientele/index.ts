import httpRequest from '@/utils/httpRequest'
import type { QueryClient, ServiceCategoryType, ProductListType } from "./type"
import type { ClientFormType } from "@/stores/types/type"

enum API {
  QUERYCLIENTLIST_URL = '/healthRecords/pad/queryHealthRecords',
  QuerySERVICECATEGORY_URL = '/serviceClassification/serviceClassificationPaginQuery',
  QueryPRODUCTLIST_URL = '/serviceClassification/classificationProductQuery',
  NEWRECORD_URL = '/healthRecords/pad/addHealthRecords',
  EDITRECORD_URL = '/healthRecords/pad/editHealthRecords',//编辑档案
  GETRADARINFO_URL = '/healthRecords/getHealthRecordsDetailByArchivesNo',//获取档案详情
  GETRADAR_URL = '/radarChart/getRadarChartByArchivesNo', //获取雷达地图
  ADDTICKETSBOOK_URL = '/ticketsBooking/addTicketsBook',//新增预约工单
  CUSTOMERSNUMCOUNT_URL = '/healthRecords/pad/CustomersNumCount',//pad查询客户数量
  PAGINQUERYCOMBINE_URL = '/serviceClassification/paginQueryCombine'//pad查询分类及分类下产品列表
}

export const QueryClientList = (values?: QueryClient) => httpRequest.post<any>(API.QUERYCLIENTLIST_URL, values)
export const QueryServiceCategory = (values?: ServiceCategoryType) => httpRequest.post<any>(API.QuerySERVICECATEGORY_URL, values)
export const QueryProductList = (values?: ProductListType) => httpRequest.post<any>(API.QueryPRODUCTLIST_URL, values)
export const NewRecord = (values: ClientFormType) => httpRequest.post<any>(API.NEWRECORD_URL, values)
export const EditRecord = (values: ClientFormType) => httpRequest.post<any>(API.EDITRECORD_URL, values)
export const GetRadarInfo = (values: any) => httpRequest.post<any>(API.GETRADARINFO_URL, values)
export const GetRadar = (values: any) => httpRequest.post<any>(API.GETRADAR_URL, values)
export const addTicketsBOOK = (values: any) => httpRequest.post<any>(API.ADDTICKETSBOOK_URL, values)
export const CustomersNumCount = (values: any) => httpRequest.post<any>(API.CUSTOMERSNUMCOUNT_URL, values)
export const getPaginQueryCombine = (values: any) => httpRequest.post<any>(API.PAGINQUERYCOMBINE_URL, values)
// currentCustomersNum	当前客户数





