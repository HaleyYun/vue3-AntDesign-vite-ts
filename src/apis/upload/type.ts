
export interface uploadDataType{
    originalFilename: string,
    url:string
}
export interface uploadData{
    code: number
    msg: string
    data: uploadDataType
}