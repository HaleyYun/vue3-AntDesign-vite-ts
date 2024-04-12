<template>
    <div class="scale-result-template-page">
        <div class="header-box">
            {{ titleEnum[resultData?.estimateServerCode || -1] || "-----" }}
        </div>
        <div class="component-box">
            <div class="tip-text-box">
                <p><span>{{ resultData?.name }}</span><span>{{ resultData?.score }}分</span></p>
                <p><span>答题用时</span><span>{{ timeStr || "--" }}</span></p>
            </div>
            <component v-if="resultData" :is="componentEnum[resultData!.estimateServerCode]"
                :answerResultList="(resultData?.answerConcreteDetailsResponseList as GetAnswerDetailsResDate['answerConcreteDetailsResponseList'])"
                :scaleName="resultData.estimateServerCode" @showAudio="showAudio" @showImg="showImg"
                @showReark="showReark">
                <template #answer="{ record }">
                    <answerItem :answerItemData="record" @showAudio="showAudio" @showImg="showImg"
                        @showReark="showReark">
                    </answerItem>
                </template>
            </component>
        </div>
        <div class="submit-box">
            <button @click="submitTopic">提交结果</button>
        </div>
    </div>

    <div class="desk2" v-if="loading">
        <a-spin size="large" />
    </div>

    <!-------语音------>
    <a-modal v-model:visible="audioVisible" width="850px" :footer="null" destroyOnClose centered :maskClosable="false">
        <div class="identity-img">
            <audio controls controlsList="nodownload noplaybackrate" οncοntextmenu="return false">
                <source :src="audioUrl">
            </audio>
        </div>
        <div @click="audioVisible = false" class="img-btn">
            <div class="btn-text">确定</div>
        </div>
    </a-modal>

    <!-------图片------>
    <a-modal v-model:visible="imgVisible" width="850px" :footer="null" destroyOnClose centered :maskClosable="false">
        <div class="identity-img">
            <img class="img-url" :src="imgUrl" />
        </div>
        <div @click="imgVisible = false" class="img-btn">
            <div class="btn-text">确定</div>
        </div>
    </a-modal>

    <!-------备注------>
    <a-modal v-model:visible="remarkVisible" width="850px" :footer="null" destroyOnClose centered :maskClosable="false">
        <div class="identity-img">
            <div class="remark-content">
                <div class="text">{{ remarkTitle }}</div>
                <a-textarea class="remark" disabled v-model:value="remarkText" show-count
                    :maxlength="remarkTitle == '备注' ? 80 : 300" />
            </div>
        </div>
        <div @click="remarkVisible = false" class="img-btn">
            <div class="btn-text">确定</div>
        </div>
    </a-modal>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useState } from '@/stores/state'
import radioResult from './components/radioResult.vue'
import HADSResult from './components/HADSResult.vue'
import ADLResult from './components/ADLResult.vue'
import MoCAResult from './components/MoCAResult.vue'
import npiqResult from './components/NPI-QResult.vue'
import CFTResult from './components/CFTResult.vue'
import DSResult from './components/DSResult.vue'
import answerItem from './components/answerItem.vue'
import { getAnswerDetails, setScale } from '../../apis/scaleTemplate/index'
import { GetAnswerDetailsResDate } from '../../apis/scaleTemplate/type'

const router = useRouter()
const route = useRoute()
const state = useState()

interface ComponentEnumType {
    [key: string]: any
}

const componentEnum: ComponentEnumType = {
    "AD-8": radioResult,
    "HAMA": radioResult,
    "HAMD-24": radioResult,
    "ADL": ADLResult,
    "HADS": HADSResult,
    "FAQ": radioResult,
    "PHQ-9": radioResult,
    "GAD-7": radioResult,
    "MoCA": MoCAResult,
    "MMSE": MoCAResult,
    "NINDS-CSN": MoCAResult,
    "DS": DSResult,
    "CFT": CFTResult,
    "Mini-cog": MoCAResult,
    "NPI-Q": npiqResult,
}

const titleEnum: ComponentEnumType = {
    "AD-8": "早期失智筛查量表AD8答题提交",
    "HAMA": "汉密尔顿焦虑量表HAMA答题提交",
    "HAMD-24": "汉密尔顿抑郁量表-HAMD-24答题提交",
    "ADL": "日常生活能力量表ADL答题提交",
    "HADS": "医院焦虑抑郁量表HADS答题提交",
    "FAQ": "社会功能活动量表报告FAQ答题提交",
    "PHQ-9": "病人健康问卷量表PHQ-9答题提交",
    "GAD-7": "广泛性焦虑量表GAD-7答题提交",
    "MoCA": "蒙特利尔MoCA答题提交",
    "MMSE": "简易智力筛查表MMSE答题提交",
    "NINDS-CSN": "加拿大卒中网NINDS-CSN答题提交",
    "DS": "数字广度测试DS答题提交",
    "CFT": "复杂图形测试CFT答题提交",
    "NPI-Q": "神经精神科问卷-NPI-Q答题提交",
    "Mini-cog": "智力状态评估量表MINI-cog答题提交",
}

onMounted(() => {
    getAllAnswerDetails()
})
onUnmounted(() => {
    clearInterval(timeKey);
})
if (route.query.estimateNum) {
    state.estimateNum = route.query.estimateNum;
    state.QueryProData = {
        clientId: route.query.archivesNo
    }
}
const loading = ref(false)

const audioVisible = ref(false)
const imgVisible = ref(false)
const remarkVisible = ref(false)

const audioUrl = ref("")
const imgUrl = ref("")
const remarkTitle = ref("")
const remarkText = ref("")

const showAudio = (url: string) => {
    audioVisible.value = true;
    audioUrl.value = url;
}
const showImg = (url: string) => {
    imgVisible.value = true
    imgUrl.value = url;
}
const showReark = (val: string, t: string = '备注') => {
    remarkVisible.value = true
    remarkTitle.value = t;
    remarkText.value = val;
}

const resultData = ref<GetAnswerDetailsResDate>()
const getAllAnswerDetails = () => {
    loading.value = true;
    getAnswerDetails({
        "estimateNum": route.query.estimateNum || state.estimateNum,
        "archNo": route.query.archivesNo || state.QueryProData.clientId
    }).then(res => {
        if (res.code === 200) {
            resultData.value = res.data;
            for (let i = 0; i < resultData.value.answerConcreteDetailsResponseList.length; i++) {
                resultData.value.answerConcreteDetailsResponseList[i].content = resultData.value.answerConcreteDetailsResponseList[i].content.replace(/<br\/>/g, "");
            }
            setCountTime()
        }
        loading.value = false;
    })
}
const timeStr = computed(() => {
    // 计算时间格式转换
    return handleTime(state.gaugeTime);
});
const handleTime = (val: number) => {
    // 数字处理为时间格式  返回字符串
    let second: number | string = val % 60; //秒
    let minute: number | string = Math.floor(val / 60) % 60; //分钟
    let hour: number | string = Math.floor(val / 3600) % 60; //小时
    if (second < 10) {
        second = '0' + second;
    }
    if (minute < 10) {
        minute = '0' + minute;
    }
    if (hour < 10) {
        hour = '0' + hour;
    }
    return `${hour}:${minute}:${second}`;
};
let timeKey: NodeJS.Timeout
const setCountTime = () => {
    // 计时 -- 整个量表
    timeKey = setInterval(() => {
        state.gaugeTime += 1;
    }, 1000);
};

const submitTopic = () => {
    setScale({ estimateNum: route.query.estimateNum || state.estimateNum, questionTime: state.gaugeTime }).then(res => {
        if (res.code === 200) {
            clearInterval(timeKey);
            router.push({
                path: '/reportRelast',
                query: {
                    path: '/scaleEportPad?',
                    estimateNum: route.query.estimateNum || state.estimateNum
                }
            });
        }
    })
}

</script>

<style lang="less" scoped>
.scale-result-template-page {
    width: 100%;
    height: 100vh;
    background-color: #F6F6F6;
    overflow-y: auto;

    .header-box {
        width: 100%;
        height: 114px;
        font-size: 32px;
        font-family: SourceHanSansCN, SourceHanSansCN;
        font-weight: bold;
        color: #FFFFFF;
        line-height: 114px;
        background-image: url("../../assets/images/scaleResultTemplate/top_bg.png");
        background-repeat: no-repeat;
        background-size: 100vw 114px;
        text-align: center;
    }

    .component-box {
        width: calc(100% - 36px);
        margin: 18px auto;
        padding: 0 30px;
        border: 1px solid #F1E3D4;
        border-radius: 14px;
        background: #FFFFFF;
        box-sizing: border-box;
        padding-bottom: 107px;

        .tip-text-box {
            padding: 39px 0 41px 0;
            font-size: 44px;
            font-family: SourceHanSansCN, SourceHanSansCN;
            font-weight: bold;
            color: #656580;
            line-height: 67px;
            display: flex;

            p {
                margin-bottom: 0;
                margin-right: 92px;

                span {
                    &:nth-child(1) {
                        margin-right: 70px;
                    }
                }
            }
        }
    }

    .submit-box {
        position: fixed;
        bottom: 0;
        left: 0;
        margin-top: 34px;
        width: 100%;
        height: 107px;
        background: #FFFFFF;
        box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, 0.27);
        display: flex;
        align-items: center;
        justify-content: center;

        button {
            width: 1244px;
            height: 64px;
            background: #5766FE;
            border-radius: 14px;
            font-size: 25px;
            font-family: PingFang-SC, PingFang-SC;
            font-weight: bold;
            color: #FFFFFF;
            border: none;
        }
    }
}

.identity-img {
    display: flex;
    justify-content: center;
    align-items: center;

    .img-url {
        margin-top: 34px;
        height: 200px;
        width: 300px;
        background: #ffffff;
        box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.12);
        border-radius: 16px;
    }

    .remark-content {
        display: flex;
        flex-direction: column;

        .text {
            margin-top: 30px;
            font-size: 14px;
            font-family: PingFang-SC, PingFang-SC;
            font-weight: bold;
            color: #606060;
            text-align: center;
            line-height: 18px;
        }

        .remark {
            margin-top: 5px;
            height: 120px;
            width: 420px;
            background: #f9fcff;
            box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.05);
            border-radius: 16px;
            // border: 1px solid #bbdaff;
        }
    }
}

.img-btn {
    margin: 0 auto;
    width: 220px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #3d7eff;
    border-radius: 40px;
    margin-top: 36px;

    .btn-text {
        font-size: 18px;
        font-family: PingFang-SC, PingFang-SC;
        font-weight: bold;
        color: #ffffff;
        line-height: 18px;
    }
}

.desk2 {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(#000, 0.2);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>