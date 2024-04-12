<template>
    <div class="sending-box">
        <div class="operate-box">
            <div class="out-box">
                <img src="../../assets/images/coupon/out-page.png" @click="router.back()" alt="">
                <p @click="router.back()">返回申请优惠券</p>
            </div>
            <div class="operate-content-box">
                <p>发放用户手机号：</p>
                <a-input class="operate-content-i" placeholder="请输入" v-model:value="setCoupinData.phone" :maxlength="11" />
                <button @click="setCouponApply">立即发放</button>
            </div>
        </div>
        <div class="content-box">
            <div class="prompt-box">
                <div></div>
                <p>可发放优惠券</p>
            </div>
            <div class="content-list">
                <div class="item-box" v-for="(item, index) in couponList" :key="index" @click="selectCoupon(index)"
                    :style="{ backgroundImage: item.couponType === 1 ? activeIndex === index ? `url(${getIcon('active-bg')})` : `url(${getIcon('bg')})` : activeIndex === index ? `url(${getIcon('m-active-bg')})` : `url(${getIcon('m-bg')})` }">
                    <div class="item-content">
                        <h2>{{ item.couponType === 1 ? item.discount + "折" : item.discount }}</h2>
                        <p>满¥{{ item.threshold }}使用</p>
                    </div>
                    <img class="item-border" src="../../assets/images/coupon/segmentation.png" alt="">
                    <div class="item-details">
                        <p>{{ item.couponName }}</p>
                        <p>{{ item.beginTime }}-{{ item.endTime }}</p>
                    </div>
                </div>
            </div>
            <a-pagination v-model:current="searchData.pageNum" v-model:pageSize="searchData.pageSize" show-quick-jumper
                :total="total" @change="onChange" showSizeChanger :page-size-options="pageSizeOptions"
                :show-total="(total: number = 0) => `共 ${total} 条`" responsive />
        </div>
        <div class="mask-box" v-if="MaskStatus">
            <div class="content-box">
                <h2>提示</h2>
                <p :class="resloveStatus ? '' : 'p-f'">{{ tipText }}</p>
                <button @click="maskClick">确定</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getCouponListAPI, setCouponApplyAPI } from "../../apis/coupon"
import { couponListResponseData } from "../../apis/coupon/type"
const router = useRouter();
const activeIndex = ref<number>(-1);
const total = ref<number>(1);
const tipText = ref<string>("");
const couponList = ref<couponListResponseData[]>([]);
const resloveStatus = ref(true)
const MaskStatus = ref(false)
const searchData = ref({
    pageNum: 1, pageSize: 5
});
const pageSizeOptions = ref<string[]>(['5', '10', '20', '30', '40', '50']);
const setCoupinData = ref<{ couponId: number | null, phone: string }>({
    couponId: null, phone: ""
});
onMounted(() => {
    getCouponList()
});
const onChange = (n: number) => {
    console.log(11111, n)
    searchData.value.pageNum = n;
    getCouponList()
}
const selectCoupon = (i: number) => {
    if (activeIndex.value === i) {
        activeIndex.value = -1;
        setCoupinData.value.couponId = null;
    } else {
        activeIndex.value = i;
        setCoupinData.value.couponId = couponList.value[activeIndex.value].id;
    }
}
const getCouponList = () => {
    getCouponListAPI(searchData.value).then(res => {
        console.log(res)
        if (res.code === 200) {
            couponList.value = res.data.data;
            total.value = res.data.total;
        }
    })
}
const setCouponApply = () => {
    console.log(setCoupinData.value)
    setCouponApplyAPI(setCoupinData.value).then(res => {
        if (res.code === 200) {
            resloveStatus.value = true;
            tipText.value = "已发放成功!"
        } else {
            resloveStatus.value = false;
            tipText.value = res.msg;
        }
        MaskStatus.value = true;
    })
}
const maskClick = () => {
    tipText.value = "";
    if (resloveStatus.value === true) {
        router.back()
    } else {
        MaskStatus.value = false;
    }
}
const getIcon = (name: string) => {
    return new URL(`../../assets/images/coupon/${name}.png`, import.meta.url).href;
}
</script>

<style lang="less">
.sending-box {
    width: 100vw;
    height: 100vh;
    padding: 15px;
    box-sizing: border-box;
    background: #F3F3F3;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .operate-box {
        width: 100%;
        height: 123px;
        background: #FFFFFF;
        border-radius: 16px;
        margin-bottom: 15px;
        padding: 26px 20px;
        box-sizing: border-box;

        .out-box {
            display: flex;
            align-items: center;

            img {
                width: 22px;
                height: 22px;
            }

            p {
                font-size: 16px;
                font-family: PingFang-SC-Bold, PingFang-SC;
                font-weight: bold;
                color: #222222;
                line-height: 22px;
                margin: 0;
            }

            .p-f {
                text-align: left;
                font-size: 20px;
                font-weight: 400;
            }
        }

        .operate-content-box {
            display: flex;
            align-items: center;
            margin: 17px 0 0 7px;

            p {
                font-size: 14px;
                font-family: PingFang-SC-Bold, PingFang-SC;
                font-weight: bold;
                color: #4C4C4C;
                line-height: 20px;
                margin: 0;
            }

            .operate-content-i {
                width: 179px;
                height: 38px;
                background: #FFFFFF;
                border-radius: 6px;
            }

            button {
                width: 90px;
                height: 38px;
                background: #3D7EFF;
                margin-left: 12px;
                border-radius: 6px;
                border: none;
                font-size: 14px;
                font-family: PingFang-SC-Bold, PingFang-SC;
                font-weight: bold;
                color: #FFFFFF;
            }
        }
    }

    .content-box {
        width: 100%;
        flex: 1;
        overflow-y: auto;
        background: #FFFFFF;
        border-radius: 16px;
        padding: 20px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: end;

        .prompt-box {
            width: 100%;
            display: flex;
            align-items: center;

            div {
                width: 4px;
                height: 11px;
                background: #3D7EFF;
                border-radius: 22px;
            }

            p {
                font-size: 16px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: #222222;
                line-height: 22px;
                margin: 0 0 0 4px;
            }
        }

        .content-list {
            width: 100%;
            flex: 1;
            margin: 15px 0 30px 0;
            padding: 0 0 0 18px;
            box-sizing: border-box;
            overflow-y: auto;
            display: grid;
            grid-template-columns: repeat(3, 347px);
            grid-template-rows: repeat(3, 122px);
            grid-row-gap: 27px;
            grid-column-gap: 68px;

            .item-box {
                width: 347px;
                height: 122px;
                background-size: 100%;
                background-repeat: no-repeat;
                display: flex;
                align-items: center;

                .item-content {
                    width: 119px;
                    height: 100%;
                    text-align: center;
                    padding-top: 31px;
                    box-sizing: border-box;

                    h2 {
                        height: 48px;
                        font-size: 36px;
                        font-family: MiSans-Heavy, MiSans;
                        font-weight: 800;
                        color: #FB2F25;
                        margin: 0;
                        line-height: 48px;
                    }

                    p {
                        height: 14px;
                        font-size: 10px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #E77C77;
                        line-height: 14px;
                        margin: 0;
                    }
                }

                .item-border {
                    width: 2px;
                    height: 88px;
                }

                .item-details {
                    width: 226px;
                    height: 100%;
                    flex: 1;
                    padding: 17px 20px 0 12px;
                    box-sizing: border-box;

                    p {
                        margin: 0;

                        &:nth-child(1) {
                            font-size: 16px;
                            font-family: PingFang-SC-Bold, PingFang-SC;
                            font-weight: bold;
                            color: #FB2F25;
                            line-height: 22px;
                        }

                        &:nth-child(2) {
                            margin-top: 3px;
                            font-size: 12px;
                            font-family: PingFangSC-Regular, PingFang SC;
                            font-weight: 400;
                            color: #E77C77;
                            line-height: 17px;
                        }
                    }
                }
            }
        }
    }

    .mask-box {
        width: 100vw;
        height: 100vh;
        background-color: rgba(#161616, 0.75);
        position: fixed;
        left: 0;
        top: 0;

        .content-box {
            width: 428px;
            height: 271px;
            background: #FFFFFF;
            border-radius: 16px;
            padding: 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            h2 {
                font-size: 24px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #222222;
                line-height: 33px;
                margin-top: 20px;

            }

            p {
                text-align: center;
                font-size: 24px;
                font-family: PingFang-SC-Bold, PingFang-SC;
                font-weight: bold;
                color: #222222;
                line-height: 33px;
                padding: 0 28px;
                box-sizing: border-box;
                width: 100%;
            }

            button {
                width: 337px;
                height: 54px;
                background: #3D7EFF;
                border-radius: 27px;
                margin-bottom: 28px;
                border: none;
                font-size: 22px;
                font-family: PingFang-SC-Bold, PingFang-SC;
                font-weight: bold;
                color: #FFFFFF;
                line-height: 20px;
            }

        }
    }
}
</style>

