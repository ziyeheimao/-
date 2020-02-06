/**
 * demo 模块接口列表
 */

import { get, post, put, patch } from '@/utils/httpRequest'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const ticket = {
    // 门票列表    
    ticketList(params) {
        return get('/ticket/list',params);
    },
    //商家列表
    merchantList(params) {
        return get('/merchant/list',params);
    },
    //商家详情
    merchantDetail(params) {
        return get('/merchant/detail',params);
    },
    //创建订单
    orderTicketCreate(params) {
        return post('/order/ticket/create',params);
    },
     //支付宝支付订单
     orderTicketAliPayH5(params) {
        return get('/order/ali/pay/h5',params);
    },
     //微信支付订单
     orderTicketWeChatPayH5(params) {
        return get('/order/weChat/pay/h5',params);
    }

    // 其他接口…………
}

export default ticket; 