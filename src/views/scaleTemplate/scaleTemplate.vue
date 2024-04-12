<template>
    <div class="moca-con" v-if="visible && route.query?.prefixPageText">
        <div class="back" @click="outPage">
            <img src="../../assets/images/moca/back.png" />
        </div>
        <div class="title">{{ route.query?.prefixPageText }}</div>
        <div class="button" @click="enterGuide">开始答题</div>
    </div>
    <div class="desk" v-if="visibleNext" @click="enterTopic">
        <img src="../../assets/images/moca/deskBg.png" />
    </div>
    <!----答题部分---->
    <div class="taskBox" v-if="taskStart">
        <!----- 题目上半部 ---->
        <div class="topBox">
            <a-carousel :autoplay="false" arrows :dots="false" :swipe="false" ref="myCarousel" :afterChange="afterChangeNo">
                <div class="task-con" v-for="(item, index) in askQuestionList" :key="index">
                    <component :is="templateEnum[item.patternRule]" :questionLangth="askQuestionList.length"
                        :optionData="item" @changeNextStatus="changeNextDisable" :questionNum="questNO"
                        :playOutBtn="playOutBtn" @showImage="changeImageUrl" :topicIndex="index" @playAudio="playAudio"
                        @nextTopic="nextBtn" @prevTopic="previousBtn">
                    </component>
                </div>
            </a-carousel>
        </div>
        <!----- 操作下半部 ---->
        <!-- 自评 -->
        <div class="operate-box" v-if="askQuestionList[questNO].evaluationType === 1">
            <img class="out-btn" v-if="route.query?.status !== 'modify'" src="../../assets/images/AD-8/out_btn.png"
                @click="outVisible = true" alt="" />
            <img class="btn-img" v-if="questNO > 0" src="../../assets/images/AD-8/prev_btn.png" @click="previousBtn"
                alt="" />
            <div class="btn-img" v-if="questNO == 0 && route.query?.status !== 'modify'"></div>
            <div class="btn-img submit-btn" v-if="questNO == 0 && route.query?.status === 'modify'" @click="cancelModify">
                取消修改</div>
            <img class="play-audio" @click="playAudio(askQuestionList[questNO].voicePath, !playBtn, 0)"
                :src="playBtn == true ? getAssetsFile('p4Active.gif') : getAssetsFile('p4Active.png')" alt="" />
            <img class="btn-img" @click="nextBtn"
                v-if="askQuestionList[questNO].answers && route.query?.status !== 'modify'"
                src="../../assets/images/AD-8/next_btn.png" alt="" />
            <img class="btn-img" @click="nextBtn"
                v-if="!askQuestionList[questNO].answers && route.query?.status !== 'modify'"
                src="../../assets/images/AD-8/next_btn_disable.png" alt="" />
            <div class="btn-img submit-btn submit-btn-no"
                v-if="questNO == askQuestionList.length - 1 && !askQuestionList[questNO].answers && route.query?.status === 'modify'">
                {{ route.query?.status !== 'modify' ? '提交' : '确认修改' }}
            </div>
            <div class="btn-img submit-btn" @click="nextBtn"
                v-if="questNO == askQuestionList.length - 1 && askQuestionList[questNO].answers && route.query?.status === 'modify'">
                {{ route.query?.status !== 'modify' ? '提交' : '确认修改' }}
            </div>

            <div class="tips-box">
                <div class="schedule">{{ askQuestionList[questNO].questionIndex }}/{{ askQuestionList[questNO].questionNum
                }}</div>
                <div class="time">{{ timeStr }}</div>
            </div>
        </div>
        <!-- 他评 -->
        <div class="botBox" v-if="askQuestionList[questNO].evaluationType === 2">
            <!------ 题目切换 - 退出 ---->
            <Transition name="fade">
                <div class="pro-btn left" :class="route.query?.status === 'modify' ? 'modify-left' : ''"
                    @click="previousBtn" v-if="questNO > 0">
                    <!-- <img src="../../assets/images/moca/prev.png" /> -->
                    <img
                        :src="askQuestionList[questNO].patternRule == 'time_question' && askQuestionList[questNO].minOutDisable ? getAssetsFile('prevGray.png') : getAssetsFile('prev.png')" />
                </div>
            </Transition>
            <Transition name="fade">
                <div class="pro-btn left cancel-modify" @click="cancelModify"
                    v-if="questNO === askQuestionList.length - 1 && route.query?.status === 'modify'">取消修改</div>
            </Transition>
            <div class="pro-btn right" @click="nextBtn">
                <div>
                    <div class="btn" v-if="askQuestionList[questNO].affiliation">进入题目</div>
                    <div class="btn" v-else-if="questNO == askQuestionList.length - 1 && route.query?.status === 'modify'">
                        {{ route.query?.status === 'modify' ? '确认修改' : '提交' }}
                    </div>
                    <img v-else
                        :src="askQuestionList[questNO].isSkip === 1 || askQuestionList[questNO].nextDisable ? getAssetsFile('next.png') : getAssetsFile('nextGray.png')" />
                </div>
            </div>

            <div class="out" v-if="route.query?.status !== 'modify'" @click="outVisible = true"><img
                    src="../../assets/images/moca/out.png" /></div>
            <div class="btn-list">
                <div class="pro-list">
                    <div class="p-btn" v-if="((askQuestionList[questNO].menu as any) & playNo) == playNo"
                        @click="playAudio(askQuestionList[questNO].voicePath, !playBtn, 0)"><img
                            :src="playBtn ? getAssetsFile('p4Active.gif') : getAssetsFile('p4Active.png')" /></div>
                    <div class="p-btn" v-if="((askQuestionList[questNO].menu as any) & remarkNo) == remarkNo"
                        @click="remarkTap">
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
                    <!-- p6Active.png -->
                    <div class="p-btn" v-if="((askQuestionList[questNO].menu as any) & atNo) == atNo"
                        @click="antoTap(typeAudo)">
                        <img :src="atBtn ? getAssetsFile('p3Active.gif') : getAssetsFile('p3Active.png')" />
                        <span v-if="askQuestionList[questNO].playRecord && !atBtn"></span>
                    </div>
                    <div class="p-btn" v-if="((askQuestionList[questNO].menu as any) & timeNo) == timeNo" @click="timeTap">
                        <img
                            :src="!!askQuestionList[questNO].minOutDisable ? getAssetsFile('p2Active.gif') : getAssetsFile('p2Active.png')" />
                    </div>
                    <div class="p-btn small" v-if="askQuestionList[questNO].abbreviatedContent"
                        @click="changeTipText(!askQuestionList[questNO].showMore)">
                        <img :src="!askQuestionList[questNO].showMore ? getTemplateFile('up') : getTemplateFile('down')"
                            alt="" />
                        <p>{{ textStr }}</p>
                    </div>
                </div>
                <!-- 倒计时 -->
                <div class="time_num" v-if="countShow">{{ minOut }}<span>s</span></div>
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
                <div class="com bot-l">{{ askQuestionList[questNO].questionIndex }}/{{ askQuestionList[questNO].questionNum
                }}</div>
                <div class="com bot-r">{{ timeStr }}</div>
                <!-- <div class="assessor-info-control" v-if="askQuestionList[questNO].abbreviatedContent"
                    @click="changeTipText(!askQuestionList[questNO].showMore)">{{ textStr }}<img
                        :src="!askQuestionList[questNO].showMore ? getTemplateFile('expand') : getTemplateFile('retract')"
                        alt="" /></div> -->
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
                <a-button class="out" @click="outPage">仍然退出</a-button>
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

    <!-------保存录音------->
    <div class="desk2" v-if="atNoVisible">
        <div class="identity-verify">
            <div>提示</div>
            <h3>录音时长不可超过30分钟，已为您自动暂停保存!</h3>
            <div class="btn-list">
                <!-- <a-button class="out" @click="atNoClose">取消</a-button> -->
                <a-button class="active" @click="atNoSure">确定</a-button>
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
import { computed, onMounted, onUnmounted, ref, shallowReactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useState } from '@/stores/state';
import { getQuestionList, addQuestionResult, saveScaleResult, getItemAnswerDetails } from '@/apis/scaleTemplate/index';
import { getEstimateNumApi } from '@/apis/moca_game/index';
import { GetQuestionListResData, AddQuestionResultReqItem } from '@/apis/scaleTemplate/type';
import gossiPicture from './components/canvasTask/gossiPicture.vue'; //画图第一题
import cubePicture from './components/canvasTask/cubePicture.vue'; //画图第二题
import watchesPicture from './components/canvasTask/watchesPicture.vue'; //画图第三题
import judgment from './components/canvasTask/judgment.vue'; //判断题//3-2,7,8,13,15-2,17
import judgmentPicture from './components/canvasTask/judgmentPicture.vue'; //判断题//3-2,7,8,13,15-2,17
import pictureQuestion from './components/canvasTask/pictureQuestion.vue'; //图片题4,5,6
import chooseQuestion from './components/canvasTask/chooseQuestion.vue'; //选择题11
import textChooseQution from './components/canvasTask/textChooseQution.vue'; //文字选择题16
import decQuestion from './components/canvasTask/decQuestion.vue'; //数字相减题12
import timeQuestion from './components/canvasTask/timeQuestion.vue'; //倒计时题14
import neuropsychiatric from './components/canvasTask/neuropsychiatric.vue'; //神经题
import reciteQuestion from './components/canvasTask/reciteQuestion.vue'; //数字广泛
import training from './components/canvasTask/training.vue'; //练习题
import radioQuestion from './components/canvasTask/radioQuestion.vue';
import { talkPhoto, startRecordAudio, endRecordAudio } from '@/utils/voice';
import { debounce } from '@/utils/tools';
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
    onceTimeStatus?: boolean;
}

const route = useRoute();
const router = useRouter();
const state = useState();
state.carouselIndex = 0;
if (route.query?.status !== 'modify') {
    state.gaugeTime = 0;
}

onMounted(() => {
    if (route.query?.status !== 'modify') {
        getEstimateNum();
    } else {
        getItemQuestion();
    }
});

onUnmounted(() => {
    clearInterval(timeKey);
    clearInterval(timeSoundKey);
});

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
        loading.value = false;
        if (res.code === 200) {
            console.log(res);
            state.getEstimateNum(res.data);
            if (!route.query?.prefixPageText) {
                enterTopic();
            }
        }
    });
};

const getItemQuestion = () => {
    loading.value = true;
    getItemAnswerDetails({ estimateNum: state.estimateNum, questionIndex: Number(route.query.questionIndex) }).then(res => {
        console.log(res);
        if (res.code === 200) {
            askQuestionList.value = res.data;
            for (let i = 0; i < askQuestionList.value.length; i++) {
                askQuestionList.value[i].remarkText = askQuestionList.value[i].remark;
            }
        }
        visible.value = false;
        visibleNext.value = false;
        taskStart.value = true;
        loading.value = false;
        setCountTime();
    });
};

interface templateEnumType {
    [key: string]: any;
}
const templateEnum: templateEnumType = shallowReactive({
    gossi_picture: gossiPicture,
    cube_picture: cubePicture,
    watches_picture: watchesPicture,
    jud_gment: judgment,
    picture_question: pictureQuestion,
    choose_question: chooseQuestion,
    textchoose_Qution: textChooseQution,
    dec_question: decQuestion,
    time_question: timeQuestion,
    radio_question: radioQuestion,
    training_question: training,
    judgment_picture: judgmentPicture,
    neuropsy_chiatric: neuropsychiatric,
    recite_question: reciteQuestion
});
console.log(templateEnum);
const timeStr = computed(() => {
    // 计算时间格式转换
    return handleTime(state.gaugeTime);
});
const textStr = ref<string>('查看提示');
const atNoVisible = ref<boolean>(false); //是否保存录音弹窗
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
let timeSoundKey: NodeJS.Timeout;
//录音计时30分钟
const setAudioTime = () => {
    // 录音计时
    timeSoundKey = setInterval(() => {
        state.audioTime += 1;
        if (Math.floor(state.audioTime / 60) % 60 >= 30) {
            atNoVisible.value = true;
            atBtn.value = false;
            clearInterval(timeSoundKey);
        }
    }, 1000);
};

const minOut = ref<any>(60); //一分钟倒计时时间
const countShow = ref<boolean>(false); //一分钟倒计时时间
const timeCutdown = ref<boolean>(true); //一分钟倒计时时间

//定时器
const timeTap = () => {
    if (route.query?.status === 'modify') return message.warning('修改题目无法开启倒计时');
    if (!askQuestionList.value[questNO.value].minOutDisable) {
        if (minOut.value == 0) {
            countShow.value = false;
            askQuestionList.value[questNO.value].minOutDisable = false;
            askQuestionList.value[questNO.value].nextDisable = true;
            message.warning('请不要重复做答');
        } else {
            setCountTimeMin();
        }
    } else {
        notTime();
    }
};
//暂停
const notTime = () => {
    if (minOut.value == 0) {
        countShow.value = false;
        askQuestionList.value[questNO.value].minOutDisable = false;
        askQuestionList.value[questNO.value].nextDisable = true;
    } else {
        countShow.value = true;
        askQuestionList.value[questNO.value].nextDisable = false;
        askQuestionList.value[questNO.value].minOutDisable = false;
        clearTimeout(timer.value);
    }
};
//开始倒计时
const setCountTimeMin = () => {
    countShow.value = true;
    timeCutdown.value = false;
    askQuestionList.value[questNO.value].nextDisable = false;
    askQuestionList.value[questNO.value].minOutDisable = true;
    timer.value = setInterval(() => {
        if (minOut.value == 0) {
            clearTimeout(timer.value);
            countShow.value = false;
            timeCutdown.value = true;
            askQuestionList.value[questNO.value].nextDisable = true;
            askQuestionList.value[questNO.value].minOutDisable = false;
            askQuestionList.value[questNO.value].onceTimeStatus = true;
        } else {
            minOut.value -= 1;
        }
    }, 1000);
};

const changeNextDisable = (status: boolean, i = questNO.value) => {
    // 下一步按钮状态
    askQuestionList.value[i].nextDisable = status;
};

const outVisible = ref<boolean>(false); //退出弹窗
const remarkVisible = ref<boolean>(false); //备注弹窗

const imageUrl = ref<string>('');
const imageStatus = ref<boolean>(false);
const changeImageUrl = (url: string, status: boolean) => {
    imageUrl.value = url;
    imageStatus.value = status;
};

const myCarousel = ref<any>(); //实例走马灯
const askQuestionList = ref<QuestionList[]>([]); //所有题目数据
const questNO = ref<number>(0); //轮播图下标
const afterChangeNo = (current: number) => {
    questNO.value = current;
    loading.value = false;
};

const visible = ref<boolean>(true); // 进入页面引导图展示状态
const visibleNext = ref<boolean>(false); // 进入页面提示文案展示状态
const loading = ref<boolean>(false); // 提交loading状态
const taskStart = ref<boolean>(false); // 核心答题部分展示状态

// 0b1为语音播放，0b10添加备注，0b100拍照上传,0b1000为录音，0b10000为倒计时
const playNo = ref<number>(0b1); // 0b1为语音播放
const remarkNo = ref<number>(0b10); // 0b10添加备注
const photoNo = ref<number>(0b100); // 0b100拍照上传
const atNo = ref<number>(0b1000); // 0b1000为录音
const timeNo = ref<number>(0b10000); // 0b10000为倒计时

const typeAudo = ref<number>(1); //开始录音

//查看更多
const changeTipText = (status: boolean) => {
    if (status == true) {
        textStr.value = '收起提示';
    } else {
        textStr.value = '查看提示';
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

const playOutBtn = ref<boolean>(false); //语音按钮
const playBtn = ref<boolean>(false); //语音按钮
const remarkBtn = ref<boolean>(false); //备注按钮状态
const photoBtn = ref<boolean>(false); //拍照按钮
const atBtn = ref<boolean>(false); //录音按钮
const AndroidType = ref<string>(''); //类型

//录音
// const atNoClose = () => {
//     atNoVisible.value = false;
//     askQuestionList.value[questNO.value].playRecord = '';
// };
const atNoSure = () => {
    atNoVisible.value = false;
    soundRecording(2);
};

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
};

//语音播放  ---  val-语音绝对路径   bol控制语音播放暂停
const playAudio = (val: string, bol: boolean, num: number) => {
    let audioElement: HTMLAudioElement = document.getElementById('titleAudio') as HTMLAudioElement;

    if (num == 1) {
        playOutBtn.value = bol;
        playBtn.value = false;
    } else {
        playBtn.value = bol;
        playOutBtn.value = false;
    }
    if (bol) {
        audioElement.src = val;
        audioElement.load();
        audioElement.play();
        audioElement.addEventListener(
            'ended',
            () => {
                playBtn.value = false;
                playOutBtn.value = false;
            },
            false
        );
    } else {
        audioElement.pause();
    }
};
//语音播放  ---  val-语音绝对路径   bol控制语音播放暂停
// const playOutAudio = (val: string, bol: boolean) => {
//   console.log('000语音播放');

//   let audioElement: HTMLAudioElement = document.getElementById('titleAudio') as HTMLAudioElement;
//   playOutBtn.value = bol;
//   if (bol) {
//     audioElement.src = val;
//     audioElement.load();
//     audioElement.play();
//     audioElement.addEventListener(
//       'ended',
//       () => {
//         playOutBtn.value = false;
//       },
//       false
//     );
//   } else {
//     audioElement.pause();
//   }
// };

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

//录音
const antoTap = debounce(
    (type: number) => {
        state.audioTime = 0;
        soundRecording(type);
    },
    300,
    false
);

const soundRecording = (type: number) => {
    // 录音
    if (type == 1) {
        setAudioTime();
        atBtn.value = true;
        audioIdx.value = questNO.value;
        // 开始录音
        let obj = {
            id: Number(new Date()),
            project_code: 'scale/' + route.query.checkService + '/' + state.estimateNum
        };
        startRecordAudio(obj, () => {
            AndroidType.value = 'startRecordAudio';
            typeAudo.value = 2;
        });
    } else if (type == 2) {
        atBtn.value = false;
        // 停止录音
        let obj = {
            id: Number(new Date()),
            project_code: 'scale/' + route.query.checkService + '/' + state.estimateNum
        };
        endRecordAudio(obj, () => {
            AndroidType.value = 'endRecordAudio';
            clearInterval(timeSoundKey);
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

// 退出页面
const outPage = () => {
    router.push({
        path: '/servicePack',
        query: {
            ticketCode: route.query.ticketCode
        }
    });
};

const enterGuide = () => {
    if (route.query?.checkService == 'MoCA') {
        visible.value = false;
        visibleNext.value = true;
        taskStart.value = false;
    } else {
        enterTopic();
    }
};

// 进入题目
const enterTopic = () => {
    loading.value = true;
    // 获取单号，获取数据后计时
    getQuestionList({ estimateServerCode: route.query.checkService as string, questionIndex: '' }).then(res => {
        if (res.code === 200) {
            askQuestionList.value = res.data;
        }
        visible.value = false;
        visibleNext.value = false;
        taskStart.value = true;
        loading.value = false;
    });
    setCountTime();
};

// 下一题/提交--数据校验
const jumpCheck = (): boolean => {
    if (askQuestionList.value[questNO.value].isSkip === 1) {
        return true;
    }
    if (askQuestionList.value[questNO.value].evaluationType === 2) {
        if (askQuestionList.value[questNO.value].patternRule === 'time_question' && route.query?.status === 'modify') return true;
        return !!askQuestionList.value[questNO.value].nextDisable;
    }
    switch (askQuestionList.value[questNO.value].patternRule) {
        case 'radio_question':
            return radioQuestionCheck();
        case 'gossi_picture':
            return gossiPictureCheck();
        case 'cube_picture':
            return gossiPictureCheck();
        case 'watches_picture':
            return gossiPictureCheck();
        case 'jud_gment':
            return multiplePictureCheck();
        case 'neuropsy_chiatric':
            return radioQuestionCheck();
        default:
            break;
    }
    return true;
};
const multiplePictureCheck = (): boolean => {
    if (!askQuestionList.value[questNO.value].imgUrl) return false;
    return true;
};
const radioQuestionCheck = (): boolean => {
    if (!askQuestionList.value[questNO.value].answers) return false;
    return true;
};
const gossiPictureCheck = (): boolean => {
    if (!askQuestionList.value[questNO.value].imgUrl) return false;
    return true;
};
//上一题
const previousBtn = () => {
    if (askQuestionList.value[questNO.value].patternRule == 'time_question' && askQuestionList.value[questNO.value].minOutDisable) return message.warning('倒计时结束时即可跳转题目');
    if (atBtn.value) return message.warning('请结束录音后切换题目');
    if (!timeCutdown.value) return message.warning('倒计时结束时即可跳转题目');
    if (questNO.value === 0) return;
    loading.value = true;
    countShow.value = false;
    playAudio('', false, 0);
    setTimeout(() => {
        myCarousel.value.prev(); // 切换上一个轮播
    }, 150);
};

//下一题
const nextBtn = () => {
    if (atBtn.value) return message.warning(route.query?.status !== 'modify' ? '请结束录音后切换题目' : '请结束录音后确认修改');
    if (askQuestionList.value[questNO.value].patternRule == 'training_question') {
        playAudio('', false, 0);
        myCarousel.value.next();
    } else {
        loading.value = true;
        if (!jumpCheck()) {
            loading.value = false;
            message.warning('请先完成当前题目');
            return;
        }
        playAudio('', false, 0);
        if (askQuestionList.value[questNO.value].submitType == 0) return myCarousel.value.next();
        if (questNO.value > 0 && askQuestionList.value[questNO.value - 1].submitType == 0) {
            let submitData: AddQuestionResultReqItem[] = submitDataHandle(questNO.value - 1);
            submitAnswers(submitData, false);
        } else {
            let submitData: AddQuestionResultReqItem[] = submitDataHandle(questNO.value);
            submitAnswers(submitData);
        }
        // mini-cog 量变特殊处理
        if (route.query.checkService === 'Mini-cog' && questNO.value === 2 && route.query?.status !== 'modify') {
            let str = `请受试者回忆步骤一所说的三个名词。请在备注中记录下受试者的答案。【答案：${askQuestionList.value[0].answers}】`
            askQuestionList.value[askQuestionList.value.length - 1].abbreviatedContent = str;
            console.log(str, askQuestionList.value[askQuestionList.value.length - 1].abbreviatedContent)
        }
    }
};
// 提交接口入参请求
const submitDataHandle = (i: number): AddQuestionResultReqItem[] => {
    switch (askQuestionList.value[questNO.value].patternRule) {
        case 'radio_question':
            return radioQuestionHandle(askQuestionList.value[i]);
        case 'gossi_picture':
            return gossiPictureHandle(askQuestionList.value[i]);
        case 'cube_picture':
            return gossiPictureHandle(askQuestionList.value[i]);
        case 'watches_picture':
            return gossiPictureHandle(askQuestionList.value[i]);
        case 'jud_gment':
            return multiplePictureHandle(askQuestionList.value[i]);
        case 'picture_question':
            return multiplePictureHandle(askQuestionList.value[i]);
        case 'choose_question':
            return multiplePictureHandle(askQuestionList.value[i]);
        case 'dec_question':
            return radioQuestionHandle(askQuestionList.value[i]);
        case 'time_question':
            return radioQuestionHandle(askQuestionList.value[i]);
        case 'textchoose_Qution':
            return textChooseQuestionHandle(askQuestionList.value[i]);
        case 'judgment_picture':
            return multiplePictureHandle(askQuestionList.value[i]);
        case 'neuropsy_chiatric':
            return multipleChiatric(askQuestionList.value[i]);
        case 'recite_question':
            return multipleDc(askQuestionList.value[i]);
        default:
            return [];
    }
};
const radioQuestionHandle = (item: QuestionList): AddQuestionResultReqItem[] => {
    let data: AddQuestionResultReqItem[] = [];
    let dataItem: AddQuestionResultReqItem = {
        answers: item.answers as string,
        content: item.answers as string,
        contentIndex: item.contentIndex as number,
        estimateNum: state.estimateNum,
        imgUrl: '',
        isRight: 0,
        option: item.option as string,
        photoUrl: item.photoUrl,
        playRecord: item.playRecord,
        questionId: item.id,
        remark: item.remarkText || ''
    };
    data.push(dataItem);
    return data;
};
const gossiPictureHandle = (item: QuestionList): AddQuestionResultReqItem[] => {
    console.log(item);
    let data: AddQuestionResultReqItem[] = [];
    let dataItem: AddQuestionResultReqItem = {
        answers: item.answers as string,
        content: '',
        contentIndex: item.children[0].contentIndex,
        estimateNum: state.estimateNum,
        imgUrl: item.imgUrl,
        isRight: Number(item.children[0].wrongValue),
        option: '',
        photoUrl: item.photoUrl,
        playRecord: item.playRecord,
        questionId: item.id,
        remark: item.remarkText || ''
    };
    data.push(dataItem);
    return data;
};
//神经
const multipleChiatric = (item: QuestionList): AddQuestionResultReqItem[] => {
    let data: AddQuestionResultReqItem[] = [];
    item.children
        .filter((item: any) => item.isRight == 1)
        .forEach((val: any) => {
            data.push({
                content: val.content,
                isRight: val.isRight,
                answers: val.answers,
                contentIndex: val.contentIndex,
                estimateNum: state.estimateNum,
                imgUrl: item.imgUrl,
                option: val.option,
                photoUrl: item.photoUrl,
                playRecord: item.playRecord,
                questionId: item.id,
                remark: item.remarkText || '',
                sequence: val.sequence
            });
        });
    return data;
};
const multiplePictureHandle = (item: QuestionList): AddQuestionResultReqItem[] => {
    console.log(item, 'pppp');
    let data: AddQuestionResultReqItem[] = [];
    item.children.forEach((val: any) => {
        data.push({
            content: val.content,
            isRight: Number(val.wrongValue),
            answers: val.answers,
            contentIndex: val.contentIndex,
            estimateNum: state.estimateNum,
            imgUrl: item.imgUrl,
            option: '',
            photoUrl: item.photoUrl,
            playRecord: item.playRecord,
            questionId: item.id,
            remark: item.remarkText || ''
        });
    });
    return data;
};
//数字广度
const multipleDc = (item: QuestionList): AddQuestionResultReqItem[] => {
    console.log(item, 'pppp');
    let data: AddQuestionResultReqItem[] = [];
    let arrTwo = item.children.filter((item: any) => item.isRight != null);
    const ListNew = [...arrTwo];
    ListNew.forEach((val: any) => {
        data.push({
            content: val.content,
            isRight: val.isRight,
            answers: val.answers,
            contentIndex: val.contentIndex,
            estimateNum: state.estimateNum,
            imgUrl: '',
            option: '',
            photoUrl: '',
            playRecord: item.playRecord,
            questionId: item.id,
            remark: item.remarkText || ''
        });
    });
    return data;
};

//单选题
const textChooseQuestionHandle = (item: QuestionList): AddQuestionResultReqItem[] => {
    console.log(item, 'pppp');
    let data: AddQuestionResultReqItem[] = [];
    item.children.forEach((val: any) => {
        data.push({
            content: val.content,
            isRight: Number(val.rightValue),
            answers: val.answers,
            contentIndex: val.contentIndex,
            estimateNum: state.estimateNum,
            imgUrl: '',
            option: val.option,
            photoUrl: item.photoUrl,
            playRecord: item.playRecord,
            questionId: item.id,
            remark: item.remarkText || ''
        });
    });
    return data;
};

//请求接口-下一步-提交
const submitAnswers = (data: AddQuestionResultReqItem[], status = true) => {
    addQuestionResult(data).then(res => {
        if (res.code === 200) {
            if (!status) return !status;
            if (askQuestionList.value.length - 1 == questNO.value) {
                // 跳转结果页
                router.replace({
                    path: '/scaleResultTemplate',
                    query: {}
                });
                return !status;
            }
            nextTopic();
            if (askQuestionList.value[questNO.value + 1].patternRule == 'time_question') {
                if (minOut.value != 0 && minOut.value != 60) {
                    countShow.value = true;
                }
            }
        } else {
            loading.value = false;
        }
        return !status
    }).then(res => {
        if (res) {
            let submitData: AddQuestionResultReqItem[] = submitDataHandle(questNO.value);
            submitAnswers(submitData);
        }
    });
};
const nextTopic = () => {
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

        .small {
            display: block;

            p {
                color: #999;
                font-size: 10px;
                text-align: center;
            }

            img {
                display: block;
                width: 25px;
                height: 25px;
                margin: auto;
            }
        }
    }

    .time_num {
        position: fixed;
        bottom: 180px;
        right: 36.3%;
        width: 40px;
        background: #ff1212;
        border-radius: 69px;
        text-align: center;
        font-size: 14px;
        font-weight: bold;
        color: #fff;

        span {
            font-size: 12px;
        }
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

        .time {
            padding-right: 8px;
            box-sizing: border-box;
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

    .modify-left {
        left: 76px;
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
        top: 10px;
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

            .small {
                display: block;

                p {
                    color: #999;
                    font-size: 10px;
                    text-align: center;
                }

                img {
                    display: block;
                    width: 25px;
                    height: 25px;
                    margin: auto;
                }
            }
        }

        .time_num {
            position: fixed;
            bottom: 180px;
            right: 36.3%;
            width: 40px;
            background: #ff1212;
            border-radius: 69px;
            text-align: center;
            font-size: 14px;
            font-weight: bold;
            color: #fff;

            span {
                font-size: 12px;
            }
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
            padding-right: 7px;
            box-sizing: border-box;
        }
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
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
