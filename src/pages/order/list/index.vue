<template>
  <div class="box" ref="ticket">
    <div class="nav-bar-box">
      <van-nav-bar left-arrow @click-left="goBack" title="我的订单"></van-nav-bar>
    </div>
    <div class="nav-sub">
      <div class="tabs">
        <div
          class="tab line"
          :class="{'act':tabIndex==index}"
          @click="navTabs(index)"
          v-for="(item,index) in navSubTabs"
          :key="index"
        >{{item.name}}</div>
      </div>
    </div>
    <div class="order-list">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="item" v-for="(item,index) in orderListData" :key="index">
          <div class="top">
            <div class="name ellipsis">{{item.prodInfo.prodName}}</div>
            <div class="order-status">{{orderStatusDict[item.orderStatus]}}</div>
          </div>
          <div class="content">
            <div class="left">
              <div class="order-time">{{item.createTime}}</div>
              <div class="order-prodNum">
                <span>张数：</span>
                <span>{{item.prodInfo.prodNum}}</span>
              </div>
              <div class="totalAmount">
                <span>总价：</span>
                <span>{{item.totalAmount}}元</span>
              </div>
            </div>
            <div class="right">
              <img
                class="img"
                :src="item.orderImg"
                v-lazy="item.orderImg"
              >
            </div>
          </div>
          <div class="bottom">
            <!-- <van-button type="default">默认按钮</van-button> -->
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { setCookie} from "@/config/mUtils";
import { formatTime } from "@/utils/index";
// import HotelDatePicker from "vue-hotel-datepicker";
export default {
  data() {
    return {
      tabIndex: 0,
      timer: null,
      isFixed: false,
      navSubTabs: [
        { name: "全部" },
        { name: "待付款" },
        { name: "待确认" },
        { name: "待评价" },
        { name: "退款/售后" }
      ],
      orderListData: [],
      page: 1,
      totalPage: 1,
      limit:10,
      loading: false,
      finished: false,
      orderStatusDict:{}
    };
  },

  mounted() {
    this.$nextTick(() => {});
  },
  destroyed() {},
  components: {},
  created(){
    this.orderStatusDict = this.$constant.orderStatusDict;
  },
  computed: {},

  methods: {
    getOrderList() {
      let params = {
        tab: this.tabIndex,
        limit: this.limit,
        page: this.page
      };
      this.$api.order.orderList(params).then(res => {
        if (res && res.code == 0) {
          this.totalPage = res.bean.totalPage;
          res.bean &&
            res.bean.list &&
            res.bean.list.length > 0 &&
            this.orderListData.push(...this.initData(res.bean.list));
        }
        this.loading = false;
        this.page = this.page + 1;
      });
    },
    initData(data) {
      if (data && data.length > 0) {
        data.forEach((v, i) => {
          let prodInfo = JSON.parse(v.prodInfo);
          data[i].prodInfo = prodInfo;
          data[i].createTime = formatTime.timestampToCommonDate(v.createTime,1);
        });
      } else {
        data = [];
      }
      return data;
    },
    onLoad() {
      // 异步更新数据
      const _this = this;
      if (this.page <= this.totalPage) {
        setTimeout(() => {
          _this.getOrderList();
          // 数据全部加载完成
        }, 500);
      } else {
        this.finished = true;
      }
    },
    navTabs(index) {
      this.tabIndex = index;
      this.page = 1;
      this.totalPage = 1;
      this.limit = 10;
      this.orderListData = [];
      this.getOrderList();

    },
    gotoReservation(orderInfo) {
      this.$routerTo(this.$path.TICKET_RESERVATION_INDEX, {
        orderInfo: JSON.stringify(orderInfo)
      });
    },

    goPay(id) {
      this.$routerTo(this.$path.TICKET_PAY_INDEX, { id });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
