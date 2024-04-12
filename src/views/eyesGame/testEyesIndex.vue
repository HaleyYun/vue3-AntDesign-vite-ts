<template>
    <div class="test-eye-index">
        <h1>让我们开始练习吧</h1>
        <img @click="router.push('/xmTestEyesJump')" src="../../static/images/eyesGame/nextbtn.png" alt="">
    </div>
</template>
<script lang="ts">
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
      const router = useRouter()
      const setAttr = reactive({})

      return {
          router,
          ...toRefs(setAttr)
      }
  }
}
</script>
<style lang="less" scoped>
    .test-eye-index {
        width: 100vw;
        height: 100vh;
        background: #FCF8E6;
        text-align: center;
        overflow: hidden;

        img {
            width: 240px;
            height: 240px;
        }
    }
    h1 {
        color: #614a2b;
        font-size: 120px;
        margin: 160px 0 120px 0;
    }
</style>