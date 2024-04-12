import * as ElementPlusIconsVue from '@ant-design/icons-vue'
export default {
  install(app: any) {
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}