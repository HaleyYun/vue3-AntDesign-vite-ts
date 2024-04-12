<template>
    <div class="prompt-box">
        <div></div>
        <p>{{ title }}</p>
    </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'
const props = defineProps({
    //子组件接收父组件传递过来的值
    title: String,
})
//使用父组件传递过来的值
const { title } = toRefs(props)
</script>

<style lang="less">
.prompt-box {
    width: 100%;
    display: flex;
    align-items: center;

    div {
        width: 6px;
        height: 16px;
        background: #5766FE;
        border-radius: 3px;
    }

    p {
        font-size: 18px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 600;
        color: #000000;
        line-height: 25px;
        margin: 0 0 0 4px;
    }
}
</style>