<template>
  <div class="list-task">
    <div class="list-top">
      <div class="list-title">回忆（不可提示）</div>
      <div class="list-title">类别提示</div>
      <div class="list-title width500">选项提示</div>
      <div class="list-title">无法回答</div>
    </div>

    <div class="list-top top15" v-for="(item, index) in optionData.children" :key="index">
      <div class="list-one" v-for="(el, elIndex) in item.questionContentEntityResponseList" :key="elIndex">
        <div class="name">{{ el.content }}</div>
        <div :class="el.rightValue == true ? 'active' : 'numbg'" @click="chooseActive(index, el, elIndex)"></div>
      </div>
      <div class="list-one">
        <div class="big-input">
          <input placeholder="输入答案" :maxlength="10" @blur="inputText(index, $event)" />
        </div>
        <div :class="item.rightValue == true ? 'active' : 'numbg'" @click="chooseBig(index, item)"></div>
      </div>
    </div>

  </div>
</template>

<script>
import { onMounted, toRefs, reactive } from "vue";
import { useState } from '@/stores/state';
import { FormatBrush } from "@icon-park/vue-next";
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
    const chooseActive = (one, data, two) => {
      //全部题目以及入参
      const allDataList = JSON.parse(setMocaData.mocaAllDataList)

      props.optionData.children[one].questionContentEntityResponseList[two].rightValue = !props.optionData.children[one].questionContentEntityResponseList[two].rightValue
      allDataList[props.questionNum].children[one].questionContentEntityResponseList[two].rightValue = !allDataList[props.questionNum].children[one].questionContentEntityResponseList[two].rightValue
      props.optionData.children[one].rightValue = false

      if (two == 0) {
        allDataList[props.questionNum].children[one].score = 1
        if(props.optionData.children[one].questionContentEntityResponseList[two].rightValue==true){
          allDataList[props.questionNum].children[one].isRight = 0
        }else{
          allDataList[props.questionNum].children[one].isRight = ""
        }
        setMocaData.getMocaAllDataList(JSON.stringify(allDataList))
      } else {
        allDataList[props.questionNum].children[one].score = 0
        if(props.optionData.children[one].questionContentEntityResponseList[two].rightValue==true){
          allDataList[props.questionNum].children[one].isRight = 1
        }else{
          allDataList[props.questionNum].children[one].isRight = ""
        }
        setMocaData.getMocaAllDataList(JSON.stringify(allDataList))
      }
      console.log(data)
      if (props.optionData.children[one].questionContentEntityResponseList[two].rightValue == true) {
        let arr = props.optionData.children[one].questionContentEntityResponseList.filter((item) => item.rightValue == true)
        console.log(arr)
        if (arr.length > 1) {
          arr.forEach(el => {
            if (el.content === data.content) {
              el.rightValue = true
            } else {
              el.rightValue = false
            }
          })
          allDataList[props.questionNum].children[one].score = 0
          allDataList[props.questionNum].children[one].isRight = 1
          setMocaData.getMocaAllDataList(JSON.stringify(allDataList))
        }
      }else{
        allDataList[props.questionNum].children[one].isRight = ""
        setMocaData.getMocaAllDataList(JSON.stringify(allDataList))
      }

      checkList( allDataList[props.questionNum].children)
      if (state.isBreak == false) {
        emit("changeData",true,'/')
      }
    }
    const chooseBig = (val, data) => {
      //全部题目以及入参
      const allDataList = JSON.parse(setMocaData.mocaAllDataList)
      props.optionData.children[val].rightValue = !props.optionData.children[val].rightValue
      allDataList[props.questionNum].children[val].rightValue = !allDataList[props.questionNum].children[val].rightValue
      //页面显示操作
      props.optionData.children[val].questionContentEntityResponseList.forEach(el => {
        el.rightValue = false
      })
      //数据缓存操作
      allDataList[props.questionNum].children[val].questionContentEntityResponseList.forEach(el => {
        el.rightValue = false
      })
      if(props.optionData.children[val].rightValue==true){
        allDataList[props.questionNum].children[val].isRight = 2
      }else{
        allDataList[props.questionNum].children[val].isRight = ""
      }
      
      allDataList[props.questionNum].children[val].score = 0
      setMocaData.getMocaAllDataList(JSON.stringify(allDataList))

      checkList( allDataList[props.questionNum].children)
      if (state.isBreak == false) {
        emit("changeData",true,'/')
      }

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

    //输入框
    const inputText = (val, e) => {
      //全部题目以及入参
      const allDataList = JSON.parse(setMocaData.mocaAllDataList)
      
      emit("changeData", true, '/')
      allDataList[props.questionNum].children[val].answers = e.currentTarget.value
      allDataList[props.questionNum].children[val].isRight = 1
      setMocaData.getMocaAllDataList(JSON.stringify(allDataList))
    }

    return {
      ...toRefs(state),
      chooseActive,
      chooseBig,
      inputText,
    };
  },
};
</script>

<style lang="less" scoped>
.list-task {
  width: 90%;
  height: 90%;
  margin: 25px auto;

  .list-top {
    display: flex;
    align-content: center;
    justify-content: space-between;

    .list-title {
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

    .list-one {
      width: 176px;
      height: 80px;
      text-align: center;

      .name {
        width: 176px;
        height: 40px;
        font-size: 20px;
        color: #5C7088;
        line-height: 40px;
        font-weight: bold;
        text-align: center;
      }

      .text {
        font-size: 16px;
        color: #4F4F4F;
        line-height: 40px;
        text-align: center;
      }

      .numbg {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        margin: 8px auto;
        border: 2px solid #5861FF;
      }

      .active {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        margin: 8px auto;
        border: 2px solid #5766FE;
        background: #5766FE;
      }

      .big-input {
        width: 199px;
        height: 40px;
        background: #F3F3F3;
        border-radius: 6px;
        border: 1px solid #979797;

        input {
          width: 156px;
          height: 35px;
          font-size: 20px;
          border: 0px;
          border-radius: 5px;
          padding: 0px 5px;
          background: #F3F3F3;
          color: #222;
          line-height: 35px;
        }

        input:focus {
          outline: none;
        }
      }
    }

    .list-one:nth-child(1) {
      .name {
        width: 176px;
        height: 40px;
        font-size: 28px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 600;
        color: #5C7088;
        line-height: 40px;
      }
    }

    .list-one:nth-child(2) {
      .name {
        width: 176px;
        height: 40px;
        font-size: 18px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        color: #4F4F4F;
        line-height: 25px;
      }
    }
    .list-one:nth-child(3) {
      .name {
        width: 176px;
        height: 40px;
        font-size: 18px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        color: #4F4F4F;
        line-height: 25px;
      }
    }
    .list-one:nth-child(4) {
      .name {
        width: 176px;
        height: 40px;
        font-size: 18px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        color: #4F4F4F;
        line-height: 25px;
      }
    }
    .list-one:nth-child(5) {
      .name {
        width: 176px;
        height: 40px;
        font-size: 18px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        color: #4F4F4F;
        line-height: 25px;
      }
    }

    .width500 {
      width: 525px;
    }

    .diplay {
      display: flex;
      align-content: center;
      justify-content: space-around;
    }

  }

  .top15 {
    margin-top: 15px;
  }
}

:deep(.ant-radio-button-wrapper) {
  border-radius: 50%;
  margin: 8px auto;
  border: 2px solid #5861FF;
}

:deep(.ant-radio-button-wrapper:hover) {
  border-radius: 50%;
  margin: 8px auto;
  border: 2px solid #5766FE;
  background: #5766FE;
}
</style>
