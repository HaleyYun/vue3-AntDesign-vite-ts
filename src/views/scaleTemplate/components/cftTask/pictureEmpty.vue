<template>
    <div class="content-canvas">
        <div class="task-more">
            <div class="task-li">
                <div class="li-small" @click="showBig(upStepImg ? upStepImg : optionData.imgUrl)">
                    <img src="../../../../assets/images/moca/smallBtn.png" />
                </div>
                <div class="li-big">
                    <img :src="upStepImg ? upStepImg : optionData.imgUrl" />
                    <!-- <img :src="drawimgUrl" />   -->
                </div>
            </div>
            <div class="task-me">
                <div class="input_answer" @click="checkedScore('all', '一键评分')">一键评分</div>
                <div class="picture_empty_box">
                    <div class="item_box left_item item_1_11">
                        <p>{{ optionData.answers[0] }}</p>
                        <div @click="checkedScore(0, '1:十字架')">1:十字架</div>
                    </div>
                    <div class="item_box left_item item_2_14">
                        <p>{{ optionData.answers[1] }}</p>
                        <div @click="checkedScore(1, '2:大长方形')">2:大长方形</div>
                    </div>
                    <div class="item_box left_item item_3_10">
                        <p>{{ optionData.answers[2] }}</p>
                        <div @click="checkedScore(2, '3:对角交叉')">3:对角交叉</div>
                    </div>
                    <div class="item_box left_item item_4_16">
                        <p>{{ optionData.answers[3] }}</p>
                        <div @click="checkedScore(3, '4:水平线')">4:水平线</div>
                    </div>
                    <div class="item_box bottom_item item_5">
                        <div @click="checkedScore(4, '5:垂直线')">5:垂直线</div>
                        <p>{{ optionData.answers[4] }}</p>
                    </div>
                    <div class="item_box left_item item_6_15">
                        <p>{{ optionData.answers[5] }}</p>
                        <div @click="checkedScore(5, '6:小长方形')">6:小长方形</div>
                    </div>
                    <div class="item_box left_item item_7_13">
                        <p>{{ optionData.answers[6] }}</p>
                        <div @click="checkedScore(6, '7:小段')">7:小段</div>
                    </div>
                    <div class="item_box top_item item_8">
                        <div @click="checkedScore(7, '8:平行线')">8:平行线</div>
                        <p>{{ optionData.answers[7] }}</p>
                    </div>
                    <div class="item_box top_item item_9">
                        <div @click="checkedScore(8, '9:三角形')">9:三角形</div>
                        <p>{{ optionData.answers[8] }}</p>
                    </div>
                    <div class="item_box right_item item_3_10">
                        <div @click="checkedScore(9, '10:线')">10:线</div>
                        <p>{{ optionData.answers[9] }}</p>
                    </div>
                    <div class="item_box right_item item_1_11">
                        <div @click="checkedScore(10, '11:三点圆')">11:三点圆</div>
                        <p>{{ optionData.answers[10] }}</p>
                    </div>
                    <div class="item_box right_item item_12_18">
                        <div @click="checkedScore(11, '12:平行线')">12:平行线</div>
                        <p>{{ optionData.answers[11] }}</p>
                    </div>
                    <div class="item_box right_item item_7_13">
                        <div @click="checkedScore(12, '13:三角形')">13:三角形</div>
                        <p>{{ optionData.answers[12] }}</p>
                    </div>
                    <div class="item_box right_item item_2_14">
                        <div @click="checkedScore(13, '14:菱形')">14:菱形</div>
                        <p>{{ optionData.answers[13] }}</p>
                    </div>
                    <div class="item_box right_item item_6_15">
                        <div @click="checkedScore(14, '15:线')">15:线</div>
                        <p>{{ optionData.answers[14] }}</p>
                    </div>
                    <div class="item_box right_item item_4_16">
                        <div @click="checkedScore(15, '16:线')">16:线</div>
                        <p>{{ optionData.answers[15] }}</p>
                    </div>
                    <div class="item_box bottom_item item_17">
                        <div @click="checkedScore(16, '17:十字架')">17:十字架</div>
                        <p>{{ optionData.answers[16] }}</p>
                    </div>
                    <div class="item_box left_item item_12_18">
                        <p>{{ optionData.answers[17] }}</p>
                        <div @click="checkedScore(17, '18:广场')">18:广场</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs, watch, defineExpose } from "vue";
import { useState } from '@/stores/state';
const cftState = useState();
export default {
    props: {
        optionData: {
            type: Object,
            required: true,
        },
        str: {
            type: String,
            required: true,
        },
        upStepImg: {
            type: String,
            required: true,
        }
    },
    components: {},
    setup(props, { emit }) {
        const state = reactive({
            optionKey: '',
            drawimgUrl: ''
        })
        if (props.str === 'modify') {
            if (typeof props.optionData.answers == 'string') {
                let str = props.optionData.answers
                str = str.split(",")
                props.optionData.answers = str
                console.log(props.optionData.answers)
            }
        } else {
            props.optionData.answers = []
        }

        //放大图片
        const showBig = url => {
            console.log(url);
            emit('showImage', url, true);
        };


        const changeScore = (score) => {
            if (state.optionKey == "all") {
                for (let i = 0; i < 18; i++) {
                    props.optionData.answers[i] = score
                }
            } else {
                props.optionData.answers[state.optionKey] = score
            }
            emit('changeNextStatus', true);
        }

        //评分
        const checkedScore = (val, str) => {
            state.optionKey = val
            emit('checkCount', true, str)
        };
        defineExpose({
            changeScore
        })
        return {
            ...toRefs(state),
            checkedScore,
            showBig,
            changeScore
        };
    },
};
</script>

<style lang="less" scoped>
.content-canvas {
    width: 100%;
    height: 100%;
    background-color: #efefef;
    overflow: hidden;

    .task-more {
        width: 100%;
        height: 100%;
        display: flex;
        float: left;

        .task-li {
            width: 356px;
            height: 100%;

            .li-small {
                width: 45px;
                height: 45px;
                margin: 50px 150px 50px 150px;

                img {
                    width: 45px;
                    height: 45px;
                }
            }

            .li-big {
                width: 320px;
                height: 320px;
                background-color: #fff;
                border-radius: 16px;
                overflow: hidden;

                img {
                    width: 320px;
                    height: 320px;
                }
            }
        }

        .task-me {
            width: 88%;
            height: 100%;
            background-color: #fff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.12);

            .input_answer {
                width: 130px;
                height: 44px;
                background: #5765FE;
                border-radius: 28px;
                border: 1px solid #5765FE;
                font-size: 18px;
                font-family: SourceHanSansCN, SourceHanSansCN;
                font-weight: bold;
                color: #FFFFFF;
                line-height: 44px;
                text-align: center;
                margin: 10px auto 10px;
            }

            .picture_empty_box {
                width: 80%;
                height: 80%;
                background-image: url("../../../../assets/images/moca/picture_score_bg.png");
                background-size: 80%;
                background-repeat: no-repeat;
                background-position: center center;
                margin: auto;
                position: relative;

                .item_box {
                    height: 36px;
                    line-height: 36px;
                    display: flex;
                    align-items: center;
                    position: absolute;

                    div {
                        width: 100px;
                        font-size: 18px;
                        font-family: SourceHanSansCN, SourceHanSansCN;
                        font-weight: bold;
                    }

                    p {
                        font-size: 20px;
                        padding: 0px 13px;
                        background: #5765fe;
                        border-radius: 10px;
                        color: #ffffff;
                        margin: 0px;
                    }
                }

                .left_item {
                    left: -80px;
                    text-align: right;

                    div {
                        margin-left: 0px;
                    }
                }

                .top_item {
                    top: 5px;

                    div {
                        margin-right: 0px;
                    }
                }

                .right_item {
                    right: -80px;
                    text-align: left;

                    div {
                        margin-right: 0px;
                    }
                }

                .bottom_item {
                    bottom: 10px;

                    div {
                        margin-right: 0px;
                    }
                }

                .item_1_11 {
                    top: 80px;
                }

                .item_2_14 {
                    bottom: 85px;
                }

                .item_3_10 {
                    top: 30px;
                }

                .item_4_16 {
                    top: 190px;
                }

                .item_5 {
                    left: 285px;

                    div {
                        width: 85px;
                    }
                }

                .item_6_15 {
                    bottom: 145px;
                }

                .item_7_13 {
                    top: 140px;
                }

                .item_8 {
                    left: 255px;

                    div {
                        width: 85px;
                    }
                }

                .item_9 {
                    left: 455px;

                    div {
                        width: 85px;
                    }
                }

                .item_17 {
                    left: 485px;

                    div {
                        width: 95px;
                    }
                }

                .item_12_18 {
                    bottom: 30px;
                }
            }
        }
    }
}

.desk {
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
</style>