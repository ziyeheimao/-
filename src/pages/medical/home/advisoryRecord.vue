<template>
  <section class="ctn">
    <van-nav-bar title="咨询记录" left-arrow @click-left="quit"/>
    <div class="cards">
      <div class="card" v-for="(v,k) in cards" :key="k" @click="char(v)">
        <p class="date">{{v.date}}</p>

        <div class="info-box">
          <img :src="v.img" alt="">

          <div class="info">
            <div class="yi">
              <span class="name">{{v.name}}</span>
              <span>{{v.title}}</span>
            </div>

            <div>
              <span>{{v.hospital}}</span> | 
              <span>{{v.department}}</span>
              <span>{{v.lv}}</span>
            </div>

            <div>
              <p class="info">{{v.info}}</p>
            </div>
          </div>
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
        {name: '张医生', info: '擅长：新型肺炎，肺癌，乳腺癌，肺叶片玻璃体混浊', date: '2020-01-01', title: '主任医师', state: '关 注', hospital: '北京协和医院', department: '内科', lv: '三甲级', id: 1, img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1580753527077&di=3ac1dd5a776ccbd584e60fb97da268bf&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01dee15541f518000001714a0ac456.jpg%40900w_1l_2o_100sh.jpg'},
        {name: '刘医生', info: '擅长：新型肺炎，肺癌，乳腺癌，肺叶片玻璃体混浊', date: '2020-01-01', title: '主任医师', state: '关 注', hospital: '北京协和医院', department: '内科', lv: '三甲级', id: 2, img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1580753527077&di=3ac1dd5a776ccbd584e60fb97da268bf&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01dee15541f518000001714a0ac456.jpg%40900w_1l_2o_100sh.jpg'},
        {name: '赵医生', info: '擅长：新型肺炎，肺癌，乳腺癌，肺叶片玻璃体混浊', date: '2020-01-01', title: '主任医师', state: '关 注', hospital: '北京协和医院', department: '内科', lv: '三甲级', id: 3, img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1580753527077&di=3ac1dd5a776ccbd584e60fb97da268bf&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01dee15541f518000001714a0ac456.jpg%40900w_1l_2o_100sh.jpg'},
        {name: '钱医生', info: '擅长：新型肺炎，肺癌，乳腺癌，肺叶片玻璃体混浊', date: '2020-01-01', title: '主任医师', state: '关 注', hospital: '北京协和医院', department: '内科', lv: '三甲级', id: 4, img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1580753527077&di=3ac1dd5a776ccbd584e60fb97da268bf&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01dee15541f518000001714a0ac456.jpg%40900w_1l_2o_100sh.jpg'},
        {name: '孙医生', info: '擅长：新型肺炎，肺癌，乳腺癌，肺叶片玻璃体混浊', date: '2020-01-01', title: '主任医师', state: '关 注', hospital: '北京协和医院', department: '内科', lv: '三甲级', id: 5, img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1580753527077&di=3ac1dd5a776ccbd584e60fb97da268bf&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01dee15541f518000001714a0ac456.jpg%40900w_1l_2o_100sh.jpg'},
        {name: '李医生', info: '擅长：新型肺炎，肺癌，乳腺癌，肺叶片玻璃体混浊', date: '2020-01-01', title: '主任医师', state: '关 注', hospital: '北京协和医院', department: '内科', lv: '三甲级', id: 6, img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1580753527077&di=3ac1dd5a776ccbd584e60fb97da268bf&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01dee15541f518000001714a0ac456.jpg%40900w_1l_2o_100sh.jpg'},
      ]
    }
  },
  computed: {},
  methods: {
    quit () {
      this.$router.go(-1)
    },
    char (v) {
      console.log(v.id)
      this.$router.push('/medical/home/chat')
    }
  },
  created () {},
  mounted () {},
  watch: {}
}
</script>

<style lang='scss' scoped>
.ctn{
  & > .cards{
    & > .card{
      margin: 10px;
      border: 1px solid #888;
      border-radius: 10px;
      font-size: 15px;
      color: #666;

      & > .date{
        border-bottom: 1px solid #888;
        padding: 10px 20px;
      }

      & > .info-box{
        display: flex;
        justify-content: space-between;
        padding: 10px;

        & > img{
          width: 75px;
          height: 75px;
          border-radius: 50%;
        }

        & > .info{
          flex: 1;
          margin-left: 8px;
          & > div{
            margin-top: 5px;
          }
          & > .yi{
            color: #000;
          }
          & .name{
            font-size: 20px;
          }
          & .info {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>
