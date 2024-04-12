<!-- 基因风险 -->
<script setup  lang='ts'>
// import type { QueryDictionariesType, resData } from "@/apis/dictionaries/type"
// import { QueryDictionaries } from "@/apis/dictionaries"
import type { geneStateType } from "@/types/clientele"
import { useClienteleData } from "@/stores/clienteleData"
// import { message } from 'ant-design-vue';
import { } from 'vue-router'
import { onMounted, ref } from 'vue'
import { diabetesEnum, APOEε4Enum } from '../../../enum/archivesEnum'

const ClienteleData = useClienteleData();
const emits= defineEmits(['previous','next'])


// const diabetesStateList = ref<QueryDictionariesType[]>()//糖尿病
// const carryApoeStateList = ref<QueryDictionariesType[]>()//基因型
const geneState = ref<geneStateType>({
    diabetes: "",
    carryApoe: "",
})


onMounted(async () => {
    if(ClienteleData.clientForm.recordsDetailRequest!.diabetes!==null){
        geneState.value.diabetes = ClienteleData.clientForm.recordsDetailRequest!.diabetes
    }
    if(ClienteleData.clientForm.recordsDetailRequest!.carryApoe!==null){
        geneState.value.carryApoe = ClienteleData.clientForm.recordsDetailRequest!.carryApoe
    }

    // let resDiabetes: resData = await QueryDictionaries({ dictType: "diabetes" });
    // diabetesStateList.value = resDiabetes.data
    // console.log("糖尿病======", resDiabetes);

    // let resCarryApoe: resData = await QueryDictionaries({ dictType: "carry_apoe" });
    // carryApoeStateList.value = resCarryApoe.data
    // console.log("基因型======", resCarryApoe);
})
const cahngeDiabetesState = (dictValue: string) => {
    geneState.value.diabetes = dictValue
}
const cahngeCarryApoeStatus = (dictValue: string) => {
    geneState.value.carryApoe = dictValue
}
const pareBtn=()=>{
    emits('previous')
}
const nextBtn=()=>{
    ClienteleData.getGene(geneState.value)
    emits('next')
}


</script>
<template>
    <div class="record-plan">
        <div class="record-plan-left">
            <img src="@/assets/images/jy.png" alt="">
        </div>
        <div class="record-plan-right">
            <div class="inquiry">
                <h2>1.您是否患有糖尿病？</h2>
                <div>
                    <span :class="geneState.diabetes == item.value ? 'active' : ''"
                        v-for="item in diabetesEnum" :key="item.value" @click="cahngeDiabetesState(item.value)">
                        {{ item.label }}
                    </span>
                </div>

            </div>
            <div class="inquiry">
                <h2>2.您是否携带APOEε4基因型?</h2>
                <div>
                    <span :class="geneState.carryApoe == item.value ? 'active' : ''"
                        v-for="item in APOEε4Enum" :key="item.value"
                        @click="cahngeCarryApoeStatus(item.value)">
                        {{ item.label }}
                    </span>
                </div>

            </div>
        </div>
    </div>
    <div class="step-btn-box">
        <span class="step-btn" @click="pareBtn">上一步</span>
        <span class="step-btn" @click="nextBtn">下一步</span>
    </div>
</template>

<style lang='less' scoped>
.record-plan {
    display: flex;
    justify-content: space-around;

    .record-plan-left {
        width: 37%;
        margin-left: 80px;

        img {
            display: block;
            width: 100%;
        }

    }

    .record-plan-right {
        width: 40%;
        padding-top: 29px;
        text-align: center;
        margin-right: 30px;
        margin-right: 80px;

        .inquiry {
            margin-top: 50px;
            text-align: left;
            h2 {
                font-size: 26px;
                font-weight: 600;
                color: #0D0D0D;
                line-height: 37px;
            }

            .two-title {
                font-size: 20px;
                font-weight: 400;
                color: #4B4B4B;
                text-align: left;
            }

            &>div {
                display: flex;
                justify-content: left;

                span {
                    display: block;
                    width: 96px;
                    line-height: 40px;
                    border-radius: 28px;
                    background: #fff;
                    font-size: 16px;
                    font-weight: bold;
                    color: #3D7EFF;
                    border: 1px solid #3D7EFF;
                    margin: 10px 0;
                    margin-right: 30px;
                    text-align: center;
                    &:last-child {
                        margin-right: 0;
                    }

                    &.active {
                        background: #3D7EFF;
                        color: #FFFFFF;
                    }

                }
            }
        }
    }
}
</style>