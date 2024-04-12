<!-- 病史档案 -->
<script setup  lang='ts'>
// import type { QueryDictionariesType, resData } from "@/apis/dictionaries/type"
// import { QueryDictionaries } from "@/apis/dictionaries"
import { useClienteleData } from "@/stores/clienteleData"
import { message } from 'ant-design-vue';
import { } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useRouter } from "vue-router"
import { capabilityEnum, prevalenceEnum, familyHistoryEnum } from '../../../enum/archivesEnum'

const router = useRouter()

const ClienteleData = useClienteleData();

type NumArray = string[]
const emit = defineEmits(['Next'])
// const basicAbilityList = ref<QueryDictionariesType[]>()//基础能力
// const prevalenceSituationList = ref<QueryDictionariesType[]>()//患病情况
// const familyCaseList = ref<QueryDictionariesType[]>()//家庭病史
const selectBasicAbility = ref<NumArray>([]);
const selectPrevalenceSituation = ref<NumArray>([]);
const selectFamilyCase = ref<NumArray>([]);

onMounted(async () => { 
    console.log("====selectBasicAbility.value",selectBasicAbility.value);
    console.log("ClienteleData.clientForm.capabilityList",ClienteleData.clientForm.capabilityList);
    
    
    if (ClienteleData.clientForm.capabilityList){
        selectBasicAbility.value = ClienteleData.clientForm.capabilityList as NumArray
    }
    if (ClienteleData.clientForm.familyHistoryList){
        selectFamilyCase.value = ClienteleData.clientForm.familyHistoryList as NumArray
    }
    if (ClienteleData.clientForm.prevalenceList){
        selectPrevalenceSituation.value = ClienteleData.clientForm.prevalenceList as NumArray
    }
    // let res_basic_ability: resData = await QueryDictionaries({ dictType: "health_capability" });
    // basicAbilityList.value = res_basic_ability.data
    // console.log("基础能力======", res_basic_ability);
    // let res_prevalence_situation: resData = await QueryDictionaries({ dictType: "health_prevalence" });
    // prevalenceSituationList.value = res_prevalence_situation.data
    // console.log("患病情况======", res_prevalence_situation);
    // let res_family_case: resData = await QueryDictionaries({ dictType: "health_family_history" });
    // familyCaseList.value = res_family_case.data
    // console.log("家庭病史======", res_family_case.data);
})


const changeBasicAbility = (dictValue: string) => {
    let subscript: number = selectBasicAbility.value.indexOf(dictValue)
    if (subscript >= 0) {
        selectBasicAbility.value!.splice(subscript, 1)
    } else {
        selectBasicAbility.value!.push(dictValue)
    }
    console.log(selectBasicAbility.value);
    

}
const changePrevalenceSituation = (dictValue: string) => {
    let subscript: number = selectPrevalenceSituation.value.indexOf(dictValue)
    if (subscript >= 0) {
        selectPrevalenceSituation.value.splice(subscript, 1)
    } else {
        selectPrevalenceSituation.value.push(dictValue)
    }
}
const changeFamilyCase = (dictValue: string) => {
    let subscript: number = selectFamilyCase.value.indexOf(dictValue)
    if (subscript >= 0) {
        selectFamilyCase.value!.splice(subscript, 1)
    } else {
        selectFamilyCase.value!.push(dictValue)
    }
}
const PerfectionNext = () => {
    let flag = selectBasicAbility.value.length !== 0 || selectPrevalenceSituation.value.length !== 0 || selectFamilyCase.value.length !== 0
    if (!flag) {
        message.error('请完善病史档案');
        return
    }
    if (selectBasicAbility.value.length !== 0) {
        ClienteleData.addCapabilityList(selectBasicAbility.value)
    }
    if (selectPrevalenceSituation.value.length !== 0) {
        ClienteleData.addPrevalenceList(selectPrevalenceSituation.value)
    }
    if (selectFamilyCase.value.length !== 0) {
        ClienteleData.addFamilyHistoryList(selectFamilyCase.value)
    }
    emit('Next')
}
const Accomplish = async () => {
    let flag = selectBasicAbility.value.length !== 0 || selectPrevalenceSituation.value.length !== 0 || selectFamilyCase.value.length !== 0
    if (!flag) {
        message.error('请完善病史档案');
        return
    }
    if (selectBasicAbility.value.length !== 0) {
        ClienteleData.addCapabilityList(selectBasicAbility.value)
    }
    if (selectPrevalenceSituation.value.length !== 0) {
        ClienteleData.addPrevalenceList(selectPrevalenceSituation.value)
    }
    if (selectFamilyCase.value.length !== 0) {
        ClienteleData.addFamilyHistoryList(selectFamilyCase.value)
    }
    let res = await ClienteleData.SubmitNewRecord()
    if (res) {
        router.push('/assessment/management')
    }

}


</script>
<template>
    <div class="medical">
        <div>
            <div class="classification">基础能力</div>
            <div class="classification-content">
                <div class="img" v-for="item in capabilityEnum" :key="item.value" @click="changeBasicAbility(item.value)">
                    <img v-if="item.label === '听力下降' && selectBasicAbility.indexOf(item.value) < 0"
                        src="@/assets/images/bls/jcnl_01.png" alt="">
                    <img v-else-if="item.label === '听力下降' && selectBasicAbility.indexOf(item.value) >= 0"
                        src="@/assets/images/bls/jcnl_01_active.png" alt="">

                    <img v-if="item.label === '视力下降' && selectBasicAbility.indexOf(item.value) < 0"
                        src="@/assets/images/bls/jcnl_02.png" alt="">
                    <img v-if="item.label === '视力下降' && selectBasicAbility.indexOf(item.value) >= 0"
                        src="@/assets/images/bls/jcnl_02_active.png" alt="">

                    <img v-if="item.label === '嗅觉下降' && selectBasicAbility.indexOf(item.value) < 0"
                        src="@/assets/images/bls/jcnl_03.png" alt="">
                    <img v-if="item.label === '嗅觉下降' && selectBasicAbility.indexOf(item.value) >= 0"
                        src="@/assets/images/bls/jcnl_03_active.png" alt="">

                    <img v-if="item.label === '睡眠障碍' && selectBasicAbility.indexOf(item.value) < 0"
                        src="@/assets/images/bls/jcnl_04.png" alt="">
                    <img v-if="item.label === '睡眠障碍' && selectBasicAbility.indexOf(item.value) >= 0"
                        src="@/assets/images/bls/jcnl_04_active.png" alt="">
                </div>
            </div>
        </div>
        <div>
            <div class="classification">患病情况</div>
            <div class="classification-content">
                <div class="img" v-for="item in prevalenceEnum" :key="item.value"
                    @click="changePrevalenceSituation(item.value)">
                    <img v-if="item.label === '肠胃疾病' && selectPrevalenceSituation.indexOf(item.value) < 0"
                        src="@/assets/images/bls/hbqk_01.png" alt="">
                    <img v-if="item.label === '肠胃疾病' && selectPrevalenceSituation.indexOf(item.value) >= 0"
                        src="@/assets/images/bls/hbqk_01_active.png" alt="">
                    <img v-if="item.label === '骨质疏松' && selectPrevalenceSituation.indexOf(item.value) < 0"
                        src="@/assets/images/bls/hbqk_02.png" alt="">
                    <img v-if="item.label === '骨质疏松' && selectPrevalenceSituation.indexOf(item.value) >= 0"
                        src="@/assets/images/bls/hbqk_02_active.png" alt="">

                    <img v-if="item.label === '脑外伤' && selectPrevalenceSituation.indexOf(item.value) < 0"
                        src="@/assets/images/bls/hbqk_03.png" alt="">
                    <img v-if="item.label === '脑外伤' && selectPrevalenceSituation.indexOf(item.value) >= 0"
                        src="@/assets/images/bls/hbqk_03_active.png" alt="">

                    <img v-if="item.label === '关节炎' && selectPrevalenceSituation.indexOf(item.value) < 0"
                        src="@/assets/images/bls/hbqk_04.png" alt="">
                    <img v-if="item.label === '关节炎' && selectPrevalenceSituation.indexOf(item.value) >= 0"
                        src="@/assets/images/bls/hbqk_04_active.png" alt="">

                    <img v-if="item.label === '呼吸疾病' && selectPrevalenceSituation.indexOf(item.value) < 0"
                        src="@/assets/images/bls/hbqk_05.png" alt="">
                    <img v-if="item.label === '呼吸疾病' && selectPrevalenceSituation.indexOf(item.value) >= 0"
                        src="@/assets/images/bls/hbqk_05_active.png" alt="">

                    <img v-if="item.label === '颈椎病' && selectPrevalenceSituation.indexOf(item.value) < 0"
                        src="@/assets/images/bls/hbqk_06.png" alt="">
                    <img v-if="item.label === '颈椎病' && selectPrevalenceSituation.indexOf(item.value) >= 0"
                        src="@/assets/images/bls/hbqk_06_active.png" alt="">

                    <img v-if="item.label === '脑肿瘤' && selectPrevalenceSituation.indexOf(item.value) < 0"
                        src="@/assets/images/bls/hbqk_07.png" alt="">
                    <img v-if="item.label === '脑肿瘤' && selectPrevalenceSituation.indexOf(item.value) >= 0"
                        src="@/assets/images/bls/hbqk_07_active.png" alt="">

                    <img v-if="item.label === '前列腺病' && selectPrevalenceSituation.indexOf(item.value) < 0"
                        src="@/assets/images/bls/hbqk_08.png" alt="">
                    <img v-if="item.label === '前列腺病' && selectPrevalenceSituation.indexOf(item.value) >= 0"
                        src="@/assets/images/bls/hbqk_08_active.png" alt="">

                    <img v-if="item.label === '精神疾病' && selectPrevalenceSituation.indexOf(item.value) < 0"
                        src="@/assets/images/bls/hbqk_09.png" alt="">
                    <img v-if="item.label === '精神疾病' && selectPrevalenceSituation.indexOf(item.value) >= 0"
                        src="@/assets/images/bls/hbqk_09_active.png" alt="">

                    <img v-if="item.label === '肝脏疾病' && selectPrevalenceSituation.indexOf(item.value) < 0"
                        src="@/assets/images/bls/hbqk_10.png" alt="">
                    <img v-if="item.label === '肝脏疾病' && selectPrevalenceSituation.indexOf(item.value) >= 0"
                        src="@/assets/images/bls/hbqk_10_active.png" alt="">

                    <img v-if="item.label === '癫痫' && selectPrevalenceSituation.indexOf(item.value) < 0"
                        src="@/assets/images/bls/hbqk_11.png" alt="">
                    <img v-if="item.label === '癫痫' && selectPrevalenceSituation.indexOf(item.value) >= 0"
                        src="@/assets/images/bls/hbqk_11_active.png" alt="">

                    <img v-if="item.label === '帕金森病' && selectPrevalenceSituation.indexOf(item.value) < 0"
                        src="@/assets/images/bls/hbqk_12.png" alt="">
                    <img v-if="item.label === '帕金森病' && selectPrevalenceSituation.indexOf(item.value) >= 0"
                        src="@/assets/images/bls/hbqk_12_active.png" alt="">
                </div>
            </div>

        </div>
        <div>
            <div class="classification">家庭病史</div>
            <div class="classification-content">
                <div class="img" v-for="item in familyHistoryEnum" :key="item.value" @click="changeFamilyCase(item.value)">
                    <img v-if="item.label === '血管性痴呆' && selectFamilyCase.indexOf(item.value) < 0"
                        src="@/assets/images/bls/jtbs_01.png" alt="">
                    <img v-if="item.label === '血管性痴呆' && selectFamilyCase.indexOf(item.value) >= 0"
                        src="@/assets/images/bls/jtbs_01_active.png" alt="">

                    <img v-if="item.label === '帕金森' && selectFamilyCase.indexOf(item.value) < 0"
                        src="@/assets/images/bls/jtbs_02.png" alt="">
                    <img v-if="item.label === '帕金森' && selectFamilyCase.indexOf(item.value) >= 0"
                        src="@/assets/images/bls/jtbs_02_active.png" alt="">

                    <img v-if="item.label === '阿尔茨海默' && selectFamilyCase.indexOf(item.value) < 0"
                        src="@/assets/images/bls/jtbs_03.png" alt="">
                    <img v-if="item.label === '阿尔茨海默' && selectFamilyCase.indexOf(item.value) >= 0"
                        src="@/assets/images/bls/jtbs_03_active.png" alt="">

                    <img v-if="item.label === '其他疾病' && selectFamilyCase.indexOf(item.value) < 0"
                        src="@/assets/images/bls/qita.png" alt="">
                    <img v-if="item.label === '其他疾病' && selectFamilyCase.indexOf(item.value) >= 0"
                        src="@/assets/images/bls/qita_active.png" alt="">
                </div>
            </div>

        </div>
    </div>
    <div class="step-btn-box">
        <span class="step-btn" @click="Accomplish">完成</span>
        <span class="step-btn" @click="PerfectionNext">完善生活习惯</span>
    </div>
</template>

<style lang='less' scoped>
.medical {
    display: flex;
    width: 100%;
    padding: 50px 100px 20px;
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

        .img {
            display: block;
            width: 89px;
            height: 89px; 
            margin-right: 15px;
            margin-bottom: 10px;

            img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>