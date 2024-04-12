//进行axios二次封装:使用请求与响应拦截器
import axios from 'axios'
import router from '@/router';
import { message, Modal } from 'ant-design-vue';
import { useUserStore } from '@/stores/user'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { createVNode } from 'vue';
import { useState } from '../stores/state'

let baseURL = import.meta.env.VITE_BASE_API + '/zskj/app'

const httpInstance = axios.create({
  baseURL: baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  },
})
httpInstance.interceptors.request.use((config) => {
  const userStore = useUserStore()
  const token = userStore.userInfor?.token
  if (token) {
    config.headers.token = token
  } else {
    router.replace("/")
  }
  return config
}, err => {
  return Promise.reject(err)
});


//第三步:响应拦截器
httpInstance.interceptors.response.use(res => {
  const userStore = useUserStore();
  if (res.data.code == 406) {
    userStore.emptyUserInfor()
    router.replace("/login")
  }
  if (res.config.url == "/couponApp/couponApply") {
    return res.data
  }
  if (res.data.code !== 200 && res.data.code !== 1201 && res.data.code !== 1202) {
    message.error({ content: res.data.msg, duration: 5 });
  }

  if (res.status == 200) {
    return res.data
  }
  return res.data
}, async (error) => {
  let whiteList = [
    "/estimateScale/addQuestionResult",
    "/estimate/getEstimateNum",
    "/estimateScale/questionFind",
    "/estimate/confirmTask",
    "/estimate/getTemplet",
    "/estimate/getVideoInfoForAlgorithm",
    "/estimate/uploadVideoUrl",
  ]
  if (whiteList.includes(error.config.url)) {
    const state = useState()
    return new Promise((resolve) => {
      Modal.confirm({
        title: '提示',
        icon: createVNode(ExclamationCircleOutlined),
        content: '请检查网络后重试',
        okText: '重试',
        cancelText: '取消',
        closable: false,
        zIndex: 9999999999,
        onOk: () => {
          const config = error.config;
          resolve(httpInstance(config));
          Modal.destroyAll();
        },
        onCancel: () => {
          router.push({ path: '/servicePack', query: { ticketCode: state.ticketCode } })
          Modal.destroyAll();
        }
      })
    })
  }
  return new Promise((resolve) => {
    Modal.warning({
      title: '提示',
      icon: createVNode(ExclamationCircleOutlined),
      content: '请检查网络后重试',
      closable: false,
      okText: '重试',
      zIndex: 9999999999,
      onOk: () => {
        const config = error.config;
        resolve(httpInstance(config));
        Modal.destroyAll();
      }
    })
  })
})
export default httpInstance