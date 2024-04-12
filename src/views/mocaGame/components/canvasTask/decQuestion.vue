<template>
     <div class="bigbox">
        <div class="int-box">
          <input type="text" :maxlength="3" oninput="value=value.replace(/[^\d]/g,'')"
            onafterpaste="value=value.replace(/\D/g,'')" @blur="intNum1"/>
        </div>
        <div class="int-box">
          <input type="text" :maxlength="3" oninput="value=value.replace(/[^\d]/g,'')"
            onafterpaste="value=value.replace(/\D/g,'')" @blur="intNum2"/>
        </div>
        <div class="int-box">
          <input type="text" :maxlength="3" oninput="value=value.replace(/[^\d]/g,'')"
            onafterpaste="value=value.replace(/\D/g,'')" @blur="intNum3"/>
        </div>
        <div class="int-box">
          <input type="text" :maxlength="3" oninput="value=value.replace(/[^\d]/g,'')"
            onafterpaste="value=value.replace(/\D/g,'')" @blur="intNum4"/>
        </div>
        <div class="int-box">
          <input type="text" :maxlength="3" oninput="value=value.replace(/[^\d]/g,'')"
            onafterpaste="value=value.replace(/\D/g,'')" @blur="intNum5"/>
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
          num1:'a',
          num2:'b',
          num3:'c',
          num4:'d',
          num5:'e',

        });
        onMounted(() => {
          
        });
        const intNum1 = (e)=>{
          //全部题目以及入参
          const allDataList = JSON.parse(setMocaData.mocaAllDataList)

          emit("changeData",true,'/')
          if(e.currentTarget.value==''){
            state.num1 = 'a'
          }else{
            state.num1 = e.currentTarget.value
          }
          allDataList[props.questionNum].children[0].answers = state.num1 +'|' + state.num2 +'|' + state.num3 +'|' + state.num4 +'|' + state.num5
          allDataList[props.questionNum].children[0].isRight = 0
          console.log(allDataList)
          setMocaData.getMocaAllDataList(JSON.stringify(allDataList))
        }
        const intNum2 = (e)=>{
          //全部题目以及入参
          const allDataList = JSON.parse(setMocaData.mocaAllDataList)

          emit("changeData",true,'/')
          if(e.currentTarget.value==''){
            state.num2 = 'b'
          }else{
            state.num2 = e.currentTarget.value
          }
          allDataList[props.questionNum].children[0].answers = state.num1 +'|' + state.num2 +'|' + state.num3 +'|' + state.num4 +'|' + state.num5
          allDataList[props.questionNum].children[0].isRight = 0
          setMocaData.getMocaAllDataList(JSON.stringify(allDataList))
        }
        const intNum3 = (e)=>{
          //全部题目以及入参
          const allDataList = JSON.parse(setMocaData.mocaAllDataList)

          emit("changeData",true,'/')
          if(e.currentTarget.value==''){
            state.num3 = 'c'
          }else{
            state.num3 = e.currentTarget.value
          }
          
          allDataList[props.questionNum].children[0].answers = state.num1 +'|' + state.num2 +'|' + state.num3 +'|' + state.num4 +'|' + state.num5
          allDataList[props.questionNum].children[0].isRight = 0
          setMocaData.getMocaAllDataList(JSON.stringify(allDataList))
        }
        const intNum4 = (e)=>{
          //全部题目以及入参
          const allDataList = JSON.parse(setMocaData.mocaAllDataList)

          emit("changeData",true,'/')
          if(e.currentTarget.value==''){
            state.num4 = 'd'
          }else{
            state.num4 = e.currentTarget.value
          }
          allDataList[props.questionNum].children[0].answers = state.num1 +'|' + state.num2 +'|' + state.num3 +'|' + state.num4 +'|' + state.num5
          allDataList[props.questionNum].children[0].isRight = 0
          setMocaData.getMocaAllDataList(JSON.stringify(allDataList))
        }
        const intNum5 = (e)=>{
          //全部题目以及入参
          const allDataList = JSON.parse(setMocaData.mocaAllDataList)
          
          emit("changeData",true,'/')
          if(e.currentTarget.value==''){
            state.num5 = 'e'
          }else{
            state.num5 = e.currentTarget.value
          }
          allDataList[props.questionNum].children[0].answers = state.num1 +'|' + state.num2 +'|' + state.num3 +'|' + state.num4 +'|' + state.num5
          allDataList[props.questionNum].children[0].isRight = 0
          setMocaData.getMocaAllDataList(JSON.stringify(allDataList))
        }

        return {
          ...toRefs(state),
            intNum1,
            intNum2,
            intNum3,
            intNum4,
            intNum5,
        };
    },
};
</script>

<style lang="less" scoped>
.bigbox{
    width:80%;
    height:200px;
    margin:15% auto;
    display: flex;
    align-content: center;
    justify-content: space-around;
    .int-box{
      width: 180px;
      height: 125px;
      background: #F1F1F1;
      border-radius: 22px;
      img{
        width:50px;
        height: 50px;
        margin:10px auto;
      }
      input{
        width: 180px;
        height: 125px;
        border:0;
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
