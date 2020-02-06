<template>
  <div class="ctn">
    <h2>用户评论</h2>

    <div class="score">
      <p class="left">
        <span><b>{{'5.0'}}</b></span>
        分
        <b>{{'超棒'}}</b>
      </p>

      <p class="right">
        高于97%同城舒适型酒店
        <br>
        卫生4.9 环境4.9 服务4.8 设施4.8
      </p>
    </div>

    <div class="tag">
      <van-tag plain type="primary">设施很好(23)</van-tag>
      <van-tag plain type="primary">环境舒适(59)</van-tag>
      <van-tag plain type="primary">卫生干净(98)</van-tag>
      <van-tag plain type="primary">服务周到(21)</van-tag>
    </div>

    <div class="comments">
      <section class="comment">
        <div class="title">
          <div>
            <img src="http://img3.imgtn.bdimg.com/it/u=378824344,1185609431&fm=26&gp=0.jpg" alt="">
            <span>旅游达人</span>
          </div>
          <span>2019-12</span>
        </div>
        <p class="info">
          酒店地址距离万达广场对面，出行饮食娱乐都很方便，酒店的房间特别舒服，房间空间特别大，价格实惠，所有设施都很新，关键是床柔软舒服，虽然酒店挨近路边，晚上睡觉还是很安静的，办理入住和退房快捷简单，很愉快地一次体验。
        </p>
        <p class="count">全部真实顾客评论 · {{789}}</p>
        <p class="enterprise-info">企业资质信息</p>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    // x
  },
  // props: [''],
  computed: {

  },
  data () {
    return {

    }
  },
  methods: {

  },
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  deactivated () {},
  watch: {}

}
</script>

<style scoped lang='scss'>
.ctn{
  &>h2{
    margin: 20px 0;
    font-size: 18px;
    font-weight: bold;
  }
  &>.score{
    display: flex;
    margin-bottom: 20px;
    &>.left{
      margin-right: 10px;
      font-size: 14px;
      &>span{
        font-size: 22px;
      }
      color: #4B9AED;
    }
    &>.right{
      color: #666;
      font-size: 11px;
    }
  }
  &>.tag{
    &>.van-tag{
      margin-bottom: 5px;
    }
  }
  &>.comments{
    &>.comment{
      &>.title{
        margin: 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;

        &>div{
          display: flex;
          align-items: center;
          &>img{
            width: 22px;
            height: 22px;
            border-radius: 50%;
            border: 1px solid #bbb;
            margin-right: 10px;
          }
          color: #333;
          font-size: 12px;
          font-weight: bold;
        }
        &>span{
          color: #666;
        }
      }
      &>.info{
        margin: 10px 0;
        text-indent: 24px;
        font-size: 12px;
        color: #666;
      }
      &>.count{
        color: #4B9AED;
        font-size: 14px;
      }
      &>.enterprise-info{
        margin: 10px 0 30px;
        color: #333;
        font-size: 14px;
      }
    }
  }
}
</style>
