<script setup  lang='ts'>
import BackTableList from "./components/BackTableList.vue"

import { onMounted, ref } from 'vue'
import { videoType } from "@/apis/reportDetail/type"
import { getVideo } from "@/apis/reportDetail/index"

import { useRoute, useRouter } from 'vue-router'

const route = useRoute();
const router = useRouter()


const backList = ref<videoType[]>()
onMounted(async () => {
    let { estimateNum, taskType, type } = route.query
    const res = await getVideo({ estimateNum: estimateNum, taskType: taskType, type: type });
    console.log(res.data)
    if (res.code === 200 && res.data) {
        backList.value = res.data;
    } else {
        backList.value = [];
    }
})

const back = () => {
    router.go(-1)
}

</script>
<template>
    <div class="main-content">
        <div class="top" @click="back">
            <img class="top_01" src="@/assets/images/back.png" />
            <span class="top_02">返回</span>
        </div>
        <BackTableList :list="backList" />
    </div>
</template>

<style lang='less' scoped>
.top {
    width: 100%;
    height: 22px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
}

.top_01 {
    width: 21px;
    height: 21px;
    vertical-align: middle;
}

.top_02 {
    width: 64px;
    height: 22px;
    font-size: 16px;
    font-weight: bold;
    color: #222222;
    line-height: 22px;
    display: inline-block;
}

:deep(.ant-input-affix-wrapper) {
    border-radius: 8px;
    background: transparent !important;
}

:deep(.ant-input) {
    background: transparent !important;
}

:deep(.ant-btn) {
    border-radius: 8px;
}
</style>