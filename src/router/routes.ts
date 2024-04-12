import eyesGame from "./modules/EyesGame"
import depressed from "./modules/Depressed"
import mocaGame from "./modules/mocaGame"
import scale from "./modules/scale"
export const routes = [
    {
        path: '/',
        component: () => import('@/Layout/index.vue'),
        name: 'layout',
        meta: {
            title: '首页',
            hidden: false,
            icon: "home"
        },
        redirect: "/home",
        children: [
            {
                path: '/home',
                component: () => import('@/views/home/index.vue'),
                meta: {
                    title: '首页',
                    hidden: false,
                    icon: 'HomeOutlined',
                },
            },
            {
                path: '/couponRecord',
                component: () => import('@/views/coupon/Record.vue'),
                meta: {
                    title: '优惠卷记录',
                    hidden: false,
                    icon: 'HomeOutlined',
                },
            },
            {
                path: '/equity',
                component: () => import('@/views/equity/equityIndex.vue'),
                meta: {
                    title: '权益记录',
                    hidden: false,
                    icon: 'HomeOutlined',
                },
            },
        ],
    },
    {
        path: '/couponSending',
        component: () => import('@/views/coupon/Sending.vue'),
        meta: {
            title: '发送优惠卷',
            hidden: false,
            icon: 'HomeOutlined',
        },
    },
    {
        path: '/writeOff',
        component: () => import('@/views/equity/writeOff.vue'),
        meta: {
            title: '发送优惠卷',
            hidden: false,
            icon: 'HomeOutlined',
        },
    },
    {
        path: '/equityDetails',
        component: () => import('@/views/equity/equityDetails.vue'),
        meta: {
            title: '发送优惠卷',
            hidden: false,
            icon: 'HomeOutlined',
        },
    },
    {
        path: '/BHIPage',
        component: () => import('@/views/BHIPage/BHIIndex.vue'),
        meta: {
            title: '发送优惠卷',
            hidden: false,
            icon: 'HomeOutlined',
        },
    },
    {
        path: '/screeningServer',
        component: () => import('@/views/screeningServer/screeningServer.vue'),
        meta: {
            title: '发送优惠卷',
            hidden: false,
            icon: 'HomeOutlined',
        },
    },
    {
        path: '/subscribe',
        component: () => import('@/Layout/index.vue'),
        name: 'subscribe',
        meta: {
            title: '待筛查',
            hidden: false,
            icon: 'subscribe',
            index: 0,
        },
        children: [
            {
                path: '/subscribe/list',
                component: () => import('@/views/subscribeList/index.vue'),
                name: "SubscribeList",
                meta: {
                    title: '预约',
                    hidden: false,
                    icon: 'FieldTimeOutlined',
                },
            }
        ],
    },
    {
        path: '/clientele',
        component: () => import('@/Layout/index.vue'),
        name: 'clientele',
        meta: {
            title: '客户管理',
            hidden: false,
            icon: 'client',
            index: 1,
        },
        children: [
            {
                path: '/assessment/management',
                component: () => import('@/views/clientele/index.vue'),
                name: 'management',
                meta: {
                    title: '客户',
                    hidden: false,
                    icon: 'CustomerServiceOutlined',
                },
            },

        ]
    },
    {
        path: '/assessment',
        component: () => import('@/Layout/index.vue'),
        name: 'assessment',
        meta: {
            title: '评估记录',
            hidden: false,
            icon: 'assess',
            index: 1,
        },
        children: [
            {
                path: '/assessment/record',
                component: () => import('@/views/evaluationRecord/index.vue'),
                name: 'record',
                meta: {
                    title: '评估',
                    hidden: false,
                    icon: 'CustomerServiceOutlined',
                },
            },

        ]
    },

    {
        path: '/person',
        component: () => import('@/Layout/index.vue'),
        name: 'person',
        meta: {
            title: '个人中心',
            hidden: false,
            icon: 'mine',
            index: 1,
        },
        children: [
            {
                path: '/person/center',
                component: () => import('@/views/center/index.vue'),
                name: 'person',
                meta: {
                    title: '个人中心',
                    hidden: false,
                    icon: 'UserOutlined',
                }
            },
            {
                path: '/person/info',
                component: () => import('@/views/center/info.vue'),
                name: 'info',
                meta: {
                    title: '个人信息',
                    hidden: true,
                },
            },
            {
                path: '/person/agreement',
                component: () => import('@/views/center/agreement.vue'),
                name: 'agreement',
                meta: {
                    title: '用户协议',
                    hidden: true,
                },
            },
            {
                path: '/person/modifyPsd',
                component: () => import('@/views/center/modifyPsd.vue'),
                name: 'password',
                meta: {
                    title: '修改密码',
                    hidden: true
                }
            },
        ]
    },
    {
        path: '/serve',
        component: () => import('@/Layout/index.vue'),
        name: 'serve',
        meta: {
            title: '服务支持',
            hidden: false,
            icon: 'service',
            index: 1,
        },
        children: [
            {
                path: '/serve/support',
                component: () => import('@/views/support/index.vue'),
                name: 'support',
                meta: {
                    title: '支持',
                    hidden: false,
                    icon: 'service',
                },
            },

        ]
    },
    {
        path: '/addrecord',
        component: () => import('@/views/addRecord/index.vue'),
        name: "AddRecord",
        meta: {
            title: '新增档案',
            hidden: true,
            icon: 'UserOutlined',
        },
    },
    {
        path: '/eye/report/result',
        component: () => import('@/views/eyeReportResult/index.vue'),
        name: 'EyeReportResult',
        meta: {
            title: '眼动报告',
            hidden: true,
            icon: 'Promotion',
        },
    },
    {
        path: '/report/result',
        component: () => import('@/views/reportResult/index.vue'),
        name: 'ReportResult',
        meta: {
            title: '报告结果',
            hidden: true,
            icon: 'Promotion',
        }
    },
    {
        path: '/report/back',
        component: () => import('@/views/backVideo/index.vue'),
        name: 'back',
        meta: {
            title: '视频回放',
            hidden: true,
        },
    },
    {
        path: '/report/statistics',
        component: () => import('@/views/dataResult/index.vue'),
        name: 'statistics',
        meta: {
            title: '统计详情',
            hidden: true,
        },
    },

    {
        path: '/free/paradigm',
        component: () => import('@/views/freeParadigm/index.vue'),
        name: 'freeParadigm',
        meta: {
            title: '自由观看范式任务',
            hidden: true,
            icon: 'Promotion',
        },
    },
    {
        path: '/attentionParadigm',
        component: () => import('@/views/attentionParadigm/index.vue'),
        name: 'attentionParadigm',
        meta: {
            title: '注意切换范式任务',
            hidden: true,
            icon: 'Promotion',
        },
    },
    {
        path: '/faceCorrect',
        component: () => import('@/views/faceCorrect/index.vue'),
        name: 'faceCorrect',
        meta: {
            title: '人脸矫正范式任务',
            hidden: true,
            icon: 'Promotion',
        },
    },
    {
        path: '/gazeParadigm',
        component: () => import('@/views/gazeParadigm/index.vue'),
        name: 'gazeParadigm',
        meta: {
            title: '凝视范式任务',
            hidden: true,
            icon: 'Promotion',
        },
    },
    {
        path: '/face',
        component: () => import('@/views/face/index.vue'),
        name: 'face',
        meta: {
            title: '人脸识别',
            hidden: true,
            icon: 'Promotion',
        },
    },
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'login',
        meta: {
            title: '登录',
            hidden: true,
            icon: 'Promotion',
        },
    },

    {
        path: '/scale',
        component: () => import('@/views/scale/AD-8.vue'),
        name: 'AD-8',
        meta: {
            title: 'AD-8',
            hidden: true,
            icon: 'UserOutlined'
        }
    },

    {
        path: '/servicePack',
        component: () => import('@/views/servicePack/index.vue'),
        name: 'scale',
        meta: {
            title: '服务列表',
            hidden: true,
            icon: 'UserOutlined'
        }
    },


    {
        path: '/reportRelast',
        component: () => import('@/views/reportBhi/index.vue'),
        name: 'reportRelast',
        meta: {
            title: '报告解读',
            hidden: true,
            icon: 'UserOutlined'
        }
    },
    {
        path: '/adReport',
        component: () => import('@/views/reportBhi/adReport.vue'),
        name: 'reportBhi',
        meta: {
            title: 'AD8报告解读',
            hidden: true,
            icon: 'UserOutlined'
        }
    },


    {
        //404
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404',
        meta: {
            title: '404',
            hidden: true,
            icon: 'DocumentDelete',
        },
    },

    {
        //404
        path: '/urlSet',
        component: () => import('@/views/urlSet/index.vue'),
        name: 'urlSet',
        meta: {
            title: 'urlSet',
            hidden: true,
            icon: 'DocumentDelete',
        },
    },


    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'Any',
        meta: {
            title: '404',
            hidden: true,
            icon: 'DataLine',
        },
    },
    ...eyesGame,
    ...depressed,
    ...mocaGame,
    ...scale,
]