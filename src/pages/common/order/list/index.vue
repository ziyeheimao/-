<template>
    <div class="box" ref="ticket">
        <div class="nav-bar-box" ref="nav">
            <van-nav-bar left-arrow @click-left="goBack" title="我的订单"></van-nav-bar>
            <div class="search" slot="title">
                <div class="tabs">
                    <div class="tab line" :class="{'act':tabIndex==0}" @click="navTabs(0)">商品</div>
                    <div class="tab line" :class="{'act':tabIndex==1}" @click="navTabs(1)">评价</div>
                    <div class="tab line" :class="{'act':tabIndex==2}" @click="navTabs(2)">详情</div>
                </div>
            </div>
        </div>
        <div class="order-list"></div>
    </div>
</template>

<script>
import { offset, scrollToTop } from "@/utils/index";
// import HotelDatePicker from "vue-hotel-datepicker";
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
      ticketDetailData: { photos: [] },
      ticketListData: null
    };
  },

  mounted() {
    if (this.$route.query) {
      this.merchantId = this.$route.query.id;
      if (this.md5 != this.merchantId) {
        this.md5 = this.merchantId;
        this.getTicketList();
        this.getMerchantDetail();
      }
    }
    this.$nextTick(() => {
      this.NavHeight = this.$refs.nav.offsetHeight;
      this.stickyHeight = this.$refs.sticky.offsetHeight;
      this.default_offsetTop = this.NavHeight + this.stickyHeight;
      document.body.addEventListener("scroll", this.handleScroll, false);
    });
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
          res.bean && (this.ticketDetailData = res.bean);
          if (this.ticketDetailData.photo) {
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
      let params = { id: this.merchantId, ticketType: this.ticketType };
      this.$api.ticket.ticketList(params).then(res => {
        if (res && res.code == 0) {
          res.bean && (this.ticketListData = res.bean);
        }
      });
    },
    handleScroll() {
      let scrollTop = document.body.scrollTop; // 滚动条偏移量
      let ticket_detail_offsetTop = offset(this.$refs["ticket_detail"]).top;
      this.isFixed =
        scrollTop + this.NavHeight > ticket_detail_offsetTop ? true : false;
      let ticket_detail_page2_offsetTop = offset(
        this.$refs["ticket_detail_page2"]
      ).top;
      if (scrollTop > ticket_detail_page2_offsetTop - this.default_offsetTop) {
        this.detailTabIndex = 1;
      } else {
        this.detailTabIndex = 0;
      }
      if (scrollTop > ticket_detail_offsetTop - this.NavHeight) {
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
      this.getTicketList();
    },
    downUp() {
      this.isDown = !this.isDown;
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
