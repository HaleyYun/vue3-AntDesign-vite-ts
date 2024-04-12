<script setup lang="ts">
import { useState } from "@/stores/state"
import { onMounted, ref } from 'vue'
const depressedState = useState()
const props = defineProps({
    max: {
        type: Number,
        default: '16'
    }
})
// const countRef = ref<any>()
const pboxRef = ref<any>()
const emit = defineEmits(['callBack'])
const pliRef = ref<any>(null)
const fatherRef = ref<any>(null)
const playRun = () => {
    if (depressedState.scheduleNumberState > 0 && depressedState.scheduleNumberState <= props.max) {

        // alert(depressedState.scheduleNumberState + '!!!!!!!')
        depressedState.addScheduleNumberState()
        console.log(depressedState.scheduleNumberState);
        let run: number = (props.max - depressedState.scheduleNumberState) * 80.55 * window.innerWidth / 1280
        pliRef.value.children[0].style.cssText = `transform: translateY(-${run}px);transition: transform .8s;`
    }
    if (depressedState.scheduleNumberState === 0) {

        // alert(depressedState.scheduleNumberState + '~~~~~~~~~~')
        depressedState.changeScheduleNumberState(1)
        let run: number = (props.max - 1) * 80.55 * window.innerWidth / 1280
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
        // countRef.value.audioPlay()
        playRun()
    }, 500)

    setTimeout(() => {
        fatherRef.value.style.height = 0 + 'px';
    }, 2000)
    setTimeout(() => {
        emit("callBack")
    }, 2500)

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
</template>

<style lang="less" scoped>
.content {
    background: #94826B;
    align-items: center;
    justify-content: center;
}

.roll-number {
    height: 80px;
    line-height: 80px;
    font-size: 80px;
    text-align: center;
    color: #000;
    font-weight: 500;
    font-family: MiSans Bold;
}

.ul-num {
    display: flex;
    height: 80px;
    line-height: 80px;
    transition: height .5s ease-in-out;
    overflow: hidden;
    text-align: center;
}
.p-box{
    margin-top:-3px;
}

.num {
    height: 80px;
    line-height: 80px;
    overflow: hidden;
    font-weight: 500;
    font-size: 80px;

    @media only screen and (max-width: 1280px) {
        &>div {
            transform: translateY(-1150px);
            transition: transform .5s;
        }
    }

    @media only screen and (max-width: 1920px) {
        &>div {
            transform: translateY(-1280px);
            transition: transform .5s;
        }
    }

}


.afterstyle {
    position: relative;
    line-height: 80px;
    margin-left: 16px;

    &::after {
        position: absolute;
        top: 20%;
        left: -10px;
        width: 6px;
        height: 56px;
        content: "";
        transform: rotate(18deg);
        display: block;
        background: #000;

        @media only screen and (max-width: 1200px) {
            top: 16%;
            height: 53px;
        }

        @media only screen and (max-width: 1280px) {
            top: 16%;
            height: 53px;
        }

        @media only screen and (max-width: 2000px) {
            top: 18%;
            height: 53px;
        }
        @media only screen and (max-width: 2560px) {
            top: 19%;
            height: 58px;
        }
    }
}
</style>