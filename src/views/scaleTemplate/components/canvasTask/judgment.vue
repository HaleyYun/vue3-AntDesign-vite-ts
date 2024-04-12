<template>
  <div class="big">
    <div class="bigbox">
      <div class="big-line" v-for="(item, index) in optionData.children" :key="index">
        <div class="big-name">
          <img class="name-img" @click="startVideoUrl(item.questionVoice, item.contentIndex)" v-if="item.questionVoice" :src="palyNum == item.contentIndex && playOutBtn ? getAssetsFile('p4ActiveAsk.gif') : getAssetsFile('p4Ask.png')" />
          <div class="name">{{ item.content }}</div>
        </div>
        <div class="big-t">
          <div class="big-answer">
            <img :src="item.rightValue == true ? getAssetsFile('overActive.png') : getAssetsFile('overGray.png')" @click="rightClick(index, true)" />
            <img :src="item.wrongValue == true ? getAssetsFile('clearActive.png') : getAssetsFile('clearGray.png')" @click="wrongClick(index, true)" />
          </div>
          <div class="big-input">
            <input placeholder="输入答案:__" :maxlength="300" v-model="item.answers" enterkeyhint="done" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, toRefs, reactive } from 'vue';
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
    },
    topicIndex: {
      type: Number,
      required: true
    },
    playOutBtn: {
      type: Boolean,
      required: true
    }
  },
  setup(props, { emit }) {
    const route = useRoute();
    const state = reactive({
      isBreak: false,
      palyNum: 0
    });

    onMounted(() => {
      if (route.query?.status !== 'modify') return;
      for (let i = 0; i < props.optionData.children.length; i++) {
        let answers = props.optionData.children[i].answers;
        if (props.optionData.children[i].isRight === 0) {
          rightClick(i, true);
        } else {
          wrongClick(i, true);
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
      changeNextStatus();
    };
    const wrongClick = (val, bol) => {
      props.optionData.children[val].wrongValue = bol;
      props.optionData.children[val].rightValue = false;
      if (props.optionData.children[val].rightKey) {
        props.optionData.children[val].answers = '';
      }
      changeNextStatus();
    };

    const changeNextStatus = () => {
      let count = 0;
      for (let i = 0; i < props.optionData.children.length; i++) {
        if (props.optionData.children[i].rightValue || props.optionData.children[i].wrongValue) {
          count += 1;
        }
      }
      if (count === props.optionData.children.length) {
        emit('changeNextStatus', true, props.topicIndex);
      }
    };

    // 开始播放语音
    let lastAudioNum = 0;
    const startVideoUrl = (url, num) => {
      if (url) {
        state.palyNum = num;
        if (lastAudioNum != 0 && lastAudioNum == num) {
          emit('playAudio', url, !props.playOutBtn, 1);
        } else {
          emit('playAudio', url, true, 1);
        }
        lastAudioNum = num; 
      }
    };

    return {
      ...toRefs(state),
      rightClick,
      wrongClick,
      getAssetsFile,
      startVideoUrl
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
    width: 85%;
    min-height: 80px;
    align-items: center;
    margin: auto;

    .big-line {
      display: flex;
      align-content: center;
      justify-content: space-between;
      margin: 25px auto;

      .big-name {
        display: flex;
        // align-items: center;

        // flex: 1;
        margin-right: 25px;
        font-size: 38px;
        font-weight: bold;
        color: #5c7088;
        line-height: 43px;
        // text-decoration:underline;
        .name-img {
          width: 42px;
          height: 42px;
          margin-right: 12px;
        }
      }

      .big-t {
        display: flex;

        .big-answer {
          width: 186px;
          height: 60px;
          padding: 0px 5px;
          margin-right: 20px;
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
}
</style>
