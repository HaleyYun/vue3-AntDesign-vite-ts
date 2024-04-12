//路由守卫
import router from '@/router'
import setting from './setting'
import { useUserStore } from '@/stores/user'
router.beforeEach(async (to: any, from: any, next: any) => {
    console.log(from);
    document.title = `${setting.title} - ${to.meta.title}`
    const userStore = useUserStore()
    const token = userStore.userInfor?.token
    if (token) {
        if (to.path == '/login') {
            next({ path: '/' })
        } else {
            next()
        }
    } else {
        if (to.path == '/login' || to.path == '/urlSet') {
            next()
        } else {
            next({ path: '/login' })
        }
    }
})