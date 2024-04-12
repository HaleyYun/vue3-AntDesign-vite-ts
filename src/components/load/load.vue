<template>
  <div class="load-box" ref="loadbox" :style="{'font-size':fontSize+'px'}">
    <!--loading-->
    <div class="load" v-if="status=='loading'">
        <img src="../../assets/images/load/LoadingImg.png"  class="LoadingImg" alt="">
        <div class="progress-box">
            <div class="progress" :style="{'width':schedule+'%'}">
                <img src="../../assets/images/load/progressImg.png" class="progressImg" alt="">
            </div>
        </div>
        <div class="schedule">{{schedule}}%</div>
        <div class="schedule-text">正在快马加鞭～</div>
    </div>
    <!--noData-->
    <div class="load" v-if="status=='noData'">
      <img src="../../assets/images/load/noDataImg.png" class="noDataImg" mode=""/>
      <div class="noData-text">暂未探寻到相关数据～</div>
    </div>
    <!--failure-->
    <div class="load" v-if="status=='failure'">
      <img src="../../assets/images/load/failureImg.png" class="failureImg" mode=""/>
      <div class="failure-text">加载失败～</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref,onMounted} from "vue"
let loadbox= ref<HTMLElement>()
let fontSize = ref<number>(0)
// let props = 

withDefaults(
      defineProps<{
        status?:string,
        schedule?:number,
      }>(),{
        status:'loading',//loading-加载中,noData-无数据,failure-加载失败
        schedule:30,
      }
  )
  onMounted(()=>{
    let width=loadbox?.value?.clientWidth?loadbox.value.clientWidth:384
    let height=loadbox?.value?.clientHeight?loadbox.value.clientHeight:355
    if (width>height) {
      fontSize.value=Math.floor(height*0.7*16/355)
    } else {
      fontSize.value=Math.floor(width*0.7*16/384)
    }
  })
</script>

<style lang="less" scoped>
.load-box{
  flex-grow: 1;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
}
.load{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: fit-content;
  height: fit-content;
  overflow: hidden;
  // loading
  .LoadingImg{
    width: 20.75em;
    height: 14.3125em;
    margin-bottom: .6875em;
  }
  .progress-box{
    width: 23.125em;
    height: 2.25em;
    border-radius: 1.125em;
    border: .0625em solid #3378FF;
    padding: .3125em;
    .progress{
      height: 1.625em;
      border-radius: .8125em;
      overflow: hidden;
      .progressImg{
        width: 22.5em;
        height: 1.625em;
        margin-top: -0.4375em;
      }
    }
  }
  .schedule{
    font-size: 1.25em;
    font-weight: 500;
    color: #9EA1A7;
    margin-top: .375em;
  }
  .schedule-text{
    font-size: .875em;
    font-weight: 500;
    color: #9EA1A7;
    margin-top: .4375em;
  }
  // noData
  .noDataImg{
    width: 20.75em;
    height: 14.3125em;

  }
  .noData-text{
    margin-top: -4.625em;
    font-size: .875em;
    font-weight: 500;
    color: #9EA1A7;
  }
  // failure
  .failureImg{
    width: 16.875em;
    height: 8.375em;
  }
  .failure-text{
    font-size: .875em;
    font-weight: 500;
    color: #9EA1A7;
    margin-top: .5em;
  }
}
</style>
