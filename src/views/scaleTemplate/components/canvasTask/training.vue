<template>
  <div class="train-box">
    <div class="train">练习</div>
    <div class="train-text">
      <!-- <img style="" v-if="optionData.voicePath"@click="playAudio(optionData.voicePath)"
        :src="playBtn ? getAssetsFile('p4ActiveAsk.gif') : getAssetsFile('p4Ask.png')" /> -->
      {{ optionData.classificationContent }}
    </div>
  </div>
</template>

<script>
import { onMounted, toRefs, reactive } from 'vue';
import { useState } from '@/stores/state';
const setMocaData = useState();
export default {
  props: {
    optionData: {
      type: Object,
      required: true
    },
    playBtn: {
      type: Boolean,
      required: true
    }
  },

  setup(props, { emit }) {
    const state = reactive({});

    onMounted(() => {});

    // const playAudio = url => {
    //   emit('playAudio', url, true);
    // };
    const getAssetsFile = url => {
      return new URL(`/src/assets/images/moca/${url}`, import.meta.url).href;
    };
    return {
      ...toRefs(state),
      // playAudio,
      getAssetsFile
    };
  }
};
</script>

<style lang="less" scoped>
.train-box {
  padding: 30px;
  height: 100%;

  .train {
    width: 300px;
    height: 60px;
    font-size: 60px;
    font-weight: 800;
    color: #5c7088;
    line-height: 90px;
    letter-spacing: 1px;
  }

  .train-text {
    width: 80%;
    height: 100px;
    margin: 10% auto;
    text-align: center;
    font-size: 45px;
    font-weight: bold;
    color: #5c7088;
    line-height: 81px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 42px;
      height: 42px;
      margin-right: 10px;
    }
  }
}
</style>
