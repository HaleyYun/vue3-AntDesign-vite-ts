export interface stepFiles {
    fileUrl: string;
    fileType: number;
    fileDesc: string;
}

export interface faceCorrect {
    textDesc: string | null;
    stepFiles: stepFiles[];
}

export interface freeParadigm {
    taskGuide: faceCorrect[];
    taskMaterials: faceCorrect[];
}

export interface gazeParadigm {
    taskGuide: faceCorrect[];
}

export interface getSourceMaterialResponseData {
    freeParadigm: freeParadigm;
    gazeParadigm: freeParadigm;
    attentionParadigm: freeParadigm;
    nextStepVoice: faceCorrect;
    scheduleVoice: faceCorrect;
    correctFrameVoice: faceCorrect;
}

export interface dataParams{
    stepKey:string
    ossKeys:string[]
}

export interface getaddAssessOrderType{
    assessOrderNum:string
    dataParams:dataParams[]
}

export interface subscribeListResponseData{
    code: number
    message: string
    data: getaddAssessOrderType
}
export interface RetuenData{
    code: number
    message: string
    data: any
}




