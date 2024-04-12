<template>
    <div class="title-card-box">
        <div class="left-box"></div>{{ props.title }}
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    title: {
        type: String,
        required: true,
        default: '----'
    }
});
</script>

<style lang="less" scoped>
.title-card-box {
    font-size: 30px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #222222;
    line-height: 43px;
    display: flex;
    align-items: center;

    .left-box {
        width: 8px;
        height: 22px;
        background: #5766FE;
        border-radius: 4px;
        margin-right: 5px;
    }
}
</style>