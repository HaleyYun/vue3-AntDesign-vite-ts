<template>
    <div style="width: 100vw;height: 100vh; overflow-y: auto;" id="container" @scroll="handleScroll">
        <div class="screening-server-box">
            <div class="out-box" @click="router.back()"><img src="../../assets/images/sreeningServer/out.png" alt="">返回
            </div>
            <h1 style="font-weight: bold;">筛查服务</h1>
            <div class="item-box" v-for="(item, index) in dataList" :key="index">
                <div class="item-header">
                    <div class="item-idx">{{ index + 1 }}</div>
                    <p>服务产品名称：<span>{{ item.prodName }}</span></p>
                </div>
                <a-table class="my-Record-table" :columns="columns" :data-source="item.estimateOrderResList"
                    :pagination="false" :scroll="{ x: 1182 }">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.key === 'status'">
                            <p v-if="record.status === 0" class="status-box status-box1">已核销</p>
                            <p v-if="record.status === 1" class="status-box status-box2">使用中</p>
                            <p v-if="record.status === 2" class="status-box status-box3">已完成</p>
                        </template>
                        <template v-if="column.key === 'type'">
                            <p>{{ record.type === 2 ? "量表" : record.type === 3 ? "眼动" : "抑郁" }}</p>
                        </template>
                        <template v-if="column.key === 'status'">
                            <p>{{ record.status === 2 ? "数据分析中" : record.status === 3 ? "评估完成" : record.status === 4 ?
                                "评估失败" : "无法作答"
                            }}</p>
                        </template>
                        <template v-if="column.key === 'risk'">
                            <p
                                :style="{ color: record.risk == '正常' ? '#3D7EFF' : record.risk == '高风险' ? '#FF3B00' : '#FF3B00' }">
                                {{ record.risk }}</p>
                        </template>
                        <template v-if="column.key === 'operate'">
                            <button class="table-operate-box" @click="goDetails(record)">查看报告</button>
                        </template>
                    </template>
                </a-table>
            </div>
            <p class="btm-p-box" v-if="dataList.length == datatotal">暂无更多筛查服务~</p>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { getGroupList } from "@/apis/evalList/index"
import { useRouter, useRoute } from "vue-router";
import { debounce } from "../../utils/tools"

const router = useRouter()
const route = useRoute()

const dataList = ref<any>([])
const datatotal = ref(0)
const searchData = {
    archivesNo: String(route.query.archivesNo),
    pageNum: 1,
    pageSize: 10
}
const handleScroll = debounce(() => {
    const container = document.getElementById("container")
    console.log(container!.scrollTop, container!.clientHeight, container!.offsetHeight, container)
    if (container!.scrollTop + container!.clientHeight >= container!.scrollHeight - 80) {
        searchData.pageNum += 1;
        getDataList()
        console.log('到底了');
    }
}, 300, false)
const columns = ref([
    {
        title: '评估编号',
        dataIndex: 'estimateNum',
        key: 'estimateNum',
        align: "center",
        width: 220
    },
    {
        title: '项目类型',
        dataIndex: 'type',
        key: 'type',
        align: "center",
    },
    {
        title: '量表名称',
        dataIndex: 'estimateServeName',
        key: 'estimateServeName',
        align: "center",
        width: 200
    },
    {
        title: '评估状态',
        key: 'status',
        dataIndex: 'status',
        align: "center",
    },
    {
        title: '评估结果',
        dataIndex: 'risk',
        key: 'risk',
        align: "center",
    },
    {
        title: '评估时间',
        dataIndex: 'estimateTime',
        key: 'estimateTime',
        align: "center",
        width: 200,
    },
    {
        title: '筛查员工',
        dataIndex: 'assessor',
        key: 'assessor',
        align: "center",
    },
    {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        align: "center",
    },
]);

onMounted(() => {
    getDataList()
})

const getDataList = () => {
    getGroupList(searchData).then((res: any) => {
        console.log(res)
        if (res.code === 200) {
            datatotal.value = res.data.total;
            dataList.value.push(...res.data.data)
        }
    })
}
interface DAMNU_ENABLE {
    [key: string]: string, // 字段扩展声明
};

// 'AD-8': "/adReport?",
// 'MoCA': "/mocaresultPad?",
let enumObj: DAMNU_ENABLE = {
    "EDB-AD": "/eye/report/result?",
    'YY0001': "/depressedResult?",

    'MMSE': "/scaleResultPad?",
    'MoCA': "/scaleResultPad?",
    'AD-8': "/scaleResultPad?",
    'ADL': "/scaleResultPad?",
    'HADS': "/scaleResultPad?",
    'HAMA': "/scaleResultPad?",
    'HAMD-24': "/scaleResultPad?",
    'PHQ-9': "/scaleResultPad?",
    'GAD-7': "/scaleResultPad?",
    'FAQ': "/scaleResultPad?",
    'NPI-Q': '/scaleResultPad?',
    'Mini-cog': '/scaleResultPad?',
    'CFT': '/scaleResultPad?',
    'NINDS-CSN': '/scaleResultPad?',
    'DS': '/scaleResultPad?',
}
const goDetails = (item: any) => {
    router.push({
        path: "/reportRelast",
        query: {
            estimateNum: item.estimateNum,
            path: enumObj[item.estimateServeCode],
            checked: 'true',
        }
    })
}
</script>


<style lang="less">
p {
    margin-bottom: 0;
}

.screening-server-box {
    width: 100%;
    min-height: 100vh;
    padding: 38px 16px;
    box-sizing: border-box;
    background: #F3F3F3;
    // border-radius: 16px;
    position: relative;

    .out-box {
        display: flex;
        align-items: center;
        position: absolute;
        top: 41px;
        left: 33px;

        img {
            width: 22px;
            height: 22px;
        }

        font-size: 16px;
        font-family: PingFang-SC,
        PingFang-SC;
        font-weight: bold;
        color: #222222;
        line-height: 22px;
    }

    h1 {
        text-align: center;
        font-size: 28px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 600;
        color: #222222;
        line-height: 40px;
        margin-bottom: 18px;
    }

    .item-box {
        width: 100%;
        padding: 28px 33px;
        box-sizing: border-box;
        border-radius: 16px;
        margin-bottom: 16px;
        background: #FFFFFF;

        .item-header {
            display: flex;
            align-items: center;

            .item-idx {
                width: 25px;
                height: 25px;
                background: #3D7EFF;
                border-radius: 5px;
                text-align: center;
                font-size: 18px;
                font-family: PingFangSC, PingFang SC;
                font-weight: 600;
                color: #FFFFFF;
                line-height: 27px;
            }

            p {
                margin-bottom: 0;
                margin-left: 15px;
                font-size: 18px;
                font-family: PingFangSC, PingFang SC;
                font-weight: 400;
                color: #4A4A4A;
                line-height: 25px;

                span {
                    margin-left: 8px;
                    font-size: 18px;
                    font-family: PingFangSC, PingFang SC;
                    font-weight: 600;
                    color: #000000;
                    line-height: 25px;
                }
            }
        }

        .my-Record-table {
            margin-top: 23px;

            .table-operate-box {
                width: 78px;
                height: 26px;
                background: #F1F6FF;
                border-radius: 6px;
                border: none;
                font-size: 12px;
                font-family: PingFangSC, PingFang SC;
                font-weight: 400;
                color: #3D7EFF;
                line-height: 17px;
            }
        }
    }

    .btm-p-box {
        text-align: center;
        color: #999;
    }
}
</style>

<style>
.my-Record-table .ant-table-thead>tr>th {
    font-size: 16px !important;
    font-family: PingFang-SC, PingFang-SC;
    font-weight: bold !important;
    color: #222222;
    line-height: 22px;
}
</style>