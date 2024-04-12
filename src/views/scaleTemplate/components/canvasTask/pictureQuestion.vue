<template>
  <div class="ask-bg"><img :src="optionData.imgPathList[0]"></div>
  <div class="ask-input">
    <input placeholder="输入答案" type="text" v-model="optionData.children[0].answers" :maxlength="300" enterkeyhint="done" />
    <div class="big-answer">
      <img
        :src="optionData.children[0].rightValue == true ? getAssetsFile('overActive.png') : getAssetsFile('overGray.png')"
        @click="rightClick(true)">
      <img
        :src="optionData.children[0].wrongValue == true ? getAssetsFile('clearActive.png') : getAssetsFile('clearGray.png')"
        @click="wrongClick(true)">
    </div>
  </div>
</template>

<script>
import { onMounted, toRefs, reactive } from "vue";
import { useRoute } from 'vue-router';
export default {
  props: {
    optionData: {
      type: Object,
      required: true,
    },
    questionNum: {
      type: Number,
      required: true
    }
  },
  setup(props, { emit }) {
    const route = useRoute()
    const state = reactive({
    });
    onMounted(() => {
      if (route.query?.status !== 'modify') return
      let answers = props.optionData.children[0].answers;
      if (props.optionData.children[0].isRight === 0) {
        rightClick(true)
      } else {
        wrongClick(true)
      }
      props.optionData.children[0].answers = answers;
    });
    // 获取assets静态资源
    const getAssetsFile = (url) => {
      return new URL(`/src/assets/images/moca/${url}`, import.meta.url).href
    }


    const rightClick = (bol) => {
      //全部题目以及入参
      props.optionData.children[0].rightValue = bol;
      props.optionData.children[0].wrongValue = false;
      props.optionData.children[0].answers = props.optionData.children[0].rightKey;
      emit('changeNextStatus', true);
    }
    const wrongClick = (bol) => {
      //全部题目以及入参
      props.optionData.children[0].wrongValue = bol;
      props.optionData.children[0].rightValue = false;
      props.optionData.children[0].answers = "";
      emit('changeNextStatus', true);
    }

    return {
      ...toRefs(state),
      rightClick,
      wrongClick,
      getAssetsFile
    };
  },
};
</script>

<style lang="less" scoped>
.ask-bg {
  width: 670px;
  height: 350px;
  margin: 20px auto;

  img {
    width: 670px;
    height: 350px;
  }
}

.ask-input {
  width: 68%;
  height: 80px;
  float: right;
  display: flex;

  input {
    width: 445px;
    height: 58px;
    text-align: center;
    border-radius: 8px;
    border: 4px solid #DADADA;
    font-size: 26px;
    font-weight: bold;
    color: #333;
  }

  .big-answer {
    width: 186px;
    height: 60px;
    padding: 0px 5px;
    margin-left: 50px;
    background: #F6F7FF;
    border-radius: 51px;
    border: 1px solid #5766FE;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      width: 50px;
      height: 50px;
    }
  }
}
</style>
