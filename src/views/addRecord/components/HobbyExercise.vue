<!-- 运动爱好 -->
<script setup  lang='ts'>
import selectData from "@/components/selectData/index.vue"
// import type { QueryDictionariesType } from "@/apis/dictionaries/type"
import type { ExerciseType } from "@/stores/types/type"
// import { QueryDictionaries } from "@/apis/dictionaries"
import { useClienteleData } from "@/stores/clienteleData"
import { CloseOutlined } from '@ant-design/icons-vue';
import {useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { sportsHobbiesEnum } from '../../../enum/archivesEnum'

const router = useRouter()
const clienteleData = useClienteleData()
const visible = ref<boolean>(false)//选择弹窗
// const sportsHobbiesEnum = ref<QueryDictionariesType[]>([])//运动list
const selectExercise = ref<ExerciseType[]>([])
const currentExerciseIndex = ref<number>(0)
const currentDictValue = ref<string>()
const numberTimes = ref<any>([1, 2, 3, 4, 5]) //次数
const dateTime = ref<any>([30, 60, 120, 180, 240]) //时间
const numberTimesStatus = ref<number>(0)
const dateTimeStatus = ref<number>(0)
const changeNumberTimesStatus = (status: number) => {
    console.log(status);
    numberTimesStatus.value = status
}
const changeDateTimeStatus = (status: number) => {
    'sportsHobbiesEnum'
    console.log('选中第========' + status);
    dateTimeStatus.value = status
}

onMounted(async () => {
    // let res = await QueryDictionaries({ dictType: "health_sports_hobbies" })
    // sportsHobbiesEnum.value = res.data
    // console.log(clienteleData.clientForm.sportsHobbiesList);
    // console.log(sportsHobbiesEnum);
    if (clienteleData.clientForm.sportsHobbiesList !== null) {
        clienteleData.clientForm.sportsHobbiesList?.forEach((item: ExerciseType) => {
            console.log(item);
            selectExercise.value!.push(item)
            for (let i = 0; i < sportsHobbiesEnum.length; i++) {
                if (sportsHobbiesEnum[i].value == item.sportsEvents) {
                    sportsHobbiesEnum[i].duration = item.duration
                    sportsHobbiesEnum[i].motionFrequency = item.motionFrequency
                }
            }
        })
    }
})
const handelSelect = (dictValue: string, index: number) => {
    for (let i = 0; i < selectExercise.value!.length; i++) {
        if (selectExercise.value![i].sportsEvents == dictValue) {
            selectExercise.value!.splice(i, 1);
            return
        }
    }
    visible.value = true
    currentExerciseIndex.value = index
    currentDictValue.value = dictValue
}
// 时间次数选择
const notarizeSelect = () => {
    let obj: ExerciseType = {
        // archivesNo: clienteleData.,
        duration: numberTimes.value[numberTimesStatus.value],
        durationUnit: '1',
        motionFrequency: dateTime.value[dateTimeStatus.value],
        sportsEvents: sportsHobbiesEnum![currentExerciseIndex.value].value,
    }
    for (let i = 0; i < sportsHobbiesEnum!.length; i++) {
        if (sportsHobbiesEnum[i].value == currentDictValue.value) {
            sportsHobbiesEnum[i].duration = obj.duration
            sportsHobbiesEnum[i].motionFrequency = obj.motionFrequency
        }
    }
    selectExercise.value!.push(obj)
    visible.value = false
}
const isAddSelect = (dictValue: string) => {
    for (let i = 0; i < selectExercise.value!.length; i++) { 
        if (selectExercise.value![i].sportsEvents === dictValue) {
            return true
        }
    }
    return false
}
const handleOk = (e: MouseEvent) => {
    console.log(e);
    visible.value = false;
};
// 最后完成提交
const Accomplish = async () => {
    clienteleData.changeSportsHobbiesList(selectExercise.value)
    let res = await clienteleData.SubmitNewRecord()
    if (res) {
        router.push('/assessment/management') 
    }
}
</script>
<template>
    <div class="medical">
        <div class="exercise-content" :class="isAddSelect(`${item.value}`) ? 'active' : ''"
            v-for="(item, index) in sportsHobbiesEnum" :key="item.value" @click="handelSelect(`${item.value}`, index)">
            <div class="img-title">
                <img v-if="item.label == '散步'" src="@/assets/images/exercise/exercise_01.png" alt="">
                <img v-if="item.label == '跑步'" src="@/assets/images/exercise/exercise_02.png" alt="">
                <img v-if="item.label == '乒乓球'" src="@/assets/images/exercise/exercise_03.png" alt="">
                <img v-if="item.label == '羽毛球'" src="@/assets/images/exercise/exercise_04.png" alt="">
                <img v-if="item.label == '瑜伽'" src="@/assets/images/exercise/exercise_05.png" alt="">
                <img v-if="item.label == '舞蹈'" src="@/assets/images/exercise/exercise_06.png" alt="">
                <img v-if="item.label == '太极'" src="@/assets/images/exercise/exercise_07.png" alt="">
                <img v-if="item.label == '自行车'" src="@/assets/images/exercise/exercise_08.png" alt="">
                <img v-if="item.label == '游泳'" src="@/assets/images/exercise/exercise_09.png" alt="">
                <img v-if="item.label == '爬山'" src="@/assets/images/exercise/exercise_10.png" alt="">
                <img v-if="item.label == '八段锦'" src="@/assets/images/exercise/exercise_11.png" alt="">
                <img v-if="item.label == '广场舞'" src="@/assets/images/exercise/exercise_12.png" alt="">
                <span class="title">{{ item.label }}</span>
            </div>
            <div class="card">
                <div>{{ item.label }}</div>
                <div>每周：{{ item.duration }}次</div>
                <div>每周：{{ item.motionFrequency }}分钟</div>
            </div>
        </div>
    </div>
    <span class="step-btn" @click="Accomplish">完成</span>
    <a-modal v-model:visible="visible" @ok="handleOk" :footer="null" :closable="false">
        <div class="tc-close">
            <close-outlined @click="() => { visible = false }" />
        </div>
        <div class="select-hobby">
            <div class="select-num">
                <div>
                    <div>次数</div>
                    <selectData :dateTime="numberTimes" unit="次/周" @changeStatus="changeNumberTimesStatus" />
                </div>
                <div>
                    <div>时间</div>
                    <selectData :dateTime="dateTime" unit="分钟/次" @changeStatus="changeDateTimeStatus" />
                </div>
            </div>
            <div class="hobby-footer">
                <a-button shape="round" size="middle" @click="visible = false">取消</a-button>
                <a-button type="primary" shape="round" size="middle" @click="notarizeSelect">确认</a-button>
            </div>
        </div>
    </a-modal>
</template>

<style lang='less' scoped>
.medical {
    display: flex;
    width: 100%;
    height: 70vh;
    overflow: auto;
    padding: 30px 100px 0px;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-bottom: 23px;
    margin-top: 10px;

    .exercise-content {
        position: relative;
        width: 240px;
        height: 216px;
        border: 10px solid #DDDDDD;
        border-radius: 44px;
        margin-bottom: 36px;

        .img-title {
            position: relative;
            // background-color: #f21717;
            width: 100%;
            height: 100%;
            padding: 10px;
            border-radius: 25px;
            z-index: 1;

            img {
                display: block;
                height: 100%;
                width: 100%;
                margin: 0 auto;
            }
        }

        .title {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 32px;
            font-weight: bold;
            color: #363636;
            letter-spacing: 4px;
        }

        .card {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            background: rgba(61, 126, 255, 1);
            border-radius: 44px;
            padding: 10px;
            border-radius: 25px;
            display: none;

            &>div {
                font-weight: bold;
                color: #FFFFFF;
                letter-spacing: 3px;

                &:nth-child(1) {
                    font-size: 46px;
                    text-align: center;
                }

                &:nth-child(2) {
                    font-size: 28px;
                    font-weight: bold;
                    color: #FFFFFF;
                }

                // &:nth-child(3) {}
            }
        }

        &.active {
            width: 240px;
            height: 216px;
            border: 10px solid rgba(61, 126, 255, 1);
            opacity: .7;

            .title {
                display: none;
            }

            .card {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                color: #fff;

                &>div {
                    &:nth-child(1) {
                        width: 100%;
                        font-size: 30px !important;
                        text-align: center;
                    }

                    &:nth-child(2) {
                        font-size: 16px !important;
                    }

                    &:nth-child(3) {
                        font-size: 16px !important;
                    }
                }
            }
        }
    }
}

.tc-close {
    font-size: 18px;
    cursor: pointer;
}

.select-hobby {
    .select-num {
        display: flex;
        min-height: 140px;
        justify-content: space-around;

        &>div {
            width: 48%;

            &:nth-child(1) {
                &>div {
                    text-align: center;
                    font-weight: bold;
                    font-size: 18px;

                }
            }

            &:nth-child(2) {
                &>div {
                    text-align: center;
                    font-weight: bold;
                    font-size: 18px
                }

            }
        }
    }

    .hobby-footer {
        text-align: center;

        .ant-btn:nth-child(1) {
            margin-right: 30px;
        }
    }
}

.btn-box {
    display: flex;
    justify-content: center;

    &>span {
        &:nth-child(1) {
            margin-right: 30px;
            background: #F7F8FA;
            color: #222;
        }
    }
}

// @media screen and (max-width: 1200px) {
//     .exercise-content {
//         width: 22% !important;
//         height: 176px !important;

//         .title {
//             font-size: 22px !important;
//         }

//         .card {
//             &>div {
//                 &:nth-child(1) {
//                     font-size: 30px !important;
//                 }

//                 &:nth-child(2) {}

//                 &:nth-child(3) {}
//             }
//         }
//     }
// }
</style>