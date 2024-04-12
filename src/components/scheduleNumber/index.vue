<script setup lang="ts">
import scheduleVoice from "@/components/scheduleVoice/index.vue"
import { useState } from '@/stores/state'
import { } from 'vue-router'
import { onMounted, ref } from 'vue'
const state = useState()
const props = defineProps({
    max: {
        type: Number,
        default: '16'
    }
})
const countRef = ref<any>()
const pboxRef = ref<any>()
const emit = defineEmits(['callBack'])
const pliRef = ref<any>(null)
const fatherRef = ref<any>(null)
const playRun = () => {
    if (state.scheduleNumberState > 0 && state.scheduleNumberState < props.max) {
        state.addScheduleNumberState()
        console.log(state.scheduleNumberState);
        let run: number = (props.max - state.scheduleNumberState) * 80
        pliRef.value.children[0].style.cssText = `transform: translateY(-${run}px);transition: transform .8s;`
    }
    if (state.scheduleNumberState === 0) {
        state.changeScheduleNumberState(1)
        let run: number = (props.max - 1) * 80
        pliRef.value.children[0].style.cssText = `transform: translateY(-${run}px);transition: transform .8s;`
    }
}
onMounted(() => {
    for (let i = props.max; i > 0; i--) {
        let pli = document.createElement("p")
        pli.innerText = i.toString()
        pboxRef.value.appendChild(pli)
    }
    setTimeout(() => {
        countRef.value.audioPlay()
        playRun()
    }, 500)
    setTimeout(() => {
        fatherRef.value.style.height = 0 + 'px'; 
    }, 2000)
    setTimeout(() => {
        emit("callBack")
    }, 2800)

})
</script>

<template>
    <div class="content">
        <div class="roll-number">
            <div ref="fatherRef" class="ul-num">
                <div ref="pliRef" class="num">
                    <div ref="pboxRef" class="p-box"></div>
                </div>
                <div class="afterstyle">
                    {{ max }}
                </div>
            </div>
        </div>
    </div>
    <scheduleVoice ref="countRef" />
</template>

<style lang="less" scoped>
.content {
    display: flex;
    background: #94826B;
    height: 100vh;
    align-items: center;
    justify-content: center;
}

.roll-number {
    height: 80px;
    font-size: 70px;
    font-weight: 500;
    font-family: MiSans Bold;
}

.ul-num {
    display: flex;
    height: 80px;
    transition: height .5s ease-in-out;
    overflow: hidden;
    text-align: center;
}

.num {
    height: 80px;
    overflow: hidden;

    &>div {
        transform: translateY(-1280px);
        transition: transform .5s;
    }

    p {
        display: block;
        height: 80px;
        line-height: 80px;
        text-align: right;
        color: #000;
        margin-bottom: 0 !important;
    }
}

.afterstyle {
    position: relative;
    line-height: 80px;
    margin-left: 16px;
    &::after {
        position: absolute;
        top: 16%;
        left: -10px;
        width: 6px;
        height: 57px;
        content: "";
        transform: rotate(18deg);
        display: block;
        background: #000;
    }
}
</style>