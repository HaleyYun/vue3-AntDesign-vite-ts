<!-- 运动 -->
<script setup  lang='ts'>
// import exerciseRuler from '@/components/exerciseRuler/index.vue'
import { useClienteleData } from "@/stores/clienteleData"
import { message } from 'ant-design-vue';
import { ref, onMounted } from 'vue'
const emits = defineEmits(['previous', 'next'])
const ClienteleData = useClienteleData();

const exerciseState = ref<number | any>(0)
onMounted(() => {
    console.log(ClienteleData.clientForm.recordsDetailRequest!.weeklyExerciseFrequency);
    if (ClienteleData.clientForm.recordsDetailRequest!.weeklyExerciseFrequency !== null) {
        exerciseState.value = ClienteleData.clientForm.recordsDetailRequest?.weeklyExerciseFrequency
    }
})
const pareBtn = () => {
    emits('previous')
}
const nextBtn = () => {
    if(exerciseState.value as any  == ''){
        exerciseState.value = 0
    }

    if(exerciseState.value as any  < 0){
        message.error('请输入正确的运动量范围0次/周~10次/周')
        return;
    }
    if(exerciseState.value as any  > 10){
        message.error('请输入正确的运动量范围0次/周~10次/周')
        return;
    }


    ClienteleData.getExercise(exerciseState.value)
    emits('next')
}
// const changeExerciseState = (data: number) => {
//     exerciseState.value = data
// }

const inputHeight = (e:any)=>{
    let str = e.currentTarget.value.replace(/^0+/, '')
    exerciseState.value =  str
    if(str !=''){
        exerciseState.value = parseInt(str)
    }else{
        exerciseState.value =0
    }
    
}

const dec = (val:string) => {
    if(val=='sports'){
        if(exerciseState.value==0){
            return;
        }
        exerciseState.value = exerciseState.value -1
    }
}

const add = (val:string) => {
    if(val=='sports'){
        exerciseState.value = exerciseState.value + 1
    }
}

</script>
<template>
    <div class="record-plan">
        <div class="record-plan-left">
            <img src="@/assets/images/yd.png" alt="">
        </div>
        <div class="record-plan-right">
            <div class="inquiry">
                <h2>您每周锻炼或进行几次体育运动？</h2>
                <div>(只计算至少持续20分钟并导致出汗和呼吸加速的体育运动)</div>
            </div>
            <div>
                <div class="title-two">运动量次/周</div>
                <div class="boxbg">
                    <div class="decrease" @click="dec('sports')">-</div>
                    <input class="int" type="number" placeholder="0"  maxlength="5" @blur="inputHeight" v-model="exerciseState">
                    <div class="add" @click="add('sports')">+</div>
                </div>
                <!-- <exerciseRuler unit="次" :num="200" :currentNum="exerciseState" @getData="changeExerciseState" /> -->
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
        width: 45%;
        padding-top: 120px; 
        text-align: center;
        margin-right: 100px;

        .inquiry {
            margin-bottom: 60px;

            h2 {
                font-size: 26px;
                font-weight: 600;
                color: #0D0D0D;
                line-height: 37px;
            }

            &>div {
                display: flex;
                justify-content: center;

                &:nth-child(2) {
                    font-size: 18px;
                    font-weight: 400;
                    color: #4B4B4B;
                }

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