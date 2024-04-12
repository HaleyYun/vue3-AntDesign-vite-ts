<template>
    <div class="task-list">
      <div class="list-one" v-for="(item, index) in optionData.children[0].questionContentEntityResponseList" :key="index">
        <div class="num">{{item.content}}</div>
        <div :class="item.rightValue ==true?'active':'numbg'" @click="chooseActive(index)"></div>
      </div>
    </div>
</template>

<script>
import { onMounted,toRefs,  reactive } from "vue"
import { useState } from '@/stores/state'
const setMocaData = useState()
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
        

        const chooseActive = (val)=>{
          //全部题目以及入参
          const allDataList = JSON.parse(setMocaData.mocaAllDataList)

          props.optionData.children[0].questionContentEntityResponseList[val].rightValue = !props.optionData.children[0].questionContentEntityResponseList[val].rightValue
          allDataList[props.questionNum].children[0].questionContentEntityResponseList[val].rightValue = !allDataList[props.questionNum].children[0].questionContentEntityResponseList[val].rightValue

          let arr = allDataList[props.questionNum].children[0].questionContentEntityResponseList.filter((item) => item.rightValue == true)
          if(arr.length>=2){
            allDataList[props.questionNum].children[0].score = 0
            allDataList[props.questionNum].children[0].isRight = 1
          }else{
            allDataList[props.questionNum].children[0].score = 1
            allDataList[props.questionNum].children[0].isRight = 0
          }
          
          setMocaData.getMocaAllDataList(JSON.stringify(allDataList))
          console.log(allDataList)
          emit("changeData",true,'/')
        }
        return {
          ...toRefs(state),
            chooseActive,
        };
    },
};
</script>

<style lang="less" scoped>
 .task-list{
        width:90%;
        height: 90%;
        margin: 25px auto;
        display: flex;
        flex-wrap: wrap;
       .list-one{
          width:120px;
          height: 120px;
          text-align: center;
          .num{
            font-size: 35px;
            color:#222;
            font-weight: bold;
            line-height: 35px;
          }
          .numbg{
            width: 35px;
            height: 35px;
            border-radius: 50%;
            margin:20px auto;
            border: 2px solid #5861FF;
          }
          .active{
            width: 35px;
            height: 35px;
            border-radius: 50%;
            margin:20px auto;
            border: 2px solid #fd2222;
            background: #fd2222;
          }
        }
        .list-top{
          display: flex;
          align-content: center;
          justify-content: space-between;
          .list-title{
            width: 176px;
            height: 50px;
            background: #F5F7FF;
            border-radius: 8px;
            font-size: 22px;
            font-weight: bold;
            text-align: center;
            color: #000;
            line-height: 50px;
          }
        }
      }
</style>
