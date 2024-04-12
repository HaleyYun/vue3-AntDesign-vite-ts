<template>
    <div class="content-box">
        <math-Number v-if="countShow" @callBack="changeMath" />
        <img class="imgbg" v-if="!countShow" :src="imageUrl" alt="">
    </div>
</template>

<script lang="ts">
import { reactive, onMounted, toRefs } from 'vue';
import { startVideo } from "@/utils/voice"
import mathNumber from "./components/mathNumber/index.vue"
import { endVideo, reupload } from "@/utils/voice"
import { useState } from "@/stores/state"
import { depressedVideoUrl } from "@/apis/depressed_game/index"
import { useRouter } from 'vue-router'
export default {
    components: { mathNumber },
    setup() {
        const depressedState = useState()
        const router = useRouter()
        const setAttr = reactive({
            countShow: true,//随机数
            imageUrl: '',
            startTime: 0,
            endTime: 0,
        })
        onMounted(() => {
            console.log(depressedState.depressData)
            setAttr.imageUrl = depressedState.depressData[5].steps[0].gazeParadigm[0].stepFiles[0].fileUrl
            startVd()
            // alert(setAttr.startTime + '开始时间')
        })
        const startVd = () => {
            let id: number = depressedState.depressData[5].steps[0].gazeParadigm[0].stepId
            let code: string = 'zskj-object/depressed/' + depressedState.estimateNum + "/yy_gaze_paradigm/" + depressedState.depressData[5].steps[0].gazeParadigm[0].stepId
            startVideo({ id: id, project_code: code }, () => {
                setAttr.startTime = new Date().getTime()
                // alert(setAttr.startTime + '开始时间222222')
            })
        }

        // 随机数字的回调
        const changeMath = () => {
            setAttr.countShow = false
            gazeexecute()
            // alert(setAttr.endTime+ '结束时间')
        }

        const gazeexecute = () => {
            let id: number = depressedState.depressData[5].steps[0].gazeParadigm[0].stepId
            let code: string = 'zskj-object/depressed/' + depressedState.estimateNum + "/yy_gaze_paradigm/" + depressedState.depressData[5].steps[0].gazeParadigm[0].stepId
            let execute: number = (depressedState.depressData[5].steps[0].gazeParadigm[0].timeData.allTimes) * 1000
            let times = setTimeout(() => {
                endVideo({ id: id, project_code: code }, () => {
                    setAttr.endTime = new Date().getTime()
                    // alert(setAttr.endTime + '结束时间2222')
                })
                clearTimeout(times)
            }, execute)

        }

        const endUploadvideo = (val: string) => {
            if (val === 'upload_ok') {
                // 录制视频上传接口 1-自由切换范式
                // alert(JSON.stringify({
                //     firstPhotoChangeTimes:0,
                //             secondPhotoChangeTimes:0,
                //             startVideoTimeStamp: setAttr.startTime,
                //             endVideoTimeStamp: setAttr.endTime,
                //             index: depressedState.depressData[5].steps[0].gazeParadigm[0].stepId,
                //             estimateNum: depressedState.estimateNum,
                //             videoPath: 'zskj-object/depressed/' + depressedState.estimateNum + "/yy_gaze_paradigm/" +  depressedState.depressData[5].steps[0].gazeParadigm[0].stepId + '/'+ depressedState.depressData[5].steps[0].gazeParadigm[0].stepId + '.mp4' ,
                //             questionText: '',
                //             stepProcess:depressedState.depressData[5].steps[0].gazeParadigm[0],
                //             taskType: 4,
                //             type: 2,
                //         }))

                depressedVideoUrl({
                    firstPhotoChangeTimes: 0,
                    secondPhotoChangeTimes: 0,
                    startVideoTimeStamp: setAttr.startTime,
                    endVideoTimeStamp: setAttr.endTime,
                    index: depressedState.depressData[5].steps[0].gazeParadigm[0].stepId,
                    estimateNum: depressedState.estimateNum,
                    videoPath: 'zskj-object/depressed/' + depressedState.estimateNum + "/yy_gaze_paradigm/" + depressedState.depressData[5].steps[0].gazeParadigm[0].stepId + '/' + depressedState.depressData[5].steps[0].gazeParadigm[0].stepId + '.mp4',
                    questionText: '',
                    stepProcess: depressedState.depressData[5].steps[0].gazeParadigm[0],
                    taskType: 4,
                    failEstimateNum: depressedState.QueryProData.estimateNum,
                    type: 2,
                    deviceNum: window.innerWidth + "_" + window.innerHeight,
                }).then(res => {
                    if (res.code == 200) {
                        // alert(JSON.stringify(res) +'调用接口结束反参数' )
                        console.log(res)
                        router.push('/noticeGuide')
                    }
                })
            } else {
                // alert('网络错误，请重试...')
                reupload(depressedState.depressData[5].steps[0].gazeParadigm[0].stepId)
            }
        };
        window.endUploadVideo = endUploadvideo


        return {
            router,
            changeMath,
            startVd,
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

.imgbg {
    border: 0px;
    width: 55%;
    height: 85%;
}
</style>