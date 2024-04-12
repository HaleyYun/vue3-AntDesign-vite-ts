export default [

    {
        path: '/startDepress',
        name: "抑郁人脸识别",
        component: () => import('@/views/depressedGame/startDepress.vue'),
    },
    {
        path: '/depressCorrect',
        name: "抑郁点位矫正页",
        component: () => import('@/views/depressedGame/depressCorrect.vue'),
    },
    {
        path: "/freeGuide",
        name: "自由观看范式引导页",
        component: () => import("@/views/depressedGame/freeGuide.vue"),
    },

    {
        path: "/freeLook",
        name: "自由观看范式",
        component: () => import("@/views/depressedGame/freeLook.vue"),
    },

    {
        path: "/gazeGuide",
        name: "凝视范式引导页",
        component: () => import("@/views/depressedGame/gazeGuide.vue"),
    },
    {
        path: "/guideTask",
        name: "凝视范式",
        component: () => import("@/views/depressedGame/gazeTask.vue"),
    },

    {
        path: "/noticeGuide",
        name: "注意切换范式引导页 ",
        component: () => import("@/views/depressedGame/noticeGuide.vue"),
    },
    
    {
        path: "/noticeSwitch",
        name: "注意切换范式",
        component: () => import("@/views/depressedGame/noticeSwitch.vue"),
    },


    {
        path: "/depressedResult",
        name: "抑郁结果页",
        component: () => import("@/views/depressedResult/index.vue"),
    }
]