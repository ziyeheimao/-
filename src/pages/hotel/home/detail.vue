<template>
  <div class="ctn">
    <van-nav-bar title="" left-text="" left-arrow @click-left="onClickLeft">
      <van-icon name="star-o" slot="right" />
      <van-icon name="share" slot="right" />
    </van-nav-bar>

    <van-tabs v-model="active">

      <van-tab title="酒店详情">
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(img, k) in images" :key="k" @click="detail(img)">
            <img v-lazy="img" width="100%" height="100%"/>
          </van-swipe-item>
        </van-swipe>

        <div class="info">
          <p class="title">
            <span>维也纳酒店(成都机场双流万达店)</span>
            <span>舒适型</span>
          </p>
          <p class="score">
            <span >4.9分 · 289条点评 ></span>
            <span>行李寄存</span>
            <span>免费取消</span>
          </p>
          <p class="address">
            <span>成都双流区东升街道星空路2段金恒德3期1栋10号</span>
            <span><van-icon name="location-o" />地图</span>
          </p>
          <p class="time">
            <span>10月31日</span>
            <span>今日入住 —</span>
            <span>11月01日</span>
            <span>明日退房</span>
          </p>
        </div>

        <div class="cards">
          <div v-for="(v,k) in list" :key="k" class="card" @click='detail(v)'>
            <div class="left">
              <img :src="v.url" alt="">
              <div class="box">
                <p class="name">{{v.name}}</p>
                <p class="info">{{v.info}}</p>
                <p class="cancel">入住当天18:00前可免费取消</p>
              </div>
            </div>

            <div class="price">
              <p>￥<span>{{v.price}}</span></p>
              <div>
                <div>订</div>
                <div>在线付</div>
              </div>
            </div>
          </div>
        </div>

        <div class="fold">
          <p class="btn" @click="fold">
            {{foldText}}
            <van-icon :name="foldIcon"/>
          </p>
          <div v-show="!isFold" class="box">
            <!-- <img src="../../../assets/img/1.png" alt="" width="100%"> -->

            <div class="hotel-info">
              <div class="group">
                <h3 class="title">入住须知</h3>
                <p><b>入离时间</b></p>
                <p>入住时间: 12:00以后</p>
                <p>离店时间: 12:00以前</p>
                <p><b>儿童政策</b></p>
                <p>不接受18岁以下客人单独入住； 不接受18岁以下客人 在无监护人陪同的情况下入住。</p>
                <p><b>附加费用</b></p>
                <p>提供单点早餐</p>
                <p><b>宠物</b></p>
                <p>不可携带宠物</p>
              </div>

              <div class="group">
                <h3 class="title">酒店设施</h3>
                <p><b>客房设施</b></p>
                <p>
                  <span class="icon"><i class="myico" style="background-image: url('../../../../static/hotel/icon10.png');"></i>房间Wi-Fi</span>
                  <span class="icon"><i class="myico" style="background-image: url('../../../../static/hotel/icon9.png');"></i>独立卫浴</span>
                  <span class="icon"><i class="myico" style="background-image: url('../../../../static/hotel/icon8.png');"></i>遮光窗帘</span>
                  <span class="icon"><i class="myico" style="background-image: url('../../../../static/hotel/icon6.png');"></i>洗浴用品</span>
                  <span class="icon"><i class="myico" style="background-image: url('../../../../static/hotel/icon5.png');"></i>洗漱用品</span>
                  <span class="icon"><i class="myico" style="background-image: url('../../../../static/hotel/icon21.png');"></i>空调</span>
                  <span class="icon"><i class="myico" style="background-image: url('../../../../static/hotel/icon12.png');"></i>吹风机</span>
                  <span class="icon"><i class="myico" style="background-image: url('../../../../static/hotel/icon15.png');"></i>电视</span>
                  <span class="icon"><i class="myico" style="background-image: url('../../../../static/hotel/icon4.png');"></i>拖鞋</span>
                  <span class="icon"><i class="myico" style="background-image: url('../../../../static/hotel/icon9.png');"></i>全天热水</span>
                  <span class="icon"><i class="myico" style="background-image: url('../../../../static/hotel/icon2.png');"></i>电热水壶</span>
                </p>

                <p><b>酒店服务</b></p>
                <p>
                  <span class="icon"><i class="myico" style="background-image: url('../../../../static/hotel/icon20.png');"></i>叫醒服务</span>
                  <span class="icon"><i class="myico" style="background-image: url('../../../../static/hotel/icon1.png');"></i>全天前台</span>
                  <span class="icon"><i class="myico" style="background-image: url('../../../../static/hotel/icon18.png');"></i>行李寄存</span>
                  <span class="icon"><i class="myico" style="background-image: url('../../../../static/hotel/icon13.png');"></i>每日打扫</span>
                </p>

                <p><b>通用设施</b></p>
                <p>
                  <span class="icon"><i class="myico" style="background-image: url('../../../../static/hotel/icon23.png');"></i>暖气</span>
                  <span class="icon"><i class="myico" style="background-image: url('../../../../static/hotel/icon16.png');"></i>电梯</span>
                  <span class="icon"><i class="myico" style="background-image: url('../../../../static/hotel/icon19.png');"></i>监控系统</span>
                  <span class="icon"><i class="myico" style="background-image: url('../../../../static/hotel/icon11.png');"></i>安全警报器</span>
                  <span class="icon"><i class="myico" style="background-image: url('../../../../static/hotel/icon7.png');"></i>烟雾警报器</span>
                  <span class="icon"><i class="myico" style="background-image: url('../../../../static/hotel/icon22.png');"></i>灭火器</span>
                  <span class="icon"><i class="myico" style="background-image: url('../../../../static/hotel/icon3.png');"></i>免费停车</span>
                </p>
              </div>

              <div class="group">
                <p class="phone">
                  <span>酒店电话: 028616018880</span>
                  <i class="myico" style="background-image: url('../../../../static/hotel/icon14.png');"></i>
                </p>
              </div>
              <!-- 点评 -->
              <comment></comment>
            </div>

            <van-button type="info" round block>查看房型</van-button>
          </div>
        </div>
      </van-tab>

      <van-tab title="入住须知">入住须知 仍在开发中...</van-tab>

      <van-tab title="用户点评">用户点评 仍在开发中...</van-tab>

      <van-tab title="企业资质">企业资质 仍在开发中...</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import comment from './detail-comment'
export default {
  components: {
    comment
  },
  // props: [''],
  computed: {

  },
  data () {
    return {
      active: '',
      list: [
        {name: '标准双人房', info: '30㎡ 有窗 双床1.2m', price: 261, url: 'http://dimg04.c-ctrip.com/images/20060c00000067v9795D9_R_1080_540.jpg'},
        {name: '标准单人房', info: '30㎡ 有窗 双床1.2m', price: 160, url: 'http://img3.imgtn.bdimg.com/it/u=3366668954,3895285925&fm=26&gp=0.jpg'},
        {name: '豪华大床房', info: '30㎡ 有窗 双床1.2m', price: 190, url: 'http://img.taopic.com/uploads/allimg/110322/9125-1103221Q93447.jpg'},
        {name: '标准双人房', info: '30㎡ 有窗 双床1.2m', price: 240, url: 'http://img3.imgtn.bdimg.com/it/u=3366668954,3895285925&fm=26&gp=0.jpg'},
        {name: '标准双人房', info: '30㎡ 有窗 双床1.2m', price: 280, url: 'http://img.taopic.com/uploads/allimg/110322/9125-1103221Q93447.jpg'},
      ],
      images: [
        'http://dimg04.c-ctrip.com/images/20060c00000067v9795D9_R_1080_540.jpg',
        'http://img3.imgtn.bdimg.com/it/u=3366668954,3895285925&fm=26&gp=0.jpg',
        'http://img.taopic.com/uploads/allimg/110322/9125-1103221Q93447.jpg'
      ],
      isFold: true,
      foldText: '展开',
      foldIcon: 'arrow-down'
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push('/hotel/home/list')
    },
    fold () {
      console.log(11)
      this.isFold = !this.isFold

      if (this.isFold) {
        this.foldText = '展开'
        this.foldIcon = 'arrow-down'
      } else {
        this.foldText = '折叠'
        this.foldIcon = 'arrow-up'
      }
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
.ctn{
  & > .van-nav-bar{
    .van-icon{
      font-size: 20px;
      margin: 5px;
    }
  }
  .van-swipe{
    margin-top: 15px;
    height: 140px;
  }

  .info{
    padding: 15px;
    font-size: 12px;

    &>.title{
      &>span:nth-child(1){
        color: #333;
        font-size: 18px;
        font-weight: bold;
      }
      &>span:nth-child(2){
        color: #666;
      }
    }

    &>.score{
      margin: 15px 0;
      &>span:nth-child(1){
        color: #4B9AED;
      }
      &>span:nth-child(2){
        color: #EDBE4B;
        margin: 0 15px;
      }
      &>span:nth-child(3){
        color: #6CBE73;
      }
    }

    &>.address{
      &>span:nth-child(1){
        color: #333;
      }
      &>span:nth-child(2){
        margin-left: 15px;
        color: #4B9AED;
      }
    }

    &>.time{
      margin-top: 25px;

      color: #333;
      &>span:nth-child(1){
        font-size: 14px;
      }
      &>span:nth-child(2){
        font-size: 11px;
      }
      &>span:nth-child(3){
        font-size: 14px;
      }
      &>span:nth-child(4){
        font-size: 11px;
      }
    }
  }

  .cards{
    &>.card{
      padding: 22px;
      display: flex;
      justify-content: space-between;

      &>.left{
        display: flex;
        &>.box{
          color: #333;
          &>.name{
            font-size: 14px;
            font-weight: bold;
          }
          &>.info{
            font-size: 12px;
            margin: 0;
            padding: 5px 0;
          }
          &>.cancel{
            color: #6CBE73;
          }
        }
        img{
          margin-right: 10px;
          width: 60px;
          height: 60px;
          object-fit: cover;
        }
      }
      &>.price{
        &>p{
          font-size: 16px;
          color: #FF3C3C;
          &>span{
            font-size: 20px;
          }
        }
        &>div{
          border-radius: 5px;
          border: 1px solid #F7B500;
          &>div{
            padding: 1px;
            text-align: center;
          }
          &>:first-child{
            font-size: 16px;
            color: #fff;
            background-color: #F7B500;
          }
          &>:last-child{
            color: #F7B500;
          }
        }
      }
    }
  }
  .fold{
    &>.btn{
      padding: 20px;
      font-size: 14px;
      color: #4698F0;
      text-align: center;
    }
    &>.box{
      padding: 25px;
      .van-button{
        margin-top: 15px;
      }

      &>.hotel-info{
        &>.group{
          color: #666;
          font-size: 14px;
          &>.title{
            font-weight: bold;
            font-size: 18px;
            padding: 10px 0;
          }
          &>p{
            padding: 5px 0;
            &>span.icon{
              display: inline-block;
              width: 32.1%;
            }
          }
          & b, &>.title{
            color: #333;
            font-weight: bold;
          }
        }
        &>.group .phone{
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
}
.myico{
  display: inline-block;
  width: 16px;
  height: 16px;
  background-repeat: no-repeat;
  background-size: 90% 90%;
  background-position: center center;
  border: 1px #666 dashed;
  position: relative;
  top: 3px;
  margin-right: 10px;
}
</style>
