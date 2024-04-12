<template>
    <div class="radio-question-c">
        <h3 v-html="optionData.content" v-if="optionData.evaluationType === 1"
            :style="{ fontSize: optionData.content.length > 100 ? '22px' : '' }"></h3>
        <div class="options-item" :class="optionData.evaluationType === 2 ? 'p-t' : ''">
            <div v-for="(optionItem, optionIndex) in optionData.children" :key="optionIndex"
                :class="[optionItem.content === optionData.answers ? 'active' : '', optionItem.content?.length > 34 ? 'max34font' : '']"
                @click="selectAnswer(optionItem)">
                {{ optionItem.content }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { GetQuestionListResDataChildren } from '@/apis/scaleTemplate/type';
import { useRoute } from 'vue-router';

const props = defineProps({
    optionData: {
        type: Object,
        required: true,
    },
    questionNum: {
        type: Number,
        required: true,
    },
    questionLangth: {
        type: Number,
        required: true,
    },
})
const route = useRoute()

// 数据选择回显
const emit = defineEmits(["nextTopic", "changeNextStatus"]);
if (route.query?.status === 'modify') {
    for (let i = 0; i < props.optionData.children.length; i++) {
        if (props.optionData.children[i].choice) {
            props.optionData.answers = props.optionData.children[i].content;
            props.optionData.contentIndex = props.optionData.children[i].contentIndex;
            props.optionData.option = props.optionData.children[i].option;
        }
        emit('changeNextStatus', true);
    }
}
const selectAnswer = (item: GetQuestionListResDataChildren) => {
    props.optionData.answers = item.content;
    props.optionData.contentIndex = item.contentIndex;
    props.optionData.option = item.option;
    if (props.questionNum < props.questionLangth - 1 && props.optionData.evaluationType === 1) {
        emit('nextTopic')
    } else {
        if (props.optionData.evaluationType === 2) {
            emit('changeNextStatus', true);
        }
    }
}
</script>

<style lang="less">
.radio-question-c {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #FFFFFF;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.12);
    border-radius: 14px;
    display: flex;
    flex-direction: column;



    h3 {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 204px;
        font-size: 27px;
        font-family: PingFang-SC-Bold, PingFang-SC;
        font-weight: bold;
        color: #222222;
        line-height: 39px;
        padding: 0 37px;
        margin-bottom: 0;
        text-align: center;
    }

    .options-item {
        overflow-y: auto;
        flex: 1;
        padding: 0 117px 0;
        display: flex;
        align-content: flex-start;
        justify-content: space-between;
        flex-wrap: wrap;
        box-sizing: border-box;

        div {
            width: 450px;
            height: 98px;
            background: #F6F6F6;
            padding: 0 20px;
            box-sizing: border-box;
            border-radius: 14px;
            margin-bottom: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 23px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: bold;
            color: #333333;
            line-height: 36px;
        }

        .active {
            background: #5765FE;
            color: #FFFFFF;
        }

        .max34font {
            font-size: 18px;
            line-height: 25px;
        }
    }

    .p-t {
        align-content: center;
        padding-top: 32px;
    }
}
</style>