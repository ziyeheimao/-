<template>
  <div class="ctn">
    <van-nav-bar left-arrow @click-left="onClickLeft"/>

    <van-cell-group class="serach">
      <van-field v-model="form.name" placeholder="酒店关键词/名称" label="九寨沟"/>
    </van-cell-group>

    <div class="btn">
      <div>
        <van-button type="default" size="small">10月26日-10月20日</van-button>
        <van-button type="default" size="small">智能排序</van-button>
        <van-button type="default" size="small">区域位置</van-button>
        <van-button type="default" size="small">筛选</van-button>
        <van-button type="default" size="small">星级 / 价格</van-button>
      </div>
    </div>

    <div class="cards">
      <div v-for="(v,k) in hotelList" :key="k" class="card" @click='detail(v)'>
        <img :src="v.url" alt="">

        <div class="info">
          <p class="name">{{v.name}}</p>

          <div class="box">
            <p>
              <span class="count">{{v.count}}</span>
              <br>
              <span>剩余房间</span>
            </p>
            <p>
              <span class="distance">{{v.distance}}</span>
              <br>
              <span>{{v.address}}}</span>
            </p>
          </div>

          <p class="footer">
            <span class="price">￥<b>{{v.price}}</b>/天</span>
            <span class="fraction">{{v.fraction}}分</span>
            <span>{{v.comment}}条评论</span>
          </p>
        </div>
      </div>
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
      form: {
        name: ''
      },
      hotelList: [
        {name: '九寨沟民宿', count: 6, fraction: '4.9', comment: '298', address: '距市中心 | 宽窄巷…', distance: '1.6', price: '240', url: 'http://dimg04.c-ctrip.com/images/20060c00000067v9795D9_R_1080_540.jpg'},
        {name: '九寨沟民宿', count: 6, fraction: '4.5', comment: '260', address: '距市中心 | 宽窄巷…', distance: '3.2', price: '160', url: 'http://img3.imgtn.bdimg.com/it/u=3366668954,3895285925&fm=26&gp=0.jpg'},
        {name: '九寨沟民宿', count: 6, fraction: '3.9', comment: '120', address: '距市中心 | 宽窄巷…', distance: '2.4', price: '210', url: 'http://img.taopic.com/uploads/allimg/110322/9125-1103221Q93447.jpg'},
        {name: '九寨沟民宿', count: 6, fraction: '5.0', comment: '190', address: '距市中心 | 宽窄巷…', distance: '1.6', price: '240', url: 'http://dimg04.c-ctrip.com/images/20060c00000067v9795D9_R_1080_540.jpg'},
        {name: '九寨沟民宿', count: 6, fraction: '4.6', comment: '688', address: '距市中心 | 宽窄巷…', distance: '3.2', price: '160', url: 'http://img3.imgtn.bdimg.com/it/u=3366668954,3895285925&fm=26&gp=0.jpg'},
        {name: '九寨沟民宿', count: 6, fraction: '4.8', comment: '218', address: '距市中心 | 宽窄巷…', distance: '2.4', price: '210', url: 'http://img.taopic.com/uploads/allimg/110322/9125-1103221Q93447.jpg'}
      ]
    }
  },
  methods: {
    onClickLeft() {
      console.log('返回')
      this.$router.push('/hotel/home/index')
    },
    detail (v) {
      console.log(v)
      this.$router.push('/hotel/home/detail')
    }
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

<style>
</style>

<style scoped lang='scss'>
.ctn{
  position: relative;
  .van-nav-bar{
    // outline: 1px solid red;
  }
  .serach{
    // outline: 1px solid red;
    width: 240px;
    position: absolute;
    top: 0;
    left: 45px;
    z-index: 2;
  }

  & > .btn{
    width: 100%;
    padding: 30px 12px 20px;
    & > div {
      white-space: nowrap;
      overflow-y: scroll;
      scrollbar-width: none;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
    }
  }
  &>.cards{
    width: 100%;
    &>.card{
      // box-sizing: border-box;
      margin: 45px 15px;
      height: 110px;
      display: flex;
      justify-content: space-between;
      &>img{
        width: 110px;
        height: 110px;
        object-fit: cover;
        border-radius: 5px;
      }
      &>.info{
        // padding: 10px 0;
        position: relative;
        flex: 1;
        margin-left: 10px;
        &>.name{
          color: #333;
          font-size: 16px;
          font-weight: bold;
        }
        &>.box{
          margin-top: 14px;
          display: flex;
          justify-content: space-between;
          color: #999;
          font-size: 12px;
          .count{
            color: #4B9AED;
            font-size: 14px;
          }
          .distance{
            color: #333333;
            font-size: 14px;
          }
        }
        &>.footer{
          font-size: 12px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          position: absolute;
          bottom: 0;
          left: 0;
          .price{
            b{
              font-size: 18px;
            }
          }
          .fraction{
            color: #4B9AED;
          }
        }
      }
    }
  }
}
</style>
