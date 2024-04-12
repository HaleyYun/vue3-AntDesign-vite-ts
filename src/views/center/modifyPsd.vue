<template>
    <div class="page">
        <div class="pop-up">
            <div class="top" @click="$router.push('/person/center')">
                <div style="width:20px;height:20px;"><img class="top_01" src="@/assets/images/back.png" /></div>
                <div class="top_02">修改密码</div>
            </div>

            <div class="form-box">
                <a-form class="my-form modifyPsd-form" :model="formState" :rules="rules" name="basic" ref="formRef"
                    :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" autocomplete="off">
                    <a-form-item label="旧密码：" name="oldPassword">
                        <input :class="formState.oldPassword ? 'input-p' : ''" v-model="formState.oldPassword"
                            placeholder="请输入旧密码" type="text" maxlength="50"
                            @keyup="formState.oldPassword = formState.oldPassword.replace(/[^\w]/g, '')"
                            @paste.prevent="onPause">
                    </a-form-item>
                    <a-form-item label="新密码：" name="firstNewPassword">
                        <input :class="formState.firstNewPassword ? 'input-p' : ''" v-model="formState.firstNewPassword"
                            @keyup="formState.firstNewPassword = formState.firstNewPassword.replace(/[^\w]/g, '')"
                            placeholder="请输入6个字符以上数字、字母或数字字母组合密码" type="text" maxlength="50" @paste.prevent="onPause">
                    </a-form-item>
                    <a-form-item label="确认密码：" name="secondNewPassword">
                        <input :class="formState.secondNewPassword ? 'input-p' : ''" v-model="formState.secondNewPassword"
                            @keyup="formState.secondNewPassword = formState.secondNewPassword.replace(/[^\w]/g, '')"
                            placeholder="请在输入一次新密码" type="text" maxlength="50" @paste.prevent="onPause">
                    </a-form-item>
                </a-form>
            </div>
            <div class="btn-box">
                <button @click="router.back()">取消</button>
                <button @click="upDataPassword">确定</button>
            </div>

        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { editPassword } from '@/apis/user/index'
import type { Rule } from 'ant-design-vue/es/form';
import { message } from 'ant-design-vue';
import { useUserStore } from '../../stores/user'
const router = useRouter()
const userStore = useUserStore()
interface FormState {
    oldPassword: string;
    firstNewPassword: string;
    secondNewPassword: string;
}
const formRef = ref();
const rules: Record<string, Rule[]> = {
    oldPassword: [
        { required: true, message: '旧密码不能为空', trigger: 'change' },
    ],
    firstNewPassword: [
        { required: true, message: '新密码不能为空', trigger: 'blur' },
        { min: 6, max: 50, message: '新密码长度6-50位', trigger: 'blur' },
    ],
    secondNewPassword: [
        { required: true, message: '确认密码不能为空', trigger: 'blur' },
        { min: 6, max: 50, message: '确认密码长度6-50位', trigger: 'blur' },
    ],
};
const formState = reactive<FormState>({
    oldPassword: '',
    firstNewPassword: '',
    secondNewPassword: '',
});
const upDataPassword = () => {
    formRef.value
        .validate()
        .then(() => {
            editPassword(formState).then(res => {
                if (res.code === 200) {
                    console.log(res)
                    if (res.data.updateSuccess) {
                        sessionStorage.clear()
                        localStorage.removeItem('state')
                        localStorage.removeItem('report')
                        localStorage.removeItem('backVideo')
                        localStorage.removeItem('user')
                        localStorage.removeItem('eyesGame')
                        userStore.userInfor = undefined
                        router.push('/login')
                    } else {
                        message.warning(res.data.failMessage);
                    }
                }
            })
        })
}
const onPause = () => {
    return false
}
</script>

<style lang="less" scoped>
.page {
    width: 100vw;
    height: 100vh;
    position: relative;
    

    .top {
        display: flex;
        align-items: center;
        justify-content: start;
        margin:30px;
        
    }

.top_01 {
    width: 21px;
    height: 21px;
    vertical-align: middle;
}

.top_02 {
    font-size: 16px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #222;
    line-height: 35px;
}


    .pop-up {
        width: 92%;
        height: 88%;
        background: #FFFFFF;
        border-radius: 16px;
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -45%);

   

        p {
            text-align: center;
            font-size: 20px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: bold;
            color: #5D5D5D;
            line-height: 28px;
            padding: 22px 0 61px 0;
        }

        .form-box {
            width: 100%;
            padding: 0 72px 53px 27px;
            box-sizing: border-box;
            margin-top:100px;

            .my-form {
                font-weight: bold;
                font-size: 20px;

                .ant-form-item {
                    font-size: 20px;
                    height: 64px;
                }

                input {
                    width: 550px;
                    height: 46px;
                    margin-left: 10px;
                    background: rgba(216, 216, 216, 0.19);
                    border-radius: 8px;
                    border: 1px solid rgba(151, 151, 151, 0.24);
                    padding: 10px 12px 17px;
                    box-sizing: border-box;
                    opacity: 1;
                    color: #222222;
                    line-height: 26px;

                    &:focus {
                        border-color: #4096ff;
                        box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
                        border-inline-end-width: 1px;
                        outline: 0;
                    }

                    &::-webkit-input-placeholder {
                        color: #A4A2A2;
                        font-size: 12px;
                    }

                }

                .input-p {
                    padding: 10px 12px;
                }
            }

        }

        .btn-box {
            display: flex;
            justify-content: center;
            align-items: center;

            button {
                width: 162px;
                height: 54px;
                font-size: 22px;
                font-family: PingFang-SC-Bold, PingFang-SC;
                font-weight: bold;
                border-radius: 27px;
                border: none;
                margin: 0 12px;

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
</style>

<style>
.modifyPsd-form .ant-form-item .ant-form-item-label>label {
    font-size: 20px;
    height: 46px;
}
</style>