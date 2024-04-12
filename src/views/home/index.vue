<!-- 首页 -->
<script setup lang='ts'>
import TableList from './components/TableList.vue';
import StatisticsPicture from './components/StatisticsPicture.vue';
import dayjs, { Dayjs } from 'dayjs';
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { getHomeList, rankInfo, achieveList, updateAchieve, getEstimatesChart } from "@/apis/home/index"
import { listData, rankType } from "@/apis/home/type"
import { useEvaluateData } from "@/stores/HomeData"

import { upload } from "@/apis/upload/index"
import { message } from 'ant-design-vue';
import load from "../../components/load/load.vue";
import { getAppVersion } from '../../apis/home/index'
import { clearCacheFun } from '../../utils/voice'

const router = useRouter()

const EvaluateData = useEvaluateData()
const EvaluateList = ref<listData[]>([])

const currentPage = ref<number>(1) //页码

const rank_info = ref<rankType>()


// const fileList = ref([]);
const loading = ref<boolean>(false);
const imageUrl = ref<string>('');


const charts = reactive<any>({
    chartX: [],
    chartY: []
})
const showMore = ref<boolean>(false)


onMounted(async () => {
    const list = JSON.parse(localStorage.getItem('menu') as any)
    const newArr = list.filter((item: any) => item.menuType == 1)
    if (newArr.length > 0) {

        newArr.forEach((el: any) => {
            if (el.menuName === '评估记录') {
                showMore.value = true
            }
        });


    }
    getAppVersion().then(res => {
        if (res.code === 200) {
            if (!res.data) return;
            try {
                let appVersion = localStorage.getItem('appVersion')
                if (!appVersion) {
                    localStorage.setItem('appVersion', res.data);
                    clearCacheFun();
                } else {
                    if (appVersion !== res.data) {
                        localStorage.setItem('appVersion', res.data);
                        clearCacheFun();
                    }
                }
            } catch (error) {
                console.log('非pad请主动刷新', error);
            }

        }
    })

    //我的筛查
    const res = await getHomeList({ pageNum: 1, pageSize: 6 });
    if (res.code == 200) {
        if (res.data == null || res.data.total == 0) {
            loadStatus.value = 'noData'
            EvaluateList.value = []
        } else {
            EvaluateData.getList(res.data.data, res.data.total, res.data.pageSize)
            EvaluateList.value = await EvaluateData.changePage(currentPage.value)
        }
    } else {
        loadStatus.value = 'failure'
        EvaluateList.value = []
    }

    //排名
    const ranks = await rankInfo({})
    // console.log(ranks)
    if (ranks.data != null && ranks.data != undefined && Object.keys(ranks.data).length > 0) {
        rank_info.value = ranks.data
    }

    //我的成就
    const achieve = await achieveList({})

    if (achieve.code === 200 && achieve.data != null && achieve.data != undefined) {
        imageUrl.value = achieve.data
    }

    //七日筛查数据
    const chart = await getEstimatesChart({ queryDate: '' });
    if (chart.code === 200 && chart.data != null && chart.data != undefined) {

        chart.data.forEach((element: any) => {

            charts.chartX.push(element['date'].substring(5, element['date'].length))
            charts.chartY.push(element['estimateCount'])

        });

    }

})
// 下拉加载
// const getList = async (e: any) => {
//     let boxHeight = e.target.offsetHeight
//     let top = e.target.scrollTop
//     let overall = e.target.scrollHeight
//     let scrollBottomHeight = overall - boxHeight - top
// }

const dateFormat = 'YYYY-MM-DD';
const value3 = ref<Dayjs>(dayjs())
const value4 = ref<Dayjs>(dayjs())

//我的筛查日期筛选触发列表筛选
const handleChange = async (val: any) => {
    if (val == null) {
        return false;
    }
    let queryDate: string = dayjs(val).format('YYYY-MM-DD')
    const res = await getHomeList({ pageNum: 1, pageSize: 6, queryDate: queryDate });
    console.log();
    if (res.code == 200) {
        if (res.data == null || res.data.total == 0) {
            loadStatus.value = 'noData'
            EvaluateList.value = []
        } else {
            EvaluateData.getList(res.data.data, res.data.total, res.data.pageSize)
            EvaluateList.value = await EvaluateData.changePage(currentPage.value);
        }
    } else {
        loadStatus.value = 'failure'
        EvaluateList.value = []
    }
};

//七日筛查数据按日期触发筛选

const handleChange1 = async (val: any) => {

    if (val == null) {
        return false;
    }
    let queryDate: string = dayjs(val).format('YYYY-MM-DD')
    const chart = await getEstimatesChart({ queryDate: queryDate });
    if (chart.code === 200 && chart.data != null && chart.data != undefined) {
        charts.chartX = []
        charts.chartY = []
        chart.data.forEach((element: any) => {


            charts.chartX.push(element['date'])
            charts.chartY.push(element['estimateCount'])

        });

    }
};



//自定义上传
const customRequest = async (params: any) => {


    const isJpgOrPng = params.file.type === 'image/jpeg' || params.file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('图片类型必须是jpeg或者png');
    }

    const isLt2M = params.file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('图片大小必须小于2M');
    }


    const formData = new FormData();
    formData.append('file', params.file); // 添加文件数据  
    formData.append('filename', params.filename); // 添加文件名  

    const upload_res = await upload(formData);
    // console.log('上传结果:')
    // console.log(upload_res)
    if (upload_res.data.url) {

        imageUrl.value = upload_res.data.url

        //上传服务器
        const sub_res = await updateAchieve({ aptitudeUrl: upload_res.data.url })

        if (sub_res.code == 200) {
            message.success("更新资质成功");
        }

    } else {
        imageUrl.value = '';
        message.error('服务器开小差~,请重新上传');

    }

}
const operationValue = ref<boolean>(false);

import { PlusOutlined } from '@ant-design/icons-vue';

const open = ref<boolean>(false);

const checkImg = () => {
    operationValue.value = true;
    // imageUrl.value = '';
}
const handleLook = () => {
    operationValue.value = false;
    open.value = true;
}
const handleDelete = () => {
    operationValue.value = false;
    imageUrl.value = '';

    updateAchieve({ aptitudeUrl: '' })
    message.success("删除成功");


}

const handleCancel = () => {
    open.value = false;
};
let loadStatus = ref<string>('loading') //loading-加载中,noData-无数据,failure-加载失败
let schedule = ref<number>(0) //加载中进度

</script>
<template>
    <div class=home-box>
        <div class="left">
            <div class="subscribe">
                <div class="table-title">
                    <div class="check_left">我的筛查</div>
                    <div class="check_right">
                        <div class="check_01" style="width: 125px;">
                            <a-date-picker v-model:value="value3" picker="date" :bordered="false" :format="dateFormat"
                                :inputReadOnly="true" @change="handleChange">
                                <template #suffixIcon>
                                    <span class="angle"></span>
                                </template>
                            </a-date-picker>
                        </div>
                        <div v-if="showMore" class="check_02" @click="router.push('/assessment/record')"
                            style="height: 32px;">
                            <span>查看更多 </span>
                            <span class="angle1"></span>
                        </div>
                    </div>
                </div>
                <load :status="loadStatus" :schedule="schedule" v-if="EvaluateList?.length == 0"></load>
                <div class="table-box" v-else>
                    <TableList :list="EvaluateList" />
                </div>
            </div>
            <div class="statistics">
                <div>
                    <h2>七日筛查数量走势</h2>
                    <div style="width: 125px;">
                        <a-date-picker v-model:value="value4" picker="date" :inputReadOnly="true" :bordered="false"
                            @change="handleChange1">
                            <template #suffixIcon>
                                <span class="angle"></span>
                            </template>
                        </a-date-picker>
                    </div>
                </div>
                <StatisticsPicture v-model:chartX="charts.chartX" v-model:chartY="charts.chartY" />
            </div>
        </div>
        <div class="right">
            <h2>我的成就</h2>
            <div class="ranking">
                <div>
                    <p><img src="@/assets/images/24gf-heartPulse@3x.png" alt="">渠道排名</p>
                    <div>
                        <img src="@/assets/images/lj12@3x.png" alt="" srcset="">
                    </div>
                    <span>{{ rank_info?.channelRank ? rank_info?.channelRank : '--' }}名</span>
                </div>
                <div>
                    <p><img src="@/assets/images/thermometer@3x.png" alt="">机构排名</p>
                    <div>
                        <img src="@/assets/images/bz3@3x.png" alt="" srcset="">
                    </div>
                    <span>{{ rank_info?.organRank ? rank_info?.organRank : '--' }}名</span>
                </div>

            </div>
            <div>
                <h2>我的资质</h2>
                <div class="clearfix">
                    <img v-if="imageUrl" :src="imageUrl" alt="我的资质" class="achieve_img" @click="checkImg" />
                    <a-upload v-else name="avatar" list-type="picture-card" class="avatar-uploader"
                        :customRequest="customRequest">
                        <div>
                            <loading-outlined v-if="loading"></loading-outlined>
                            <plus-outlined v-else></plus-outlined>
                            <div class="ant-upload-text">上传图片</div>
                        </div>
                    </a-upload>
                    <div class="operation" v-if="operationValue">
                        <div>
                            <img src="@/assets/images/look.png" alt="" @click="handleLook">
                            <img src="@/assets/images/del.png" alt="" @click="handleDelete">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <a-modal v-model:visible="open" :footer="null" @cancel="handleCancel" width="35%">
        <img style="width: 100%" :src="imageUrl" />
    </a-modal>
</template>
<style lang='less' scoped>
h2 {
    font-size: 16px;
    font-weight: bold;
    color: #222222;
    line-height: 35px;
}

.table-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.angle {
    display: block;
    margin-top: 5px;
    width: 0px;
    height: 0px;
    border: 5px solid transparent;
    border-top-color: #000;
    border-radius: 2px;
}

.angle1 {
    display: block;
    width: 0px;
    height: 0px;
    border: 5px solid transparent;
    border-left-color: #000;
    border-radius: 2px;
}

.home-box {
    display: flex;
    justify-content: space-between;
    background: #F3F3F3;
    height: 100%;
    width: 100%;
    padding: 5px;
    box-sizing: border-box;

    .left {
        width: 781px;
        display: flex;
        flex-direction: column;

        .subscribe {
            width: 100%;
            flex-grow: 1;
            background: #FFFFFF;
            border-radius: 16px;
            padding: 10px 32px 10px 13px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;

            h2 {
                margin-left: 15px;
            }

            .table-box {
                margin: 10px 0 0 18px;
                flex-grow: 1;
            }
        }

        .statistics {
            height: 293px;
            background: #FFFFFF;
            border-radius: 16px;
            margin-top: 15px;
            padding: 17px 30px;

            &>div {
                &:nth-child(1) {
                    display: flex;
                    justify-content: space-between;

                    h2 {
                        margin-left: 0;
                        margin-right: 0;
                    }

                    &>div {
                        width: 120px;
                        border-radius: 6px;
                    }

                }
            }
        }
    }

    .right {
        width: calc(100% - 796px);
        height: 100%;

        .ranking {
            display: flex;
            justify-content: space-between;
            margin-bottom: 25px;

            &>div {
                width: 48%;
                background: #fff;
                padding: 11px;
                border-radius: 8px;

                &>p {
                    display: flex;
                    align-items: center;
                    font-size: 18px;
                    font-weight: bold;
                    color: #222222;
                    margin-bottom: 30px;

                    img {
                        display: block;
                        width: 20px;
                        margin-right: 6px;
                    }
                }

                &>div {
                    margin-bottom: 18px;

                    img {
                        display: block;
                        width: 130px;
                        margin: 0 auto;
                    }
                }

                &>span {
                    font-weight: bold;
                    font-size: 24px;
                }
            }
        }

        .up-img {
            display: flex;
            justify-content: space-between;
        }
    }
}

// 我的资质
.clearfix {
    position: relative;

    .operation {
        position: absolute;
        top: 0;
        left: 0;
        width: 180px;
        height: 210px;
        border-radius: 8px;
        background: rgba(78, 78, 79, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;

        &>div {
            width: 100%;
            height: 40px;
            display: flex;
            justify-content: space-around;
            align-items: center;

            img {
                &:nth-child(1) {
                    display: block;
                    width: 40px;
                }

                &:nth-child(2) {
                    display: block;
                    width: 24px;
                    height: 32px;
                }
            }
        }
    }
}

:deep(.ant-modal-close-x) {
    display: block;
    width: 32px;
    height: 28px;
    font-size: 16px;
    font-style: normal;
    line-height: 32px;
    text-align: center;
    text-transform: none;
    text-rendering: auto;
}

:deep(.ant-table-tbody > tr:nth-child(6) > td) {
    border: none;
}

:deep(.ant-picker.ant-picker-borderless) {
    background: #F7F8FA !important;
    color: #222222;
    font-weight: bold !important;
}

:deep(.ant-picker-input > input) {
    color: #222222;
    font-weight: bold;
}



.check_left {
    font-size: 16px;
    font-weight: bold;
    color: #222222;
    line-height: 22px;
}

.check_right {}

.check_01 {
    float: left;
    margin-right: 12px;
}

.check_02 {
    display: flex;
    width: 100px;
    justify-content: space-around;
    align-items: center;
    height: 40px;
    background: #F7F8FA;
    // border-radius: 6px;
    padding-left: 5px;

    span {
        display: block;

        &:nth-child(1) {
            font-size: 12px;
            font-weight: bold;
            color: #222222;
            margin-right: 10px;
        }
    }
}

:deep(.ant-upload-select-picture-card) {
    width: 180px;
    height: 210px;
    border-radius: 8px;

}

:deep(.ant-upload-list-item-list-type-picture-card) {
    width: 180px;
    height: 210px;
    border-radius: 8px;
}

.chart_bottom {
    text-align: center;
}

.chart_bottom span:nth-child(1) {
    width: 10px;
    height: 10px;
    background: #40B761;
    border-radius: 6px;
    display: inline-block;
    margin-right: 5px;
}

.chart_bottom span:nth-child(2) {
    width: 48px;
    height: 17px;
    font-size: 12px;
    font-weight: bold;
    color: #323233;
    line-height: 17px
}

:deep(.ant-upload-list-picture-card-container) {
    display: none !important;
}

.achieve_img {
    width: 180px;
    height: 210px;
    border-radius: 8px;

}
</style>