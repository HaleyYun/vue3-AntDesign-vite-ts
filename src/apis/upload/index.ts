import uploadRequest from '@/utils/uploadRequest'
import  {uploadData} from "./type"


//文件上传
enum API {
  UPLOADDATA_URL = '/common/uploadForDate',
}

export const upload = (value:any) => uploadRequest.post<any,uploadData>(API.UPLOADDATA_URL,value)



