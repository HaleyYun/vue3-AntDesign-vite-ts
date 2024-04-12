<script setup  lang='ts'>
// import type { QueryDictionariesType, resData } from "@/apis/dictionaries/type"
// import { QueryDictionaries } from "@/apis/dictionaries"
import StepsCp from "@/components/StepsCp/index.vue"
import Record from "./components/Record.vue"
import UserInfo from "./components/UserInfo.vue"
import BloodPressure from "./components/BloodPressure.vue"
import BloodFa from "./components/BloodFa.vue"
import Exercise from "./components/Exercise.vue"
import Angiocarpy from "./components/Angiocarpy.vue"
import PerceiveStatus from "./components/PerceiveStatus.vue"
import Gene from "./components/Gene.vue"
import MedicalHistory from "./components/MedicalHistory.vue"
import LivingHabit from "./components/LivingHabit.vue"
import HobbyExercise from "./components/HobbyExercise.vue"
import { useClienteleData } from "@/stores/clienteleData"
import { ref } from 'vue'
import { useRouter } from "vue-router"


import { useState } from '@/stores/state'
const state = useState()
const router = useRouter()
const ClienteleData = useClienteleData()
const healthState = ref<number>(1);

// 下一步
const nextBtn = () => {
    if (healthState.value >= 7) {
        healthState.value = 7
        visible.value = true
        return
    }
    healthState.value++
}
const pareBtn = () => {
    healthState.value--
}
// 是否完善信息弹窗
const visible = ref<boolean>(false);
const hanldePerfection = () => {
    visible.value = false;
    healthState.value = 0
    ClienteleData.addSetpStatus()
}
const handleAchieve = async () => {
    let res = await ClienteleData.SubmitNewRecord()
    if (res) {
        visible.value = false;
        router.push('/assessment/management');
        state.getPageUrl('/assessment/management')
    }
};
const PerfectionNext = () => {
    if (ClienteleData.setpStatus >= 5) {
        ClienteleData.changeSetpStatus(5)
        return
    }
    ClienteleData.addSetpStatus()
}
const handleRturn = () => {
    router.push({
        path: '/assessment/management'
    })
    state.getPageUrl('/assessment/management')
}
</script> 
<template>
    <div class="add-da">
        <div class="top" @click="handleRturn">
            <img class="top_01" src="@/assets/images/back.png" />
            <span class="top_02">个人信息</span>
        </div>
        <StepsCp />
        <UserInfo v-if="ClienteleData.setpStatus == 1" @next="PerfectionNext" />
        <Record v-if="ClienteleData.setpStatus == 2 && healthState == 1" @next="nextBtn" />
        <BloodPressure v-if="ClienteleData.setpStatus == 2 && healthState == 2" @next="nextBtn" @previous="pareBtn" />
        <BloodFa v-if="ClienteleData.setpStatus == 2 && healthState == 3" @next="nextBtn" @previous="pareBtn" />
        <Exercise v-if="ClienteleData.setpStatus == 2 && healthState == 4" @next="nextBtn" @previous="pareBtn" />
        <Angiocarpy v-if="ClienteleData.setpStatus == 2 && healthState == 5" @next="nextBtn" @previous="pareBtn" />
        <PerceiveStatus v-if="ClienteleData.setpStatus == 2 && healthState == 6" @next="nextBtn" @previous="pareBtn" />
        <Gene v-if="ClienteleData.setpStatus == 2 && healthState == 7" @next="nextBtn" @previous="pareBtn" />
        <!-- 完善 -->
        <MedicalHistory v-if="ClienteleData.setpStatus == 3" @next="PerfectionNext" />
        <LivingHabit v-if="ClienteleData.setpStatus == 4" @next="PerfectionNext" />
        <HobbyExercise v-if="ClienteleData.setpStatus == 5" />
    </div>
    <a-modal :maskClosable="false" v-model:visible="visible" :footer="null" :keyboard="false" :closable="false"
        :width="428">
        <div class="achieve-ts">
            <div class="colse">
                <img src="@/assets/images/close.png" alt="" @click="visible = false">
            </div>
            <div class="achieve-top">
                <h3>填写已完成</h3>
            </div>
            <div class="achieve-text">
                本次评估所需填写的档案信息已完成如需要干预请点击继续填写，不需要请点击确定~
                <a-button type="text" html-type="submit" @click="hanldePerfection">继续完善</a-button>
            </div>
            <a-button class="achieve" type="primary" html-type="submit" @click="handleAchieve">确定</a-button>
        </div>
    </a-modal>
</template>
<style lang='less' scoped>
.add-da {
    background-color: #fff;
    padding: 70px 10px 10px;

    .record-plan-left {
        width: 37%;

        img {
            display: block;
            width: 100%;
        }
    }
}


.achieve-ts {
    padding: 10px;

    .colse {
        position: absolute;
        left: 15px;
        top: 15px;

        img {
            display: block;
            width: 24px;
        }
    }

    .achieve-top {
        height: 40px;
        color: #222222;
        line-height: 40px;
        margin-top: 30px;
        margin-bottom: 10px;

        h3 {
            font-size: 28px;
        }
    }

    .achieve-text {
        height: 44px;
        font-size: 16px;
        font-weight: 400;
        color: #777777;
        line-height: 22px;

        button {
            padding: 0;
            color: #3D7EFF;
            font-size: 16px;
            font-weight: bold;
        }
    }

    .achieve {
        width: 337px;
        height: 54px;
        display: block;
        margin: 0 auto;
        font-size: 17px;
        margin-top: 50px;
        border-radius: 27px;
    }
}

.top {
    position: fixed;
    top: 0px;
    width: 100%;
    height: 22px;
    margin-top: 26px;
    display: flex;

}

.top_01 {
    width: 21px;
    height: 21px;
    vertical-align: middle;
}

.top_02 {
    width: 80px;
    height: 22px;
    font-size: 16px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #222222;
    line-height: 22px;
    display: inline-block;
}
</style>