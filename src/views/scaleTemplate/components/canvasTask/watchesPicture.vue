<template>
  <div class="content-canvas">
    <div class="task-l" :key="canvasKey">
      <img class="task-l-img" v-if="optionData.imgUrl" :src="optionData.imgUrl" alt="">
      <CanvasFunc v-else :ref="'watch' + canvasObj.pageIndex" :canvasObj="canvasObj" :count="count"
        :photoUrl="optionData?.photoUrl" :isDraw="isDraw" :str="'watch'" :imageUrl="optionData.imgUrl"></CanvasFunc>
    </div>
    <div class="task-r">
      <div class="task-bg" @click="changePenColor('#5766fe')">
        <img :src="blueShow == true ? getAssetsFile('blueActive.png') : getAssetsFile('blueGray.png')" />
      </div>

      <div class="task-bg" @click="changePenColor('#ff1212')">
        <img :src="redShow == true ? getAssetsFile('redActive.png') : getAssetsFile('redGray.png')" />
      </div>

      <div class="task-bg" @click="clearCanvas">
        <img src="../../../../assets/images/moca/cleGray.png" />
      </div>

      <div class="task-big">
        <img
          :src="optionData.children[0].rightValue == true ? getAssetsFile('overActive.png') : getAssetsFile('overGray.png')"
          @click="uploadBaesUrl(0, true)" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, getCurrentInstance, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import CanvasFunc from '../canvas/canvasFunc.vue';
// import CanvasFuncRotate from "../canvas/canvasFuncRotate.vue"; // 正向画板
import { useState } from '@/stores/state';
const setMocaData = useState();
export default {
  props: {
    optionData: {
      type: Object,
      required: true
    },
    questionNum: {
      type: Number,
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
      active: 'box1',
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
        proxy.$refs['watch' + state.canvasObj.pageIndex]?.pencilBtn('#5766fe');
      });
      if (route.query?.status === 'modify') {
        uploadBaesUrl(0, true)
      }
    });
    //切换画笔
    const changePenColor = color => {
      if (color == '#5766fe') {
        state.blueShow = true;
        state.redShow = false;
      }
      if (color == '#ff1212') {
        state.blueShow = false;
        state.redShow = true;
      }
      proxy.$refs['watch' + state.canvasObj.pageIndex]?.pencilBtn(color);
    };
    //清除画笔
    const clearCanvas = () => {
      state.blueShow = false;
      state.redShow = false;
      state.isDraw = true;
      props.optionData.children[0].rightValue = false;
      props.optionData.children[0].wrongValue = false;
      props.optionData.imgUrl = '';
      props.optionData.photoUrl = '';
      emit('changeNextStatus', false);
      proxy.$refs['watch' + state.canvasObj.pageIndex]?.resetCanvas();
      state.canvasKey += 1;
      nextTick(() => {
        changePenColor('#5766fe');
      })
    };
    //上传图片
    const uploadBaesUrl = (val, bol) => {
      if (val == 0) {
        props.optionData.children[0].rightValue = bol;
      }
      emit('changeNextStatus', true);
      if (props.optionData.photoUrl) return;
      proxy.$refs['watch' + state.canvasObj.pageIndex]?.returnBaseUrl().then(res => {
        props.optionData.imgUrl = res;
        props.optionData.children[0].isRight = val;
      });
      state.isDraw = false;
    };

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
    border-radius: 14px;
    overflow: hidden;

    .task-l-img {
      width: 100%;
      height: 100%;
      border-radius: 14px;
    }
  }

  .task-r {
    width: 10%;
    height: 100%;
    float: right;

    .task-bg {
      width: 115px;
      height: 115px;
      margin-bottom: 8px;
      &:nth-child(3){
        margin-bottom: 0px;
      }
      img {
        width: 115px;
        height: 115px;
      }
    }

    .task-big {
      width: 100px;
      height: 100px;
      background: #f6f7ff;
      border-radius: 50px;
      margin-left: 8px;
      border: 1px solid #f6f7ff;
      margin-top: 12px;

      img {
        width: 68px;
        height: 68px;
        margin: 15px auto;
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
