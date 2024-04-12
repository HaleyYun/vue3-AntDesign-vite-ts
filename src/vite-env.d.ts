/// <reference types="vite/client" />
declare module '*.vue' {
    import { defineComponent } from 'vue'
    const Component: ReturnType<typeof defineComponent>
    export default Component
}
declare module "ant-design-vue";
declare module 'lodash'
