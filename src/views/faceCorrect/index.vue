<!-- 人脸矫正 -->
<script setup lang="ts">
import scheduleNumber from "@/components/scheduleNumber/index.vue"
import indicate from "@/components/indicate/index.vue"
import mathNumber from "@/components/mathNumber/index.vue"
// import { useModeStateStore } from '@/stores/bootMode'
import { ref } from 'vue'
import { useRouter } from "vue-router"
// import axios from "axios"
const router = useRouter()
// const modeStateStore = useModeStateStore()
const currentStep = ref<number>(0)

const handleClickBtn = () => {
    currentStep.value = 4
}
const changeSurrentStep = () => {
    currentStep.value = 4
    setTimeout(() => {
        router.replace('/twelve')
    }, 3000)
}

</script>

<template>
    <div v-if="currentStep == 1" class="step-one content">
        <div class="step-one-box">
            <p>请您在光线明亮的室内采取⼀个舒适的姿势开始测试，并且确保您的身后没有其他⼈的正脸出现。确保您的头发和脖⼦都处于屏幕中。您的头部可以轻微跟随视线的⽅向移动，但请勿剧烈摇摆您的头部</p>
            <div><img src="http://neuroweave.oss-cn-hangzhou.aliyuncs.com/depressed/photo/Task2_1.png" alt="" /></div>
        </div>
        <indicate title="这里有一本人物表情相册" image="http://neuroweave.oss-cn-hangzhou.aliyuncs.com/depressed/photo/Task2_1.png"></indicate>
    </div>
    <div v-if="currentStep == 2" class="step-one content">
        <div class="step-one-box">
            <p>这是一个有趣的注意力任务。如果你的注意力足够集中，你会发现旁边的圆圈会消失。</p>
            <div>
                <img src="http://neuroweave.oss-cn-hangzhou.aliyuncs.com/depressed/photo/Task2_2.png" alt="" />
            </div>
            <a-button class="btn" @click="handleClickBtn">确 定</a-button>
        </div>
        <indicate title="这是一个有趣的注意力任务。请盯着屏幕中心的红点，保持注意力直到任务结束。"
            image="http://neuroweave.oss-cn-hangzhou.aliyuncs.com/depressed/photo/Task2_1.png">
            <a-button class="btn" @click="handleClickBtn">确 定</a-button>
        </indicate>
    </div>
    <scheduleNumber v-if="currentStep == 3" />
    <mathNumber v-if="currentStep == 4" @change-surrent-step="changeSurrentStep" />
</template>

<style lang="less" scoped>
.content {
    display: flex;
    background: #fbf8e8;
    height: 100vh;
    align-items: center;
    justify-content: center;
}

.roll-number {
    height: 40px;
    font-size: 27px;
    font-weight: 500;
}

.ul-num {
    display: flex;
    height: 40px;
    transition: height .5s ease-in-out;
    overflow: hidden;
    text-align: center;
}

.step-one {
    background-color: #fff;

}

.num {
    // width: 25px;
    height: 40px;
    overflow: hidden;

    &>div {
        transform: translateY(-840px);
        transition: transform .5s;
        // transition-delay:1s
    }

    p {
        display: block;
        // width: 25px;
        height: 40px;
        line-height: 40px;
        text-align: right;
        color: #000;
        margin-bottom: 0;
    }
}
</style>