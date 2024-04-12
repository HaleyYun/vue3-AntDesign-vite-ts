<template>
  <div class="list-task">
    <div class="list-top">
      <div class="list-title">回忆(不可提示)</div>
      <div class="list-title">类别提示</div>
      <div class="list-title width500">选项提示</div>
      <div class="list-title">无法回答</div>
    </div>
    <div class="list-content">
      <div class="list-top top15" v-for="(item, index) in optionData.children" :key="index">
        <div class="list-one" :class="elIndex === 1 ? 'ml-15' : ''"
          v-for="(el, elIndex) in item.questionContentEntityResponseList" :key="elIndex">
          <div class="name">{{ el.content }}</div>
          <div :class="el.option == item.option ? 'active' : 'numbg'" @click="chooseActive(index, el.option)"></div>
        </div>
        <div class="list-one">
          <div class="big-input">
            <input placeholder="输入答案:__" :maxlength="300" v-model="item.answers" enterkeyhint="done" />
          </div>
          <div :class="item.option === 'F' ? 'active' : 'numbg'" @click="chooseActive(index, 'F')"></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { toRefs, reactive, onMounted } from "vue"
import { useRoute } from 'vue-router';

export default {
  props: {
    optionData: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const route = useRoute()
    const state = reactive({})
    onMounted(() => {
      if (route.query?.status !== 'modify') return
      for (let i = 0; i < props.optionData.children.length; i++) {
        chooseActive(i, props.optionData.children[i].option)
      }
    })
    const chooseActive = (i, option) => {
      props.optionData.children[i].option = option;
      changeNextStatus()
    }
    const changeNextStatus = () => {
      let count = 0
      for (let i = 0; i < props.optionData.children.length; i++) {
        if (props.optionData.children[i].option) {
          count += 1
        }
      }
      if (count === props.optionData.children.length) {
        emit('changeNextStatus', true);
      }
    }

    return {
      ...toRefs(state),
      chooseActive
    };
  },
};
</script>

<style lang="less" scoped>
.ml-15 {
  margin-left: 15px;
}

.list-task {
  width: 100%;
  height: 100%;
  padding: 20px 36px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .list-content {
    flex: 1;
    overflow-y: auto;
  }

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
      height: 70px;
      text-align: center;

      .name {
        width: 176px;
        font-size: 20px;
        color: #5C7088;
        line-height: 70px;
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
        width: 176px;
        height: 40px;
        background: #f3f3f3;
        border-radius: 6px;
        border: 1px solid #dedede;

        input {
          width: 156px;
          height: 35px;
          font-size: 20px;
          border: 0px;
          border-radius: 5px;
          padding: 0px 5px;
          background: #f3f3f3;
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
        line-height: 40px;
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
        line-height: 40px;
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
        line-height: 40px;
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
        line-height: 40px;
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
    margin: 14px 0;
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
