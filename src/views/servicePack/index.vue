<template>
  <div class="scale-con" v-if="!loading">
    <div class="c-top"><img class="back" @click="back(true)" src="@/assets/images/servicePack/back.png" /><span
        @click="back(true)">筛查服务</span>
    </div>

    <div class="c-content">
      <div class="con-one con-one-left">
        <div class="one-top">{{ allData?.info.name }}</div>
        <div class="one-head">
          <div class="head-bg"><img class="bg" src="@/assets/images/xy.png" alt="" /></div>
          <div class="head-info">
            <div class="age">
              {{ allData?.info.age }}岁
              <img v-if="sex === 1" src="@/assets/images/men.png" />
              <img v-if="sex === 2" src="@/assets/images/women.png" />
            </div>
            <div class="time">{{ allData?.info.bookTime }}</div>
          </div>
        </div>
        <div class="tags">
          <div class="tags-one" v-for="(item, index) in allData?.info.labels" :key="index">{{ item }}</div>
        </div>
      </div>
      <div class="con-one con-one-right">
        <div class="one-top">{{ allData?.product?.equityName || '服务产品' }}</div>
        <div class="one-service">
          <div class="service-bg"><img class="bg" :src="allData?.product.mainPic" alt="" /></div>
          <div class="service-info">
            <div class="name">{{ allData?.product.prodName }}</div>
            <div class="text">{{ allData?.product.prodDescribe }}</div>
          </div>
        </div>
        <div class="right-tip-box" v-if="state.fromUrl == 'equity'"
          :style="{ backgroundImage: `url(${tipStrategy[allData?.ticketsStatus || 0]})` }">
          {{ allData?.ticketsStatus === 2 ? "已完成" : allData?.ticketsStatus === 1 ? "使用中" : "已核销" }}
        </div>
        <div class="right-tip-box" v-else
          :style="{ backgroundImage: `url(${tipStrategy2[allData?.ticketsStatus || 0]})` }">
          {{ allData?.ticketsStatus === 3 ? "已完成" : allData?.ticketsStatus === 9 ? "未完成" : "待开始" }}
        </div>
      </div>
    </div>

    <div class="ser-list">
      <div class="c-top ser-list-title">量表</div>
      <div class="tip-box" @click="maskBHIShow = 'eyesGame'" v-if="allData?.haveEyeCheck">筛查服务说明<img
          src="@/assets/images/tip.png" alt=""></div>
      <h2>您需要完成该服务包所有量表服务，才可进入AI结果计算，请认真执行，当前已完成<span>{{ allData?.progress || "0/0"
      }}</span></h2>
      <div class="list">
        <div class="ser-one-new" :style="{ backgroundImage: `url(${statusStrategy[item.status]})` }"
          v-for="(item, index) in allData?.checkService" :key="index">
          <div v-if="item.checkService === 'CFT' && (item.status <= 8 && item.status >= 6)" class="time-count">
            <span class="text" v-if="item.status == 6">{{ item.startTmie }}分钟后继续评估</span>
            <span class="text red" v-if="item.status == 7">{{ item.endTmie }}分钟后超时</span>
            <span class="text" v-if="item.status == 8">超时未答题</span>
          </div>
          <img class="one-bg" :src="item.pic" alt="" />
          <img v-if="item.status === 1" src="../../assets/images/servicePack/start_estimate.png"
            @click="check(item, 'go')" class="check" alt="" />
          <img v-if="item.status === 4" src="../../assets/images/servicePack/restart_estimate.png"
            @click="check(item, 'go')" class="check" alt="" />
          <img v-if="item.status === 7" src="../../assets/images/servicePack/restart_commit.png"
            @click="check(item, 'go')" class="check" alt="" />
          <img v-if="item.status === 8" src="../../assets/images/servicePack/restart_sure.png" @click="check(item, 'go')"
            class="check" alt="" />
        </div>
      </div>
    </div>
  </div>
  <a-modal v-model:visible="visible" :closable="false" title="提示" :footer="null" centered :maskClosable="false">
    <div class="identity-verify">
      <div class="check"><img src="@/assets/images/servicePack/game-over.png" alt="" /></div>
      <h3>目前该客户所有量表都已完成</h3>
      <a-button key="submit" type="primary" @click="handleOk">确定</a-button>
    </div>
  </a-modal>
  <div class="mask-BHI-box" v-if="maskBHIShow">
    <div class="BHI-content">
      <h2 style="font-weight: bold;">筛查服务说明</h2>
      <div v-if="maskBHIShow === 'BHI'">1.什么是BHI指数？
        解读：脑健康指数（Brain Health
        Index，简称BHI）是一个用来衡量大脑衰老程度的指标，它考虑了三个关键因素：您的年龄（a）、健康信息（d）和认知评估结果（c）。通过这些数据的计算，可以得出一个数字，该数字代表您的脑健康程度。
        简单来说，BHI就是一个评估您大脑健康状况的指标。它将您的年龄、健康信息以及认知评估结果结合在一起，根据每次筛查的记录结果进行动态更新。
        BHI的目标是帮助您了解自己大脑的健康状态，以及大脑衰老的趋势。这样，您可以更好地采取措施来维持或提升脑健康。通过定期检查和记录BHI，您可以了解大脑健康的变化趋势，并在必要时采取更多的预防措施，以保持大脑的活力和功能。
        请注意，BHI只是一个指标，它并不代表您的整体健康状况，但它可以为您提供关于大脑健康的重要信息，帮助您更好地关注和照顾自己的思维和认知能力
        2.BHI指数多少属于有问题呢？
        解读：当BHI指数为20分或以上时，脑建康风险处于正常阶段。当BHI指数在10到20之间时，脑建康风险为低风险阶段。当BHI指数在5到10之间时，脑建康风险为中风险阶段。而当BHI指数在0到5之间时，脑建康风险为高风险阶段。
        3.分项能力是什么？多少分是正常？
        1.记忆能力：该测试用于评估您的记忆力。您可能会被要求记住一些信息，然后在一段时间后进行回忆。测试可涵盖短期记忆（记住一系列数字或单词）和长期记忆（回忆早期的事件或信息）。
        2.认知功能：这个测试旨在了解您的注意力和集中力水平，以及您处理信息和解决问题的能力。您可能会接受一些注意力和思维任务，例如识别图形或进行逻辑推理。
        3.言语理解能力：该测试用于评估您的口头表达和理解语言的能力。您可能会被要求描述一幅图片，回答问题，或者解释一个概念。
        4.视空间能力：这个测试涉及处理空间信息和视觉刺激的能力。您可能会接受一些与图像旋转、拼图或空间导航相关的任务。
        5.执行功能：执行功能是指我们有意识地控制思维和行动的心理过程，包括计划制定、时间管理和解决冲突等日常生活中的能力
        6.数理逻辑：数理逻辑能力使我们能够理解、解释和预测世界的发展。优秀的思维能力有助于我们发展计算和推理能力，从复杂的具体事物中提炼出清晰的逻辑关系。在人际交流中，拥有良好的思维能力通常能够清晰地表达自己的想法和意见。
        7.情绪状态：情绪状态主要反映您当前的心境，是对您一段时间以来持续稳定情绪的描述。情绪障碍，如焦虑和抑郁，已被研究证明会对大脑健康产生负面影响，导致记忆力、注意力和执行能力下降。此外，情绪障碍还会导致睡眠问题、食欲减退和免疫力下降，从而间接影响脑健康。
        综合说明：以上分项能力是根据您参与脑建康筛查后根据当前或历史筛查的结果进行AI计算分项得来，分项能力均为8.5分以上为脑建康分项能力正常，低于8.5分只是脑建康分项能力存在风险并不代表您进入AD阶段。
        3.脑建康报告能当医疗诊断报告嘛？
        解读：脑建康报告并不是医疗诊断报告，它专注于进行早期AD（阿尔茨海默症）筛查，并重点强调当前脑部健康的风险情况。简单来说，这份报告不会给出确切的病情诊断，而是帮助我们了解可能存在的AD风险
        4.BHI年龄认知风险预测是什么
        解读：AD风险预测是一种通过AI算法来预测您患上阿尔茨海默病（AD）的可能性。这个算法会利用您的个人信息、健康记录和筛查结果，每隔3年进行一次预测，最终计算出未来20年内您患AD的风险程度。这个预测可以帮助您了解可能面临的脑健康风险，以便您可以做出更好的生活决策和采取适当的预防措施。
        5.评估结果显示高风险就代表是认知障碍吗？
        解读：高风险的评估结果并不能单独代表认知障碍。高风险可能意味着存在某些与认知障碍相关的因素，但最终的诊断需要由专业医疗人员进行综合评估和判断。
        6.评估结果是中风险该怎么办，需要去医院检查吗？
        中风险建议您与专业医生或医疗保健专业人士进行咨询和进一步评估。如果您认为自己有中风的风险，或是根据筛查得到的结果有所担忧，建议您立即就医。前往医院或诊所，让医生进行全面的身体检查和评估，这样可以明确您的健康状况，并采取必要的措施来保护您的健康。
        7.结果判定认知风险比同龄人高怎么办？
        解读：
        1.建议您与专业医生或医疗保健专业人士进行咨询和进一步评估，他们可以对您的情况进行更深入的评估，以确认是否存在认知问题，确定病因，并为您提供更具体的建议和治疗方案。
        2.了解风险因素：认识风险因素是非常重要的，这样可以帮助您采取积极的健康措施。了解自己的生活方式、家族史、健康问题和潜在的认知障碍风险因素是关键。这将帮助您采取适当的措施来降低患认知问题的风险。
        3.保持健康生活方式：积极的生活方式可以有助于维护大脑和认知功能的健康。保持均衡饮食、适量锻炼、良好的睡眠和心理健康都是重要的方面。避免吸烟、过度饮酒和滥用药物也是有益的。
        4.持续监测：如果您确实存在认知问题的风险，定期进行认知评估是重要的。这样可以及早发现问题并采取适当的干预措施。
        5.寻求支持：面对认知问题的风险可能会引起情绪上的不安和压力。在这个过程中，与家人、朋友或专业心理健康人员交流，获得支持和理解可能会对您有所帮助。
        6.遵循专业建议：如果医疗专业人员建议进行进一步治疗或干预措施，务必认真遵循并坚持执行。
        8.导致脑功能下降的最直接因素有哪些？该如何预防？
        1. 高龄：随着年龄的增长，脑功能会自然地出现一定程度的下降，这是因为大脑细胞的数量和连接能力会随着时间逐渐减少。
        2. 疾病与病症：神经系统疾病、脑部损伤、中风、阿尔茨海默症等疾病都可能导致脑功能的下降。
        3. 缺乏锻炼：长期缺乏体育锻炼可能导致大脑功能不足，因为锻炼有助于促进血液循环、增加氧气供应，有利于大脑的健康。
        4. 不健康的生活方式：不良的饮食习惯、过量饮酒、吸烟以及缺乏足够的睡眠都可能对大脑功能产生不利影响。
        5. 压力与焦虑：长期承受高强度的压力和焦虑会产生激素变化，对大脑产生负面影响，导致认知功能下降。
        预防脑功能下降的方法：
        1. 健康饮食：保持均衡的饮食，多摄取富含抗氧化剂的食物（如水果、蔬菜），适量摄取优质蛋白质，有助于维护大脑健康。
        2. 锻炼身体：经常参与有氧运动（如散步、跑步、游泳）和认知锻炼（如解谜题、学习新技能）能够促进大脑活跃，增强记忆和学习能力。
        3. 充足睡眠：确保每晚获得足够的睡眠，有助于大脑休息和恢复。
        4. 管理压力：学会有效地处理压力和焦虑，可以通过冥想、深呼吸、放松技巧等方法来缓解压力。
        5. 社交互动：保持积极的社交生活，与家人和朋友保持联系，参加社区活动，有助于促进大脑健康。
        6. 挑战大脑：经常从事挑战性的思维活动，如阅读、学习新技能、玩益智游戏，有助于保持大脑灵活和活跃。
        9.脑健康综合能力包含哪些？分别对结果有什么影响？
        解读：
        1.记忆能力：就是我们能否有效地记住和回忆过去学到的信息和经历。
        2.认知功能：指我们处理信息、思考问题和解决难题的能力。
        3.言语理解能力：是我们理解和运用语言的能力，包括听力和口头表达。
        4.视空间能力：是指我们对空间关系的认知和理解，比如找路、解读地图等。
        5.执行功能：是我们进行日常活动和完成任务的能力，比如计划、决策和执行。
        6.数理逻辑：是我们理解和运用数学和逻辑概念的能力。
        7.情绪状态：指我们情绪的稳定性和积极性，对情绪的控制和处理。
        8.这些能力都是相互关联的，如果其中一项能力存在问题，可能会对整体综合能力产生影响。因此，保持大脑健康非常重要。我们可以通过积极锻炼大脑、保持身心健康、养成好的生活习惯和学习新知识来促进脑建康。如果发现自己在某项能力上存在问题，及时寻求专业帮助和建议也是明智的选择。记住，关心和保护我们的大脑就像关心和保护我们的身体一样重要。
        10.BHI结果与历史评估记录结果有什么区别？
        解读：非常感谢您完成了我们的健康筛查，您的健康是我们最关注的事项。根据您的筛查结果，我们综合分析发现您的健康状况是全面的，这意味着我们对多个方面进行了评估，从而获得了一个全面的了解。
        同时，我们也使用了单量表进行筛查，这帮助我们得出了结果的单一性，即针对特定指标或领域的评估。这种细致的评估有助于我们更加深入地了解您在特定方面的健康状况。
        我们希望通过这样的综合和单一性评估，为您提供最准确和全面的健康建议和帮助。如果您有任何关于筛查结果的疑问或需要进一步解释，请随时向我们咨询。我们非常乐意为您提供帮助并共同制定一个健康改善计划。再次感谢您对健康的关注与支持！
        11.眼跳任务的反应延迟时间是什么？反应延迟时间长代表什么？
        反应延迟时间是指刺激出现与您产生首次眼动之间的时间间隔。延迟时间越长，说明反应能力较差。
        12.眼跳任务的正确率衡量的是什么？数值说明什么？
        眼跳任务的正确率衡量了您是否能够按照任务要求进行首次眼跳，并与任务要求的方向保持一致。一般而言，执行功能表现得越差，正确率就越低。
        13.新旧停留时间和凝视持续时间代表什么？
        新旧停留时间代表新旧照片的驻留时长，体现了您在任务过程中观察新旧照片的时间。通常来说，新照片的驻留时间越长，意味着您对原有哦照片的记忆越清晰，有更强的记忆力。
        凝视时长反应您在任务过程中对图片的关注稳定性，凝视持续时间越长，某种程度上表示您在关注图片时所展现出的信心更为充足。</div>
      <div v-else>
        <p style="font-weight: bold;">AI智能眼动筛查 · 任务完成清单</p>
        <img src="../../assets/images/servicePack/eye_game.png" alt="">
      </div>
      <button @click="changeMaskBHIShow">我已了解</button>
    </div>
  </div>
  <div class="mask-out-box" v-if="outVisible">
    <div class="mask-out-content-box">
      <h2>提示</h2>
      <p style="font-weight: bold;">检测出您还存在未完成的量表服务，如退出后，本次服务将不参与筛查结果计算！如退出后需要继续评估，请在待筛查中<span>未完成</span>下继续本次服务。</p>
      <div class="mask-out-content-btn-box">
        <button @click="back(false)">确定</button>
        <button @click="outVisible = false">取消</button>
      </div>
    </div>
  </div>
  <!-- 下一步loading -->
  <div class="desk2" v-if="loading">
    <a-spin size="large" />
  </div>
</template>

<script setup lang="ts">
import { getResultDetail } from '@/apis/servicePack/index';
import { resultType } from '@/apis/servicePack/type';
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useState } from '@/stores/state';
import { message } from 'ant-design-vue';

const visible = ref<boolean>(false);
const outVisible = ref<boolean>(false);
const router = useRouter();
const route = useRoute();
const sex = ref<number>(1);
const allData = ref<resultType | undefined>(undefined);
const state = useState();
const maskBHIShow = ref("")
const loading = ref(false)
const getIcon = (name: string): string => {
  return new URL(`../../assets/images/servicePack/${name}.png`, import.meta.url).href
}
let statusStrategy = [
  "",
  getIcon("to_begin_bg"),
  getIcon("under_analysis_bg"),
  getIcon("completed_bg"),
  getIcon("fail_bg"),
  getIcon("unable_to_answer_bg"),
  getIcon("to_commin"),
  getIcon("to_commin"),
  getIcon("to_sure"),
]
let tipStrategy = [
  getIcon("to_begin"),
  getIcon("in_use"),
  getIcon("completed"),
]
let tipStrategy2 = [
  "",
  "",
  getIcon("to_begin"),
  getIcon("completed"),
  "",
  "",
  "",
  "",
  "",
  getIcon("incomplete"),
]

//estimateStatus
//6:进行中,等待期置灰按钮
//7:继续评估,可点击跳转第三题  
//8:待确认 已经超时,预提交页 

console.log(tipStrategy)
onMounted(async () => {
  loading.value = true;
  const res = await getResultDetail({ ticketCode: route.query.ticketCode as any, isView: state.isView === 0 ? 0 : "" });
  if (res.code === 2051) router.back()
  if (res.code === 200) {
    console.log(res.data);
    const timeNow = new Date();
    res.data.checkService.forEach((el: any) => {
      el.endTmie = Math.floor((new Date(el.unableTime).getTime() - timeNow.getTime()) / (60 * 1000))
      el.startTmie = Math.floor((new Date(el.ableTime).getTime() - timeNow.getTime()) / (60 * 1000))
    })
    allData.value = res.data;
    sex.value = res.data.info.sex;
    let arr: Array<number> = [];
    console.log(arr + '数组');
    if (res.data.checkOver === 1 && route.query?.status != "look") {
      visible.value = true;
    }
  }
  loading.value = false;
});
const handleOk = () => {
  visible.value = false;
  if (state.fromUrl == "equity") {
    router.push({
      path: "/equity"
    })
    state.fromUrl = "";
    state.isView = -1;
    return
  }
  router.push('/subscribe/list');
  state.getPageUrl('/subscribe/list')
};
const changeMaskBHIShow = () => {
  maskBHIShow.value = ''
};
const check = (e: any, type = "") => {
  // alert('danha'+  JSON.stringify(e))
  if (!selectHandler(e)) return;
  state.getQueryProData(e);
  state.ticketCode = route.query.ticketCode as string;
  if (e.isCheck === 0 || type) {
    state.isView = -1;
    if(e.checkService== 'YY0001'||e.checkService== 'EDB-AD'  ){
      router.push({
        path: e.path,
        query: {
          checkService: e.checkService,
          ticketCode: route.query.ticketCode,
          archivesNo: e.clientId,
          evaluationType: e.evaluationType,
          prefixPageText: e.prefixPageText,
          statusType: e.status,
          estimateNum: e.status==4?e.estimateNum:'',
          timeCount: e.timeCount
        }
      })
    }else{
      router.push({
        path: e.path,
        query: {
          checkService: e.checkService,
          ticketCode: route.query.ticketCode,
          archivesNo: e.clientId,
          evaluationType: e.evaluationType,
          prefixPageText: e.prefixPageText,
          statusType: e.status,
          estimateNum: e.estimateNum,
          timeCount: e.timeCount
        }
      })
    }
  }
  if (e.status == 8) {
    router.push({
      path: '/scaleResultTemplate',
      query: {
        estimateNum: e.estimateNum,
        archivesNo: e.clientId
      }
    })
  }
};

const selectHandler = (e: any): boolean => {
  if (allData.value?.haveEyeCheck) {
    if (e.checkService === "EDB-AD" || e.checkService === "YY0001") {
      return true
    } else {
      var items = allData.value?.checkService.map(item => {
        if (item.checkService == "EDB-AD" || item.checkService == "YY0001") {
          return item
        }
      });
      for (let i = 0; i < items.length; i++) {
        if (items[i]?.status == 1) {
          message.warning(`请优先开始${items[i]!.checkServiceName}筛查`)
          return false
        }
      }
      return true
    }
  }
  return true
}

const back = (b = true) => {
  if (!allData.value!.checkOver && b) {
    outVisible.value = true;
    return
  }
  if (state.fromUrl == "equity") {
    router.push({
      path: "/equity"
    })
    state.fromUrl = "";
    state.isView = -1;
    return
  }
  router.push('/subscribe/list');
  // state.getPageUrl('/subscribe/list')
};


</script>

<style lang="less" scoped>
.scale-con {
  width: 100%;
  height: 100vh;
  background-color: #f7f8fc;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .c-top {
    font-size: 16px;
    color: #222;
    font-family: PingFangSC, PingFang SC;
    font-weight: bold;
    display: flex;
    align-items: center;
    text-align: center;

    .back {
      width: 18px;
      height: 18px;
      margin-top: 3px;
    }
  }

  .c-content {
    width: 100%;
    display: flex;
    margin-top: 20px;
    justify-content: space-between;

    .con-one-left {
      width: 568px;
      display: flex;
      flex-direction: column;
    }

    .con-one-right {
      width: 668px;
      position: relative;

      .right-tip-box {
        width: 94px;
        height: 40px;
        position: absolute;
        top: -2px;
        right: -10px;
        background-repeat: no-repeat;
        background-size: 94px 40px;
        font-size: 16px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 600;
        color: #FFFFFF;
        line-height: 22px;
        padding-top: 6px;
        text-align: center;
        text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.14);
      }
    }

    .con-one {
      height: 228px;
      background-color: #fff;
      box-shadow: 0px 2px 18px 0px rgba(87, 102, 254, 0.07);
      border-radius: 16px;
      padding: 12px 18px 18px;
      background: #FFFFFF;
      border-radius: 16px;
      box-sizing: border-box;

      .one-top {
        font-size: 18px;
        font-weight: bold;
        color: #222;
        line-height: 25px;
      }

      .one-head {
        display: flex;
        margin-top: 30px;

        .head-bg {
          width: 75px;
          height: 75px;

          .bg {
            width: 75px;
            height: 75px;
            border-radius: 50%;
          }
        }
      }

      .head-info {
        margin-left: 20px;

        .age {
          font-size: 24px;
          font-family: PingFangSC, PingFang SC;
          font-weight: 600;
          color: #222222;
          line-height: 33px;
          display: flex;
          align-items: center;

          img {
            width: 25px;
            height: 25px;
            margin-left: 9px;
          }
        }

        .time {
          margin-top: 4px;
          font-size: 19px;
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          color: #222222;
          line-height: 26px;
        }
      }

      .tags {
        flex: 1;
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        .tags-one {
          padding: 3px 13px;
          background: #fff4ea;
          border-radius: 10px;
          text-align: center;
          margin: 10px 0px 0px 10px;
          font-size: 15px;
          color: #222;
        }
      }

      .one-service {
        width: 100%;
        height: 163px;
        margin-top: 10px;
        background: #f6f6f6;
        border-radius: 10px;
        padding: 12px 18px 0;
        display: flex;

        .service-bg {
          width: 140px;
          height: 140px;
          border-radius: 14px;
          overflow: hidden;

          .bg {
            width: 140px;
            height: 140px;
            border-radius: 14px;
          }
        }

        .service-info {
          flex: 1;
          margin-left: 17px;

          .name {
            width: 444px;
            font-size: 26px;
            font-family: PingFang-SC, PingFang-SC;
            font-weight: bold;
            color: #222222;
            line-height: 37px;
            overflow: hidden;
            /*文本不会换行*/
            white-space: nowrap;
            /*当文本溢出包含元素时，以省略号表示超出的文本*/
            text-overflow: ellipsis;
          }

          .text {
            margin-top: 6px;
            font-size: 15px;
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            color: #222222;
            line-height: 21px;
          }
        }
      }
    }
  }

  .ser-list {
    width: 100%;
    flex: 1;
    background: #fff;
    box-shadow: 0px 1px 11px 0px rgba(87, 102, 254, 0.07);
    border-radius: 16px;
    margin-top: 15px;
    padding: 12px 40px;
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: column;

    .ser-list-title {
      position: absolute;
      top: 12px;
      left: 18px;
    }

    .tip-box {
      position: absolute;
      top: 18px;
      right: 24px;
      font-size: 14px;
      font-family: PingFang-SC, PingFang-SC;
      font-weight: bold;
      color: #3D7EFF;
      line-height: 20px;
      display: flex;
      align-items: center;
      text-decoration: underline;

      img {
        width: 14px;
        height: 14px;
        margin-left: 2px;
      }
    }

    h2 {
      text-align: center;
      font-size: 18px;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      color: #222222;
      line-height: 37px;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        margin-left: 3px;
        font-size: 26px;
        font-weight: bold;
      }
    }

    .list {
      width: 100%;
      flex: 1;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      overflow-x: auto;
    }

    .ser-one {
      width: 210px;
      height: 376px;
      flex: 0;
      margin-right: 20px;
      position: relative;

      .check {
        width: 22px;
        height: 22px;
        position: absolute;
        top: 15px;
        right: 15px;
      }

      .one-bg {
        width: 210px;
        height: 376px;
        border-radius: 10px;
      }

      .title {
        width: 100px;
        height: auto;
        font-size: 18px;
        color: #333;
        font-weight: 600;
        line-height: 35px;
        position: absolute;
        top: 100px;
        left: 35px;
      }
    }

    .ser-one-new {
      width: 210px;
      height: 376px;
      flex: 0 0 auto;
      margin-right: 20px;
      position: relative;
      background-size: 210px 376px;
      background-repeat: no-repeat;

      // background-position: 0 0;
      .time-count {
        width: 90%;
        height: 40px;
        position: absolute;
        top: -10px;
        left: 5%;
        background: #b45303;
        border-radius: 20px;
        text-align: center;
        line-height: 40px;
        color: #fff;
        font-weight: bold;
      }

      .one-bg {
        width: 160px;
        height: 186px;
        position: absolute;
        top: 117px;
        left: 25px;
      }

      .check {
        width: 156px;
        height: 65px;
        position: absolute;
        bottom: 24px;
        left: 27px;
      }
    }
  }
}

.identity-verify {
  h3 {
    font-size: 24px;
    color: #222;
    line-height: 40px;
    margin-top: 20px;
    font-weight: bold;
    text-align: center;
  }

  .check {
    width: 75px;
    height: 75px;
    margin: auto;

    img {
      width: 75px;
      height: 75px;
    }
  }

  button {
    display: block;
    width: 211px;
    height: 40px;
    margin: 25px auto 0px;
    border-radius: 20px;
    font-size: 15px;
    font-family: PingFang-SC, PingFang-SC;
    font-weight: bold;
    color: #FFFFFF;
    line-height: 20px;
  }

  .inputValue {
    width: 10%;
    text-align: center;
  }
}

:deep(.identity-verify button) {
  width: 211px;
  height: 40px;
  background: #3d7eff;
  border-radius: 27px;
}

:deep(.ant-modal-close-x) {
  display: none !important;

}

:deep(.ant-modal-close) {
  display: none !important;
}

.mask-BHI-box {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(22, 22, 22, 0.75);

  .BHI-content {
    width: 94vw;
    height: 91vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #FFFFFF;
    background-image: url("../../assets/images/servicePack/BHI_bg.png");
    background-size: 94vw 10vh;
    background-repeat: no-repeat;
    background-position: 0 0;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;

    h2 {
      text-align: center;
      margin: 30px 0 4px 0;
      font-size: 28px;
      font-family: PingFangSC, PingFang SC;
      font-weight: 600;
      color: #222222;
      line-height: 40px;
    }

    div {
      width: 1126px;
      flex: 1;
      overflow-y: auto;
      font-size: 18px;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      color: #222222;
      line-height: 30px;
      overflow-x: hidden;

      p {
        text-align: center;
        margin-bottom: 17px;
        font-size: 20px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 600;
        color: #222222;
        line-height: 28px;
      }

      img {
        width: 100%;
      }
    }

    button {
      width: 338px;
      height: 62px;
      background: #3D7EFF;
      border-radius: 31px;
      font-size: 26px;
      font-family: PingFangSC, PingFang SC;
      font-weight: 600;
      color: #FFFFFF;
      border: none;
      margin: 11px 0 15px 0;
    }
  }
}

.mask-out-box {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(22, 22, 22, 0.75);

  .mask-out-content-box {
    width: 522px;
    height: 360px;
    background: #FFFFFF;
    border-radius: 16px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 42px 66px 0;
    box-sizing: border-box;

    h2 {
      text-align: center;
      font-size: 20px;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      color: #B0B0B0;
      line-height: 28px;
      margin-bottom: 14px;
    }

    p {
      font-size: 22px;
      font-family: PingFangSC, PingFang SC;
      font-weight: bold;
      color: #222222;
      line-height: 30px;
      margin-bottom: 63px;

      span {
        color: #FF0000;
      }
    }
  }

  .mask-out-content-btn-box {
    display: flex;
    justify-content: space-around;

    button {
      width: 162px;
      height: 54px;
      border-radius: 27px;
      border: none;
      font-weight: bold;
      font-family: PingFang-SC, PingFang-SC;
      font-size: 22px;

      &:nth-child(1) {
        color: #FFFFFF;
        background: #3D7EFF;
      }

      &:nth-child(2) {
        color: #3D7EFF;
        background: #F5F8FD;
      }
    }
  }
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
}
</style>