<!-- 生活习惯 -->
<script setup  lang='ts'>
// import type { QueryDictionariesType } from "@/apis/dictionaries/type"
// import { QueryDictionaries } from "@/apis/dictionaries"
import { useClienteleData } from "@/stores/clienteleData"
import { } from 'vue-router'
import { onMounted, reactive } from 'vue'
import { useRouter } from "vue-router"
import { smokingEnum, drinkingEnum, diet1Enum, diet2Enum, diet3Enum } from '../../../enum/archivesEnum'

const router = useRouter()

const emit = defineEmits(['next'])
const ClienteleData = useClienteleData()
// const smokingList = ref<QueryDictionariesType[]>()//吸烟
// const drinkingList = ref<QueryDictionariesType[]>()//喝酒
// const dietOneList = ref<QueryDictionariesType[]>()//饮食1
// const dietTwoList = ref<QueryDictionariesType[]>()//饮食2
// const dietThreeList = ref<QueryDictionariesType[]>()//饮食3
const livingHabit = reactive<any>({
    smoking: "",
    drinking: "",
    diet1: "",
    diet2: "",
    diet3: "",
})


onMounted(async () => {
    if (ClienteleData.clientForm.recordsDetailRequest!.smoking!==null){
        livingHabit.smoking = ClienteleData.clientForm.recordsDetailRequest!.smoking
    }
    if (ClienteleData.clientForm.recordsDetailRequest!.drinking!==null){
        livingHabit.drinking = ClienteleData.clientForm.recordsDetailRequest!.drinking
    }
    if (ClienteleData.clientForm.recordsDetailRequest!.diet1!==null){
        livingHabit.diet1 = ClienteleData.clientForm.recordsDetailRequest!.diet1
    }
    if (ClienteleData.clientForm.recordsDetailRequest!.diet2!==null){
        livingHabit.diet2 = ClienteleData.clientForm.recordsDetailRequest!.diet2
    }
    if (ClienteleData.clientForm.recordsDetailRequest!.diet3!==null){
        livingHabit.diet3 = ClienteleData.clientForm.recordsDetailRequest!.diet3
    }




    // let resSmoking = await QueryDictionaries({ dictType: "smoking" })
    // smokingList.value = resSmoking.data
    // console.log("吸烟=", resSmoking);
    // let resDrinking = await QueryDictionaries({ dictType: "drinking" })
    // drinkingList.value = resDrinking.data
    // console.log("喝酒=", resDrinking);

    // let resdietOneList = await QueryDictionaries({ dictType: "diet1" })
    // dietOneList.value = resdietOneList.data
    // console.log("饮食1=", resdietOneList);
    // let resdietTwoList = await QueryDictionaries({ dictType: "diet2" })
    // dietTwoList.value = resdietTwoList.data
    // console.log("饮食2=", resdietTwoList);
    // let resdietThreeList = await QueryDictionaries({ dictType: "diet3" })
    // dietThreeList.value = resdietThreeList.data
    // console.log("饮食3=", resdietThreeList);

})
const PerfectionNext = () => {
    let flag = false
    for (const key in livingHabit) {
        if (livingHabit[key] !== "") {
            flag = true
        }
    }
    if (!flag) {
        // message.error('请完善病史档案');
        return
    }
    ClienteleData.addLivingHabit(livingHabit)
    emit('next')
}
const Accomplish = async() => {
    ClienteleData.addLivingHabit(livingHabit)
    let res = await ClienteleData.SubmitNewRecord()
    if (res) {
        router.push('/assessment/management')
    }
}
const changeSmokingState = (dictValue: string) => {
    livingHabit.smoking = dictValue
}
const changeDrinkingState = (dictValue: string) => {
    livingHabit.drinking = dictValue
}
const changeDietOneState = (dictValue: string) => {
    livingHabit.diet1 = dictValue
}
const changeDietTwoState = (dictValue: string) => {
    livingHabit.diet2 = dictValue
}
const changeDietThreeState = (dictValue: string) => {
    livingHabit.diet3 = dictValue
}
</script>
<template>
    <div class="medical">
        <div>
            <div class="classification">吸烟</div>
            <div class="classification-content">
                <span :class="livingHabit.smoking == item.value ? 'active' : ''" v-for="item in smokingEnum"
                    :key="item.value" @click="changeSmokingState(item.value)">{{
                        item.label }}</span>
            </div>
        </div>
        <div>
            <div class="classification">喝酒</div>
            <div class="classification-content">
                <span :class="livingHabit.drinking == item.value ? 'active' : ''" v-for="item in drinkingEnum"
                    :key="item.value" @click="changeDrinkingState(item.value)">{{
                        item.label }}</span>
            </div>

        </div>
        <div>
            <div class="classification">饮食偏好</div>
            <div class="classification-content diet">
                <div>
                    <span :class="livingHabit.diet1 == item.value ? 'active' : ''" v-for="item in diet1Enum"
                        :key="item.value" @click="changeDietOneState(item.value)">{{
                            item.label }}</span>
                </div>
                <div>
                    <span :class="livingHabit.diet2 == item.value ? 'active' : ''" v-for="item in diet2Enum"
                        :key="item.value" @click="changeDietTwoState(item.value)">{{
                            item.label }}</span>
                </div>
                <div>
                    <span :class="livingHabit.diet3 == item.value ? 'active' : ''" v-for="item in diet3Enum"
                        :key="item.value" @click="changeDietThreeState(item.value)">{{
                            item.label }}</span>
                </div>


            </div>

        </div>
    </div>
    <div class="step-btn-box">
        <span class="step-btn" @click="Accomplish">完成</span>
        <span class="step-btn" @click="PerfectionNext">完善运动爱好</span>
    </div>
</template>

<style lang='less' scoped>
.medical {
    display: flex;
    width: 100%;
    padding: 50px 100px 0px;
    justify-content: space-around;
    flex-wrap: wrap;

    &>div {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
    }

    .classification {
        width: 88px;
        font-size: 22px;
        font-weight: bold;
        color: #111111;
        line-height: 30px;
    }

    .classification-content {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        margin-left: 30px;
        margin-bottom: 26px;
        border-bottom: 1px dashed #979797;

        &:last-child {
            border: none
        }

        &.diet {
            display: block;

            &>div {
                display: flex;
                flex-wrap: wrap;
            }
        }

        span {
            display: block;
            padding: 9px 20px;
            background: #F5F6F8;
            border-radius: 28px;
            margin-right: 20px;
            margin-bottom: 20px;

            &.active {
                background: #3D7EFF;
                color: #fff;
            }
        }
    }

}
</style>