export default [

    {
        path: '/mocaGame',
        name: "摩卡量表",
        component: () => import('@/views/mocaGame/gameStart.vue'),
    },
    {
        path: '/mocaResult',
        name: "摩卡报告",
        component: () => import('@/views/mocaGame/mocaResult.vue'),
    }
]