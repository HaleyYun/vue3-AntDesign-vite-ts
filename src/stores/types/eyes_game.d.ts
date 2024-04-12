import { memoryImagesItemType } from '../../apis/eyes_game/type'
export { listItemType, elementsType, memoryImagesType, memoryImagesItemType, eyeActions } from '../../apis/eyes_game/type'

export interface setAttrType {
    eyeProcedureList: listItemType[]
    eyeProcedureActive: number
    estimateNum: string
    modelType: string
}

export interface memoryImagesItemTypeETD extends memoryImagesItemType {
    x?: number | string
    y?: number | string
    imageTime?: string
}