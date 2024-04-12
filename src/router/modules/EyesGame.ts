import cameraCenter from "@/views/eyesGame/cameraCenter.vue"
import beforeRemPicVoice from "@/views/eyesGame/beforeRemPicVoice.vue"
import rememberPic from "@/views/eyesGame/rememberPic.vue"
import rememberPicDb from "@/views/eyesGame/rememberPicDb.vue"
import beforeVideoVoice from "@/views/eyesGame/beforeVideoVoice.vue"
import eyesVideo from "@/views/eyesGame/eyesVideo.vue"
import beforeEyesJumpTips from "@/views/eyesGame/beforeEyesJumpTips.vue"
import startEyes from "@/views/eyesGame/startEyes.vue"
import beforeHyPicVoice from "@/views/eyesGame/beforeHyPicVoice.vue"
import endVoice from "@/views/eyesGame/endVoice.vue"
import resultFeedBack from "@/views/eyesGame/resultFeedBack.vue"
import testEyesIndex from "@/views/eyesGame/testEyesIndex.vue"
import testEyesJump from "@/views/eyesGame/testEyesJump.vue"
import testSucErr from "@/views/eyesGame/testSucErr.vue"
import xmTestCorrect from "@/views/eyesGame/eyesCorrect.vue"

export default [
    {
        path: "/xmCameraCenter",
        name: "小米平板确认页面",
        component: cameraCenter,
    },
    {
        path: "/xmBeforeRemPicVoice",
        name: "小米平板记忆图片之前语音",
        component: beforeRemPicVoice,
    },
    {
        path: "/xmRememberPic",
        name: "小米平板记忆图片记忆1",
        component: rememberPic,
    },
    {
        path: "/xmRememberPicDb",
        name: "小米平板记忆图片记忆2",
        component: rememberPicDb,
    },
    {
        path: "/xmBeforeVideoVoice",
        name: "小米平板视频前的语音",
        component: beforeVideoVoice,
    },
    {
        path: "/xmEyesVideo",
        name: "小米平板视频",
        component: eyesVideo,
    },
    {
        path: "/xmBeforeEyesJumpTips",
        name: "小米平板眼跳前确认按钮页面",
        component: beforeEyesJumpTips,
    },
    {
        path: "/xmStartEyes",
        name: "小米平板眼跳测试",
        component: startEyes,
    },
    {
        path: "/xmBeforeHyPicVoice",
        name: "小米平板回忆图片前的语音",
        component: beforeHyPicVoice,
    },
    {
        path: "/xmEndVoice",
        name: "小米平板结束语音",
        component: endVoice,
    },
    {
        path: "/xmResultFeedBack",
        name: "小米平板提交页面",
        component: resultFeedBack,
    },
    {
        path: "/xmTestEyesIndex",
        name: "小米平板练习首页",
        component: testEyesIndex,
    },
    {
        path: "/xmTestEyesJump",
        name: "小米平板练习眼跳",
        component: testEyesJump,
    },
    {
        path: "/xmTestSucErr",
        name: "小米平板练习对错页面",
        component: testSucErr,
    },
    {
        path: "/xmTestCorrect",
        name: "小米平板眼动矫正页",
        component: xmTestCorrect,
    },
]