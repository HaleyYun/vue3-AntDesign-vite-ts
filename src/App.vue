<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { onMounted } from 'vue';
dayjs.locale('zh-cn');
window["processVoice"] = () => {
  console.log("123");
};
window["endListenVoiveOne"] = () => {
  console.log("345");
};
window["endUploadphoto"] = () => {
  console.log("345");
};
const endUploadVideo=(val:string) => {
  if (val === 'upload_ok'){
    // alert('upload_ok成功')
  } else {
    // alert('网络错误，请重试...')
  }
};
window.endUploadVideo = endUploadVideo

const initVoice = () => {
  // 初始化语音，返回文字匹配监听，语音播放结束监听
  connectWebViewJavascriptBridge(function (bridge: any) {
    bridge.init(function (message: any, responseCallback: any) {
      let data = {
        "Javascript Responds": "Wee!",
      };
      console.log(message);
      responseCallback(data);
    });
    bridge.registerHandler(
      "uploadCompleted",
      function (data: string, responseCallback: any) {
        // 监听视频是否上传成功 return upload_ok upload_err
        let win: any = window
        responseCallback(
          win.endUploadVideo ? win.endUploadVideo(data) : "true"
        );
      }
    );
    bridge.registerHandler(
      "uploadCompletedFile",
      function (data: string, responseCallback: any) {
        // alert('监听回调')
        // alert(data+'data值')
        // alert(responseCallback+'回调方法')
        // 监听拍照上传是否上传成功 return upload_ok upload_err
        responseCallback(window.endUploadphoto ? window.endUploadphoto(data) : "true");
      }
    );
  });
};
// 交互监听
const connectWebViewJavascriptBridge = (callback?: any) => {
  // 初始化内容
  if (window.WebViewJavascriptBridge) {
    callback(window.WebViewJavascriptBridge);
  } else {
    try {
      document.addEventListener(
        "WebViewJavascriptBridgeReady",
        function () {
          callback(window.WebViewJavascriptBridge);
        },
        false
      );
    } catch {
      console.log("333");
    }
  }
}
connectWebViewJavascriptBridge();
onMounted(() => {
  initVoice()
})

</script>

<template>
  <a-config-provider :locale="zhCN">
    <router-view /></a-config-provider>
</template>

<style lang="less">
@import "ant-design-vue/dist/antd.css";
* {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
</style>
