<template>
  <div class="big">
    <div class="bigbox">
      <div class="big-line" v-for="(item, index) in optionData.children" :key="index">
        <div class="big-name"><img :src="item.imgUrl" alt=""> <img class="amplify" @click="lookImage(item.imgUrl)"
            src="../../../../assets/images/scaleTemplate/amplify.png" alt=""></div>
        <div class="big-answer">
          <img :src="item.rightValue == true ? getAssetsFile('overActive.png') : getAssetsFile('overGray.png')"
            @click="rightClick(index, true)" />
          <img :src="item.wrongValue == true ? getAssetsFile('clearActive.png') : getAssetsFile('clearGray.png')"
            @click="wrongClick(index, true)" />
        </div>
        <div class="big-input">
          <input placeholder="输入答案:__" :maxlength="300" v-model="item.answers" enterkeyhint="done" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, toRefs, reactive } from 'vue'
import { useRoute } from 'vue-router';

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
  setup(props, { emit }) {
    const route = useRoute()
    const state = reactive({
      isBreak: false
    });
    onMounted(() => {
      if (route.query?.status !== 'modify') return
      for (let i = 0; i < props.optionData.children.length; i++) {
        let answers = props.optionData.children[i].answers;
        if (props.optionData.children[i].isRight === 0) {
          rightClick(i, true)
        } else {
          wrongClick(i, true)
        }
        props.optionData.children[i].answers = answers;
      }
    });

    // 获取assets静态资源
    const getAssetsFile = url => {
      return new URL(`/src/assets/images/moca/${url}`, import.meta.url).href;
    };

    const rightClick = (val, bol) => {
      props.optionData.children[val].rightValue = bol;
      props.optionData.children[val].wrongValue = false;
      if (props.optionData.children[val].rightKey) {
        props.optionData.children[val].answers = props.optionData.children[val].rightKey;
      }
      changeNextStatus()

    };
    const wrongClick = (val, bol) => {
      props.optionData.children[val].wrongValue = bol;
      props.optionData.children[val].rightValue = false;
      if (props.optionData.children[val].rightKey) {
        props.optionData.children[val].answers = "";
      }
      changeNextStatus()
    };

    const changeNextStatus = () => {
      let count = 0
      for (let i = 0; i < props.optionData.children.length; i++) {
        if (props.optionData.children[i].rightValue || props.optionData.children[i].wrongValue) {
          count += 1
        }
      }
      if (count === props.optionData.children.length) {
        emit('changeNextStatus', true);
      }
    }

    // 开始播放语音
    const startVideoUrl = (url) => {
      emit("playAudio", url)
    };

    const lookImage = (url) => {
      emit("showImage", url, true)
    }

    return {
      ...toRefs(state),
      rightClick,
      wrongClick,
      getAssetsFile,
      startVideoUrl,
      lookImage
    };
  }
};
</script>

<style lang="less" scoped>
.big {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0;

  .bigbox {
    width: 80%;
    min-height: 80px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin: auto;

    .big-line {
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;

      .big-name {
        width: 351px;
        height: 285px;
        position: relative;

        img {
          max-width: 351px;
          max-height: 285px;
        }

        .amplify {
          width: 36px;
          height: 36px;
          position: absolute;
          right: 9px;
          bottom: 9px;
        }
      }



      .big-answer {
        width: 186px;
        height: 60px;
        padding: 0px 5px;
        margin-top: 18px;
        background: #f6f7ff;
        border-radius: 51px;
        border: 1px solid #5766fe;
        display: flex;
        align-items: center;
        justify-content: space-between;

        img {
          width: 50px;
          height: 50px;
        }
      }

      .big-input {
        width: 237px;
        height: 60px;
        margin-top: 23px;
        background: #f5f4f4;
        border-radius: 12px;
        text-align: center;

        input {
          width: 156px;
          height: 60px;
          font-size: 20px;
          border: 0px;
          background: #f5f4f4;
          color: #222;
          line-height: 35px;
          outline: none;
        }
      }

    }
  }
}
</style>
