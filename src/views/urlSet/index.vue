<template>
    <div class="content-page">
        <a :href="item.url" v-for="(item, index) in urlList" :key="index">{{ item.title }}</a>
        <input type="text" v-memo="hrefUrl" value="http://192.168.50.152:8055" @blur="changeUrl"/>
        <!-- <button @click="showSetting">清缓存/自定义地址</button> -->
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// import { showSetting } from "../../utils/voice";


const router = useRouter()
const urlList = ref([
    { title: "商业版2.0-测试1环境", url: "http://192.168.50.199:8075" },
    { title: "商业版2.0-测试2环境", url: "http://47.100.123.102:10056/" },
    { title: "抑郁测试环境", url: "http://47.100.123.102:8055/" },
    // { title: "抑郁开发环境", url: "http://192.168.50.152:8056" },
])
const hrefUrl = ref<string>('http://192.168.50.152:8055/')

console.log(router, urlList)

const changeUrl = (e:any) => {
    if(e.currentTarget.value!=''){
       window.location.href= e.currentTarget.value
    }
}
</script>

<style lang="less" scoped>
.content-page {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    a,input,
    button {
        font-size: 24px;
        line-height: 26px;
        padding: 6px;
        border-radius: 18px;
        border: 1px solid #1890ff;
        margin: 0 20px;
        color: #1890ff;
        background-color: #fff;
    }

}
</style>


