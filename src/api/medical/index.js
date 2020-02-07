import { get, post, put, patch } from '@/utils/httpRequest'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const medical = {
  // 字典接口
  sysDictSelectItemsByDictType (data) { // 根据字典类型获取字典项 *******************************************
    return get(`/sys/dict/selectItemsByDictType`, data)
  },

  // 医生
  doctorDetail (doctorId, data) { // 医生详情 *******************************************
    return get(`/doctor/detail/${doctorId}`, data)
  },
  doctorList (data) { // 医生列表 *******************************************
    return get(`/doctor/list`, data)
  },
  doctorCancel (doctorId, data) { // 取消关注 *******************************************
    return post(`/doctor/cancel/${doctorId}`, data)
  },
  doctorFollow (doctorId, data) { // 关注 *******************************************
    return post(`/doctor/follow/${doctorId}`, data)
  },
  doctorListFollow () { // 关注医生列表 *******************************************
    return get(`/doctor/list/follow`, )
  },

  // 疾病
  diseaseAll () { // 所有疾病 *******************************************
    return get('/disease/all')
  },
 
  // 科室
  departmentAll () { // 所有科室 *******************************************
    return get(`/department/all`)
  },
  departmentRecommend () { // 推荐科室 *******************************************
    return get('/department/recommend')
  },
  departmentSelectByParentId (data) { // 根据父id获取科室列表 xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    return get('/department/selectByParentId', data)
  },

  // 问诊记录
  inquiryRecordAdd (data) { // 新增问诊记录 *******************************************
    return post('/inquiry/record/add', data)
  },
  inquiryRecordDoctorList (data) { // 医生问诊记录列表 *******************************************
    return get('/inquiry/record/doctor/list', data)
  },
  inquiryRecordUserDoctor (doctorId, data) { // 用户针对某个医生问诊记录列表 *******************************************
    return get(`/inquiry/record/user/doctor/${doctorId}`, data)
  },
  inquiryRecordUserList (data) { // 用户问诊记录列表 *******************************************
    return get(`/inquiry/record/user/list`, data)
  },

  // 文件上传接口
  sysOssUpload (file) { // formData 类型 *******************************************
    return post(`/sys/oss/upload`, file)
  },

  // 登录接口 仅供测试
  userLogin (data) { // 通过验证码登录 *******************************************
    return post(`/user/login`, data)
  }

}

export default medical;