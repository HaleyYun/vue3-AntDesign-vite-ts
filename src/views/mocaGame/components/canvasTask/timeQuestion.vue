<template>
  <div class="timebox">
    <div class="time_list">
      <div class="dec" @click="decCount"><img src="@/assets/images/moca/dec.png" /></div>
      <div class="num">{{ count }}</div>
      <div class="dec" @click="addCount"><img src="@/assets/images/moca/add.png" /></div>
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
          timeCount:60,
          count: 0,
        });
        onMounted(() => {

          
        })
        const decCount = ()=>{
          //全部题目以及入参
          const allDataList = JSON.parse(setMocaData.mocaAllDataList)

          if(props.optionData.children[0].rightValue==true){
            if(state.count>0){
              state.count -=1
              allDataList[props.questionNum].children[0].answers = state.count
              allDataList[props.questionNum].children[0].isRight = 0
              setMocaData.getMocaAllDataList(JSON.stringify(allDataList))
            }
            if(state.count==0){
              state.count = 0
              return;
            }
          }
        }
        const addCount = ()=>{
          //全部题目以及入参
          const allDataList = JSON.parse(setMocaData.mocaAllDataList)
          
          if(props.optionData.children[0].rightValue==true){
            // emit("changeData",true,'/')
            state.count +=1 
            allDataList[props.questionNum].children[0].answers = state.count
            allDataList[props.questionNum].children[0].isRight = 1
            setMocaData.getMocaAllDataList(JSON.stringify(allDataList))
          } 
        }

        return {
          ...toRefs(state),
            decCount,
            addCount,
        };
    },
};
</script>

<style lang="less" scoped>
.timebox{
    width:100%;
    height:100%;
    padding:30px;
    .time_list{
      width:550px;
      height:180px;
      margin:155px auto;
      justify-content: space-between;
      display: flex;
      .num{
        text-align: center;
        font-size: 100px;
        font-weight: bold;
        color: #333;
        line-height: 140px;
      }
      .dec{
        width:200px;
        height:160px;
        img{
          width:200px;
          height:160px;
        }
      }
    }
  }
</style>
