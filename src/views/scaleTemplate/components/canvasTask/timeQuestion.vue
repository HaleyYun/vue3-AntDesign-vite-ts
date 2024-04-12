<template>
  <div class="timebox">
    <div class="time_list">
      <div class="dec" @click="decCount"><img :src="optionData.minOutDisable &&count>0 ? getAssetsFile('decAcive.png') : getAssetsFile('dec.png')" /></div>
      <div class="num">{{ count }}</div>
      <div class="dec" @click="addCount"><img :src="optionData.minOutDisable ? getAssetsFile('add.png') : getAssetsFile('addGray.png')" /></div>
    </div>
  </div>
</template>

<script>
import { onMounted, toRefs, reactive } from "vue";
import { useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
export default {
  props: {
    optionData: {
      type: Object,
      required: true,
    },
    questionNum: {
      type: Number,
      required: true
    }
  },

  setup(props, { emit }) {
    const route = useRoute()
    const state = reactive({
      count: 0
    });
    onMounted(() => {
      state.count = Number(props.optionData.answers);
    })


    // 获取assets静态资源
    const getAssetsFile = (url) => {
      return new URL(`/src/assets/images/moca/${url}`, import.meta.url).href;
    };

    const decCount = () => {
      if (props.optionData.minOutDisable || route.query?.status === 'modify' || props.optionData.onceTimeStatus) {
        if (state.count > 0) {
          state.count -= 1
          props.optionData.answers = state.count
        }
        if (state.count == 0) {
          state.count = 0
          return;
        }
      } else {
        message.warning('请先开启倒计时')
      }
    }
    const addCount = () => {
      console.log(props.optionData)
      if (props.optionData.minOutDisable || route.query?.status === 'modify' || props.optionData.onceTimeStatus) {
        state.count += 1
        props.optionData.answers = state.count
      } else {
        message.warning('请先开启倒计时')
      }
    }

    return {
      ...toRefs(state),
      decCount,
      addCount,
      getAssetsFile
    };
  },
};
</script>

<style lang="less" scoped>
.timebox {
  width: 100%;
  height: 100%;
  padding: 30px;

  .time_list {
    width: 650px;
    height: 180px;
    margin: 155px auto;
    justify-content: space-between;
    display: flex;

    .num {
      text-align: center;
      font-size: 100px;
      font-weight: bold;
      color: #333;
      line-height: 140px;
    }

    .dec {
      width: 200px;
      height: 160px;

      img {
        width: 200px;
        height: 160px;
      }
    }
  }
}
</style>
