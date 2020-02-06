<template>
  <div class="box" ref="ticket">
    <div class="nav-bar-box" ref="nav">
      <van-nav-bar left-arrow @click-left="goBack">
        <div class="search" slot="title">
          <div class="tabs">
            <div class="tab line" :class="{ act: tabIndex == 0 }" @click="navTabs(0)">商品</div>
            <div class="tab line" :class="{ act: tabIndex == 1 }" @click="navTabs(1)">评价</div>
            <div class="tab line" :class="{ act: tabIndex == 2 }" @click="navTabs(2)">详情</div>
          </div>
        </div>
      </van-nav-bar>
    </div>
    <div class="wrap" ref="DOM">
      <div class="banner" id="banner">
        <van-swipe :autoplay="3000" @change="bannerOnChange">
          <van-swipe-item
            v-for="(image, index) in ticketDetailData.photos"
            :key="index"
            v-if="ticketDetailData.photos&&ticketDetailData.photos.length>0"
          >
            <img v-lazy="image" class="img">
          </van-swipe-item>
          <div
            class="custom-indicator"
            slot="indicator"
          >{{ current + 1 }}/{{ticketDetailData.photos&&ticketDetailData.photos.length}}</div>
        </van-swipe>
      </div>
      <div class="detail-base-info">
        <div class="base-name">
          <span class="ellipsis-2">{{ticketDetailData.shopName}}</span>
        </div>
        <div class="base-info">
          <div class="score">
            <span class="num">4.6</span>
            <span class="unit">分</span>
          </div>
          <div class="comment">
            <span>1424条评论</span>
          </div>
        </div>
        <div class="base-info">
          <div class="address">{{ticketDetailData.address}}</div>
          <!-- <div class="logo">
            <van-icon name="location-o"/>
            <span>地图</span>
          </div> -->
        </div>
      </div>
      <div class="booking-ticket">
        <div class="title">全天票</div>
        <div class="content">
          <van-tabs @click="bookingTicketTab">
            <van-tab :title="item.name" v-for="(item, index) in bookingTicketData" :key="index">
              <div class="dd" :class="{ act: isDown }">
                <span class="name">{{ item.name }}</span>
                <van-icon name="arrow-up" @click="downUp"/>
              </div>
              <div class="tt">
                <div class="page" v-for="(itemChild,ichild) in ticketListData" :key="ichild">
                  <div class="left">
                    <div class="t-name">{{itemChild.ticketName}}</div>
                    <div class="t-desc">可订今日预订2小时后可用</div>
                    <div class="t-labels">
                      <span class="label">无需换票</span>
                    </div>
                    <div class="t-notice">
                      <span>官方</span>
                      <span>&nbsp;|&nbsp;</span>
                      <span>预订须知</span>
                      <van-icon name="arrow"/>
                    </div>
                  </div>
                  <div class="right">
                    <div class="r-top price-box">
                      <span class="rmb">￥</span>
                      <span class="num">{{itemChild.presentPrice}}</span>
                      <span class="name">起</span>
                    </div>
                    <div
                      class="jzg-btn jzg-btn-radius jzg-btn-primary"
                      @click="gotoReservation(itemChild)"
                    >立即预订</div>
                  </div>
                </div>
              </div>
            </van-tab>
          </van-tabs>
        </div>
      </div>
      <div class="ticket-detail" ref="ticket_detail">
        <div class="sticky" :class="{ is_fixed: isFixed }" ref="sticky">
          <div class="sticky-fixed">
            <div class="tabs">
              <div class="tab" :class="{ act: detailTabIndex == 0 }" @click="detailTabs(0)">产品详情</div>
              <div class="tab" :class="{ act: detailTabIndex == 1 }" @click="detailTabs(1)">购买须知</div>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="page">
            <div class="name">产品详情</div>
            <div class="img-box"></div>
            <div class="text">
              <img src="@/assets/img/62addf65a65b4a0cb98e6cfc59e99517.jpg" alt="" class="img">
              {{ticketDetailData.detail}}
            </div>
          </div>
          <div class="page tow" ref="ticket_detail_page2">
            <div class="name">购买须知</div>
            <div class="text">
              <p>{{ticketDetailData.notes}}</p>
              <p class="last">该产品由九寨 提供</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { offset, scrollToTop } from "@/utils/index";
export default {
  data() {
    return {
      c: null,
      tabIndex: 0,
      detailTabIndex: 0,
      timer: null,
      isFixed: false,
      bookingTicketData: [
        { name: "成人票" },
        { name: "儿童票" },
        { name: "老人票" },
        { name: "学生票" }
      ],
      current: 0,
      ticketType: 1,
      md5: null,
      isDown: false,
      ticketDetailData: {},
      ticketListData: [],

    };
  },

  mounted() {
    if (this.$route.query) {
      this.merchantId = this.$route.query.id;
      if (this.md5 != this.merchantId) {
        this.md5 = this.merchantId;
        this.getMerchantDetail();
        setTimeout(() => {
          this.getTicketList();
        }, 1000);
      }
    }
    this.NavHeight = this.$refs.nav.offsetHeight;
    this.stickyHeight = this.$refs.sticky.offsetHeight;
    this.default_offsetTop = this.NavHeight + this.stickyHeight;
    document.body.addEventListener("scroll", this.handleScroll, false);
  },
  destroyed() {
    document.body.removeEventListener("scroll", this.handleScroll, false);
  },
  components: {},

  computed: {},

  methods: {
    getMerchantDetail() {
      let params = { id: this.merchantId };
      this.$api.ticket.merchantDetail(params).then(res => {
        if (res && res.code == 0) {
          this.ticketDetailData = res.bean;
          if (
            this.ticketDetailData &&
            this.ticketDetailData.photo &&
            this.ticketDetailData.photo.length > 0
          ) {
            let isArr = this.ticketDetailData.photo.indexOf(",");
            if (isArr != -1) {
              this.ticketDetailData.photos = this.ticketDetailData.photo.split(
                ","
              );
            } else {
              this.ticketDetailData.photos = [this.ticketDetailData.photo];
            }
          }
        }
      });
    },
    getTicketList() {
      let params = { merchantId: this.merchantId, ticketType: this.ticketType };
      this.$api.ticket.ticketList(params).then(res => {
        if (res && res.code == 0) {
          this.ticketListData = res.bean;
        }
      });
    },
    handleScroll() {
      let scrollTop = document.body.scrollTop; // 滚动条偏移量
      let ticket_detail_offsetTop = offset(this.$refs["ticket_detail"]).top;
      this.isFixed =
        scrollTop + this.NavHeight >= ticket_detail_offsetTop ? true : false;
      let ticket_detail_page2_offsetTop = offset(
        this.$refs["ticket_detail_page2"]
      ).top;
      if (scrollTop >= ticket_detail_page2_offsetTop - this.default_offsetTop) {
        this.detailTabIndex = 1;
      } else {
        this.detailTabIndex = 0;
      }
      if (scrollTop >= ticket_detail_offsetTop - this.NavHeight) {
        this.tabIndex = 2;
      } else {
        this.tabIndex = 0;
      }
    },
    navTabs(index) {
      this.tabIndex = index;
      const that = this;
      this.$nextTick(() => {
        let ref = "ticket_detail";
        if (index == 0) {
          ref = "DOM";
        } else if (index == 1) {
          ref = "DOM";
        } else if (index == 2) {
          ref = "ticket_detail";
        }
        let offsetTop = offset(this.$refs[ref]).top - this.NavHeight;
        scrollToTop(document.body, offsetTop, 100);
      });
    },
    detailTabs(index) {
      this.detailTabIndex = index;
      this.$nextTick(() => {
        let ref = "ticket_detail";
        let h = this.NavHeight;
        if (index == 0) {
          ref = "ticket_detail";
        } else if (index == 1) {
          h = this.default_offsetTop;
          ref = "ticket_detail_page2";
        }
        let offsetTop = offset(this.$refs[ref]).top - h;
        scrollToTop(document.body, offsetTop, 100);
      });
    },
    bannerOnChange(index) {
      this.current = index;
    },
    bookingTicketTab(index, title) {
      this.ticketType = index + 1;
      this.isDown = false;
      this.getTicketList();
    },
    downUp() {
      this.isDown = !this.isDown;
    },
    gotoReservation(orderInfo) {
      orderInfo.scenicName = this.ticketDetailData.shopName;
      this.$routerTo(this.$path.TICKET_RESERVATION_INDEX, {
        orderInfo: JSON.stringify(orderInfo)
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
