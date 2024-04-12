<script setup lang='ts'>
import { } from 'vue-router'
import { onMounted, ref } from 'vue'
import { message } from 'ant-design-vue';


defineProps<{ phone: string }>()
const emits = defineEmits(['getCode'])
const isShow = ref<boolean>(false)
const valueInput = ref<string[]>([])
const iskeyboard = ref<boolean>(false)
const isError = ref<boolean>(false)
const isSwitch = ref<boolean>(false)


onMounted(() => {
    // console.log(status);
    // let input = document.querySelectorAll('input')
    // console.log(input);
})

const HandleKeyBoard = (data: number) => {
    if (valueInput.value?.length <= 3) {
        valueInput.value.push(data.toString())
    }
    console.log(valueInput.value?.length);
}
const handleDelete = () => {
    let index = valueInput.value?.length - 1
    valueInput.value.splice(index, 1)
}
const handleOk = () => {
    if (valueInput.value?.length < 3) {
        message.error('请补全手机号');
        return
    }
    let code = ''
    valueInput.value.forEach((item: string) => {
        code += item
    })
    emits('getCode', code)
    iskeyboard.value = false
    valueInput.value = []

}
const changeIskeyboard = () => {
    isSwitch.value = true
    isError.value = false
    iskeyboard.value = true
}
const close = () => {
    iskeyboard.value = false;
    isSwitch.value = false;
    valueInput.value = [];
}
defineExpose({ isShow, isError })

</script>
<template>
    <a-modal v-model:visible="isShow" @ok="handleOk" :footer="null" width="40%" :maskClosable="false" @cancel="close">
        <div class="identity-verify">
            <div class="close"></div>
            <h3>预约身份校验</h3>
            <p>为了预约客户的服务权益，请筛查人员完成预约客户的身份校验，补全用户联系方式。</p>
            <div class="content-box">
                <p>{{ phone }}</p>
                <span @click="changeIskeyboard" :class="valueInput.length == 0 && isSwitch ? 'active' : ''">{{ valueInput[0] || '' }}
                    <b></b></span>
                <span @click="changeIskeyboard" :class="valueInput.length == 1 ? 'active' : ''">{{ valueInput[1] || '' }}
                    <b></b></span>
                <span @click="changeIskeyboard" :class="valueInput.length == 2 ? 'active' : ''">{{ valueInput[2] || '' }}
                    <b></b></span>
                <span @click="changeIskeyboard" :class="valueInput.length == 3 ? 'active' : ''">{{ valueInput[3] || '' }}
                    <b></b></span>
            </div>
            <!-- <div class="phone">
                <span>{{ splitStr(verify_phone) }}</span>
                <span class="number_box">
                    <div class="input"></div>
                    <div class="input"></div>
                    <div class="input"></div>
                    <div class="input"></div>
                    <input type="text" v-model="codeValue" @input="listenCode" maxlength="4" />
                </span>
            </div> -->
            <!-- <div class="err" v-if="isError">
                <img src="" alt="">
                <span>请补全手机号</span>
            </div> -->
            <a-button key="submit" type="primary" @click="handleOk" class="sub-btn"> {{ isError ? '重新验证' : '开始验证' }}</a-button>
            <div class="keyboard" v-if="iskeyboard">
                <span @click="HandleKeyBoard(1)">1</span>
                <span @click="HandleKeyBoard(2)">2</span>
                <span @click="HandleKeyBoard(3)">3</span>
                <span @click="HandleKeyBoard(4)">4</span>
                <span @click="HandleKeyBoard(5)">5</span>
                <span @click="HandleKeyBoard(6)">6</span>
                <span @click="HandleKeyBoard(7)">7</span>
                <span @click="HandleKeyBoard(8)">8</span>
                <span @click="HandleKeyBoard(9)">9</span>
                <span></span>
                <span @click="HandleKeyBoard(0)">0</span>
                <span @click="handleDelete">x</span>
            </div>
        </div>
    </a-modal>
    <!-- 键盘 -->
</template>
<style lang='less' scoped>
.identity-verify {
    position: relative;

    h3 {
        font-size: 28px;
        font-weight: bold;
        color: #222222;
        line-height: 40px;
        margin-top: 40px;
    }

    &>p {
        font-size: 14px;
        font-weight: 400;
        color: #777777;
        line-height: 20px;
    }


}

// .identity-verify {
//     h3 {
//         font-size: 28px;
//         font-weight: bold;
//         color: #222222;
//         line-height: 40px;
//         margin-top: 20px;
//     }



//     .phone {
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         font-size: 35px;
//         text-align: center;
//         letter-spacing: 5px;

//         &>span {
//             display: block;
//             height: 60px;
//             font-weight: bold;

//             &:nth-child(1) {
//                 padding-top: 5px;
//             }

//             input {
//                 display: block;
//                 // display: inline-block;
//                 margin-right: 5px;
//                 width: 220px;
//                 height: 70px;
//             }
//         }

//         .input {
//             display: inline-block;
//             width: 46px;
//             height: 60px;
//             border: 1px solid #dedede;
//             // vertical-align: middle;
//             margin-right: 10px;
//             // margin-bottom: 2px;
//         }
//     }

//     button {
//         display: block;
//         width: 150px;
//         height: 40px;
//         margin: 25px auto 0px;
//         border-radius: 15px;
//     }

//     .inputValue {
//         width: 10%;
//         text-align: center;
//     }
// }
.content-box {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    height: 100px;
    margin: 0 auto;
    font-size: 40px;
    font-weight: bold;

    &>p {
        margin-bottom: 0;
        letter-spacing: 5px;
    }

    &>span {
        display: block;
        width: 36px;
        height: 60px;
        margin-right: 10px;
        line-height: 60px;
        font-size: 34px;
        text-align: center;
        border: 1px solid #817979;
        position: relative;

        &.active {
            &>b {
                width: 1px;
                height: 26px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #222222;
                animation: show 1.5s infinite;
            }
        }
    }
}

@keyframes show {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.keyboard {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 45vh;
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    z-index: 19999;

    &>span {
        display: block;
        width: calc(100% / 3);
        height: calc(100% / 4);
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 30px;
        color: #111010;
        border-right: 1px solid #cecbcb;
        border-top: 1px solid #cecbcb;
        box-sizing: border-box;

        &:active {
            opacity: .5;
        }

        &:nth-child(3n) {
            border-right: none;
        }
    }

    .sub-btn {
        display: block;
        width: 300px;
    }

}

:deep(.ant-btn) {
    display: block;
    width: 337px;
    height: 54px;
    border-radius: 27px;
    margin: 0 auto;
}</style>
