<template>
  <div class="page-view">
    <p v-if="swicth">加载中。。。</p>
    <iframe width="100%" height="100%" :src="viewUrl" frameborder="0" @load="swicth = false"></iframe>
  </div>
</template>

<script lang="ts" setup>
import { ref, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useState } from '@/stores/state';

const route = useRoute()
const router = useRouter()
const state = useState();

let swicth = ref<boolean>(true)

let archivesNo = ref<string>('');
let checked = ref<string>('');
let viewUrl = ref<string>('');// 'http://localhost:5173/reportRelast?archivesNo=DA20230708121535737447987&checked=true'

archivesNo.value = route.query.archivesNo as string;
checked.value = route.query.checked as string;
viewUrl.value = import.meta.env.VITE_BASE_IFRAME_URL + (route.query.path ? String(route.query.path) : '/reportRelast?') + 'archivesNo=' + archivesNo.value + '&checked=' + checked.value + '&estimateNum=' + String(route.query.estimateNum);
const messageEvent = (e: any) => {
  window.removeEventListener('message', messageEvent)
  // 通过origin对消息进行过滤，避免遭到XSS攻击
  if (e.origin === import.meta.env.VITE_BASE_IFRAME_URL) {
    console.log(e.origin, import.meta.env.VITE_BASE_IFRAME_URL) // 子页面所在的域
    console.log(e.data.code === 'out')  // 子页面发送的消息, hello, parent!
    if (e.data.code === 'out') {
      router.push('/assessment/record');
    } else if (e.data.code === 'reassess') {
      again(JSON.parse(e.data.data))
    } else if (e.data.code === 'servicePack') {
      router.go(-2)
    }
  }
}
window.removeEventListener('message', messageEvent);
window.addEventListener('message', messageEvent, false);
const again = (obj: any) => {
  //缓存重新评估数据
  state.getQueryProData(obj);
  if (obj.status == 4) {
    if (obj.estimateServeCode === 'EDB-AD' && obj.type === 3) {
      //眼动
      router.push({
        path: '/xmCameraCenter',
        query: {
          estimateNum: obj.estimateNum,
          type: 3
        }
      });
    }
    if (obj.estimateServeCode === 'AD-8' && obj.type === 2 && obj.remark != '无法作答') {
      //AD8
      router.push('/scale');
    }
  }
};
onUnmounted(() => {
  window.removeEventListener('message', messageEvent)
})
</script>

<style lang="less" scoped>
.page-view {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  p {
    font-size: 40px;
    color: #999999;
    text-align: center;
    padding-top: 380px;
  }
}
</style>
