<template>
  <div class="content-canvas">
    <div class="task-more">
      <div class="task-li">
        <div class="li-small" @click="showBig(optionData.imgPathList[0])"><img
            src="../../../../assets/images/moca/smallBtn.png" /></div>
        <div class="li-big"><img :src="optionData.imgPathList[0]" /></div>
      </div>
      <div class="task-me" :key="canvasKey">
        <img class="task-me-img" v-if="optionData.imgUrl" :src="optionData.imgUrl" alt="">
        <CanvasFunc v-else :ref="'cube' + canvasObj.pageIndex" :canvasObj="canvasObj" :count="count"
          :photoUrl="optionData?.photoUrl" :isDraw="isDraw" :str="'cube'" :imageUrl="optionData.imgUrl"></CanvasFunc>
      </div>
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

      <div class="task-big" v-if="namestr != 'CFT'">
        <img class="one"
          :src="optionData.children[0].rightValue == true ? getAssetsFile('overActive.png') : getAssetsFile('overGray.png')"
          @click="uploadBaesUrl(0, true)" />
        <img
          :src="optionData.children[0].wrongValue == true ? getAssetsFile('clearActive.png') : getAssetsFile('clearGray.png')"
          @click="uploadBaesUrl(1, true)" />
      </div>


      <div class="task-big2" v-else>
        <img
          :src="optionData.children[0].rightValue == true ? getAssetsFile('overActive.png') : getAssetsFile('overGray.png')"
          @click="uploadBaesUrl(0, true)" />
      </div>


    </div>
  </div>


  <a-modal style="width: auto" v-model:visible="outVisible" :closable="false" :footer="null" centered>
    <img :src="optionData.imgPathList[1]" />
  </a-modal>
</template>

<script>
import { reactive, toRefs, onMounted, getCurrentInstance, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { useState } from '@/stores/state';
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
    namestr: {
      type: String,
      required: true
    }
  },
  components: { CanvasFunc },
  setup(props, { emit }) {
    const route = useRoute()
    const { proxy } = getCurrentInstance();
    const cftState = useState()
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
      outVisible: false,
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
        proxy.$refs['cube' + state.canvasObj.pageIndex]?.pencilBtn('#5766fe');
      });
      if (route.query?.status === 'modify') {
        uploadBaesUrl(props.optionData.isRight, true)
      }
    });

    //放大图片
    const showBig = url => {
      console.log(url);
      emit('showImage', url, true);
    };
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
      proxy.$refs['cube' + state.canvasObj.pageIndex]?.pencilBtn(color);
    };
    //清除画笔
    const clearCanvas = () => {
      state.blueShow = false;
      state.redShow = false;
      state.isDraw = true;
      props.optionData.children[0].rightValue = false;
      props.optionData.children[0].wrongValue = false;
      props.optionData.imgUrl = "";
      props.optionData.photoUrl = '';
      emit('changeNextStatus', false);
      proxy.$refs['cube' + state.canvasObj.pageIndex]?.resetCanvas();
      state.canvasKey += 1;
      nextTick(() => {
        changePenColor('#5766fe');
      })
    };
    const uploadBaesUrl = (val, bol) => {
      if (val == 0) {
        props.optionData.children[0].rightValue = bol;
        props.optionData.children[0].wrongValue = false;
        cftState.cftBol = false;
      }
      if (val == 1) {
        props.optionData.children[0].wrongValue = bol;
        props.optionData.children[0].rightValue = false;
      }
      if (props.optionData.photoUrl) {
        emit('changeNextStatus', true);
        return;
      }
      proxy.$refs['cube' + state.canvasObj.pageIndex]?.returnBaseUrl().then(res => {
        props.optionData.imgUrl = res;
        props.optionData.children[0].isRight = val;
      });
      emit('changeNextStatus', true);
      state.isDraw = false;
    };

    return {
      ...toRefs(state),
      changePenColor,
      clearCanvas,
      uploadBaesUrl,
      showBig,
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
  overflow: hidden;

  .task-more {
    width: 88%;
    height: 100%;
    display: flex;
    float: left;

    .task-li {
      width: 356px;
      height: 100%;

      .li-small {
        width: 45px;
        height: 45px;
        margin: 100px 150px 20px 150px;

        img {
          width: 45px;
          height: 45px;
        }
      }

      .li-big {
        width: 320px;
        height: 320px;
        border-radius: 10px;

        img {
          max-width: 320px;
          max-height: 320px;
          border-radius: 10px;
        }
      }
    }

    .task-me {
      width: 890px;
      height: 100%;
      background-color: #fff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.12);

      .task-me-img {
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



    .task-big2 {
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
