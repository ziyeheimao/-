<template>
    <div class="box">
        <van-popup v-model="isShow" overlay round position="bottom" class="detail-account">
            <div class="tittle">费用明细</div>
            <div class="item" v-for="(item,index) in accountObject.list" :key="index">
                <div class="detail">{{item.name}}</div>
                <div class="price">
                    <div class="left">{{item.typeName}}</div>
                    <div class="right">
                        ￥
                        <span>{{item.price}}</span>&nbsp;x&nbsp;
                        <span>{{item.num}}</span>
                    </div>
                </div>
            </div>
            <div class="sum">
                总价￥
                <span>{{accountObject.sum}}</span>
            </div>
            <div class="bottom">
                <van-button round type="info" size="large" class="submit" @click="hidePopup">
                    <span>确定</span>
                </van-button>
            </div>
        </van-popup>
    </div>
</template>
<script>
export default {
  props: {
    accountObject: {
      type: Object,
      default: "/"
    }
  },
  data() {
    return {
      isShow: false
    };
  },

  mounted() {
    console.log(this.isShow);
  },
  methods: {
    showPopup() {
      this.isShow = true;
    },
    hidePopup() {
      this.isShow = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.detail-account {
  color: #333;
  .tittle {
    width: 100%;
    margin: 14px 0 10px 16px;
    font-size: 16px;
    font-weight: 600;
  }
  .item {
    padding-bottom: 25px;
    padding-top: 10px;
    border-bottom: 1px solid #e6e6e6;

    .detail {
      width: 100%;
      font-size: 14px;
      padding: 0 15px;
      margin-bottom: 9px;
    }

    .price {
      display: flex;
      font-size: 14px;
      padding: 0 16px;
      .left {
        flex: 1;
        width: 0;
      }

      .right {
        width: auto;
      }
    }
  }

  .divider {
    margin-top: 25px;
  }

  .sum {
    width: 100%;
    padding-right: 15px;
    margin-top: 11px;
    text-align: right;
    font-size: 12px;
    span {
      font-size: 20px;
      font-weight: 500;
    }
  }
  .bottom {
    width: 100%;
    text-align: center;
    .submit {
      width: 346px;
      margin-top: 83px;
      margin-bottom: 8px;
      span {
        font-size: 18px;
      }
    }
  }
}
</style>
