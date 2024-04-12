<template>
  <div class="big">
    <div class="bigbox">
        <div class="big-line" v-for="(item, index) in optionData.children" :key="index">
            <div class="big-name" :style="{'text-decoration':optionData.id==4?'':'underline'}" @click="startVideoUrl(item.questionVoice)">{{item.content}}</div>
            <audio id="textAudio" :src="item.questionVoice"></audio>
            <div class="big-t">
              <div class="big-answer">
                  <img :src="item.rightValue==true?getAssetsFile('overActive.png'):getAssetsFile('overGray.png')" @click="rightClick(item,index,true)">
                  <img :src="item.wrongValue==true?getAssetsFile('clearActive.png'):getAssetsFile('clearGray.png')" @click="wrongClick(item,index,true)">
              </div>
              <div class="big-input">

                <input placeholder="输入答案:__" v-if="optionData.id==17 ||optionData.id==19"
                :value="item.rightValue==true?item.answers:(item.answers!=''?item.answers:'')"  
                :maxlength="300"
                @blur="inputText(index,$event)"/>

                <input placeholder="输入答案:__" v-else :maxlength="300"
                :value="item.rightValue==true?item.content:(item.content!=''?item.answers:'')"   
                @blur="inputText(index,$event)"/>

              </div>
            </div>
        </div>
    </div>

  </div>
     
</template>

<script>
import { onMounted,toRefs,  reactive } from "vue";
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
          isBreak:false

        });
        onMounted(() => {

        });

        // 获取assets静态资源
        const getAssetsFile = (url) => {
            return new URL(`/src/assets/images/moca/${url}`, import.meta.url).href
        }

        const rightClick = (data,val,bol)=>{
          //全部题目以及入参
          const allDataList = JSON.parse(setMocaData.mocaAllDataList)

          props.optionData.children[val].rightValue = bol
          props.optionData.children[val].wrongValue = false
          props.optionData.children[val].answers = props.optionData.children[val].rightKey

          allDataList[props.questionNum].children[val].rightValue = bol
          allDataList[props.questionNum].children[val].wrongValue = false
          allDataList[props.questionNum].children[val].isRight = 0
          allDataList[props.questionNum].children[val].answers = allDataList[props.questionNum].children[val].rightKey
          console.log(allDataList)
          setMocaData.getMocaAllDataList(JSON.stringify(allDataList))

          checkList( allDataList[props.questionNum].children)
          if (state.isBreak == false) {
            emit("changeData",true,'/')
          }
        }
        const wrongClick = (data,val,bol)=>{
          //全部题目以及入参
          const allDataList = JSON.parse(setMocaData.mocaAllDataList)

          props.optionData.children[val].wrongValue = bol
          props.optionData.children[val].rightValue = false
          
          allDataList[props.questionNum].children[val].wrongValue = bol
          allDataList[props.questionNum].children[val].rightValue = false
          allDataList[props.questionNum].children[val].isRight = 1
          allDataList[props.questionNum].children[val].answers = ""
          console.log(allDataList)
          setMocaData.getMocaAllDataList(JSON.stringify(allDataList))

          checkList( allDataList[props.questionNum].children)
          if (state.isBreak == false) {
            emit("changeData",true,'/')
          }
        }

        //输入框
        const inputText = (val,e)=>{
          //全部题目以及入参
          const allDataList = JSON.parse(setMocaData.mocaAllDataList)
          
          allDataList[props.questionNum].children[val].answers = e.currentTarget.value
          setMocaData.getMocaAllDataList(JSON.stringify(allDataList))
          console.log(allDataList)
          emit("changeData",true,'/')
        }


        //校验
        const checkList = (val) => {
          let arr = val.filter((item) => item.isRight ==='');
          if (arr.length > 0) {
            console.log('进来判断---------------')
            state.isBreak = true;
          } else {
            state.isBreak = false;
          }
        }



        // 开始播放语音
        const startVideoUrl = (url, cd = () => { }) => {
            // alert(url + '播放语音')
            // emit("changeData",'','str')
            let parentAudio = document.getElementById('titleAudio');
            parentAudio.pause()
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
                    cd()
                    // emit("changeData",'','/')
                },
                false
            );
        }


        return {
          ...toRefs(state),
            rightClick,
            wrongClick,
            inputText,
            getAssetsFile,
            startVideoUrl
        };
    },
};
</script>

<style lang="less" scoped>
.big{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75vh;
  margin: 0;

  .bigbox{
    width:80%;
    min-height: 80px;
    align-items: center;
    margin:auto;
    .big-line{
      display: flex;
      align-content: center;
      justify-content: space-between;
      margin:25px auto;
      .big-name{
        font-size: 38px;
        font-weight: bold;
        color: #5C7088;
        line-height: 53px;
        // text-decoration:underline;
      }
      .big-t{
        display: flex;
        .big-answer{
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
          img{
            width:50px;
            height: 50px;
          }
        }
        .big-input{
          width: 237px;
          height: 60px;
          background: #F5F4F4;
          border-radius: 12px;
          text-align: center;
          input{
            width: 156px;
            height: 35px;
            font-size: 20px;
            border:0px;
            margin-top: 15px;
            background: #F5F4F4;
            color: #222;
            line-height: 35px;
          }
        }
      }
    }
  }
  
}

</style>
