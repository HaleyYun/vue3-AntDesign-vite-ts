<!-- 按钮声音 -->
<script setup  lang='ts'>
import { } from 'vue-router'
import { useModeStateStore } from '@/stores/bootMode'
import {ref} from 'vue'
const modeStateStore = useModeStateStore()
const emit= defineEmits(['stop'])

const audoRef=ref<any>()
const isMuted=ref<boolean>(true)
const audioPlay=()=>{
    isMuted.value=false
    audoRef.value.play()
    audoRef.value.addEventListener('ended',()=>{
        emit("stop")
    },false)
}
defineExpose({
    audioPlay,
}) 
</script>
<template>
    <video ref="audoRef" class="audiodom" :muted="isMuted" :src="modeStateStore.nextStepVoice" controls></video> 
</template>

<style lang='less' scoped>
.audiodom{
    position: absolute;
    top: 0;
    left: 0;
    visibility: hidden;
    opacity: 0;
}
</style>