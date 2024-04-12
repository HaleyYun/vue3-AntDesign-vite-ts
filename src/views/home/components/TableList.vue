<script setup  lang='ts'>
import { onMounted, ref } from 'vue';

defineProps({
    list: {
        type: Array,
    },
})
let scrollY = ref<number>(230)
onMounted(() => {
    scrollY.value = scrollY.value * window.innerWidth / 1280;
})
const maskName = (name: any) => {
    if (typeof name !== 'string') {
        return name;
    }

    if (name.length <= 1) {
        return name;
    }
    const firstChar = name.charAt(0);
    const maskedChars = '*'.repeat(name.length - 1);
    return firstChar + maskedChars;
}

const columns = [
    {
        title: '客户',
        dataIndex: 'client',
        align: "center"
    },
    {
        title: '筛查项目',
        dataIndex: 'project',
        align: "center"
    },
    {
        title: '日期',
        dataIndex: 'date',
        align: "center"
    },
    {
        title: '结果',
        dataIndex: 'risk',
        align: "center"
    },
    {
        title: '状态',
        dataIndex: 'status',
        align: "center"
    },
];

</script>
<template>
    <a-table :data-source="list" :columns="columns" :pagination="false" class="clientele" :scroll="{ y: scrollY }">
        <template #bodyCell="{ column, record, text }">

            <template v-if="column.dataIndex === 'client'">
                {{ maskName(record.customName) }}
                <!-- +splitStr2(record.customName) -->
            </template>
            <template v-if="column.dataIndex === 'project'">
                {{ record.estimateServeName }}
            </template>
            <template v-if="column.dataIndex === 'date'">
                {{ record.estimateTime.split('T')[0] }}
            </template>
            <template v-if="column.dataIndex === 'result'">
                <div style="color:#3C86FE" v-if="record.estimateResult == '正常'" class="result-1">
                    {{ record.estimateResult }}
                </div>
                <div style="color:#F1C12E" v-if="record.estimateResult == '低风险'" class="result-2">
                    {{ record.estimateResult }}
                </div>
                <div style="color:#FF7D07" v-if="record.estimateResult == '中风险'" class="result-3">
                    {{ record.estimateResult }}
                </div>
                <div style="color:#FE3B00" v-if="record.estimateResult == '高风险'" class="result-4">
                    {{ record.estimateResult }}
                </div>
            </template>
            <template v-if="column.dataIndex === 'status'">

                <div style="color:orange" v-if="text == 2" class="yet-make">
                    数据解析中
                </div>
                <div style="color:#24C07B" v-if="text == 3" class="yet-make">
                    评估完成
                </div>
                <div style="color:#FE3B00" v-if="text == 4" class="yet-make">
                    评估失败
                </div>
                <div style="color:#FE3B00" v-if="text == 5" class="yet-make">
                    无法作答
                </div>
            </template>
        </template>
    </a-table>
</template>

<style lang='less' scoped>
// .clientele{

// }
.yet-make {
    color: #24C07B;
    font-size: 10px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        display: inline-block;
        width: 16px;
        margin-right: 2px;
    }
}

.result-1 {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #3D7EFF;
}

.result-2 {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #E99607;
}

.result-3 {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FF5700;
}

.result-4 {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FF0000;
}

.yet-fail {
    font-size: 10px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #FE3B00;
}

.yet-fail img {
    width: 10px;
    height: 10px;
}

.yet-make img {
    width: 10px;
    height: 10px;
}
</style>

<style>
.clientele .ant-table-header {
    border-radius: 6px !important;
}
</style>