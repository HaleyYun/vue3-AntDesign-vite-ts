<template>
  <div class="all-box">
    <video id="video1" class="audio-box" :muted="isMuted" autoplay="true" src="" controls="true"></video>
    <div class="statisticsTopLeft" @click="outPage">
      <img src="../../static/images/eyesGame/out.png" />
      <span>返回</span>
    </div>
    <video id="video" class="video" autoplay="true"></video>
    <div class="box-content">
      <img class="headbg" :src="currentProcedure ? currentProcedure.steps[0].elements[0].content : '#'" alt="" />
      <div class="voice-box" v-show="!isSpeak">
        <img class="headbg-stop" v-if="!isStartVoice" src="../../static/images/eyesGame/stop.png" alt="" />
        <img class="headbg-stop" v-if="isStartVoice" src="../../static/images/eyesGame/start.png" alt="" />
        <img class="headbg-voice" src="../../static/images/eyesGame/voice.png" alt="" />
      </div>
      <div class="voice-box-speak" v-show="isSpeak">
        <img @click="jumpPage" class="headbg-speak" src="../../static/images/eyesGame/nextbtn.png" alt="" />
      </div>
    </div>
    <div class="mask" v-show="popUpState">
      <div class="pop-up">
        <h2>筛查提示</h2>
        <p class="text-1">本次筛查预计用时6分钟，过程中请勿离开设备</p>
        <p class="text-2">为了本次筛查准确有效，请您在光线明亮的空间采取一个舒适的姿势开始测试，并且确保您的身后没有其他人的正脸出现。确保您的头部和脖子都处于屏幕中。您的头部可以轻微跟随视线的方向移动，但请勿剧烈摇摆您的头部。</p>
        <button @click="closePopUp">我已知晓!</button>
      </div>
    </div>
    <div class="maskBox" v-show="isShowLoading">
      <a-spin size="large" />
    </div>
    <a-modal v-model:visible="openModal" :zIndex="99999999" :closable="false" title="提示" ok-text="确认" cancel-text="返回列表" @ok="hideModal" @cancel="outPage">
      <p>资源加载失败请重试</p>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { onMounted, reactive, toRefs, onUnmounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { visibleVideo } from '../../utils/voice';
import { getTempletAPI, getEstimateNum } from '../../apis/eyes_game';
import { useEyesGameStore } from '../../stores/eyes_game';
import { useState } from '../../stores/state';
import { listItemType } from '../../stores/types/eyes_game';
// import { message } from 'ant-design-vue';
import { imgsPreloader } from '../../utils/imgPreloader';
export default {
  setup() {
    const store = useEyesGameStore();
    const serveStore = useState();
    const router = useRouter();
    const route = useRoute();
    const setAttr = reactive({
      isShowLoading: true,
      isSpeak: false,
      isStartVoice: true,
      isOpenVideo: false,
      isMuted: true,
      getHttpVideo: '#',
      setVoiceCount: 2,
      popUpState: false
    });
    const currentProcedure = ref<listItemType | undefined>(undefined);
    const openModal = ref<boolean>(false);
    onMounted(() => {
      // getModelType();
      // alert(store.eyeProcedureActive +'进入页面弹出')
      getFontConfig(window.innerWidth, window.innerHeight);
    });
    onUnmounted(() => {
      console.log(serveStore.QueryProData);
      visibleVideo(setAttr.isOpenVideo + '');
    });
    // const getModelType = () => {
    //     getDictType({ dictType: "device_type" }).then(res => {
    //         if (res.code === 200) {
    //             let index = res.data.findIndex(item => item.dictLabel === window.innerWidth + "_" + window.innerHeight)
    //             if (index > -1) {
    //                 store.modelType = res.data[index].dictValue
    //             } else {
    //                 message.error('未匹配到机型');
    //             }
    //         }
    //     })
    // }
    const startVideo = (url: string) => {
      // 开始播放语音
      setAttr.isStartVoice = false;
      setAttr.isMuted = true;
      let video: HTMLVideoElement | null = document.getElementById('video1') as HTMLVideoElement;
      if (video) {
        video.src = url;
        video.load();
        video.play();
        setAttr.isMuted = false;
        video.addEventListener(
          // 监听语音播放结束
          'ended',
          function () {
            setAttr.isStartVoice = true;
            setAttr.isSpeak = true;
            voiceCountFunc(url);
          },
          false
        );
      }
    };
    const voiceCountFunc = (url: string) => {
      setAttr.setVoiceCount--;
      if (setAttr.setVoiceCount <= 0) {
        setAttr.isStartVoice = true;
        setAttr.isSpeak = true;
      } else {
        let timer: NodeJS.Timeout | null = setTimeout(() => {
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }
          startVideo(url);
          setAttr.isStartVoice = false;
          setAttr.isSpeak = false;
        }, 5000);
      }
    };

    const getFontConfig = (width: number, height: number) => {
      // 获取语音及文字配置
      console.log(width, height);
      let para = {
        archiveNum: serveStore.QueryProData.clientId,
        serviceCode: serveStore.QueryProData.checkService,
        deviceNum: width + '_' + height
      };
      if (serveStore.QueryProData.status == 4) {
        para = {
          archiveNum: serveStore.QueryProData.archivesNo,
          serviceCode: serveStore.QueryProData.estimateServeCode || serveStore.QueryProData.checkService,
          deviceNum: width + '_' + height
        };
      }
      getTempletAPI(para).then(res => {
        if (res.code === 200) {
          store.eyeProcedureList = res.data.template;
          store.eyeProcedureActive = 0;
          console.log('111', res, store.currentProcedure);
          currentProcedure.value = store.currentProcedure;
          setAttr.getHttpVideo = currentProcedure.value.steps[0].elements[1].content;
          imgsPreloader(res.data.files)
            .then(() => {
              setAttr.isShowLoading = false;
              setAttr.popUpState = true;
            })
            .catch(() => {
              // alert(JSON.stringify(err))
              setAttr.isShowLoading = false;
              openModal.value = true;
            });
        } else {
          store.eyeProcedureList = [];
          store.eyeProcedureActive = 0;
        }
      });
    };

    const hideModal = () => {
      openModal.value = false;
      setAttr.isShowLoading = true;
      getFontConfig(window.innerWidth, window.innerHeight);
    };

    const outPage = () => {
      visibleVideo(setAttr.isOpenVideo + '');
      store.eyeProcedureList = [];
      store.eyeProcedureActive = 0;
      if (serveStore.QueryProData.status == 4) {
        router.back();
        return;
      }
      router.push({
        path: '/servicePack',
        query: {
          ticketCode: route.query.ticketCode
        }
      });
    };
    const jumpPage = () => {
      setAttr.isShowLoading = true;
      // alert(JSON.stringify(route.query.estimateNum) +'入参')
      // alert(JSON.stringify(serveStore.QueryProData) +'缓存')
      let data = {
          archivesNo: serveStore.QueryProData.clientId,
          customName: serveStore.QueryProData.clientName,
          customPhone: serveStore.QueryProData.phone,
          deviceNum: window.innerWidth + '_' + window.innerHeight,
          estimateServeCode: serveStore.QueryProData.checkService,
          estimateServeName: serveStore.QueryProData.checkName,
          orderNum: serveStore.QueryProData.ticketsBookingCode
        };
        getEstimateNum(data).then(res => {
          if (res.code === 200) {
            store.estimateNum = res.data;
            // alert(store.estimateNum +'缓存')
            store.eyeProcedureActive += 1;
            router.replace({
              path: '/xmTestCorrect',
              query: {
                estimateNum: res.data,
                ticketCode: route.query.ticketCode,
                str: 'eyes'
              }
            });
          }
          setAttr.isShowLoading = false;
        });
    };
    const closePopUp = () => {
      setAttr.popUpState = false;
      startVideo(setAttr.getHttpVideo);
      visibleVideo(!setAttr.isOpenVideo + '');
    };
    return {
      router,
      ...toRefs(setAttr),
      outPage,
      jumpPage,
      currentProcedure,
      closePopUp,
      hideModal,
      openModal
    };
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.audio-box {
  position: fixed;
  right: 0;
  opacity: 0;
  z-index: -10;
}

.all-box {
  width: 100%;
  height: 100%;
  background: #ccc;
}

.welcome-box {
  font-size: 68px;
}

.start-btn {
  font-size: 48px;
}

.video {
  width: 100%;
  height: 100%;
  display: block;
}

.box-content {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.headbg {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}

.headbg-stop {
  width: 50px;
  height: 50px;
}

.headbg-voice {
  width: 320px;
  height: 61px;
  margin-left: 13px;
}

.headbg-speak {
  width: 110px;
  height: 110px;
}

.voice-box {
  position: absolute;
  // left: 309px;
  // bottom: 61px;
  left: 50%;
  bottom: 60px;
  transform: translate(-50%, 0);
  z-index: 2;
  display: flex;
  align-items: center;
}

.voice-box-speak {
  position: absolute;
  left: 50%;
  bottom: 30px;
  transform: translate(-50%, 0);
  z-index: 2;
  display: flex;
  align-items: center;
}

.statisticsTopLeft {
  color: #654925;
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 9;
  left: 20px;
  top: 20px;

  img {
    width: 31px;
    height: 31px;
  }

  span {
    margin-left: 13px;
    font-size: 19px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #654925;
    line-height: 27px;
  }
}

.mask {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.83);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;

  .pop-up {
    width: 785.44px;
    height: 471.2px;
    padding: 0 44px;
    box-sizing: border-box;
    background: #ffffff;
    border-radius: 17.44px;
    border: 0.8px solid #979797;
    text-align: center;
    position: absolute;
    top: calc(50vh - 240px);
    left: calc(50vw - 392px);

    h2 {
      font-size: 33.44px;
      font-family: PingFang-SC-Bold, PingFang-SC;
      font-weight: bold;
      color: #222222;
      line-height: 47.2px;
      padding-top: 47.2px;
    }

    .text-1 {
      margin-top: 24px;
      font-size: 30.56px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #222222;
      line-height: 42.88px;
    }

    .text-2 {
      margin-top: 8.8px;
      font-size: 24.8px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #636363;
      line-height: 37.76px;
    }

    button {
      width: 346.24px;
      height: 69.76px;
      margin-top: 12px;
      background: #654925;
      border-radius: 36.32px;
      border: 0.8px solid #654925;
      font-size: 29.12px;
      font-family: PingFang-SC-Bold, PingFang-SC;
      font-weight: bold;
      color: #ffffff;
    }
  }
}

.maskBox {
  width: 100vw;
  height: 100vh;
  z-index: 99999999;
  background: rgba(0, 0, 0, 0.83);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
