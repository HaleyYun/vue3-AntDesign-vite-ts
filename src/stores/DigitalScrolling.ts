import { defineStore } from 'pinia'
import { faceCorrectType} from '@/types/bootModetype';
// import { getSourceMaterial } from "@/apis/getSourceMaterial";
import { ref } from 'vue';

export const useModeStateStore = defineStore('bootMode', ()=>{
    const faceCorrect=ref<faceCorrectType>()// 状态
   
    return {
        faceCorrect,
    }
},{
    persist:true, 
})