<template>
    <div class="content-box">
        <schedule-Number v-if="numberShow" :max="max" @callBack="changeSurrentStep" />
        <math-Number v-if="countShow" @callBack="changeMath" />
        <img-Change v-if="imgShow" @change="changeCar" :startTime="startTime" :photoChangeTimes="photoChangeTimes" />
    </div>
</template>

<script lang="ts">
import { reactive, onMounted, toRefs } from 'vue';
import { startVideo } from "@/utils/voice"
import mathNumber from "./components/mathNumber/index.vue"
import scheduleNumber from "./components/scheduleNumber/index.vue"
import imgChange from "./components/imgChange/index.vue"
import { useState } from "@/stores/state"
import { useRouter } from 'vue-router'
export default {
    components: { mathNumber, scheduleNumber, imgChange },
    setup() {
        const depressedState = useState()
        const router = useRouter()
        const setAttr = reactive({
            numberShow: true,//图片总张数
            countShow: false,//随机数
            imgShow: false,//图片
            max: 16,
            startTime: 0,
            photoChangeTimes:0
        })
        setAttr.max = depressedState.depressData[3].steps[0].freeParadigm.length;
        onMounted(() => {
            console.log(depressedState.depressData)
        })

        //图片改变
        const changeCar = () => {
            // depressedState.scheduleNumberState === setAttr.max
            if (depressedState.scheduleNumberState === setAttr.max) {
                // alert(depressedState.scheduleNumberState)
                depressedState.changeScheduleNumberState(0)
                depressedState.changeRandomState(0)
                setAttr.numberShow = false
                setAttr.imgShow = false
                setAttr.countShow = false
                router.push("/gazeGuide")
            } else {
                // alert('456')
                depressedState.addRandomState()
                setAttr.numberShow = true
                setAttr.imgShow = false
                setAttr.countShow = false
                console.log(depressedState.RandomState + '~~~~~~~~~')
            }
        }

        // 数字滚动的回调
        const changeSurrentStep = () => {
            setAttr.numberShow = false
            setAttr.imgShow = false
            setAttr.countShow = true
            startVd()
        }

        // 随机数字的回调
        const changeMath = () => {
            setAttr.numberShow = false
            setAttr.countShow = false
            setAttr.imgShow = true
            setAttr.photoChangeTimes = new Date().getTime()
        }
        const startVd = () => {
            let id = depressedState.depressData[3].steps[0].freeParadigm[depressedState.scheduleNumberState - 1].stepId
            let code = 'zskj-object/depressed/' + depressedState.estimateNum + "/yy_free_paradigm/" + depressedState.depressData[3].steps[0].freeParadigm[depressedState.scheduleNumberState - 1].stepId
            startVideo({ id: id, project_code: code }, () => {
                setAttr.startTime = new Date().getTime()
            })
        }

        return {
            router,
            changeSurrentStep,
            changeMath,
            startVd,
            changeCar,
            ...toRefs(setAttr)
        }
    },
    methods: {

    }
}
</script>

<style scoped>
.content-box {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #94826B;
}
</style>