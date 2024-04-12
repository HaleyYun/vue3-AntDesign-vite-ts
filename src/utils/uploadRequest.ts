//进行axios二次封装:使用请求与响应拦截器
import axios from 'axios'
import router from '@/router';
import { message } from 'ant-design-vue';
// import 'ant-design-vue/es/message/style/css';
import { useUserStore } from '@/stores/user'

let baseURL = import.meta.env.VITE_BASE_API + '/zskj/app'

const uploadInstance = axios.create({
  baseURL: baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'multipart/form-data'
  },
})
uploadInstance.interceptors.request.use((config) => {
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
uploadInstance.interceptors.response.use(res => {
  const userStore = useUserStore();
  if (res.data.code == 100012 && res.data.message == "token无效") {
    userStore.clearUserInfor()
    router.replace("/login")
  }
  if (res.data.code == 500) {
    // Message({ message: `错误代码${res.data.code}`, type: 'error' })
  }
  if (res.status == 200) {
    return res.data
  }

  return res.data
}, error => {
  console.log("error====", error);

  message.error(error.response.data.message)

  return Promise.reject(error)
})
export default uploadInstance