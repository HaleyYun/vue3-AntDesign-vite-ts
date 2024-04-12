<template>
    <div class="test-suc-err">
        <h1>哎呀！失误了</h1>
        <h1 class="bt-font">让我们再来一次</h1>
        <img @click="router.push('/xmTestEyesIndex')" class="ks-btn" src="../../static/images/eyesGame/start_btn.png" alt="">
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
    },
    methods: {
    }
}
</script>
<style lang="less" scoped>
.test-suc-err {
    width: 100vw;
    height: 100vh;
    background: #fcf8e6;
    text-align: center;
    overflow: hidden;

    h1 {
        color: #614a2b;
        font-size: 120px;
        margin: 140px 0 0px 0;
    }

    .bt-font {
        margin: 0;
    }

    .ks-btn {
        width: 180px;
        height: 180px;
        margin: 50px auto 0;
    }
}
</style>