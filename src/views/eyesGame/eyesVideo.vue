<template>
  <div class="all-box" ref="boxAttr">
    <video class="video-box" width="100%" id="video" height="100%" controls autoplay="true">
      <source :src="videoUrl" type="video/mp4" />
    </video>
  </div>
</template>
<script lang="ts">
import { onMounted, ref, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useEyesGameStore } from '../../stores/eyes_game'
export default {
  setup() {
    const store = useEyesGameStore()
    const router = useRouter();
    const setAttr = reactive({
      videoUrl: "#"
    });
    const boxAttr = ref(null);
    setAttr.videoUrl = store.currentProcedure.steps[0].elements[0].content;
    onMounted(() => {
      // 播放结束跳转页面
      let elevideo: HTMLVideoElement | null = document.getElementById("video") as HTMLVideoElement;
      elevideo.play();
      elevideo.addEventListener(
        "ended",
        function () {
          store.eyeProcedureActive += 1;
          router.push('/xmTestEyesIndex')
        },
        false
      );
    });

    return {
      router,
      boxAttr,
      ...toRefs(setAttr),
    };
  },
};
</script>
<style lang="less" scoped>
.all-box {
  width: 100%;
  height: 100%;
  background: #fcf8e6;
  overflow: hidden;
}

.video-box {
  width: 100%;
  height: 100%;
}
</style>
