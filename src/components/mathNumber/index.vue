<script setup lang="ts">
import { useModeStateStore } from '@/stores/bootMode'
import { } from 'vue-router'
import { onMounted, ref } from 'vue'
const emit = defineEmits(['callBack'])
const modeStateStore = useModeStateStore()
const numBoxRef = ref<any>(null)
const current = ref<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
const playRun = () => {
    let numBox: any = numBoxRef.value
    let pLi: any = numBoxRef.value.children
    let arr: any = current.value;
    let b: Array<number> = []
    let foot: number = -2
    let currentTop: number = 0
    sortarr()
    numBox.innerHTML = numBox.innerHTML + numBox.innerHTML
    numBox.style.height = pLi[0].offsetHeight * pLi.length + 'px'
    let time = setInterval(move, 3)

    let timer = setTimeout(() => {
        clearInterval(time)
        if (numBox.offsetTop % 80 !== 0) {
            let num = 80 - (numBox.offsetTop % 80)
            numBox.style.top = numBox.offsetTop + num + 'px'
        }
        audioPlay()
        clearTimeout(timer)   
    }, 2000) 
    let setTime = setTimeout(() => {
        currentTop = parseInt(pLi[Math.round(-(numBox.offsetTop) / 50)]?.innerHTML)
        emit('callBack', currentTop)
        clearTimeout(setTime) 
    }, 2500)
    function move() {
        if (numBox.offsetTop < -numBox.offsetHeight / 2) {
            numBox.style.top = '0' + 'px'
        }
        if (numBox.offsetTop > 0) {
            numBox.style.top = -numBox.offsetHeight / 2 + 'px'
        }
        numBox.style.top = numBox.offsetTop + foot + 'px'
        currentTop = numBox.offsetTop + foot
    }
    function sortarr() {
        for (let i = 0; i < arr.length; i++) {
            if (i > 0 && b[i] === b[i - 1]) {
                let a = Math.ceil(Math.random() * 1000000000 % 9)
                b[i] = arr[a]
                pLi[i].innerHTML = arr[a]
            } else {
                let a = Math.ceil(Math.random() * 1000000000 % 9)
                b[i] = arr[a]
                pLi[i].innerHTML = arr[a]
            }
        }
    }

}
onMounted(() => {
    playRun()
})
const audoRef=ref<any>()
const isMuted=ref<boolean>(true)
const audioPlay=()=>{
    isMuted.value=false
    audoRef.value.play()
}

</script>
<template>
    <div class="content">
        <div class="box">
            <div ref="numBoxRef" class="num-box">
                <div class="pi">0</div>
                <div class="pi">1</div>
                <div class="pi">2</div>
                <div class="pi">3</div>
                <div class="pi">4</div>
                <div class="pi">5</div>
                <div class="pi">6</div>
                <div class="pi">7</div>
                <div class="pi">8</div>
                <div class="pi">9</div>
            </div>
        </div>
    </div>
    <video ref="audoRef" class="audiodom" :muted="isMuted" :src="modeStateStore.correctFrameVoice" controls></video> 
</template>

<style lang="less" scoped>
.content {
    position: relative;
    top: 0px;
    background: #94826B;
    height: 100vh;
    text-align: center;
}

.box {
    position: fixed;
    width: 400px;
    height: 80px;
    margin: 0 auto;
    overflow: hidden;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    // background-color: #d91a1a;
}

.num-box {
    position: absolute;
    width: 100%;
    top: 0;
}

.pi {
    height: 80px;
    width: 100%;
    text-align: center;
    line-height: 80px;
    font-size: 70px;
    font-weight: 600;
    // &:nth-child(2n){
    //     background-color: #2868d6;
    // }
}
.audiodom{
    position: absolute;
    top: 0;
    left: 0;
    visibility: hidden;
    opacity: 0;
}
</style>