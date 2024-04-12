<script setup  lang='ts'>
import { } from 'vue-router'
import { onMounted, ref ,nextTick} from 'vue'
const props = withDefaults(defineProps<{
    num: number
    unit: string
    currentNum: number
}>(),
    {
        num: 400,
        unit: 'kg',
        currentNum: 150
    }
)
const emits = defineEmits(['getData'])
const left = ref<number>(0)
const dX = ref<number>(0)
const yx = ref<number>(0)
const flang = ref<boolean>(false)
const speed = ref<number>(0.1)//速度
const oul = ref<number>(0)

onMounted(() => {
   nextTick(()=>{
    console.log("props.currentNum",props.currentNum);
    left.value -= (props.currentNum * 10)
    oul.value = props.num*10;
   })
})
const MouserDownEvent = (e?: any) => {
    e.preventDefault()
    e.stopPropagation()
    flang.value = true;
    dX.value = e.targetTouches[0].clientX
}
const MouserMoveEvent = (e?: any) => {
    if (!flang.value) return;
    yx.value = e.targetTouches[0].clientX
    let a = (yx.value - dX.value) * speed.value
    left.value += parseInt(a.toString())
    if (left.value > 0) {
        left.value = 0
    }
    if (-oul.value > left.value) {
        left.value = -oul.value
    }
}
const MouserUpEvent = () => {
    flang.value = false
    if(left.value % 10!==0){
        left.value=left.value-((left.value % 10)+10)
    }
    let data: number = Math.abs(left.value / 10)
    console.log(data);
    
    emits('getData', data)
}
const HandClickLeft = () => {
    left.value = left.value + 10
    if (left.value > 0) {
        left.value = 0
    }
    let data: number = Math.abs(left.value / 10)
    emits('getData', data)
}
const HandClickRight = () => {
    left.value -= 10
    if (-oul.value > left.value) {
        left.value = -oul.value
    }
    let data: number = Math.abs(left.value / 10)
    emits('getData', data)
}

</script>
<template>
    <div class="main">
        <div class="content" @touchstart.capture="MouserDownEvent" @touchmove.capture="MouserMoveEvent"
            @touchend.capture="MouserUpEvent">
            <div class="size" :style="{ 'transform': `translateX(${left}px)` }">
                <template v-for="(item, index) in num + 1" :key="index">
                    <div v-if="index % 5 === 0" :key="item"><span>{{ index }}</span></div>
                    <div v-else></div>
                </template>
            </div>
        </div>
        <div class="pointer">
            <span>{{ currentNum }} {{ unit }}</span>
        </div>
        <div class="up" @click="HandClickLeft"></div>
        <div class="next" @click="HandClickRight"></div>
    </div>
</template>

<style lang='less' scoped>
.main {
    position: relative;
    width: 400px;
    margin: 20px auto;
}

.content {
    position: relative;
    display: flex;
    width: 400px;
    height: 82px;
    overflow-x: hidden;

    &::after {
        content: "";
        display: block;
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        pointer-events: none;
        background: linear-gradient(90deg, #ffffff 0%, rgba(255, 255, 255, 0) 50%, #ffffff 100%);

    }
}

.size {
    transition: all ease;
    width: auto;
    white-space: nowrap;
    padding-left: 100px;
    transform: translateX(0px);

    div {
        display: inline-block;
        position: relative;
        width: 1px;
        margin-right: 9px;
        height: 29px;
        background: #EAEAEA;
        /* border-right: 1px solid #EAEAEA; */
    }
}

/* .size div:nth-child(1){
            border-left: 1px solid #EAEAEA;
            border-right: 1px solid #EAEAEA;
        } */

.size div>span {
    position: absolute;
    bottom: -28px;
    left: -8px;
    width: 100%;
}

.pointer {
    position: absolute;
    top: 0px;
    left: 100px;
    width: 2px;
    border-left: 1px solid #EAEAEA;
    height: 50px;
    border-color: #222222;

    &>span {
        display: block;
        position: absolute;
        bottom: -15px;
        left: 50%;
        transform: translateX(-50%);
        width: 62px;
        background: #fff;
        color: #000;
        height: 24px;
        text-align: center;
        font-weight: bold;
    }
}

.size div:nth-child(5n+1),
.size div:nth-child(1) {
    background: #929292;
}

.size div.active {
    height: 40px;
    border-color: #222222;
}

.next,
.up {
    position: absolute;
    top: 29%;
    width: 0px;
    height: 0px;
    border-width: 8px;
    border-style: solid;
    border-color: transparent;
}

.up {
    left: -26px;
    border-right-color: #222222;
}

.next {
    right: -26px;
    border-left-color: #222222;
}

::-webkit-scrollbar {

    // display: none;
}
</style>