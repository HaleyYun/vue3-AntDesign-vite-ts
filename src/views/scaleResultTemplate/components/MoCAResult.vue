<template>
    <div class="title-list">
        <div class="list-item width50">题目</div>
        <div class="list-item width300">内容</div>
        <div class="list-item width280">答案</div>
        <div class="list-item width50">得分</div>
        <div class="list-item width110">附件</div>
        <div class="list-item width110">操作</div>
    </div>
    <div class="content-list" v-for="(item, index) in answerResultList" :key="index"
        :style="{ border: index == answerResultList.length - 1 ? 'none' : '' }">
        <div class="list-item width50">{{ item.questionIndex }}</div>
        <div class="list-item width300">{{ item.content }}</div>
        <div class="list-item width280">
            <slot name="answer" :record="item"></slot>
        </div>
        <div class="list-item width50">{{ item.scoreRule === 6 && scaleName === 'NINDS-CSN' ? '--' : item.score }}</div>
        <div class="list-item width110">
            <button @click="lookRemark(item.answerAttachmentsResponseList.remark)"
                v-if="item.answerAttachmentsResponseList.remark">查看备注</button>
            <button @click="lookImg(item.answerAttachmentsResponseList.photoUrl)"
                v-if="item.answerAttachmentsResponseList.photoUrl">查看图片</button>
            <button @click="hearAudio(item.answerAttachmentsResponseList.playRecord)"
                v-if="item.answerAttachmentsResponseList.playRecord">播放录音</button>
            <template v-if="!item.answerAttachmentsResponseList.remark && !item.answerAttachmentsResponseList.photoUrl &&
                !item.answerAttachmentsResponseList.playRecord">--------</template>
        </div>
        <div class="list-item width110">
            <button @click="modifyTopic(item.questionIndex)">去修改</button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import router from '@/router';
import { answerConcreteDetailsResponseListItem } from '../../../apis/scaleTemplate/type'

const props = defineProps<{
    answerResultList: answerConcreteDetailsResponseListItem[],
    scaleName: string
}>()
const emit = defineEmits(["showAudio", "showImg", "showReark"]);

const lookRemark = (t: string) => {
    emit("showReark", t)
}
const lookImg = (u: string) => {
    emit("showImg", u)
}
const hearAudio = (u: string) => {
    emit("showAudio", u)
}
const modifyTopic = (questionIndex: number) => {
    if (props.scaleName === 'CFT') {
        router.replace({
            path: "/templateCFT",
            query: {
                status: "modify",
                questionIndex: questionIndex,
            }
        })
        return
    }
    router.replace({
        path: "/scaleTemplate",
        query: {
            status: "modify",
            questionIndex: questionIndex,
        }
    })
}
console.log(props)
</script>
<style lang="less" scoped>
.title-list {
    width: 100%;
    height: 63px;
    background: #fffeed;
    border-radius: 8px;
    border: 1px solid #f1e3d4;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .list-item {
        font-size: 24px;
        font-family: PingFangSC, PingFang SC;
        font-weight: bold;
        color: #222222;
        text-align: center;
    }
}

.content-list {
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    border-bottom: 1px solid #EEEEEE;

    .list-item {
        padding: 31px 0;
        font-size: 18px;
        font-family: PingFangSC, PingFang SC;
        font-weight: bold;
        color: #686868;
        line-height: 25px;

        button {
            width: 108px;
            height: 39px;
            background: #3D7EFF;
            border-radius: 20px;
            border: none;
            font-size: 14px;
            font-family: PingFangSC, PingFang SC;
            font-weight: 600;
            color: #FFFFFF;
            line-height: 20px;
            margin-top: 18px;

            &:nth-child(1) {
                margin-top: 0;
            }
        }
    }
}

.width50 {
    width: 50px;
}

.width110 {
    width: 110px;
}

.width280 {
    width: 280px;
}

.width300 {
    width: 300px;
}
</style>