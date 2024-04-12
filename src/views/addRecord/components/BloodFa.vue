<!-- 血脂 -->
<script setup  lang='ts'>
// import type { QueryDictionariesType, resData } from "@/apis/dictionaries/type"
// import { QueryDictionaries } from "@/apis/dictionaries"
import { useClienteleData } from "@/stores/clienteleData"
import type { BloodFaStateType } from "@/types/clientele"
import { message } from 'ant-design-vue';
// import ruler from '@/components/ruler/index.vue'
import { } from 'vue-router'
import { onMounted, ref } from 'vue'
import { bloodLipidEnum } from '../../../enum/archivesEnum'

const ClienteleData = useClienteleData();
const emits = defineEmits(['previous', 'next'])
// const bloodFaStateList = ref<QueryDictionariesType[]>()
const bloodFaState = ref<BloodFaStateType>({
    lipidStatus: "1",
    totalCholesterol: 0,
})
onMounted(async () => {
    bloodFaState.value.lipidStatus = "2"
    console.log(ClienteleData.clientForm);
    if (ClienteleData.clientForm.recordsDetailRequest!.lipidStatus !== null) {
        bloodFaState.value.lipidStatus = ClienteleData.clientForm.recordsDetailRequest!.lipidStatus as any
    }
    if (ClienteleData.clientForm.recordsDetailRequest!.totalCholesterol !== null) {
        bloodFaState.value.totalCholesterol = ClienteleData.clientForm.recordsDetailRequest!.totalCholesterol as number
    }
    // console.log("bloodFaState.value.lipidStatus", bloodFaState.value.lipidStatus);

    // let resBloodFaStateList: resData = await QueryDictionaries({ dictType: "lipid_status" });
    // bloodFaStateList.value = resBloodFaStateList.data
})
const cahngeLipidStatus = (dictValue: string) => {

    bloodFaState.value.lipidStatus = dictValue
}
const pareBtn = () => {
    emits('previous')
}
const nextBtn = () => {
    if(bloodFaState.value.totalCholesterol as any ==''){
        bloodFaState.value.totalCholesterol = 0
    }
    if(bloodFaState.value.totalCholesterol < 0){
        message.error('请输入正确的总胆固醇范围1.0mmol/L~8.0 mmol/L')
        return;
    }

    if(bloodFaState.value.totalCholesterol  > 0 && bloodFaState.value.totalCholesterol   < 1){
        message.error('请输入正确的总胆固醇范围1.0mmol/L~8.0 mmol/L')
        return;
    }


    if(bloodFaState.value.totalCholesterol  > 8){
        message.error('请输入正确的总胆固醇范围1.0mmol/L~8.0 mmol/L')
        return;
    }
    
    ClienteleData.getBloodFaData(bloodFaState.value)
    emits('next')
}
// const changeTotalCholesterol = (data: number) => {
//     bloodFaState.value.totalCholesterol = data
// }

const inputWeight = (e:any)=>{
    let str = e.currentTarget.value.replace(/^0+/, '')
    bloodFaState.value.totalCholesterol = str
    if(str !=''){
        bloodFaState.value.totalCholesterol = Number(str)
    }else{
        bloodFaState.value.totalCholesterol =0 
    }
    
}

const dec = (val:string) => {
    if(val=='cholesterol'){
        if(bloodFaState.value.totalCholesterol == 0){
            return;
        }
        bloodFaState.value.totalCholesterol = Number((bloodFaState.value.totalCholesterol - 0.1).toFixed(1))
    }
}

const add = (val:string) => {
    if(val=='cholesterol'){
        bloodFaState.value.totalCholesterol =Number( (bloodFaState.value.totalCholesterol + 0.1).toFixed(1))
    }
}

</script>
<template>
    <div class="record-plan">
        <div class="record-plan-left">
            <img src="@/assets/images/xz.png" alt="">
        </div>
        <div class="record-plan-right">
            <div class="inquiry">
                <h2>您的血脂情况？</h2>
                <div>
                    <span :class="bloodFaState.lipidStatus === item.value ? 'active' : ''" v-for="item in bloodLipidEnum"
                        :key="item.value" @click="cahngeLipidStatus(item.value)">
                        {{ item.label }}
                    </span>
                </div>

            </div>
            <div>
                <div class="title-two">总胆固醇mmol/L</div>
                <div class="boxbg">
                    <div class="decrease" @click="dec('cholesterol')">-</div>
                    <input class="int" type="number" placeholder="0"  maxlength="5" @blur="inputWeight" v-model="bloodFaState.totalCholesterol">
                    <div class="add" @click="add('cholesterol')">+</div>
                </div>

                <!-- <ruler :key="1" unit="mmol/L" :num="300" :currentNum="bloodFaState.totalCholesterol" 
                    @getData="changeTotalCholesterol" />-->
            </div>
        </div>
    </div>
    <div class="step-btn-box">
        <span class="step-btn" @click="pareBtn">上一步</span>
        <span class="step-btn" @click="nextBtn">下一步</span>
    </div>
</template>

<style lang='less' scoped>
.boxbg{
    width: 300px;
    height: 68px;
    background: #F3F3F3;
    border-radius: 12px;
    opacity: 0.86;
    margin:10px auto;
    display: flex;
    justify-content:space-between;
    align-content: center; 
    padding:0px 15px;
}
.decrease,.add{
    width:60px;
    height:68px;
    font-size: 80px;
    color:#222;
    line-height: 50px;
}
.int{
    width: 104px;
    height: 50px;
    background: #FFFFFF;
    border-radius: 8px;
    border: 1px solid #DDDDDD;
    color:#0D0D0D;
    line-height: 50px;
    margin-top:10px;
    text-align: center;
    font-size: 25px;
    font-weight: 600;
}
.title-two {
    text-align: center;
    margin-top: 10px;
    font-size: 18px;
    font-weight: 600;
    color: #0D0D0D;
    line-height: 35px;
}

.record-plan {
    display: flex;
    justify-content: space-around;

    .record-plan-left {
        width: 37%;

        img {
            display: block;
            width: 100%;
        }
    }

    .record-plan-right {
        width: 64%;
        padding-top: 90px;
        text-align: center;
        margin-right: 30px;
        margin-right: 80px;

        .inquiry {
            margin-bottom: 50px;

            h2 {
                font-size: 26px;
                font-weight: 600;
                color: #0D0D0D;
                line-height: 37px;
            }

            &>div {
                display: flex;
                justify-content: center;

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
}</style>