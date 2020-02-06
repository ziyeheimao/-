<template>
  <div class="box">
    <div class="nav-bar-box">
      <van-nav-bar left-arrow @click-left="goBack">
        
      </van-nav-bar>
    </div>
    <div class="content">
      <img src="~@/assets/img/pay_success@2x.png" alt="">
      <div class="top">支付成功</div>
      <div class="bottom" @click="gotoOrderList">去订单查看</div>
    </div>
  </div>
</template>

<script>
import { gotoNativeLogin, setToken } from "@/utils/ios_android_fun";
import { math } from "@/utils/index";
// import HotelDatePicker from "vue-hotel-datepicker";
import { Dialog } from "vant";
export default {



  data() {
    return {
     
    };
  },

  mounted() {
    
  },

  components: {
  },
  computed: {},

  methods: {
    gotoOrderList() {
      this.$routerTo(this.$path.ORDER_LIST_INDEX);
      // setToken("nativeCallBack", id);
    },
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
