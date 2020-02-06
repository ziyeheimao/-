<template>
  <div class="box">
    <header>
      <van-nav-bar left-arrow @click-left="goBack"></van-nav-bar>
    </header>
    <section>
      <div class="p">确认并支付</div>
      <div class="tittle">
        <div class="p">订单已生成，请您尽快完成支付。</div>
        <div class="minits">
          将为您保存
          <span>30</span>
          分钟
        </div>
      </div>
      <div class="goodsList">
        <div class="left">
          <div class="ticket">{{info.ticketName}}</div>
          <div class="date">{{info.bookDates2}}</div>
          <div class="num">
            数量：
            <span>{{info.prodNum}}</span>
          </div>
        </div>
        <div class="right">
          <img src="~@/assets/logo.png" alt="" style="width:70px;height:70px;">
        </div>
      </div>
      <div class="count">
        <div class="left">总额（RMB）</div>
        <div class="right">
          <div class="money">
            ￥
            <span>{{info.sum}}</span>
          </div>
        </div>
      </div>
      <van-nav-bar class="border"></van-nav-bar>
      <van-radio-group v-model="radio" class="radio">
        <van-cell-group>
          <div class="zfb">
            <img src="~@/assets/img/zfb.png" alt="">
            <van-cell title="支付宝" clickable @click="radio = '1'">
              <van-radio slot="right-icon" name="1"/>
            </van-cell>
          </div>
          <van-nav-bar class="borderbar"></van-nav-bar>
          <div class="wx">
            <img src="~@/assets/img/wx.png" alt="">
            <van-cell title="微信" clickable @click="radio = '2'">
              <van-radio slot="right-icon" name="2"/>
            </van-cell>
          </div>
        </van-cell-group>
      </van-radio-group>
      <div></div>
      <div class="agree">
        我同意
        <a href="#" @click="showPopup">
          <span>预订条款</span>
        </a>和
        <a href="#">
          <span>网签协议</span>
        </a>，也同意支付以下所示总金额。
      </div>
     
    </section>
    <footer>
      <van-button round type="info" size="large" class="pay" @click="pay">
        <span>确认支付 · ￥{{info.sum}}</span>
      </van-button>
    </footer>
  </div>
</template>
<script>
import { baseUrl } from "@/config/env";
export default {
  data() {
    return {
      radio: "1",
      show: false,
      info: {}
    };
  },

  mounted() {
    this.orderNo = this.$route.query.orderNo;
    this.info = JSON.parse(this.$route.query.info);
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    pay() {
      let pramas = { orderNo: this.orderNo };
      let payWay = "orderTicketWeChatPayH5";
      if (this.radio == 1) {
        payWay = "orderTicketAliPayH5";
      }
      this.$api.ticket[payWay](pramas).then(res => {
        if (this.radio == 1) {
          document.querySelector("body").innerHTML = res;
          const div = document.createElement("div"); // 创建div
          div.innerHTML = res; // 将返回的form 放入div
          document.body.appendChild(div);
          document.forms[0].submit();
        } else {
          if (res.code == 0) {
            window.location.href = res.bean;
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>