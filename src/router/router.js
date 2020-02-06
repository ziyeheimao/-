import PATH from '@/constants/pathConfig'
import SCENICSPOT from '@/constants/pathConfig' // 风景区
import COMMON from '@/constants/pathConfig' // 地图


const _import = file => require('@/pages' + file + '.vue').default;

export default [
    {
        path: '',
        redirect: PATH.TICKET_HOME_INDEX
    },
    //门票首页
    {
        path: PATH.TICKET_HOME_INDEX,
        component: _import(PATH.TICKET_HOME_INDEX)
    },
    //门票详情页面
    {
        path: PATH.TICKET_T_DETAIL_INDEX,
        component: _import(PATH.TICKET_T_DETAIL_INDEX)
    },

    // 风景区介绍
    {
        path: SCENICSPOT.SCENICSPOT_HOME_INDEX,
        component: _import(SCENICSPOT.SCENICSPOT_HOME_INDEX)
    },
    // 电子地图
    {
        path: COMMON.COMMON_MAP_INDEX,
        component: _import(COMMON.COMMON_MAP_INDEX)
    },
    //门票订单填写页面
    {
        path: PATH.TICKET_T_ORDER_FORM_INDEX,
        component: _import(PATH.TICKET_T_ORDER_FORM_INDEX)
    },
    //门票预订取消订单
    {
        path: PATH.TICKET_PAY_INDEX,
        component: _import(PATH.TICKET_PAY_INDEX)
    },
    //门票订单确认
    {
        path: PATH.TICKET_RESERVATION_INDEX,
        component: _import(PATH.TICKET_RESERVATION_INDEX)
    },
    //我的订单列表
    {
        path: PATH.ORDER_LIST_INDEX,
        component: _import(PATH.ORDER_LIST_INDEX)
    }

    //支付成功页面
    ,
    {
        path: PATH.COMMON_PAY_SUCCESS,
        component: _import(PATH.COMMON_PAY_SUCCESS)
    },

    {
        path: PATH.HOTEL_HOME_INDEX,
        component: _import(PATH.HOTEL_HOME_INDEX) // 酒店首页
    },
    {
        path: PATH.HOTEL_HOME_LIST,
        component: _import(PATH.HOTEL_HOME_LIST) // 酒店列表
    },
    {
        path: PATH.HOTEL_HOME_DETAIL,
        component: _import(PATH.HOTEL_HOME_DETAIL) // 酒店详情
    },

    {
        path: PATH.MEDICAL_HOME_INDEX,
        component: _import(PATH.MEDICAL_HOME_INDEX) // 医疗首页
    },
    {
        path: PATH.HOTEL_HOME_DOCTORSERVICES,
        component: _import(PATH.HOTEL_HOME_DOCTORSERVICES) // 医生服务
    },
    {
        path: PATH.HOTEL_HOME_ADVISORYRECORD,
        component: _import(PATH.HOTEL_HOME_ADVISORYRECORD) // 咨询记录
    },
    {
        path: PATH.HOTEL_HOME_CHAR,
        component: _import(PATH.HOTEL_HOME_CHAR) // 聊天
    },
    {
        path: PATH.HOTEL_HOME_DOCTOR,
        component: _import(PATH.HOTEL_HOME_DOCTOR) // 医生
    },
    {
        path: PATH.HOTEL_HOME_DOCTORINFO,
        component: _import(PATH.HOTEL_HOME_DOCTORINFO) // 医生信息
    },
    {
        path: PATH.HOTEL_HOME_CONDITION,
        component: _import(PATH.HOTEL_HOME_CONDITION) // 填写病情
    },
    {
        path: PATH.HOTEL_HOME_PATIENTCONSULTATION,
        component: _import(PATH.HOTEL_HOME_PATIENTCONSULTATION) // 患者咨询 （医生视角
    },
    {
        path: PATH.HOTEL_HOME_LOGIN,
        component: _import(PATH.HOTEL_HOME_LOGIN) // 登录
    },


    
    // Patient consultation
]
