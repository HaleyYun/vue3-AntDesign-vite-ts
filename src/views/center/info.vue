<template>
    <div class="content">
        <div class="top" @click="$router.push('/person/center')">
            <img class="top_01" src="@/assets/images/back.png" />
            <span class="top_02">个人信息</span>
        </div>
        <div class="head_pic">
            <div class="head_pic_01">
                <!-- <img src="@/assets/images/center/group.png" /> -->
                <a-upload :customRequest="customRequest" list-type="picture" :max-count="1">
                    <img v-if="picUrl === ''" src="@/assets/images/center/group.png" />
                    <img v-else :src="picUrl" />
                </a-upload>
                <!-- <a-upload
                    :customRequest="customRequest" 
                    >
                    <a-button> -->
                <!-- <upload-outlined></upload-outlined> -->

                <!-- </a-button>
                </a-upload>
                -->
            </div>
        </div>
        <div class="form">
            <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-form-item label="用户名">
                    <a-input v-model:value="formState.name" maxlength="20"/>
                </a-form-item>
                <a-form-item label="性别">
                    <a-radio-group v-model:value="formState.sex">
                        <a-radio :value="1">男</a-radio>
                        <a-radio :value="2">女</a-radio>
                        <a-radio :value="3">未知</a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="年龄">
                    <a-space direction="vertical" :size="12">
                        <a-date-picker v-model:value="formState.birthDate" :format="dateFormat" :inputReadOnly="true" />
                    </a-space>
                </a-form-item>

                <a-form-item label="手机号">
                    <a-input v-model:value="formState.phone" disabled />
                </a-form-item>

            </a-form>
            <div class="bt_div">
                <a-button style="margin-left: 10px;margin-right: 66px;width: 40%;height: 56px;border-radius: 16px;"
                    @click="back">取消</a-button>
                <a-button type="primary" style="width: 40%;height: 56px;border-radius: 16px"
                    @click="onSubmit">确定修改</a-button>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>

import { reactive, toRaw, ref, onMounted } from 'vue';
import type { UnwrapRef } from 'vue';
import dayjs, { Dayjs } from 'dayjs';

import { useUserStore } from "@/stores/user"
import { updatePersonInfo } from "@/apis/user/index"
// import uploadInstance from '@/utils/uploadRequest';
import { message } from 'ant-design-vue';
import { upload } from "@/apis/upload/index"




const userStore = useUserStore()
const picUrl = ref<string>()

interface FormState {
    name: string | any;
    sex: number | any;
    birthDate: string | any;
    phone: string | any;
}
interface labelCol {
    style: any;
}
interface wrapperCol {
    span: number;
}


onMounted(async () => {
    if (userStore.personInfor?.pictureUrl) {
        picUrl.value = userStore.personInfor?.pictureUrl
    } else {
        picUrl.value = ''
    }
    if (userStore.personInfor?.name) {
        formState.name = userStore.personInfor?.name
    } else {
        formState.name = ''
    }
    if (userStore.personInfor?.sex) {
        formState.sex = userStore.personInfor?.sex
    } else {
        formState.sex = 3
    }

    if (userStore.personInfor?.birthDate) {
        formState.birthDate = ref<Dayjs>(dayjs(userStore.personInfor?.birthDate, dateFormat))
    } else {
        formState.birthDate = ref<Dayjs>(dayjs('1993-02-15', dateFormat))
    }

    if (userStore.personInfor?.phone) {
        formState.phone = userStore.personInfor?.phone
    } else {
        formState.phone = ''
    }

})

const dateFormat: any = 'YYYY-MM-DD';

const formState: UnwrapRef<FormState> = reactive({
    name: 'gs',
    sex: 3,
    birthDate: ref<Dayjs>(dayjs('1993-02-15', dateFormat)),
    phone: ''
});
const onSubmit = async () => {
    // console.log('submit!', toRaw(formState));
    let info: any = toRaw(formState);
    // console.log('submit222!', dayjs(JSON.parse(JSON.stringify(formState.birthDate))).format("YYYY-MM-DD"));
    let date: any;
    if (formState.birthDate) {
        date = dayjs(JSON.parse(JSON.stringify(formState.birthDate))).format("YYYY-MM-DD");
    } else {
        date = ""
    }
    let res_up: any = await updatePersonInfo({ birthDate: date, name: info.name, phone: info.phone, pictureUrl: picUrl.value, sex: info.sex })
    console.log(res_up)
    if (res_up.code === 200) {
        message.success("修改成功")
        userStore.updatePersonInfo({ birthDate: date, name: info.name, phone: info.phone, pictureUrl: picUrl.value, sex: info.sex })
        router.replace("/person/center")
    }
};
import { useRouter } from 'vue-router'
const router = useRouter()
const back = () => {

    router.go(-1)

}

const labelCol: UnwrapRef<labelCol> = reactive({ style: { width: '64px' } });
const wrapperCol: UnwrapRef<wrapperCol> = reactive({ span: 14 });

//自定义上传
const customRequest = async (params: any) => {
    // params 包含了上传请求的相关参数，例如文件数据、文件名、上传地址等  
    // 在这里你可以自定义上传请求的行为，例如使用第三方上传工具等  

    // 以下是一个示例代码，演示如何使用 axios 发送上传请求  
    const formData = new FormData();
    formData.append('file', params.file); // 添加文件数据  
    formData.append('filename', params.filename); // 添加文件名  

    const upload_res = await upload(formData);
    console.log('上传结果:')
    console.log(upload_res)
    if (upload_res.data.url) {

        let info: any = toRaw(formState);
        let date: any = dayjs(JSON.parse(JSON.stringify(formState.birthDate))).format("YYYY-MM-DD");

        let res_up: any = await updatePersonInfo({ birthDate: date, name: info.name, phone: info.phone, pictureUrl: picUrl.value, sex: info.sex })
        if (res_up.code === 200) {
            message.success("更新头像成功");
            picUrl.value = upload_res.data.url;

            userStore.updatePersonInfo({ birthDate: date, name: info.name, phone: info.phone, pictureUrl: picUrl.value, sex: info.sex })
        }

    } else {
        message.error('服务器开小差~,请重新上传');

    }

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

.top {
    display: flex;
    width: 100%;
    align-items: center;
    margin-top: 26px;
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
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #222222;
    line-height: 22px;
    display: inline-block;
}

.head_pic {
    width: 100%;
    height: 168px;
    margin: 0 auto;
}

.head_pic_01 {
    width: 168px;
    height: 168px;
    margin: 0 auto;
    text-align: center;
}

.head_pic img {
    width: 128px;
    height: 128px;
    border-radius: 50%;
}

.form {
    width: 50%;
    margin: 0 auto;
    height: 100%;
}

.bt_div {
    height: 56px;
    width: 50%;
    position: absolute;
    bottom: 28px;
    line-height: 56px;
}

:deep(.ant-form-item-label>label){
    font-size: 16px;
    font-weight: bold;
    color: #4C4C4C;
}

:deep(.ant-form-item-control-input) {
    min-height: 44px;
}

:deep(.ant-form-item-label){
    flex: 1;
    text-align: left;
}

:deep(.ant-form-horizontal .ant-form-item-control){
    flex: 5 !important;
    background: #F7F8FA;
    border-radius: 8px;
}

:deep(.ant-col-14) {
    max-width: 100%;
}

:deep(.ant-input){
    border-color: transparent;
    background: #F7F8FA;
}

:deep(.ant-radio-group) {
    margin-left: 10px;
}

:deep(.ant-picker){
    background: #F7F8FA;
    border: none;
}

:deep(.ant-upload-list-picture) {
    display: none;
}

:deep(.ant-space-vertical) {
    width: 100%;
}
</style>