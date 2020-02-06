<template>
  <div class="box">
    <div class="nav-bar-box">
      <van-nav-bar left-arrow title="订单填写" @click-left="goBack"></van-nav-bar>
    </div>
    <div class="content">
      <div class="ticket">
        <div class="item round">
          <div class="top">
            <div class="title">{{orderInfo.ticketName}}</div>
            <div class="right">
              <div class="price-box">
                <span class="rmb">￥</span>
                <span class="num">{{orderInfo.presentPrice}}</span>
                <span class="name">/张</span>
              </div>
              <div class="cost-detail" @click="bookingsShowPopup">
                <span>购买须知</span>
                <van-icon name="arrow-down"/>
              </div>
            </div>
          </div>
          <div class="center">
            <div class="time">
              <span class="time-str">{{orderInfo.bookDate}}</span>
            </div>
          </div>
          <div class="bottom">
            <van-cell title="购买数量" title-class="name">
              <van-stepper v-model="prodNum" :max="orderInfo.buyQuantity"/>
            </van-cell>
          </div>
        </div>
      </div>
      <div class="user-info">
        <div class="title">游客信息</div>
        <div class="user-box">
          <van-field v-model="customerName" clearable label="出游人" placeholder="出游人姓名"/>
          <van-field v-model="customerTel" label="手机号" placeholder="用于接收确认短信" clearable/>
          <!-- <van-field v-model="nor" label="身份证" placeholder="用于景点入园凭证"/> -->
        </div>
      </div>
      <div class="accident-insurance">
        <div class="title">意外险</div>
        <div class="content">
          <div class="top">
            <span class="name">意外险</span>
            <div class="price-box primary">
              <span class="rmb">￥</span>
              <span class="num">5</span>
              <span class="name">/份</span>
            </div>
          </div>
          <div class="bottom">
            <van-checkbox v-model="checked">我已阅读并接受保险经纪委托协议、意外险条款</van-checkbox>
          </div>
        </div>
      </div>
    </div>
    <van-submit-bar
      :price="price"
      button-text="提交订单"
      label="订单金额："
      @submit="orderTicketCreate"
      text-align="left"
      class="footer"
    >
      <div class="cost-detail" @click="showPopup">
        <span>明细</span>
        <van-icon name="arrow-down"/>
      </div>
    </van-submit-bar>
    <detail-account :accountObject="accountObject" ref="detailAccounRef"></detail-account>
    <bookings ref="bookingsRef"></bookings>
  </div>
</template>

<script>
import detailAccount from "@/pages/ticket/common/detail_account.vue";
import bookings from "@/pages/ticket/common/bookings.vue";
import { RegExpr } from "@/utils/index";

export default {
  data() {
    return {
      checked: false,
      orderInfo: "",
      customerTel: "",
      customerName: "",
      buyQuantity: 999,
      presentPrice: 0,
      prodNum: 1,
      accountObject: { list: [], sum: 0 }
    };
  },

  mounted() {
    this.orderInfo = JSON.parse(this.$route.query.orderInfo);

    this.buyQuantity = this.orderInfo.buyQuantity;
    this.presentPrice = this.orderInfo.presentPrice;
  },

  components: {
    detailAccount,
    bookings
  },

  computed: {
    price() {
      return (this.prodNum * this.presentPrice + (this.checked ? 5 : 0)) * 100;
    },
    sum() {
      return (this.prodNum * this.presentPrice).toFixed(2);
    }
  },

  methods: {
    //费用明细
    showPopup() {
      this.$nextTick(() => {
        this.$refs.detailAccounRef.showPopup();
        this.accountObject.sum = (this.price / 100).toFixed(2);
        this.accountObject.list = [];
        let arr = [
          {
            name: this.orderInfo.scenicName,
            typeName: this.orderInfo.ticketName,
            price: this.orderInfo.presentPrice,
            num: this.prodNum
          }
        ];
        this.accountObject.list = arr;
        if (this.checked) {
          this.accountObject.list.push({
            name: "意外险",
            typeName: "意外险",
            price: 5,
            num: 1
          });
        }
      });
    },
    bookingsShowPopup() {
      this.$nextTick(() => {
        console.log(222)
        this.$refs.bookingsRef.showPopup();
      
      });
    },
    orderTicketCreate() {
      if (!this.customerTel || !this.customerName) {
        this.$toast("请完善信息!");
        return !1;
      }
      if (!RegExpr.checkMobile(this.customerTel)) {
        this.$toast("手机格式有误，请重新确认");
        return !1;
      }
      // if(!this.checked){
      //     this.$toast('');
      //     return !1;
      // }
      let params = {
        bookDate: this.orderInfo.bookDate || "2019-12-10",
        customerName: this.customerName,
        customerTel: this.customerTel,
        prodId: this.orderInfo.id,
        prodNum: this.prodNum
      };
      this.$api.ticket.orderTicketCreate(params).then(res => {
        if (res && res.code == 0) {
          let orderNo = res.bean;
          let info = JSON.stringify({
            bookDate: this.orderInfo.bookDate,
            ticketName: this.orderInfo.ticketName,
            prodNum: this.prodNum,
            sum: (this.price / 100).toFixed(2),
            bookDates2: this.orderInfo.bookDates2
          });
          this.$routerTo(this.$path.TICKET_PAY_INDEX, { orderNo, info });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
