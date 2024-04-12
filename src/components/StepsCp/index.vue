<script setup  lang='ts'>
import { } from 'vue-router'
import { } from 'vue'
import { useClienteleData } from "@/stores/clienteleData"
const ClienteleData = useClienteleData()
const list: string[] = ["健康档案", "病史档案", "生活习惯", "运动爱好"]
const getClassName:(index:number)=>string = (index:number)=>{
    if(ClienteleData.setpStatus ===index){
        return 'underway'
    }else if(ClienteleData.setpStatus >index){
        return 'accomplish'
    }else{
        return 'undone'
    }
}

</script>
<template>
    <div class="steps-box">
        <div class="start-head" :class="ClienteleData.setpStatus==1?'undone':''">
            <span>账号信息</span>
        </div>
        <div v-for="(item, index) in list" :key="index" class="steps-jd" :class="getClassName(index+2)">
            <div></div>
            <div>
                <span>{{ item }}</span>
            </div>
        </div>
        <!-- 完成 accomplish  进行中 underway 未完成 undone-->
        <!-- <div class="steps-jd accomplish">
            <div></div>
            <div>
                <span>健康档案</span>
            </div>
        </div>
        <div class="steps-jd underway">
            <div></div>
            <div>
                <span>病史档案</span>
            </div>
        </div>
        <div class="steps-jd undone">
            <div></div>
            <div>
                <span>生活习惯</span>
            </div>
        </div>
        <div class="steps-jd undone">
            <div></div>
            <div>
                <span>运动爱好</span>
            </div>
        </div> -->
    </div>
</template>

<style lang='less' scoped>
.steps-box {
    display: flex;
    align-items: center;
    justify-content: center;
}

.start-head {
    position: relative;
    width: 20px;
    height: 20px;
    background-color: #3D7EFF;
    border: 2px solid #3D7EFF;
    border-radius: 50%;
    margin-right: 6px;
    &.undone{
        background-color: transparent; 
    }
    span {
        position: absolute;
        top: -30px;
        display: block;
        width: 80px;
        left: -18px;
        font-size: 14px;
        font-weight: bold;
        color: #222222;
    }
}

.steps-jd {
    width: 153px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 6px;

    &>div {
        &:nth-child(1) {
            width: 127px;
            height: 2px;
            background-color: #DCDCDC;
        }

        &:nth-child(2) {
            position: relative;
            width: 20px;
            height: 20px;
            // background-color: #3D7EFF;
            border: 2px solid #DCDCDC;
            border-radius: 50%;

            span {
                position: absolute;
                top: -30px;
                display: block;
                width: 80px;
                left: -18px;
                font-size: 14px;
                font-weight: bold;
                color: #DCDCDC;
            }
        }
    }
}

.accomplish {
    &>div {
        &:nth-child(1) {
            background-color: #3D7EFF;
        }

        &:nth-child(2) {
            border: 2px solid #3D7EFF;
            border-radius: 50%;
            background-color: #3D7EFF;

            span {
                position: absolute;
                top: -30px;
                display: block;
                width: 80px;
                left: -18px;
                font-size: 14px;
                font-weight: bold;
                color: #222222;
            }
        }
    }
}

.underway {
    &>div {
        &:nth-child(1) {
            border: 1px dashed #3D7EFF;
        }

        &:nth-child(2) {
            border: 2px solid #3D7EFF;

            span {
                position: absolute;
                top: -30px;
                display: block;
                width: 80px;
                left: -18px;
                font-size: 14px;
                font-weight: bold;
                color: #222222;
            }
        }
    }
}
</style>