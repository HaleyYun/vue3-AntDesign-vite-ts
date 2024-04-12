<script setup  lang='ts'>
import { } from 'vue-router'
import { onMounted } from 'vue'
onMounted(() => {
    // 获取ul
    document.querySelector('ul')!.addEventListener('scroll', ajacs(100))
    // 防抖定时器
    function ajacs(times:number) {
        var time:any = null
        return function (e:any) {
            if (time !== null) {
                clearTimeout(time);
            }
            /*获取滚动条高度*/
            let scrollTop = e.scrollTop
            time = setTimeout(() => {
                /* 事件结束开始执行最终方法*/
                return ajas(scrollTop)
            }, times);
        }
    }
    // 最终输出位置
    function ajas(scrollTop:any) {
        //读取滚动条的位置
        /*60是每一块的高度，前面两个是空的从0开始算起，需要＋1才能符合当前位置*/
        let list = scrollTop / 60 + 1
        console.log('选中第' + list + '个元素');
    }
}),

</script>
<template>
    <div class="div">
        <ul class="box">
            <!-- /* 开头需要空两行*/ -->
            <li></li>
            <li></li>
            <li>第一</li>
            <li>第二</li>
            <li>地三</li>
            <li>第四</li>
            <li>第五</li>
            <li>第六</li>
            <li>第七</li>
            <li>第八</li>
            <li>第九</li>
            <li>第十</li>
        </ul>
    </div>
</template>

<style lang='less' scoped>
.box {
    list-style: none;
    width: 400px;
    height: 300px;
    overflow: auto;
    scroll-snap-type: y mandatory;
    /* scroll-snap-type: y mandatory 中，y 表示捕捉 y 轴方向上的滚动，
       mandatory 表示强制将滚动结束后元素的停留位置设置到我们规定的地方。 */
}

.box li {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 1.2rem;
    color: #333;
    scroll-snap-align: start;
    /* 滚动父容器元素设置scroll-snap-type:y mandatory，强制定位， 子列表元素设置scroll-snap-start使当前聚焦的滚动子元素在滚动方向上相对于父容器顶部对齐，于是效果达成。 */
}

.box li:last-child {
    margin-bottom: 120px;
}

/* 整体居中 */
.div {
    width: 400px;
    height: 300px;
    position: relative;
    background: linear-gradient(to bottom, rgba(117, 107, 128, 0.3) 0%, rgba(117, 107, 128, 0) 25%, rgba(117, 107, 128, 0) 75%, rgba(117, 107, 128, .3) 100%);
    box-shadow: inset 0px 0px 12px rgba(0, 0, 0, .2);
    border-radius: 12px;
}

/* 选择框 */
.div::after {
    content: '';
    position: absolute;
    top: 120px;
    width: 100%;
    height: 60px;
    background: linear-gradient(to bottom, rgba(117, 107, 128, 0.1) 0%, rgba(117, 107, 128, .2) 50%, rgba(117, 107, 128, .25) 50%, rgba(117, 107, 128, .1) 100%);
    pointer-events: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, .12);
    border-top: 1px solid rgba(0, 0, 0, .12);
    border-bottom: 1px solid rgba(0, 0, 0, .12);
}

/* //清除滚动条 */
::-webkit-scrollbar {

    display: none;
}
</style>