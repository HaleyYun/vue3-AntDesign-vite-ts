<script setup  lang='ts'>
import { ref, onMounted, watch, onBeforeUpdate } from "vue"
const props = defineProps({
    total: {
        type: Number
    },
    currentPage: {
        type: Number
    },
})
const current = ref<any>(1)
onMounted(() => {
    current.value = props.currentPage
})
onBeforeUpdate(() => {
    current.value = props.currentPage
})
const emit = defineEmits(["changePage"])


const pageSize = ref<number>(5)

const changeCurrent = (page: number, size: any) => {
    console.log("page", page, size);

    pageSize.value = size
    current.value = page

    emit("changePage", page, size)
}


watch(() => props.currentPage, (newValue: any) => {
    current.value = newValue.currentPage
}, { deep: true })

const pageSizeOptions = ref<string[]>(['5', '10', '20', '30', '40', '50']);

</script>
<template>
    <div class="page-box">
        <!-- <a-pagination :current="current" :total="total" :pageSize="5" :showSizeChanger="false" @change="changeCurrent" /> -->
        <a-pagination v-model:current="current" :total="total" :pageSize="pageSize" @change="changeCurrent"
            show-quick-jumper :show-total="(total: any) => `共 ${total} 条`" :showSizeChanger="true"
            :page-size-options="pageSizeOptions" />
    </div>
</template>

<style lang='less' scoped>
.page-box {
    padding: 30px 0;
    text-align: right;
}

:deep(.ant-pagination-item-active) {
    font-weight: 500;
    background: #fff;
    border-color: #1890ff;
}

:deep(.ant-pagination-jump-prev .ant-pagination-item-container .ant-pagination-item-ellipsis, .ant-pagination-jump-next .ant-pagination-item-container .ant-pagination-item-ellipsis) {
    font-size: 10px !important;
}

:deep(.ant-pagination-jump-next .ant-pagination-item-container .ant-pagination-item-ellipsis) {
    font-size: 10px !important;
}
</style>