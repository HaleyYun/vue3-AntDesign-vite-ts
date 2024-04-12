<!-- 心血管 -->
<script setup  lang='ts'>
// import type { QueryDictionariesType, resData } from "@/apis/dictionaries/type"
// import { QueryDictionaries } from "@/apis/dictionaries"
import { useClienteleData } from "@/stores/clienteleData"
import { CardiovascularType } from "@/types/clientele"
import { heartEnum,brainEnum } from '../../../enum/archivesEnum'

// import { message } from 'ant-design-vue';
import { } from 'vue-router'
import { onMounted, ref } from 'vue'

const emits = defineEmits(['previous', 'next'])
const ClienteleData = useClienteleData();


// const heartDiseaseList = ref<QueryDictionariesType[]>()//心脏病
// const cerebrovascularDiseaseList = ref<QueryDictionariesType[]>()//脑血管
const selectDate = ref<CardiovascularType>({
    heartDisease: "",
    cerebrovascularDisease: ""
});

onMounted(async () => {
    if (ClienteleData.clientForm.recordsDetailRequest!.heartDisease !== null) {
        selectDate.value.heartDisease = ClienteleData.clientForm.recordsDetailRequest!.heartDisease
    }
    if (ClienteleData.clientForm.recordsDetailRequest!.cerebrovascularDisease !== null) {
        selectDate.value.cerebrovascularDisease = ClienteleData.clientForm.recordsDetailRequest!.cerebrovascularDisease
    }

    // let resHeartDisease: resData = await QueryDictionaries({ dictType: "heart_disease" });
    // heartDiseaseList.value = resHeartDisease.data
    // console.log("心脏病======", resHeartDisease);
    // let resCerebrovascularDisease: resData = await QueryDictionaries({ dictType: "cerebrovascular_disease" });
    // cerebrovascularDiseaseList.value = resCerebrovascularDisease.data
    // console.log("脑血管======", resCerebrovascularDisease);

})
const cangeHeartDisease = (dictValue: string) => {
    selectDate.value.heartDisease = dictValue
}
const cangeCerebrovascularDisease = (dictValue: string) => {
    selectDate.value.cerebrovascularDisease = dictValue
}

const pareBtn = () => {
    emits('previous')
}
const nextBtn = () => {
    ClienteleData.getAngiocarp(selectDate.value)
    emits('next')
}

</script>
<template>
    <div class="record-plan">
        <div class="record-plan-left">
            <img src="@/assets/images/xxg.png" alt="">
        </div>
        <div class="record-plan-right">
            <div class="inquiry">
                <h2>1.您是否患有心脏疾病？</h2>
                <div>（包括：冠心病、心衰、心房颤动等）</div>
                <div>
                    <span :class="selectDate.heartDisease == item.value ? 'active' : ''"
                        v-for="item in heartEnum" :key="item.value" @click="cangeHeartDisease(item.value)">
                        {{ item.label }}
                    </span>
                </div>

            </div>
            <div class="inquiry">
                <h2>2.您是否患有脑血管疾病？</h2>
                <div>(包括:脑卒中、脑溢血、脑梗塞、短暂性缺血发作)</div>
                <div>
                    <span :class="selectDate.cerebrovascularDisease == item.value ? 'active' : ''"
                        v-for="item in brainEnum" :key="item.value"
                        @click="cangeCerebrovascularDisease(item.value)">
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

        img {
            display: block;
            width: 100%;
        }

        margin-left: 80px;
    }

    .record-plan-right {
        // width: 64%;
        padding-top: 80px;
        text-align: center;
        margin-right: 30px;
        margin-right: 80px;

        .inquiry {
            text-align: left;
            h2 {
                font-size: 26px;
                font-weight: 600;
                color: #0D0D0D;
                line-height: 37px;
            }

            margin-bottom: 50px;

            &>div {
                &:nth-child(2) {
                    font-size: 20px;
                    font-weight: 400;
                    color: #4B4B4B;
                }

                &:nth-child(3) {
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
}
</style>