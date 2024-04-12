<template>
    <div class="task-l">
        <CanvasFunc :ref="'watch' + canvasObj.pageIndex" :canvasObj="canvasObj" :count="count"></CanvasFunc>
    </div>
    <div class="task-r">
        <div class="task-bg" @click="changePenColor('#5766fe')">
            <img :src="blueShow==true?getAssetsFile('blueActive.png'):getAssetsFile('blueGray.png')">
        </div>

        <div class="task-bg" @click="changePenColor('#ff1212')">
            <img :src="redShow==true?getAssetsFile('redActive.png'):getAssetsFile('redGray.png')">
        </div>

        <div class="task-bg" @click="clearCanvas">
            <img src="../../../../assets/images/moca/cleGray.png">
        </div>
        
        <div class="task-big">
            <img :src="optionData.children[0].rightValue==true?getAssetsFile('overActive.png'):getAssetsFile('overGray.png')" @click="uploadBaesUrl(0,true)">
        </div>
    </div>
</template>
  
<script>
import { reactive, toRefs, onMounted, getCurrentInstance, nextTick } from "vue";
import CanvasFunc from "../canvas/canvasFunc.vue";
// import CanvasFuncRotate from "../canvas/canvasFuncRotate.vue"; // 正向画板
import { useState } from '@/stores/state';
const setMocaData = useState();
export default {
    props: {
        optionData: {
            type: Object,
            required: true,
        },
        questionNum:{
          type:Number,
          required:true
        }
    },
    components: { CanvasFunc },
    setup(props, { emit }) {
        const { proxy } = getCurrentInstance();
        const state = reactive({
            canvasObj: {
                pencilColor: "#ea382a",
                pencilwidth: 6,
                rubberwidth: 20,
                csBgColor: "#ffffff",
                imgx: 0,
                imgY: 0,
                pageIndex:  props.optionData.id - 1,
                pageIndexa: props.optionData.id - 1,
            },
            active: "box1",
            blueShow:true,
            redShow:false,
            count:0
        });
         // 获取assets静态资源
        const getAssetsFile = (url) => {
            return new URL(`/src/assets/images/moca/${url}`, import.meta.url).href
        }
        
        onMounted(() => {
            nextTick(() => {
                proxy.$refs[
                    "watch" + state.canvasObj.pageIndex
                ].pencilBtn("#5766fe");
            });
        })
        //切换画笔
        const changePenColor = (color) => {
            //全部题目以及入参
            const allDataList = JSON.parse(setMocaData.mocaAllDataList)
            console.log(JSON.parse(setMocaData.mocaAllDataList) +'画布3')

            if(allDataList[props.questionNum].children[0].imgUrl==''){
                if(color=='#5766fe'){
                    state.blueShow = true
                    state.redShow = false
                }
                if(color=='#ff1212'){
                    state.blueShow = false
                    state.redShow = true
                }
                proxy.$refs["watch" + state.canvasObj.pageIndex].pencilBtn(color)
            }
        }
        //清除画笔
        const clearCanvas = () => {
            //全部题目以及入参
            const allDataList = JSON.parse(setMocaData.mocaAllDataList)
            console.log(JSON.parse(setMocaData.mocaAllDataList) +'画布3')

            if(allDataList[props.questionNum].children[0].imgUrl==''){
                proxy.$refs[ "watch" + state.canvasObj.pageIndex ].resetCanvas();
            }
        }
        //上传图片
        const uploadBaesUrl = (val,bol) => {
            //全部题目以及入参
            const allDataList = JSON.parse(setMocaData.mocaAllDataList)
            console.log(JSON.parse(setMocaData.mocaAllDataList) +'画布3')
            emit("changeData",true,'/')
            if(val==0){
                props.optionData.children[0].rightValue = bol
                allDataList[props.questionNum].children[0].rightValue = bol
            }

            proxy.$refs["watch" + state.canvasObj.pageIndex].returnBaseUrl()
                .then((res) => {
                    allDataList[props.questionNum].children[0].imgUrl = res
                    allDataList[props.questionNum].children[0].isRight = val
                    setMocaData.getMocaAllDataList(JSON.stringify(allDataList))
                    console.log(JSON.parse(setMocaData.mocaAllDataList))
                })
        };
  
        return {
            ...toRefs(state),
            changePenColor,
            clearCanvas,
            uploadBaesUrl,
            getAssetsFile
        };
    },
};
</script>
  
  <style lang="less" scoped>
.task-l{
    width:88%;
    height:100%;
    float: left;
}
.task-r{
    width:10%;
    height:100%;
    float:right;
    .task-bg{
    width:115px;
    height:115px;
    img{
        width:115px;
        height:115px;
    }
    }
    .task-big{
    width:100px;
    height:100px;
    background: #F6F7FF;
    border-radius: 50px;
    margin-left: 15px;
    border:1px solid #F6F7FF;
    img{
        width: 68px;
        height: 68px;
        margin:15px  auto;
    }
    }
    .task-small{
    width: 68px;
    height: 68px;
    margin: 10px auto;
    img{
        width: 68px;
        height: 68px;
    }
    }
}

</style>
  