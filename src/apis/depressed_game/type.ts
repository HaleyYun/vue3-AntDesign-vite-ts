//入参
export interface getTempletData {
    archiveNum: string
    serviceCode: string
    deviceNum: string
}

//返参
export interface ResponseData {
    code: number,
    msg: string,
    data: DataType
}




export interface DataType {
    template: listItemType[],
    files: string[]
}

export interface listItemType {
    id: number,
    pageName: string
    pageType: number,
    steps: stepsType[]
}

export interface stepsType {

    id: number
    stepName: string
    stepCode: string
    stepType: number
    elements: elementsType[]
    memoryImages?: memoryImagesType[]
    interferograms?: interferogramsType[]
    leftPx?: number
    rightPx?: number
    ypx?: number
    points?: pointsType[]
    eyeActions?: eyeActions[]
}
export interface elementsType {
    fileName: string
    type: string
    content: string
    waitTime?: string | null | number
    size?: number
    x?: number
    y?: number
}
export interface interferogramsType extends memoryImagesType { }
export interface pointsType {
    position: string
    x: number
    y: number
}


export interface eyeActions {
    center: {
        content: string
        size: number
        wait: number
        x: number
        y: number
    }
    pointAction: {
        brownPoint: {
            content: string
            pointSize: number
            position: string | null
            x: number
            y: number
        }
        redPoint: {
            content: string
            pointSize: number
            position: string | null
            x: number
            y: number
        }
        pointTime: string
    }
}
export interface memoryImagesType {
    label: string
    memoryImages: memoryImagesItemType[]
}

export interface memoryImagesItemType {
    fileName: string
    fileType: string
    content: string
    label: string
    imageSize: number
    select: number
}

export interface getEstimateNumData {
    archivesNo?: string
    customName?: string
    customPhone?: string
    deviceNum?: string
    estimateServeCode?: string
    estimateServeName?: string
    estimateServeType?: string
    orderNum?: string
    type?: number
}

export interface getEstimateNumDataResponseData {
    code: number,
    msg: string,
    data: string
}

export interface confirmTaskData {
    concentrate: string
    estimateNum: string
    situation: string
}

export interface confirmTaskDataResponseData {
    code: number,
    msg: string,
    data: {} | null | string
}

export interface getDictTypeData {
    dictType: string
}

export interface getDictTypeResponseData {
    code: number
    msg: string
    data: getDictTypeResponseDataContent[]
}

export interface getDictTypeResponseDataContent {
    createTime?: string
    createUser?: string
    dictLabel: string
    dictSort?: number
    dictType?: string
    dictValue: string
    enable?: number
    extraInfo?: string
    id: number
    isDefault?: string
    isDelete?: number
    remark?: string
    updateTime?: string
    updateUser?: string
}

export interface setEstimateData {
    endVideoTimeStamp: number
    estimateNum: string
    index: number
    questionText: string
    startVideoTimeStamp: number
    taskType: number
    type: number
    videoPath: string
    stepProcess: Object
    firstPhotoChangeTimes: number
    secondPhotoChangeTimes: number
    deviceNum: string
    failEstimateNum: string
}

export interface getUrlData {
    estimateNum: string
    index: Number
    taskType: number
    type: number
}