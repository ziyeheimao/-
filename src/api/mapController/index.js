import { get, post, put, patch } from '@/utils/httpRequest'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const mapController = {
  mapDetail (id) {
    return get(`/map/detail?id=${id}`);
  },

  mapList (params) {
    return post(`/map/list`, params);
  }
}

export default mapController;