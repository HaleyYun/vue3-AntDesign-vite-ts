<script setup  lang='ts'>
import { onMounted, reactive, ref } from 'vue';
import eyesBackPlay from '../../../components/eyesBackPlay/eyesBackPlay.vue'
import rememberPicDbBack from '../../../components/eyesBackPlay/rememberPicDbBack.vue'
import { useBackVideo } from '../../../stores/backVideo'
import { useRoute } from 'vue-router';
const route = useRoute()
const backVideo = useBackVideo()
defineProps({
    list: {
        default: [{ videoPath: "", videoName: '', sortIndex: 1 }]
    },
})
onMounted(() => {
    setAttr.zoomSizeX = window.innerWidth / 1440;
    setAttr.zoomSizeY = window.innerHeight / 900;
    // setAttr.zoomSizeX = 1280 / 1440;
    // setAttr.zoomSizeY = 800 / 900;
})
const setAttr = reactive({
    maskShow: false,
    getTestType: 0,
    zoomSizeX: 1,
    zoomSizeY: 1,
})
const videoPath = ref<string>("#");

const columns = ref<any[]>([
    {
        title: '序号',
        dataIndex: 'sortIndex',
        key: 'sortIndex',
        align: "center"

    },
    {
        title: '项目',
        dataIndex: 'videoName',
        key: 'videoName',
        align: "center"

    },
    {
        title: '图表',
        dataIndex: 'chart',
        key: 'chart',
        align: "center"

    },
])

// 点击查看统计图
const showModal = (obj: any) => {
    let { estimateNum, taskType, type } = route.query
    backVideo.playbackInfo = {
        estimateNum: estimateNum as string,
        index: obj.sortIndex,
        taskType: Number(taskType),
        type: Number(type)
    }
    videoPath.value = obj.videoPath;
    setAttr.maskShow = true;
}

const videoPlay = () => {
    let videoElement: HTMLVideoElement = document.getElementById('videoEl') as HTMLVideoElement;
    videoElement.load()
    videoElement.play()
}

const closeMask = () => {
    let el: any = document.getElementById('playbackId');
    el?.clearTime && el.clearTime();
    setAttr.maskShow = false;
    backVideo.eyeItemData = {
        time: 0,
        vx: 0,
        vy: 0,
        x: 0,
        y: 0,
    };
    backVideo.eyeResultsData = {
        type: 0,
        rigthDirection: 0,
        delay: 0,
        rigth: true,
        increaseInitial: 0,
        wrongAttempt: 0,
        correctionDelay: null,
        averageSpeed: 0,
        maximumSpeed: 0,
        increaseTerminal: 0,
        increaseTargetDistanceComparison: 0,
        invadeExciteBefore: 0,
        invadeExciteAfter: 0,
        gazeAreaNumExciteBefore: 0,
        gazeAreaDurationExciteBefore: 0,
        gazeBlink: 0,
        gainRatioTerminal: 0,
        rigthCorrectAfter: true,
        rigthDelayCorrectAfter: 0,
        rigthDelay: 0,
        expect: 0
    };
    backVideo.memoryResultsData = {
        newImagestayTime: 0,
        oldImagestayTime: 0,
        isRight: 0,
        gazeBlink: 0,
        gazeAreaDuration: 0,
        imageStayRatio: 0
    }

}

</script>
<template>
    <div class="subscribe">
        <a-table :data-source="list" :columns="columns" :pagination="false" class="subscribe-list">
            <template #bodyCell="{ column, record, text }">
                <template v-if="column.key === 'videoName'">
                    <strong>{{ text }}</strong>
                </template>

                <template v-if="column.key === 'chart'">
                    <div class="yet-make">
                        <a-button type="link" @click="showModal(record)">点击查看</a-button>
                    </div>
                </template>
            </template>
        </a-table>
    </div>
    <div class="mask-box" v-if="setAttr.maskShow">
        <div class="centent-box"
            :style="{ width: '1440px', height: '900px', transformOrigin: '0 0', transform: `scale(${setAttr.zoomSizeX},${setAttr.zoomSizeY})` }">
            <div class="maskTextBox">
                <p>
                    时间: <span>{{ backVideo.eyeItemData.time || 0 }}ms</span>
                </p>
                <p>
                    坐标:<span>（x: {{ backVideo.eyeItemData.x || 0 }}，y: {{ backVideo.eyeItemData.y || 0 }}）</span>
                </p>
                <p>
                    当前速度v_x: {{ backVideo.eyeItemData.vx || 0 }} <span>pixel/ms</span>
                </p>
                <p>
                    当前速度v_y: {{ backVideo.eyeItemData.vy || 0 }} <span>pixel/ms</span>
                </p>
            </div>

            <div class="maskTextBox" v-if="route.query?.taskType == '3' && route.query?.type == '1'">
                <p>
                    眼跳延迟: <span>{{ backVideo.eyeResultsData.delay || 0 }}ms</span>
                </p>
                <p>
                    眼跳平均速度: <span>{{ backVideo.eyeResultsData.averageSpeed || 0 }}</span>
                </p>
                <p>
                    眼跳最高速度: {{ backVideo.eyeResultsData.maximumSpeed || 0 }}<span>pixel/ms</span>
                </p>
                <p>
                    眼跳绝对增益（初始）: {{ backVideo.eyeResultsData.increaseInitial || 0 }} <span>pixel/ms</span>
                </p>
                <p>
                    眼跳增益（终末）: {{ backVideo.eyeResultsData.increaseTerminal || 0 }} <span>pixel/ms</span>
                </p>
                <p>
                    眼跳侵入（刺激前）: {{ backVideo.eyeResultsData.invadeExciteBefore || 0 }} <span>pixel/ms</span>
                </p>
            </div>
            <div class="maskTextBox" v-if="route.query?.taskType == '3' && route.query?.type == '2'">
                <p>
                    新照片平均停留时间: <span>{{ backVideo.memoryResultsData.newImagestayTime || 0 }}ms</span>
                </p>
                <p>
                    旧照片平均停留时间: <span>{{ backVideo.memoryResultsData.oldImagestayTime || 0 }}ms</span>
                </p>
                <p>
                    新旧偏好比: {{ backVideo.memoryResultsData.imageStayRatio || 0 }}
                </p>
            </div>
            <img src="../../../static/images/statistics/closeMask.png" @click="closeMask" />

            <div class="eyesBackPlayBox" style="width: 1060px;height: 660px;background-size: 1060px 660px;">
                <eyesBackPlay v-if="route.query?.taskType == '3' && route.query?.type == '1' && setAttr.maskShow"
                    class="comdiv" style="width: 1000px;height: 600px;" @videoPlay="videoPlay" id="playbackId">
                </eyesBackPlay>
                <rememberPicDbBack v-if="route.query?.taskType == '3' && route.query?.type == '2' && setAttr.maskShow"
                    class="comdiv" style="width: 1000px;height: 600px;" @videoPlay="videoPlay" id="playbackId">
                </rememberPicDbBack>
            </div>
            <div class="videoBox">
                <video :src="videoPath" id="videoEl" :controls="false" muted></video>
            </div>
        </div>
    </div>
</template>

<style lang='less' scoped>
.subscribe {
    background: #f3f3f3;
    display: flex;
    justify-content: space-between;
}

.subscribe-list {
    width: 100%;
    border-radius: 10px;
    padding: 15px;

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

:deep(.ant-table-cell) {
    color: #222222;
}

.chart_bottom {
    text-align: center;
}

.chart_bottom span:nth-child(1) {
    width: 10px;
    height: 10px;
    background: #40B761;
    border-radius: 6px;
    display: inline-block;
    margin-right: 5px;
}

.chart_bottom span:nth-child(2) {
    width: 48px;
    height: 17px;
    font-size: 12px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #323233;
    line-height: 17px
}

.mask-box {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: rgba(252, 248, 230, 0.5);
    backdrop-filter: blur(10px);

}

.centent-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.maskTextBox {
    padding: 16px;
    font-size: 10px;
    color: #654925;
    line-height: 26px;
}

.centent-box img {
    width: 57px;
    height: 57px;
    position: absolute;
    top: 14px;
    right: 130px;
}

.eyesBackPlayBox {
    background-image: url(../../../static/images/statistics/maskBg.png);
    background-repeat: no-repeat;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

}

.comdiv {
    margin: 30px;
}

.videoBox {
    width: 166px;
    height: 136px;
    position: absolute;
    right: 11px;
    bottom: 9px;
    background-image: url(../../../static/images/statistics/videoBg.png);
    background-size: 166px 136px;
    background-repeat: no-repeat;
    overflow: hidden;

}

.videoBox video {
    width: 160px;
    height: 130px;
    border-radius: 12px;
    margin: 3px;
}
</style> 