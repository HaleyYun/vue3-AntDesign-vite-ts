<!-- 身体 -->
<script setup  lang='ts'>
// import ruler from '@/components/ruler/index.vue'
import { useClienteleData } from "@/stores/clienteleData"
import { } from 'vue-router'
import { ref, onMounted } from 'vue'
import { message } from 'ant-design-vue';
const emits = defineEmits(['next'])
const ClienteleData = useClienteleData();
const recordData = ref<{ height: number, weight: number }>({
    height: 0,//身高
    weight: 0,//体重
})
onMounted(() => {
    if (ClienteleData.clientForm.recordsDetailRequest!.height) {
        recordData.value.height = ClienteleData.clientForm.recordsDetailRequest!.height
    }
    if (ClienteleData.clientForm.recordsDetailRequest!.weight) {
        recordData.value.weight = ClienteleData.clientForm.recordsDetailRequest!.weight
    }
    console.log(recordData.value.height);
})


const dec = (val:string) => {
    if(val=='height'){
        if(recordData.value.height==0){
            return;
        }
        recordData.value.height = recordData.value.height -1
    }
    if(val=='weight'){
        if(recordData.value.weight==0){
            return;
        }
        recordData.value.weight = recordData.value.weight - 1
    }
}

const add = (val:string) => {
    if(val=='height'){
        recordData.value.height = recordData.value.height + 1 
    }
    if(val=='weight'){
        recordData.value.weight = recordData.value.weight + 1
    }
}

const inputHeight = (e:any)=>{
    let str = e.currentTarget.value.replace(/^0+/, '')
    recordData.value.height = str
    if(str !=''){
        recordData.value.height = parseInt(str)
    }else{
        recordData.value.height = 0
    }
    console.log(recordData.value.height)
}

const inputWeight = (e:any)=>{
    let str = e.currentTarget.value.replace(/^0+/, '')
    recordData.value.weight = str
    if(str !=''){
        recordData.value.weight = parseInt(str)
    }else{
        recordData.value.weight = 0
    }
}

const nextBtn = () => {
    if(recordData.value.height as any  ==''){
        recordData.value.height = 0
        message.error('请输入正确的身高范围100厘米~220厘米')
        return;
    }
    
    if(recordData.value.height as any  < 100){
        message.error('请输入正确的身高范围100厘米~220厘米')
        return;
    }
    if(recordData.value.height as any  > 220){
        message.error('请输入正确的身高范围100厘米~220厘米')
        return;
    }
    if(recordData.value.weight as any  ==''){
        recordData.value.weight = 0
        message.error('请输入正确的体重范围30千克~150千克')
        return;
    }
    if(recordData.value.weight as any < 30){
        message.error('请输入正确的体重范围30千克~150千克')
        return;
    }
    if(recordData.value.weight as any > 150){
        message.error('请输入正确的体重范围30千克~150千克')
        return;
    }
    
    ClienteleData.getRecordData(recordData.value)
    emits('next')
}

</script>
<template>
    <div class="record-plan">
        <div class="record-plan-left">
            <img src="@/assets/images/stature.png" alt="">
        </div>
        <div class="record-plan-right">
            <div class="title-ome">完善您的身高体重</div>
            <div class="box">
                <div class="title-two">身高/cm</div>
                <div class="boxbg">
                    <div class="decrease" @click="dec('height')">-</div>
                    <input class="int" type="number" maxlength="5" placeholder="0"  @blur="inputHeight" v-model="recordData.height">
                    <div class="add" @click="add('height')">+</div>
                </div>
                <!-- <ruler :key="1" unit="cm" :num="300" :currentNum="recordData.height" @getData="changeHeight" /> -->
            </div>
            <div class="box" style="margin-top:100px;">
                <div class="title-two">体重/kg</div>
                <div class="boxbg">
                    <div class="decrease" @click="dec('weight')">-</div>
                    <input class="int" type="number" placeholder="0"  maxlength="5"  @blur="inputWeight"  v-model="recordData.weight">
                    <div class="add" @click="add('weight')">+</div>
                </div>
                <!-- <ruler :key="2" unit="kg" :num="300" :currentNum="recordData.weight" @getData="changeWeight" /> -->
            </div>
        </div>
    </div>
    <span class="step-btn" @click="nextBtn">下一步</span>
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
.title-ome {
    text-align: center;
    margin-top: 80px;
    font-size: 26px;
    font-weight: 600;
    color: #0D0D0D;
    line-height: 37px;
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

    .record-plan-left {
        width: 37%;

        img {
            display: block;
            width: 100%;
        }
    }

    .record-plan-right {
        width: 50%;
    }
}
</style>