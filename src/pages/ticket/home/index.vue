<template>
  <div class="box">
    <van-button @click="gotoSearch()">{{location}}</van-button>
    <!-- <div class="nav-bar-box">
      <van-nav-bar left-arrow @click-left="goBack">
        <div class="search" slot="title">
          <div class="search-box" @click="gotoSearch()">
            <van-icon name="search"/>
            <input  
              class="input"
              :placeholder="''+location"
              placeholder-style="font-size: 24rpx; color: #999999"
            >
          </div>
        </div>
      </van-nav-bar>
    </div> -->
    <!-- 导航栏 -->
    <!-- <div class="nav">
      <div class="jzg-btn-shadow active">
        10月26日-10月20日
      </div>
      <div class="jzg-btn-shadow">
        智能排序
      </div>
      <div class="jzg-btn-shadow">
        游玩景点
      </div>
    </div>-->
    <!-- 景点列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div v-for="(item,index) in list" :key="index" class="ticket">
        <div class="ticket-item" @click="gotoTicketDetail(item.id)">
          <div class="t-left">
            <div class="img">
              <img :src="item.logo" alt="" v-lazy="item.logo">
            </div>
          </div>
          <div class="t-right">
            <div class="tr-name">{{item.shopName}}</div>
            <div class="tr-center">
              <div class="item">
                <div class="cont">今日可用</div>
                <div class="name">使用时间</div>
              </div>
              <div class="item">
                <div class="cont">{{item.distance}}</div>
                <div class="name">距您</div>
              </div>
            </div>
            <div class="tr-bottom">
              <div class="price price-box">
                <span class="rmb">￥</span>
                <span class="num">220</span>
                <span class="name">起</span>
              </div>
              <div class="grade">4.6分</div>
              <div class="sales">月售1.4万</div>
            </div>
            <div class="tr-bottom-desc ellipsis-2">介绍：{{item.desc}}</div>
          </div>
        </div>
      </div>
    </van-list>
    <div class="ticket"></div>
  </div>
</template>

<script>
import { gotoNativeLogin, setToken } from "@/utils/ios_android_fun";
import { mapState } from "vuex";
import { math } from "@/utils/index";
export default {
  data() {
    return {
      ptPT: {
        night: "Noite",
        nights: "Noites",
        "day-names": ["日", "一", "二", "三", "四", "五", "六"],
        "check-in": "开始",
        "check-out": "结束",
        "month-names": [
          "01月",
          "02月",
          "03月",
          "04月",
          "05月",
          "06月",
          "07月",
          "08月",
          "09月",
          "10月",
          "11月",
          "12月"
        ]
      },
      list: [],
      keyword: null,

      page: 1,
      totalPage: 1,
      merchantType: 1,
      loading: false,
      finished: false,
      location: ""
    };
  },

  mounted() {
  },

  components: {},

  computed: {
    ...mapState(["latitude", "longitude"])
  },

  methods: {
    gotoSearch() {
      const that = this;
      getLocation();
      function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
          that.location = "Geolocation is not supported by this browser.";
        }
      }
      function showPosition(position) {
        that.location =
          "Lat: " +
          position.coords.latitude +
          "Lon: " +
          position.coords.longitude;
      }
      function showError(error) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            that.location = "User denied the request for Geolocation.";
            break;
          case error.POSITION_UNAVAILABLE:
            that.location = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            that.location = "The request to get user location timed out.";
            break;
          case error.UNKNOWN_ERROR:
            that.location = "An unknown error occurred.";
            break;
        }
      }
    },
    gotoTicketDetail(id) {
      this.$routerTo(this.$path.TICKET_T_DETAIL_INDEX, { id });
    },

    changeDistance(data) {
      if (data && data.length > 0) {
        data.forEach((v, i) => {
          data[i].distance = math.distance(v.distance);
        });
      } else {
        data = [];
      }
      return data;
    },
    getMerchantList() {
      let params = {
        keyword: this.keyword,
        latitude: this.latitude,
        longitude: this.longitude,
        merchantType: this.merchantType,
        limit: this.limit,
        page: this.page
      };
      this.$api.ticket.merchantList(params).then(res => {
        if (res && res.code == 0) {
          this.totalPage = res.bean.totalPage;
          res.bean &&
            res.bean.list &&
            res.bean.list.length > 0 &&
            this.list.push(...this.changeDistance(res.bean.list));
        }
        this.loading = false;
        this.page = this.page + 1;
      });
    },
    onLoad() {
      // 异步更新数据
      const _this = this;
      if (this.page <= this.totalPage) {
        setTimeout(() => {
          try {
            setToken("callBack");
            window["callBack"] = result => {
              let obj = JSON.parse(result);
              this.$store.commit("setUserInfo", obj);
              _this.getMerchantList();
            };
          } catch (error) {
            _this.getMerchantList();
          }

          // 数据全部加载完成
        }, 500);
      } else {
        this.finished = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
