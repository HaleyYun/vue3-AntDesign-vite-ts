<template>
    <div class="equity-box">
        <div class="hander-box">
            <div class="tab-itme-box" :class="tabListActive === index ? 'tab-itme-box-active' : ''"
                v-for="(item, index) in tabList" :key="index" @click="changeTab(index)">{{ item.lable }}
            </div>
        </div>
        <div class="content-box">
            <div class="operate-box">
                <div class="operate-box-left">
                    <a-input v-model:value="activationCode" placeholder="请输入激活码进行核销～" />
                    <button @click="writeOffInspect">立即核销</button>
                </div>
                <a-input v-model:value="searchData.blurName" class="operate-box-right-input" placeholder="请输入客户姓名、联系电话、激活码～"
                    @change="onChange(1)">
                    <template #prefix>
                        <img class="search-icon" src="../../assets/images/equity/search-icon.png" alt="">
                    </template>
                </a-input>
            </div>
            <load :status="loadStatus" :schedule="schedule" v-if="data?.length == 0"></load>
            <a-table v-if="data?.length != 0" class="my-Record-table" :columns="columns" :data-source="data"
                :pagination="false" :scroll="{ y: scrollY, x: 2000 }">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'status'">
                        <p v-if="record.status === 0" class="status-box status-box1">已核销</p>
                        <p v-if="record.status === 1" class="status-box status-box2">使用中</p>
                        <p v-if="record.status === 2" class="status-box status-box3">已完成</p>
                    </template>
                    <template v-if="column.key === 'serviceTimes'">
                        <p>{{ (record.checkedCount || 0) + "/" + (record.sumCheckCount || 0) }}</p>
                    </template>
                    <template v-if="column.key === 'clientName'">
                        <p>{{ record.clientName || "--" }}</p>
                    </template>
                    <template v-if="column.key === 'source'">
                        <p>{{ record.source ? record.source + "端" : "--" }}</p>
                    </template>
                    <template v-if="column.key === 'phone'">
                        <p>{{ record.phone || "--" }}</p>
                    </template>
                    <template v-if="column.key === 'operate'">
                        <button class="table-operate-box" v-if="record.status !== 2"
                            @click="useActivation(record)">立即使用</button>
                        <button class="table-operate-box" @click="goDetails(record)">查看详情</button>
                    </template>
                </template>
            </a-table>
            <a-pagination v-if="data?.length != 0" class="my-pagination" :show-total="(total: number = 0) => `共 ${total} 条`"
                v-model:current="searchData.pageNum" responsive v-model:pageSize="searchData.pageSize" show-quick-jumper
                :total="total" @change="onChange" showSizeChanger :page-size-options="pageSizeOptions" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { pageQuery, equityExchange } from "../../apis/equity/index"
import { PageQueryResData } from "../../apis/equity/type"
import { useRouter } from 'vue-router';
import { useState } from '@/stores/state';
import { message } from 'ant-design-vue';
import { pageTabStatus } from "@/stores/pageTabStatus"
import load from "../../components/load/load.vue"
const state = useState();
const tabStatus = pageTabStatus()

const router = useRouter()
const tabList = [
    { lable: "全部", value: "" },
    { lable: "已核销", value: 0 },
    { lable: "使用中", value: 1 },
    { lable: "已完成", value: 2 },
]
let loadStatus = ref<string>('loading') //loading-加载中,noData-无数据,failure-加载失败
let schedule = ref<number>(0) //加载中进度
const tabListActive = ref(0)
let scrollY = ref<number>(0)
scrollY.value = 460 * window.innerHeight / 800;
const activationCode = ref("");
const searchData = ref<{ pageNum: number, pageSize: number, blurName: string, status: string | number }>({ pageNum: 1, pageSize: 5, blurName: "", status: "" })
let total = ref<number>(0);
const pageSizeOptions = ref<string[]>(['5', '10', '20', '30', '40', '50']);
const data = ref<PageQueryResData[]>();
const columns = ref([
    {
        title: '工单编号',
        dataIndex: 'ticketsEquityCode',
        key: 'ticketsEquityCode',
        width: 150,
        align: 'center'
    },
    {
        title: '权益名称',
        dataIndex: 'equityName',
        key: 'equityName',
        width: 200,
        align: 'center'
    },
    {
        title: '客户姓名',
        dataIndex: 'clientName',
        key: 'clientName',
        width: 100,
        align: 'center'
    },
    {
        title: '联系电话',
        key: 'phone',
        dataIndex: 'phone',
        width: 150,
        align: 'center'
    },
    {
        title: '服务次数',
        dataIndex: 'serviceTimes',
        key: 'serviceTimes',
        width: 100,
        align: 'center'
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 90,
        align: 'center'
    },
    {
        title: '激活码',
        dataIndex: 'activeCode',
        key: 'activeCode',
        width: 250,
        align: 'center'
    },
    {
        title: '工单来源',
        dataIndex: 'source',
        key: 'source',
        width: 90,
        align: 'center'
    },
    {
        title: '操作人员',
        dataIndex: 'createUser',
        key: 'createUser',
        width: 150,
        align: 'center'
    },
    {
        title: '操作时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        width: 250,
        align: 'center'
    },
    {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        fixed: 'right',
        width: 170,
        align: 'center'
    },
]);

onMounted(() => {
    tabListActive.value = tabStatus.equityTab
    searchData.value.blurName = tabStatus.equityStr
    searchData.value.status = tabList[tabListActive.value].value;
    getList()
})

const getList = () => {
    pageQuery(searchData.value).then(res => {
        console.log(res)
        if (res.code === 200) {
            data.value = res.data?.data || [];
            total.value = res.data?.total || 0;
            if (res.data.total == 0) {
                loadStatus.value = 'noData';
            }
        } else {
            loadStatus.value = 'failure';
        }
    })
}

const changeTab = (i: number) => {
    tabListActive.value = i;
    tabStatus.equityTab = i
    searchData.value.status = tabList[tabListActive.value].value;
    searchData.value.pageNum = 1;
    searchData.value.pageSize = 5;
    data.value = [];
    getList()
}

const onChange = (e: any) => {
    tabStatus.equityStr = searchData.value.blurName
    searchData.value.pageNum = e;
    getList()
}

let btnSwitch = true;
const writeOffInspect = () => {
    if (!btnSwitch) {
        message.warning("请勿重复点击")
        return
    }
    btnSwitch = false;
    equityExchange({ activeCode: activationCode.value }).then(res => {
        btnSwitch = true;
        if (res.code === 200) {
            activationCode.value = "";
            message.success(res.data)
            getList()
        }
    })
}

const useActivation = (row: PageQueryResData) => {
    console.log(row)
    if (row.isUpperLimit === 0) {
        message.warning({ content: `当日${row.clientName}用户服务已上限，请${row.checkInterval}天后再进行使用`, duration: 5 })
        return
    }
    if ((row.status === 0 && row.clientName && row.phone) || row.status === 1) {
        state.fromUrl = "equity";
        state.isView = 0;
        router.push({
            path: "/servicePack",
            query: {
                ticketCode: row.ticketsEquityCode,
                from: "equity"
            }
        })
    } else {
        router.push({
            path: "/writeOff",
            query: {
                activeCode: row.activeCode,
                ticketsEquityCode: row.ticketsEquityCode
            }
        })
    }
}

const goDetails = (row: PageQueryResData) => {
    router.push({
        path: "/equityDetails",
        query: {
            ticketsEquityCode: row.ticketsEquityCode
        }
    })
}

</script>

<style lang="less">
.equity-box {
    width: 100%;
    height: 100%;
    border-radius: 15px;
    background: #FFFFFF;
    display: flex;
    flex-direction: column;

    .hander-box {
        width: 100%;
        height: 66px;
        background: #FFFFFF;
        box-shadow: 0px 0 4px 0px rgba(#5E5E5E, 0.13);
        border-radius: 15px 15px 0px 0px;
        padding: 0 27px;
        box-sizing: border-box;
        display: flex;

        .tab-itme-box {
            width: 77px;
            height: 100%;
            text-align: center;
            font-size: 19px;
            font-family: PingFangSC, PingFang SC;
            font-weight: bold;
            color: #707070;
            line-height: 66px;

        }

        .tab-itme-box-active {
            position: relative;
            color: #3D7EFF;

            &::after {
                content: "";
                width: 77px;
                height: 4px;
                display: block;
                background: #3D7EFF;
                border-radius: 2px;
                position: absolute;
                bottom: 0;
                left: 0;
            }
        }
    }

    .content-box {
        width: 100%;
        flex: 1;
        padding: 0 20px;
        box-sizing: border-box;
        border-radius: 0 0 15px 15px;
        display: flex;
        flex-direction: column;

        .operate-box {
            width: 100%;
            height: 66px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .search-icon {
                width: 10px;
                height: 11px;
            }

            .operate-box-left {
                display: flex;
                align-items: center;

                .ant-input {
                    width: 246px;
                    height: 36px;
                    border-radius: 8px;
                }

                button {
                    width: 76px;
                    height: 36px;
                    background: #3D7EFF;
                    border-radius: 8px;
                    border: none;
                    font-size: 11px;
                    font-family: PingFangSC, PingFang SC;
                    font-weight: 600;
                    color: #FFFFFF;
                    line-height: 16px;
                    margin-left: 17px;
                }
            }

            .operate-box-right-input {
                width: 246px;
                height: 36px;
                border-radius: 8px;
            }
        }

        .my-Record-table {
            flex: 1;

            p {
                margin-bottom: 0;
            }

            .status-box {
                font-size: 12px;
                font-family: PingFangSC, PingFang SC;
                font-weight: 500;
                line-height: 17px;
            }

            .status-box1 {
                text-decoration: line-through;
                color: #C4C4C4;
            }

            .status-box2 {
                color: #5DAD66;
            }

            .status-box3 {
                color: #3D7EFF;
            }

            .table-operate-box {
                padding: 4px 15px;
                // width: 57px;
                // height: 22px;
                // line-height: 22px;
                background: #F1F6FF;
                border-radius: 5px;
                border: none;
                text-align: center;
                font-size: 10px;
                font-family: PingFangSC, PingFang SC;
                font-weight: 400;
                color: #3D7EFF;

                &:nth-child(1) {
                    margin-right: 7px;
                }
            }
        }

        .my-pagination {
            margin: 20px 0;
            align-self: flex-end;
        }

    }
}
</style>

<style>
.my-Record-table .ant-table-thead>tr>th {
    font-size: 16px;
    font-weight: bold !important;
}

.my-Record-table .ant-table-tbody>tr>td {
    font-size: 14px;
    color: #686868;
}
</style>