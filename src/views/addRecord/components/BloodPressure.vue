<!-- 血压 -->
<script setup  lang='ts'>
// import type { QueryDictionariesType, resData } from "@/apis/dictionaries/type"
// import { QueryDictionaries } from "@/apis/dictionaries"
import { useClienteleData } from "@/stores/clienteleData"
import type { bloodPressurStateType } from "@/types/clientele"
// import ruler from '@/components/ruler/index.vue'
import { message } from 'ant-design-vue';
import { onMounted, ref } from 'vue'
import { bloodPressureEnum } from '../../../enum/archivesEnum'
const emits= defineEmits(['previous','next'])
const ClienteleData = useClienteleData();
// const bloodPressureStateList = ref<QueryDictionariesType[]>()
const bloodPressurState = ref<bloodPressurStateType>({
    bloodPressureSituation: "",
    systolicPressure: 0,
    diastolicPressure: 0,
})
onMounted(async () => {
    console.log(ClienteleData.clientForm.recordsDetailRequest,'22');
    console.log(ClienteleData.clientForm.recordsDetailRequest!.bloodPressureSituation!==null,'111');
    if(ClienteleData.clientForm.recordsDetailRequest!.bloodPressureSituation!==null){
        bloodPressurState.value.bloodPressureSituation = ClienteleData.clientForm.recordsDetailRequest!.bloodPressureSituation
    }
    if(ClienteleData.clientForm.recordsDetailRequest!.systolicPressure!==null){
        bloodPressurState.value.systolicPressure = ClienteleData.clientForm.recordsDetailRequest!.systolicPressure 
    }
    if(ClienteleData.clientForm.recordsDetailRequest!.diastolicPressure!==null){
        bloodPressurState.value.diastolicPressure = ClienteleData.clientForm.recordsDetailRequest!.diastolicPressure
    }
    // let resBloodPressure: resData = await QueryDictionaries({ dictType: "blood_pressure_situation" });
    // bloodPressureStateList.value = resBloodPressure.data
    // console.log("血脂======", resBloodPressure);
})
const cahngeBloodPressureSituation=(dictValue:string)=>{
    bloodPressurState.value.bloodPressureSituation=dictValue
}
const pareBtn=()=>{
    emits('previous')
}
const nextBtn=()=>{

    if(bloodPressurState.value.systolicPressure as any  == ''){
        bloodPressurState.value.systolicPressure = 0
    }

    if(bloodPressurState.value.systolicPressure as any  < 0){
        message.error('请输入正确的收缩压范围80mmHG~240mmHG')
        return;
    }

    if( bloodPressurState.value.systolicPressure as any  > 0 && bloodPressurState.value.systolicPressure as any  < 80 ){
        message.error('请输入正确的收缩压范围80mmHG~240mmHG')
        return;
    }


    if(bloodPressurState.value.systolicPressure as any  > 240){
        message.error('请输入正确的收缩压范围80mmHG~240mmHG')
        return;
    }

    if(bloodPressurState.value.diastolicPressure as any  == ''){
        bloodPressurState.value.diastolicPressure = 0
    }

    if(bloodPressurState.value.diastolicPressure as any  < 0){
        message.error('请输入正确的舒张压范围60mmHG~140mmHG')
        return;
    }

    if(bloodPressurState.value.diastolicPressure as any  > 0 && bloodPressurState.value.diastolicPressure as any  < 60){
        message.error('请输入正确的舒张压范围60mmHG~140mmHG')
        return;
    }

    if(bloodPressurState.value.diastolicPressure as any  > 140){
        message.error('请输入正确的舒张压范围60mmHG~140mmHG')
        return;
    }
    ClienteleData.getBloodPressureData(bloodPressurState.value)
    emits('next')
}
// const changeSystolicPressure=(data:number)=>{
//     bloodPressurState.value.systolicPressure=data
// }
// const changeDiastolicPressure=(data:number)=>{
//     bloodPressurState.value.diastolicPressure=data
// }

const inputHeight = (e:any)=>{
    let str = e.currentTarget.value.replace(/^0+/, '')
    bloodPressurState.value.systolicPressure = str
    if(str !=''){
        bloodPressurState.value.systolicPressure = parseInt(str)
    }else{
        bloodPressurState.value.systolicPressure = 0
    }
}

const inputWeight = (e:any)=>{
    let str = e.currentTarget.value.replace(/^0+/, '')
    bloodPressurState.value.diastolicPressure = str
    if(str !=''){
        bloodPressurState.value.diastolicPressure =  parseInt(str)
    }else{
        bloodPressurState.value.diastolicPressure =  0
    }
}

const dec = (val:string) => {
    if(val=='shrink'){
        if(bloodPressurState.value.systolicPressure==0){
            return;
        }
        bloodPressurState.value.systolicPressure = bloodPressurState.value.systolicPressure as any -1
        
    }
    if(val=='relaxation'){
        if(bloodPressurState.value.diastolicPressure==0){
            return;
        }
        bloodPressurState.value.diastolicPressure = bloodPressurState.value.diastolicPressure as any - 1
    }
}

const add = (val:string) => {
    if(val=='shrink'){
        bloodPressurState.value.systolicPressure = bloodPressurState.value.systolicPressure as any + 1
    }
    if(val=='relaxation'){
        bloodPressurState.value.diastolicPressure = bloodPressurState.value.diastolicPressure as any +1
    }
}


</script>
<template>
    <div class="record-plan">
        <div class="record-plan-left">
            <img src="@/assets/images/xy.png" alt="">
        </div>
        <div class="record-plan-right">
            <div class="inquiry">
                <h2>您的血压情况？</h2>
                <div>
                    <span :class="bloodPressurState.bloodPressureSituation==item.value? 'active' : ''"  v-for="item in bloodPressureEnum"
                     :key="item.value"
                     @click="cahngeBloodPressureSituation(item.value)">
                        {{ item.label }}
                    </span>
                </div>

            </div>
            <div>
                <div class="title-two" >收缩压/mmHG</div>
                <div class="boxbg">
                    <div class="decrease" @click="dec('shrink')">-</div>
                    <input class="int" type="number"  placeholder="0"  maxlength="5" @blur="inputHeight" v-model="bloodPressurState.systolicPressure">
                    <div class="add" @click="add('shrink')">+</div>
                </div>
                <!-- <ruler :key="1" unit="mmHg" :num="300" :currentNum="bloodPressurState.systolicPressure" @getData="changeSystolicPressure" /> -->
            </div>
            <div>
                <div class="title-two">舒张压/mmHG</div>
                <div class="boxbg">
                    <div class="decrease" @click="dec('relaxation')">-</div>
                    <input class="int" type="number"  placeholder="0"  maxlength="5" @blur="inputWeight" v-model="bloodPressurState.diastolicPressure">
                    <div class="add" @click="add('relaxation')">+</div>
                </div>


                <!-- <ruler :key="2" unit="mmHg" :num="300" :currentNum="bloodPressurState.diastolicPressure" @getData="changeDiastolicPressure" /> -->
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
        margin-left: 80px;

        img {
            display: block;
            width: 100%;
        }
    }

    .record-plan-right {
        width: 64%;
        padding-top: 50px;
        text-align: center;
        margin-right: 30px;
        margin-right: 80px;

        .inquiry {
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
}
</style>