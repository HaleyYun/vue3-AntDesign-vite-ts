<template>
    <div class="content">
        <div class="head_pic">
            <div class="head_pic_01">
                <img v-if="picUrl === ''" src="@/assets/images/default.png" />
                <img v-else :src="picUrl" />
            </div>
        </div>
        <div class="list">
            <div>
                <div @click="$router.push('/person/info')">
                    <img src="@/assets/images/center/person.png" />
                    <span class="list_span">个人信息</span>
                </div>
            </div>
            <div v-if="agreementText!=''">
                <div @click="$router.push('/person/agreement')">
                    <img src="@/assets/images/center/agree.png" />
                    <span class="list_span">用户协议</span>
                </div>
            </div>
            <div>
                <div>
                    <img src="@/assets/images/center/version.png" />
                    <span class="list_span" @click="testLog">当前版本v{{ appVersion }}</span>
                </div>
            </div>
            <div>
                <div>
                    <img src="@/assets/images/center/upload.png" />
                    <span class="list_span">点击更新版本</span>
                </div>
            </div>
            <div>
                <div @click="$router.push('/person/modifyPsd')">
                    <img src="@/assets/images/center/password.png" />
                    <span class="list_span">修改密码</span>
                </div>
            </div>
        </div>
        <div class="logout">
            <span @click="loginOut">退出登录</span>
        </div>

    </div>
</template>

<script setup lang='ts'>
// import { useRouter} from 'vue-router'
import { useUserStore } from "@/stores/user"
// import { message } from 'ant-design-vue';
// const router = useRouter()
import { ref, onMounted } from 'vue'

import { getPhoneInfo } from "@/utils/voice"
// import { message } from "ant-design-vue";
import { useState } from '@/stores/state'

import { agreement } from '@/apis/user/index'
const agreementText = ref<string>('')

const state = useState()

const userStore = useUserStore()
const appVersion = ref<string>('2.0.0');
appVersion.value = localStorage.getItem('appVersion') || '2.0.0';
const loginOut = () => {
    userStore.clearUserInfor()
    state.getPageUrl('')
}

const picUrl = ref<string>()
onMounted(async () => {
    picUrl.value = userStore.personInfor?.pictureUrl


    agreement({channelSource:2}).then((res) => {
        console.log(res)
        agreementText.value = res.data[0].serviceAgreement
    })


})

//配合安卓测试日志方法
const testLog = () => {
    getPhoneInfo(getDevs)
}

//获取设备信息
const getDevs = (data: any) => {
    console.log(data)
    // message.success(data)
}


</script>

<style lang='css' scoped>
.content {
    width: auto;
    height: 100%;
    background: #FFFFFF;
    border-radius: 16px;
    box-sizing: border-box;
    padding: 15px 15px;
    position: relative;
}

.head_pic {
    width: 100%;
    height: 168px;
    margin: 0 auto;
}

.head_pic_01 {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;
    margin: 30px auto 0;
    text-align: center;
}

.head_pic_01 img {
    display: block;
    width: 100px;
    height: 100px;
}


.list {
    width: 100%;
    box-sizing: border-box;
    padding: 0px 238px 0px 232px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.list>div {
    width: 160px;
    height: 81px;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    background: #F7F8FA;
    align-items: center;
    border-radius: 8px;
    justify-content: center;
    margin-bottom: 19px;
}

.list img {
    display: block;
    margin: 0px auto 5px;
    width: 24px;
}

.list_span {
    width: 100%;
    height: 20px;
    font-size: 14px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #222222;
    line-height: 20px;
    display: inline-block;

}

.logout {
    width: 100%;
    height: 56px;
    bottom: 30px;
    text-align: center;
    position: absolute;
}

.logout>span {
    margin: 0 auto;
    display: block;
    width: 702px;
    height: 56px;
    background: #F7F8FA;
    border-radius: 28px;
    line-height: 56px;
    font-size: 18px;
    font-weight: bold;
    color: #222222;

}
</style>