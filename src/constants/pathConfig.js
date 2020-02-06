//
import ticket from '@/constants/path/ticket';//门票模块路由地址
import scenicSpot from '@/constants/path/scenicSpot';//风景区
import common from '@/constants/path/common';//公共地图
import order from '@/constants/path/order';//订单模块路由地址
import hotal from '@/constants/path/hotal' // 酒店

import medical from '@/constants/path/medical' // 医疗


const PATH = {
  ...ticket,
  ...common,
  ...scenicSpot,
  ...order,
  ...hotal,
  ...medical
}

export default PATH