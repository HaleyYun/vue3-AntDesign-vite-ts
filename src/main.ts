import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router from '@/router'
import './permisstion'
import { createPinia } from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import globaComponents from "@/plugins"
import directives from '@/directive/index'
import "@/styles/global.less"

// declare global {
//     interface Window {
//         [name: string]: any
//     }
// }
const app = createApp(App)
const pinia = createPinia()
// pinia 数据持久化 
pinia.use(piniaPluginPersistedstate)
app.use(directives)
app.use(globaComponents)
app.use(router)
app.use(pinia)
app.use(Antd)
app.mount('#app')
