<script setup  lang='ts'>
import { } from 'vue-router'
import { onMounted, ref } from 'vue'
const emits = defineEmits(['changeStatus'])
onMounted(() => {


})
defineProps<{
    dateTime:number[]
    unit:string
}>()
const current = ref<number>(0)
const handleScroll = (e: any) => {
    console.log( e.target.scrollTop);
    let scrollTop = e.target.scrollTop
    let time = setTimeout(() => {
        if(scrollTop ===0){
            current.value=0
            emits("changeStatus", current.value)
            return
        }
        current.value=(scrollTop / 60)
        emits("changeStatus",current.value)
        clearTimeout(time);
    }, 100);
}

</script>
<template>
    <div class="div">
        <ul class="box" @scroll="handleScroll">
            <!-- /* 开头需要空两行*/ -->
            <li></li>
            <li v-for="(item, index) in dateTime" :key="index">{{ item }}{{ unit }}</li>
        </ul>
    </div>
</template>

<style lang='less' scoped>
/* 最大盒子 */
.box {
    list-style: none;
    width: 100%;
    height: 180px;
    overflow: auto;
    scroll-snap-type: y mandatory;
}

.box li {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 1.2rem;
    color: #333;
    scroll-snap-align: start;
    box-shadow: inset 0px 0px 57px 24px #fff
}

.box li:last-child {
    margin-bottom: 120px;
}

/* 整体居中 */
.div {
    width: 100%;
    height: 180px;
    position: relative;
    // background: linear-gradient(to bottom, rgba(117, 107, 128, 0.3) 0%, rgba(117, 107, 128, 0) 25%, rgba(117, 107, 128, 0) 75%, rgba(117, 107, 128, .3) 100%);
    // box-shadow: inset 0px 0px 12px rgba(0, 0, 0, .2);
    border-radius: 12px;

    // &::before {
    //     content: '';
    //     position: absolute;
    //     top: 0px;
    //     left: 0;
    //     width: 100%;
    //     height: 300px;
    //     box-shadow: inset 0px 0px 57px 24px #fff
    // }
}

/* 选择框 */
.div::after {
    content: '';
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    height: 60px;
    background: linear-gradient(to bottom, rgba(117, 107, 128, 0.1) 0%, rgba(117, 107, 128, 0.1) 100%);
    pointer-events: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, .12);
}


::-webkit-scrollbar {

    display: none;
}
</style>