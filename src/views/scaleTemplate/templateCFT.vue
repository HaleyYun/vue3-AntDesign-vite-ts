<template>
  <div class="moca-con" v-if="visible && route.query?.checkService == 'CFT'">
    <div class="back" @click="outPageBack">
      <img src="../../assets/images/moca/back.png" />
    </div>
    <div class="title">请预先准备量表内所有图片素材 供评估使用</div>
    <div class="button" @click="enterGuide">开始答题</div>
  </div>
  <!----答题部分---->
  <div class="taskBox" v-if="taskStart">
    <!----- 题目上半部 ---->
    <div class="topBox">
      <a-carousel :autoplay="false" arrows :dots="false" :swipe="false" ref="myCarousel" :afterChange="afterChangeNo">
        <div class="task-con" v-for="(item, index) in askQuestionList" :key="index">
          <component :is="templateEnum[item.patternRule]" ref="componentsRef" :id="'component' + index"
            :questionLangth="askQuestionList.length" :optionData="item" @showTime="timeTap" :str="route.query?.status"
            :namestr="'CFT'" :upStepImg="drawImg" @changeNextStatus="changeNextDisable" :questionNum="questNO"
            :playBtn="playBtn" @showImage="changeImageUrl" @checkCount="changeCount" @playAudio="playAudio"
            @nextTopic="nextBtn" @prevTopic="previousBtn">
          </component>
        </div>
      </a-carousel>
    </div>
    <!----- 操作下半部 ---->
    <div class="botBox" v-if="askQuestionList[questNO].evaluationType === 2">
      <!------ 题目切换 - 退出 ---->

      <div class="pro-btn left" @click="previousBtn" v-if="questNO > 0 || Number(route.query?.statusType) == 7">
        <img src="../../assets/images/moca/prev.png" />
      </div>
      <div class="pro-btn" style="left:8%;" @click="previousBtn"
        v-if="questNO === askQuestionList.length - 1 && route.query?.status === 'modify'">
        <img src="../../assets/images/moca/prev.png" />
      </div>
      <div class="pro-btn left cancel-modify" @click="cancelModify"
        v-if="questNO === askQuestionList.length - 1 && route.query?.status === 'modify'">取消修改</div>
      <div class="pro-btn right" @click="nextBtn">
        <div>
          <div class="btn" v-if="questNO == askQuestionList.length - 1 && route.query?.status === 'modify'">{{ '确认修改' }}
          </div>
          <img v-else
            :src="askQuestionList[questNO].nextDisable ? getAssetsFile('next.png') : getAssetsFile('nextGray.png')" />
        </div>
      </div>

      <div class="out" v-if="route.query?.status !== 'modify'" @click="outVisible = true"><img
          src="../../assets/images/moca/out.png" /></div>
      <div class="btn-list">
        <div class="pro-list">
          <div class="p-btn" v-if="((askQuestionList[questNO].menu as any) & timeCount) == timeCount" @click="timeTap">
            <img
              :src="askQuestionList[questNO].minOutDisable ? getAssetsFile('p1Active.gif') : getAssetsFile('p1Active.png')" />
          </div>
          <div class="p-btn" v-if="((askQuestionList[questNO].menu as any) & playNo) == playNo"
            @click="playAudio(askQuestionList[questNO].voicePath, !playBtn)"><img
              :src="playBtn ? getAssetsFile('p4Active.gif') : getAssetsFile('p4Active.png')" /></div>

          <div class="p-btn" v-if="((askQuestionList[questNO].menu as any) & remarkNo) == remarkNo" @click="remarkTap">
            <img
              :src="askQuestionList[questNO].remarkText ? getAssetsFile('p5Active.png') : getAssetsFile('p5Active.png')" />
            <span v-if="askQuestionList[questNO].remarkText"></span>
          </div>
          <div class="p-btn" v-if="((askQuestionList[questNO].menu as any) & photoNo) == photoNo"
            @click="photoTap(questNO)">
            <img
              :src="askQuestionList[questNO].photoUrl ? getAssetsFile('p6Active.png') : getAssetsFile('p6Active.png')" />
            <span v-if="askQuestionList[questNO].photoUrl"></span>
          </div>
        </div>
        <!-- 倒计时 -->
        <div class="time_num" v-if="countShow && askQuestionList[questNO].patternRule == 'cube_picture'">{{ timeNumber }}
        </div>
      </div>

      <div class="bot-title">
        <div class="title-box">
          <div v-if="!askQuestionList[questNO].showMore">
            {{ askQuestionList[questNO].content }}
          </div>
          <div v-if="askQuestionList[questNO].showMore">
            {{ askQuestionList[questNO].abbreviatedContent }}
          </div>
        </div>
      </div>
      <!-- 题号 -- 时间/倒计时 -->
      <div class="bot-time">
        <div class="com bot-l">{{ askQuestionList[questNO].questionIndex }}/{{ askQuestionList[askQuestionList.length -
          1].questionIndex }}</div>
        <div class="com bot-r">{{ timeStr }}</div>
        <div class="assessor-info-control" v-if="askQuestionList[questNO].abbreviatedContent"
          @click="changeTipText(!askQuestionList[questNO].showMore)">{{ textStr }}<img
            :src="!askQuestionList[questNO].showMore ? getTemplateFile('expand') : getTemplateFile('retract')" alt="" />
        </div>
      </div>
    </div>
  </div>

  <!-- 语音组件 -->
  <audio id="titleAudio" src="#"></audio>

  <!-- 下一步loading -->
  <div class="desk2" v-if="loading">
    <a-spin size="large" />
  </div>

  <!-------退出------->
  <div class="desk2" v-if="outVisible">
    <div class="identity-verify">
      <div>提示</div>
      <h3>你确定要退出当前操作吗？</h3>
      <div class="btn-list">
        <a-button class="out" @click="outPageBack">仍然退出</a-button>
        <a-button class="out" @click="outNo">无法作答</a-button>
        <a-button class="active" @click="outClose">返回操作</a-button>
      </div>
    </div>
  </div>

  <!-------备注------>
  <div class="desk2" v-if="remarkVisible">
    <div class="identity-verify identity-verify-remark">
      <div>备注</div>
      <a-textarea :maxlength="80" v-model:value="remarkText" class="area scale-textarea" show-count
        placeholder="请输入备注..." />
      <div class="btn-list">
        <a-button class="out" @click="handleCancel">取消</a-button>
        <a-button class="active" @click="handleOk">确定</a-button>
      </div>
    </div>
  </div>

  <!-----CFT评分----->
  <a-modal class="CFT" v-model:visible="cftVisible" :closable="false" @cancel="changeCount(false, '')" :footer="null"
    centered>
    <div class="sr-box">
      <div class="box-header">{{ textStrCft }}</div>
      <div class="content-box">
        <div v-for="(item, index) in listArr" @click.stop="chooseList(item.score, index)" :key="index" class="list-con">
          <!-- :class="currentIndex === index ? 'active-list' : ''"> -->
          <span>+{{ item.score }}</span>
          <span class="detail">{{ item.des }}</span>
        </div>
      </div>
    </div>
  </a-modal>

  <!-------延迟评分------>
  <div class="desk2" v-if="timeOutMin">
    <div class="identity-verify identity-verify-remark">
      <div>提示</div>
      <h3>下一题为延迟类题目，请在20分钟后继续作答</h3>
      <div class="btn-list">
        <!-- <a-button class="out" @click="outClose">取消</a-button> -->
        <a-button class="active" @click="outPage">确定</a-button>
      </div>
    </div>
  </div>

  <!------提示修改------>
  <div class="desk2" v-if="timeNo">
    <div class="identity-verify identity-verify-remark">
      <div>提示</div>
      <h3>请在提交页面修改第一题和第二题！</h3>
      <div class="btn-list">
        <a-button class="active" @click="outPage">确定</a-button>
      </div>
    </div>
  </div>


  <!-- 查看图片 -->
  <a-modal style="width: auto" v-model:visible="imageStatus" :closable="false" @cancel="changeImageUrl('', false)"
    :footer="null" centered>
    <img style="max-width: 70vw; max-height: 70vh" :src="imageUrl" />
  </a-modal>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, shallowReactive, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useState } from '@/stores/state';
import { getQuestionList, addQuestionResult, saveScaleResult, getItemAnswerDetails, renegingScale } from '@/apis/scaleTemplate/index';
import { getEstimateNumApi } from '@/apis/moca_game/index';
import { GetQuestionListResData, AddQuestionResultReqItem } from '@/apis/scaleTemplate/type';
import { debounce } from '@/utils/tools';
import cubePicture from './components/canvasTask/cubePicture.vue';
import pictureEmpty from './components/cftTask/pictureEmpty.vue';
import { talkPhoto } from '@/utils/voice';
import { message } from 'ant-design-vue';


interface QuestionList extends GetQuestionListResData {
  [x: string]: any;
  remarkText?: string;
  answers?: string;
  option?: string | null;
  contentIndex?: number;
  nextDisable?: boolean;
  showMore?: boolean;
  minOutDisable?: boolean;
  timeCount?: number
}
const route = useRoute();
const router = useRouter();
const state = useState();
state.carouselIndex = 0;
if (route.query?.status !== 'modify') {
  if (Number(route.query?.statusType) == 7) {
    state.gaugeTime = Number(route.query.timeCount)
  } else {
    state.gaugeTime = 0;
  }
}

const askQuestionList = ref<QuestionList[]>([]); //所有题目数据

const questionId = ref<number>(2)
const questNO = ref<number>(0); //轮播图下标
const componentsRef = ref<any>([]);
onMounted(() => {
  if (route.query?.status != 'modify') {
    if (Number(route.query?.statusType) != 7) {
      getEstimateNum()
    } else {
      //倒计时20分钟后继续答题
      state.getEstimateNum(route.query.estimateNum)
      enterTopic()
    }
  } else {
    getItemQuestion(Number(route.query.questionIndex));
  }
});

onUnmounted(() => {
  clearInterval(timeKey);
  clearInterval(timer.value);
});

//CFT评分
const currentIndex = ref<number>()
const listArr = ref<any>([
  { score: 2, des: "图形完整 + 位置准确" },
  { score: 1, des: "图形不完整 + 位置准确" },
  { score: 1, des: "图形完整 + 位置不准确" },
  { score: 0.5, des: "图形尚可认出 + 位置不准确" },
  { score: 0, des: "图形不完整 + 位置不准确" }
])
const textStrCft = ref<string>('')
const changeCount = (status: boolean, str: string) => {
  cftVisible.value = status;
  textStrCft.value = str
};


const chooseList = (val: any, index: number) => {
  console.log(componentsRef.value[questNO.value + 1])
  componentsRef.value[questNO.value + 1].changeScore(val)
  currentIndex.value = index
  cftVisible.value = false;
}

const getEstimateNum = () => {
  loading.value = true;
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
  };
  getEstimateNumApi(data).then(res => {
    loading.value = false; enterTopic
    if (res.code === 200) {
      console.log(res);
      state.getEstimateNum(res.data);
      enterTopic()
    }
  });
};

const getItemQuestion = (val: number) => {
  getItemAnswerDetails({ estimateNum: state.estimateNum, questionIndex: val }).then(res => {
    console.log(res);
    if (res.code === 200) {
      askQuestionList.value = res.data;
      minOut.value = res.data[0].takeTime
      if (questionId.value > 0) {
        questionId.value -= 1
      }
      for (let i = 0; i < askQuestionList.value.length; i++) {
          askQuestionList.value[i].remarkText = askQuestionList.value[i].remark;
      }
    }
    visible.value = false;
    taskStart.value = true;
    loading.value = false;
    setCountTime();
  });
};

const drawImg = ref<string>(askQuestionList.value[questNO.value]?.imgUrl)

interface templateEnumType {
  [key: string]: any;
}
const templateEnum: templateEnumType = shallowReactive({
  cube_picture: cubePicture,
  picture_empty: pictureEmpty
});
console.log(templateEnum);
const timeStr = computed(() => {
  // 计算时间格式转换
  return handleTime(state.gaugeTime);
});

const timeNumber = computed(() => {
  // 计算时间格式转换
  if (askQuestionList.value[questNO.value].timeCount != undefined) {
    if (minOut.value < Number(askQuestionList.value[questNO.value].timeCount)) {
      minOut.value = askQuestionList.value[questNO.value].timeCount
    }
  }
  return handleTime(minOut.value);
});

const textStr = ref<string>('查看评估员提示');
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
  return `${hour}:${minute}:${second}`;
};

let timeKey: NodeJS.Timeout;
const setCountTime = () => {
  // 计时 -- 整个量表
  timeKey = setInterval(() => {
    state.gaugeTime += 1;
  }, 1000);
};
const minOut = ref<any>(0); //一分钟倒计时时间
const countShow = ref<boolean>(false); //一分钟倒计时时间

//定时器
const timeTap = () => {
  state.cftBol = !state.cftBol;
};
//暂停
const notTime = () => {
  countShow.value = true;
  if (askQuestionList.value.length != 0) {
    askQuestionList.value[questNO.value].minOutDisable = false;
  }
  clearTimeout(timer.value);
};
//开始倒计时
const setCountTimeMin = () => {
  countShow.value = true;
  if (askQuestionList.value.length != 0) {
    askQuestionList.value[questNO.value].minOutDisable = true;
  }
  timer.value = setInterval(() => {
    minOut.value += 1
  }, 1000)

};

const changeNextDisable = (status: boolean) => {
  // 下一步按钮状态
  if (askQuestionList.value[questNO.value].patternRule == 'picture_empty') {
    nextStep()
  } else {
    askQuestionList.value[questNO.value].nextDisable = status;
  }
};

const outVisible = ref<boolean>(false); //退出弹窗
const remarkVisible = ref<boolean>(false); //备注弹窗
const cftVisible = ref<boolean>(false); //CFT

const imageUrl = ref<string>('');
const imageStatus = ref<boolean>(false);
const changeImageUrl = (url: string, status: boolean) => {
  imageUrl.value = url;
  imageStatus.value = status;
};

const myCarousel = ref<any>(); //实例走马灯

const afterChangeNo = (current: number) => {
  questNO.value = current;
  minOut.value = askQuestionList.value[questNO.value].timeCount || 0;
  loading.value = false;
};

const visible = ref<boolean>(true); // 进入页面引导图展示状态
const loading = ref<boolean>(false); // 提交loading状态
const taskStart = ref<boolean>(false); // 核心答题部分展示状态

// 0b1为语音播放，0b10添加备注，0b100拍照上传,0b1000为录音，0b10000为倒计时
const playNo = ref<number>(0b1); // 0b1为语音播放
const remarkNo = ref<number>(0b10); // 0b10添加备注
const photoNo = ref<number>(0b100); // 0b100拍照上传
const timeCount = ref<number>(0b100000000); // 0b100000000计时器
const timeOutMin = ref<boolean>(false); // 延迟20分钟答第三题
const timeNo = ref<boolean>(false); // 延迟20分钟不让修改第二题

//查看更多
const changeTipText = (status: boolean) => {
  if (status == true) {
    textStr.value = '收起评估员提示';
  } else {
    textStr.value = '查看评估员提示';
  }

  askQuestionList.value[questNO.value].showMore = status;
};

// 获取assets静态资源
const getAssetsFile = (url: string) => {
  return new URL(`/src/assets/images/moca/${url}`, import.meta.url).href;
};

// 获取assets静态资源
const getTemplateFile = (url: string) => {
  return new URL(`/src/assets/images/scaleTemplate/${url}.png`, import.meta.url).href;
};

const playBtn = ref<boolean>(false); //语音按钮
const remarkBtn = ref<boolean>(false); //备注按钮状态
const photoBtn = ref<boolean>(false); //拍照按钮
const AndroidType = ref<string>(''); //类型


//无法作答
const outNo = () => {
  outVisible.value = true;
  let data = {
    archNo: state.QueryProData.clientId,
    estimateNum: state.estimateNum,
    riskLabel: 0,
    isUnableAnswer: true,
    riskLabelDesc: ''
  };
  saveScaleResult(data).then(res => {
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
  timeOutMin.value = false;
};

//语音播放  ---  val-语音绝对路径   bol控制语音播放暂停
const playAudio = (val: string, bol: boolean) => {
  let audioElement: HTMLAudioElement = document.getElementById('titleAudio') as HTMLAudioElement;
  playBtn.value = bol;
  if (bol) {
    audioElement.src = val;
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
    audioElement.pause();
  }
};

//拍照
const photoTap = (val: number) => {
  console.log(val);
  photoBtn.value = !photoBtn.value;
  // 调用相机进行拍照
  let data = {
    id: Number(new Date()),
    project_code: 'scale/' + route.query.checkService + '/' + state.estimateNum
  };
  talkPhoto(data, (res: any) => {
    console.log(res);
    AndroidType.value = 'talkPhoto';
  });
};

const audioIdx = ref<number | undefined>();
//上传回调
window['endUploadphoto'] = (res: string) => {
  // 安卓上传完毕回调
  let obj = JSON.parse(res);
  if (obj.code == 1) {
    if (AndroidType.value == 'talkPhoto') {
      askQuestionList.value[questNO.value].photoUrl = obj.path;
      askQuestionList.value[questNO.value].imgUrl = '';
    } else if (AndroidType.value == 'endRecordAudio') {
      askQuestionList.value[Number(audioIdx.value)].playRecord = obj.path;
    }
  } else {
    if (AndroidType.value == 'talkPhoto') {
      message.error('拍照上传失败');
    } else if (AndroidType.value == 'endRecordAudio') {
      message.error('录音上传失败');
    }
  }
};
const timer = ref();

//备注
const remarkText = ref<string>(''); // 0b10000为倒计时

const remarkTap = () => {
  remarkVisible.value = true;
  remarkBtn.value = true;
  remarkText.value = askQuestionList.value[questNO.value].remarkText || '';
};

const handleOk = () => {
  if (questNO.value < askQuestionList.value.length - 1 && askQuestionList.value[questNO.value].questionIndex == askQuestionList.value[questNO.value + 1].questionIndex) {
    askQuestionList.value[questNO.value + 1].remarkText = remarkText.value;
  }
  if (questNO.value > 0 && askQuestionList.value[questNO.value - 1].questionIndex == askQuestionList.value[questNO.value].questionIndex) {
    askQuestionList.value[questNO.value - 1].remarkText = remarkText.value;
  }
  askQuestionList.value[questNO.value].remarkText = remarkText.value;
  remarkVisible.value = false;
  remarkBtn.value = false;
};
const handleCancel = () => {
  remarkBtn.value = false;
  remarkVisible.value = false;
};

// 20分钟退出页面
const outPage = () => {
  if (Number(route.query?.statusType) === 7) {
    timeNo.value = false
  } else {
    renegingScale({ estimateNum: state.estimateNum, estimateServerCode: 'CFT', questionIndex: 2, archivesNo: state.QueryProData.clientId, timeCount: state.gaugeTime }).then(res => {
      console.log(res);
      if (res.code === 200) {
        router.push({
          path: '/servicePack',
          query: {
            ticketCode: route.query.ticketCode
          }
        })
      }
    });
  }
};

// 退出页面
const outPageBack = () => {
  minOut.value = 0;
  state.cftBol = false;
  router.push({
    path: '/servicePack',
    query: {
      ticketCode: route.query.ticketCode
    }
  })
};

const enterGuide = () => {
  visible.value = false;
  taskStart.value = true;
};

// 进入题目
const enterTopic = () => {
  loading.value = true;
  // 获取单号，获取数据后计时
  getQuestionList({ estimateServerCode: route.query.checkService as string, questionIndex: (Number(route.query.statusType) == 7 ? 3 : '') as string }).then(res => {
    if (res.code === 200) {
      askQuestionList.value = res.data;
    }
    if (Number(route.query?.statusType) == 7) {
      visible.value = false;
      taskStart.value = true;
    } else {
      visible.value = true;
      taskStart.value = false;
    }
    loading.value = false;
  });
  setCountTime();
};

// 下一题/提交--数据校验
const jumpCheck = (): boolean => {
  switch (askQuestionList.value[questNO.value].patternRule) {
    case 'cube_picture':
      return gossiPictureCheck();
    case 'picture_empty':
      return emptyCheck();
    default:
      break;
  }
  return true;
};
const gossiPictureCheck = (): boolean => {
  if (!askQuestionList.value[questNO.value].nextDisable) return false;
  return true;
};

const emptyCheck = (): boolean => {
  let count = 0;
  let arr: any = askQuestionList.value[questNO.value].answers
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] != undefined || arr[i] == 0) {
      count += 1;
    }
  }
  if (count == 18) {
    return true
  } else {
    return false
  }
};

//校验下一步
const nextStep = () => {
  let count = 0;
  let arr: any = askQuestionList.value[questNO.value].answers
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] != undefined || arr[i] == 0) {
      count += 1;
    }
  }
  if (count == 18) {
    askQuestionList.value[questNO.value].nextDisable = true
  }
  currentIndex.value = 6
};

//上一题
const previousBtn = debounce(
  () => {
    if (Number(route.query.statusType) == 7) {
      if (askQuestionList.value[questNO.value].patternRule == 'picture_empty') {
        countShow.value = true
        playAudio('', false);
        myCarousel.value.prev(); // 切换上一个轮播
      } else {
        timeNo.value = true
      }
    } else {
      if (askQuestionList.value[questNO.value - 1].patternRule == 'cube_picture') {
        countShow.value = true
      }

      if (askQuestionList.value[questNO.value - 1].patternRule == 'picture_empty') {
        state.cftBol = false
        askQuestionList.value[questNO.value].timeCount = minOut.value
      }
      if (questNO.value === 0) return;
      playAudio('', false);
      myCarousel.value.prev(); // 切换上一个轮播
    }
  },
  300,
  false
);

//下一题
const nextBtn = () => {
  loading.value = true;
  if (!jumpCheck()) {
    loading.value = false;
    message.warning('请先完成当前题目');
    return;
  }
  playAudio('', false);
  if (askQuestionList.value[questNO.value].submitType == 0) {
    drawImg.value = askQuestionList.value[questNO.value].imgUrl
    askQuestionList.value[questNO.value].timeCount = minOut.value 
    myCarousel.value.next()
    questNO.value = questNO.value += 1
    loading.value = false;
    state.cftBol = false
    askQuestionList.value[questNO.value-1].minOutDisable = false
    return;
  }

  if (questNO.value > 0 && askQuestionList.value[questNO.value - 1].submitType == 0) {
    let submitData: AddQuestionResultReqItem[] = submitDataHandle(questNO.value - 1);
    submitAnswers(submitData, false);
  } else {
    let submitData: AddQuestionResultReqItem[] = submitDataHandle(questNO.value);
    submitAnswers(submitData);

  }

};
// 提交接口入参请求
const submitDataHandle = (i: number): AddQuestionResultReqItem[] => {
  switch (askQuestionList.value[questNO.value].patternRule) {
    case 'cube_picture':
      return gossiPictureHandle(askQuestionList.value[i]);
    case 'picture_empty':
      return gossiPictureHandle(askQuestionList.value[i]);
    default:
      return [];
  }
};
const gossiPictureHandle = (item: QuestionList): AddQuestionResultReqItem[] => {
  console.log(item);
  let data: AddQuestionResultReqItem[] = [];
  let dataItem: AddQuestionResultReqItem = {
    answers: item.answers != null ? (item.answers as any).join(',') : null,
    content: '',
    contentIndex: item.children[0].contentIndex,
    estimateNum: state.estimateNum,
    imgUrl: item.imgUrl,
    isRight: Number(item.children[0].wrongValue),
    option: '',
    photoUrl: item.photoUrl,
    playRecord: item.playRecord,
    questionId: item.id,
    remark: item.remarkText || '',
    takeTime: minOut.value
  };
  data.push(dataItem);
  return data;
};
//请求接口-下一步-提交
const submitAnswers = (data: AddQuestionResultReqItem[], status = true) => {
  addQuestionResult(data).then(res => {
    if (res.code === 200) {
      state.cftBol = false;
      if (minOut.value != 0) {
        countShow.value = true
      }
      if (!status) return !status;
      if (askQuestionList.value.length - 1 == questNO.value) {
        // 跳转结果页
        router.replace({
          path: '/scaleResultTemplate',
          query: {}
        });
        return !status;
      }

      if (askQuestionList.value.length - 1 == questNO.value) {
        // 跳转结果页
        router.replace({
          path: '/scaleResultTemplate',
          query: {}
        });
        return;
      }
      askQuestionList.value[questNO.value].timeCount = minOut.value 

      if (questNO.value < 5 && askQuestionList.value[questNO.value + 1].patternRule == 'picture_empty') {
        askQuestionList.value[questNO.value + 1].imgUrl = askQuestionList.value[questNO.value].imgUrl
      }
      if (askQuestionList.value[questNO.value].patternRule == 'picture_empty' && questNO.value == 3) {
        if (Number(route.query.statusType) != 7) {
          setTimeout(() => {
            timeOutMin.value = true
          }, 500)
        }
        return;
      }
      nextTopic();
    } else {
      loading.value = false;
    }
  }).then(res => {
    if (res) {
      let submitData: AddQuestionResultReqItem[] = submitDataHandle(questNO.value);
      submitAnswers(submitData);
    }
  })
};
const nextTopic = () => {
  minOut.value = 0
  askQuestionList.value[questNO.value].minOutDisable = false
  setTimeout(() => {
    myCarousel.value.next(); // 切换下一个轮播
  }, 100);
};
const cancelModify = () => {
  router.replace({
    path: '/scaleResultTemplate',
    query: {}
  });
};

watch(() => state.cftBol, (newValue: boolean) => {
  console.log(newValue)
  if (newValue) {
    setCountTimeMin()
  } else {
    notTime()
  }
}, {
  deep: true,
  immediate: true
})
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

.timeOver {
  width: 300px;
  position: absolute;
  top: 20px;
  left: 30%;
}

.desk2 {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(#000, 0.2);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;

  .identity-verify {
    width: 839px;
    height: 258px;
    text-align: center;
    background: #ffffff;
    box-shadow: inset 0px 1 5px 0px rgba(133, 133, 133, 0.5);
    border-radius: 14px;

    div {
      height: 60px;
      background: #f4f6fb;
      box-shadow: inset 0px 1 6px 0px rgba(171, 154, 255, 0.5);
      border-radius: 14px 14px 0px 0px;
      font-size: 25px;
      font-family: PingFangSC, PingFang SC;
      font-weight: bold;
      color: #222222;
      line-height: 60px;
    }

    h3 {
      margin: 0;
      padding: 39px 0 44px 0;
      font-size: 21px;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      color: #262626;
      line-height: 29px;
    }

    .area {
      width: 504px;
      height: 146px;
      background: #f4f6fb;
      margin: 20px auto;
      border-radius: 14px;
      outline: none;
      border: none;
      padding: 15px 18px;
      box-sizing: border-box;
      font-size: 18px;
      position: relative;
    }

    .btn-list {
      width: 100%;
      padding-bottom: 27px;
      background-color: #fff;
      display: flex;
      align-content: center;
      justify-content: space-around;

      .out,
      .active {
        font-weight: bold;
        font-size: 25px;
        width: 231px;
        height: 59px;
        border-radius: 29px;
        border: none;
      }

      .out {
        color: #5765fe;
        background: #f4f6fb;
      }

      .active {
        color: #fff;
        background: #5765fe;
      }
    }
  }

  .identity-verify-remark {
    width: 572px;
    height: 338px;
  }
}

.taskBox {
  width: 100vw;
  height: 100vh;
  background-color: #efefef;
  border: 1px solid #efefef;
  position: relative;
  flex-direction: column;
  display: flex;
  overflow: hidden;

  .topBox {
    width: 100%;
    flex: 1;
    padding: 20px;
    background-color: #efefef;
    box-sizing: border-box;
    overflow: hidden;
    border-radius: 14px;

    .task-con {
      height: 100%;
      overflow-y: auto;
      background-color: #ffffff;
      border-radius: 14px;
    }
  }

  .operate-box {
    width: 100%;
    height: 130px;
    background: #ffffff;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    .out-btn {
      width: 66px;
      height: 66px;
      position: absolute;
      left: 28px;
      top: 32px;
    }

    .btn-img {
      width: 197px;
      height: 73px;
      margin: 0 178px;
    }

    .submit-btn {
      background-image: url(../../assets/images/AD-8/submit_btn.png);
      background-size: 100%;
      font-size: 28px;
      font-family: PingFang-SC-Bold, PingFang-SC;
      font-weight: bold;
      color: #ffffff;
      line-height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .submit-btn-no {
      background-image: url(../../assets/images/AD-8/submit_btn_no.png);
    }

    .play-audio {
      width: 60px;
      height: 60px;
      margin-bottom: 30px;
    }

    .tips-box {
      position: absolute;
      bottom: 0;
      width: 242px;
      height: 42px;
      background: #f0f1ff;
      border-radius: 33px 33px 0px 0px;
      display: flex;
      overflow: hidden;

      .schedule {
        background: #fafafa;
      }

      div {
        width: 50%;
        height: 100%;
        text-align: center;
        font-size: 20px;
        font-family: PingFang-SC-Bold, PingFang-SC;
        font-weight: bold;
        color: #555555;
        line-height: 42px;
      }
    }
  }

  .botBox {
    width: 100%;
    height: 228px;
    background-color: #fff;
    box-shadow: 0rem 0rem 0.44rem 0rem rgba(0, 0, 0, 0.12);
    position: relative;
    display: flex;
    flex-direction: column;

    .pro-btn {
      width: 88px;
      height: 50px;
      position: absolute;
      bottom: 155px;

      img {
        display: block;
        width: 88px;
        height: 50px;
      }
    }

    .cancel-modify {
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

    .left {
      left: 218px;
    }

    .right {
      right: 218px;

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

    .out {
      width: 75px;
      height: 75px;
      position: absolute;
      top: 18px;
      left: 28px;

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
      width: 65%;
      height: 44px;
      margin: 28px auto 0px;

      .pro-btn {
        width: 78px;
        height: 44px;

        img {
          display: block;
          width: 78px;
          height: 44px;
        }
      }

      .pro-list {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin: auto;

        .p-btn {
          width: 88px;
          height: 44px;
          position: relative;

          img {
            display: block;
            width: 44px;
            height: 44px;
            margin: auto;
          }
        }

        span {
          display: block;
          width: 10px;
          height: 10px;
          background: red;
          border-radius: 50%;
          position: absolute;
          top: 0px;
          right: 30px;
        }
      }

      .time_num {
        position: fixed;
        top: 50px;
        left: 135px;
        width: 100px;
        height: 60px;
        font-size: 28px;
        font-weight: bold;
        color: #000;
      }
    }

    .bot-title {
      width: 1070px;
      flex: 1;
      margin: 23px auto 0;
      line-height: 25px;
      color: #222;
      font-size: 16px;
      font-weight: 400;
      text-align: center;
    }

    .bot-time {
      width: 100%;
      height: 42px;
      margin: auto;
      display: flex;
      justify-content: center;
      position: relative;

      .assessor-info-control {
        width: 120px;
        height: 30px;
        background: #5765fe;
        border-radius: 37px;
        position: absolute;
        right: 371px;
        bottom: 5px;
        font-family: SourceHanSansCN, SourceHanSansCN;
        font-size: 11px;
        line-height: 16px;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 13px;
          height: 13px;
          position: relative;
          right: -2px;
        }
      }

      .com {
        width: 121px;
        height: 42px;
        text-align: center;
        line-height: 42px;
        font-size: 20px;
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

.sr-box {
  width: 450px;
  height: 400px;
  background: #fff;
  border-radius: 20px;
  margin: auto;

  .box-header {
    width: 100%;
    height: 50px;
    position: absolute;
    top:0;
    left:0;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    background-color: #F4F6FB;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    line-height: 50px;
    margin: auto;
  }


  .content-box {
    margin-top:50px;
    .list-con {
      height: 60px;
      background: #f4f6fb;
      box-shadow: inset 0rem 0.06rem 0.44rem 0rem rgba(171, 154, 255, 0.5);
      border-radius: 10px;
      padding: 0px 10px 0px 15px;
      margin-bottom: 15px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 40px;
      color: #5765fe;
      font-weight: bold;

      &:active {
        color: #fff;
        background: #5765fe;
      }

      .detail {
        font-weight: 400;
        font-size: 25px;
      }
    }

    .active-list {
      background: #5765fe;
      color: #fff;
    }
  }


}
</style>

<style>
.topBox>.ant-carousel,
.topBox>.ant-carousel .slick-slider,
.topBox>.ant-carousel .slick-slider>div,
.topBox>.ant-carousel .slick-slider .slick-track,
.topBox>.ant-carousel .slick-list .slick-slide>div {
  height: 100%;
}

.pop-up>.ant-modal-content {
  border-radius: 14px;
}

.pop-up>.ant-modal-content .ant-modal-header {
  padding: 12px 0;
  background: #f4f6fb;
  box-shadow: inset 0px 1 6px 0px rgba(171, 154, 255, 0.5);
}

.pop-up>.ant-modal-content .ant-modal-header .ant-modal-title {
  font-size: 25px;
  font-weight: bold;
  line-height: 36px;
}

.pop-up>.ant-modal-content .ant-modal-body {
  padding: 0;
}

.scale-textarea>.ant-input {
  background: #f4f6fb;
  outline: none;
  border: none;
}

.scale-textarea::after {
  position: absolute;
  bottom: 13px;
  right: 19px;
  font-size: 18px;
  color: #747474;
  line-height: 25px;
}
</style>
