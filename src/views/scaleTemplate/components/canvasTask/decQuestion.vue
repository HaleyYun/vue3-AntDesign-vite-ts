<template>
  <div class="bigbox">
    <div class="int-box" v-for="(item, index) in list">
      <input type="text" :value="optionData.answersList[index]" :maxlength="3" @input="(e) => changeInputVal(e, index)"
        enterkeyhint="done" />
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
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
    const list = ref(['a', 'b', 'c', 'd', 'e',]);
    props.optionData.answersList = [];
    const changeInputVal = (e, i) => {
      console.log("--", e, e.currentTarget.value, i)
      if (e.currentTarget.value === "") {
        props.optionData.answersList[i] = "";
      }
      const regex = /^-?\d+$/;
      if (regex.test(e.currentTarget.value)) {
        props.optionData.answersList[i] = e.currentTarget.value;
      } else {
        e.currentTarget.value = e.currentTarget.value.replace(/[^-\d]/g, '');
        props.optionData.answersList[i] = e.currentTarget.value;
      }
      handleAnswers()
    }
    const handleAnswers = () => {
      let answersList = JSON.parse(JSON.stringify(props.optionData.answersList));
      for (let i = 0; i < list.value.length; i++) {
        if (!props.optionData.answersList[i] && props.optionData.answersList[i] !== 0) answersList[i] = list.value[i]
      }
      props.optionData.answers = answersList.join("|")
    }
    const outShow = () => {
      let answerList = props.optionData.answers.split("|")
      for (let i = 0; i < answerList.length; i++) {
        if (answerList[i] !== list.value[i]) props.optionData.answersList[i] = answerList[i]
      }
      console.log(props.optionData.answersList)
    }
    if (route.query?.status === 'modify') {
      outShow()
    }
    handleAnswers()
    return {
      list,
      // intNum,
      changeInputVal,
    };
  },
};
</script>

<style lang="less" scoped>
.bigbox {
  width: 100%;
  height: 100%;
  padding: 0 8%;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .int-box {
    width: 180px;
    height: 125px;
    background: #F1F1F1;
    border-radius: 22px;

    img {
      width: 50px;
      height: 50px;
      margin: 10px auto;
    }

    input {
      width: 180px;
      height: 125px;
      border: 0;
      background: #F1F1F1;
      text-align: center;
      line-height: 125px;
      font-size: 30px;
      color: #333;
      border-radius: 22px;
    }
  }
}
</style>
