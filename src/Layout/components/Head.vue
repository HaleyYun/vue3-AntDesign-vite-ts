<template>
    <div class="clock" @click="showMessage">
        <div class="img">
            <img :style="{ width: showAnmiate ? '50px' : '', height: showAnmiate ? '50px' : '' }"
                :src="showAnmiate ? getAssetsFile('message.gif') : getAssetsFile('clock.png')">
        </div>
        <div class="num" v-if="list.length > 0">{{ list.length }}</div>
    </div>
    <div class="messags_box" v-if="show">
        <div class="top">
            <span>消息中心({{ list.length }})</span>
            <span><img class="close" @click="close" :src="getAssetsFile('close.png')"></span>
        </div>
        <div class="cont">

            <div class="con_list" v-if="list.length > 0">
                <div class="list_one" v-for="(item, index) in list" :key="index">
                    <div class="one_img"><img :src="item.messageCenterPicture"></div>
                    <div class="message">
                        <div class="info">
                            <div class="name">{{ item.customerName }}</div>
                            <div class="phone">{{ item.phone }}</div>
                        </div>
                        <div class="title">{{ item.estimateServerName }}</div>
                        <div class="text" v-if="item.status == 3">延迟回忆题目已完成</div>
                        <div class="text" v-if="item.status == 6">延迟回忆题目{{ item.startTmie }}分钟后可继续</div>
                        <div class="text red" v-if="item.status == 7">延迟回忆题目剩余答题时间：{{ item.endTmie }}分钟。</div>
                        <div class="text" v-if="item.status == 8">延迟回忆题目已超时无法继续答题</div>
                    </div>

                    <div class="btn gray" v-if="item.status == 3">已完成</div>
                    <div :class="['btn', item.status == 6 ? 'gray' : '']" v-if="item.status == 6 || item.status == 7"
                        @click="answer(item)">去答题</div>
                    <div class="btn gray" v-if="item.status == 8" @click="sure(item)">去确认</div>
                </div>
            </div>
            <div class="no_message" v-else>
                <img src="@/assets/images/nomessage.png">
                <p>暂无消息通知</p>
            </div>
        </div>
        <div class="bottom" @click="remove">清空通知</div>
    </div>

    <div class="head-box" v-if="userStore.userInfor">
        <!-- <div class="head-left" v-if="userStore.personInfor.channelCode === 'TBL'">
            <img class="logo" src="@/assets/images/logo2.png" alt="">
        </div>
        <div class="head-left" v-if="userStore.personInfor.channelCode != 'TBL'">
            <img class="logo" v-if="userStore.userInfor.appLogo" :src="userStore.userInfor?.appLogo" alt="">
        </div> -->
        <div class="head-left">
            <img class="logo" v-if="userStore.userInfor.appLogo" :src="userStore.userInfor?.appLogo" alt="">
            <img class="logo" v-else src="@/assets/images/logo2.png" alt="">
        </div>
        <div class="head-right">
            <div class="btn-set">
                <!-- <setting-outlined class="ico" />
                <div>设置</div> -->
            </div>
            <img v-if="userStore.personInfor.pictureUrl" class="head-sculpture" :src="userStore.personInfor.pictureUrl"
                alt="">
            <img v-else class="head-sculpture" src="@/assets/images/default.png" alt="">
            <div class="title-rigth">
                <span class="user-title">官方助手</span> <br />
                <span class="user-name">{{ userStore.personInfor.name }}</span>
            </div>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { useUserStore } from "@/stores/user"
import { useRouter } from 'vue-router';
import { onMounted, ref, onUnmounted } from 'vue'
import { getMessage, clearMessage } from '@/apis/home/index'
import { message } from 'ant-design-vue';
const userStore = useUserStore()
const router = useRouter()
console.log(router)
const countAdd = ref<number>(0)
const show = ref<boolean>(false)
//status  3:已完成,评估成功,置灰按钮  文案:延迟回忆题目已完成
//6:去答题,等待期置灰按钮  文案:延迟回忆题目25分钟后可继续
//7:去答题,可点击跳转第三题  
//8:已经超时,去确认,预提交页  文案:延迟回忆题目已超时无法继续答题
onUnmounted(() => {
    clearInterval(timeKey);
});

onMounted(() => {
    getList()
    setCountTime()
})

// 获取assets静态资源
const getAssetsFile = (url: string) => {
    return new URL(`/src/assets/images/${url}`, import.meta.url).href;
};


const close = () => {
    show.value = false
}

const showMessage = () => {
    show.value = !show.value
}
const showAnmiate = ref<boolean>(false)
//获取信息

const list = ref<any>([])
const getList = () => {
    getMessage().then(res => {
        if (res.code == 200) {
            console.log(res)
            list.value = res.data
            const timeNow = new Date();
            list.value.forEach((el: any) => {
                el.endTmie = Math.floor((new Date(el.unableTime).getTime() - timeNow.getTime()) / (60 * 1000))
                el.startTmie = Math.floor((new Date(el.ableTime).getTime() - timeNow.getTime()) / (60 * 1000))
                if (el.endTmie < 3 && el.endTmie > 0) {
                    showAnmiate.value = true
                }
            })
            console.log(list.value)
        }
    })
}
//清除信息
const remove = () => {
    clearMessage().then(res => {
        if (res.code == 200) {
            message.success(res.msg);
            getList()
            showAnmiate.value = false
        }
    })
}
//轮询查询
let timeKey: NodeJS.Timeout;
const setCountTime = () => {
    timeKey = setInterval(() => {
        countAdd.value += 1
        if (countAdd.value % 30 === 0) {
            getList()
        }
    }, 1000)
};

const answer = (val: any) => {
    showAnmiate.value = false
    if (val.status == 6) {
        return;
    }
    if (val.status == 7) {
        router.push({
            path: '/templateCFT',
            query: {
                statusType: 7,
                estimateNum: val.estimateNum,
                checkService: 'CFT',
                ticketCode: val.ticketCode,
                timeCount: val.timeCount
            }
        })
    }

}

const sure = (val: any) => {
    showAnmiate.value = false
    router.push({
        path: '/scaleResultTemplate',
        query: {
            archivesNo: val.archivesNo,
            estimateNum: val.estimateNum
        }
    })
}
</script>
<style lang='less' scoped>
.clock {
    width: 50px;
    height: 50px;
    position: absolute;
    right: 200px;
    top: 20px;

    .img {
        width: 30px;
        height: 30px;
        margin: auto;

        img {
            width: 30px;
            height: 30px;
        }
    }

    .num {
        width: 30px;
        position: absolute;
        top: 0px;
        right: 0px;
        text-align: center;
        color: #fff;
        font-weight: bold;
        font-size: 13px;
        background: #FF0004;
        border-radius: 10px;
    }
}

.messags_box {
    width: 450px;
    height: 450px;
    background-color: #fff;
    border-radius: 16px;
    position: absolute;
    right: 10px;
    top: 55px;
    z-index: 5;
    box-shadow: 0px -2px 8px 1px rgba(59, 59, 59, 0.11);
    border-radius: 11px;
    border: 1px solid #E4E4E4;

    .top {
        width: 100%;
        height: 50px;
        padding: 0px 20px;
        font-size: 16px;
        color: #222;
        font-weight: bold;
        border-bottom-left-radius: 1px solid #E4E4E4;
        border-bottom-right-radius: 1px solid #E4E4E4;
        line-height: 50px;
        display: flex;
        justify-content: space-between;

        .close {
            width: 20px;
            height: 20px;
        }
    }

    .cont {
        width: 100%;

        .no_message {
            width: 30%;
            height: 200px;
            text-align: center;
            margin: 80px auto;

            img {
                width: 136px;
                height: 185px;
            }

            p {
                line-height: 35px;
                color: #6F6F6F;
                font-size: 14px;
            }
        }

        .con_list {
            width: 100%;
            height: 350px;
            overflow: hidden;
            overflow-y: scroll;

            .list_one {
                width: 100%;
                height: 90px;
                padding: 20px;
                display: flex;
                align-content: center;
                justify-content: space-around;

                .one_img {
                    width: 88px;
                    height: 66px;

                    img {
                        width: 88px;
                        height: 66px;
                    }
                }

                .message {
                    width: 200px;
                    height: 80px;

                    .info {
                        display: flex;

                        .name {
                            width: 80px;
                            line-height: 20px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            font-size: 18px;
                            color: #222;
                            font-weight: bold;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }

                        .phone {
                            margin-left: 20px;
                            color: #6F6F6F;
                            font-size: 14px;
                            line-height: 19px;
                        }
                    }

                    .title {
                        width: 200px;
                        height: 30px;
                        line-height: 30px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }

                    .text {
                        font-size: 12px;
                        color: #6F6F6F;
                    }

                    .red {
                        color: red;
                    }
                }

                .btn {
                    width: 70px;
                    height: 30px;
                    background: #3D7EFF;
                    box-shadow: 0px 2px 18px 0px rgba(87, 102, 254, 0.07);
                    border-radius: 6px;
                    color: #fff;
                    text-align: center;
                    line-height: 30px;
                    margin-top: 30px;
                }

                .gray {
                    background: #BBB;
                }
            }
        }
    }

    .bottom {
        width: 100%;
        height: 50px;
        font-size: 16px;
        color: #808080;
        background: #F5F8FF;
        text-align: center;
        font-weight: bold;
        border-top: 1px solid #E4E4E4;
        line-height: 50px;
        border-radius: 0 0 12px 12px;
    }
}

.head-box {
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    padding: 0px 20px 0 0;
    justify-content: space-between;

    .head-left {
        padding-left: 15px;
        width: 187.5px;
        height: 48.5px;

        .logo {
            width: 187.5px;
            height: 48.5px;
        }
    }

    .head-right {
        display: flex;
        align-items: center;

        .btn-set {
            width: 36px;
            text-align: center;
            color: rgba(114, 114, 114, 1);
            margin-right: 10px;
            cursor: pointer;

            .ico {
                margin-top: 5px;
                font-size: 17px;
            }

            &>div {
                font-size: 13px;
            }
        }

        .head-sculpture {
            display: block;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            box-shadow: 0px 0px 3px -1px #bfbcbc;
        }


    }

    .title-rigth {

        display: flex;
        flex-wrap: wrap;
        width: 100px;
        margin-left: 15px;

        &>span {
            display: block;
            width: 100%;
        }

        .user-title {
            font-size: 12px;
            font-weight: 400;
            color: #000;
        }

        .user-name {
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #B4B4B4;
        }

    }


}
</style>