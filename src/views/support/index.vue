<template>
    <div class="content">
        <div class="main">
            <div class="box">
                <div class="close" @click="backHome">
                    <img src="@/assets/images/close.png" alt="">
                </div>
                <div class="title">
                    请联系客服
                </div>
                <div class="num">4000215600</div>
                <div class="button">
                    <a-button type="primary" class="submit" @click="backHome">确认</a-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const router = useRouter()
let pageUrl = ref<string>('') //菜单
let routerList = ref<[{path:string,menuName:string,icon:string}]>([{path:'',menuName:'',icon:''}]) //菜单
const list =JSON.parse(localStorage.getItem('menu') as any) 
routerList.value = list.filter((item:any) => item.menuType == 1)
console.log(list ) 
routerList.value.forEach((el:any) => {
    if(el.menuName=='待筛查'){
        pageUrl.value = el.path
    }
})
if(pageUrl.value == ''){
    pageUrl.value = routerList.value[0].path
}


const backHome = () => {
    router.push(pageUrl.value);
}
</script>

<style lang="less" scoped>
.content {
    width: 100%;
    height: 100vh;

    .main {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 10;
        background: rgba(0, 0, 0, 0.3);

        .box {
            position: relative;
            width: 428px;
            height: 300px;
            background: #fff;
            border-radius: 10px;
            margin: 0 auto;
            margin-top: calc((100vh - 400px) / 2);
            text-align: center;
            overflow: hidden;

            .close {
                position: absolute;
                left: 15px;
                top: 15px;
                img{
                    display: block;
                    width: 24px;
                }
            }

            .title {

                font-size: 28px;
                font-weight: 400;
                color: #717171;
                text-align: center;
                margin-top: 50px;
            }

            .num {
                font-size: 40px;
                text-align: center;
                font-weight: 600;
                color: #222222;
                margin: 30px 0;
            }

            .button {
                .submit {
                    width: 260px;
                    // color: #fff;
                    height: 50px;
                    font-size: 18px;
                    border: 0;
                    border-radius:25px;
                }
            }
        }
    }
}
</style>