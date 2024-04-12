<template>
  <div class="moca-con" v-if="visible">
    <div class="back" @click="back">
      <img src="../../assets/images/moca/back.png" />
    </div>
    <div class="title">请预先准备量表内所有图片素材 供评估使用</div>
    <div class="button" @click="start">开始答题</div>
  </div>
  <div class="desk" v-if="visibleNext" @click="next">
    <img src="../../assets/images/moca/deskBg.png" />
  </div>
  <div class="desk2" v-if="loading"></div>
  <!----开始答题---->
  <div class="taskBox" v-if="taskStart">
    <!-----题目上半部-  :infinite="false"--->
    <div class="topBox">
      <!------上下题目---->
      <div class="pro-btn left" @click="dec" v-if="questNO > 0">
        <img src="../../assets/images/moca/prev.png" />
      </div>
      <div class="pro-btn right" @click="pro">
        <div v-if="nextDisable == false">
          <div class="btn" v-if="questNO == 15">进入题目</div>
          <div class="btn" v-else-if="questNO == 18">提交</div>
          <img v-else :src="questNO == 11 || questNO == 12 ? getAssetsFile('next.png') : getAssetsFile('nextGray.png')" />
        </div>
        <div v-else>
          <div class="btn" v-if="questNO == 15">进入题目</div>
          <div class="btn" v-else-if="questNO == 18">提交</div>
          <img v-else src="../../assets/images/moca/next.png" />
        </div>
      </div>
      <a-carousel :autoplay="false" arrows :dots="false" :swipe="false" ref="myCarousel">
        <div class="task-con" v-for="(item, index) in askQuestionList" :key="index">
          <gossiPicture :optionData="item" :questionNum="questNO" @changeData="uploadBaesUrl" v-if="item.id == 1" />
          <cubePicture :optionData="item" :questionNum="questNO" @changeData="uploadBaesUrl" v-if="item.id == 2" />
          <watchesPicture :optionData="item" :questionNum="questNO" @changeData="uploadBaesUrl" v-if="item.id == 3" />
          <div class="task-biger" v-if="item.id != 1 && item.id != 2 && item.id != 3">
            <judgment :optionData="item" :questionNum="questNO" @changeData="uploadBaesUrl"
              v-if="item.id == 4 || item.id == 8 || item.id == 9 || item.id == 14 || item.id == 17 || item.id == 19" />
            <pictureQuestion :optionData="item" :questionNum="questNO" @changeData="uploadBaesUrl"
              v-if="item.id == 5 || item.id == 6 || item.id == 7" />
            <numberQuestion :optionData="item" :questionNum="questNO" @changeData="uploadBaesUrl" v-if="item.id == 10 || item.id == 11" />
            <chooseQuestion :optionData="item" :questionNum="questNO" @changeData="uploadBaesUrl" v-if="item.id == 12" />
            <decQuestion :optionData="item" :questionNum="questNO" @changeData="uploadBaesUrl" :bol="true" v-if="item.id == 13" />
            <timeQuestion ref="time" :optionData="item" :questionNum="questNO" @changeData="uploadBaesUrl" v-if="item.id == 15" />
            <div class="time_num" v-if="minOutDisable">{{ minOut }}<span style="font-size: 18px">s</span></div>
            <div class="train-box" v-if="item.id == 16">
              <div class="train">练习</div>
              <div class="train-text" @click="playTap(askQuestionList[questNO].children[0].questionVoice, !playBtn)">
                请你说一下橘子和香蕉在什么方面相类似？</div>
            </div>
            <textChooseQution @changeData="uploadBaesUrl" :optionData="item" :questionNum="questNO" v-if="item.id == 18" />
          </div>
        </div>
      </a-carousel>
    </div>

    <!-----操作下半部---->
    <div class="botBox">
      <div class="out" @click="out"><img src="../../assets/images/moca/out.png" /></div>
      <div class="btn-list">
        <div class="pro-btn"></div>
        <audio id="titleAudio" :src="askQuestionList[questNO].voicePath"></audio>
        <div class="pro-list">
          <div class="p-btn" v-if="((askQuestionList[questNO].menu as any) & playNo) == playNo"
            @click="playTap(askQuestionList[questNO].voicePath, !playBtn)"><img
              :src="playBtn == true ? getAssetsFile('p4Active.png') : getAssetsFile('p4Gray.png')" /></div>
          <div class="p-btn" v-if="((askQuestionList[questNO].menu as any) & remarkNo) == remarkNo"
            @click="remarkTap"><img
              :src="remarkBtn == true ? getAssetsFile('p5Active.png') : getAssetsFile('p5Gray.png')" /></div>
          <div class="p-btn" v-if="((askQuestionList[questNO].menu as any) & photoNo) == photoNo"
            @click="photoTap(questNO)"><img
              :src="photoBtn == true ? getAssetsFile('p6Active.png') : getAssetsFile('p6Gray.png')" /></div>
          <div class="p-btn" v-if="((askQuestionList[questNO].menu as any) & atNo) == atNo"
            @click="antoTap(questNO, typeAudo)"><img
              :src="atBtn == true ? getAssetsFile('p3Active.png') : getAssetsFile('p3Gray.png')" /></div>
          <div v-if="isShow">
            <div class="p-btn" v-if="((askQuestionList[questNO].menu as any) & timeNo) == timeNo"
              @click="timeTap(questNO)"><img :src="getAssetsFile('p2Gray.png')" /></div>
          </div>
          <div v-else>
            <div class="p-btn" v-if="((askQuestionList[questNO].menu as any) & timeNo) == timeNo" @click="notTime"><img
                :src="getAssetsFile('p2Active.png')" /></div>
          </div>
        </div>
        <div class="pro-btn"></div>
      </div>

      <div class="bot-title">

        <div class="title-box" v-if="questNO==0||questNO==7||questNO==11||questNO==13||questNO==15">
          <div style="display: flex;" v-if="showMore">
            <div class="title-smll">
            {{ askQuestionList[questNO].content }}
            </div>
            <span class="show-more" @click="showUp">查看评估员提示></span>
          </div>
          
          <div class="title-more" v-if="!showMore">
            {{ askQuestionList[questNO].content }}
            <span class="show-more" @click="showDown">收起评估员提示></span>
          </div>
        </div>

        <div class="title-box" v-else>
          {{ askQuestionList[questNO].content }}
        </div>
       
      </div>
      <div class="bot-time">
        <div class="com bot-l">{{ askQuestionList[questNO].sort }}/{{ askQuestionList[18].sort }}</div>
        <div class="com bot-r" v-if="!minOutDisable">{{ timeStr }}</div>
        <div class="com bot-r" v-if="minOutDisable">0:0:{{ minOut }}</div>
      </div>
    </div>
  </div>

  <!-------退出------->
  <a-modal v-model:visible="outVisible" :closable="false" title="提示" :footer="null" centered :maskClosable="false">
    <div class="identity-verify">
      <h3>你确定要退出当前操作吗？</h3>
      <div class="btn-list">
        <a-button class="out" @click="outBack">仍然退出</a-button>
        <a-button class="out" @click="outNo">无法作答</a-button>
        <a-button class="active" @click="outClose">返回操作</a-button>
      </div>
    </div>
  </a-modal>

  <!-------备注------>
  <a-modal v-model:visible="remarkVisible" :closable="false" title="备注" @ok="handleOk" @cancel="handleCancel" centered
    :maskClosable="false">
    <div class="identity-verify">
      <textarea maxLength="80" v-model="remarkText" @blur="remarkInt" class="area" placeholder="请输入备注" />
    </div>
  </a-modal>

  <!-------保存录音------->
  <a-modal v-model:visible="atNoVisible" :closable="false" title="温馨提示" :footer="null" centered :maskClosable="false">
    <div class="identity-verify">
      <h3>录音是否要保留？</h3>
      <div class="btn-list">
        <a-button class="out" @click="atNoClose">取消</a-button>
        <a-button class="active" @click="atNoSure">确定</a-button>
      </div>
    </div>
  </a-modal>


</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getQuestionFind, sedResultAPI, getEstimateNumApi, getMocaApi } from '@/apis/moca_game/index';
import { getDictTypeResponseDataContent } from '@/apis/moca_game/type';
import { debounce } from '@/utils/tools';
import gossiPicture from './components/canvasTask/gossiPicture.vue'; //画图第一题
import cubePicture from './components/canvasTask/cubePicture.vue'; //画图第二题
import watchesPicture from './components/canvasTask/watchesPicture.vue'; //画图第一题
import judgment from './components/canvasTask/judgment.vue'; //判断题//3-2,7,8,13,15-2,17
import pictureQuestion from './components/canvasTask/pictureQuestion.vue'; //图片题4,5,6
import numberQuestion from './components/canvasTask/numberQuestion.vue'; //数字题9,10
import chooseQuestion from './components/canvasTask/chooseQuestion.vue'; //选择题11
import textChooseQution from './components/canvasTask/textChooseQution.vue'; //文字选择题16
import decQuestion from './components/canvasTask/decQuestion.vue'; //数字相减题12
import timeQuestion from './components/canvasTask/timeQuestion.vue'; //倒计时题14
import { useState } from '@/stores/state';
import { talkPhoto, startRecordAudio, endRecordAudio } from '@/utils/voice';
import { message } from 'ant-design-vue';
const route = useRoute();
const state = useState();
const visible = ref<boolean>(true);
const visibleNext = ref<boolean>(false);
const loading = ref<boolean>(false);
const taskStart = ref<boolean>(false);
// 0b1为语音播放，0b10添加备注，0b100拍照上传,0b1000为录音，0b10000为倒计时
const playNo = ref<number>(0b1); // 0b1为语音播放
const remarkNo = ref<number>(0b10); // 0b10添加备注
const photoNo = ref<number>(0b100); // 0b100拍照上传
const atNo = ref<number>(0b1000); // 0b1000为录音
const timeNo = ref<number>(0b10000); // 0b10000为倒计时
const questNO = ref<number>(0); //第几题
const gaugeTime = ref<number>(0); //倒计时
const timeStr = ref<string>(''); //时间
const outVisible = ref<boolean>(false); //退出
const remarkVisible = ref<boolean>(false); //备注
const atNoVisible = ref<boolean>(false); //保存录音
const remarkText = ref<string>('');
const nextDisable = ref<boolean>(false); //下一步
const myCarousel = ref<any>(); //实例走马灯

const showMore = ref<boolean>(true); //查看评估员提示

const typeAudo = ref<number>(1); //开始录音
const askQuestionList = ref<getDictTypeResponseDataContent[]>([]); //所有题目
const router = useRouter();
const minOutDisable = ref<boolean>(false); //一分钟倒计时
const minOut = ref<any>(60); //一分钟倒计时
onMounted(() => {
  //获取题目素材
  let data = {
    archivesNo: state.QueryProData.clientId,
    customName: state.QueryProData.clientName,
    customPhone: state.QueryProData.phone,
    deviceNum: window.innerWidth + '_' + window.innerHeight,
    estimateServeCode: state.QueryProData.checkService,
    estimateServeName: state.QueryProData.checkName,
    orderNum: state.QueryProData.ticketsBookingCode,
    status: '',
    estimateNum: ''
  }
  getEstimateNumApi(data).then(res => {
    if (res.code === 200) {
      console.log(res);
      state.getEstimateNum(res.data);
    }
  })
  getQuestionFind({ estimateServerCode: 'MOCA' }).then(res => {
    if (res.code === 200) {
      //处理入参
      let setDataQuestionList =JSON.parse(JSON.stringify(res.data))
      setDataQuestionList.forEach((item:any) => {
        item.children.forEach((el:any) => {
          el.answers = ""
          el.estimateNum = state.estimateNum
          el.imgUrl = ""
          el.isRight = ""
          el.playRecord = ""
          el.questionId = item.id
          el.remark = ""
          el.score = ""
          el.photoUrl = ""
        })
      })
      state.getMocaAllDataList(JSON.stringify(setDataQuestionList))
      askQuestionList.value = JSON.parse(state.mocaAllDataList)
      console.log(askQuestionList.value);
      setCountTime();
    }
  });
});
const uploadBaesUrl = (val: boolean, str: string) => {
  console.log(str);
  if (str == 'str') {
    playBtn.value = true;
  } else {
    playBtn.value = false;
  }
  nextDisable.value = val;
};
//查看更多
const showUp = ()=>{
  showMore.value = false
}

const showDown = ()=>{
  showMore.value = true
}

const setCountTime = () => {
  // 计时 -- 整个量表
  setInterval(() => {
    gaugeTime.value += 1;
    handleTime(gaugeTime.value);
  }, 1000);
};

const handleTime = (val: number) => {
  // 数字处理为时间格式  返回字符串
  let second: number | string = val % 60; //秒
  let minute: number | string = Math.floor(val / 60) % 60; //分钟
  let hour: number | string = Math.floor(val / 3600) % 60; //小时
  if (second < 10) {
    second = '0' + second;
  }
  if (minute < 10) {
    minute = '0' + minute;
  }
  if (hour < 10) {
    hour = '0' + hour;
  }
  timeStr.value = `${hour}:${minute}:${second}`;
};

// 获取assets静态资源
const getAssetsFile = (url: string) => {
  return new URL(`/src/assets/images/moca/${url}`, import.meta.url).href;
};

const playBtn = ref<boolean>(false); //语音按钮
const remarkBtn = ref<boolean>(false); //备注按钮
const photoBtn = ref<boolean>(false); //拍照按钮
const atBtn = ref<boolean>(false); //录音按钮
const AndroidType = ref<string>(''); //类型
const isBreak = ref<boolean>(false);
const audioUrl = ref<string>('');

//录音
const atNoClose = ()=>{
  atNoVisible.value = false
}
const atNoSure = ()=>{
  atNoVisible.value = false
}

//退出
const out = () => {
  outVisible.value = true;
};
//仍然退出
const outBack = () => {
  outVisible.value = true;
  router.push({
    path: '/servicePack',
    query: {
      ticketCode: route.query.ticketCode
    }
  });
};
//无法作答
const outNo = () => {
  outVisible.value = true;
  let data = {
    archNo: route.query.archivesNo as string,
    estimateNum: state.estimateNum,
    riskLabel: 0,
    isUnableAnswer: true,
    riskLabelDesc: ''
  };
  getMocaApi(data).then(res => {
    if (res.code === 200) {
      console.log(res);
      router.push({
        path: '/servicePack',
        query: {
          ticketCode: route.query.ticketCode
        }
      });
    }
  });
};
//返回操作
const outClose = () => {
  outVisible.value = false;
};
//语音播放
const playTap = (val: string, bol: boolean) => {
  console.log(val);
  playBtn.value = bol;
  if (bol == true) {
    let audioElement: HTMLAudioElement = document.getElementById('titleAudio') as HTMLAudioElement;
    audioElement.load();
    audioElement.play();
    audioElement.addEventListener(
      'ended',
      () => {
        playBtn.value = false;
      },
      false
    );
  } else {
    return;
  }
};

//拍照
const photoTap = (val: number) => {
  console.log(val);
  photoBtn.value = !photoBtn.value;
  // 调用相机进行拍照
  let data = {
    id: Number(new Date()),
    project_code: 'hospital'
  };
  alert(JSON.stringify(data));
  talkPhoto(data, (res: any) => {
    console.log(res);
    AndroidType.value = 'talkPhoto';
  })
}

//录音
const antoTap = (val: number, type: number) => {
  console.log(val);
  console.log(type);
  atBtn.value = true;
  soundRecording(type);
}

const soundRecording = (type: number) => {
  // alert(type);
  // 录音开始停止
  if (type === 1) {
    // 开始录音
    let obj = {
      id: Number(new Date()),
      project_code: 'zskj-object/edb-ad/MoCA/pic'
    };
    // alert(JSON.stringify(obj));
    startRecordAudio(obj, (res: any) => {
      AndroidType.value = 'startRecordAudio';
      console.log(res);
      typeAudo.value = 2;
    });
  } else if (type === 2) {
    atNoVisible.value = true
    atBtn.value = false
    // 停止录音
    let obj = {
      id: Number(new Date()),
      project_code: 'zskj-object/edb-ad/MoCA/pic'
    };
    endRecordAudio(obj, (res: any) => {
      AndroidType.value = 'endRecordAudio';
      console.log(res);
      typeAudo.value = 1;
    });
  }
};
//上传回调
window['endUploadphoto'] = (res: string) => {
  // 安卓上传完毕回调
  let obj = JSON.parse(res);
  if (obj.code == 1) {
    if (AndroidType.value == 'talkPhoto') {
      // alert('talkPhoto1')
    } else if (AndroidType.value == 'endRecordAudio') {
      if (questNO.value == 11) {
        alert(questNO.value);
        alert(obj.path + 'endRecordAudio1');
        state.mocaList[0].playRecord = obj.path;
        audioUrl.value = obj.path;
      }
    }
  } else {
    if (AndroidType.value == 'talkPhoto') {
      alert('talkPhoto2');
    } else if (AndroidType.value == 'endRecordAudio') {
      alert('endRecordAudio2');
    }
  }
}
const isShow = ref(true);
const timer = ref();
//定时器
const timeTap = (val: number) => {
  console.log('开始');
  askQuestionList.value[val].children[0].rightValue = true;
  console.log(val);
  if (minOut.value == 0) {
    message.error('倒计时已结束')
    minOutDisable.value = false
    nextDisable.value = true
  } else {
    minOutDisable.value = true;
    nextDisable.value = false
    isShow.value = false;
    setCountTimeMin();
  }
};
//暂停
const notTime = () => {
  console.log('暂停', minOut.value);

  if (minOut.value == 0) {
    console.log('000');
    minOutDisable.value = false;
    isShow.value = false;
    message.error('倒计时已结束');
    nextDisable.value = true
  } else {
    nextDisable.value = true
    isShow.value = true;
    clearTimeout(timer.value);
  }
};
//开始倒计时
const setCountTimeMin = () => {
  timer.value = setInterval(() => {
    if (minOut.value == 0) {
      isShow.value = true;
      minOutDisable.value = false;
      minOut.value = 0;
      clearTimeout(timer.value);
      nextDisable.value = true
    } else {
      minOut.value -= 1;
    }
  }, 1000);
};

//备注
const remarkTap = () => {
  remarkVisible.value = true
  remarkBtn.value = true
}

const remarkInt = (e: any) => {
  remarkText.value = e.currentTarget.value;
}

const handleOk = () => {
  remarkVisible.value = false
  remarkBtn.value = false
  const answerData = JSON.parse(state.mocaAllDataList)
  answerData[questNO.value].children[0].remark = remarkText.value
  state.getMocaAllDataList(JSON.stringify(answerData))
  remarkText.value = ''
}
const handleCancel = () => {
  remarkBtn.value = false
  remarkVisible.value = false
  remarkText.value = ''
}

const back = () => {
  router.push({
    path: '/servicePack',
    query: {
      ticketCode: route.query.ticketCode
    }
  });
};

const start = () => {
  visible.value = false;
  visibleNext.value = true;
  taskStart.value = false;
};
const next = () => {
  visible.value = false;
  visibleNext.value = false;
  taskStart.value = true;
};

//上一题
const dec = debounce(
  () => {
    loading.value = true
    if (questNO.value > 0) {
      myCarousel.value.prev()
      questNO.value = questNO.value -= 1
      nextDisable.value = true
      let timer = setTimeout(() => {
        minOutDisable.value = false
        loading.value = false
        clearTimeout(timer)
      }, 1000)
      if (questNO.value == 14 || questNO.value == 15) {
        isShow.value = true
      }
    }
  }, 300, false);

  //全局入参
  let newArr: Array<{
        answers:  string,
        estimateNum:  string,
        imgUrl: string,
        isRight: Number,
        playRecord: string,
        questionId: Number,
        remark: string,
        score: Number,
        sortIndex: Number,
        photoUrl:string
  }> = []
//下一题
const pro = debounce(
  () => {
    loading.value = true
    const answerData = JSON.parse(state.mocaAllDataList)
    answerData[questNO.value].children.forEach((item:any) => {
      newArr.push({
        answers:  item.answers,
        estimateNum:  item.estimateNum,
        imgUrl: item.imgUrl,
        isRight: item.isRight,
        playRecord: item.playRecord,
        questionId: item.questionId,
        remark: item.remark,
        score: item.score,
        sortIndex: item.sortIndex,
        photoUrl:item.photoUrl
      })
    })
    
    playTap('', false);
    playBtn.value = false
    if (questNO.value == 13 || questNO.value == 14) {
      isShow.value = true;
    }
    if (questNO.value == 15 || questNO.value == 11 || questNO.value == 12) {
      nextDisable.value = true
    }
    if (nextDisable.value == true) {
      //提交每题答案
        if (newArr.length>0) {
          if (questNO.value == 11) {
            if(newArr[0].answers == ''){
              newArr[0].isRight = 0
              newArr[0].score = 1
            }
          }
          if (questNO.value == 12) {
            if(newArr[0].answers == ''){
              newArr[0].isRight = 1
              newArr[0].answers = 'a|b|c|d|e'
            }
          }
          console.log(newArr)
          checkList()
          if (isBreak.value == true) {
            if (questNO.value == 15) {
              nextDisable.value = true
            }else {
              newArr=[]
              nextDisable.value = false;
              message.error('请完成全部题目！')
              let timer = setTimeout(() => {
                loading.value = false
                clearTimeout(timer)
              }, 1000)
              return false
            }
          }
        }
        if (questNO.value != 15) {
          getUrlApi()
        }else{
          newArr=[]
          myCarousel.value.next()
          questNO.value = questNO.value += 1
          let timer = setTimeout(() => {
            loading.value = false
            clearTimeout(timer)
          }, 1000)
          if (questNO.value == 16) {
            const answerData = JSON.parse(state.mocaAllDataList)
            let arr = answerData[questNO.value].children.filter((item: any) => item.isRight ==='')
            if(arr.length > 0){
              nextDisable.value = false;
            }else{
              nextDisable.value = true;
            }
          }
        }
    } else {
      newArr=[]
      message.error('请完成全部题目！');
      let timer = setTimeout(() => {
        loading.value = false
        clearTimeout(timer)
      }, 1000)
    }
  }, 300, false);


//校验
const checkList = () => {
  let arr = newArr.filter((item: any) => item.isRight ==='')
  if (arr.length > 0) {
    console.log('进来判断---------------')
    isBreak.value = true;
  } else {
    isBreak.value = false;
  }
};

//请求接口
const getUrlApi = () => {
  sedResultAPI(newArr as any).then(res => {
    if (res.code === 200) {
      if (questNO.value == 14) {
        minOutDisable.value = false
      }
      if (newArr[0].questionId == 19) {
        router.push({
          path: '/mocaResult',
          query: {
            archivesNo: state.QueryProData.clientId,
            estimateNum: state.estimateNum,
            ticketCode: route.query.ticketCode
          }
        })
      }
      myCarousel.value.next();
      questNO.value = questNO.value += 1;
      let timer = setTimeout(() => {
        loading.value = false
        clearTimeout(timer)
      }, 1000)
      remarkText.value = ''
      remarkBtn.value = false
      const answerData = JSON.parse(state.mocaAllDataList)
      let arr = answerData[questNO.value].children.filter((item: any) => item.isRight ==='')
      if(arr.length > 0){
        nextDisable.value = false;
      }else{
        nextDisable.value = true;
      }
      newArr=[]
    }else{
      let timer = setTimeout(() => {
        loading.value = false
        clearTimeout(timer)
      }, 1000)
      newArr=[]
    }
  })
}
</script>

<style lang="less" scoped>
.moca-con {
  padding: 30px;

  .back {
    width: 60px;
    height: 60px;

    img {
      display: block;
      width: 60px;
      height: 60px;
    }
  }

  .title {
    width: 80%;
    height: 200px;
    margin: 100px auto;
    font-size: 69px;
    text-align: center;
    font-family: SourceHanSansCN-Heavy, SourceHanSansCN;
    font-weight: 800;
    color: #1f2e54;
    line-height: 105px;
  }

  .button {
    width: 386px;
    height: 80px;
    background: #3d7eff;
    border-radius: 40px;
    margin: 30px auto 0px;
    color: #fff;
    font-size: 32px;
    line-height: 80px;
    text-align: center;
  }
}

.desk {
  img {
    width: 100%;
    height: 100%;
  }
}

.desk2 {
  width: 100%;
  height: 100vh;
  position: fixed;
  background-color: #fff;
  opacity: 0.2;
  z-index: 999;
}

.taskBox {
  width: 100vw;
  height: 100vh;
  background-color: #efefef;
  border: 1px solid #efefef;
  position: relative;
  overflow: hidden;
  flex-direction: column;
  display: flex;

  .topBox {
    width: 95%;
    height: 65%;
    margin: 20px auto;

    .pro-btn {
      width: 88px;
      height: 50px;
      position: absolute;
      bottom: 13%;

      img {
        display: block;
        width: 88px;
        height: 50px;
      }
    }

    .left {
      left: 10%;
    }

    .right {
      right: 10%;

      .btn {
        width: 140px;
        height: 50px;
        background: #5765fe;
        border-radius: 42px;
        color: #fff;
        font-size: 16px;
        text-align: center;
        line-height: 50px;
        font-weight: bold;
      }
    }

    .task-con {
      height: 555px;

      .task-biger {
        width: 100%;
        height: 100%;
        background-color: #fff;
        border-radius: 20px;
        border: 1px solid #fff;
        position: relative;
        box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.12);

        .train-box {
          padding: 30px;
          height: 100%;

          .train {
            width: 300px;
            height: 60px;
            font-size: 60px;
            font-weight: 800;
            color: #5c7088;
            line-height: 90px;
            letter-spacing: 1px;
          }

          .train-text {
            width: 80%;
            height: 100px;
            margin: 10% auto;
            text-align: center;
            font-size: 45px;
            font-weight: bold;
            color: #5c7088;
            line-height: 81px;
            text-decoration: underline;
          }
        }
      }

      .time_num {
        position: absolute;
        top: 10px;
        left: 20px;
        width: 100px;
        height: 60px;
        background: #ff1212;
        border-radius: 69px;
        text-align: center;
        border: 1px solid #e4e4e4;
        font-size: 35px;
        font-weight: bold;
        color: #fff;
        line-height: 60px;
      }
    }
  }

  .botBox {
    width: 100%;
    height: 23%;
    background-color: #fff;
    box-shadow: 0rem 0rem 0.44rem 0rem rgba(0, 0, 0, 0.12);
    padding: 0px 30px 0px 30px;
    margin-top: 60px;

    .out {
      width: 75px;
      height: 75px;
      margin-top:10px;
      float: left;

      img {
        display: block;
        width: 75px;
        height: 75px;
      }
    }

    .btn-list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 70%;
      height: 60px;
      margin: 20px auto 0px;

      .pro-btn {
        width: 88px;
        height: 50px;

        img {
          display: block;
          width: 88px;
          height: 50px;
        }
      }

      .pro-list {
        display: flex;
        justify-content: space-around;
        align-items: center;

        .p-btn {
          width: 90px;
          height: 50px;

          img {
            display: block;
            width: 50px;
            height: 50px;
            margin: auto;
          }
        }
      }
    }

    .bot-title {
      width: 100%;
      height: 55px;
      margin: auto;
      // overflow: hidden;
      line-height: 25px;
      color: #222;
      font-size: 16px;
      font-weight: 400;
      .title-box{
        width: 100%;
        height: 55px;
        text-align: center;
        .title-smll{
          width:80%;
          height: 30px;
          overflow: hidden;
        }
        .show-more{
          font-size: 14px;
          color:blue;
        }
      }
    }

    .bot-time {
      width: 272px;
      height: 40px;
      margin: auto;
      display: flex;

      .com {
        width: 136px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 22px;
        color: #555;
        font-weight: bold;
      }

      .bot-l {
        border-radius: 50px 0px 0px 0px;
        background: #fafafa;
      }

      .bot-r {
        border-radius: 0px 50px 0px 0px;
        background: #f0f1ff;
      }
    }
  }
}

.identity-verify {
  height: 150px;
  text-align: center;

  .area {
    width: 100%;
    height: 95%;
    padding: 5px;
    border: 0px;
  }

  .btn-list {
    display: flex;
    align-content: center;
    justify-content: space-between;
    margin-top: 80px;

    .out {
      padding: 5px 30px;
      border-radius: 20px;
      color: #5765fe;
      background: #ffffff;
      box-shadow: inset 0rem 0.06rem 0.44rem 0rem rgba(171, 154, 255, 0.5);
    }

    .active {
      padding: 5px 30px;
      border-radius: 20px;
      color: #fff;
      background: #5765fe;
    }
  }
}</style>
