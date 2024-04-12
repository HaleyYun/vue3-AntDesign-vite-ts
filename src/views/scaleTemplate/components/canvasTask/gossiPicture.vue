<template>
  <div class="content-canvas">
    <div class="task-l">
      <div class="canvas" :key="canvasKey">
        <img v-if="optionData.imgUrl" :src="optionData.imgUrl" alt="">
        <CanvasFunc v-if="!optionData.imgUrl" :ref="'goss' + canvasObj.pageIndex" :canvasObj="canvasObj" :count="count"
          :nextDisable="nextDisable" :photoUrl="optionData?.photoUrl" :isDraw="isDraw" :str="'gossi'"
          :canvasBg="optionData?.imgPathList ? optionData?.imgPathList[0] : ''" :imageUrl="optionData.imgUrl">
        </CanvasFunc>
        <div class="boxBg"><img
            v-if="optionData?.imgPathList && optionData?.imgPathList[0] && !optionData?.photoUrl && !optionData.imgUrl"
            :src="optionData?.imgPathList && optionData?.imgPathList[0] ? optionData?.imgPathList[0] : ''"
            :style="{ transform: `rotate(${count}deg)` }" /></div>
      </div>
    </div>
    <div class="task-r">
      <div class="task-bg" @click="changePenColor('#5766fe', 'blue')">
        <img :src="blueShow == true ? getAssetsFile('blueActive.png') : getAssetsFile('blueGray.png')" />
      </div>

      <div class="task-bg" @click="changePenColor('#ff1212', 'red')">
        <img :src="redShow == true ? getAssetsFile('redActive.png') : getAssetsFile('redGray.png')" />
      </div>

      <div class="task-bg" @click="clearCanvas">
        <img src="../../../../assets/images/moca/cleGray.png" />
        <!-- <img :src="cleShow==true?getAssetsFile('cleActive.png'):getAssetsFile('cleGray.png')"> -->
      </div>

      <div class="task-big">
        <img class="one"
          :src="optionData.children[0].rightValue == true ? getAssetsFile('overActive.png') : getAssetsFile('overGray.png')"
          @click="uploadBaesUrl(0, true)" />
        <img
          :src="optionData.children[0].wrongValue == true ? getAssetsFile('clearActive.png') : getAssetsFile('clearGray.png')"
          @click="uploadBaesUrl(1, true)" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, getCurrentInstance, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { debounce } from '@/utils/tools'
import CanvasFunc from '../canvas/canvasFunc.vue';

export default {
  props: {
    optionData: {
      type: Object,
      required: true
    },
    questionNum: {
      type: Number,
      required: true
    },
    nextDisable: {
      type: Boolean,
      required: true
    }
  },
  components: { CanvasFunc },
  setup(props, { emit }) {
    const route = useRoute()
    const { proxy } = getCurrentInstance();
    const state = reactive({
      canvasObj: {
        pencilColor: '#ea382a',
        pencilwidth: 6,
        rubberwidth: 20,
        csBgColor: '#ffffff',
        imgx: 0,
        imgY: 0,
        pageIndex: props.optionData.id - 1,
        pageIndexa: props.optionData.id - 1
      },
      blueShow: true,
      redShow: false,
      count: 0,
      isDraw: true,
      canvasKey: 0,
    });

    // 获取assets静态资源
    const getAssetsFile = url => {
      return new URL(`/src/assets/images/moca/${url}`, import.meta.url).href;
    };
    onMounted(() => {
      nextTick(() => {
        proxy.$refs['goss' + state.canvasObj.pageIndex]?.pencilBtn('#5766fe');
      });
      if (route.query?.status === 'modify') {
        uploadBaesUrl(props.optionData.isRight, true)
      }
    });

    //切换画笔
    const changePenColor = (color, type) => {
      proxy.$refs['goss' + state.canvasObj.pageIndex]?.pencilBtn(color);
      if (type === 'blue') {
        state.blueShow = true;
        state.redShow = false;
      } else {
        state.blueShow = false;
        state.redShow = true;
      }
    };
    //清除画笔
    const clearCanvas = () => {
      state.count = 360;
      state.blueShow = false;
      state.redShow = false;
      state.isDraw = true;
      props.optionData.children[0].rightValue = false;
      props.optionData.children[0].wrongValue = false;
      props.optionData.imgUrl = '';
      props.optionData.photoUrl = '';
      emit('changeNextStatus', false);
      proxy.$refs['goss' + state.canvasObj.pageIndex]?.resetCanvas();
      state.canvasKey += 1;
      nextTick(() => {
        changePenColor('#5766fe', 'blue');
      })
    };
    //上传图片
    const uploadBaesUrl = debounce((val, bol) => {
      state.count = 180;
      if (val == 0) {
        props.optionData.children[0].rightValue = bol;
        props.optionData.children[0].wrongValue = false;
      }
      if (val == 1) {
        props.optionData.children[0].wrongValue = bol;
        props.optionData.children[0].rightValue = false;
      }
      emit('changeNextStatus', true);
      if (props.optionData.photoUrl) return;
      proxy.$refs['goss' + state.canvasObj.pageIndex]?.returnBaseUrl().then(res => {
        console.log(res)
        props.optionData.imgUrl = res;
        props.optionData.children[0].isRight = val;
      });
      state.isDraw = false;
    }, 150, false);

    return {
      ...toRefs(state),
      changePenColor,
      clearCanvas,
      uploadBaesUrl,
      getAssetsFile
    };
  }
};
</script>

<style lang="less" scoped>
.content-canvas {
  width: 100%;
  height: 100%;
  background-color: #efefef;

  .task-l {
    width: 88%;
    height: 100%;
    float: left;
    position: relative;
    border-radius: 14px;
    overflow: hidden;

    .canvas {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .boxBg {
      width: 90%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 2;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .task-r {
    width: 10%;
    height: 100%;
    float: right;

    .task-bg {
      width: 100%;
      height: 21%;

      img {
        width: 115px;
        height: 115px;
      }
    }

    .task-big {
      width: 88px;
      height: 34%;
      background: #f6f7ff;
      border-radius: 50px;
      margin: 10px 0px 0px 15px;
      border: 1px solid #f6f7ff;

      img {
        width: 68px;
        height: 68px;
        margin: 10px;
      }

      img.one {
        margin-top: 15px;
      }
    }

    .task-small {
      width: 68px;
      height: 68px;
      margin: 10px auto;

      img {
        width: 68px;
        height: 68px;
      }
    }
  }
}
</style>
