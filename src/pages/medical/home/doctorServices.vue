<template>
  <section class="ctn">
    <van-nav-bar title="医生服务" left-arrow @click-left="quit"/>

    <div class="cards">
      <div class="card" v-for="(v, k) in cards" :key="k">

        <div class="info-box">
          <img :src="v.img" alt="" width="65px" height="65px">
          <div class="info">
            <div>
              <span class="name">{{v.name}}</span>
              <span class="title">{{v.title}}</span>
              <van-button type="default" round size="small">{{v.state}}</van-button>
            </div>

            <div>
              <span class="hospital">{{v.hospital}}</span>
              ·
              <span class="department">{{v.department}}</span>
            </div>
          </div>
        </div>

        <div class="btn">
          <span @click="click(0)">在线咨询</span> | 
          <span>咨询记录</span> | 
          <span>预约挂号</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      cards: [
        {name: '张医生', title: '主任医师', state: '关 注', hospital: '北京协和医院', department: '内科', id: 1, img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1580753527077&di=3ac1dd5a776ccbd584e60fb97da268bf&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01dee15541f518000001714a0ac456.jpg%40900w_1l_2o_100sh.jpg'},
        {name: '刘医生', title: '主任医师', state: '关 注', hospital: '北京协和医院', department: '内科', id: 2, img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1580753527077&di=3ac1dd5a776ccbd584e60fb97da268bf&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01dee15541f518000001714a0ac456.jpg%40900w_1l_2o_100sh.jpg'},
        {name: '赵医生', title: '主任医师', state: '关 注', hospital: '北京协和医院', department: '内科', id: 3, img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1580753527077&di=3ac1dd5a776ccbd584e60fb97da268bf&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01dee15541f518000001714a0ac456.jpg%40900w_1l_2o_100sh.jpg'},
        {name: '钱医生', title: '主任医师', state: '关 注', hospital: '北京协和医院', department: '内科', id: 4, img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1580753527077&di=3ac1dd5a776ccbd584e60fb97da268bf&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01dee15541f518000001714a0ac456.jpg%40900w_1l_2o_100sh.jpg'},
        {name: '孙医生', title: '主任医师', state: '关 注', hospital: '北京协和医院', department: '内科', id: 5, img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1580753527077&di=3ac1dd5a776ccbd584e60fb97da268bf&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01dee15541f518000001714a0ac456.jpg%40900w_1l_2o_100sh.jpg'},
        {name: '李医生', title: '主任医师', state: '关 注', hospital: '北京协和医院', department: '内科', id: 6, img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1580753527077&di=3ac1dd5a776ccbd584e60fb97da268bf&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01dee15541f518000001714a0ac456.jpg%40900w_1l_2o_100sh.jpg'},
      ]
    }
  },
  computed: {},
  methods: {
    quit () {
      this.$router.go(-1)
    },
    click (type) {
      switch (type) {
        case 0:
          this.$router.push('/medical/home/condition')
          break
        case 1:
          break
        case 2:
          break
      }
    }
  },
  created () {},
  mounted () {},
  watch: {}
}
</script>

<style lang='scss' scoped>
.ctn{
  font-size: 15px;
  color: #888;
  & > .cards{
    padding: 10px;
    background-color: #eee;
    & > .card{
      margin-bottom: 10px;
      background-color: #fff;
      height: 155px;
      box-sizing: border-box;
      padding: 15px;
      & > .info-box{
        display: flex;
        justify-content: space-between;
        padding: 15px;
        &>img{
          border-radius: 50%;
        }
        &>.info{
          flex: 1;
          margin-left: 10px;
          .name{
            color: #000;
            font-size: 20px;
          }
        }
        &>.info :nth-child(1){
          margin-top: 8px;
        }
        &>.info :nth-child(1) .van-button{
          float: right;
        }
        &>.info :nth-child(2) {
          margin-top: 6px;
        }
      }
      & > .btn{
        border-top: 1px solid #888;
        display: flex;
        justify-content: space-between;
        padding: 10px 15px;
      }
    }
  }
}
</style>
