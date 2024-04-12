<template>
    <div class="task-more">
        <div class="task-li">
            <div class="li-small" @click="showBig"><img :src="optionData.imgPathList[2]"></div>
            <div class="li-big"><img :src="optionData.imgPathList[1]"></div>
        </div>
        <div class="task-me">
            <CanvasFunc :ref="'cube' + canvasObj.pageIndex" :canvasObj="canvasObj" :count="count"></CanvasFunc>
        </div> 
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
            <img :src="optionData.children[0].wrongValue==true?getAssetsFile('clearActive.png'):getAssetsFile('clearGray.png')" @click="uploadBaesUrl(1,true)">
        </div>
    </div>

    <a-modal style="width:auto;" v-model:visible="outVisible" :closable="false" :footer="null" centered>
      <img :src="optionData.imgPathList[1]">
    </a-modal>


</template>
  
<script>
import { reactive, toRefs, onMounted, getCurrentInstance, nextTick } from "vue";
import CanvasFunc from "../canvas/canvasFunc.vue";
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
    setup(props,{emit}) {
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
            outVisible:false,
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
                    "cube" + state.canvasObj.pageIndex
                ].pencilBtn("#5766fe");
            });
        })
        //放大图片
        const showBig = ()=>{
          state.outVisible = true
        }
        //切换画笔
        const changePenColor = (color) => {
          //全部题目以及入参
          const allDataList = JSON.parse(setMocaData.mocaAllDataList)
          console.log(JSON.parse(setMocaData.mocaAllDataList) +'画布2')
          if(allDataList[props.questionNum].children[0].imgUrl==''){
            if(color=='#5766fe'){
                state.blueShow = true
                state.redShow = false
            }
            if(color=='#ff1212'){
                state.blueShow = false
                state.redShow = true
            }
            proxy.$refs["cube" + state.canvasObj.pageIndex].pencilBtn(color)
          }
        }
        //清除画笔
        const clearCanvas = () => {
          //全部题目以及入参
          const allDataList = JSON.parse(setMocaData.mocaAllDataList)
          console.log(JSON.parse(setMocaData.mocaAllDataList) +'画布2')

          if(allDataList[props.questionNum].children[0].imgUrl==''){
            proxy.$refs[ "cube" + state.canvasObj.pageIndex ].resetCanvas();
          }
        }
        const uploadBaesUrl = (val,bol) => {
            //全部题目以及入参
            const allDataList = JSON.parse(setMocaData.mocaAllDataList)
            console.log(JSON.parse(setMocaData.mocaAllDataList) +'画布2')
            emit("changeData",true,'/')
            if(val==0){
                props.optionData.children[0].rightValue = bol
                props.optionData.children[0].wrongValue = false

                allDataList[props.questionNum].children[0].rightValue = bol
                allDataList[props.questionNum].children[0].wrongValue = false
            }
            if(val==1){
                props.optionData.children[0].wrongValue = bol
                props.optionData.children[0].rightValue = false

                allDataList[props.questionNum].children[0].wrongValue = bol
                allDataList[props.questionNum].children[0].rightValue = false
            }
            proxy.$refs["cube" + state.canvasObj.pageIndex].returnBaseUrl()
                .then((res) => {
                  allDataList[props.questionNum].children[0].imgUrl = res
                  allDataList[props.questionNum].children[0].isRight = val
                  setMocaData.getMocaAllDataList(JSON.stringify(allDataList))
                  console.log(JSON.parse(setMocaData.mocaAllDataList))
                });
        };
  
        return {
            ...toRefs(state),
            changePenColor,
            clearCanvas,
            uploadBaesUrl,
            showBig,
            getAssetsFile
        };
    },
};
</script>
  
  <style lang="less" scoped>
        .task-more{
          width:88%;
          height:100%;
          display: flex;
          float: left;
          .task-li{
            width:356px;
            height: 100%;
            .li-small{
              width:45px;
              height:45px;
              margin:100px 150px 50px 150px;
              img{
                width:45px;
                height:45px;
              }
            }
            
            .li-big{
              width:320px;
              height:320px;
              img{
                width:320px;
                height:320px;
              }
            }
          }
          .task-me{
            width:890px;
            height:100%;
            background-color: #fff;
            border-radius: 20px;
            box-shadow: 0px 0px 7px 0px rgba(0,0,0,0.12);
          }
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
            width:88px;
            height:180px;
            background: #F6F7FF;
            border-radius: 50px;
            margin-left: 15px;
            border:1px solid #F6F7FF;
            img{
              width: 68px;
              height: 68px;
              margin:15px 10px 10px 10px;
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
  