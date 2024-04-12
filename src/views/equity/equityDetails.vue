<template>
    <div class="equity-details">
        <div class="hander-box">
            <div @click="router.back()"><img src="../../assets/images/equity/out-icon.png" alt="">返回</div>
            权益详情
        </div>
        <div class="user-info-box">
            <tagBox title="客户信息"></tagBox>
            <div class="user-info-content-box">
                <div class="item-box" v-for="(item, index) in userInfoList" :key="index"
                    :style="{ marginTop: index < 2 ? '20px' : '' }">
                    <div :class="index % 2 === 0 ? 'item-box-t-w-1' : 'item-box-t-w-2'">{{ item.lable }}</div>
                    <div>{{ item.value }}</div>
                </div>
            </div>
        </div>
        <div class="equity-info-box">
            <tagBox title="工单信息"></tagBox>
            <div class="equity-info-content-box">
                <div class="item-box" v-for="(item, index) in equityInfoList" :key="index"
                    :style="{ marginTop: index < 2 ? '20px' : '' }">
                    <div :class="index % 2 === 0 ? 'item-box-t-w-1' : 'item-box-t-w-2'">{{ item.lable }}</div>
                    <div>{{ item.value }}</div>
                </div>
            </div>
        </div>
        <div class="service-record-box">
            <tagBox title="服务记录"></tagBox>
            <div class="null-data-box" v-if="dataList.length === 0">
                <img src="../../assets/images/equity/nullData.png" alt="">
                <p>暂无数据～</p>
            </div>
            <a-table v-if="dataList.length !== 0" class="my-Record-table" rowKey="archivesNo" :columns="columns"
                :data-source="dataList" :pagination="false">
            </a-table>
            <a-pagination v-if="dataList.length !== 0" class="my-pagination"
                :show-total="(total: number = 0) => `共 ${total} 条`" v-model:current="searchData.pageNum" responsive
                v-model:pageSize="searchData.pageSize" show-quick-jumper :total="total" @change="onChange" showSizeChanger
                :page-size-options="pageSizeOptions" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router"
import { queryByCode, queryLogsByCodeType } from "../../apis/equity/index"
import { QueryLogsByCodeTypeResData } from "../../apis/equity/type"

import tagBox from "./components/tag.vue"
const router = useRouter()
const route = useRoute()

const userInfoList = ref([
    { lable: "姓名：", value: "--" },
    { lable: "性别：", value: "--" },
    { lable: "年龄：", value: "--" },
    { lable: "联系电话：", value: "--" },
])
const equityInfoList = ref([
    { lable: "工单编号：", value: "--" },
    { lable: "工单状态：", value: "--" },
    { lable: "权益名称：", value: "--" },
    { lable: "工单来源：", value: "--" },
    { lable: "核销时间：", value: "--" },
    { lable: "激活码：", value: "--" },
    { lable: "操作人员：", value: "--" },
    { lable: "权益有效期：", value: "--" },
    { lable: "描述：", value: "--" },
])
const searchData = ref<{ pageNum: number, pageSize: number, ticketCode: string, ticketsTypeId: number }>({
    pageNum: 1, pageSize: 5, ticketCode: String(route.query.ticketsEquityCode), ticketsTypeId: 3
})
let total = ref<number>(0);
const pageSizeOptions = ref<string[]>(['5', '10', '20', '30', '40', '50']);
const dataList = ref<QueryLogsByCodeTypeResData[]>([]);
const columns = ref([
    {
        title: '序号',
        customRender: ({ index }: { index: number }) => index + 1,
        align: 'center'
    },
    {
        title: '操作内容',
        dataIndex: 'content',
        key: 'content',
        align: 'center'
    },
    {
        title: '操作人员',
        key: 'createUser',
        dataIndex: 'createUser',
        align: 'center'
    },
    {
        title: '操作时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        align: 'center'
    },
    {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        align: 'center'
    },
]);

onMounted(() => {
    getDateils()
    getList()
})

const getDateils = () => {
    queryByCode({ code: String(route.query.ticketsEquityCode) }).then(res => {
        console.log(res)
        if (res.code === 200) {
            userInfoList.value[0].value = res.data.clientName || "--";
            userInfoList.value[1].value = res.data.sex ? res.data.sex === 1 ? "男" : "女" : "--";
            userInfoList.value[2].value = res.data.age ? res.data.age + "岁" : "--";
            userInfoList.value[3].value = res.data.phone || "--";
            equityInfoList.value[0].value = res.data.ticketsEquityCode || "--";
            equityInfoList.value[1].value = res.data.status === 1 ? "使用中" : res.data.status === 2 ? "已完成" : "已核销";
            equityInfoList.value[2].value = res.data.equityName || "--";
            equityInfoList.value[3].value = res.data.source ? res.data.source + '端' : "--";
            equityInfoList.value[4].value = res.data.begnTime || "--";
            equityInfoList.value[5].value = res.data.activeCode || "--";
            equityInfoList.value[6].value = res.data.createUser || "--";
            equityInfoList.value[7].value = res.data.begnTime + " - " + res.data.endTime;
            equityInfoList.value[8].value = res.data.describe || "--";
        }
    })
}

const getList = () => {
    queryLogsByCodeType(searchData.value).then(res => {
        console.log(res)
        if (res.code === 200) {
            dataList.value = res.data.data || [];
            total.value = res.data.total || 0;
        }
    })
}

const onChange = (n: number) => {
    searchData.value.pageNum = n;
    getList()
}
</script>

<style lang="less">
.equity-details {
    width: 100vw;
    height: 100vh;
    padding: 0 20px 20px;
    background: #F3F3F3;
    box-sizing: border-box;
    overflow-y: auto;

    .hander-box {
        width: 100%;
        font-size: 20px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 600;
        color: #222222;
        line-height: 68px;
        text-align: center;
        position: relative;

        div {
            display: flex;
            align-items: center;
            font-size: 18px;
            font-family: PingFangSC, PingFang SC;
            font-weight: 600;
            color: #222222;
            line-height: 25px;
            position: absolute;
            top: 20px;
            left: 10px;

            img {
                width: 8px;
                height: 12px;
                margin-right: 9px;
            }
        }
    }

    .user-info-box,
    .equity-info-box,
    .service-record-box {
        width: 100%;
        padding: 26px 20px;
        box-sizing: border-box;
        background: #FFFFFF;
        border-radius: 10px;

        .my-Record-table {
            margin-top: 16px;
        }
    }

    .user-info-box {
        .user-info-content-box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;

            .item-box {
                width: 50%;
                font-size: 16px;
                font-family: PingFangSC, PingFang SC;
                font-weight: 400;
                color: #686868;
                line-height: 22px;
                display: flex;
                margin-top: 22px;

                .item-box-t-w-1 {
                    width: 85px;
                }

                .item-box-t-w-2 {
                    width: 120px;
                }

                div {
                    &:nth-child(1) {
                        text-align: right;
                    }

                    &:nth-child(2) {
                        color: #2A2A2A;
                        font-weight: 400;
                    }
                }
            }
        }
    }

    .equity-info-box {
        margin-top: 20px;

        .equity-info-content-box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;

            .item-box {
                width: 50%;
                font-size: 16px;
                font-family: PingFangSC, PingFang SC;
                font-weight: 400;
                color: #686868;
                line-height: 22px;
                display: flex;
                margin-top: 22px;

                .item-box-t-w-1 {
                    width: 85px;
                }

                .item-box-t-w-2 {
                    width: 120px;
                }

                div {
                    &:nth-child(1) {
                        text-align: right;
                    }

                    &:nth-child(2) {
                        flex: 1;
                        color: #2A2A2A;
                        font-weight: 400;
                    }
                }
            }
        }
    }

    .service-record-box {
        display: flex;
        flex-direction: column;
        margin-top: 20px;

        .null-data-box {
            img {
                width: 119px;
                height: 164px;
                display: block;
                margin: 60px auto 9px;
            }

            p {
                text-align: center;
                font-size: 16px;
                font-family: PingFangSC, PingFang SC;
                font-weight: 400;
                color: #848484;
                line-height: 22px;
                margin-bottom: 65px;
            }
        }

        .my-pagination {
            margin: 16px 0 30px;
            align-self: flex-end;
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
    font-weight: 600;
}

.my-Record-table .ant-table-tbody>tr>td {
    font-size: 14px;
    color: #686868;
}
</style>