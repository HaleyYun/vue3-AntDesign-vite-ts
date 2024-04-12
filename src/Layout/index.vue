<script setup lang='ts'>
import Head from './components/Head.vue';
import Menu from './components/Menu.vue';
// import { getAppVersion } from '../apis/home/index'
// import { clearCacheFun } from '../utils/voice'
import { onMounted } from 'vue';

onMounted(() => {
    // getAppVersion().then(res => {
    //     if (res.code === 200) {
    //         try {
    //             let appVersion = localStorage.getItem('appVersion')
    //             if (!appVersion) {
    //                 localStorage.setItem('appVersion', res.data);
    //                 clearCacheFun();
    //             } else {
    //                 if (appVersion !== res.data) {
    //                     clearCacheFun();
    //                 }
    //             }
    //         } catch (error) {
    //             console.log('非pad请主动刷新', error);
    //         }
    //     }
    // })
})

</script>
<template>
    <div class="content-box">

        <Head />
        <div class="right-box">
            <div class="left-menu">
                <Menu />
            </div>
            <div class="main-box">
                <router-view />
            </div>
        </div>
    </div>
</template>
<style lang='less' scoped>
.content-box {
    position: fixed;
    width: 100vw;
    height: 100vh;

    .right-box {
        display: flex;
        flex: 1;
        width: 100vw;
        height: calc(100vh - 70px);
        background-color: #fff;

        .left-menu {
            width: 67px;
            overflow-y: auto;
        }

        .main-box {
            flex: 1;
            background: rgba(243, 243, 243, 1);
            position: relative;
            padding: 10px;
            border-radius: 16px;
            overflow: hidden;
        }
    }
}
</style>