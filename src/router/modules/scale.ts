export default [
    {
        path: '/scaleTemplate',
        name: "量表模板",
        component: () => import('../../views/scaleTemplate/scaleTemplate.vue'),
    },
    {
        path: '/scaleResultTemplate',
        name: "量表结果模板",
        component: () => import('../../views/scaleResultTemplate/scaleResultTemplate.vue'),
    },

    {
        path: '/templateCFT',
        name: "量表模板CFT",
        component: () => import('../../views/scaleTemplate/templateCFT.vue'),
    },


]