<script setup  lang='ts'>
import { useRouter, useRoute } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import { useState } from '@/stores/state'
import { pageTabStatus } from "@/stores/pageTabStatus"



const tabStatus = pageTabStatus()
const state = useState()
const router = useRouter()
const route = useRoute()
// 获取菜单
let routerList = ref<[{ path: string, menuName: string, icon: string }]>([{ path: '', menuName: '', icon: '' }]) //菜单
let iconActive = ref<string>('/home') //菜单
const handleClickRouter = (path: string) => {
    state.changePageNumNumberState(1)
    state.changePageSubNumNumberState(1)
    router.push(path)
    iconActive.value = path
    tabStatus.clearItem()
}

// 获取assets静态资源
const getAssetsFile = (url: string) => {
    return new URL(`/src/assets/images/nav/${url}`, import.meta.url).href
}

watch(() => route.path, (newPath) => { console.log(newPath); iconActive.value = newPath; });

onMounted(() => {
    state.changePageNumNumberState(1)
    const list = JSON.parse(localStorage.getItem('menu') as any)
    if (!list || list?.length === 0) return
    routerList.value = list.filter((item: any) => item.menuType == 1)
    console.log(list)
    if (state.pageUrl != '') {
        iconActive.value = state.pageUrl
    } else {
        iconActive.value = list[0].path
    }
    console.log(router.currentRoute)
    iconActive.value = router.currentRoute.value.path;
})

</script>
<template>
    <ul class="nav">
        <li v-for="item in routerList" :key="item.path" :class="iconActive == item.path ? 'active' : ''"
            @click="handleClickRouter(item.path)">
            <img v-if="item.icon == 'home'"
                :src="iconActive == item.path ? getAssetsFile('home_active.png') : getAssetsFile('home.png')" alt=""
                class="imgbg">
            <img v-if="item.icon == 'subscribe'"
                :src="iconActive == item.path ? getAssetsFile('subscribe_active.png') : getAssetsFile('subscribe.png')"
                alt="" class="imgbg">
            <img v-if="item.icon == 'client'"
                :src="iconActive == item.path ? getAssetsFile('client_active.png') : getAssetsFile('client.png')" alt=""
                class="imgbg">
            <img v-if="item.icon == 'assess'"
                :src="iconActive == item.path ? getAssetsFile('assess_active.png') : getAssetsFile('assess.png')" alt=""
                class="imgbg">
            <img v-if="item.icon == 'mine'"
                :src="iconActive == item.path ? getAssetsFile('mine_active.png') : getAssetsFile('mine.png')" alt=""
                class="imgbg">
            <img v-if="item.icon == 'service'"
                :src="iconActive == item.path ? getAssetsFile('service_active.png') : getAssetsFile('service.png')" alt=""
                class="imgbg">
            <img v-if="item.icon == 'coupon'"
                :src="iconActive == item.path ? getAssetsFile('coupon_active.png') : getAssetsFile('coupon.png')" alt=""
                class="imgbg">
            <img v-if="item.icon == 'equity'"
                :src="iconActive == item.path ? getAssetsFile('equity_active.png') : getAssetsFile('equity.png')" alt=""
                class="imgbg">
            <div>{{ item.menuName }}</div>
        </li>
    </ul>
</template>


<style lang='less' scoped>
.nav {
    width: 100%;
    padding-top: 13px;

    li {
        padding: 0 10px;
        cursor: context-menu;
        margin-bottom: 25px;
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
            width: 22px;
            height: 21px;
        }

        &>div {
            font-size: 10px;
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            color: #707070;
            width: 100%;
            text-align: center;
            line-height: 22px;
        }

        &.active {
            color: rgba(61, 126, 255, 1);
            font-weight: bold;
        }
    }
}

.imgbg {
    width: 52px;
    height: 50px;
}
</style>