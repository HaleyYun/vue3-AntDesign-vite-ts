<template>
    <div class="main">
        <div class="content">
            <div class="stepOne">
                <p class="two-title">{{text}}</p>
                <div class="imgbg">
                    <img  class="img" :src="imageUrl" alt="" />
                </div>
                <a-button class="btn" v-if="isShow" @click="handleNext">确 定</a-button>
            </div>
            <audio class="videoTd" id="audioPlay" :src="audioUrl" :muted="isMuted" autoplay="true" controls="true"></audio>
        </div>
    </div>
</template>

<script lang="ts">
import { reactive,onMounted,toRefs } from 'vue'
import { useState } from "@/stores/state"
import { useRouter } from 'vue-router'
export default {
    setup() {
        const depressedState = useState()
        const router = useRouter()
        const setAttr = reactive({
            current:0,
            isShow: false, 
            isMuted:true,
            text:'',//头部文字
            audioUrl:'',//音频链接
            imageUrl:'',//图片链接
        })

        onMounted(() => {
            setAttr.text = depressedState.depressData[4].steps[setAttr.current].elements.filter((item:any) => item.type == 'text').map((item:any) => item.content).join('')
            setAttr.audioUrl = depressedState.depressData[4].steps[setAttr.current].elements.filter((item:any) => item.type == 'audio').map((item:any) => item.content).join('')
            setAttr.imageUrl = depressedState.depressData[4].steps[setAttr.current].elements.filter((item:any) => item.type == 'image').map((item:any) => item.content).join('')
            console.log(depressedState.depressData)
            startVideoUrl(setAttr.audioUrl)
        })

        // 开始播放语音
        const startVideoUrl = (url: string) => { 
            // alert('1111111111')
            let audio: HTMLAudioElement = document.getElementById("audioPlay") as HTMLAudioElement;
            audio.src = url
            setAttr.isMuted = false
            let timer = setTimeout(() => {
                clearTimeout(timer)
                audio.load();
                audio.play();
            }, 0)
            // 监听语音播放结束
            audio.addEventListener( 
                "ended",
                () => {
                    setAttr.current ++
                    startVideoUrl(depressedState.depressData[4].steps[setAttr.current].elements.filter((item:any) => item.type == 'audio').map((item:any) => item.content).join(''))
                    setAttr.text = depressedState.depressData[4].steps[setAttr.current].elements.filter((item:any) => item.type == 'text').map((item:any) => item.content).join('')
                    setAttr.imageUrl = depressedState.depressData[4].steps[setAttr.current].elements.filter((item:any) => item.type == 'image').map((item:any) => item.content).join('')
                    setAttr.isShow = true
                    console.log('123')
                },
                false
            );
        }
        //下一步
        const handleNext = ()=>{
            router.push('/guideTask')
        }
        return {
            router,
            handleNext,
            ...toRefs(setAttr)
        }
    },
    methods: {
    }
}
</script>

<style scoped>
.main {
    background: #94826B;
    height: 100vh;
    width: 100vw;
    display: table;
}
    .content{
        display: flex;
        height: 100vh;
        align-items: center;
        justify-content: center;
    }
        .stepOne{
            text-align:center;
        }
            .two-title {
                font-size: 50px;
                font-weight: 500;
            }
            .imgbg{
                width: 300px;
                height: 160px;
                border: 2px solid #b3aaaa;
                border-radius: 10px;
                overflow: hidden;
                margin: auto;
            }

            .img {
                    margin-top:5%;
                    height: 82%;
                }
            .btn {
                display: block;
                margin: 0 auto;
                margin-top: 40px;
                width: 180px;
                height: 60px;
                background-color: #61749e;
                color: #fff;
                font-size: 20px;
                border-radius: 6px;
            }
        
        .videoTd {
            position: fixed;
            top: 0;
            visibility: hidden;
            opacity: 0;
        }
    
</style>