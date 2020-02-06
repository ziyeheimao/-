<template>
  <div class="box">
    <header>
      <van-nav-bar left-arrow title="订单确认" @click-left="goBack"></van-nav-bar>
    </header>
    <section>
      <van-popup v-model="show" overlay round position="bottom" closeable @closed="closed">
        <div class="tittle">{{orderInfo.scenicName}}</div>
        <van-divider class="divider"/>
        <div class="h1">使用日期（当地时间）</div>
        <div class="time">
          <div
            class="day"
            v-for="(item,i) in times"
            :key="i"
            @click="selectTime(i)"
            :class="{'act':i==activeIndex}"
          >
            <div class="top">{{item}}</div>
            <div class="bottom">￥{{orderInfo.presentPrice}}</div>
            <div class="t-box">
              <van-icon name="success"/>
            </div>
          </div>
          <div class="days" @click="getDate">
            <div class="top">
              <van-icon name="arrow" size="14px"/>
            </div>
            <div class="bottom">更多</div>
          </div>
        </div>
        <div class="points">需要在游玩当天的17:00前预订</div>
        <van-button round type="info" size="large" class="submit" @click="gotoOrderForm">
          <span>立即预订</span>
        </van-button>
      </van-popup>
      <!-- <van-button round type="info" size="large" class="submit" @click="getDate">
          <span>立即预订</span>
      </van-button>-->
      <datePicker
        :showCalendar.sync="showdateSingle"
        maxDate="12m"
        :options="dateOptionsSingle"
        @changeDate="changeDateSingle"
        @update:showCalendar="closeDatePicker"
      ></datePicker>
    </section>
  </div>
</template>
<script>
import { formatTime, getDateObj } from "@/utils/index";
import datePicker from "@/components/common/datepicker/datePicker";
export default {
  data() {
    return {
      show: true,
      times: [],
      bookDates: [],
      bookDates2: [],
      activeIndex: 0,
      orderInfo: {},
      showdateSingle: false,
      startSingle: "",
      dateOptionsSingle: {
        maxDate: "24m", // 月份跨度
        isDoubleCheck: false
      }
    };
  },
  components: {
    datePicker
  },
  methods: {
    closed(){
      if(!this.showdateSingle){
      this.goBack();
      }
    },
    changeDateSingle(start, end) {
      if(!start){return}
      this.startSingle = start;
      this.show = true;
      if (start == this.todayTime) {
        this.orderInfo.bookDate = this.bookDates[0];
        this.orderInfo.bookDates2 = this.bookDates2[0];
        this.activeIndex = 0;
      } else if (start == this.tomorrowTime) {
        this.orderInfo.bookDate = this.bookDates[1];
        this.orderInfo.bookDates2 = this.bookDates2[1];
        this.activeIndex = 1;
      } else if (start == this.afterTomorrowTime) {
        this.orderInfo.bookDate = this.bookDates[2];
        this.orderInfo.bookDates2 = this.bookDates2[2];
        this.activeIndex = 2;
      } else {
        const m = formatTime.getDateObj(new Date(start));
        const str_right = m.day;
        this.orderInfo.bookDate = m.yy + "-" + m.mm + "-" + m.dd;
        this.orderInfo.bookDates2 = m.mm + "月" + m.dd + "日";
        this.times[2] = str_right + " " + m.mm + "-" + m.dd;
        this.activeIndex = 2;
      }
    },
    closeDatePicker() {
      this.show = true;
    },
    getDate() {
      this.showdateSingle = true;
      this.show = false;
    },
    gotoOrderForm() {
      const orderInfo = JSON.stringify(this.orderInfo);
      this.$routerTo(this.$path.TICKET_T_ORDER_FORM_INDEX, { orderInfo });
    },
    selectTime(i) {
      this.orderInfo.bookDate = this.bookDates[i];
      this.orderInfo.bookDates2 = this.bookDates2[i];
      this.activeIndex = i;
    }
  },
  created() {},
  mounted() {
    this.orderInfo = JSON.parse(this.$route.query.orderInfo);
    let nowDate =  new Date().getTime();
    this.todayTime = new Date(new Date(new Date().toLocaleDateString()).getTime()).getTime();
    this.tomorrowTime = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000).getTime();
    this.afterTomorrowTime = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000*2).getTime();
    for (let i = 0; i < 3; i++) {
      const m = formatTime.getDateObj(formatTime.nDayLater(nowDate, i));
      const str_right = i == 0 ? "今天" : i == 1 ? "明天" : m.day;
      this.times.push(str_right + " " + m.mm + "-" + m.dd);
      this.bookDates.push(m.yy + "-" + m.mm + "-" + m.dd);
      this.bookDates2.push(m.mm + "月" + m.dd + "日");
    }
    this.orderInfo.bookDate = this.bookDates[0];
      this.orderInfo.bookDates2 = this.bookDates2[0];
  }
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>