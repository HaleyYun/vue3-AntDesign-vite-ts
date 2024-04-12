<!-- 认知状态 -->
<script setup  lang='ts'>
// import type { QueryDictionariesType,resData } from "@/apis/dictionaries/type"
// import { QueryDictionaries } from "@/apis/dictionaries"
import { useClienteleData } from "@/stores/clienteleData"
import { PerceiveStatusType } from "@/types/clientele"
import { memoryEnum,depressedEnum } from '../../../enum/archivesEnum'
// import { message } from 'ant-design-vue';
import { } from 'vue-router'
import { onMounted, ref } from 'vue'

const emits = defineEmits(['previous', 'next'])
const ClienteleData = useClienteleData();

// const memoryList = ref<QueryDictionariesType[]>()//记忆力
// const cerebrovascularDiseaseList = ref<QueryDictionariesType[]>()//抑郁状态
const selectPerceiveStatus = ref<PerceiveStatusType>({
    memory: "",
    depressiveState: ""
});
onMounted(async () => {
    if (ClienteleData.clientForm.recordsDetailRequest!.memory !== null) {
        selectPerceiveStatus.value.memory = ClienteleData.clientForm.recordsDetailRequest!.memory
    }
    if (ClienteleData.clientForm.recordsDetailRequest!.depressiveState !== null) {
        selectPerceiveStatus.value.depressiveState = ClienteleData.clientForm.recordsDetailRequest!.depressiveState
    }

    // let resHeartMemory: resData = await QueryDictionaries({ dictType: "memory" });
    // memoryList.value = resHeartMemory.data
    // console.log("记忆力======", resHeartMemory);
    // let resCerebrovascularDisease: resData = await QueryDictionaries({ dictType: "depressive_state" });
    // cerebrovascularDiseaseList.value = resCerebrovascularDisease.data
    // console.log("抑郁状态======", resCerebrovascularDisease);

})
const changeMemory = (dictValue: string) => {
    selectPerceiveStatus.value.memory = dictValue
}
const cangeDepressiveState = (dictValue: string) => {
    selectPerceiveStatus.value.depressiveState = dictValue
}
const pareBtn = () => {
    emits('previous')
}
const nextBtn = () => {
    ClienteleData.getPerceiveStatus(selectPerceiveStatus.value)
    emits('next')
}

</script>
<template>
    <div class="record-plan">
        <div class="record-plan-left">
            <img src="@/assets/images/rzzt.png" alt="">
        </div>
        <div class="record-plan-right">
            <div class="inquiry">
                <h2>1.您的记忆力是否明显比过去几年更差了?</h2>
                <div>
                    <span :class="selectPerceiveStatus.memory == item.value ? 'active' : ''" v-for="item in memoryEnum"
                        :key="item.value" @click="changeMemory(item.value)">
                        {{ item.label }}
                    </span>
                </div>

            </div>
            <div class="inquiry">
                <h2>2.您是否处于抑郁状态？</h2>
                <div class="two-title">(抑郁症状包括:伤心、失去价值、无力感、无助感、难以:中注意力、失去自我价值、睡眠和饮食紊乱)</div>
                <div>
                    <span :class="selectPerceiveStatus.depressiveState == item.value ? 'active' : ''"
                        v-for="item in depressedEnum" :key="item.value"
                        @click="cangeDepressiveState(item.value)">
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