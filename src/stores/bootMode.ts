import { defineStore } from 'pinia'
// import { faceCorrectType} from '@/types/bootModetype';
import { getSourceMaterial } from "@/apis/getSourceMaterial";
import { ref } from 'vue';

export const useModeStateStore = defineStore('bootMode', ()=>{
    const faceCorrect=ref<any>()// 三个模式 1.自由观看范式   2.凝视范式 and  矫正帧页  3.注意切换范式
    const freeParadigm=ref<any>()
    const gazeParadigm=ref<any>()
    const attentionParadigm=ref<any>()

    const nextStepVoice =ref<string>() //下一步语音
    const scheduleVoice =ref<string>() //任务进度语音
    const correctFrameVoice=ref<string>()//矫正帧语音

    const getBootModeData=async ()=>{
        let res:any=await getSourceMaterial({"channelCode":"sd012","projectCode":"yy012"})
        faceCorrect.value=res.data.faceCorrect
        freeParadigm.value=res.data.freeParadigm
        gazeParadigm.value=res.data.gazeParadigm
        attentionParadigm.value=res.data.attentionParadigm
        nextStepVoice.value=res.data.nextStepVoice.stepFiles[0].fileUrl
        scheduleVoice.value=res.data.scheduleVoice.stepFiles[0].fileUrl
        correctFrameVoice.value=res.data.correctFrameVoice.stepFiles[0].fileUrl
    }
    return {
        faceCorrect,
        freeParadigm,
        gazeParadigm,
        attentionParadigm,
        nextStepVoice,
        scheduleVoice,
        correctFrameVoice,
        getBootModeData
    }
},{
    persist:true, 
})