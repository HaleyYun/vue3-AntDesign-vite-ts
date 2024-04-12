<script setup  lang='ts'>
import inputBox from "@/components/inputBox/index.vue"
import { ref } from 'vue';
import { update } from "@/apis/subscribeList/index"
import type { listData } from "@/apis/subscribeList/type"
import { useRouter } from 'vue-router'
import { useSubscribeData } from "@/stores/SubscribeData"
import { message } from 'ant-design-vue';
import { useState } from '@/stores/state'
const router = useRouter()
const subscribeData = useSubscribeData()
const state = useState()
const props = defineProps({
    list: {
        type: Array,
    },
    type: {
        type: Number
    }
})
let scrollY = ref<number>(0)
scrollY.value = 440 * window.innerHeight / 800;
const columns = ref<any[]>([
    {
        title: '筛查编号',
        dataIndex: 'ticketsBookingCode',
        key: 'ticketsBookingCode',
        align: "center",
        width: 190,
    },
    {
        title: '客户',
        dataIndex: 'clientName',
        key: 'clientName',
        align: "center",
        width: 120,
    },
    {
        title: '筛查项目',
        dataIndex: 'checkName',
        key: 'checkName',
        align: "center",
        width: 250,
    },
    {
        title: '服务次数',
        dataIndex: 'serviceCheckCount',
        key: 'serviceCheckCount',
        align: "center"

    },
    {
        title: '预约日期',
        dataIndex: 'checkTime',
        key: 'checkTime',
        width: 320,
        align: "center"

    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        align: "center"
    },
    {
        title: '联系方式',
        dataIndex: 'phone',
        key: 'phone',
        align: "center",
        width: 130,
    },
    {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        align: "center",
        width: 120,
        fixed: "right"
    },
])

if (props.type != 2) {
    columns.value.splice(5, 0, {
        title: '筛查时间',
        dataIndex: 'screeningTime',
        key: 'screeningTime',
        align: "center",
        width: 170,
    })
    console.log(columns.value)
}


// const splitStr1 = (str: string) => str.substring(0, 1)
// const splitStr2 = (str: string) => str.substring(2, str.length)
const maskName = (name: any) => {
    if (typeof name !== 'string') {
        return name; // 非字符串类型直接返回
    }

    if (name.length <= 1) {
        return name; // 字符串长度为 1 或 0 直接返回
    }
    const firstChar = name.charAt(0);
    const maskedChars = '*'.repeat(name.length - 1);
    return firstChar + maskedChars;
}


const splitStr = (str: string) => str.substring(0, str.length - 4)
const verify_phone = ref<string>('');
const ticketCode = ref<any>('');
const inputBoxRef = ref<any>()

const StartEvaluation = async (obj: listData) => {
    console.log(inputBoxRef.value);
    inputBoxRef.value.isShow = true
    verify_phone.value = obj.phone
    ticketCode.value = obj.ticketsBookingCode
    //预约省份校验
    showModal()
    subscribeData.changeListParams({ ...obj })
    state.getQueryProData(obj)
    // router.replace("/face")
}

const visible = ref<boolean>(false);
const showModal = () => {
    //配合安卓测试日志方法
    // showLog('这是来自h5的调用')
    visible.value = true;
};

const getCode = async (codeValue: string) => {

    if (verify_phone.value.substring(verify_phone.value.length - 4) != codeValue) {
        message.error('请补全正确的手机号码')
    } else {
        const res: any = await update({ ticketsCode: ticketCode.value })
        if (res?.code == 200) {
            router.push({
                path: "/servicePack",
                query: {
                    ticketCode: ticketCode.value
                }
            })
        }
    }
    visible.value = false;
};

const goServicePack = (item: any) => {
    router.push({
        path: "/servicePack",
        query: {
            ticketCode: item.ticketsBookingCode,
            status: props.type == 3 ? "look" : ""
        }
    })
}
</script>
<template>
    <a-table :data-source="list" :columns="columns" :pagination="false" class="subscribe-list subscribe-list-tab"
        :scroll="{ y: scrollY, x: 1500 }">
        <template #bodyCell="{ column, record, text }">
            <template v-if="column.key === 'clientName'">
                <p>{{ maskName(record.clientName) }} </p>
            </template>

            <template v-if="column.key === 'serviceCheckCount'">
                <span>{{ record.serviceUseCount }}/{{ record.serviceCheckCount }}</span>
            </template>

            <template v-if="column.key === 'ticketsBookingCode'">
                <picture>{{ text }}</picture>
            </template>
            <template v-if="column.key === 'checkName'">
                <p>{{ text }}</p>
            </template>

            <template v-if="column.key === 'status'">
                <p>{{ record.status === 2 ? "待开始" : record.status === 9 ? "未完成" : "已完成" }}</p>
            </template>

            <template v-if="column.key === 'phone'">
                <p>{{ splitStr(text) }}****</p>
            </template>
            <template v-if="column.key === 'checkTime'">
                <p>{{ record.checkDate + " " + record.checkTime }}</p>
            </template>

            <template v-if="column.key === 'operation'">
                <button class="operation-btn" v-if="type == 2" @click="StartEvaluation(record)">开始评估</button>
                <button class="operation-btn" v-if="type == 9" @click="goServicePack(record)">继续评估</button>
                <button class="operation-btn" v-if="type == 3" @click="goServicePack(record)">查看服务</button>
            </template>
        </template>

    </a-table>
    <inputBox :phone="splitStr(verify_phone)" ref="inputBoxRef" @getCode="getCode" />
</template>

<style lang='less' scoped>
p {
    margin-bottom: 0;
}

.number_box {
    position: relative;
    display: inline-block;
}

.number_box input {
    width: 190px;
    height: 38px;
    position: absolute;
    top: 12px;
    background: none;
    border: 0;
    font-weight: bold;
    font-size: 33px;
    letter-spacing: 37px;
    outline: none;
    text-indent: 19px;
    top: -4px;
    left: -6px;
}

.subscribe {
    color: rgba(36, 192, 123, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;

    img {
        display: inline-block;
        width: 13px;
        margin-right: 3px;
    }

    span {
        display: inline-block;
    }
}

.subscribe-list {
    .font-wei {
        font-weight: 500;
    }

    .operation-btn {
        // width: 78px;
        // height: 26px;
        padding:4px 15px;
        background: #F1F6FF;
        border-radius: 6px;
        border: none;
        text-align: center;
        font-size: 12px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        color: #3D7EFF;
        // line-height: 26px;
    }
}

:deep(.ant-modal-content) {
    width: 428px;
    height: 356px;
    background: #FFFFFF;
    border-radius: 16px;
}

:deep(.ant-input) {
    width: 10%;
}

:deep(.identity-verify button) {
    width: 337px;
    height: 54px;
    background: #3D7EFF;
    border-radius: 27px;
}
</style> 

<style>
.subscribe-list-tab .ant-table-tbody>tr>td {
    font-size: 14px !important;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    color: #686868;
    line-height: 20px;
}

.subscribe-list-tab .ant-table-thead>tr>th {
    font-size: 16px !important;
    font-family: PingFang-SC, PingFang-SC;
    font-weight: bold !important;
    color: #222222;
    line-height: 22px;
}
</style>

