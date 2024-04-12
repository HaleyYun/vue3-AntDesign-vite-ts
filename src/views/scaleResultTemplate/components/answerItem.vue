<template>
    <div class="answer-item-c">
        <div v-if="answerItemData.patternRule === 'gossi_picture' || answerItemData.patternRule === 'cube_picture'"
            class="gossi-picture-item">
            <img class="user-img" :src="answerItemData.answerSequenceDetailsResponseList[0].imgUrl"
                @click="lookImg(answerItemData.answerSequenceDetailsResponseList[0].imgUrl as string)" alt="">
            <img v-if="answerItemData.answerSequenceDetailsResponseList[0].isRight === 0"
                src="../../../assets/images/scaleResultTemplate/true_icon.png" class="true_icon" alt="">
            <img v-else src="../../../assets/images/scaleResultTemplate/false_icon.png" class="false_icon" alt="">
        </div>
        <template
            v-if="answerItemData.patternRule === 'watches_picture' || answerItemData.patternRule === 'picture_question' || answerItemData.patternRule === 'jud_gment' || answerItemData.patternRule === 'recite_question'">
            <div class="picture-question-item" v-for="(item, index) in answerItemData.answerSequenceDetailsResponseList"
                :key="index">
                <div class="text-box"><span
                        v-if="answerItemData.patternRule === 'jud_gment' && answerItemData.answerSequenceDetailsResponseList.length > 1">{{
                            item.contentIndex
                        }}.</span> {{ item.content }}<span v-if="item.answers && item.answers.length > 0"
                        @click="lookText(item.answers)">({{
                            item.answers.length <= 5 ? item.answers : item.answers.substring(0, 5) + '...' }})</span>
                </div>
                <img v-if="item.isRight === 0" src="../../../assets/images/scaleResultTemplate/true_icon.png"
                    class="true_icon" alt="">
                <img v-else src="../../../assets/images/scaleResultTemplate/false_icon.png" class="false_icon" alt="">
            </div>
            <img class="watches-picture-img" v-if="answerItemData.patternRule === 'watches_picture'"
                :src="(answerItemData.imgUrl as string)" @click="lookImg(answerItemData.imgUrl as string)" alt="">
        </template>
        <template v-if="answerItemData.patternRule === 'dec_question'">
            <div class="dec-question-item" v-for="(item, index) in answerItemData.answerSequenceDetailsResponseList"
                :key="index">
                <div class="text-box"><span>{{ item.contentIndex }}.</span> {{ item.answers }}</div>
                <img v-if="item.isRight === 0" src="../../../assets/images/scaleResultTemplate/true_icon.png"
                    class="true_icon" alt="">
                <img v-else src="../../../assets/images/scaleResultTemplate/false_icon.png" class="false_icon" alt="">
            </div>
        </template>
        <template v-if="answerItemData.patternRule === 'judgment_picture'">
            <div class="dec-question-item" v-for="(item, index) in answerItemData.answerSequenceDetailsResponseList"
                :key="index">
                <div class="text-box"><span>{{ item.contentIndex }}.</span> {{ item.content }}<span
                        v-if="item.answers && item.answers.length > 0" @click="lookText(item.answers)">({{
                            item.answers.length <= 5 ? item.answers : item.answers.substring(0, 5) + '...' }})</span>
                </div>
                <img v-if="item.isRight === 0" src="../../../assets/images/scaleResultTemplate/true_icon.png"
                    class="true_icon" alt="">
                <img v-else src="../../../assets/images/scaleResultTemplate/false_icon.png" class="false_icon" alt="">
            </div>
        </template>
        <template v-if="answerItemData.patternRule === 'time_question'">
            {{ answerItemData.answerSequenceDetailsResponseList[0].answers || 0 }}
        </template>
        <template v-if="answerItemData.patternRule === 'radio_question'">
            {{ answerItemData.answerSequenceDetailsResponseList[0].answers || "--" }}
        </template>
        <template v-if="answerItemData.patternRule === 'choose_question'">
            <div class="dec-question-item">
                <div class="text-box">{{ answerItemData.answerSequenceDetailsResponseList[0].answers }}</div>
                <img v-if="answerItemData.answerSequenceDetailsResponseList[0].isRight === 0"
                    src="../../../assets/images/scaleResultTemplate/true_icon.png" class="true_icon" alt="">
                <img v-else src="../../../assets/images/scaleResultTemplate/false_icon.png" class="false_icon" alt="">
            </div>
        </template>
        <template v-if="answerItemData.patternRule === 'textchoose_Qution'">
            <div class="textchoose-Qution-item" v-for="(item, index) in answerItemData.answerSequenceDetailsResponseList"
                :key="index">
                <span>{{ item.contentIndex }}.</span>
                <div class="title-box">{{ item.definition }}:</div>
                <div class="text-box"> {{ item.content }}<span v-if="item.answers && item.answers.length > 0"
                        @click="lookText(item.answers)">({{
                            item.answers.length <= 5 ? item.answers : item.answers.substring(0, 5) + '...' }})</span>
                </div>
                <img v-if="item.isRight === 0" src="../../../assets/images/scaleResultTemplate/true_icon.png"
                    class="true_icon" alt="">
                <img v-else src="../../../assets/images/scaleResultTemplate/false_icon.png" class="false_icon" alt="">
            </div>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { answerConcreteDetailsResponseListItem } from '../../../apis/scaleTemplate/type'
defineProps<{
    answerItemData: answerConcreteDetailsResponseListItem
}>()
const emit = defineEmits(["showAudio", "showImg", "showReark"]);

const lookText = (t: string) => {
    if (t.length > 5) {
        emit("showReark", t, "输入框内容")
    }
}
const lookImg = (u: string) => {
    emit("showImg", u)
}
</script>

<style lang="less" scoped>
.answer-item-c {
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    text-align: right;

    .gossi-picture-item {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .user-img {
            max-width: 186px;
            max-height: 164px;
            border-radius: 7px;
            border: 1px solid #E7E7E7;
        }
    }

    .picture-question-item {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 7px;

        &:nth-child(1) {
            margin-top: 0;
        }

        .text-box {
            width: 160px;
            word-break: break-all;
            text-align: left;
        }

    }

    .dec-question-item {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 7px;

        &:nth-child(1) {
            margin-top: 0;
        }

        .text-box {
            min-width: 80px;
            max-width: 150px;
            word-break: break-all;
            margin-right: 10px;
            text-align: left;
        }

    }

    .textchoose-Qution-item {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 7px;

        &:nth-child(1) {
            margin-top: 0;
        }

        .title-box {
            width: 100px;
            margin-right: 5px;
            text-align: right;
        }

        .text-box {
            width: 140px;
            word-break: break-all;
            text-align: left;
        }

    }
}

.true_icon,
.false_icon {
    width: 20px;
    height: 20px;
}

.watches-picture-img {
    max-width: 180px;
    max-height: 140px;
    border-radius: 7px;
    margin-top: 10px;
    border: 1px solid #E7E7E7;
}
</style>