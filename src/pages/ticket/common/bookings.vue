

      <template>
    <div class="box">
        <van-popup v-model="isShow" overlay round position="bottom" :style="{ height: '395px' }">
            <div class="h1">九寨沟风景区门票</div>
            <div class="h2">预定规则</div>
            <div class="content">
                <div class="lef">预定时间</div>
                <div class="right">
                    17点之前可定今日
                    <span>（当地时间）</span>
                </div>
            </div>
            <div class="content">
                <div class="left">生效时间</div>
                <div class="right">出票后立即生效</div>
            </div>
            <div class="content">
                <div class="left">有效期</div>
                <div class="time">指定出行时间一天内有效</div>
            </div>
            <div class="content">
                <div class="left">出票速度</div>
                <div class="right">平均十分钟出票</div>
            </div>
            <div class="h3">费用说明</div>
            <div class="content">
                <div class="left">费用包含</div>
                <div class="right">九寨沟门票一张</div>
            </div>
            <div class="content">
                <div id="left">费用不含</div>
                <div id="rightt">一切个人消费及费用包含中未提及的任何
                    <br>费用。
                </div>
            </div>
            <div class="submitBox">
                <van-button round type="info" size="large" class="submit">
                    <span>确定</span>
                </van-button>
            </div>
        </van-popup>
    </div>
</template>
<script>
export default {
  props: {
   
  },
  data() {
    return {
      isShow: false
    };
  },

  mounted() {
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
 .h1 {
      margin: 25px 234px 0px 13px;
      font-size: 16px;
      color: #333333;
      font-weight: 600;
    }

    .h2 {
      margin: 20px 298px 0px 13px;
      font-size: 16px;
      color: #333333;
      font-weight: 600;
    }

    .content {
      display: flex;

      .lef {
        margin: 8px 0px 0px 13px;
        font-size: 14px;
        color: #666666;
      }

      .left {
        margin: 8px 0px 0px 13px;
        font-size: 14px;
        color: #666666;
      }

      #left {
        margin: 8px 0px 20px 13px;
        font-size: 14px;
        color: #666666;
      }

      .time {
        margin: 8px 0px 0px 47px;
      }

      .right {
        margin: 8px 0px 0px 33px;
        font-size: 14px;
        color: #666666;
      }

      #rightt {
        margin: 10px 21px 0px 33px;
        font-size: 14px;
        color: #666666;
      }
    }

    .h3 {
      margin: 20px 298px 0px 13px;
      font-size: 16px;
      color: #333333;
      font-weight: 600;
    }

    .submitBox {
      width: 100%;

      .submit {
        width: 346px;
        margin-top: 25px;
        margin-left: 13px;
        margin-right: 15px;

      }

      span {
        font-size: 18px;
      }
    }
</style>
