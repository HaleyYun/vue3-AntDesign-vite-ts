<template>
  <div class="neuropsychiatric-c">
    <h3 v-html="optionData.content" :style="{ fontSize: optionData.content.length > 100 ? '22px' : '' }"></h3>

       
    <div class="options-item">
      <div class="item-select">
        <div class="title-bg"><div class="title">若选择"是",则需要对严重程度和知情者压力打分</div></div>
        <div v-for="(optionItem, optionIndex) in radioArr" :key="optionIndex">
          <div class="radio" :class="[optionItem.isRight ? 'activeRadio' : '']" @click="selectAnswer(optionItem, optionIndex)">
            <div :class="[optionItem.isRight ? 'activeRadio-select' : 'radio-select']">
              <!-- {{ optionData.option }} -->
              {{ optionItem.content }}
              <!-- {{ optionItem.option }} -->
            </div>
          </div>
          <!-- content -->
        </div>
      </div>

      <div class="item-status">
        <a-button :disabled="isSelect" class="status-degree" :class="[selectionDegree ? 'active-degree' : '']">
          <div class="stress-style" :class="[selectionDegree ? 'active-style' : '']">严重程度</div>
          <div @click="selectDegree(optionItem, optionIndex)" v-for="(optionItem, optionIndex) in degreeArr" :key="optionIndex">
            <div class="degree" :class="[optionItem.isRight ? 'activeDegree' : '']">
              <div class="desc">{{ optionItem.desc }}</div>
              <div class="content">{{ optionItem.content.slice(6) }}</div>
            </div>
          </div>
        </a-button>
        <a-button :disabled="isStress" class="status-stress" :class="[selectionPressure ? 'active-status' : '']">
          <div class="stress-style" :class="[selectionPressure ? 'status-style' : '']">知情者压力</div>
          <div v-for="(optionItem, optionIndex) in stressArr" :key="optionIndex" @click="selectStress(optionItem, optionIndex)">
            <div class="stress" :class="[optionItem.isRight ? 'activeStress' : '']">
              <div class="content">{{ optionItem.content }}</div>
            </div>
          </div>
        </a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { GetQuestionListResDataChildren } from '@/apis/scaleTemplate/type';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const props = defineProps({
  optionData: {
    type: Object,
    required: true
  },
  questionNum: {
    type: Number,
    required: true
  },
  questionLangth: {
    type: Number,
    required: true
  }
});
onMounted(() => {
  getRadio();
  getDegree();
  getStress();
});

const radioArr = ref<any>([]);
const degreeArr = ref<any>([]);
const stressArr = ref<any>([]);
const isSelect = ref<boolean>(true); //是否能点击程度
const isStress = ref<boolean>(true); //是否能点击压力
const selectionDegree = ref<boolean>(false); //选中程度
const selectionPressure = ref<boolean>(false); //选中压力
// const radioSelectArr = ref<any>([1, 2]);
// 修改页面跳回
if (route.query?.status === 'modify') {
  console.log('ppp');

  for (let i = 0; i < props.optionData.children.length; i++) {
    props.optionData.answers = props.optionData.children[i].content;
    if (props.optionData.children[1].isRight === 1) {
      isSelect.value = true; //可以点击
      selectionDegree.value = false;
      isStress.value = true;
      selectionPressure.value = false;
    }
    if (props.optionData.children[0].isRight === 1) {
      isSelect.value = false; //可以点击
      selectionDegree.value = true;
      isStress.value = false;
      selectionPressure.value = true;
    }
  }
}
const getRadio = () => {
  radioArr.value = props.optionData.children
    .filter((item: any) => item.classification == 'select')
    .map((item: any) => {
      return item;
    });
};
//程度
const getDegree = () => {
  degreeArr.value = props.optionData.children
    .filter((item: any) => item.classification == 'severity')
    .map((item: any) => {
      return item;
    });
};
//压力
const getStress = () => {
  stressArr.value = props.optionData.children
    .filter((item: any) => item.classification == 'stress')
    .map((item: any) => {
      return item;
    });
};
const emit = defineEmits(['nextTopic', 'changeNextStatus']);

const selectAnswer = (item: GetQuestionListResDataChildren, index: number) => {
  // props.optionData.children[index].option = item.option;
  console.log(index, 'index');
  console.log(item.option, 'item.option');
  console.log(props.optionData.questionIndex, 'optionData.content.length');
  //点击否直接跳转choice
  if (item.option == 'B') {
    console.log(index, 'index');
    console.log(item.option, 'item.option');
    props.optionData.children[1].isRight = 1;
    props.optionData.children[0].isRight = 0;
    if (route.query?.status === 'modify') {
      isSelect.value = true; //可以点击
      selectionDegree.value = false;
      isStress.value = true;
      selectionPressure.value = false;
      for (let i = 0; i < props.optionData.children.length; i++) {
        props.optionData.children[i].isRight = 0;
      }
      props.optionData.children[1].isRight = 1;
      props.optionData.answers = item.content;
    } else {
      props.optionData.answers = item.content;
      if (props.optionData.questionIndex != 12) {
        emit('nextTopic');
      }
      isSelect.value = true; //可以点击
      selectionDegree.value = false;
      isStress.value = true;
      selectionPressure.value = false;
      props.optionData.children[index + 1].isRight = 0;
      props.optionData.children[index + 2].isRight = 0;
      props.optionData.children[index + 3].isRight = 0;
      props.optionData.children[index + 4].isRight = 0;
      props.optionData.children[index + 5].isRight = 0;
      props.optionData.children[index + 6].isRight = 0;
      props.optionData.children[index + 7].isRight = 0;
      props.optionData.children[index + 8].isRight = 0;
      props.optionData.children[index + 9].isRight = 0;
      // props.optionData.children[index + 10].isRight = 0;
    }
  }

  if (item.option == 'A') {
    // if (route.query?.status === 'modify') {
    //   console.log('000');

    //   isSelect.value = true; //可以点击
    //   selectionDegree.value = false;
    //   isStress.value = true;
    //   selectionPressure.value = false;
    //   for (let i = 0; i < props.optionData.children.length; i++) {
    //     props.optionData.children[i].isRight = 0;
    //   }
    //   props.optionData.children[1].isRight = 1;
    //   // props.optionData.answers = item.content;
    // } else {
    // }
    console.log(index, 'index');
    console.log(item.option, 'item.option');
    props.optionData.children[0].isRight = 1;
    props.optionData.children[1].isRight = 0;
    isSelect.value = false; //可以点击
    selectionDegree.value = true;
    props.optionData.answers = '';
  }
};
//程度
const selectDegree = (item: GetQuestionListResDataChildren, index: number) => {
  props.optionData.answers = item.content;
  console.log(item.option, 'item.option');
  console.log(index, 'index');
  if (item.option == 'C') {
    props.optionData.children[index + 2].isRight = 1;
    props.optionData.children[index + 3].isRight = 0;
    props.optionData.children[index + 4].isRight = 0;
  } else if (item.option == 'D') {
    props.optionData.children[index + 1].isRight = 0;
    props.optionData.children[index + 2].isRight = 1;
    props.optionData.children[index + 3].isRight = 0;
  } else if (item.option == 'E') {
    // 2  4
    props.optionData.children[index + 2].isRight = 1;
    props.optionData.children[index + 1].isRight = 0;
    props.optionData.children[index].isRight = 0;
  }

  if (item.classification == 'severity') {
    isStress.value = false;
    selectionPressure.value = true;
  }
};
//压力
const selectStress = (item: GetQuestionListResDataChildren, index: number) => {
  console.log(item.option, 'item.option');
  console.log(index, 'index');
  props.optionData.answers = item.content;
  if (item.option == 'F') {
    // 5  0 ABCDEFGHIJK
    props.optionData.children[index + 5].isRight = 1;
    props.optionData.children[index + 6].isRight = 0;
    props.optionData.children[index + 7].isRight = 0;
    props.optionData.children[index + 8].isRight = 0;
    props.optionData.children[index + 9].isRight = 0;
    props.optionData.children[index + 10].isRight = 0;
  } else if (item.option == 'G') {
    // 6  1 ABCDEFGHIJK
    props.optionData.children[index + 5].isRight = 1; //1
    props.optionData.children[index + 4].isRight = 0; //1
    props.optionData.children[index + 6].isRight = 0;
    props.optionData.children[index + 7].isRight = 0;
    props.optionData.children[index + 8].isRight = 0;
    props.optionData.children[index + 9].isRight = 0;
  } else if (item.option == 'H') {
    //2 //7
    props.optionData.children[index + 5].isRight = 1;
    props.optionData.children[index + 4].isRight = 0;
    props.optionData.children[index + 3].isRight = 0;
    props.optionData.children[index + 6].isRight = 0;
    props.optionData.children[index + 7].isRight = 0;
    props.optionData.children[index + 8].isRight = 0;
  } else if (item.option == 'I') {
    //3 // 8
    props.optionData.children[index + 5].isRight = 1;
    props.optionData.children[index + 4].isRight = 0;
    props.optionData.children[index + 3].isRight = 0;
    props.optionData.children[index + 2].isRight = 0;
    props.optionData.children[index + 6].isRight = 0;
    props.optionData.children[index + 7].isRight = 0;
  } else if (item.option == 'J') {
    //4 //9
    props.optionData.children[index + 5].isRight = 1;
    props.optionData.children[index + 4].isRight = 0;
    props.optionData.children[index + 3].isRight = 0;
    props.optionData.children[index + 2].isRight = 0;
    props.optionData.children[index + 1].isRight = 0;
    props.optionData.children[index + 6].isRight = 0;
  } else if (item.option == 'K') {
    //5 //10
    props.optionData.children[index + 5].isRight = 1;
    props.optionData.children[index + 4].isRight = 0;
    props.optionData.children[index + 3].isRight = 0;
    props.optionData.children[index + 2].isRight = 0;
    props.optionData.children[index + 1].isRight = 0;
    props.optionData.children[index].isRight = 0;
  }
};
</script>

<style lang="less">
.neuropsychiatric-c {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.12);
  border-radius: 14px;
  display: flex;
  flex-direction: column;

  h3 {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 150px;
    font-size: 27px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #222222;
    line-height: 39px;
    padding: 0 37px;
    margin-bottom: 0;
    text-align: center;
  }

  .options-item {
    display: flex;
    justify-content: space-between;
    overflow-y: auto;
    margin: 30px;
    margin-top: 0;
    box-sizing: border-box;
    .item-select {
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
      margin-right: 26px;
      .title-bg {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 328px;
        height: 127px;
        background: #f6f6f6;
        border-radius: 16px;
        .title {
          width: 278px;
          height: 66px;
          font-size: 24px;
          font-family: PingFang-SC, PingFang-SC;
          font-weight: bold;
          color: #333333;
          line-height: 33px;
        }
      }
      .radio {
        margin-top: 33px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 119px;
        height: 119px;

        background: #f2f2f2;

        border-radius: 50%;

        .radio-select {
          width: 50px;
          height: 66px;
          font-size: 50px;
          font-family: MiSans, MiSans;
          font-weight: bold;
          //   color: #f2f2f2;
          color: #4e4e4e;
          line-height: 66px;
        }
      }
      .activeRadio {
        background: #5765fe;
        .activeRadio-select {
          color: #f2f2f2;
          width: 50px;
          height: 66px;
          font-size: 50px;
          font-family: MiSans, MiSans;
          font-weight: bold;
          line-height: 66px;
        }
      }
    }
    .item-status {
      display: flex;
      flex: 3;
      flex-direction: column;
      .status-degree {
        padding-top: 45px;
        position: relative;
        display: flex;
        justify-content: space-around;
        align-items: flex-end;
        width: 780px;
        height: 167px;
        background: #ffffff;
        border-radius: 16px;
        border: 2px solid rgba(192, 186, 186, 0.44);
        margin-bottom: 16px;
        .stress-style {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          font-size: 18px;
          font-family: PingFang-SC, PingFang-SC;
          font-weight: bold;
          color: #ffffff;
          top: -2px;
          left: -3px;
          width: 160px;
          height: 40px;
          //   background: #ff8f45;
          background: #b1b1b1;
          border-radius: 16px 0px 16px 0px;
        }
        .degree {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 225px;
          height: 90px;
          background: #f6f6f6;
          border-radius: 16px;
          margin-bottom: 10px;
          .desc {
            font-size: 20px;
            font-family: SourceHanSansCN, SourceHanSansCN;
            font-weight: bold;
            color: #535353;
            line-height: 39px;
          }

          .content {
            font-size: 18px;
            font-family: PingFangSC, PingFang SC;
            font-weight: 500;
            color: #535353;
            line-height: 30px;
          }
        }
        .activeDegree {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 225px;
          height: 90px;
          background: #5765fe;
          border-radius: 16px;
          margin-bottom: 10px;
          .desc {
            font-size: 20px;
            font-family: SourceHanSansCN, SourceHanSansCN;
            font-weight: bold;
            color: #ffffff;
            line-height: 39px;
          }

          .content {
            font-size: 18px;
            font-family: PingFangSC, PingFang SC;
            font-weight: 500;
            color: #ffffff;
            line-height: 30px;
          }
        }
      }
      .active-degree {
        padding-top: 45px;
        position: relative;
        display: flex;
        justify-content: space-around;
        align-items: flex-end;
        width: 780px;
        height: 167px;
        background: #ffffff;
        border-radius: 16px;
        border: 3px solid #ff8f45;
        margin-bottom: 16px;
        .active-style {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          font-size: 18px;
          font-family: PingFang-SC, PingFang-SC;
          font-weight: bold;
          color: #ffffff;
          top: 0;
          left: -2px;
          width: 160px;
          height: 40px;
          background: #ff8f45;

          border-radius: 16px 0px 16px 0px;
        }
      }
      .status-stress {
        position: relative;
        padding-top: 45px;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        align-items: flex-end;
        width: 780px;
        height: 307px;
        background: #ffffff;
        border-radius: 16px;
        // border: 3px solid #f64040;
        border: 2px solid rgba(192, 186, 186, 0.44);
        .stress-style {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 18px;
          font-family: PingFang-SC, PingFang-SC;
          font-weight: bold;
          color: #ffffff;
          line-height: 32px;
          position: absolute;
          top: -2px;
          left: -2px;
          width: 160px;
          height: 40px;
          //   background: #f64040;
          background: #b1b1b1;
          border-radius: 16px 0px 16px 0px;
        }
        .stress {
          display: flex;
          flex-direction: column;
          // align-items: center;
          text-align: left;
          padding-left: 15px;
          justify-content: center;
          width: 347px;
          height: 55px;
          background: #f6f6f6;
          border-radius: 9px;
          margin-bottom: 10px;
          .content {
            font-size: 18px;
            font-family: PingFangSC, PingFang SC;
            font-weight: 500;
            color: #535353;
            // line-height: 30px;
          }
        }
        .activeStress {
          display: flex;
          flex-direction: column;
          // align-items: center;
          text-align: left;
          padding-left: 15px;
          justify-content: center;
          width: 347px;
          height: 55px;
          background: #5765fe;
          border-radius: 9px;
          margin-bottom: 10px;
          .content {
            font-size: 18px;
            font-family: PingFangSC, PingFang SC;
            font-weight: 500;
            color: #fff;
            // line-height: 30px;
          }
        }
      }
      .active-status {
        position: relative;
        padding-top: 45px;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        align-items: flex-end;
        width: 780px;
        height: 307px;
        background: #ffffff;
        border-radius: 16px;
        border: 3px solid #f64040;
        .status-style {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 18px;
          font-family: PingFang-SC, PingFang-SC;
          font-weight: bold;
          color: #ffffff;
          line-height: 32px;
          position: absolute;
          top: 0;
          left: -2px;
          width: 160px;
          height: 40px;
          background: #f64040;
          border-radius: 16px 0px 16px 0px;
        }
      }
    }
  }
}
</style>
