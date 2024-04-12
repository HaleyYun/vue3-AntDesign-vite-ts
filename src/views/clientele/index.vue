<!-- 客户 -->
<script setup  lang='ts'>
import * as _ from 'lodash'
// import type { QueryDictionariesType } from "@/apis/dictionaries/type"
// import type { recordsBaseRequest } from "@/stores/types/type"
import type { recordType } from "@/apis/clientele/type"
import { CustomersNumCount } from "@/apis/clientele"
// import { QueryDictionaries } from "@/apis/dictionaries"
import { PlusCircleOutlined } from '@ant-design/icons-vue';
import { QueryClientList, GetRadar, GetRadarInfo } from "@/apis/clientele"
import { useClienteleData } from "@/stores/clienteleData"
import AbilityAnalysis from "./components/AbilityAnalysis.vue"
import SetMeal from "./components/SetMeal.vue"
import Synthesize from "./components/Synthesize.vue"
import { onMounted, ref, reactive, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import load from "../../components/load/load.vue";
import { smokingEnum,drinkingEnum,diet1Enum,diet2Enum,diet3Enum } from "../../enum/archivesEnum";


const ClienteleData = useClienteleData()
const router = useRouter()
// 搜索
const searchForm = reactive({
    // beginCreateDate: "",
    // endCreateDate: "",
    pageNum: 1,
    pageSize: 10,
    searchKey: ""
})
// 用户列表选择
const recordList = ref<any>([])
const currentRecordState = ref<number>(0)
const currentData = ref<recordType>()
const currentArchivesNo = ref<string>()
const RadarInfo = ref<any>({})
// const isUnfold = ref<boolean>(false)
const isHealth = ref<boolean>(false)

// 当前雷达
const statistics = ref<any>([])
const radarMapData = ref<any>([])
const lineData = ref<any>()
const total = ref<any>(0)
const echartsKey = ref(0)

// 认知功能能力分析状态
const capacityClassification = ref<number>(0)
const capacitylist = ref<any>([
    { name: '综合能力', key: 'all', max: 10 },
    { name: '记忆力', key: 'memoryScoreHistory', max: 10 },
    { name: '言语理解', key: 'languageAbilityScoreHistory', max: 10 },
    { name: '数据逻辑', key: 'mathematicalLogicScoreHistory', max: 10 },
    { name: '视空间', key: 'visualSpatialAbilityScoreHistory', max: 10 },
    { name: '情绪状态', key: 'emotionalStateScoreHistory', max: 10 },
    { name: '执行能力', key: 'executionAbilityScoreHistory', max: 10 },
])
const isShowSetMeal = ref<boolean>(false)
// 病历史
// const smokingList = ref<QueryDictionariesType[]>()//吸烟
// const drinkingList = ref<QueryDictionariesType[]>()//喝酒
// const dietOneList = ref<QueryDictionariesType[]>()//饮食1
// const dietTwoList = ref<QueryDictionariesType[]>()//饮食2
// const dietThreeList = ref<QueryDictionariesType[]>()//饮食3
const livingHabit = reactive<any>({
    smoking: "",
    drinking: "",
    diet1: "",
    diet2: "",
    diet3: "",
    text: ''
})
// 今日新增和共有的客户
const pageviews = ref<any>({
    currentCustomersNum: 0,//当前客户数
    todayAddCustomersNum: 0//今日新增客户数
})


onMounted(async () => {
    ClienteleData.changeSetpStatus(1)
    ClienteleData.clearClientForm()
    ClienteleData.AddrecordsDetailRequestObj()

    // 今日新增和共有的客户
    let resPageviews = await CustomersNumCount({});
    pageviews.value = resPageviews.data
    await getUserList()
    // getUserListInfo()
    console.log("ClienteleData", ClienteleData);
})
// 获取列表
const getUserList = async () => {
    let obj = JSON.parse(JSON.stringify(searchForm))
    obj.pageNum = 1;
    for (const key in obj) {
        if (obj[key as keyof typeof obj] == '') {
            delete obj[key as keyof typeof obj]
        }
    }
    let res: any = await QueryClientList(obj);
    if (res.code == 200) {
        if (res.data) {
            total.value = res.data.total || 0;
            if (res.data?.data && res.data.data.length > 0) {
                recordList.value = res.data.data;
                currentData.value = res.data.data[currentRecordState.value];
                currentArchivesNo.value = res.data.data[0].archivesNo;
                getEchartsData()
                getUserListInfo()
                if (res.data.data.length < 10) {
                    livingHabit.text = ''
                } else {
                    livingHabit.text = '上滑查看更多'
                }
                if (total.value === recordList.value.length) {
                    livingHabit.text = '暂无更多数据~'
                }
            } else {
                getEchartsData()
                recordList.value = []
                loadStatus.value = 'noData'
            }
        } else {
            recordList.value = []
            loadStatus.value = 'noData'
        }
    } else {
        getEchartsData()
        recordList.value = []
        loadStatus.value = 'failure'
    }
}
// 获取详情
const getUserListInfo = async () => {
    let radarInfoRes: any = await GetRadarInfo({ archivesNo: currentArchivesNo.value })
    if (radarInfoRes.code === 200) {
        RadarInfo.value = radarInfoRes.data;
        // let resSmoking = await QueryDictionaries({ dictType: "smoking" })
        // console.log("resSmokingresSmokingresSmokingresSmoking", resSmoking);

        // smokingList.value = resSmoking.data
        getLifeHabit('smoking')
        // console.log("吸烟=", resSmoking);
        // let resDrinking = await QueryDictionaries({ dictType: "drinking" })
        // drinkingList.value = resDrinking.data
        getLifeHabit('drinking')
        // console.log("喝酒=", resDrinking);

        // let resdietOneList = await QueryDictionaries({ dictType: "diet1" })
        // dietOneList.value = resdietOneList.data
        getLifeHabit('diet1')
        // console.log("饮食1=", resdietOneList);
        // let resdietTwoList = await QueryDictionaries({ dictType: "diet2" })
        // dietTwoList.value = resdietTwoList.data
        getLifeHabit('diet2')
        // console.log("饮食2=", resdietTwoList);
        // let resdietThreeList = await QueryDictionaries({ dictType: "diet3" })
        // dietThreeList.value = resdietThreeList.data
        getLifeHabit('diet3')
        // console.log("饮食3=", resdietThreeList);
    }
}
const getEchartsData = async () => {
    if (currentArchivesNo.value) {
        let resRadar = await GetRadar({ archivesNo: currentArchivesNo.value });
        console.log("res雷达地图", resRadar.data);
        statistics.value = resRadar.data;
        radarMapData.value[0] = resRadar.data.memoryScore || 0;
        radarMapData.value[1] = resRadar.data.languageAbilityScore || 0;
        radarMapData.value[2] = resRadar.data.mathematicalLogicScore || 0;
        radarMapData.value[3] = resRadar.data.visualSpatialAbilityScore || 0;
        radarMapData.value[4] = resRadar.data.emotionalStateScore || 0;
        radarMapData.value[5] = resRadar.data.executionAbilityScore || 0;
    } else {
        radarMapData.value[0] = 0;
        radarMapData.value[1] = 0;
        radarMapData.value[2] = 0;
        radarMapData.value[3] = 0;
        radarMapData.value[4] = 0;
        radarMapData.value[5] = 0;
    }
    changeCapacityClassification(0, 'all')
    echartsKey.value += 1;
}
// 搜索
const handleSearch = () => {
    getUserList()
}
// 下拉加载
const getList = _.throttle(async (e: any) => {
    let boxHeight = e.target.offsetHeight
    let top = e.target.scrollTop
    let overall = e.target.scrollHeight
    let scrollBottomHeight = overall - boxHeight - top
    let flang = true
    if (flang && scrollBottomHeight < 80) {
        console.log(e.target.offsetHeight);
        flang = false
        searchForm.pageNum += 1
        livingHabit.text = ''
        if (recordList.value.length < total.value) {
            let res = await QueryClientList(searchForm);
            if (res.data != null) {
                recordList.value = [...recordList.value, ...res.data.data]
                console.log(recordList.value);
                total.value = res.data.total
                flang = true
                if (recordList.value.length === total.value) {
                    livingHabit.text = '暂无更多数据~'
                    return;
                }
            } else {
                livingHabit.text = '暂无更多数据~'
                return;
            }
            livingHabit.text = '上滑查看更多'
        } else {
            livingHabit.text = '暂无更多数据~'
            return;
        }
    }
}, 300, {
    leading: false,
    trailing: true
})
const getLifeHabit = (title: string) => {
    let num: number
    switch (title) {
        case 'smoking':
            num = parseInt(RadarInfo.value.healthRecordsDetail?.smoking)
            livingHabit.smoking = smokingEnum![num]?.dictLabel
            break;
        case 'drinking':
            num = parseInt(RadarInfo.value.healthRecordsDetail?.drinking)
            livingHabit.drinking = drinkingEnum![num]?.dictLabel
            break;
        case 'diet1':
            num = parseInt(RadarInfo.value.healthRecordsDetail?.diet1)
            
            livingHabit.diet1 = diet1Enum![num]?.dictLabel
            break;
        case 'diet2':
            num = parseInt(RadarInfo.value.healthRecordsDetail?.diet2)
            livingHabit.diet2 = diet2Enum![num]?.dictLabel
            break;
        case 'diet3':
            num = parseInt(RadarInfo.value.healthRecordsDetail?.diet3)
            livingHabit.diet3 = diet3Enum![num]?.dictLabel
            break;
    }
}
const handAddRecord = () => {
    ClienteleData.changeEditStatus(false);
    router.push("/addrecord")
}
// 用户列表
const handleCurrentRecord = async (index: number, data: recordType) => {
    currentRecordState.value = index;
    currentArchivesNo.value = data.archivesNo;
    currentData.value = data;
    getUserListInfo();
    getEchartsData();
}
// 选中哪个功能数据
const changeCapacityClassification = (index: number, key: string) => {
    capacityClassification.value = index
    console.log(key);
    if (key !== 'all') {
        lineData.value = statistics.value[key];
    } else {
        radarMapData.value[0] = statistics.value.memoryScore || 0;
        radarMapData.value[1] = statistics.value.languageAbilityScore || 0;
        radarMapData.value[2] = statistics.value.mathematicalLogicScore || 0;
        radarMapData.value[3] = statistics.value.visualSpatialAbilityScore || 0;
        radarMapData.value[4] = statistics.value.emotionalStateScore || 0;
        radarMapData.value[5] = statistics.value.executionAbilityScore || 0;
    }
    echartsKey.value += 1;
}
const handleSubscribe = (index: number, data: recordType) => {
    currentRecordState.value = index;
    currentArchivesNo.value = data.archivesNo;
    currentData.value = data;
    getUserListInfo();
    getEchartsData();
    isShowSetMeal.value = true
}
const clickEdit = async (archivesNo: string) => {
    ClienteleData.getEditData(RadarInfo.value)
    let radarInfoRes = await GetRadarInfo({ archivesNo: archivesNo })
    ClienteleData.getEditData(radarInfoRes.data)
    nextTick(() => {
        ClienteleData.changeEditStatus(true);
        router.replace('/addrecord');
    })
}
const callOff = () => {
    isShowSetMeal.value = false;
}
const maskName = (name: any) => {
    if (typeof name !== 'string') {
        return name; // 非字符串类型直接返回
    }

    if (name.length <= 1) {
        return name; // 字符串长度为 1 或 0 直接返回
    }
    const firstChar = name.charAt(0);
    const maskedChars = '*'.repeat(name.length - 1);
    return firstChar + maskedChars;
}
let loadStatus = ref<string>('loading') //loading-加载中,noData-无数据,failure-加载失败
let schedule = ref<number>(0) //加载中进度
</script>
<template>
    <div class="client" v-if="!isShowSetMeal">
        <div class="client-left">
            <div class="list-top">
                <span class="universal-title">用户列表</span>
                <div class="add-btn" @click="handAddRecord">
                    <PlusCircleOutlined /><span>新建档案</span>
                </div>
            </div>
            <div class="search">
                <div>
                    <a-input v-model:value="searchForm.searchKey" placeholder="请输入客户手机号/客户姓名进行查询"
                        style="background-color: #F2F2F2;border-radius:10px;" @input="handleSearch">
                        <template #prefix>
                            <search-outlined type="user" style="color:#727272" />
                        </template>
                    </a-input>
                </div>
                <!-- <div class="search-btn">
                    <img src="@/assets/images/screen.png" alt="">
                    <div>筛选</div>
                </div>
                <div class="search-btn" @click="router.go(0)">
                    <img src="@/assets/images/reset.png" alt="">
                    <div>重置</div>
                </div> -->
            </div>
            <div class="quantity">
                <span>当前用户数：{{ pageviews?.currentCustomersNum || 0 }}人</span>
                <span>今日新增：{{ pageviews?.todayAddCustomersNum || 0 }}人</span>
            </div>
            <div  v-if="recordList?.length==0" class="loadbox"><load :status="loadStatus" :schedule="schedule"></load></div>
            <ul class="client-list" @scroll="getList" v-else>
                <li v-if="recordList && recordList.length > 0" v-for="(item, index) in recordList" :key="item.id"
                    :class="currentRecordState === index ? 'active' : ''" @click="handleCurrentRecord(index, item)">
                    <div>
                        <div></div>
                        <span @click.stop="handleSubscribe(index, item)">一键预约</span>
                    </div>
                    <div>
                        <h1>{{ maskName(item.name) }}</h1>
                        <div>
                            <div v-if="item.sex == 1" class="boy"></div>
                            <div v-else class="girl"></div>
                            <strong>{{ item.age }}岁</strong>
                        </div>
                        <p>联系电话:{{ item.phone.replace(/^(.{7})(?:\d+)(.{0})$/, "$1****$2")
                        }}</p>
                        <p>操作时间：{{ item.updateTime }}</p>
                    </div>
                    <div class="edit" @click.stop.prevent="clickEdit(item.archivesNo)"></div>
                </li>
                <div style="text-align: center;font-size: 14px;clor:#999;" v-if="recordList && recordList.length > 0">{{
                    livingHabit.text }}</div>
                <div class="nullData" v-else>暂无数据</div>
            </ul>

        </div>
        <div class="client-right">
            <div class="basics-info">
                <div>
                    <span class="universal-title">基础信息</span>
                    <!-- <span v-if="isUnfold" @click="isUnfold = false">收起</span>
                    <span v-else @click="isUnfold = true">展开</span> -->
                </div>
                <div class="info" v-if="RadarInfo">
                    <div>
                        <p>
                            <span>姓 名:</span>
                            <span>{{ RadarInfo?.healthRecordsBase?.name || '未知' }}</span>
                        </p>
                        <p>
                            <span>性 别:</span>
                            <span v-if="RadarInfo?.healthRecordsBase?.sex == 1">男</span>
                            <span v-if="RadarInfo?.healthRecordsBase?.sex == 2">女</span>
                            <span v-if="RadarInfo?.healthRecordsBase?.sex == 3">未知</span>
                            <span v-if="!RadarInfo?.healthRecordsBase?.sex">未知</span>
                        </p>
                        <p>
                            <span>出生日期:</span>
                            <span>{{ RadarInfo?.healthRecordsBase?.birthday || '未知' }}</span>
                        </p>
                    </div>
                    <div>
                        <p>
                            <span>教育背景:</span>
                            <span>{{ RadarInfo?.healthRecordsBase?.educationDesc || '未知' }}</span>
                        </p>
                        <p>
                            <span>手机号码:</span>
                            <span>{{ RadarInfo?.healthRecordsBase?.phone || '未知' }}</span>
                        </p>
                        <!-- <p>
                            <span>医保卡号:</span>
                            <span>{{ RadarInfo?.healthRecordsBase?.medicalInsuranceCard || '未知' }}</span>
                        </p>
                        <p>
                            <span>备用联系人:</span>
                            <span>{{ RadarInfo?.healthRecordsBase?.alternateContact || '未知' }}</span>
                        </p>
                        <p>
                            <span>备用联系电话:</span>
                            <span>{{ RadarInfo?.healthRecordsBase?.contactPhone || '未知' }}</span>
                        </p> -->
                    </div>
                </div>
                <!-- <div class="info info-one" :class="isUnfold ? 'active' : ''" v-if="RadarInfo">
                    <div>
                        <p>
                            <span>教育背景:</span>
                            <span>{{ RadarInfo?.healthRecordsBase?.educationDesc || '未知' }}</span>
                        </p>
                        <p>
                            <span>手机号码:</span>
                            {{ RadarInfo?.healthRecordsBase?.phone || '未知' }}
                        </p>
                        <p>
                            <span>身份证号:</span>
                            <span>{{ RadarInfo?.healthRecordsBase?.idNo || '未知' }}</span>
                        </p>
                        <p>
                            <span>院方ID:</span>
                            <span>{{ RadarInfo?.healthRecordsBase?.hospitalId || '未知' }}</span>
                        </p>
                    </div>
                    <div>
                        <p>
                            <span>家庭地址:</span>
                            <span>{{ RadarInfo?.healthRecordsBase?.homeAddress || '未知' }}</span>
                        </p>
                        <p>
                            <span>街道:</span>
                            <span>{{ RadarInfo?.healthRecordsBase?.street || '未知' }}</span>
                        </p>
                        <p>
                            <span>居委会:</span>
                            <span>{{ RadarInfo?.healthRecordsBase?.neighborhoodCommittee || '未知' }}</span>
                        </p>
                        <p>
                            <span>详细地址:</span>
                            <span>{{ RadarInfo?.healthRecordsBase?.homeAddress || '未知' }}</span>
                        </p>
                    </div>
                </div> -->
            </div>
            <div class="basics-info jkda">
                <div>
                    <span class="universal-title">健康档案</span>
                    <span v-if="isHealth" @click="isHealth = false">收起</span>
                    <span v-else @click="isHealth = true">展开</span>
                </div>
                <div class="info" v-if="RadarInfo">
                    <div>
                        <p>
                            <span>身 高:</span>
                            <span>{{ RadarInfo?.healthRecordsDetail?.height || '未知' }}cm</span>
                        </p>
                        <p>
                            <span>体 重:</span>
                            <span>{{ RadarInfo?.healthRecordsDetail?.weight || '未知' }}kg</span>
                        </p>
                        <p>
                            <span>血压情况:</span>
                            <span>{{ RadarInfo?.healthRecordsDetail?.bloodPressureSituationDesc || '未知' }}</span>
                        </p>
                    </div>
                    <div>
                        <p>
                            <span>糖尿病:</span>
                            <span>{{ RadarInfo?.healthRecordsDetail?.diabetesDesc || '未知' }}</span>
                        </p>
                        <p>
                            <span>收缩压:</span>
                            <span>{{ RadarInfo?.healthRecordsDetail?.systolicPressure || '未知' }}mmHg</span>
                        </p>
                        <p>
                            <span>舒张压:</span>
                            <span>{{ RadarInfo?.healthRecordsDetail?.diastolicPressure || '未知' }}mmHg</span>
                        </p>
                    </div>
                </div>
                <!-- <template>   -->
                <!-- v-if="isHealth" -->
                <div class="info info-two" :class="isHealth ? 'active' : ''" v-if="RadarInfo">
                    <div>
                        <p>
                            <span>血脂情况:</span>
                            <span>{{ RadarInfo?.healthRecordsDetail?.lipidStatusDesc || '未知' }}</span>
                        </p>
                        <p>
                            <span>运动量:</span>
                            {{ RadarInfo?.healthRecordsDetail?.weeklyExerciseFrequency || '未知' }}次/周
                        </p>
                        <p>
                            <span>心脏病:</span>
                            <span>{{ RadarInfo?.healthRecordsDetail?.heartDiseaseDesc || '未知' }}</span>
                        </p>
                        <p>
                            <span>抑郁状态:</span>
                            <span>{{ RadarInfo?.healthRecordsDetail?.depressiveStateDesc || '未知' }}</span>
                        </p>
                    </div>
                    <div>
                        <p>
                            <span>总胆固醇:</span>
                            <span>{{ RadarInfo?.healthRecordsDetail?.totalCholesterol || '未知' }}mmol/L</span>
                        </p>
                        <p>
                            <span>脑血管:</span>
                            <span>{{ RadarInfo?.healthRecordsDetail?.cerebrovascularDiseaseDesc || '未知' }}</span>
                        </p>
                        <p>
                            <span>比历史记忆更:</span>
                            <span>{{ RadarInfo?.healthRecordsDetail?.memoryDesc || '未知' }}</span>
                        </p>
                        <p>
                            <span>APOEε4基因类型:</span>
                            <span>{{ RadarInfo?.healthRecordsDetail?.carryApoeDesc || '未知' }}</span>
                        </p>
                    </div>
                </div>
                <!-- </template> -->
            </div>
            <div class="analyse">
                <div>
                    <span class="universal-title">认知功能能力分析</span>
                </div>
                <div class="analyse-box">
                    <div class="analyse-left">
                        <span v-for="(item, index) in capacitylist" :key="index"
                            :class="capacityClassification == index ? 'active' : ''"
                            @click="changeCapacityClassification(index, item.key)">
                            {{ item.name }}</span>
                    </div>
                    <div class="analyse-right">
                        <ability-analysis v-if="capacityClassification === 0 && radarMapData.length > 0"
                            :radarMap="radarMapData" :key="echartsKey"></ability-analysis>
                        <synthesize v-if="capacityClassification !== 0" :line="lineData" :key="echartsKey + 1"></synthesize>
                        <div class="reminder" v-if="capacityClassification === 0">
                            <div></div>
                            <div>
                                <span> >8 </span>
                                <span>优秀</span>
                            </div>
                            <div>
                                <span>4~8</span>
                                <span>正常</span>
                            </div>
                            <div>
                                <span>3~4</span>
                                <span>轻度下降</span>
                            </div>
                            <div>
                                <span> {{ '<3' }} </span>
                                        <span>中重度下降</span>
                            </div>
                        </div>
                        <h1 class="nullData"
                            v-if="(capacityClassification !== 0 && !lineData) || (capacityClassification !== 0 && lineData.length === 0)">
                            暂无数据</h1>
                    </div>
                </div>

            </div>
            <div class="record">
                <div class="record-left">
                    <div>
                        <span class="universal-title">病史档案</span>
                    </div>
                    <div class="da-list" v-if="RadarInfo">
                        <div>
                            <div>基础能力：</div>
                            <div>
                                <template v-if="RadarInfo?.capabilityDescList && RadarInfo?.capabilityDescList.length > 0">
                                    <span v-for="(item, index) in RadarInfo?.capabilityDescList" :key="index">{{ item
                                    }}</span>
                                </template>
                                <span v-else>未知</span>
                            </div>
                        </div>
                        <div>
                            <div>家族病史：</div>
                            <div>
                                <template
                                    v-if="RadarInfo?.familyHistoryDescList && RadarInfo?.familyHistoryDescList.length > 0">
                                    <span v-for="(item, index) in RadarInfo?.familyHistoryDescList" :key="index">{{
                                        item }}</span>
                                </template>
                                <span v-else>未知</span>
                            </div>
                        </div>
                        <div>
                            <div>患者情况：</div>
                            <div>
                                <template v-if="RadarInfo?.prevalenceDescList && RadarInfo?.prevalenceDescList.length > 0">
                                    <span v-for="(item, index) in RadarInfo?.prevalenceDescList" :key="index">{{ item
                                    }}</span>
                                </template>
                                <span v-else>未知</span>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="record-right">
                    <div>
                        <div>
                            <span class="universal-title">生活习惯</span>
                        </div>
                        <div class="habit" v-if="RadarInfo">
                            <div>
                                <span>吸烟：</span>
                                <span>{{ RadarInfo?.healthRecordsDetail?.smokingDesc || '未知' }}</span>
                            </div>
                            <div>
                                <span>喝酒：</span>
                                <span>{{ RadarInfo?.healthRecordsDetail?.drinkingDesc || '未知' }}</span>
                            </div>
                            <div>
                                <span>饮食：</span>
                                <span>
                                    {{ RadarInfo?.healthRecordsDetail?.diet1Desc || '未知' }}&nbsp;
                                    {{ RadarInfo?.healthRecordsDetail?.diet2Desc || '未知' }}&nbsp;
                                    {{ RadarInfo?.healthRecordsDetail?.diet3Desc || '未知' }}&nbsp;
                                </span>
                            </div>

                        </div>

                    </div>
                    <div>
                        <div>
                            <span class="universal-title">运动爱好</span>
                        </div>
                        <div class="hobby">
                            <div v-if="RadarInfo" class="habit">
                                <span>运动爱好：</span>
                                <template v-if="RadarInfo?.sportsHobbiesList && RadarInfo?.sportsHobbiesList.length > 0">
                                    <span v-for="(item, index) in RadarInfo?.sportsHobbiesList" :key="index">{{
                                        item.sportsEventsDesc
                                    }}</span>
                                </template>
                                <span v-else>未知</span>

                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    </div>
    <SetMeal v-else :customerinfo="currentData" @cancel="callOff" />
</template>

<style lang='less' scoped>
.client {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;

    .client-left {
        width: 348px;
        height: 100%;
        background: #fff;
        border-radius: 16px;
        padding: 15px;

        .list-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .search {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            align-items: center;

            &>div:nth-child(1) {
                flex: 1;
            }

            .search-btn {
                text-align: center;
                font-size: 12px;
                color: rgba(114, 114, 114, 1);
                cursor: pointer;
                margin-left: 15px;

                img {
                    display: block;
                    width: 16px;
                    // height: 16px;
                    margin: 0 auto;
                }
            }
        }

        .quantity {
            display: flex;
            justify-content: space-between;
            margin: 18px 0px;

            span {
                font-size: 12px;
                font-weight: 400;
                color: #7D7A7A;
                line-height: 17px;
            }

        }

        .client-list {
            display: block;
            height:calc(100% - 132px);
            overflow-y: auto;

            li {
                padding: 9px;
                display: flex;
                position: relative;
                background: #F8F8F8;
                box-sizing: border-box;
                margin-bottom: 10px;
                border-radius: 8px;
                border: 2px solid #F8F8F8;

                &:last-child {
                    margin-bottom: 0;
                }

                &.active {
                    box-shadow: 0px 2px 18px 0px rgba(87, 102, 254, 0.07);
                    border: 2px solid #3D7EFF;
                }

                &>div {
                    // width: 326px;
                    // height: 116px;
                    border-radius: 8px;

                    &:nth-child(1) {
                        width: 100px;
                        margin-right: 5px;

                        div {
                            width: 70px;
                            height: 70px;
                            display: block;
                            border-radius: 50%;
                            margin: 0 auto;
                            background: url("@/assets/images/center/group.png")no-repeat center;
                            background-size: 115px 115px;
                        }

                        span {
                            width: 80px;
                            display: block;
                            padding: 4px 10px;
                            font-size: 12px;
                            font-weight: bold;
                            text-align: center;
                            color: #FFFFFF;
                            background: #3D7EFF;
                            border-radius: 13px;
                            margin: 0 auto;
                            margin-top: 6px;
                            cursor: pointer;
                        }
                    }

                    &:nth-child(2) {
                        h1 {
                            font-size: 22px;
                            color: #222222;
                            line-height: 30px;
                            font-weight: bold;
                        }

                        &>div {
                            display: flex;
                            align-items: center;

                            div {
                                width: 30px;
                                height: 30px;
                                border-radius: 50%;
                                margin-right: 10px;

                                &.boy {
                                    background: url("@/assets/images/boy.png")no-repeat center center/80px 80px;
                                }

                                &.girl {
                                    background: url("@/assets/images/girl.png")no-repeat center center/80px 80px;
                                }
                            }

                            strong {
                                font-weight: bold;
                                font-size: 14px;
                                color: #222222;
                                line-height: 20px;
                            }
                        }

                        p {
                            margin: 0;
                            font-size: 12px;
                            color: #403F3F;
                            line-height: 17px;
                            font-weight: 400;
                        }
                    }

                    &:nth-child(3) {
                        position: absolute;
                        right: 10px;
                        width: 30px;
                        height: 30px;
                        background: url('@/assets/images/edit.png')no-repeat center -18px;
                        background-size: 70px;
                        border-radius: 50%;
                    }
                }
            }

            .nullData {
                padding-top: 40px;
                text-align: center;
                font-size: 24px;
                color: #999999;
            }
        }

    }

    .client-right {
        width: calc(100% - 333px);
        height: 100%;
        margin-left: 15px;
        overflow-y: auto;
        overflow-x: hidden;

        .basics-info {
            width: 100%;
            // height: 136px;
            background: #FFFFFF;
            border-radius: 16px;
            padding: 15px;
            box-sizing: border-box;

            &>div {
                &:nth-child(1) {
                    display: flex;
                    justify-content: space-between;
                    align-content: center;
                }
            }

            .info {
                display: flex;
                align-content: center;
                justify-content: space-between;
                margin-top: 10px;

                &.info-one {
                    height: 0px;
                    overflow: hidden;
                    transition: all 1s ease;

                    &.active {
                        height: 115px;
                    }
                }

                &.info-two {
                    height: 0px;
                    overflow: hidden;
                    transition: all 1s ease;

                    &.active {
                        height: 115px;
                    }
                }

                &>div {
                    width: 47%;

                    p {
                        display: flex;
                        justify-content: space-between;
                        margin: 0;
                        margin-bottom: 10px;

                        &:last-child {
                            margin: 0;
                        }

                        span {
                            font-size: 12px;

                            &:nth-child(1) {
                                font-weight: 500;
                                color: #7C7C7C;
                            }

                            &:nth-child(2) {
                                font-weight: bold;
                                color: #222222;
                            }
                        }
                    }
                }
            }

        }

        .record {
            display: flex;
            margin-top: 15px;
            justify-content: space-between;
            width: 100%;

            &>div {
                width: 49%;
                border-radius: 16px;
            }

            .record-left {
                padding: 15px;
                background: #fff;

                .da-list {
                    &>div {
                        display: flex;

                        &>div {
                            font-size: 12px;
                            color: #959595;
                            margin-top: 10px;
                            font-weight: bold;

                            &:nth-child(1) {
                                padding-left: 15px;
                            }

                            &:nth-child(2) {
                                display: flex;
                                flex: 1;
                                flex-wrap: wrap;

                                span {
                                    display: inline-block;
                                    width: 33%;
                                    color: #222222;
                                    margin-bottom: 10px;

                                }

                                .blod {
                                    color: #222222;
                                }
                            }
                        }
                    }
                }
            }

            .record-right {
                &>div {
                    background-color: #fff;
                    margin-bottom: 15px;
                    padding: 15px;
                    border-radius: 16px;
                    min-height: 47%;

                    &:nth-child(2) {
                        margin-bottom: 0;
                    }

                    &>div:nth-child(2) {
                        display: flex;
                        flex-wrap: wrap;

                        &>div {
                            margin-right: 30px;

                            &>span {
                                font-size: 12px;
                                font-weight: bold;

                                &:nth-child(1) {
                                    color: #7C7C7C;
                                }

                                &:nth-child(2) {
                                    color: #222222;
                                }
                            }

                            &:nth-child(3n) {
                                margin-right: 0;
                            }
                        }
                    }
                }
            }
        }

    }
}

.add-btn {
    display: flex;
    align-items: center;
    font-size: 12px;
    background: #3D7EFF;
    border-radius: 13px;
    color: #fff;
    line-height: 30px;
    padding: 0px 10px;
    cursor: pointer;

    &>span:nth-child(2) {
        margin-left: 5px;
    }
}


.hobby {
    span {
        margin-right: 10px;

        &:nth-child(1) {
            margin-right: 0;
        }
    }
}

.ant-picker {
    width: 100%;
}

.jkda {
    margin-top: 15px;
}

.analyse {
    width: 100%;
    // height: 136px;
    background: #FFFFFF;
    border-radius: 16px;
    padding: 15px;
    box-sizing: border-box;
    margin-top: 15px;

    &>div {
        &:nth-child(1) {
            display: flex;
            justify-content: space-between;
            align-content: center;
        }
    }

    .analyse-box {
        width: 100%;
        height: 354px;
        margin-top: 18px;
        background: #F9F9F9;
        border-radius: 16px;
        display: flex;
        padding: 14px;

        .analyse-left {
            width: 130px;
            height: 100%;

            span {
                display: block;
                width: 120px;
                font-size: 13px;
                padding: 5px 15px;
                color: #3D7EFF;
                margin-bottom: 12px;
                border-radius: 33px;
                text-align: center;
                border: 1px solid #3D7EFF;
                cursor: pointer;

                &:last-child {
                    margin-bottom: 0;
                }

                &.active {
                    background: #3D7EFF;
                    color: #FFFFFF;
                }
            }
        }

        .analyse-right {
            position: relative;
            flex: 1;
            height: 100%;
            background: #fff;

            .reminder {
                position: absolute;
                top: 10px;
                right: 50px;
                width: 40px;

                &>div {
                    position: relative;
                    width: 10px;
                    height: 40px;
                    background-color: rgba(236, 236, 236, 1);

                    &>span {
                        position: absolute;
                        display: block;
                        font-size: 12px;
                        width: 100px;
                        transform: scale(.9);
                        top: -12px;

                        &:nth-child(1) {
                            width: 30px;
                            text-align: right;
                            left: -35px;
                        }

                        &:nth-child(2) {
                            right: -100px;
                        }
                    }

                    &::after {
                        position: absolute;
                        top: 0;
                        content: "";
                        display: block;
                        width: 5px;
                        border-top: 1px solid #000;
                    }

                    &:nth-child(1) {
                        height: 20px;
                        border-radius: 15px;
                        border-bottom-left-radius: 0;
                        border-bottom-right-radius: 0;

                        &::after {
                            border-top: none
                        }
                    }

                    &:nth-child(5) {
                        height: 20px;
                        border-radius: 15px;
                        border-top-left-radius: 0;
                        border-top-right-radius: 0;
                    }
                }
            }

            .nullData {
                width: 100%;
                position: absolute;
                top: 80px;
                left: 0;
                text-align: center;
                font-weight: bold;
                font-size: 36px;
                color: #999999;
            }
        }

    }
}

:deep(.ant-input) {
    background-color: #F2F2F2;
}

:deep(.add-dan .ant-input) {
    background-color: transparent;
}

:deep(.ant-form-item-label > label) {
    width: 83px;
}
.loadbox{
    height:calc(100% - 132px);
    display: flex;
}
</style>