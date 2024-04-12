<template>
    <div class="content">
        <div class="top" @click="$router.push('/person/center')">
            <img class="top_01"
                src="@/assets/images/back.png" />
            <span class="top_02">用户协议</span>
        </div>
        <div class="con" v-html="agreementText"></div>
    </div> 
</template>
<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import { agreement } from '@/apis/user/index'
const agreementText = ref<string>('')

onMounted(() => {
    agreement({channelSource:2}).then((res) => {
        console.log(res)
        agreementText.value = res.data[0].serviceAgreement
    })
})

</script>

<style lang='css' scoped>
    .content {
        width: auto;
        height: 100%;
        background: #FFFFFF;
        border-radius: 16px;
        box-sizing: border-box;
        padding: 15px 15px;
        position: relative;
    }

    .top {
        display: flex;
        align-items: center;
        width: 100%;
        margin-top: 26px;
    }

    .top_01 {
        display: block;
        width: 21px;
        height: 21px;
    }

    .top_02 {
        width: 80px;
        height: 22px;
        font-size: 16px;
        font-weight: bold;
        color: #222222;
        line-height: 22px;
        display: inline-block;
    }
    .con{
        height:630px;
        overflow-y: scroll;
    }
    
</style>