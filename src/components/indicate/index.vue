<script setup  lang='ts'>
import { } from 'vue-router'
import { } from 'vue'
defineProps({
    title: {
        type: String,
    },
    image: {
        type: String,
    },
})

</script>
<template>
    <div class="step-one-box">
        <slot name="oneTitle"></slot>
        <p class="two-title">{{ title }}</p>
        <div>
            <img :src="image" alt="" />
        </div>
        <slot></slot>

    </div>
</template>

<style lang='less' scoped>
.step-one-box {
    p {
        font-size: 50px;
        font-weight: 500;
    }

    &>div {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 300px;
        height: 160px;
        border: 2px solid #b3aaaa;
        border-radius: 10px;
        overflow: hidden;
        margin: 0 auto;

        img {
            display: block;
            // width: 65%;width: 65%;
            height: 82%;
        }
    }

    .btn {
        display: block;
        margin: 0 auto;
        margin-top: 14px;
        width: 170px;
        height: 40px;
        background-color: rgb(97, 116, 158);
        color: #fff;
        font-size: 17px;
        border-radius: 6px;
    }
}

.two-title {
    text-align: center;
    font-size: 30px !important;
}
</style>