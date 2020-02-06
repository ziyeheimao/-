/**
 * demo 模块接口列表
 */

import { get, post, put, patch } from '@/utils/httpRequest'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const order = {
    // 门票列表    
    orderList(params) {
        return get('/order/list',params);
    },
  

    // 其他接口…………
}

export default order; 