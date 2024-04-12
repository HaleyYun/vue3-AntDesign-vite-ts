<script setup  lang='ts'>
import StatisticsTableList from "./components/StatisticsTableList.vue"
// import { } from 'vue-router'
// import type {eyeTable,imageMemoryTable} from "@/apis/EvaluationRecord/type"
import { onMounted, ref } from 'vue'
const route=useRoute();
import {useRoute,useRouter } from 'vue-router'
const router = useRouter()

import {getReportStore} from "@/stores/Report"
const reportStore = getReportStore()


const resultList = ref<any[]>()
onMounted(async () => {
    let taskType = route.query.taskType
    let type = route.query.type
    if(taskType=='3' && type=='1'){
        //眼动任务
        resultList.value = reportStore.eyeTableList
    }

    if(taskType=='3' && type=='2'){
        //图片记忆碎片任务
        resultList.value = reportStore.imageMemoryTableList
    }
})

const back = ()=> {  

    router.go(-1)  

}  

</script>
<template>
    <div class="main-content">
        <div class="top" @click="back">
            <img class="top_01"
                src="@/assets/images/back.png" />
            <span class="top_02">返回</span>
        </div>
        <StatisticsTableList :list="resultList" />
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