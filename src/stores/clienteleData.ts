import { defineStore } from 'pinia'
import type { ClientFormType, recordsBaseRequest, ExerciseType, recordsDetailRequest, RecordInfoType } from "@/stores/types/type"
import { NewRecord, EditRecord } from "@/apis/clientele"
import dayjs from 'dayjs';
import { ref } from 'vue';
export const useClienteleData = defineStore('ClienteleData', () => {
    const clientForm = ref<ClientFormType>({})
    const setpStatus = ref<number>(2)
    const RecordInfo = ref<RecordInfoType>({})
    const editStatus = ref<boolean>(false)//是否编辑
    // 初始化 recordsDetailRequestObj
    const AddrecordsDetailRequestObj=()=>{
        let recordsDetailRequestObj: recordsDetailRequest = {
            arthritis: "",
            bloodPressureSituation: "1",
            bloodSugar: "",
            carryApoe: "2",
            cerebrovascularDisease: "2",
            depressiveState: "2",
            diabetes: "2",
            diastolicPressure: 0,//舒张90
            gastrointestinalDisease: "",
            heartDisease: "2",
            diet1: "",
            diet2: "",
            diet3: "",
            drinking: "",
            smoking: "",
            height: 160,
            lipidStatus: "1",
            littleExercise: "",
            memory: "2",
            osteoporosis: "",
            respiratoryDiseases: "",
            sleepDisorders: "",
            spondylopathy: "",
            systolicPressure: 0,//收缩140
            totalCholesterol: 0,//血脂5.2
            tumorDiseases: "",
            weeklyExerciseFrequency: 0,
            weight: 56,
        }
        clientForm.value.recordsDetailRequest=recordsDetailRequestObj
    }
    const addSetpStatus = () => {
        setpStatus.value++
    }
    const minusSetpStatus = () => {
        setpStatus.value--
    }
    const changeSetpStatus = (data: number) => {
        setpStatus.value = data
    }
    //  基础能力
    const addCapabilityList = (data: string[]) => {
        clientForm.value.capabilityList = data
    }
    // 患病情况
    const addPrevalenceList = (data: string[]) => {
        clientForm.value.prevalenceList = data
    }
    // 家庭病史
    const addFamilyHistoryList = (data: string[]) => {
        clientForm.value.familyHistoryList = data
    }
    // 账号信息
    const changeRecordsBaseRequest = (data: recordsBaseRequest) => {
        clientForm.value.recordsBaseRequest = data
    }
    // 运动爱好
    const changeSportsHobbiesList = (data: ExerciseType[]) => {
        clientForm.value.sportsHobbiesList = data
    }
    // 健康档案
    const changeRecordsDetailRequest = (data: recordsDetailRequest) => {
        clientForm.value.recordsDetailRequest = data
    }
    // 生活习惯
    const addLivingHabit = (data: any) => {
        console.log(data);
        clientForm.value.recordsDetailRequest = { ...clientForm.value.recordsDetailRequest, ...data }
    }
    // 身体 体重
    const getRecordData = (obj: any) => {
        clientForm.value.recordsDetailRequest!.height = obj.height
        clientForm.value.recordsDetailRequest!.weight= obj.weight
    }
    // 血压情况
    const getBloodPressureData = (obj: any) => {
        clientForm.value.recordsDetailRequest!.bloodPressureSituation = obj.bloodPressureSituation
        clientForm.value.recordsDetailRequest!.systolicPressure = obj.systolicPressure
        clientForm.value.recordsDetailRequest!.diastolicPressure = obj.diastolicPressure
    }
    // 血脂情况
    const getBloodFaData = (obj: any) => {
        clientForm.value.recordsDetailRequest!.lipidStatus = obj.lipidStatus
        clientForm.value.recordsDetailRequest!.totalCholesterol = obj.totalCholesterol
    }
    // 运动
    const getExercise = (obj: number | any) => {
        clientForm.value.recordsDetailRequest!.weeklyExerciseFrequency = obj
    }
    // 心血管
    const getAngiocarp = (obj: any) => {
        clientForm.value.recordsDetailRequest!.heartDisease = obj.heartDisease
        clientForm.value.recordsDetailRequest!.cerebrovascularDisease = obj.cerebrovascularDisease

    }
    // 认知状态
    const getPerceiveStatus = (obj: any) => {
        clientForm.value.recordsDetailRequest!.memory = obj.memory
        clientForm.value.recordsDetailRequest!.depressiveState = obj.depressiveState
    }
    // 基因风险
    const getGene = (obj: any) => {
        clientForm.value.recordsDetailRequest!.diabetes = obj.diabetes
        clientForm.value.recordsDetailRequest!.carryApoe = obj.carryApoe
    }
    const clearClientForm=()=>{
        clientForm.value = {}
    }
    // 表单提交
    const SubmitNewRecord = () => {
        return new Promise(async (resolve, reject) => {
            clientForm.value.recordsBaseRequest!.birthday = dayjs(clientForm.value.recordsBaseRequest?.birthday).format("YYYY-MM-DD")
            console.log(clientForm.value);
            let res: any
            if (editStatus.value) {
                res = await EditRecord(clientForm.value)
            } else {
                res = await NewRecord(clientForm.value)
            }
            let timer = setTimeout(() => {
                if (res!.code == 200) {
                    clearTimeout(timer)
                    resolve(true)
                } else {
                    reject(false)
                }
            })
        })

    }
    // 改变 编辑状态
    const changeEditStatus = (data: boolean) => {
        editStatus.value = data
    }
    const getEditData = (data: RecordInfoType) => {
        console.log("data", data);
        RecordInfo.value = data
        clientForm.value.capabilityList = data.capabilityList
        clientForm.value.familyHistoryList = data.familyHistoryList
        clientForm.value.prevalenceList = data.prevalenceList
        clientForm.value.sportsHobbiesList = data.sportsHobbiesList

        // 处理赋值
        let obj: any = { ...data.healthRecordsBase, ...data.healthRecordsDetail }
        let recordsDetailRequestObj: recordsDetailRequest = {
            arthritis: "",
            bloodPressureSituation: "1",
            bloodSugar: "",
            carryApoe: "2",
            cerebrovascularDisease: "2",
            depressiveState: "2",
            diabetes: "2",
            diastolicPressure: 100,
            gastrointestinalDisease: "",
            heartDisease: "2",
            diet1: "",
            diet2: "",
            diet3: "",
            drinking: "",
            smoking: "",
            height: 160,
            lipidStatus: "1",
            littleExercise: "",
            memory: "2",
            osteoporosis: "",
            respiratoryDiseases: "",
            sleepDisorders: "",
            spondylopathy: "",
            systolicPressure: 100,
            totalCholesterol: 160,
            tumorDiseases: "",
            weeklyExerciseFrequency: 0,
            weight: 150,
        }
        let keyOne = Object.keys(recordsDetailRequestObj)
        let keyTwo = Object.keys(obj)
        for (let i = 0; i < keyOne.length; i++) {
            for (let j = 0; j < keyTwo.length; j++) {
                if (keyOne[i] === keyTwo[j]) {
                    recordsDetailRequestObj[keyOne[i] as keyof typeof recordsDetailRequestObj] = obj[keyTwo[j]]
                }
            }
        }
        clientForm.value.recordsDetailRequest = recordsDetailRequestObj
    }

    return {
        clientForm,
        setpStatus,
        editStatus,
        RecordInfo,
        clearClientForm,
        AddrecordsDetailRequestObj,
        changeSetpStatus,
        addCapabilityList,
        addPrevalenceList,
        addFamilyHistoryList,
        addSetpStatus,
        minusSetpStatus,
        changeRecordsBaseRequest,
        changeSportsHobbiesList,
        SubmitNewRecord,
        changeRecordsDetailRequest,
        addLivingHabit,
        changeEditStatus,
        getEditData,
        getRecordData,
        getBloodPressureData,
        getBloodFaData,
        getExercise,
        getAngiocarp,
        getPerceiveStatus,
        getGene,   
    }
}, {
    persist: false,
})