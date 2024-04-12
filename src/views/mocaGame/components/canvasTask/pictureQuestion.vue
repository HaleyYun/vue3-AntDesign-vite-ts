<template>
    <div class="ask-bg"><img :src="optionData.imgPathList[0]"></div>
    <div class="ask-input">
        <input placeholder="输入答案" type="text"
         :value="optionData.children[0].rightValue==true?optionData.children[0].answers:(optionData.children[0].answers!=''?optionData.children[0].answers:'')" 
         :maxlength="300" @blur="inputText" />
         

        <div class="big-answer">
            <img :src="optionData.children[0].rightValue==true?getAssetsFile('overActive.png'):getAssetsFile('overGray.png')" @click="rightClick(true)">
            <img :src="optionData.children[0].wrongValue==true?getAssetsFile('clearActive.png'):getAssetsFile('clearGray.png')" @click="wrongClick(true)">
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
        });
        onMounted(() => {
            
        });
        // 获取assets静态资源
        const getAssetsFile = (url) => {
            return new URL(`/src/assets/images/moca/${url}`, import.meta.url).href
        }
        

        const rightClick = (bol)=>{
          //全部题目以及入参
          const allDataList = JSON.parse(setMocaData.mocaAllDataList)

          props.optionData.children[0].rightValue = bol
          props.optionData.children[0].wrongValue = false
          allDataList[props.questionNum].children[0].rightValue = bol
          allDataList[props.questionNum].children[0].wrongValue = false
          allDataList[props.questionNum].children[0].isRight = 0
         
          if(allDataList[props.questionNum].id==5){
            props.optionData.children[0].answers = '狮子'
            allDataList[props.questionNum].children[0].answers = '狮子'
          }
          if(allDataList[props.questionNum].id==6){
            props.optionData.children[0].answers = '犀牛'
            allDataList[props.questionNum].children[0].answers = '犀牛'
          }
          if(allDataList[props.questionNum].id==7){
            props.optionData.children[0].answers = '骆驼'
            allDataList[props.questionNum].children[0].answers = '骆驼'
          }
          setMocaData.getMocaAllDataList(JSON.stringify(allDataList))
          console.log(allDataList)
          emit("changeData",true,'/')
        }
        const wrongClick = (bol)=>{
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
        const inputText = (e)=>{
          //全部题目以及入参
          const allDataList = JSON.parse(setMocaData.mocaAllDataList)
          
          allDataList[props.questionNum].children[0].answers = e.currentTarget.value
          setMocaData.getMocaAllDataList(JSON.stringify(allDataList))
          console.log(allDataList)
        }

        return {
          ...toRefs(state),
          rightClick,
          wrongClick,
          inputText,
          getAssetsFile
        };
    },
};
</script>

<style lang="less" scoped>
 .ask-bg{
          width:670px;
          height:350px;
          margin:20px auto;
          img{
            width:670px;
            height:350px;
          }
        }
        .ask-input{
          width:65%;
          height:80px;
          float: right;
          display: flex;
          input{
            width: 445px;
            height: 58px;
            text-align: center;
            border-radius: 8px;
            border: 4px solid #DADADA;
            font-size: 26px;
            font-weight: bold;
            color: #333;
          }
          .big-answer{
            width: 186px;
            height: 60px;
            padding:0px 5px;
            margin-left: 50px;
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
        }
</style>
