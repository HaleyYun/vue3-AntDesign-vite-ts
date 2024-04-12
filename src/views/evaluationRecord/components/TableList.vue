<script setup  lang='ts'>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router'
import { getBHICode, setBHICode, getEstimateCode, setEstimateCode } from "@/apis/evalList/index"
import { message } from 'ant-design-vue';
import { GetEstimatePageResData } from '../../../apis/evalList/type'
const emit = defineEmits(["refreshList"]);
let scrollY = ref<number>(0)
scrollY.value = 440 * window.innerHeight / 800;
const router = useRouter()
const props = defineProps({
    list: {
        type: Array,
    },
    type: {
        type: String,
    }
})
const columns = ref<any[]>([
    {
        title: '档案编号',
        dataIndex: 'archivesNo',
        key: 'archivesNo',
        align: "center",
        width: 220,
    },
    {
        title: '客户',
        dataIndex: 'customName',
        key: 'customName',
        align: "center"

    },
    {
        title: '联系方式',
        dataIndex: 'customPhone',
        key: 'customPhone',
        align: "center"

    },
    {
        title: '日期',
        dataIndex: 'estimateTime',
        key: 'estimateTime',
        align: "center"

    },
    {
        title: '综合脑健康结果',
        dataIndex: 'bhiRiskTypeDesc',
        key: 'bhiRiskTypeDesc',
        align: "center"

    },

    {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        align: "center",
        width: 220,
    },
])

if (props?.type === "报告列表") {
    columns.value = [
        {
            title: '评估编号',
            dataIndex: 'estimateNum',
            key: 'estimateNum',
            align: "center",
            width: 250,
        },
        {
            title: '客户姓名',
            dataIndex: 'customName',
            key: 'customName',
            align: "center"

        },
        {
            title: '联系方式',
            dataIndex: 'customPhone',
            key: 'customPhone',
            align: "center"

        },
        {
            title: '筛查服务',
            dataIndex: 'estimateTime',
            key: 'estimateTime',
            align: "center"

        },
        {
            title: '筛查类型',
            dataIndex: 'type',
            key: 'type',
            align: "center"
        },
        {
            title: '量表名称',
            dataIndex: 'estimateServeName',
            key: 'estimateServeName',
            align: "center",
            width: 330,
        },
        {
            title: '筛查日期',
            dataIndex: 'estimateTime',
            key: 'estimateTime',
            align: "center"
        },
        {
            title: '评估状态',
            dataIndex: 'status',
            key: 'status',
            align: "center"
        },
        {
            title: '评估结果',
            dataIndex: 'risk',
            key: 'risk',
            align: "center"
        },
        {
            title: '筛查员工',
            dataIndex: 'assessor',
            key: 'assessor',
            align: "center"
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align: "center",
            fixed: 'right',
            width: 120,
        },
    ]
} else {
    columns.value = [
        {
            title: '档案编号',
            dataIndex: 'archivesNo',
            key: 'archivesNo',
            align: "center",
            width: 230,
        },
        {
            title: '客户',
            dataIndex: 'customName',
            key: 'customName',
            align: "center"

        },
        {
            title: '联系方式',
            dataIndex: 'customPhone',
            key: 'customPhone',
            align: "center",
        },
        {
            title: '更新时间',
            dataIndex: 'estimateTime',
            key: 'estimateTime',
            align: "center"

        },
        {
            title: '综合脑健康结果',
            dataIndex: 'bhiRiskTypeDesc',
            key: 'bhiRiskTypeDesc',
            align: "center",
            width: 200,
        },

        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align: "center",
            width: 220,
        },
    ]
}


// 查看报告
let archivesNo = ref('')
interface DAMNU_ENABLE {
    [key: string]: string, // 字段扩展声明
};

// 'AD-8': "/adReport?",
// 'MoCA': "/mocaresultPad?",
let enumObj: DAMNU_ENABLE = {
    "EDB-AD": "/eye/report/result?",
    'YY0001': "/depressedResult?",

    'MMSE': "/scaleResultPad?",
    'MoCA': "/scaleResultPad?",
    'AD-8': "/scaleResultPad?",
    'ADL': "/scaleResultPad?",
    'HADS': "/scaleResultPad?",
    'HAMA': "/scaleResultPad?",
    'HAMD-24': "/scaleResultPad?",
    'PHQ-9': "/scaleResultPad?",
    'GAD-7': "/scaleResultPad?",
    'FAQ': "/scaleResultPad?",
    'NPI-Q': '/scaleResultPad?',
    'Mini-cog': '/scaleResultPad?',
    'CFT': '/scaleResultPad?',
    'NINDS-CSN': '/scaleResultPad?',
    'DS': '/scaleResultPad?',
}
// let itemObj: GetEstimatePageResData
const lookReport = (obj: GetEstimatePageResData) => {
    if (obj.status === 5) return
    // itemObj = obj;
    if (!obj.lookReport && props?.type === "报告列表") return testAndVerify(obj)
    if (props?.type === "报告列表") {
        router.push({
            path: "/reportRelast",
            query: {
                estimateNum: obj.estimateNum,
                path: enumObj[obj.estimateServeCode],
                checked: 'true',
            }
        })
        return
    }
    router.push({
        path: "/reportRelast",
        query: {
            archivesNo: obj.archivesNo,
            checked: 'true',
        }
    })
}

const testAndVerify = (row: GetEstimatePageResData) => {
    formData.value.phone = row.customPhone;
    formDataE.phone = row.customPhone;
    formDataE.estimateNum = row.estimateNum;
    archivesNo.value = row.archivesNo;
    masking.value = true;
}

const goServicePack = (row: any) => {
    console.log(row)
    if (row.estimateRights) {
        router.push({
            path: "/screeningServer",
            query: {
                archivesNo: row.archivesNo
            }
        })
        return
    }
    formData.value.phone = row.customPhone
    archivesNo.value = row.archivesNo
    masking.value = true
}

let masking = ref<boolean>(false);

let offExist = () => {
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
    if (code[5].isRead == false) {
        code[5].isRead = true
        code[0].isRead = false
    }
}

const formData = ref({
    phone: '',
    code: ''
});

let attr = ref<any>(null);
let code = reactive<any>([
    { number: '', isRead: false },
    { number: '', isRead: true },
    { number: '', isRead: true },
    { number: '', isRead: true },
    { number: '', isRead: true },
    { number: '', isRead: true },
]);
// 输入点击验证码
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
            formData.value.code = code[0].number.toString() + code[1].number.toString() + code[2].number.toString() + code[3].number.toString() + code[4].number.toString() + code[5].number.toString()

            if (props.type == "报告列表") {
                setEstimateCode({
                    estimateNum: formDataE.estimateNum,
                    code: formData.value.code,
                    phone: formDataE.phone
                }).then(res => {
                    if (res.data) {
                        masking.value = false;
                        emit('refreshList');
                        // router.push({
                        //     path: "/reportRelast",
                        //     query: {
                        //         estimateNum: itemObj.estimateNum,
                        //         path: enumObj[itemObj.estimateServeCode],
                        //         checked: 'true',
                        //     }
                        // })
                    } else {
                        for (let index = 0; index < code.length; index++) {
                            BackSpace(5 - index)
                        }
                    }
                })
                return
            }
            setBHICode({
                code: formData.value.code,
                phone: formData.value.phone
            }).then(res => {
                if (res.data) {
                    router.push({
                        path: "/screeningServer",
                        query: {
                            archivesNo: archivesNo.value
                        }
                    })
                } else {
                    for (let index = 0; index < code.length; index++) {
                        BackSpace(5 - index)
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
            formData.value.code = code[0].number.toString() + code[1].number.toString() + code[2].number.toString() + code[3].number.toString() + code[4].number.toString() + code[5].number.toString()
            if (props.type == "报告列表") {
                setEstimateCode({
                    estimateNum: formDataE.estimateNum,
                    code: formData.value.code,
                    phone: formDataE.phone
                }).then(res => {
                    if (res.data) {
                        masking.value = false;
                        emit('refreshList');
                        // router.push({
                        //     path: "/reportRelast",
                        //     query: {
                        //         estimateNum: itemObj.estimateNum,
                        //         path: enumObj[itemObj.estimateServeCode],
                        //         checked: 'true',
                        //     }
                        // })
                        for (let index = 0; index < code.length; index++) {
                            BackSpace(5 - index)
                        }
                    } else {
                        for (let index = 0; index < code.length; index++) {
                            BackSpace(5 - index)
                        }
                    }
                })
                return
            }
            setBHICode({
                code: formData.value.code,
                phone: formData.value.phone
            }).then(res => {
                if (res.data) {
                    router.push({
                        path: "/screeningServer",
                        query: {
                            archivesNo: archivesNo.value
                        }
                    })
                } else {
                    for (let index = 0; index < code.length; index++) {
                        BackSpace(5 - index)
                    }
                }
            })
        } else {
            code[index + 1].isRead = false;
            attr.value.children[index + 1].children[0].focus();
        }
    }
}
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

let formDataE = {
    phone: "",
    estimateNum: ""
}

const getECode = () => {
    getEstimateCode(formDataE).then(res => {
        if (res.data) {
            message.success('验证码发送成功');
            gainFocus()
            codeButShow.value = false
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
            countdown()
        }
    })
}

// 校验
let accredit = () => {
    getBHICode({
        phone: formData.value.phone
    }).then(res => {
        if (res.data) {
            message.success('验证码发送成功');
            gainFocus()
            codeButShow.value = false
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
            countdown()
        }
    })
}
</script>
<template>
    <!-- 验证码弹框 -->
    <div class="masking" v-if="masking">
        <div class="pop-up">
            <img src="../../../assets/images/close.png" class="close" @click="offExist" alt="">
            <div class="title">提示</div>
            <div class="message">您没有权限查看用户在别的机构所做的评估结果，请向用户获取手机号校验成功后查看！</div>
            <div class="phone">
                <div class="phone-title">手机号</div>
                <div class="phone-input">{{ formData.phone }}</div>
            </div>
            <div class="code">
                <div class="code-title">验证码</div>
                <div class="input" ref="attr">
                    <div v-for="(item, index) in code" :key="index" @click="gainFocus">
                        <input v-model="item.number" :readonly="item.isRead" @keyup.delete="() => BackSpace(index)"
                            @input="() => inputMsg(index)">
                    </div>
                </div>
            </div>
            <div class="button">
                <a-button class="switch" @click="offExist">返回</a-button>
                <a-button type="primary" class="accredit" @click="accredit"
                    v-if="codeButShow && type !== '报告列表'">校验</a-button>
                <a-button type="primary" class="accredit" @click="getECode"
                    v-if="codeButShow && type == '报告列表'">校验</a-button>
                <a-button class="countdown" v-if="!codeButShow">{{ seconds }}s</a-button>
            </div>
        </div>
    </div>
    <!-- 表格 -->
    <a-table :data-source="list" :columns="columns" :pagination="false" class="subscribe-list-tab"
        :scroll="{ y: scrollY, x: type === '报告列表' ? 2000 : 'auto' }">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'bhiRiskTypeDesc'">
                <div style="color:#3C86FE" v-if="record.bhiRiskTypeDesc == '正常'" class="result-1">
                    {{ record.bhiRiskTypeDesc }}
                </div>
                <div style="color:#F1C12E" v-if="record.bhiRiskTypeDesc == '低风险'" class="result-2">
                    {{ record.bhiRiskTypeDesc }}
                </div>
                <div style="color:#FF7D07" v-if="record.bhiRiskTypeDesc == '中风险'" class="result-3">
                    {{ record.bhiRiskTypeDesc }}
                </div>
                <div style="color:#FE3B00" v-if="record.bhiRiskTypeDesc == '高风险'" class="result-4">
                    {{ record.bhiRiskTypeDesc }}
                </div>
            </template>
            <template v-if="column.key === 'risk'">
                <p>{{ record.risk || "--" }}</p>
            </template>
            <template v-if="column.key === 'type'">
                <p>{{ record.type === 2 ? "量表" : record.type === 3 ? "眼动" : "抑郁" }}</p>
            </template>
            <template v-if="column.key === 'status'">
                <p>{{ record.status === 2 ? "数据分析中" : record.status === 3 ? "评估完成" : record.status === 4 ? "评估失败" : "无法作答"
                }}</p>
            </template>
            <template v-if="column.key === 'operation'">
                <a-button type="link" class="service" @click="goServicePack(record)" v-if="type !== '报告列表'">筛查服务</a-button>
                <a-button type="link" class="report" :class="record.status === 5 ? 'report-err' : ''"
                    @click="lookReport(record)">{{ !record.lookReport && record.status === 3 ? '解锁' : '查看报告' }}</a-button>
            </template>
        </template>
    </a-table>
</template>

<style lang='less' scoped>
p {
    margin-bottom: 0;
}

.service {
    // width: 78px;
    // height: 26px;
    background: #FFF3E9;
    border-radius: 6px;
    border: none;
    font-size: 12px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    color: #B2711E;
    // line-height: 18px;
    margin-right: 14px;
    text-align: center;
}

.report {
    // width: 78px;
    // height: 26px;
    background: #F1F6FF;
    border-radius: 6px;
    border: none;
    font-size: 12px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    color: #3D7EFF;
    // line-height: 26px;
    text-align: center;
}

.report-err {
    background: #F8F8F8;
    color: #CECECE;
}

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
            margin-top: 13px;
        }

        .phone {
            display: flex;
            align-items: center;
            padding-left: 54px;
            box-sizing: border-box;
            margin-top: 32px;

            .phone-title {
                font-size: 18px;
                color: #656565;
                font-weight: 400;
                margin-right: 21px;
            }

            .phone-input {
                width: 295px;
                height: 46px;
                border: 1px solid rgba(151, 151, 151, 0.24);
                border-radius: 8px;
                background: rgba(216, 216, 216, 0.19);
                font-size: 18px;
                font-weight: bold;
                color: #222222;
                padding: 0 12px;
                box-sizing: border-box;
                display: flex;
                align-items: center;
            }
        }

        .code {
            display: flex;
            align-items: center;
            padding-left: 54px;
            box-sizing: border-box;
            margin-top: 16px;

            .code-title {
                font-size: 18px;
                color: #656565;
                font-weight: 400;
                margin-right: 18px;
            }

            .input {
                display: flex;

                div {
                    width: 45px;
                    height: 46px;
                    border-radius: 5px;
                    margin: 0 3px;
                    border: 1px solid rgba(151, 151, 151, 0.24);

                    input {
                        width: 45px;
                        height: 46px;
                        background: rgba(216, 216, 216, 0.19);
                        border-radius: 5px;
                        border: none;
                        outline: none;
                        text-align: center;
                        font-size: 18px;
                        font-weight: bold;
                        color: #222222;
                    }
                }
            }
        }

        .button {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 41px;

            .switch {
                width: 162px;
                height: 54px;
                border-radius: 27px;
                border: none;
                background: #F5F8FD;
                font-size: 22px;
                font-weight: 600;
                color: #3D7EFF;
            }

            .accredit {
                width: 162px;
                height: 54px;
                border-radius: 27px;
                font-size: 22px;
                font-weight: bold;
                color: #FFFFFF;
                margin-left: 26px;
            }

            .countdown {
                width: 162px;
                height: 54px;
                border-radius: 27px;
                border: none;
                background: #C4C4C4;
                font-size: 22px;
                font-weight: 600;
                color: #fff;
                margin-left: 26px;
            }
        }
    }
}

.subscribe {
    background: #f4d8db;
    color: #df8698;
    border-radius: 17px;
    padding: 5px 15px;
    font-size: 12px;
}

.subscribe-list {
    strong {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #686868;
    }

    .font-wei {
        font-weight: 500;
    }
}

.result-1 {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #3D7EFF;
}

.result-2 {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #E99607;
}

.result-3 {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FF5700;
}

.result-4 {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FF0000;
}

.result-5 {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #0BC12E;
}

.yet-fail {
    font-size: 10px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #FE3B00;
}

.yet-fail img {
    width: 10px;
    height: 10px;
}

.yet-make img {
    width: 10px;
    height: 10px;
}

.yet-bg {
    width: 78px;
    height: 26px;
    background: #9A9A9A;
    border-radius: 6px;
    opacity: 0.07;
}
</style> 

<style>
.subscribe-list-tab .ant-table-thead>tr>th {
    font-size: 16px;
    font-family: PingFang-SC, PingFang-SC;
    font-weight: bold !important;
    color: #222222;
    line-height: 22px;
}

.subscribe-list-tab .ant-table-tbody>tr>td {
    font-size: 14px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    color: #686868;
    line-height: 20px;
}
</style>