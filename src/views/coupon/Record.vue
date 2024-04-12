<template>
    <div class="record-box">
        <h2>申请优惠券</h2>
        <div class="operate">
            <button @click="goSending">立即申请</button>
            <a-input class="search-box" v-model:value="searchData.phone" placeholder="请输入发放的手机号进行搜索" @change="changeInput">
                <template #suffix>
                    <img class="search-box-img" src="../../assets/images/coupon/search-icon.png" />
                </template>
            </a-input>
        </div>
        <a-table class="my-Record-table" :columns="columns" :data-source="data" :pagination="false"
            :scroll="{ y: scrollY, x: 1700 }">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'effectiveTime'">
                    <span>
                        {{ record.beginTime }} - {{ record.endTime }}
                    </span>
                </template>
                <template v-if="column.key === 'couponType'">
                    <div v-if="record.couponType === 2" class="couponType-box" style="color: #FF7744;">
                        <img src="../../assets/images/coupon/m-icon.png" alt=""> 满减
                    </div>
                    <div v-else class="couponType-box" style="color: #11AA66;">
                        <img src="../../assets/images/coupon/z-icon.png" alt=""> 折扣
                    </div>
                </template>
                <template v-if="column.key === 'status'">
                    <button v-if="record.status === 0" class="status-box status-box1">待使用</button>
                    <button v-if="record.status === 1" class="status-box status-box2">已使用</button>
                    <button v-if="record.status === 2" class="status-box status-box3">已过期</button>
                </template>
            </template>
        </a-table>
        <a-pagination class="my-pagination" :show-total="(total: number = 0) => `共 ${total} 条`"
            v-model:current="searchData.pageNum" responsive v-model:pageSize="searchData.pageSize" show-quick-jumper
            :total="total" @change="onChange" showSizeChanger :page-size-options="pageSizeOptions" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getCouponHistoryAPI } from "../../apis/coupon"
import { couponHistoryResponseData } from "../../apis/coupon/type"

let scrollY = ref<number>(0)
scrollY.value = 470 * window.innerHeight / 800;
let total = ref<number>(0)
const router = useRouter();
const searchData = ref<{ pageNum: number, pageSize: number, phone: string }>({ pageNum: 1, pageSize: 5, phone: "" })
const columns = ref([
    {
        title: '券编码',
        dataIndex: 'couponCode',
        key: 'couponCode',
        align: "center"
    },
    {
        title: '优惠券名称',
        dataIndex: 'couponName',
        key: 'couponName',
        align: "center"
    },
    {
        title: '发放账户',
        dataIndex: 'useAccount',
        key: 'useAccount',
        align: "center"
    },
    {
        title: '券类型',
        key: 'couponType',
        dataIndex: 'couponType',
        align: "center"
    },
    {
        title: '关联服务',
        dataIndex: 'productName',
        key: 'productName',
        width: 250,
        align: "center"
    },
    {
        title: '有效期',
        dataIndex: 'effectiveTime',
        key: 'effectiveTime',
        align: "center"
    },
    {
        title: '申请人',
        dataIndex: 'releaseAccount',
        key: 'releaseAccount',
        align: "center"
    },
    {
        title: '申请时间',
        dataIndex: 'createTime',
        key: 'createTime',
        align: "center"
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        align: "center"
    },
]);
const pageSizeOptions = ref<string[]>(['5', '10', '20', '30', '40', '50']);

const data = ref<couponHistoryResponseData[]>();
onMounted(() => {
    getCouponHistory()
})
const goSending = () => {
    router.push("/couponSending")
}
const changeInput = () => {
    searchData.value.pageNum = 1;
    getCouponHistory();
}
const onChange = (n: number) => {
    searchData.value.pageNum = n;
    getCouponHistory()
}
const getCouponHistory = () => {
    getCouponHistoryAPI(searchData.value).then(res => {
        console.log(res)
        if (res.code === 200) {
            data.value = res.data.data;
            total.value = res.data.total;
        }
    })
}
</script>

<style lang="less">
.record-box {
    width: 100%;
    height: 100%;
    background: #FFFFFF;
    border-radius: 16px;
    padding: 26px 20px 22px 24px;
    display: flex;
    flex-direction: column;

    h2 {
        font-size: 16px;
        font-family: PingFang-SC-Bold, PingFang-SC;
        font-weight: bold;
        color: #222222;
        line-height: 22px;
        margin: 0;
    }

    .operate {
        width: 100%;
        height: 38px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 17px 0 20px;
        box-sizing: content-box;

        button {
            width: 90px;
            height: 38px;
            background: #3D7EFF;
            border-radius: 6px;
            font-size: 14px;
            font-family: PingFang-SC-Bold, PingFang-SC;
            font-weight: bold;
            color: #FFFFFF;
            border: none;
        }

        .search-box {
            width: 442px;
            height: 38px;
            border-radius: 6px;
        }

        .search-box-img {
            width: 16px;
            height: 16px;
        }
    }

    .my-Record-table {
        flex: 1;

        .couponType-box {
            display: -webkit-flex;
            display: flex;
            align-items: center;
            align-content: center;
            justify-content: center;
            font-size: 14px;
            vertical-align: middle;

            img {
                width: 17px;
                margin-right: 1px;
            }

            @media (min-width: 1142px) and (max-width:1144px) {
                img {
                    margin-top: -5px;
                }
            }
        }

        .status-box {
            width: 60px;
            height: 26px;
            border-radius: 6px;
            text-align: center;
            line-height: 26px;
            font-size: 12px;
            border: none;
        }

        .status-box1 {
            background: #F1F6FF;
            color: #3D7EFF;
        }

        .status-box2 {
            color: #7A7A7A;
            background: #F7F7F7;
        }

        .status-box3 {
            color: #BCB9B9;
            background-color: #FFFFFF;
            border: 1px solid #F7F5F5;
        }
    }

    .my-pagination {
        margin-top: 20px;
        align-self: flex-end;
    }
}
</style>

<style>
.my-pagination .ant-pagination-item-active a {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}

.my-pagination .ant-pagination-jump-next .ant-pagination-item-container .ant-pagination-item-ellipsis {
    font-size: 15px;
}

.my-Record-table .ant-table-thead>tr>th {
    font-size: 16px;
}

.my-Record-table .ant-table-tbody>tr>td {
    font-size: 14px;
    color: #686868;
}
</style>

