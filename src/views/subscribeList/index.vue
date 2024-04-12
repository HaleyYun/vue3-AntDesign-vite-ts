<script setup lang='ts'>
import { getSubscribeList, queryNumber } from "@/apis/subscribeList"
import type { querySubscribeListType } from "@/apis/subscribeList/type"
import { listData } from "@/apis/subscribeList/type"
import pagination from "@/components/pagination/index.vue";
import TableList from "./components/TableList.vue";
import load from "../../components/load/load.vue";
import 'ant-design-vue/es/message/style/css';
import { onMounted, ref, reactive, onUnmounted } from 'vue'
import { useState } from '@/stores/state'
import { pageTabStatus } from "@/stores/pageTabStatus"

const state = useState()
const tabStatus = pageTabStatus()

const handerList = ref([
    { title: "待开始", lable: 2, count: 0 },
    { title: "未完成", lable: 9, count: 0 },
    { title: "已完成", lable: 3 },
])

let queryString2 = ""
let queryString9 = ""
let queryString3 = ""
const searchInput = ref("")

const tableListKey = ref(0)

const getListCount = () => {
    queryNumber().then(res => {
        console.log(res)
        if (res.code === 200) {
            handerList.value[0].count = res.data.waitStartNumber;
            handerList.value[1].count = res.data.notEndNumber;
            searchSubscribeList()
        }
    })
}

const changeTab = (item: { title: string, lable: number }) => {
    queryNumber().then(res => {
        console.log(res)
        if (res.code === 200) {
            handerList.value[0].count = res.data.waitStartNumber;
            handerList.value[1].count = res.data.notEndNumber;
        }
    })
    switch (tabStatus.subscribeList) {
        case 2:
            queryString2 = subscribeForm.queryString as string
            break;
        case 9:
            queryString9 = subscribeForm.queryString as string
            break;
        case 3:
            queryString3 = subscribeForm.queryString as string
            break;
        default:
            break;
    }
    searchInput.value = ""
    switch (item.lable) {
        case 2:
            subscribeForm.queryString = queryString2;
            searchInput.value = queryString2;
            tabStatus.subscribeStr = queryString2;
            break;
        case 9:
            subscribeForm.queryString = queryString9;
            searchInput.value = queryString9;
            tabStatus.subscribeStr = queryString9;
            break;
        case 3:
            subscribeForm.queryString = queryString3;
            searchInput.value = queryString3;
            tabStatus.subscribeStr = queryString3;
            break;
        default:
            break;
    }
    state.changePageSubNumNumberState(1);
    subscribeForm.pageNum = 1;
    subscribeForm.pageSize = 5;
    subscribeForm.status = item.lable;
    tabStatus.subscribeList = item.lable;
    subscribeList.value = [];
    searchSubscribeList();
    tableListKey.value += 1;
}

const subscribeForm = reactive<querySubscribeListType>({
    pageNum: state.pageSubNum > 1 ? state.pageSubNum : 1,//页码
    pageSize: 5,
    queryString: '',//用户名或者手机号
    status: 2,
})
const subscribeList = ref<listData[]>([])
onMounted(async () => {
    window.onresize = () => {
        tableListKey.value += 1;
    }
    subscribeForm.queryString = tabStatus.subscribeStr
    searchInput.value = tabStatus.subscribeStr
    subscribeForm.status = tabStatus.subscribeList
    getListCount()
})
onUnmounted(() => {
    window.onresize = () => { }
})
// 分页 
const total = ref<number>() //总条数
const changePage = (num: number, size: number) => {
    state.changePageSubNumNumberState(num)
    subscribeForm.pageNum = num
    subscribeForm.pageSize = size
    searchSubscribeList()
}
const onSearch = (e: any) => {
    if (e.target.value != subscribeForm.queryString) {
        subscribeForm.pageNum = 1
        state.changePageSubNumNumberState(1)
        subscribeForm.queryString = e.target.value
        tabStatus.subscribeStr = e.target.value
    }
    searchSubscribeList()
};
const searchSubscribeList = async () => {
    let obj: querySubscribeListType = JSON.parse(JSON.stringify(subscribeForm))
    for (const key in obj) {
        if (obj[key as keyof typeof obj] == '') {
            delete obj[key as keyof typeof obj]
        }
    }

    loadStatus.value = 'loading';
    let res = await getSubscribeList(obj);
    if (res.code == 200) {
        if (res.data == null || res.data.total == 0) {
            loadStatus.value = 'noData';
            subscribeList.value = [];
        } else {
            total.value = res.data.total
            subscribeList.value = res.data.data;
            tableListKey.value += 1;
        }
    } else {
        loadStatus.value = 'failure',
            subscribeList.value = [];
    }
}
let loadStatus = ref<string>('loading') //loading-加载中,noData-无数据,failure-加载失败
let schedule = ref<number>(0) //加载中进度
</script>
<template>
    <div class="subscribe-bottom">
        <div class="hander-box">
            <div class="hander-item" :class="item.lable == subscribeForm.status ? 'active' : ''"
                v-for="(item, index) in handerList" :key="index" @click="changeTab(item)">
                <div class="tip-box" v-if="item?.count">{{ item.count > 99 ? "99+" : item.count }}</div>
                {{
                    item.title }}
            </div>
        </div>
        <div class="content-box">
            <div class="search">
                <a-input size="large" v-model:value="searchInput" placeholder="请输用户名/手机号" style="background-color: #F2F2F2"
                    @change="onSearch">
                    <template #prefix>
                        <search-outlined type="user" style="color:#727272" />
                    </template>
                </a-input>
            </div>
            <load :status="loadStatus" :schedule="schedule" v-if="subscribeList?.length == 0"></load>
            <div v-else class="table-box">
                <TableList :list="subscribeList" :type="subscribeForm.status" :key="tableListKey" />
                <pagination class="table-box-pagination" :currentPage="subscribeForm.pageNum" responsive :total="total"
                    @changePage="changePage">
                </pagination>
            </div>
        </div>
    </div>
</template> 
<style lang='less' scoped>
.subscribe-bottom {
    width: 100%;
    height: 100% !important;
    border-radius: 16px;
    background: #FFFFFF;
    display: flex;
    flex-direction: column;
    height: calc(100% - 80px);
    box-sizing: border-box;

    .hander-box {
        height: 70px;
        background: #FFFFFF;
        box-shadow: 0px 0 4px 0px rgba(94, 94, 94, 0.13);
        border-radius: 16px 16px 0px 0px;
        padding: 0 14px;
        box-sizing: border-box;
        display: flex;

        .hander-item {
            width: 126px;
            height: 70px;
            text-align: center;
            font-size: 20px;
            font-family: PingFang-SC, PingFang-SC;
            font-weight: bold;
            color: #707070;
            line-height: 70px;
            position: relative;

            .tip-box {
                width: 29px;
                height: 21px;
                position: absolute;
                top: 10px;
                right: 4px;
                font-size: 12px;
                font-family: PingFang-SC, PingFang-SC;
                font-weight: bold;
                color: #FFFFFF;
                line-height: 21px;
                background-image: url(../../assets/images/bubble.png);
                background-size: 29px 21px;
                background-repeat: no-repeat;
            }

        }

        .active {
            color: #3D7EFF;

            &::before {
                content: "";
                width: 126px;
                height: 4px;
                background: #3D7EFF;
                color: #3D7EFF;
                border-radius: 2px;
                position: absolute;
                bottom: 0;
                left: 0;
            }

        }
    }

    .content-box {
        flex: 1;
        width: 100%;
        padding: 0 24px;
        display: flex;
        flex-direction: column;

        .search {
            margin: 16px 0 18px;
            width: 357px;
            height: 38px;
        }
    }
}

.subscribe-list {
    height: 520px;
}

.table-box {
    flex: 1;
    display: flex;
    flex-direction: column;

    :deep(.ant-table-wrapper) {
        flex: 1;
    }

    .table-box-pagination {
        margin-bottom: 22px;
    }
}

:deep(.ant-table-thead>tr>th) {
    position: relative;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    text-align: left;
    border-bottom: none;
    transition: background 0.3s ease;
}

:deep(.ant-table-thead>tr>th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before) {
    position: absolute;
    top: 50%;
    right: 0;
    width: 0px;
    height: 1.6em;
    background-color: rgba(0, 0, 0, 0.06);
    transform: translateY(-50%);
    transition: background-color 0.3s;
    content: '';
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