<template>
  <div class="page-view">
    <p v-if="swicth">加载中。。。</p>
    <iframe width="100%" height="100%" :src="viewUrl" frameborder="0" @load="swicth = false"></iframe>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

let swicth = ref<boolean>(true)


let ticketCode = ref<string>('');
let archivesNo = ref<string>('');
let estimateNum = ref<string>('');
let viewUrl = ref<string>('');// 'http://localhost:5173/reportRelast?archivesNo=DA20230708121535737447987&checked=true'

ticketCode.value = route.query.ticketCode as string;
archivesNo.value = route.query.archivesNo as string;
estimateNum.value = route.query.estimateNum as string;
viewUrl.value = import.meta.env.VITE_BASE_IFRAME_URL + '/mocareportPad?' + 'archivesNo=' + archivesNo.value + '&estimateNum=' + estimateNum.value + '&ticketCode=' + ticketCode.value;
console.log(viewUrl.value)
const messageEvent = (e: any) => {
  // 通过origin对消息进行过滤，避免遭到XSS攻击
  if (e.origin === import.meta.env.VITE_BASE_IFRAME_URL) {
    // alert(e.data +'ifrom入参1')
    console.log(e.origin, import.meta.env.VITE_BASE_IFRAME_URL) // 子页面所在的域
    console.log(e.data.code === 'out')  // 子页面发送的消息, hello, parent!
    if (e.data.code === 'out') {
      // alert(e.data.code +'ifrom入参')
      // alert(e.data.data +'code值')
      router.push({
        path:'/servicePack',
        query:{
          ticketCode:e.data.data
        }
      })
    } 
  }
}
window.addEventListener('message', messageEvent, false);

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
