import { defineStore } from 'pinia'
import { reactive, toRefs, computed } from 'vue';
import { setAttrType, listItemType } from './types/eyes_game'

export const useEyesGameStore = defineStore('eyesGame', () => {
    const setAttr: setAttrType = reactive({
        eyeProcedureList: [],
        eyeProcedureActive: 0,
        estimateNum: "",
        modelType: ""
    })

    const currentProcedure = computed((): listItemType => {
        return setAttr.eyeProcedureList[setAttr.eyeProcedureActive]
    })

    return {
        ...toRefs(setAttr),
        currentProcedure
    }

}, {
    persist: true,
})