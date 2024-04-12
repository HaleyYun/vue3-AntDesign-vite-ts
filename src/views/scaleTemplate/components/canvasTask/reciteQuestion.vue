<template>
  <div class="big">
    <div class="bigbox">
      <div class="big-line" v-for="(item, index) in list" :key="index">
        <div class="big-name">
          <!-- 语音后端有值放开就行 -->
          <img class="name-img" @click="startVideoUrl(item.questionVoice, item.contentIndex)" v-if="item.questionVoice" :src="palyNum == item.contentIndex && playOutBtn ? getAssetsFile('p4ActiveAsk.gif') : getAssetsFile('p4Ask.png')" />
          {{ item?.content }}
        </div>
        <div class="big-t">
          <div class="big-answer">
            <img :src="item.isRight == 0 ? getAssetsFile('overActive.png') : getAssetsFile('overGray.png')" @click="rightClick(index, true)" />
            <img :src="item.isRight == 1 ? getAssetsFile('clearActive.png') : getAssetsFile('clearGray.png')" @click="wrongClick(item, index, true)" />
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
import { message } from 'ant-design-vue';
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
    playOutBtn: {
      type: Boolean,
      required: true
    }
  },
  setup(props, { emit }) {
    const route = useRoute();
    const state = reactive({
      isBreak: false,
      palyNum: 0,
      list: [],
      cumulativeList: [],
      standbyOne: [],
      controlArr: [],
      count: 0,
      newArr: [],
      newStandbyOneArr: [],
      newCount: 0,
      indexRight: 0,
      rightKey: '',
      optionEcho: []
    });

    onMounted(() => {
      if (route.query?.status === 'modify') {
        state.newArr = props.optionData.children;
        state.newStandbyOneArr = props.optionData.standbyOne;
        let list = [...props.optionData.children, ...props.optionData.standbyOne];
        for (let i = 0; i < props.optionData.children.length; i++) {
          if (list[i].isRight === null) {
            // 没选
            // 不插入list
          } else if (list[i].isRight == 0) {
            // 选对
            // 不用插入选项  --  进入数组list
            state.list.push(list[i]);
          } else if (list[i].isRight == 1) {
            // 选错
            // 拿到下标，取数组2 ， 插入致list 下表的后一位
            // state.list.push(list[i]);
            state.list.push(list[i]);
            state.list.push(props.optionData.standbyOne[i]);
          }
        }

        props.optionData.children = state.list;

        state.newCount = state.list.filter(item => item.isRight == 1).length - 1;

        emit('changeNextStatus', true);
        return;
      } else {
        state.list = props.optionData.children;
      }
    });

    // 获取assets静态资源
    const getAssetsFile = url => {
      return new URL(`/src/assets/images/moca/${url}`, import.meta.url).href;
    };

    state.optionEcho = [];
    props.optionData.optionAnswer = [];
    //选对
    const rightClick = (i, val) => {
      if (route.query?.status === 'modify') {
        state.optionEcho[i] = val;
        if (echoState(i)) {
          message.error('此题目仅支持改变当前选中选项');
          return;
        }
        state.list[i].rightValue = val;
        state.list[i].wrongValue = !val;
        state.list[i].isRight = 0;
        state.list[i].answers = state.list[i].rightKey;
        //上一个被选中
        if (i > 0 && state.list[i - 1].isRight === 1) {
          if (state.list.length === i + 1) {
            //b数组
            let index = state.newStandbyOneArr.findIndex(item => item.content === state.list[i].content);
            let insertList = [];
            insertList = state.newArr.slice(index + 1);
            state.list.splice(i + 1, 0, ...insertList);
          }
        } else {
          let num = state.cumulativeList.findIndex(item => item.i == i);

          if (num != -1) {
            state.list = state.cumulativeList[num].historyData;
            state.cumulativeList.splice(num, 1);
          }
        }
        if (state.list.length == state.optionEcho.length) {
          emit('changeNextStatus', true);
        } else {
          emit('changeNextStatus', false);
        }
        props.optionData.children = state.list;
      } else {
        if (judgeState(i)) {
          message.error('此题目仅支持改变当前选中选项');
          return;
        }
        state.list[i].rightValue = val;
        state.list[i].wrongValue = !val;
        state.list[i].isRight = 0;
        state.list[i].answers = state.list[i].rightKey;
        let num = state.cumulativeList.findIndex(item => item.i == i);

        if (num != -1) {
          state.list = state.cumulativeList[num].historyData;
          state.cumulativeList.splice(num, 1);
        }
      }
      props.optionData.optionAnswer[i] = val;
      props.optionData.children = state.list;
      if (state.list.length == props.optionData.optionAnswer.length) {
        emit('changeNextStatus', true);
      } else {
        emit('changeNextStatus', false);
      }
    };
    //选错
    const wrongClick = (item, i, val) => {
      if (route.query?.status === 'modify') {
        state.optionEcho[i] = val;
        if (echoState(i)) {
          message.error('此题目仅支持改变当前选中选项');
          return;
        }
        let obj = {
          i,
          filterIndex: i,
          val,
          historyData: [...state.list]
        };
        //老数据选对的时候继续往下走A数组的数据
        state.cumulativeList.push(obj);
        state.list[i].rightValue = !val;
        state.list[i].wrongValue = val;
        state.list[i].answers = '';
        state.list[i].isRight = 1;
        props.optionData.answers = val;

        state.list.splice(i + 1, 0, props.optionData.standbyOne[item.sequenceDs]); //state.standbyOne为第二套数组

        state.list = [...new Set(state.list)];

        state.controlArr = state.cumulativeList.map(item => {
          return item.filterIndex;
        });

        let arr = [...new Set(state.controlArr)];

        if (i != 0 && state.list[i - 1].isRight == 1) {
          // 连续错两次清空后续的
          state.list.splice(i + 1, state.list.length - 1 - i);
          // emit('changeNextStatus', true);
        }
        if (state.list.length == state.optionEcho.length) {
          emit('changeNextStatus', true);
        } else {
          emit('changeNextStatus', false);
        }
        props.optionData.children = state.list;
      } else {
        if (judgeState(i)) {
          message.error('此题目仅支持改变当前选中选项');
          return;
        }
        let obj = {
          i,
          filterIndex: i,
          val,
          historyData: [...state.list]
        };
        //老数据选对的时候继续往下走A数组的数据
        state.cumulativeList.push(obj);
        state.list[i].rightValue = !val;
        state.list[i].wrongValue = val;
        state.list[i].answers = '';
        state.list[i].isRight = 1;
        props.optionData.answers = val;
        let index = props.optionData.children.findIndex(item => item.content === state.list[i].content);
        state.list.splice(i + 1, 0, props.optionData.standbyOne[item.sequenceDs]); //state.standbyOne为第二套数组
        if (i != 0 && state.list[i - 1].wrongValue) {
          // 连续错两次清空后续的;
          state.list.splice(i + 1, state.list.length - 1 - i);
          // changeNextStatus();
        }

        let list = state.list;
        state.list = [...new Set(list)];
      }
      props.optionData.optionAnswer[i] = val;
      props.optionData.children = state.list;

      if (state.list.length == props.optionData.optionAnswer.length) {
        emit('changeNextStatus', true);
      } else {
        emit('changeNextStatus', false);
      }
    };
    //继续选中 不能跨选
    const judgeState = index => {
      if (index == 0 && props.optionData.optionAnswer[index + 1] == undefined) return false;
      if (props.optionData.optionAnswer[index - 1] != undefined && props.optionData.optionAnswer[index + 1] == undefined) return false;
      return true;
    };
    //回显选中 不能跨选
    const echoState = index => {
      if (index === 0 && state.list[index + 1].isRight === null) return false; //
      if (index === state.list.length - 1 && state.list[index - 1].isRight !== null) return false;
      if (index != 0 && index != state.list.length - 1 && state.list[index - 1].isRight !== null && state.list[index + 1].isRight === null) return false;
      return true;
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

    const changeNextStatus = () => {
      props.optionData.children = state.list;
      let count = 0;
      for (let i = 0; i < props.optionData.children.length; i++) {
        if (props.optionData.children[i].rightValue || props.optionData.children[i].wrongValue) {
          count += 1;
        }
        // if (state.list[i].isRight) {
        //   count += 1;
        // }
      }
      if (count === props.optionData.children.length) {
        emit('changeNextStatus', true);
      }
    };

    function hasAdjacentNumbers(arr) {
      for (let i = 0; i < arr.length - 1; i++) {
        if (Math.abs(arr[i] - arr[i + 1]) === 1) {
          return true; // 如果存在相邻的数则返回true
        }
      }
      return false; // 若不存在相邻的数则返回false
    }

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
        align-items: center;
        flex: 1;
        // margin-right: 25px;
        font-size: 32px;
        font-weight: bold;
        color: #5c7088;
        line-height: 53px;
        // text-decoration:underline;
        .name-img {
          width: 42px;
          height: 42px;
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
