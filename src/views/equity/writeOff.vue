<template>
    <div class="writeOff-page">
        <div class="hander-box">
            <div @click="router.back()"><img src="../../assets/images/equity/out-icon.png" alt="">返回</div>
            <h2>选择用户</h2>
            <button @click="selectUserHandle">确定选择</button>
        </div>
        <div class="content-box">
            <div class="prompt-box">
                <div></div>
                <p>客户信息</p>
            </div>
            <div class="operate-box">
                <a-input class="operate-box-input" placeholder="请输入客户姓名、联系电话关键字～" v-model:value="searchData.searchKey">
                    <template #prefix>
                        <img class="search-icon" src="../../assets/images/equity/search-icon.png" alt="">
                    </template>
                </a-input>
                <button @click="searchClick">搜索</button>
                <button @click="resetSearch">重置</button>
            </div>
            <load :status="loadStatus" :schedule="schedule" v-if="dataList?.length == 0"></load>
            <a-table v-if="dataList?.length != 0" class="my-Record-table" rowKey="archivesNo" :columns="columnsList"
                :data-source="dataList" :pagination="false" :scroll="{ y: scrollY, x: true }"
                :rowSelection="{ type: 'radio', selectedRowKeys: archivesNo, onChange: onSelectChange, columnWidth: 60 }">
            </a-table>
            <a-pagination v-if="dataList?.length != 0" class="my-pagination"
                :show-total="(total: number = 0) => `共 ${total} 条`" v-model:current="searchData.pageNum" responsive
                v-model:pageSize="searchData.pageSize" show-quick-jumper :total="total" @change="onChange" showSizeChanger
                :page-size-options="pageSizeOptions" />
        </div>
        <div class="mask-box" v-show="maskBoxShow">
            <div class="pop-up">
                <h2>提示</h2>
                <p>确定为当前用户进行权益服务，选择为该用户服务后则不可修改</p>
                <div class="btn-box">
                    <button @click="maskBoxShow = false">我再看看</button>
                    <button @click="updateEquity">确定</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"
import { useRouter, useRoute } from "vue-router";
import { QueryClientList } from "../../apis/clientele/index"
import { padUpdateTicketsEquity } from "../../apis/equity/index"
import { message } from 'ant-design-vue';
import { useState } from '@/stores/state';

const state = useState();
const router = useRouter()
const route = useRoute()
let scrollY = ref<number>(0)
scrollY.value = 460 * window.innerHeight / 800;
let loadStatus = ref<string>('loading') //loading-加载中,noData-无数据,failure-加载失败
let schedule = ref<number>(0) //加载中进度
const searchData = ref<{ pageNum: number, pageSize: number, searchKey: string }>({ pageNum: 1, pageSize: 5, searchKey: "" })
let total = ref<number>(0);
const pageSizeOptions = ref<string[]>(['5', '10', '20', '30', '40', '50']);
const dataList = ref<any[]>([]);
let allData: any[] = [];
const columnsList = ref([
    {
        title: '用户ID',
        dataIndex: 'archivesNo',
        key: 'archivesNo',
        align: 'center'
    },
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        align: 'center'
    },
    {
        title: '联系电话',
        key: 'phone',
        dataIndex: 'phone',
        align: 'center'
    },
    {
        title: '性别',
        dataIndex: 'sexDesc',
        key: 'sexDesc',
        align: 'center'
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        align: 'center'
    },
]);
const archivesNo = ref<any>([])
const maskBoxShow = ref(false)

onMounted(() => {
    getList()
})

const searchClick = () => {
    searchData.value.pageNum = 1;
    getList()
}

const getList = () => {
    QueryClientList(searchData.value).then((res: any) => {
        console.log(res)
        if (res.code === 200) {
            dataList.value = res.data?.data || [];
            allData = [...allData, ...dataList.value]
            total.value = res.data?.total || 0;
            if (res.data.total == 0) {
                loadStatus.value = 'noData';
            }
        } else {
            loadStatus.value = 'failure';
        }
    })
}
const onSelectChange = (selectedRowKeys: any[]) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    archivesNo.value = selectedRowKeys;
};
const onChange = (n: number) => {
    searchData.value.pageNum = n;
    getList()
}
const updateEquity = () => {
    let reqData = {
        activeCode: String(route.query.activeCode),
        archivesNo: archivesNo.value[0],
        name: "",
        phone: "",
    }
    let item = allData?.find((res: any) => res.archivesNo === reqData.archivesNo)
    reqData.name = item.name;
    reqData.phone = item.phone;
    padUpdateTicketsEquity(reqData).then(res => {
        console.log(res)
        if (res.code === 200) {
            state.fromUrl = "equity";
            state.isView = 0;
            router.push({
                path: "/servicePack",
                query: {
                    ticketCode: route.query.ticketsEquityCode,
                    from: "equity"
                }
            });
        }
    })
}

const selectUserHandle = () => {
    if (archivesNo.value.length === 0) {
        message.warning({ content: "请选择本次筛查的用户", duration: 5 });
        return
    }
    maskBoxShow.value = true;
}
const resetSearch = () => {
    searchData.value = { pageNum: 1, pageSize: 5, searchKey: "" };
    getList();
}
</script>

<style lang="less">
.writeOff-page {
    width: 100vw;
    height: 100vh;
    background: #F3F3F3;
    padding: 0 20px 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    .hander-box {
        width: 100%;
        height: 68px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        div {
            display: flex;
            align-items: center;
            font-size: 18px;
            font-family: PingFangSC, PingFang SC;
            font-weight: 600;
            color: #222222;
            line-height: 25px;

            img {
                width: 8px;
                height: 12px;
                margin-top: -1px;
                margin-right: 9px;
            }
        }

        h2 {
            font-size: 20px;
            font-family: PingFangSC, PingFang SC;
            font-weight: 600;
            color: #222222;
            line-height: 28px;
        }

        button {
            width: 80px;
            height: 38px;
            background: #3D7EFF;
            border-radius: 8px;
            border: none;
            font-size: 12px;
            font-family: PingFangSC, PingFang SC;
            font-weight: 600;
            color: #FFFFFF;
            line-height: 17px;
        }
    }

    .content-box {
        width: 100%;
        background: #FFFFFF;
        border-radius: 10px;
        flex: 1;
        padding: 26px 16px 16px;
        display: flex;
        flex-direction: column;

        .prompt-box {
            width: 100%;
            display: flex;
            align-items: center;

            div {
                width: 6px;
                height: 16px;
                background: #3D7EFF;
                border-radius: 3px;
            }

            p {
                font-size: 18px;
                font-family: PingFangSC, PingFang SC;
                font-weight: 600;
                color: #000000;
                line-height: 25px;
                margin: 0 0 0 4px;
            }
        }

        .operate-box {
            width: 100%;
            height: 78px;
            display: flex;
            align-items: center;

            .operate-box-input {
                width: 260px;
                height: 38px;
                border-radius: 8px;
                margin-right: 30px;

                .search-icon {
                    width: 10px;
                    height: 11px;
                }
            }

            button {
                width: 80px;
                height: 38px;
                border-radius: 6px;
                border: none;
                font-size: 12px;
                font-family: PingFangSC, PingFang SC;
                font-weight: 600;
                line-height: 17px;

                &:nth-child(2) {
                    color: #FFFFFF;
                    background: #3D7EFF;
                    margin-right: 9px;
                }

                &:nth-child(3) {
                    color: #3D7EFF;
                    background: #F1F6FF;
                }
            }
        }

        .my-Record-table {
            flex: 1;
        }

        .my-pagination {
            margin: 20px 0;
            align-self: flex-end;
        }
    }

    .mask-box {
        width: 100vw;
        height: 100vh;
        background: rgba(22, 22, 22, 0.75);
        position: fixed;
        top: 0;
        left: 0;

        .pop-up {
            width: 522px;
            height: 290px;
            background: #FFFFFF;
            border-radius: 16px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 42px 66px 0;
            box-sizing: border-box;

            h2 {
                text-align: center;
                font-size: 20px;
                font-family: PingFangSC, PingFang SC;
                font-weight: 400;
                color: #B0B0B0;
                line-height: 28px;
            }

            p {
                margin-top: 15px;
                font-size: 22px;
                font-family: PingFangSC, PingFang SC;
                font-weight: 600;
                color: #222222;
                line-height: 30px;
            }

            .btn-box {
                display: flex;
                align-items: center;
                justify-content: space-around;
                margin-top: 53px;

                button {
                    width: 162px;
                    height: 54px;
                    border-radius: 27px;
                    font-size: 22px;
                    font-family: PingFang-SC, PingFang-SC;
                    font-weight: bold;
                    border: none;

                    &:nth-child(1) {
                        color: #3D7EFF;
                        background: #F5F8FD;
                    }

                    &:nth-child(2) {
                        color: #FFFFFF;
                        background: #3D7EFF;
                    }
                }
            }
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