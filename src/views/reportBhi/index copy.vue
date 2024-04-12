<template>
  <div class="report">
    <div class="re-top">
      <div class="re-back" @click="back"><img src="@/assets/images/bg-back.png" /></div>
      <div class="re-title">评估报告解读</div>
    </div>

    <div class="person-info">
      <div class="per-top">
        <div class="line"></div>
        <div class="name">{{ allData?.healthRecordsBaseResponse.name }}</div>
        <!-- <div class="tags">本人</div> -->
      </div>
      <div class="per-list">
        <div class="per-l">
          <div class="l-headbg"><img class="bg" src="@/assets/images/head.png" /></div>
          <div class="l-text">
            <p>年龄：{{ allData?.healthRecordsBaseResponse.age }}</p>
            <p>性别：{{ allData?.healthRecordsBaseResponse.sexDesc }}</p>
            <p>出生日期：{{ allData?.healthRecordsBaseResponse.birthday }}</p>
          </div>
        </div>
        <div class="per-m">
          <div class="m-top">脑健康指数（BHI）</div>
          <div class="m-count">{{ allData?.healthBhiResponse.bhi }}</div>
          <div class="m-bot">
            综合评价：认知风险为：<span style="color: #3c86fe">{{ allData?.healthBhiResponse.riskTypeDesc }}</span>
          </div>
        </div>
        <div class="per-r">
          <div class="r-title">{{ allData?.healthBhiResponse.bhiComments }}</div>
          <div class="r-img"><img src="@/assets/images/kaka.png" /></div>
        </div>
      </div>
    </div>

    <div class="bhi-info">
      <div class="per-top" style="width: 350px">
        <div class="line"></div>
        <div class="name">BHI年龄认知风险预测(20年)</div>
      </div>
      <div class="info-list">
        <div class="l-echarts">
          <div class="ec-text">
            <div class="ec-name">
              <div class="line blue"></div>
              正常
            </div>
            <div class="ec-name">
              <div class="line yello"></div>
              低风险
            </div>
            <div class="ec-name">
              <div class="line orgin"></div>
              中风险
            </div>
            <div class="ec-name">
              <div class="line red"></div>
              高风险
            </div>
          </div>
          <div class="putCharts" id="putCharts"></div>
        </div>
        <div class="l-tabe">
          <div class="unscramble">
            <div class="unscramble-item">
              <div class="unscramble-title">BHI解读:</div>
              <!-- <div class="unscramble-content">{{ allData?.healthBhiResponse.reportInterpretation }}</div> -->

              <div class="unscramble-content" v-if="allData?.healthBhiResponse?.riskType == '1'">
                您当前的脑健康指数（BHI）处于
                <span style="color: #3c86fe">{{ allData.label1 }}</span>
                区间，大脑认知能力表现正常。我们的算法预测您在
                <span style="color: #3c86fe; font-weight: bold">20</span>年以后可能会进入到
                <span v-if="allData.label2 == '正常'" style="color: #3c86fe">{{ allData.label2 }}</span>
                <span v-if="allData.label2 == '低风险'" style="color: #ffe96d">{{ allData.label2 }}</span>
                <span v-if="allData.label2 == '中风险'" style="color: #ffa76d">{{ allData.label2 }}</span>
                <span v-if="allData.label2 == '高风险'" style="color: #ff7474">{{ allData.label2 }}</span>
                区间，我们推荐您在生活中多做健脑的活动。
              </div>
              <div class="unscramble-content" v-if="allData?.healthBhiResponse?.riskType == '2'">
                您当前的脑健康指数（BHI）处于
                <span style="color: #ffe96d">{{ allData.label1 }}</span>
                区间，大脑认知能力有下降的迹象。我们的算法预测您在
                <span style="color: #3c86fe; font-weight: bold">20</span>
                年以后可能会进入到
                <span v-if="allData.label2 == '正常'" style="color: #3c86fe">{{ allData.label2 }}</span>
                <span v-if="allData.label2 == '低风险'" style="color: #ffe96d">{{ allData.label2 }}</span>
                <span v-if="allData.label2 == '中风险'" style="color: #ffa76d">{{ allData.label2 }}</span>
                <span v-if="allData.label2 == '高风险'" style="color: #ff7474">{{ allData.label2 }}</span>
                区间。我们建议您做更进一步的评估，可以开始一些针对性的干预方案。
              </div>
              <div class="unscramble-content" v-if="allData?.healthBhiResponse?.riskType == '3'">
                您当前的脑健康指数（BHI）处于
                <span style="color: #ffa76d">{{ allData.label1 }}</span>
                区间，大脑认知能力有明显下降的迹象。我们的算法预测您在
                <span style="color: #3c86fe; font-weight: bold">20</span>
                年以后可能会进入到
                <span v-if="allData.label2 == '正常'" style="color: #3c86fe">{{ allData.label2 }}</span>
                <span v-if="allData.label2 == '低风险'" style="color: #ffe96d">{{ allData.label2 }}</span>
                <span v-if="allData.label2 == '中风险'" style="color: #ffa76d">{{ allData.label2 }}</span>
                <span v-if="allData.label2 == '高风险'" style="color: #ff7474">{{ allData.label2 }}</span>
                区间，我们建议您做更进一步的评估，并开始针对性的干预方案。
              </div>
              <div class="unscramble-content" v-if="allData?.healthBhiResponse?.riskType == '4'">
                您当前的脑健康指数（BHI）处于
                <span style="color: #ff7474">{{ allData.label1 }}</span>
                区间，大脑认知能力出现了显著下降的情况，我们建议您去医院做诊断评估，并开始针对性的干预方案。
              </div>
            </div>
            <div class="unscramble-table" style="margin-top:22px;">
              <a-table class="oneTable" :columns="columns" :data-source="MockTableData" :pagination="false" bordered></a-table>
            </div>

            <div class="unscramble-item" style="margin-top:20px;">
              <div class="unscramble-title">脑健康指数（BHI）定义：</div>
              <div class="unscramble-content small">脑健康指数（英语：Brain Health Index，简称BHI）是用来评估大脑衰老程度的一项参数，是由一个人的<span style="color: #ff0000">年龄(a)、健康信息(d)</span>和<span style="color: #ff0000">认知评估结果（c）</span> 计算出的一个数值。BHI会根据您的每次筛查情况进行最终结果实时更新。</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="health-list">
      <div class="list-one">
        <div class="per-top">
          <div class="line"></div>
          <div class="name">脑健康综合能力分析</div>
        </div>
        <div class="analyzeCharts" id="analyzeCharts"></div>
        <div class="bot">
          <div class="link">
            <div class="blue"></div>
            用户数据
            <div class="orange"></div>
            边界值
          </div>
          <div class="line-text">注:本次筛查结果根据您眼动客观数据、自评数据及健康风险因素综合计算得出。</div>
        </div>
      </div>
      <div class="list-one">
        <div class="per-top">
          <div class="line"></div>
          <div class="name">健康风险因素</div>
        </div>
        <div class="replenishment">
          注：以上健康风险因素将影响您的认知风险会比同龄人高<span style="color: #ff0000"> {{ allData?.healthRecordsBaseResponse.proportion }}%</span>
        </div>
        <div class="swipe">
          <a-carousel arrows easing="slow">
            <div v-for="(item, index) in riskList" :key="index">
              <div class="ment">{{ item.project }}</div>
              <div class="title">{{ item.recommendation }}</div>
            </div>
          </a-carousel>
        </div>
      </div>
    </div>

    <div class="brain-health">
      <div class="per-top">
        <div class="line"></div>
        <div class="name">脑健康建议</div>
      </div>
      <div class="swipe">
        <a-carousel arrows easing="slow">
          <div>
            <div class="suggestionMent">脑健康生活方式建议:</div>
            <p>大脑分项能力对我们的生活有很大影响，它是大脑最重要的功能。为了持续保持良好的脑健康，您可以采取以下措施：</p>
            <p>1. 加强脑力活动(例如:阅读、做拼图、学习新东西);2.中等强度的有氧运动，一周3 次，每次50 分钟(例如:步行、骑自行车);3.复合维生素B(每天1次);4.维生素C(每天500mg）</p>
            <p>5.每天1两左右(手一捧的量)的坚果饮食例如:核桃、杏仁);6.一周吃3次鱼(例如:三文鱼、比目鱼等);7.饮食含有咖与姜黄素;8.建议抗氧化饮食(例如:葡萄汁、石榴汁、草莓、豆类、绿茶)</p>
            <p>9.建议地中海饮食(例如:蔬菜瓜果、谷物、橄榄油、鱼、适量红酒、适量奶制品、少吃禽类与肉);10.防治血管性风险因素(例如: 高血压、高血脂、糖尿病肥胖）;</p>
            <p>11.参加社交活动(例如:与亲属和朋友时常聚会);12.保证良好睡眠(如果有严重打鼾，或者夜间呼吸暂停寻求医治)</p>
            <!-- <p style="color: #222; font-weight: bold">
              评估结果显示，您当前的正常脑健康建议得分为 <span>{{ synthesis?.visualSpatialAbilityScore }}</span> 分 ,(您的脑建康分项能力均为正常总分为10分，分数越高代表您的能力越强)。
            </p> -->
          </div>

          <div v-if="0 < synthesis?.memoryScore && synthesis?.memoryScore <= 8.5 && synthesis?.memoryScore != null">
            <div class="suggestionMent">记忆力:</div>
            <p>记忆力对我们的生活有很大影响，它是大脑最重要的功能之一。为了保持良好的记忆力，您可以采取以下措施：</p>
            <p>1. 关注自己的记忆力变化：开始留意自己的记忆力是否有所改变，观察自己是否容易忘记事情或者记不清细节。</p>
            <p>2. 训练和评估记忆力：定期进行记忆力训练和评估。在日常生活中，您可以有意识地尝试记忆一些内容，比如主动记住短信验证码、回忆过去的经历或者与朋友聊天时回忆一些共同的事情。这样可以激活与记忆相关的脑区</p>
            <p>3. 使用记忆小技巧：如果您遇到记忆困难，可以借助一些生活小技巧。例如，随身携带一本专门用来记录重要事项的小本子。</p>
            <p>
              记忆力是可以通过训练和注意力来改善的。保持积极的生活态度，培养良好的生活习惯，包括良好的睡眠、均衡的饮食和适度的锻炼，都有助于提升记忆力和大脑健康。记住，即使分数不高，也不必担心。通过采取适当的措施，您可以改善和保护自己的记忆力。如果您对自己的记忆力感到非常担忧，建议咨询医生或专业的健康机构，他们可以为您提供更具体的建议和帮助。
            </p>
            <p style="color: #222; font-weight: bold">
              评估结果显示，您当前的记忆力得分为 <span>{{ synthesis?.memoryScore }}</span> 分 ,(总分为 10 分，分数越高，代表您的能力越强)。
            </p>
          </div>

          <div v-if="0 < synthesis?.executionAbilityScore && synthesis?.executionAbilityScore <= 8.5 && synthesis?.executionAbilityScore != null">
            <div class="suggestionMent">执行功能:</div>
            <p>执行功能是指我们有意识地控制思维和行动的心理过程，包括计划制定、时间管理和解决冲突等日常生活中的能力。可以把执行功能比喻为乐队的指挥家，指挥家负责协调和指导乐队，创造出和谐美妙的交响乐曲。保持良好的执行功能需要注意以下几点：</p>
            <p>1.关注事务安排：开始关注自己日常生活中的事务安排，保持对生活和工作的主动性。</p>
            <p>2.任务管理：适当控制任务的速度和准确性，合理安排任务的时间。</p>
            <p>3.解决冲突：当遇到矛盾或冲突时，培养自己的协调能力。学会平衡不同的需求和利益，寻找解决问题的方法</p>
            <p>
              执行功能可以通过一些训练和技巧来提升。例如，制定清晰的计划和目标，并遵循时间表。使用工具和提醒帮助您记住重要事项和截止日期。同时，保持良好的身体健康也对执行功能的提升很重要，包括良好的睡眠、饮食均衡和适度的运动。即使得分不高，也不必担心。通过积极的努力和实践，您可以改善和增强自己的执行功能。如果您对自己的执行功能感到非常担忧，建议咨询医生或专业的健康机构，他们可以为您提供更具体的建议和帮助。
            </p>
            <p style="color: #222; font-weight: bold">
              评估结果显示，您当前的执行能力得分为 <span>{{ synthesis?.executionAbilityScore }}</span> 分 ,(总分为 10 分，分数越高，代表您的能力越强)。
            </p>
          </div>

          <div v-if="0 < synthesis?.mathematicalLogicScore && synthesis?.mathematicalLogicScore <= 8.5 && synthesis?.mathematicalLogicScore != null">
            <div class="suggestionMent">数理能力:</div>
            <p>数理逻辑能力使我们能够理解、解释和预测世界的发展。优秀的思维能力有助于我们发展计算和推理能力，从复杂的具体事物中提炼出清晰的逻辑关系。在人际交流中，拥有良好的思维能力通常能够清晰地表达自己的想法和意见。以下是一些提升数理逻辑能力的方法：</p>
            <p>1.玩棋牌类、数独和解谜类游戏：这些游戏可以锻炼您的数理逻辑能力。</p>
            <p>2.处理日常生活中的逻辑问题：在日常生活中，您可以主动参与一些与逻辑相关的活动。例如，尝试主动购物并记账，这需要您计算价格、折扣和总额。</p>
            <p>3.保持好奇心、积极思考和解决问题的态度也对提升数理逻辑能力很有帮助。如果您有兴趣深入学习数理逻辑，可以考虑参加逻辑思维培训课程或阅读相关的书籍和资料。</p>
            <p>记住，即使得分不高，也不必担心。每个人的能力都是可以通过学习和训练不断提升的。享受过程，保持积极的心态，并持续努力，您会看到进步的。如果您对自己的数理逻辑能力感到非常担忧，建议咨询相关领域的专家或参考专业的学术机构，他们可以为您提供更具体的建议和帮助</p>
            <p style="color: #222; font-weight: bold">
              评估结果显示，您当前的数理能力得分为 <span>{{ synthesis?.mathematicalLogicScore }}</span> 分 ,(总分为 10 分，分数越高，代表您的能力越强)。
            </p>
          </div>

          <div v-if="0 < synthesis?.emotionalStateScore && synthesis?.emotionalStateScore <= 8.5 && synthesis?.emotionalStateScore != null">
            <div class="suggestionMent">情绪状态:</div>
            <p>
              情绪状态主要反映您当前的心境，是对您一段时间以来持续稳定情绪的描述。情绪障碍，如焦虑和抑郁，已被研究证明会对大脑健康产生负面影响，导致记忆力、注意力和执行能力下降。此外，情绪障碍还会导致睡眠问题、食欲减退和免疫力下降，从而间接影响脑健康。因此，情绪障碍是导致认知衰退的危险因素之一。对于情绪的管理和调节非常重要。以下是一些建议：
            </p>
            <p>1.照顾身体健康：确保健康饮食、充足睡眠和良好的人际关系。这些因素对情绪稳定和大脑健康非常重要。</p>
            <p>2.运动和爱好：适量的运动和从事自己喜欢的活动有助于调节情绪。运动释放身体内的有益化学物质，提升心情。同时，参与爱好和兴趣可以带来愉悦和满足感。</p>
            <p>3.冥想和自我认知：冥想是一种有效的情绪调节方法，通过训练注意力和觉察当下，帮助减轻压力和焦虑。</p>
            <p>最后，当您感到情绪困扰时，寻求医生的帮助是非常值得的。专业医生可以提供具体的建议和治疗方案，帮助您管理和改善情绪状态。不要犹豫寻求支持和帮助，关注和维护自己的心理健康同样重要。</p>
            <p style="color: #222; font-weight: bold">
              评估结果显示，您当前的情绪状态得分为 <span>{{ synthesis?.emotionalStateScore }}</span> 分 ,(总分为 10 分，分数越高，代表您的能力越强)。
            </p>
          </div>

          <div v-if="0 < synthesis?.languageAbilityScore && synthesis?.languageAbilityScore <= 8.5 && synthesis?.languageAbilityScore != null">
            <div class="suggestionMent">语言能力:</div>
            <p>语言能力涵盖文字理解和言语流畅性，反映了您的知识储备、文字书写和口头表达能力。语言能力在我们的生活中无处不在，它涉及到我们对基础概念的理解、图片识别以及清晰表达思想的能力。如果我们在这些方面出现问题，可能意味着我们的大脑功能有所下降。以下是一些建议来提升您的语言能力</p>
            <p>1.阅读：多读书、报纸、杂志等各种文本材料，扩展词汇量和理解能力。您可以选择自己感兴趣的领域，找到适合自己阅读水平的材料。</p>
            <p>2.写作：通过写作练习来提升文字表达能力。可以尝试写日记、博客、文章或者参与写作社区，接受他人的反馈和建议。</p>
            <p>3.参与讨论和演讲：多参与社交活动，与他人进行讨论、辩论或者演讲。这样可以锻炼口头表达能力，提升思维的清晰度和逻辑性。</p>
            <p>4.学习新技能或语言：学习新的技能或语言可以激发大脑的语言能力。尝试学习一门您感兴趣的外语或者其他技能，通过练习和实践来提升语言能力。</p>
            <p>总之，通过持续的学习和实践，您可以提升自己的语言能力。保持积极的学习态度，勇于尝试新的挑战。如果您对自己的语言能力感到担忧，可以咨询专业的语言学习机构或寻求相关领域的专家的建议和帮助。</p>
            <p style="color: #222; font-weight: bold">
              评估结果显示，您当前的语言能力得分为 <span>{{ synthesis?.languageAbilityScore }}</span> 分 ,(总分为 10 分，分数越高，代表您的能力越强)。
            </p>
          </div>
        </a-carousel>
      </div>
    </div>

    <div class="tabel-list">
      <div class="per-top">
        <div class="line"></div>
        <div class="name">历史筛查记录</div>
      </div>
      <div class="tabel">
        <a-table :data-source="tabelData" :columns="columnsOne" :pagination="false" class="subscribe-list"   :scroll="{ y: 400 }" >
          <template #bodyCell="{ column, record, text }">
            <template v-if="column.key === 'risk'">
              <div style="color: #3c86fe" v-if="text == '正常'" class="yet-make">
                {{ record.risk }}
              </div>
              <div style="color: #f1c12e" v-if="text == '低风险'" class="yet-make">
                {{ record.risk }}
              </div>
              <div style="color: #ff7d07" v-if="text == '中风险'" class="yet-make">
                {{ record.risk }}
              </div>
              <div style="color: #fe3b00" v-if="text == '高风险'" class="yet-make">
                {{ record.risk }}
              </div>
              <!-- <div style="color:#FE3B00" v-if="text == '认知障碍'" class="yet-make">
                        {{record.risk}}
                      </div> -->
            </template>

            <template v-if="column.key === 'status'">
              <div style="color: #f1c12e" v-if="text == 2" class="yet-make">数据解析中</div>
              <div style="color: #24c07b" v-if="text == 3" class="yet-make">评估完成</div>
              <div style="color: #fe3b00" v-if="text == 4" class="yet-make">评估失败</div>
            </template>
            <template v-if="column.key === 'operation'">
              <a-button type="link" v-if="record.status == 3" @click="lookReport(record)">查看报告</a-button>
              <a-button type="link" v-if="record.status == 4" :style="{ color: record.remark == '无法作答' ? '#ccc' : '' }" @click="again(record)">重新评估</a-button>
            </template>
          </template>
        </a-table>
        <a-pagination v-model:current="current" :total="total" :pageSize="pageSize" @change="pageChange" show-quick-jumper :show-total="(total: any) => `共 ${total} 条`" :showSizeChanger="true" :page-size-options="pageSizeOptions" style="float: right; margin-top: 20px" />
      </div>
    </div>

    <div class="remark">
      <p>注：</p>
      <p>1.我们利用AI智能算法。能够实现自动分析评估结果给出一个综合BHI指数。</p>
      <p>2.BHI指数目前针对社区认知评估的结果有更好的表现。</p>
      <p>3.BHI指数仅作参考不能作为临床诊断依据。</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { onMounted, reactive, ref, onBeforeUnmount } from 'vue';
import { getReport, getTabe } from '@/apis/reportBhi/index';
import { resultType, listData } from '@/apis/reportBhi/type';
import { useRoute, useRouter } from 'vue-router';
import { useState } from '@/stores/state';

let search = reactive<any>({
  putCharts: '',
  analyzeCharts: ''
});

const columns = ref<any[]>([
  {
    title: '分类',
    dataIndex: 'mockSort',
    align: 'center'
  },
  {
    title: 'BHI',
    dataIndex: 'channel',
    align: 'center'
  }
]);
const MockTableData = [
  {
    mockSort: '正常',
    channel: '>20'
  },
  {
    mockSort: '低风险',
    channel: '10-20'
  },
  {
    mockSort: '中风险',
    channel: '5-10'
  },
  {
    mockSort: '高风险',
    channel: '0-5'
  }
];

const columnsOne = ref<any[]>([
  {
    title: '评估单号',
    dataIndex: 'estimateNum',
    key: 'estimateNum',
    align: 'center'
  },
  // {
  //   title: '联系方式',
  //   dataIndex: 'customPhone',
  //   key: 'customPhone',
  //   align: "center"
  // },
  {
    title: '日期',
    dataIndex: 'estimateTime',
    key: 'estimateTime',
    align: 'center'
  },
  {
    title: '筛查项目',
    dataIndex: 'estimateServeName',
    key: 'estimateServeName',
    align: 'center'
    // width: 200,
    // ellipsis: true,
  },
  {
    title: '评估结果',
    dataIndex: 'risk',
    key: 'risk',
    align: 'center',
    ellipsis: true
  },
  {
    title: '评估员',
    dataIndex: 'assessor',
    key: 'assessor',
    align: 'center'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    ellipsis: true,
    align: 'center'
  },
  {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
    ellipsis: true,
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    align: 'center'
  }
]);

const current = ref<number>(1);
const pageSize = ref<number>(5);
const total = ref<number>(0);
const pageSizeOptions = ref<string[]>(['5', '10', '20', '30', '40', '50']);

const allData = ref<resultType | undefined>(undefined);
// const Xshaft = ref<any>([]); //X轴
// const Yshaft = ref<any>([]); //Y轴

const synthesis = ref<any>({}); //综合分析
const riskList = ref<any>({}); //风险
const tabelData = ref<listData | undefined>(undefined);

const route = useRoute();
const router = useRouter();
const state = useState();

onMounted(async () => {
  let chartfDom = document.getElementById('putCharts');
  search.putCharts = echarts.init(chartfDom as any);
  let Xshaft = ['', ''];
  let Yshaft: number[] = [];
  echartsPut(Xshaft, Yshaft);
  let analyzeDom = document.getElementById('analyzeCharts');
  search.analyzeCharts = echarts.init(analyzeDom as any);
  let analyzeData = ['0', '0', '0', '0', '0', '0'];
  echartsAnalyze(analyzeData);
  //所有数据
  // alert(JSON.stringify(route.query))
  const res = await getReport({ archivesNo: route.query.archivesNo as any,checked:route.query.checked=='true'?true:false as boolean });
  if (res.code === 200) {
    allData.value = res.data;
    //综合
    synthesis.value = res.data.radarChartResponse;
    let memory = synthesis.value.memoryScore ? synthesis.value.memoryScore : '0';
    let depending = synthesis.value.visualSpatialAbilityScore ? synthesis.value.visualSpatialAbilityScore : '0';
    let mathematics = synthesis.value.mathematicalLogicScore ? synthesis.value.mathematicalLogicScore : '0';
    let speech = synthesis.value.languageAbilityScore ? synthesis.value.languageAbilityScore : '0';
    let execution = synthesis.value.executionAbilityScore ? synthesis.value.executionAbilityScore : '0';
    let emotionalStateScore = synthesis.value.emotionalStateScore ? synthesis.value.emotionalStateScore : '0';
    let analyzeData = [memory, depending, execution, mathematics, speech, emotionalStateScore];
    echartsAnalyze(analyzeData);
    //风险因素
    riskList.value = res.data.healthRiskFactors;
    if (res.data.healthBhiResponse?.futureTrends != null) {
      //X轴
      Xshaft = res.data.healthBhiResponse.futureTrends.map((item: any) => {
        return item.age;
      });
      //Y轴
      Yshaft = res.data.healthBhiResponse.futureTrends.map((item: any) => {
        return item.score;
      });

      echartsPut(Xshaft, Yshaft);
    }
  }
  //表格数据
  const parmas = {
    archivesNo: route.query.archivesNo as any,
    pageNum: 1,
    pageSize: 5
    // prodCode: route.query.prodCode as any
  };
  // alert(JSON.stringify(route.query))
  const msg: any = await getTabe(parmas);
  if (msg?.code === 200) {
    tabelData.value = msg.data.data;
    total.value = msg.data.total;
    current.value = msg.data.pageIndex;
  }
});

onBeforeUnmount(() => {
  search.putCharts.dispose();
  search.analyzeCharts.dispose();
});
const pageChange = async (page: number, size: any) => {
  console.log(page);
  console.log(size);
  console.log('555');
  const parmas = {
    archivesNo: route.query.archivesNo as any,
    pageNum: page,
    pageSize: size
  };

  let res: any = await getTabe(parmas);
  if (res.code == 200) {
    tabelData.value = res.data.data;
    total.value = res.data.total;
    current.value = res.data.pageIndex;
    pageSize.value = res.data.pageSize;
  }
};

const back = () => {
  router.push('/assessment/record');
};
//重新评估
const again = (obj: any) => {
  //缓存重新评估数据
  state.getQueryProData(obj);
  if (obj.status == 4) {
    if (obj.estimateServeCode === 'EDB-AD' && obj.type === 3) {
      //眼动
      router.push({
        path: '/xmCameraCenter',
        query: {
          estimateNum: obj.estimateNum,
          type: 3
        }
      });
    }
    if (obj.estimateServeCode === 'AD-8' && obj.type === 2 && obj.remark != '无法作答') {
      //AD8
      router.push('/scale');
    }
  }
};
//认知data: any
const echartsPut = (Xshaft: any, Yshaft: any) => {
  let YData: number[] = [];
  for (let i = 0; i < Yshaft.length; i++) {
    if (Yshaft[i] <= 20) {
      YData.push(Yshaft[i]);
    } else {
      let num: number = ((Yshaft[i] - 20) / 20) * 5 + 20;
      YData.push(num);
    }
  }
  console.log(YData);
  let option = {
    title: {
      text: ''
    },

    tooltip: {
      show: false,
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },

    xAxis: {
      name: '(年龄)',
      nameLocation: 'end',
      type: 'category',
      data: Xshaft,
      nameTextStyle:{
        fontSize:10,
      },
      axisTick: {
        alignWithLabel: true
      },
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' }
        ]
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#7BA4CB'
        }
      }
    },

    yAxis: {
      name: 'BHI',
      nameLocation: 'end',
      type: 'value',
      axisTick: {
        alignWithLabel: true
      },
      minInterval: 1,
      maxInterval: 5,
      min: 0, // 起始
      max: 40, // 终止
      splitArea: {
        show: true,
        areaStyle: {
          color: ['#FF6A6A', '#FFA76D', '#FFE96D', '#FFE96D', '#D7EBFA', '#D7EBFA', '#D7EBFA', '#D7EBFA']
        }
      },
      axisLabel: {
        formatter: function (value: number) {
          switch (value) {
            case 25:
              return '间';
            case 30:
              return '区';
            case 35:
              return '常';
            case 40:
              return '正';
            default:
              return value;
          }
        }
      }
    },
    series: [
      {
        data: YData,
        type: 'line'
      }
    ]
  };
  option && search.putCharts.setOption(option);
};

//分析analyzeData: any
const echartsAnalyze = (analyzeData: any) => {
  let option = {
    // tooltip: {
    //   formatter: '{c}%' //这是关键，在需要的地方加上就行了
    // },
    color: ['#3A84FE', '#3A84FE', '#3A84FE', '#3A84FE', '#3A84FE', '#3A84FE'],
    grid: {
      left: '4%',
      right: '4%',
      bottom: '3%',
      top: '8%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['记忆力', '视空间', '执行功能', '数理能力', '语言能力', '情绪状态'],
        axisTick: {
          alignWithLabel: true
        },

        axisLabel: {
          show: true,
          fontSize: '12px',
          textStyle: {
            color: '#7BA4CB'
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        minInterval: 1,
        maxInterval: 100,
        interval: 2, // 步长
        min: 0, // 起始
        max: 10, // 终止
        axisLabel: {
          show: true,
          textStyle: {
            color: '#A8C3DC'
          }
        }
      }
    ],
    series: [
      {
        name: 'Direct',
        type: 'bar',
        barWidth: '30%',
        data: analyzeData,
        itemStyle: {
          normal: {
            //这里设置柱形图圆角 [左上角，右上角，右下角，左下角]
            barBorderRadius: [4, 4, 0, 0],
            label: {
              show: true,
              position: 'top'
              // formatter: '\n{c}%' //这是关键，在需要的地方加上就行了
            }
          }
        },
        label: {
          show: true,
          position: 'top',
          color: '#222222'
        },
        markLine: {
          symbol: ['none', 'none'], //去掉箭头
          itemStyle: {
            normal: {
              lineStyle: { type: 'solid', color: '#FFBC44', width: 3 }, // 样式： 线型、颜色、线宽
              label: {
                show: false,
                position: 'middle'
              }
            }
          },
          data: [
            {
              yAxis: 8
            }
          ]
        }
      }
    ]
  };
  option && search.analyzeCharts.setOption(option);
};

// 查看报告
const lookReport = (obj: any) => {
  console.log(obj.type);
  //类型1-游戏，2-量表，3-眼动，4-抑郁
  if (obj.status == 3) {
    if (obj.type == 3) {
      router.push({
        path: '/eye/report/result',
        query: {
          estimateNum: obj.estimateNum,
          type: 3
        }
      });
    }

    if (obj.type == 2) {
      router.push({
        path: '/adReport',
        query: {
          estimateNum: obj.estimateNum,
          archivesNo:route.query.archivesNo
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.report {
  width: 100%;
  background-color: #f6f6f6;

  .re-top {
    width: 100%;
    height: 130px;
    background-image: url('@/assets/images/report-top.png');
    background-size: 100% 130px;
    display: flex;

    .re-back {
      width: 40px;
      height: 40px;
      position: absolute;
      top: 40px;
      left: 40px;
    }

    .re-title {
      font-size: 35px;
      font-weight: bold;
      color: #fff;
      margin: auto;
    }
  }

  .person-info {
    width: 98%;
    height: 325px;
    background: #fff;
    border-radius: 10px;
    margin: 20px auto;
    box-shadow: 0px 2px 16px 0px rgba(87, 102, 254, 0.07);
    padding: 30px;

    .per-top {
      display: flex;

      .line {
        width: 8px;
        height: 22px;
        background: #5766fe;
        border-radius: 4px;
        margin-top: 10px;
      }

      .name {
        font-size: 26px;
        font-weight: 400;
        color: #222;
        margin-left: 10px;
      }

      .tags {
        width: 55px;
        height: 22px;
        background: linear-gradient(147deg, #6d64ff 0%, #3493ff 100%);
        box-shadow: 0px 2px 11px 0px rgba(0, 0, 0, 0.08);
        border-radius: 12px;
        border: 1px solid #ffffff;
        text-align: center;
        color: #fff;
        margin: 20px 15px;
      }
    }

    .per-list {
      width: 93%;
      height: 190px;
      display: flex;
      margin: auto;
      justify-content: space-between;

      .per-l {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;

        .l-headbg {
          width: 100px;
          height: 100px;
        }

        .l-text {
          margin-left: 50px;
          color: #222;
          font-size: 17px;
          font-weight: bold;
        }
      }

      .per-m {
        width: 345px;
        height: 190px;
        border-radius: 10px;
        background: #ffffff;
        box-shadow: inset 0px 1px 1px 1px rgba(0, 0, 0, 0.11);

        .m-top {
          width: 345px;
          height: 45px;
          background: #3c86fe;
          border-radius: 7px 7px 0px 0px;
          color: #fff;
          font-size: 16px;
          font-weight: bold;
          text-align: center;
          line-height: 45px;
        }

        .m-count {
          text-align: center;
          font-size: 44px;
          font-weight: bold;
          color: #3c86fe;
          line-height: 90px;
          letter-spacing: 2px;
        }

        .m-bot {
          width: 322px;
          height: 36px;
          background: #fafafa;
          border-radius: 4px;
          border: 1px solid #ededed;
          margin: auto;
          text-align: center;
          line-height: 36px;

          span {
            color: #3c86fe;
          }
        }
      }

      .per-r {
        width: 345px;
        height: 190px;

        .r-title {
          color: #6583a0;
          font-size: 15px;
        }

        .r-img {
          text-align: right;
        }
      }
    }
  }

  .bhi-info {
    width: 98%;
    height: 550px;
    background: #fff;
    border-radius: 10px;
    margin: 20px auto;
    box-shadow: 0px 2px 16px 0px rgba(87, 102, 254, 0.07);
    padding: 30px;

    .per-top {
      display: flex;

      .line {
        width: 8px;
        height: 22px;
        background: #5766fe;
        border-radius: 4px;
        margin-top: 10px;
      }

      .name {
        font-size: 26px;
        font-weight: 400;
        color: #222;
        margin-left: 10px;
      }
    }

    .info-list {
      display: flex;
      justify-content: space-between;
      .l-echarts{
        .putCharts{
          @media only screen and (max-width: 1280px) {
            width: 600px; 
            height: 480px;
          }
          @media only screen and (max-width: 1920px) {
            width: 600px; 
            height: 450px;
          }
          // @media only screen and (max-width: 1200px) {
          //   width: 580px; 
          //   height: 480px
          // }
        }
        .ec-text {
          width: 350px;
          height: 30px;
          display: flex;
          float: right;
          margin-right: 60px;

          .ec-name {
            font-size: 14px;
            line-height: 30px;
            display: flex;
            width: 100px;
            height: 30px;

            .line {
              width: 18px;
              height: 18px;
              border-radius: 50%;
              margin: 6px;
            }

            .yello {
              background: #ffe96d;
            }

            .blue {
              background: #dbefff;
            }

            .orgin {
              background: #ffa76d;
            }

            .red {
              background: #ff7474;
            }
          }
        }

      }

      .l-tabe {
        width: 580px;
        height: 520px;
        margin-top: -50px;

        .unscramble {
          background: linear-gradient(180deg, #faffff 0%, #fafeff 100%);
          box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.05);
          border-radius: 10px;
          border: 1px solid #f1f6fc;
          padding: 15px;

          .unscramble-item {
            .unscramble-title {
              height:30px;
              font-size: 18px;
              font-weight: bold;
              color: #6c6b72;
            }

            .unscramble-content {
              height:55px;
              font-size: 15px;
              color: #6c6b72;
              line-height: 24px;
            }

            .small {
              margin-bottom:20px;
              font-size: 13px !important;
              color: #8d8d8d !important;
            }
          }
        }
      }
    }
  }

  .health-list {
    width: 98%;
    // height:530px;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;

    .list-one {
      .analyzeCharts{

        @media only screen and (max-width: 1280px) {
            width: 580px; 
            height: 350px;

          }
          @media only screen and (max-width: 1920px) {
            width: 580px; 
            height: 350px;
          }
          // @media only screen and (max-width: 1200px) {
          //   width: 580px; 
          //  height: 350px;
          // }


      }
      width: 49%;
      height: 500px;
      background: #fff;
      box-shadow: 0px 2px 16px 0px rgba(87, 102, 254, 0.07);
      border-radius: 10px;
      padding: 20px;

      .per-top {
        display: flex;

        .line {
          width: 8px;
          height: 22px;
          background: #5766fe;
          border-radius: 4px;
          margin-top: 10px;
        }

        .name {
          font-size: 26px;
          font-weight: 400;
          color: #222;
          margin-left: 10px;
        }
      }

      .replenishment {
        font-size: 18px;
        color: #8d8d8d;
        line-height: 35px;
        margin-top: 20px;
      }

      .swipe {
        // width:650px;
        height: 330px;
        margin: 20px auto;
        border: 1px solid #faffff;
        border-radius: 10px;
        background: #f1f6fc;

        .ment {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 20px auto;
          width: 120px !important;
          height: 120px;
          border-radius: 50%;
          border: 5px solid #ffa895;
          font-size: 15px;
          font-weight: bold;
          color: #505050;
          text-align: center;
          margin: 20px auto 10px;
        }

        .title {
          width: 95%;
          font-size: 13px;
          color: #6c6b72;
          line-height: 24px;
          margin-bottom: 25px;
          margin: auto;
          text-align: justify;
        }
      }

      .bot {
        width: 90%;
        height: 80px;
        margin: auto;
        text-align: center;

        .link {
          width: 200px;
          height: 30px;
          margin: auto;
          color: #222;
          line-height: 30px;
          font-weight: bold;
          justify-content: space-between;
          text-align: center;
          display: flex;

          .blue {
            width: 21px;
            height: 7px;
            margin-top: 12px;
            background: linear-gradient(180deg, #5e99ff 0%, #3a84fe 100%);
            border-radius: 1px;
          }

          .orange {
            width: 21px;
            height: 7px;
            margin-top: 12px;
            background: #ffbc44;
            border-radius: 1px;
          }
        }

        .line-text {
          font-size: 14px;
          color: #8d8d8d;
        }
      }
    }
  }

  .brain-health {
    width: 98%;
    // height:355px;
    background: #fff;
    border-radius: 10px;
    margin: 0px auto;
    box-shadow: 0px 2px 16px 0px rgba(87, 102, 254, 0.07);
    padding: 20px;

    .per-top {
      display: flex;

      .line {
        width: 8px;
        height: 22px;
        background: #5766fe;
        border-radius: 4px;
        margin-top: 10px;
      }

      .name {
        font-size: 26px;
        font-weight: 400;
        color: #222;
        margin-left: 10px;
      }
    }

    .swipe {
      width: 100%;
      margin: 20px auto;
      border: 1px solid #faffff;
      border-radius: 10px;
      background: #f1f6fc;
      padding: 10px;

      .ment {
        font-size: 15px;
        color: #505050;
      }

      .title {
        font-size: 13px;
        color: #6c6b72;
      }
    }
  }

  .tabel-list {
    width: 98%;
    height: 600px;
    background: #fff;
    border-radius: 10px;
    margin: 20px auto 0px;
    box-shadow: 0px 2px 16px 0px rgba(87, 102, 254, 0.07);
    padding: 20px;

    .per-top {
      display: flex;

      .line {
        width: 8px;
        height: 22px;
        background: #5766fe;
        border-radius: 4px;
        margin-top: 10px;
      }

      .name {
        font-size: 26px;
        font-weight: 400;
        color: #222;
        margin-left: 10px;
      }
    }
  }

  .remark {
    width: 95%;
    height: 100px;
    margin: 20px auto;

    p {
      font-size: 15px;
      font-weight: 400;
      color: #a0a0a0;
      line-height: 10px;
    }
  }

  ::v-deep(.ant-progress) {
    margin-top: 20px;
    text-align: center;
  }


  ::v-deep(.oneTable th.ant-table-cell) {
    background: #3a84fe;
    color: #fff;
  }

  ::v-deep(.oneTable td.ant-table-cell) {
    padding:6px !important;
    font-size: 12px;;
  }



  ::v-deep(.slick-dots button) {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #3a84fe !important;
  }

  ::v-deep(.ant-carousel .slick-dots li.slick-active) {
    width: 15px;
  }
}
</style>
