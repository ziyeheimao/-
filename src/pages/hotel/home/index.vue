<template>
  <div class="ctn">
    <van-nav-bar title="酒店预订" left-text="" left-arrow @click-left="onClickLeft"/>

    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(img, k) in images" :key="k" @click="detail(img)">
        <img v-lazy="img" width="100%" height="100%"/>
      </van-swipe-item>
    </van-swipe>

    <div class="btn">
      <div>
        <van-button type="default" size="small">国内酒店</van-button>
        <van-button type="default" size="small">钟点房</van-button>
        <van-button type="default" size="small">民宿</van-button>
        <van-button type="default" size="small">本地体验</van-button>
        <van-button type="default" size="small">特价酒店</van-button>
      </div>
    </div>

    <div class="form">
      <van-cell-group>
        <van-field v-model="form.name" placeholder="酒店关键词/名称" label="九寨沟"/>
      </van-cell-group>

      <van-cell title="选择日期区间" :value="date2" @click="show = true" />
      <van-calendar v-model="show" type="range" @confirm="onConfirm" />

      <van-button type="info" round block @click="serach">搜索酒店</van-button>

      <div class="ico-btn">
        <div>
          <van-icon name="star-o" />
          <span>浏览收藏</span>
        </div>

        <div>
          <van-icon name="orders-o" />
          <span>酒店订单</span>
        </div>
      </div>
    </div>

    <div class="discount">
      <h4>特价酒店</h4>

      <div class="cards">
        <div v-for="(v,k) in hotelList" :key="k" class="card" @click="detail(v)">
          <img :src="v.url" alt="">
          <p class="distance">距离您{{v.distance}}km</p>
          <p class="name">{{v.name}}</p>
          <p class="price">￥{{v.price}}/天</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { YMD } from "@/utils/formatTime"
export default {
  components: {
    // x
  },
  // props: [''],
  computed: {

  },
  data () {
    return {
      images: [
        'http://dimg04.c-ctrip.com/images/20060c00000067v9795D9_R_1080_540.jpg',
        'http://img3.imgtn.bdimg.com/it/u=3366668954,3895285925&fm=26&gp=0.jpg',
        'http://img.taopic.com/uploads/allimg/110322/9125-1103221Q93447.jpg'
      ],
      hotelList: [
        {name: '九寨沟民宿 | 豪华家庭房', distance: '1.6', price: '240', url: 'http://dimg04.c-ctrip.com/images/20060c00000067v9795D9_R_1080_540.jpg'},
        {name: '九寨沟民宿 | 豪华家庭房', distance: '3.2', price: '160', url: 'http://img3.imgtn.bdimg.com/it/u=3366668954,3895285925&fm=26&gp=0.jpg'},
        {name: '九寨沟民宿 | 豪华家庭房豪华家庭房豪华家庭房豪华家庭房', distance: '2.4', price: '210', url: 'http://img.taopic.com/uploads/allimg/110322/9125-1103221Q93447.jpg'},
        {name: '九寨沟民宿 | 豪华家庭房', distance: '1.6', price: '240', url: 'http://dimg04.c-ctrip.com/images/20060c00000067v9795D9_R_1080_540.jpg'},
        {name: '九寨沟民宿 | 豪华家庭房', distance: '3.2', price: '160', url: 'http://img3.imgtn.bdimg.com/it/u=3366668954,3895285925&fm=26&gp=0.jpg'},
        {name: '九寨沟民宿 | 豪华家庭房', distance: '2.4', price: '210', url: 'http://img.taopic.com/uploads/allimg/110322/9125-1103221Q93447.jpg'}
      ],

      form: {
        name: ''
      },

      show: false,
      date: [],
      date2: ''
    }
  },
  methods: {
    onClickLeft() {
      console.log('返回')
    },
    detail (v) {
      console.log(v)
      this.$router.push('/hotel/home/detail')
    },
    // 日期区间选择
    onConfirm(date) {
      this.show = false;
      this.date = date;
      this.date2 = YMD(this.date[0]) + '~' + YMD(this.date[1])
    },
    serach () {
      this.$router.push('/hotel/home/list')
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

<style scoped lang='scss'>
@import "@/style/mixin.scss";

.ctn{
  & > .van-swipe{
    height: 190px;
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

  & > .form{
    padding: 0 20px;
    &>.van-button{
      margin-top: 15px;
    }
    &>.ico-btn{
      width: 100%;
      font-size: 16px;
      color: #666;
      display: flex;
      justify-content: center;
      &>div{
        margin: 15px 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        &>.van-icon{
          font-size: 25px;
          margin-right: 5px;
          border: 1px dashed #666;
        }
      }
    }
  }

  // 特价酒店
  &>.discount{
    margin: 50px 12px 0;
    &>h4{
      color: #333;
      font-size: 18px;
      margin-bottom: 10px;
    }

    // 酒店卡片
    &>.cards{
      width: 100%;
      margin-bottom: 30px;

      white-space: nowrap;
      overflow-y: scroll;
      scrollbar-width: none;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
    }
    &>.cards>.card~.card{
      margin-left:10px;
    }
    &>.cards>.card{
      width: 160px;
      // height: 107px;
      display: inline-block;
      color: #333;

      &>img{
        width: 100%;
        height: 107px;
        object-fit: cover;
      }
      &>p{
        margin-top: 2px;
        max-width: 100%;
        overflow: hidden;
        text-overflow:ellipsis;
      }
      &>.distance{
        font-size: 12px;
      }
      &>.name{
        font-size: 14px;
        font-weight: bold;
      }
      &>.price{
        font-size: 12px;
        color: #666;
      }
    }
  }
}
</style>
