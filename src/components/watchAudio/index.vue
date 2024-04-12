<script setup  lang='ts'>
import { } from 'vue-router'
import {ref} from 'vue'
defineProps({
    audioPath: {
        type: String,
    },
})
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
    <audio ref="audoRef" class="audiodom" :muted="isMuted" :src="audioPath" controls></audio> 
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