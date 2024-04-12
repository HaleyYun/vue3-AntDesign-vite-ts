<template>
    <div class="main">
        <div class="content">
            <div class="next" v-if="showNext" @click="handleNext">下一步</div>
            <audio class="videoTd" id="audioPlay" src="" :muted="isMuted" autoplay="true" controls="false"></audio>
        </div>


        <div class="filter-prompt" v-if="isShow">
            <div class="poput">
                <span class="btn-close"></span>
                <p class="title">筛查提示</p>
                <p class="small-title">本次筛查预计用时10分钟，过程中请勿离开设备</p>
                <p class="poput-content">{{ instructions }}</p>
                <div class="btn" @click="alreadyKnow">我已知晓!</div>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { reactive, onMounted, toRefs } from 'vue';
import { visibleVideo } from "@/utils/voice"
import { useState } from "@/stores/state"
import { useRouter } from 'vue-router'
import { getDepressedAPI, getEstimateNumApi } from "@/apis/depressed_game/index"
export default {
    setup() {
        const state = useState()
        const router = useRouter()
        const setAttr = reactive({
            isShow: true,
            instructions: '',
            isMuted: true,
            isTrue: false,
            audioUrl: '',//音频链接
            showNext: false

        })

        onMounted(() => {
            let para = {
                archiveNum: state.QueryProData.clientId,
                serviceCode: state.QueryProData.checkService,
                deviceNum: window.innerWidth + "_" + window.innerHeight
            }
            getDepressedAPI(para).then(res => {
                if (res.code === 200) {
                    state.getDepressData(res.data.template)
                    state.scheduleNumberState = 0
                    setAttr.instructions = res.data.template[0].steps[0].elements.filter(item => item.type == 'text').map(item => item.content).join('')
                    setAttr.audioUrl = res.data.template[0].steps[0].elements.filter(item => item.type == 'audio').map(item => item.content).join('')
                    console.log(setAttr.audioUrl)
                }
            })
        })

        // 开始播放语音
        const startVideoUrl = (url: string) => {
            let audio: HTMLAudioElement = document.getElementById("audioPlay") as HTMLAudioElement;
            audio.src = url
            setAttr.isMuted = false
            let timer = setTimeout(() => {
                clearTimeout(timer)
                audio.load();
                audio.play();
            }, 0)
            // 监听语音播放结束
            audio.addEventListener(
                "ended",
                () => {
                    setAttr.showNext = true
                    console.log('123')
                },
                false
            );
        }
        //点击我已知晓
        const alreadyKnow = () => {
            setAttr.isShow = false
            startVideoUrl(setAttr.audioUrl)
            visibleVideo(!setAttr.isTrue + '')
        }
        //下一步
        const handleNext = () => {
            // alert(JSON.stringify(route.query.estimateNum) +'入参')
            // alert(JSON.stringify(state.QueryProData) +'缓存')
            let data = {
                    archivesNo: state.QueryProData.clientId,
                    customName: state.QueryProData.clientName,
                    customPhone: state.QueryProData.phone,
                    deviceNum: window.innerWidth + "_" + window.innerHeight,
                    estimateServeCode: state.QueryProData.checkService,
                    estimateServeName: state.QueryProData.checkName,
                    orderNum: state.QueryProData.ticketsBookingCode,
                }
                getEstimateNumApi(data).then(res => {
                    if (res.code === 200) {
                        console.log(res)
                        state.getEstimateNum(res.data)
                        // alert('Fcansu ' + res.data)
                        visibleVideo(setAttr.isTrue + '')
                        router.replace({
                            path: '/xmTestCorrect',
                            query: {
                                estimateNum: res.data,
                                ticketCode: state.QueryProData.checkService,
                                str: 'depress'
                            }
                        })
                    }
                })
        }
        return {
            router,
            alreadyKnow,
            handleNext,
            ...toRefs(setAttr)
        }
    },
    methods: {
    }
}
</script>

<style lang="less" scoped>
.main {
    background: #94826B;
    height: 100vh;
    width: 100vw;
}

.content {
    vertical-align: middle;
    display: table-cell;
}


.next {
    width: 90px;
    text-align: center;
    height: 90px;
    line-height: 90px;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    color: #fff;
    font-size: 20px;
    background: #b2895e;
    border-radius: 50%;
    transition: all .5s ease;
    position: fixed;
    bottom: 20px;
    transform: translateX(-50%);
    left: 50%;
    margin: auto;
    @media only screen and (max-width: 1920px) {
        bottom: 35px;
    }
}


&.active {
    visibility: visible;
    opacity: 1;
}



.videoTd {
    position: fixed;
    top: 0;
    visibility: hidden;
    opacity: 0;
}

.filter-prompt {
    z-index: 1;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #000;
}

.poput {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 540px;
    height: 293px;
    background-color: #fff;
    border-radius: 11px;
    padding: 20px 20px 0 20px;
}

.title {
    text-align: center;
    font-weight: 600;
    letter-spacing: 2px;
    font-size: 25px;
    margin-bottom: 10px !important;
    margin-top: 6px;
}

.small-title {
    font-size: 19px;
    text-align: center;
    font-weight: 600;
    letter-spacing: 1px;
    margin-bottom: 3px !important;
}

.poput-content {
    letter-spacing: 2px;
    font-size: 16px;
    color: #4e4a4ae6;
    font-weight: 500;
}

.btn {
    width: 160px;
    height: 35px;
    line-height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    text-align: center;
    color: #fff;
    border-radius: 30px;
    background-color: #634926;
    margin: 20px auto 0px;
}

.btn-close {
    position: absolute;
    top: 10px;
    font-size: 20px;
    color: #a7a39e;
}
</style>