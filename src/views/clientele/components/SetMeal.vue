<script setup lang="ts">
import dayjs, { Dayjs } from 'dayjs';
import { onMounted, ref, reactive } from 'vue';
import { LeftOutlined } from '@ant-design/icons-vue';
import { addTicketsBOOK, getPaginQueryCombine } from '@/apis/clientele';
import type { ServiceType, productType } from '@/types/clientele';
import type { addTicketsBOOKType } from '@/apis/clientele/type';
import { message } from 'ant-design-vue';
import load from "../../../components/load/load.vue";

const props = defineProps(['customerinfo']);
const emits = defineEmits(['cancel']);
const ServiceCategory = ref<ServiceType[]>();
const currentServiceId = ref<number>();
const product_list = ref<productType[]>([]);
const currentProductId = ref<number>();

const dateFormat: any = 'YYYY-MM-DD HH:mm';
const endTime = dayjs().add(1,'h');
const subDate = ref<Dayjs>(dayjs(endTime, dateFormat));
const newBOOK = reactive<addTicketsBOOKType>({
  bookingTime: '',
  clientId: '',
  clientName: '',
  phone: '',
  servName: '',
  serviceProductId: 0,
  studentId: 0
});

onMounted(async () => {
  newBOOK.clientId = props.customerinfo.archivesNo;
  newBOOK.clientName = props.customerinfo.name;
  newBOOK.phone = props.customerinfo.phone;
  getDataList()
});
const getDataList = () => {
  getPaginQueryCombine({
    pageNum: 1,
    pageSize: 99,
  }).then((res: any) => {
    if (res.code === 200) {
      ServiceCategory.value = res.data.data;
      SelectService(res.data?.data[0]);
    }
  })
}
// 选择服务
const SelectService = (item: any) => {
  product_list.value = item?.productList || [];
  currentServiceId.value = item?.id || 0;
};
//
const SelectProduct = (id: number, name: string) => {
  newBOOK.servName = name; //预约服务名称
  newBOOK.serviceProductId = id; //预约服务ID
  currentProductId.value = id;
};

// 新增预约工单
const addNewBOOK = async () => {
  if (subDate.value == null) {
    message.error('预约时间不能为空');
    return;
  }
  let date: string = dayjs(JSON.parse(JSON.stringify(subDate.value))).format('YYYY-MM-DD HH:mm');
  newBOOK.bookingTime = date;
  let res: any = await addTicketsBOOK(newBOOK);
  if (res.code === 200) {
    emits('cancel');
  }
};
const cancel = () => {
  emits('cancel');
};
//时间

const range = (start: number, end: number) => {
  const result = [];

  for (let i = start; i < end; i++) {
    result.push(i);
  }

  return result;
};

const disabledDate = (current: Dayjs) => {
  // 不能选择今天和以前的
  console.log(current, 'current');
  return current && current < dayjs().startOf('day');
};

const disabledDateTime = () => {
  return {
    disabledHours: () => range(24, 25),
    disabledMinutes: () => range(60, 60),
    disabledSeconds: () => [55, 56]
  };
};
let loadStatus = ref<string>('noData') //loading-加载中,noData-无数据,failure-加载失败
let schedule = ref<number>(20) //加载中进度
</script>
<template>
  <div class="package">
    <div class="btn-return">
      <span @click="cancel">
        <LeftOutlined /> 新增预约
      </span>
    </div>
    <div class="search">
      <div>客户姓名：{{ customerinfo.name }}</div>
      <div>
        预约时间:
        <a-date-picker :inputReadOnly="true" v-model:value="subDate" format="YYYY-MM-DD HH:mm"
          :disabled-date="disabledDate" :disabled-time="disabledDateTime"
          :show-time="{ defaultValue: dayjs('00:00:00', 'HH:mm') }" />
      </div>
    </div>
    <div class="btn-tab">
      <span v-for="item in ServiceCategory" :class="currentServiceId == item.id ? 'active' : ''"
        @click="SelectService(item)">{{ item.servTypeName }}</span>
    </div>
    <div class="card-content">
      <template v-if="product_list?.length !== 0">
        <div class="card-box">
          <div class="card" v-for="item in product_list" :class="currentProductId == item.id ? 'active' : ''"
            :key="item.id" @click="SelectProduct(item.id, item.prodName)">
            <div class="image-box">
              <img :src="item.mainPic" class="image" alt="" />
            </div>
            <div class="context">
              <h2>{{ item.prodName }}</h2>
              <div class="introduce">
                <b></b>
                <div class="con-title">{{ item.prodDescribe }}</div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <load :status="loadStatus" :schedule="schedule"></load>
      </template>
    </div>
    <div class="selec">
      <span @click="cancel">取消</span>
      <span @click="addNewBOOK">确认</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.btn-return {
  font-size: 16px;
  font-weight: bold;
  color: #222222;
  line-height: 22px;
  margin-bottom: 15px;
}

.package {
  width: 100%;
  height: 100%;
  padding: 10px;
  border-radius: 16px;
  background: #fff;
  position: relative;

  .search {
    display: flex;
    align-items: center;

    &>div {
      &:nth-child(1) {
        margin-right: 70px;
      }
    }
  }
}

.btn-tab {
  display: flex;
  margin: 18px 0px;

  span {
    display: block;
    width: 105px;
    height: 33px;
    line-height: 33px;
    background: #fff;
    color: #3d7eff;
    border-radius: 33px;
    border: 1px solid #3d7eff;
    font-size: 13px;
    font-weight: bold;
    margin-right: 29px;
    text-align: center;
    cursor: pointer;

    &.active {
      background: #3d7eff;
      color: #fff;
    }
  }
}

.card-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 466px;
  overflow-x: auto;

  .card {
    width: 518px;
    height: 195px;
    display: flex;
    justify-content: space-between;
    background: rgba(239, 240, 241, 1);
    border-radius: 8px;
    opacity: 0.8;
    padding: 13px;
    box-sizing: border-box;
    margin: 0 35px 30px 0;
    border: 2px solid rgba(239, 240, 241, 1);

    &.active {
      border: 2px solid #3d7eff;
    }

    .img {
      width: 40%;

      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    .context {
      flex: 1;
      padding-top: 15px;
      margin-left: 20px;

      h2 {
        font-size: 22px;
        font-weight: 600;
        color: #222222;
        line-height: 30px;
        overflow: hidden;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
      }

      .introduce {
        display: flex;
        align-items: flex-start;

        b {
          margin-top: 3px;
        }

        .con-title {
          width: 100%;
          overflow: hidden;
          -webkit-box-orient: vertical;
          display: -webkit-box;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          word-break: break-all;
        }
      }

      b {
        display: inline-block;
        width: 15px;
        height: 15px;
        background: url('@/assets/images/record_01.png') no-repeat;
        background-size: 100% 100%;
        margin-right: 3px;
      }

      .pice {
        margin-top: 10px;

        strong {
          font-size: 39px;
          font-weight: bold;
          color: #3476ff;
          line-height: 53px;
          vertical-align: sub;
        }

        span {
          font-size: 19px;
          font-weight: 400;
          color: #535251;
          line-height: 18px;
        }
      }
    }
  }
}

.selec {
  text-align: center;
  width: 100%;

  span {
    display: inline-block;
    width: 286px;
    line-height: 56px;
    text-align: center;
    border-radius: 28px;
    font-size: 18px;
    letter-spacing: 2px;
    font-weight: bold;

    &:nth-child(1) {
      background: #f7f8fa;
      margin-right: 40px;
    }

    &:nth-child(2) {
      background: #3d7eff;
      color: #fff;
    }
  }
}

.image {
  width: 184px;
  height: 168px;
  border-radius: 8px;
}

.card-box {
  height: 100%;
  width: fit-content;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
</style>
