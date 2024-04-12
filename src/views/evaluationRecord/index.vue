<script setup  lang='ts'>
import TableList from "./components/TableList.vue"
import { onMounted, ref, reactive } from 'vue'
import pagination from "@/components/pagination/index.vue"
import { GetBHIPageReq } from "@/apis/evalList/type"
import { getBHIPage, getEstimateList } from "@/apis/evalList/index"
import load from "../../components/load/load.vue"
import { useState } from '@/stores/state'
import { useRouter } from "vue-router"
import { pageTabStatus } from "@/stores/pageTabStatus"
// import _ from 'lodash'

const router = useRouter()
const state = useState()
const tabStatus = pageTabStatus()

const evalList = ref<any[]>([])
const defaultStr = ref<string>('BHI报告')
const tabListKey = ref(0)
let butList: Array<any> = []//按钮
onMounted(() => {
    defaultStr.value = tabStatus.evaluationRecord
    queryEvalListForm.pageNum = state.pageNum
    const list = JSON.parse(localStorage.getItem('menu') as any)
    list?.forEach((el: any) => {
        if (el.menuType == 2) {
            butList.push({ title: el.menuName })
        }
    })
    getList(butList[0])
})

let bhiSearch = ""
let reportSearch = ""

const getList = async (str: any) => {
    console.log(str)
    switch (defaultStr.value) {
        case 'BHI报告':
            bhiSearch = queryEvalListForm.keyword
            break;
        case '报告列表':
            reportSearch = queryEvalListForm.keyword
            break;
        default:
            break;
    }
    queryEvalListForm.keyword = ""
    switch (str.title) {
        case 'BHI报告':
            queryEvalListForm.keyword = bhiSearch
            break;
        case '报告列表':
            queryEvalListForm.keyword = reportSearch
            break;
        default:
            break;
    }

    defaultStr.value = str.title;
    loadStatus.value = 'loading';
    evalList.value = [];
    state.changePageNumNumberState(1)
    queryEvalListForm.pageNum = 1
    queryEvalListForm.pageSize = 5;

    if (str.title == 'BHI报告') {
        tabStatus.evaluationRecord = 'BHI报告'
        getOneList()
    }
    if (str.title == '报告列表') {
        tabStatus.evaluationRecord = '报告列表'
        getTwoList()
    }

}

const getOneList = async () => {
    loadStatus.value = 'loading';
    getBHIPage(queryEvalListForm).then(res => {
        console.log(res)
        if (res.code == 200) {
            if (res.data.total == 0) {
                loadStatus.value = 'noData',
                    evalList.value = [];
            } else {
                total.value = res.data.total
                evalList.value = res.data.data;
            }
        } else {
            loadStatus.value = 'failure';
            evalList.value = [];
        }
    })
}

const getTwoList = async () => {
    loadStatus.value = 'loading';
    getEstimateList(queryEvalListForm).then(res => {
        console.log(res)
        if (res.code == 200) {
            if (res.data.total == 0) {
                loadStatus.value = 'noData';
                evalList.value = [];
            } else {
                total.value = res.data.total;
                evalList.value = res.data.data;
            }
        } else {
            loadStatus.value = 'failure';
            evalList.value = [];
        }
    })
}

// 分页 
const queryEvalListForm = reactive<GetBHIPageReq>({
    pageNum: state.pageNum > 1 ? state.pageNum : 1,//页码
    pageSize: 5,//每页多少
    keyword: "",
})
// const currentPage = ref<number>(1) //页码
const total = ref<number>() //总条数

const changePage = async (num: number, size: number) => {
    state.changePageNumNumberState(num)
    queryEvalListForm.pageNum = num
    queryEvalListForm.pageSize = size
    if (defaultStr.value == 'BHI报告') {
        getOneList()
    }
    if (defaultStr.value == '报告列表') {
        getTwoList()
    }
}

const onSearch = (e: any) => {
    if (e.target.value) {
        queryEvalListForm.pageNum = 1;
    } else {
        queryEvalListForm.pageNum = state.pageNum;
    }
    if (defaultStr.value == 'BHI报告') {
        getOneList()
    }
    if (defaultStr.value == '报告列表') {
        getTwoList()
    }

};
let loadStatus = ref<string>('loading') //loading-加载中,noData-无数据,failure-加载失败
let schedule = ref<number>(0) //加载中进度
</script>
<template>
    <div class="evaluationRecord">
        <div class="tab" :key="tabListKey">
            <div v-for="item in butList" :key="item" class="tab-item"
                v-bind:class="defaultStr == item.title ? 'active' : ''" @click="getList(item)">
                {{ item.title }}
            </div>
        </div>
        <div class="content-box">
            <div class="search">
                <a-input class="btn-box" size="large" v-model:value="queryEvalListForm.keyword" placeholder="请输用户名/手机号"
                    style="background-color: #F2F2F2" @change="onSearch">
                    <template #prefix>
                        <search-outlined type="user" style="color:#727272" />
                    </template>
                </a-input>
                <p @click="router.push('/BHIPage')" v-if="defaultStr == 'BHI报告'">BHI报告说明<img src="@/assets/images/tip.png" alt=""></p>
            </div>
            <load :status="loadStatus" :schedule="schedule" v-if="evalList?.length == 0"></load>
            <div v-else class="table-box">
                <TableList :list="evalList" :type="defaultStr" @refreshList="getTwoList" />
                <pagination :currentPage="queryEvalListForm.pageNum" :total="total" @changePage="changePage"></pagination>
            </div>
        </div>
    </div>
</template>

<style lang='less' scoped>
.evaluationRecord {
    width: 100%;
    height: 100%;
    display: flex;
    background-color: #fff;
    border-radius: 16px;
    flex-direction: column;

    .tab {
        border-radius: 16px 16px 0 0;
        width: 100%;
        height: 70px;
        box-shadow: 0px 0 4px 0px rgba(94, 94, 94, 0.13);
        padding: 0 24px;
        display: flex;

        .tab-item {
            width: 126px;
            height: 70px;
            color: #707070;
            font-size: 18px;
            font-weight: bold;
            line-height: 70px;
            text-align: center;
            position: relative;

            .tip-box {
                width: 29px;
                height: 21px;
                position: absolute;
                top: 10px;
                right: 0px;
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

            &::after {
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
        width: 100%;
        flex: 1;
        padding: 16px 24px;
        display: flex;
        flex-direction: column;

        .search {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 18px;

            .btn-box {
                width: 357px;
                height: 38px;
            }

            p {
                margin-bottom: 0;
                font-size: 14px;
                font-family: PingFang-SC, PingFang-SC;
                font-weight: bold;
                color: #3D7EFF;
                line-height: 20px;
                display: flex;
                align-items: center;
                text-decoration: underline;

                img {
                    width: 16px;
                    height: 16px;
                    margin-left: 2px;
                }
            }
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
    }
}


.top {
    width: 100%;
    height: 22px;
}

.top_01 {
    width: 21px;
    height: 21px;
    vertical-align: middle;
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

// :deep(.subscribe-list) {
//     height: 30.83333vw !important;
// }
</style>