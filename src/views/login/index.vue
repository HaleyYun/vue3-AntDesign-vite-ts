<template>
    <div class="content login-wap">
        <div class="left" :style="{ height: imgHeight + 'px' }">
            <img src="@/assets/images/bglogin1.png" alt="">
        </div>
        <div class="right">
            <div class="login">
                <div class="logo">
                    <img src="~@/assets/images/login_user.png" />
                </div>
                <a-form :model="loginForm" ref="loginRef" autocomplete="off" @finish="onFinish" class="form">
                    <a-form-item name="username" :rules="[{ required: true, message: '请输入用户名' }]">
                        <a-input v-model:value="loginForm.username" class="input" placeholder="请输入用户名">
                            <template #prefix>
                                <img src="~@/assets/images/user@3x.png" />
                            </template>
                        </a-input>
                    </a-form-item>

                    <a-form-item name="password" :rules="[{ required: true, message: '请输入密码' }]"
                        style="margin-bottom: 4px;">
                        <a-input-password v-model:value="loginForm.password" class="input" placeholder="请输入密码"
                            :maxlength="50">
                            <template #prefix>
                                <img src="~@/assets/images/lock@3x.png" />
                            </template>
                        </a-input-password>
                    </a-form-item>

                    <a-form-item>
                        <a-checkbox v-model:checked="loginForm.memoryPassword" style="margin-bottom: 15px;">
                            <span class="clause">记住密码</span>
                        </a-checkbox>
                        <a-button type="primary" class="submit" @click="handleSubmit">同意协议并登录</a-button>
                        <a-row class="read-terms">
                            <a-col :span="24" style="text-align: center;">
                                <a-checkbox v-model:checked="formState.isRead" @change="readProtocol">
                                    <span class="clause">我已同意<span v-if="agreementText!=''">《阅读条款名称》</span></span>
                                </a-checkbox>
                            </a-col>
                        </a-row>
                        <!-- 先注释忘记密码 -->
                        <!-- <a-row class="read-terms">
                            <a-col :span="12">
                                <div class="forget">忘记密码？</div>
                            </a-col>
                        </a-row> -->
                    </a-form-item>
                </a-form>
            </div>
            <div class="bottom">&copy;Copyright {{ new Date().getFullYear() }} 织生科技 All Right Reserved.</div>
        </div>
        <a-modal v-model:visible="formState.visible" title="使用条款" :footer="null" width="60%">
            <div class="modal-popu">
                <Agreement :data="agreementText"/>
            </div>
            <div class="button">
                <a-button type="primary" @click="handleOk">我已知晓</a-button>
            </div>
        </a-modal>
    </div>
</template>

<script setup lang='ts'>
import { loginState, loginFormData } from '@/apis/login/type';
import Agreement from "./components/Agreement.vue"
import { reactive, ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { useUserStore } from "@/stores/user"
import { getAppVersion } from '../../apis/home/index'
import { clearCacheFun } from '../../utils/voice'

import { agreement } from '@/apis/user/index'
const agreementText = ref<string>('')


// import { menuApi } from "@/apis/login"
// import { useRouter } from 'vue-router'
// const router = useRouter()
const imgHeight = window.screen.height;
console.log(imgHeight)
onMounted(() => {
    getAppVersion().then(res => {
        if (res.code === 200) {
            try {
                let appVersion = localStorage.getItem('appVersion')
                if (!appVersion) {
                    localStorage.setItem('appVersion', res.data);
                    clearCacheFun();
                } else {
                    if (appVersion !== res.data) {
                        localStorage.setItem('appVersion', res.data);
                        clearCacheFun();
                    }
                }
            } catch (error) {
                console.log('非pad请主动刷新', error);
            }

        }
    })
    // localStorage.clear();
    loginForm.username = localStorage.getItem('username') as string;
    loginForm.password = localStorage.getItem('password') as string;
    // loginForm.memoryPassword = Boolean(localStorage.getItem('memoryPassword'));


    agreement({channelSource:2}).then((res) => {
        console.log(res)
        agreementText.value = res.data[0].serviceAgreement
    })


})
const userStore = useUserStore()

const loginRef = ref<any>(null)
// 账号密码
const loginForm = reactive<loginFormData>({
    username: '',
    password: '',
    appVersion: 0,
    deviceId: '',
    manufacturer: '',
    model: '',
    osVersion: '',
    resolutionX: 0,
    resolutionY: 0,
    memoryPassword: true,
});
// 阅读条款
const formState = reactive<loginState>({
    isRead: false,
    visible: false,
});

const onFinish = (values: any) => {
    console.log('Success:', values);
};

const readProtocol = () => {
    if (formState.isRead) {
        formState.visible = true;
        formState.isRead = false;
    }
}

const handleOk = () => {
    formState.visible = false;
    formState.isRead = true;
};
const handleSubmit = async () => {
    if (!formState.isRead) {
        message.success('请先阅读条款');
        return
    }
    try {
        const values = await loginRef.value.validateFields();
        values.memoryPassword = loginForm.memoryPassword
        await userStore.getUserInfo(values)
        // menuApi().then((res) => {
        //     localStorage.setItem('menu', JSON.stringify(res.data.tproDispositionResponse))
        //     console.log(localStorage.getItem('menu'))
        //     setTimeout(() => {
        //         router.push({
        //             path: res.data.tproDispositionResponse[0].path
        //         })
        //     }, 800)
        // })
        // console.log(userStore.userInfor);
    } catch (errorInfo) {
        console.log('Failed:', errorInfo);
    }
};

</script>

<style lang='less' scoped>
.login-wap {
    display: flex;

    .left {
        width: 480px;
        height: 100vh;

        // background: url("@/assets/images/bglogin1.png")no-repeat;
        img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: fill;
        }
    }

    .right {
        flex: 1;
        position: relative;

        .login {
            position: absolute;
            width: 500px;
            height: 600px;
            top: 50%;
            left: 50%;
            background-size: 100% 100%;
            transform: translate(-50%, -50%);
            margin: 0 auto;
            overflow: hidden;

            .logo {
                width: 228px;
                // height: 85px;
                margin: 60px auto;

                img {
                    display: block;
                    margin: 0 auto;
                    width: 100px;
                    height: 100px;
                }
            }

            .form {
                width: 350px;
                margin: 50px auto 40px;

                .forget {
                    color: #999;
                    text-align: left;
                }

                .submit {
                    width: 100%;
                    height: 45px;
                    border-radius: 5px;
                    background: #536df6;
                    margin-top: 10px;
                    font-size: 17px;
                }

                .input {
                    background: #f6f6f6;
                    border: 0;
                    height: 50px;

                    img {
                        width: 16px;
                        height: 18px;
                    }

                    :deep .ant-input {
                        background-color: #f6f6f6 !important;
                    }
                }
            }

            .read-terms {
                margin-top: 10px;
            }
        }

        .bottom {
            position: absolute;
            width: 100%;
            bottom: 27px;
            text-align: center;
            font-size: 12px;
            color: #999;
        }
    }
}

.clause {
    width: 180px;
    height: 21px;
    font-size: 15px;
    font-weight: 400;
    color: #A4A4A4;
    line-height: 21px;
}

.button {
    height: 50px;
    text-align: center;
    border-top: 1px solid #dedede;
    line-height: 50px;
}

.content {
    width: 100%;
    height: 100vh;
    // background: url('@/assets/images/bg@2x.png') no-repeat center center;
    background-size: 100% 100%;
}

.modal-popu {
    height: 56vh;
    overflow: auto;
}

// :deep(.ant-checkbox) {
//     /* 隐藏复选框原有的样式 */
//     -webkit-appearance: none !important;
//     -moz-appearance: none !important;
//     appearance: none !important;
//     /* 设置宽高为16px */
//     width: 20px !important;
//     height: 20px !important;
//     border: none !important;
//     /* 圆角设置为50% */
//     border-radius: 50% !important;
//     /* 边框样式、颜色、粗细设置 */
//     /* 背景色和选中后的背景色设置 */
//     background-color: #fff !important;
// }
// :deep(.ant-checkbox-inner) {
//     /* 隐藏复选框原有的样式 */
//     -webkit-appearance: none !important;
//     -moz-appearance: none !important;
//     appearance: none !important;
//     /* 设置宽高为16px */
//     width: 20px !important;
//     height: 20px !important;
//     /* 圆角设置为50% */
//     border-radius: 50% !important;
//     border: none !important;
//     /* 边框样式、颜色、粗细设置 */
//     /* 背景色和选中后的背景色设置 */
// }
</style>