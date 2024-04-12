<script setup  lang='ts'>
import type { recordsBaseRequest } from "@/stores/types/type"
import type { Rule } from 'ant-design-vue/es/form';
import { Form } from 'ant-design-vue';
import dayjs, { Dayjs } from 'dayjs';
import { archives, getCode, verifyCode } from "@/apis/dictionaries"
// 
import { useClienteleData } from "@/stores/clienteleData"
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from "vue-router"
import { message } from 'ant-design-vue';
import { sexEnum, educationEnum } from '../../../enum/archivesEnum'


const router = useRouter()
const ClienteleData = useClienteleData()
const emits = defineEmits(['next', 'previous'])

//  form
// 手机正则
let phoneReg = async (_rule: Rule, value: string) => {
    const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    console.log(!reg.test('19512352742'))
    if (value === '') {
        return Promise.reject('请输入手机号');
        // 请输入正确手机号
    } else if (!reg.test(value)) {
        return Promise.reject("请输入正确手机号");
    } else {
        return Promise.resolve();
    }
}
const useForm = Form.useForm;
const dateFormat = 'YYYY-MM-DD';
const formState = reactive<recordsBaseRequest>({
    birthday: (dayjs('1990-01-01', dateFormat)),
    education: '',
    name: '',
    phone: '',
    // relations: '',
    sex: 1
});
// recordsBaseRequest
dayjs('1990-01-01', 'YYYY-MM-DD')
// const educationList = ref<{ dictLabel: string, dictValue: string }[]>()
const rulesRef = reactive({
    birthday: [{ required: true, message: '请选择出生日期', trigger: 'change' }],
    education: [{ required: true, message: '请选择教育背景', trigger: 'change' }],
    // relations: [{ required: true, message: '请输入', trigger: 'change' }],
    name: [{ required: true, message: '请输入姓名', trigger: 'change' }],
    phone: [
        { required: true, validator: phoneReg, trigger: 'change' },
    ],
    sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
});
const { validate, validateInfos } = useForm(formState, rulesRef);
onMounted(async () => {

    console.log(ClienteleData.editStatus, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');

    if (ClienteleData.editStatus) {
        formState.archivesNo = ClienteleData.RecordInfo.healthRecordsBase!.archivesNo;
        formState.birthday = ref<Dayjs>(dayjs(ClienteleData.RecordInfo.healthRecordsBase!.birthday, 'YYYY-MM-DD'))
        formState.education = ClienteleData.RecordInfo.healthRecordsBase!.education
        formState.name = ClienteleData.RecordInfo.healthRecordsBase!.name
        formState.phone = ClienteleData.RecordInfo.healthRecordsBase!.phone
        formState.sex = ClienteleData.RecordInfo.healthRecordsBase!.sex
    }

    // let educationRes = await QueryDictionaries({ dictType: "health_education" });
    // let asr = await QueryDictionaries({ dictType: "health_relations" });
    // formState.relations = asr.data[1].dictValue
    // educationList.value = educationRes.data
})

// 提交
const onSubmit = () => {
    if (!ClienteleData.editStatus) {
        archives({
            phone: formState.phone
        }).then((res: any) => {
            if (res.data == 0) {
                validate().then(() => {
                    ClienteleData.changeRecordsBaseRequest(formState);
                    emits('next')
                    emits('previous')
                }).catch((err: any) => {
                    console.log('error', err);
                });
            } else if (res.data == 1) {
                exist.value = true
            } else if (res.data == 2) {
                masking.value = true
            }
        })
    } else {
        validate().then(() => {
            ClienteleData.changeRecordsBaseRequest(formState);
            emits('next')
            emits('previous')
        }).catch((err: any) => {
            console.log('error', err);
        });
    }
};
// 验证码弹框
let masking = ref<boolean>(false);
// 验证码倒计时
let codeButShow = ref(true)
let seconds = ref(60)
let countdown = () => {
    if (seconds.value >= 0) {
        window.setTimeout(() => {
            seconds.value -= 1
            countdown()
        }, 1000);
    } else {
        seconds.value = 60
        codeButShow.value = true
    }
}
// 一件授权
let accredit = () => {
    verifyCode({
        phone: formState.phone
    }).then((res: any) => {
        if (res.code == 200) {
            gainFocus()
            codeButShow.value = false
            countdown = () => {
                if (seconds.value >= 0) {
                    window.setTimeout(() => {
                        seconds.value -= 1
                        countdown()
                    }, 1000);
                } else {
                    seconds.value = 60
                    codeButShow.value = true
                }
            }
            countdown()
            message.success('验证码发送成功');
        } else {
            message.error('验证码发送失败');
        }
    })
}
// 更换手机号and关闭
let offMasking = () => {
    masking.value = false
    codeButShow.value = true
    seconds.value = 60
    countdown = () => { }
    let arr = code.reverse()
    for (let index = 0; index < arr.length; index++) {
        if (arr[index].number != '') {
            BackSpace(5 - index)
        }
    }
    for (let index = 0; index < code.length; index++) {
        code[index].number = ''
    }
    if (code[5].isRead==false) {
        code[5].isRead=true
        code[0].isRead=false
    }
}
// 输入框
let attr = ref<any>(null);
let code = reactive<any>([
    { number: '', isRead: false },
    { number: '', isRead: true },
    { number: '', isRead: true },
    { number: '', isRead: true },
    { number: '', isRead: true },
    { number: '', isRead: true },
]);
// 输入点击
let gainFocus = () => {
    attr.value.children[code.findIndex((item: any) => { return item.isRead == false })].children[0].focus()
}
// 复制的验证码
let copyNum = (num: any) => {
    for (let i = 0; i < num.toString().length; i++) {
        if (isNaN(parseInt(num.toString()[i]))) {
            code[i].number = ''
            break
        };
        if (i > 5) break;
        code[i].number = num.toString()[i];
        if (i < 5) {
            code[i].isRead = true;
            code[i + 1].isRead = false;
            attr.value.children[i + 1].children[0].focus();
        } else {
            code[i].isRead = true;
            let codeIntegrity = code[0].number.toString() + code[1].number.toString() + code[2].number.toString() + code[3].number.toString() + code[4].number.toString() + code[5].number.toString()
            getCode({
                code: codeIntegrity,
                phone: formState.phone
            }).then((res: any) => {
                if (res.data == true) {
                    message.success('用户档案已复制成功');
                    router.push({
                        path: '/assessment/management'
                    });
                } else {
                    for (let index = 0; index < code.length; index++) {
                        BackSpace(5-index)
                    }
                }
            })
        }
    }
};
// 删除code
let BackSpace = (index: number) => {
    if (index == 0) return;
    code[index].isRead = true;
    code[index - 1].isRead = false;
    attr.value.children[index - 1].children[0].focus()
    code[index].number = '';
    code[index - 1].number = '';
    console.log(code);
}
// 输入code
let inputMsg = (index: number) => {
    let num = code[index].number;
    if (num.toString().length > 1) {
        copyNum(num);
    } else {
        if (isNaN(parseInt(num))) {
            code[index].number = '';
            return;
        }
        code[index].isRead = true;
        if (index >= 5) {
            let codeIntegrity = code[0].number.toString() + code[1].number.toString() + code[2].number.toString() + code[3].number.toString() + code[4].number.toString() + code[5].number.toString()
            getCode({
                code: codeIntegrity,
                phone: formState.phone
            }).then((res: any) => {
                if (res.data == true) {
                    message.success('用户档案已复制成功');
                    router.push({
                        path: '/assessment/management'
                    });
                } else {
                    for (let index = 0; index < code.length; index++) {
                        BackSpace(5-index)
                    }
                }
            })
        } else {
            code[index + 1].isRead = false;
            attr.value.children[index + 1].children[0].focus();
        }
    }
}
// 存在确认弹框
let exist = ref(false)
// let offExist = ()=>{
//     exist.value = false
// }
let goManagement = () => {
    exist.value = false
    router.push({
        path: '/assessment/management'
    });
}
</script>
<template>
    <div>
        <!-- 验证码弹框 -->
        <div class="masking" v-if="masking">
            <div class="pop-up">
                <img src="../../../assets/images/close.png" class="close" @click="offMasking" alt="">
                <div class="title">信息确认</div>
                <div class="message">您的手机号{{ formState.phone }}已存在档案，如您需要使用，请点击授权验证成功后将直接复用</div>
                <div class="input" ref="attr">
                    <div v-for="(item, index) in code" :key="index" @click="gainFocus">
                        <input type="number" v-model="item.number" :readonly="item.isRead"
                            @keyup.delete="() => BackSpace(index)" @input="() => inputMsg(index)">
                    </div>
                </div>
                <div class="button">
                    <a-button class="switch" @click="offMasking">更换手机号</a-button>
                    <a-button type="primary" class="accredit" @click="accredit" v-if="codeButShow">一键授权</a-button>
                    <a-button class="countdown" v-else>{{ seconds }}s</a-button>
                </div>
            </div>
        </div>
        <!-- 确定弹框 -->
        <div class="masking" v-if="exist">
            <div class="pop-exist">
                <img src="../../../assets/images/close.png" class="close" @click="goManagement()" alt="">
                <div class="exist-title">提示</div>
                <div class="exist-content">对不起，该用户已经被其他人员添加过，不允许再次添加！</div>
                <div class="exist-verify"><a-button class="verify" @click="goManagement()">确定</a-button></div>
            </div>
        </div>
        <!-- 表单 -->
        <a-form class="add-dan" :model="formState" name="nest-messages">
            <a-form-item label="姓名" v-bind="validateInfos.name">
                <a-input v-model:value="formState.name" maxlength="20"/>
            </a-form-item>
            <a-form-item label="性别" v-bind="validateInfos.sex" class="sex-box">
                <a-radio-group v-model:value="formState.sex">
                    <a-radio :value="item.value" v-for="item in sexEnum" :key="item.value">{{ item.label }}</a-radio>
                    <!-- <a-radio :value="1">男</a-radio>
                    <a-radio :value="2">女</a-radio>
                    <a-radio :value="3">未知</a-radio> -->
                </a-radio-group>
            </a-form-item>
            <a-form-item label="出生日期" v-bind="validateInfos.birthday" size="large">
                <!-- v-model:value="formState.birthday" -->
                <a-date-picker v-model:value="formState.birthday" format="YYYY-MM-DD" :inputReadOnly="true" />
            </a-form-item>
            <a-form-item label="教育背景" v-bind="validateInfos.education">
                <a-select ref="select" v-model:value="formState.education">
                    <a-select-option v-for="item in educationEnum" :key="item.value" :value="item.value">{{
                        item.label }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="手机号码" v-bind="validateInfos.phone">
                <a-input v-model:value="formState.phone" maxlength="11" />
            </a-form-item>
        </a-form>
        <span class="step-btn" @click.prevent="onSubmit">下一步</span>
    </div>
</template>

<style lang='less' scoped>
.masking {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;

    .pop-up {
        width: 522px;
        height: 458px;
        background: #FFFFFF;
        border-radius: 16px;
        padding: 20px 20px 38px 20px;
        box-sizing: border-box;

        .close {
            width: 24px;
            height: 24px;
        }

        .title {
            font-size: 20px;
            font-weight: 400;
            color: #B0B0B0;
            text-align: center;
        }

        .message {
            font-size: 22px;
            font-weight: 600;
            color: #222222;
            padding: 0 46px;
            margin-top: 15px;
        }

        .input {
            display: flex;
            justify-content: center;
            margin-top: 50px;

            div {
                width: 46px;
                height: 66px;
                background: #F6F8FC;
                border-radius: 5px;
                margin: 0 3px;

                input {
                    width: 46px;
                    height: 66px;
                    background: #F6F8FC;
                    border-radius: 5px;
                    border: none;
                    outline: none;
                    text-align: center;
                    font-size: 28px;
                    font-weight: bold;
                    color: #222222;
                }
            }
        }

        .button {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 67px;

            .switch {
                border: none;
                background: #F5F8FD;
                font-size: 22px;
                font-weight: 600;
                color: #3D7EFF;
            }

            .accredit {
                font-size: 22px;
                font-weight: bold;
                color: #FFFFFF;
                margin-left: 26px;
            }

            .countdown {
                border: none;
                background: #C4C4C4;
                font-size: 22px;
                font-weight: 600;
                color: #fff;
                margin-left: 26px;
            }
        }
    }

    .pop-exist {
        width: 460px;
        height: 320px;
        background: #FFFFFF;
        border-radius: 16px;
        padding: 20px 20px 28px 20px;
        box-sizing: border-box;

        .close {
            width: 24px;
            height: 24px;
        }

        .exist-title {
            font-size: 28px;
            font-weight: bold;
            color: #222222;
            width: fit-content;
            margin-left: 23px;
            margin-top: 18px;
        }

        .exist-content {
            font-size: 20px;
            font-weight: 400;
            color: #777777;
            width: fit-content;
            margin-left: 23px;
            margin-top: 5px;
        }

        .exist-verify {
            width: fit-content;
            margin: 54px auto 0;

            .verify {
                width: 337px;
                height: 54px;
                border: none;
                color: #fff;
                background: #3D7EFF;
            }
        }
    }
}

.ant-btn {
    width: 170px;
    height: 54px;
    border-radius: 27px;
}

.add-dan {
    width: 600px;
    margin: 0 auto;
    margin-top: 100px;
}

:deep(.ant-input) {
    height: 40px;
    border-radius: 8px;
    background-color: rgba(247, 248, 250, 1) !important;
    border: 1px solid rgba(247, 248, 250, 1);
}

:deep(.add-dan .ant-input) {
    background-color: transparent;
}

:deep(.ant-form-item-control-input) {
    color: rgba(119, 119, 119, 1);
    // min-height: 40px;
}

// :deep(.ant-form-item-control){
// height: 40px;
// background-color: rgba(247, 248, 250, 1);
// }
:deep(.ant-picker) {
    width: 100%;
    height: 40px;
    border-radius: 8px;
    border-radius: 8px;
    background-color: rgba(247, 248, 250, 1);
    border: 1px solid rgba(247, 248, 250, 1);
}

:deep(.ant-select:not(.ant-select-customize-input) .ant-select-selector) {
    width: 100%;
    height: 40px;
    background-color: rgba(247, 248, 250, 1);
    border: 1px solid rgba(247, 248, 250, 1);
    border-radius: 8px;
    align-items: center;
}

:deep(.ant-form-item-label > label) {
    width: 100px;
}

:deep(.sex-box .ant-form-item-control-input) {
    padding-left: 10px;
    height: 40px;
    background-color: rgba(247, 248, 250, 1);
    border-radius: 8px;
    border: 1px solid rgba(247, 248, 250, 1);
}
</style>