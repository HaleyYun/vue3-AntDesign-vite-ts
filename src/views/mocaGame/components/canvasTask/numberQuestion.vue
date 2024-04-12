<template>
  <div class="bigbox top80">
    <div class="big-line">
      <div class="big-name" @click="startVideoUrl(optionData.children[0].questionVoice)">
        {{ optionData.children[0].content }}</div>
      <audio id="numAudio" :src="optionData.children[0].questionVoice"></audio>
      <div class="big-t">
        <div class="big-answer">
          <img
            :src="optionData.children[0].rightValue == true ? getAssetsFile('overActive.png') : getAssetsFile('overGray.png')"
            @click="rightClick(true)">
          <img
            :src="optionData.children[0].wrongValue == true ? getAssetsFile('clearActive.png') : getAssetsFile('clearGray.png')"
            @click="wrongClick(true)">
        </div>
        <div class="big-input">
          <input placeholder="输入答案" 
          :value="optionData.children[0].rightValue==true?optionData.children[0].answers:(optionData.children[0].answers!=''?optionData.children[0].answers:'')" 
          :disabled="optionData.children[0].rightValue==true?true:false" @blur="inputText" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, toRefs, reactive } from "vue";
import { useState } from '@/stores/state';
const setMocaData = useState();
export default {
  props: {
    optionData: {
      type: Object,
      required: true,
    },
    questionNum:{
      type:Number,
      required:true
    } 
  },
  setup(props, { emit }) {
    const state = reactive({
    });
    onMounted(() => {
      console.log(props.index)
    });

    // 获取assets静态资源
    const getAssetsFile = (url) => {
        return new URL(`/src/assets/images/moca/${url}`, import.meta.url).href
    }
    


    const rightClick = (bol) => {
      //全部题目以及入参
      const allDataList = JSON.parse(setMocaData.mocaAllDataList)

      props.optionData.children[0].rightValue = bol
      props.optionData.children[0].wrongValue = false
      props.optionData.children[0].answers = props.optionData.children[0].rightKey

      allDataList[props.questionNum].children[0].rightValue = bol
      allDataList[props.questionNum].children[0].wrongValue = false
      allDataList[props.questionNum].children[0].isRight = 0
      allDataList[props.questionNum].children[0].answers = allDataList[props.questionNum].children[0].rightKey

      setMocaData.getMocaAllDataList(JSON.stringify(allDataList))
      console.log(allDataList)
      emit("changeData",true,'/')
    }
    const wrongClick = (bol) => {
      //全部题目以及入参
      const allDataList = JSON.parse(setMocaData.mocaAllDataList)

      props.optionData.children[0].wrongValue = bol
      props.optionData.children[0].rightValue = false
      allDataList[props.questionNum].children[0].wrongValue = bol
      allDataList[props.questionNum].children[0].rightValue = false
      allDataList[props.questionNum].children[0].isRight = 1
      allDataList[props.questionNum].children[0].answers = ""

      setMocaData.getMocaAllDataList(JSON.stringify(allDataList))
      console.log(allDataList)
      emit("changeData",true,'/')
    }
    //输入框
    const inputText = (e) => {
      //全部题目以及入参
      const allDataList = JSON.parse(setMocaData.mocaAllDataList)
      
      allDataList[props.questionNum].children[0].answers = e.currentTarget.value
      setMocaData.getMocaAllDataList(JSON.stringify(allDataList))
      console.log(allDataList)
    }

    // 开始播放语音
    const startVideoUrl = (url, cd = () => { }) => {
      // alert(url + '播放语音')
      // emit("changeData",'','str')
      let audio = document.getElementById("textAudio")
      audio.src = url
      let timer = setTimeout(() => {
        clearTimeout(timer)
        audio.load();
        audio.play();
      }, 0)
      // 监听语音播放结束
      audio.addEventListener(
        "ended",
        () => {
          // emit("changeData",'','/')
          cd()
        },
        false
      );
    }
    return {
      ...toRefs(state),
      startVideoUrl,
      rightClick,
      wrongClick,
      inputText,
      getAssetsFile
    };
  },
};
</script>

<style lang="less" scoped>
.bigbox {
  width: 80%;
  min-height: 80px;
  align-items: center;
  margin: 150px auto;

  .big-line {
    display: flex;
    align-content: center;
    justify-content: space-between;
    margin: 25px auto;

    .big-name {
      font-size: 38px;
      font-weight: bold;
      color: #5C7088;
      line-height: 53px;
      text-decoration: underline;
    }

    .big-t {
      display: flex;

      .big-answer {
        width: 186px;
        height: 60px;
        padding:0px 5px;
        margin-right: 20px;
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

      .big-input {
        width: 237px;
        height: 60px;
        background: #F5F4F4;
        border-radius: 12px;
        text-align: center;

        input {
          width: 156px;
          height: 35px;
          font-size: 20px;
          border: 0px;
          margin-top: 15px;
          background: #F5F4F4;
          color: #222;
          line-height: 35px;
        }
      }
    }
  }
}

.top80 {
  margin: 230px auto;
}</style>
