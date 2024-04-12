<template>
    <div class="title-list">
        <div class="list-item width50">题目</div>
        <div class="list-item width300">内容</div>
        <div class="list-item width50">类目</div>
        <div class="list-item width200">答案</div>
        <div class="list-item width50">得分</div>
        <div class="list-item width110">操作</div>
    </div>
    <div class="content-list" v-for="(item, index) in answerResultList" :key="index"
        :style="{ border: index == answerResultList.length - 1 ? 'none' : '' }">
        <div class="list-item width50">{{ item.questionIndex }}</div>
        <div class="list-item width300">{{ item.content }}</div>
        <div class="list-item width50">{{ item.category }}</div>
        <div class="list-item width200">{{ item.answerSequenceDetailsResponseList[0].answers }}</div>
        <div class="list-item width50">{{ item.score }}</div>
        <div class="list-item width110">
            <button @click="modifyTopic(item.questionIndex)">去修改</button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import router from '@/router';
import { answerConcreteDetailsResponseListItem } from '../../../apis/scaleTemplate/type'

const props = defineProps<{
    answerResultList: answerConcreteDetailsResponseListItem[]
}>()

const modifyTopic = (questionIndex: number) => {
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
        }
    }
}

.width50 {
    width: 50px;
}

.width110 {
    width: 110px;
}

.width200 {
    width: 200px;
}

.width300 {
    width: 300px;
}
</style>