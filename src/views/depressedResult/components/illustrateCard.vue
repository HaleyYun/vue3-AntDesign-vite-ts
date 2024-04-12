<template>
    <div class="title-card-box">
        <img class="left-img" src="../../../assets/images//card_left.png" alt="">{{ props.title }}
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
    font-size: 20px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #222222;
    line-height: 27px;
    display: flex;
    align-items: center;

    .left-img {
        width: 14px;
        height: 18px;
    }
}
</style>