<script setup  lang='ts'>
import { ref } from 'vue';
// import { useRouter } from 'vue-router'
// import StatisticsPicture from './StatisticsPicture.vue';
import StatisticeEcharts from "@/components/PictureCategory/StatisticeEcharts.vue"
type ItemType = {
    name: string
    referValue: string
    value: string
    valueUnit: string
    type: string
};

// const router = useRouter()
// const splitStr = (str: string) => str.substring(0, str.length - 4)
defineProps({
    list: {
        type: Array,
    },
})
const echartsKey = ref(0)
const itemData = ref<ItemType>()
const columns = ref<any[]>([
    {
        title: '项目',
        dataIndex: 'name',
        key: 'name',
        align: "center"

    },
    {
        title: '结果',
        dataIndex: 'value',
        key: 'value',
        align: "center"

    },
    {
        title: '参考',
        dataIndex: 'referValue',
        key: 'referValue',
        align: "center"

    },
    {
        title: '单位',
        dataIndex: 'valueUnit',
        key: 'valueUnit',
        align: "center"

    },
    {
        title: '图表',
        dataIndex: 'chart',
        key: 'chart',
        align: "center"

    },
])


// 点击查看统计图
const showModal = (obj: ItemType) => {
    console.log("obj", obj);
    itemData.value = obj
    // visible.value = true;
    echartsKey.value += 1;
}

// const visible = ref<boolean>(false);

</script>
<template>
    <div class="subscribe">
        <a-table :data-source="list" :columns="columns" :pagination="false" class="subscribe-list">
            <template #bodyCell="{ column, record, text }">

                <template v-if="column.key === 'name'">
                    <strong>{{ text }}</strong>
                </template>
                <template v-if="column.key === 'value'">
                    <strong>{{ text }}</strong>
                </template>
                <template v-if="column.key === 'referValue'">
                    <strong>{{ text }}</strong>
                </template>
                <template v-if="column.key === 'valueUnit'">
                    <strong>{{ text }}</strong>
                </template>
                <template v-if="column.key === 'chart'">
                    <div class="yet-make">
                        <a-button type="link" @click="showModal(record)">点击查看</a-button>
                    </div>
                </template>
            </template>
        </a-table>

        
        <!-- <div>
        <a-modal v-model:visible="visible" :width="1100" :footer="null" >
            <StatisticeEcharts v-if="visible" :itemData="itemData" class="echarts-box"/>
        </a-modal>-->
        <div class="echart-box">
            <StatisticeEcharts :itemData="itemData" class="echarts-box" :key="echartsKey" />
        </div>
    </div> 
    

        
</template>

<style lang='less' scoped>
.subscribe {
    background: #f3f3f3;
    display: flex;
    justify-content: space-between;
}

.subscribe-list {
    width: 890px;
    border-radius: 10px;
    padding: 15px;

    strong {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #686868;
    }

    .font-wei {
        font-weight: 500;
    }
}

.echart-box {
    width: 345px;
    height: 330px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 3px 3px 3px #ddd;
    margin: 10px;
    padding:15px;
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

.result-5 {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #0BC12E;
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

.yet-bg {
    width: 78px;
    height: 26px;
    background: #9A9A9A;
    border-radius: 6px;
    opacity: 0.07;
}

:deep(.ant-table-cell) {
    color: #222222;
}

.chart_bottom {
    text-align: center;
}

.chart_bottom span:nth-child(1) {
    width: 10px;
    height: 10px;
    background: #40B761;
    border-radius: 6px;
    display: inline-block;
    margin-right: 5px;
}

.chart_bottom span:nth-child(2) {
    width: 48px;
    height: 17px;
    font-size: 12px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #323233;
    line-height: 17px
}

.echarts-box {
    margin: 0 auto;
}
</style> 