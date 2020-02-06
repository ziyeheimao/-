<template>
  <section class="ctn">
    <van-nav-bar title="患者咨询" left-arrow @click-left="quit"/>

    <van-list class="cards" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="card" v-for="(v,k) in cards" :key="k" @click="see(v)">
        <div class="title">
          <van-icon name="clock" />
          <span class="time">{{v.time}}</span>
        </div>

        <van-divider></van-divider>

        <div>
          <span class="name">{{v.name}}</span> &nbsp;
          <span class="info">{{v.sex + ' / ' + v.age}} 岁</span>
        </div>

        <div>
          <span>{{v.text}}</span>
        </div>
      </div>
    </van-list>
  </section>
</template>

<script>

export default {
  components: {},
  // props: [''],
  computed: {},
  data () {
    return {
      form: {
        page: 1,
        limit: 10
      },
      cards: [
        {time: '2020年01月01日', sex:'男', age: 21,
          name: '藏小草', 
        text:'暗红色的暗红色的急啊卡速度加快暗红色的急啊卡速度加快急啊卡速度加快暗红色的急啊卡速度加快暗红色的暗红色的急啊卡速度加快暗红色的急啊卡速度加快急啊卡速度加快暗红色的急啊卡速度加快'}
              ,{time: '2020年01月01日', sex:'男', age: 21,
          name: '藏小草', 
        text:'暗红色的暗红色的急啊卡速度加快暗红色的急啊卡速度加快急啊卡速度加快暗红色的急啊卡速度加快暗红色的暗红色的急啊卡速度加快暗红色的急啊卡速度加快急啊卡速度加快暗红色的急啊卡速度加快'}
      
      ],

      // 触底翻页容器
      loading: false,
      finished: false
    }
  },
  methods: {
    quit () {
      this.$router.go(-1)
    },

    search () {
      this.$api.medical.inquiryRecordDoctorList(this.form).then(res => { // 患者咨询
        // if (res.code === 0) this.cards = res.bean
        console.log(this.cards)

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (res.bean.length < 10) this.finished = true;
      })
    },
    onLoad () {
      this.page++
      this.search()
    },
    see (v) {
      console.log(v)
    }
  },
  beforeCreate () {},
  created () {
    this.search()
  },
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  deactivated () {},
  watch: {
  }
}
</script>

<style lang='scss' scoped>
.ctn{
  background-color: rgb(246,244,245);
  min-height: 100%;
  &>.cards{
    &>.card{
      font-size: 14px;
      margin: 10px;
      padding: 15px;
      border-radius: 5px;
      background-color: #fff;

      &>.title{
        .van-icon{
          color: #4b7dc2;
        }
        .time{
          color: #666;
        }
      }
 
      & .info {
        color: #666;
      }
      &>div~div{
        margin-top: 10px;
      }
      & .name{
        font-size: 20px;
      }
    }
  }
}
</style>
