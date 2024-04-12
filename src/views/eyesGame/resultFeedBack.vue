<template>
    <div class="result-feed">
        <div class="question-one">{{ questionOne }}</div>
        <ul class="answer-one">
            <li v-for="(item, index) in answerListOne" :key="index" @click="chooseOne(index)"
                :class="[currentIndexOne === index ? 'current-one answer-list' : 'answer-list']">
                {{ item.dictLabel }}
            </li>
        </ul>
        <div class="question-one add-mr">{{ questionTwo }}</div>
        <ul class="answer-one">
            <li v-for="(item, index) in answerListTwo" :key="index" @click="chooseTwo(index)"
                :class="[item.isChecked ? 'current-one answer-list' : 'answer-list']">
                {{ item.dictValue + '、' + item.dictLabel }}
            </li>
        </ul>
        <div class="over-btn" @click="subBtn">完成评估</div>
    </div>
</template>
<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// import { addEvaluationQuestion } from '../../http/api'
import { confirmTask, getDictType } from '../../apis/eyes_game'
import { useEyesGameStore } from '../../stores/eyes_game'
import { useState } from '../../stores/state'

export default {
    setup() {
        const store = useEyesGameStore()
        const serveStore = useState()
        const route = useRoute()

        const router = useRouter()
        const setAttr = reactive({
            questionOne: '被试在测试过程中存在不专注于任务, 不配合以及完成不了任务的情况:',
            questionTwo: '被试在测试过程中存在以下的情况 (勾选可多选)：',
            answerListOne: [
                {
                    dictLabel: '是',
                    dictValue: 'A',
                    id: 1
                },
                {
                    dictLabel: '否',
                    dictValue: 'B',
                    id: 2
                }
            ],
            currentIndexOne: 0,
            answerListTwo: [
                {
                    dictLabel: '否',
                    dictValue: 'B',
                    id: 2,
                    isChecked: false
                },
                {
                    dictLabel: '否',
                    dictValue: 'B',
                    id: 2,
                    isChecked: false
                },
                {
                    dictLabel: '否',
                    dictValue: 'B',
                    id: 2,
                    isChecked: false
                }
            ]
        })

        onMounted(() => {
            getTopic()
        })

        const chooseOne = (idx: number) => {
            setAttr.currentIndexOne = idx
        }
        const chooseTwo = (idx: number) => {
            setAttr.answerListTwo.forEach((item, index) => {
                if (idx === index) {
                    item.isChecked = !item.isChecked
                }
            })
        }
        const getTopic = () => {
            getDictType({ dictType: "eye_task_concentrate" }).then(res => {
                if (res.code === 200) {
                    setAttr.answerListOne = res.data
                }
            })
            getDictType({ dictType: "eye_task_situation" }).then(res => {
                if (res.code === 200) {
                    setAttr.answerListTwo = res.data.map(item => {
                        let obj = {
                            dictLabel: item.dictLabel,
                            dictValue: item.dictValue,
                            id: item.id,
                            isChecked: false
                        }
                        return obj
                    })
                }
            })
        }
        const subBtn = () => {
            let para = {
                concentrate: '',
                estimateNum: '',
                failEstimateNum: '',
                situation: ''
            }

            if (route.query.str === 'yy') {
                para = {
                    concentrate: setAttr.answerListOne[setAttr.currentIndexOne].dictValue,
                    estimateNum: serveStore.estimateNum,
                    failEstimateNum: serveStore.QueryProData.estimateNum ? serveStore.QueryProData.estimateNum : '',
                    situation: setAttr.answerListTwo.filter(item => item.isChecked === true).map(item => item.dictValue).join(",")
                }
            } else {
                para = {
                    concentrate: setAttr.answerListOne[setAttr.currentIndexOne].dictValue,
                    failEstimateNum: serveStore.QueryProData.estimateNum ? serveStore.QueryProData.estimateNum : '',
                    estimateNum: store.estimateNum,
                    situation: setAttr.answerListTwo.filter(item => item.isChecked === true).map(item => item.dictValue).join(",")
                }
            }

            // alert(JSON.stringify(store.estimateNum +'编号' ))

            confirmTask(para).then(res => {
                if (res.code === 200) {

                    if (route.query.str === 'yy') {
                        router.push({ path: '/servicePack', query: { ticketCode: serveStore.QueryProData.ticketsBookingCode } })
                    }
                    router.push({ path: '/servicePack', query: { ticketCode: serveStore.QueryProData.ticketsBookingCode } })


                }
            })

        }
        return {
            ...toRefs(setAttr),
            chooseOne,
            chooseTwo,
            subBtn
        }
    }
}
</script>
<style scoped lang="less">
.box {
    width: 100%;
    height: 100%;
}

.result-feed {
    width: 100vw;
    height: 100vh;
    background: #fcf8e6;
    padding: 58px 75px 0px 75px;
    box-sizing: border-box;

    .question-one {
        font-size: 36px;
        color: #654925;
    }

    .answer-one {
        width: 100%;

        .answer-list {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 60px;
            background: rgba(101, 73, 37, 0.09);
            border-radius: 8px;
            border: 1px solid #654925;
            margin-top: 20px;
            color: #654925;
            line-height: 60px;
            font-size: 32px;
            box-sizing: border-box;
            text-align: center;
        }

        .current-one {
            color: #fff;
            background: #654925;
        }
    }

    .add-mr {
        margin-top: 32px;
    }

    .over-btn {
        width: 645px;
        height: 96px;
        line-height: 96px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
        color: #fff;
        background: #654925;
        border-radius: 48px;
        border: 1px solid #654925;
        text-align: center;
        margin: 50px auto 0;
    }
}
</style>