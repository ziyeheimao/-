<template>
  <section class="ctn">
    <van-nav-bar title="患者咨询" left-arrow @click-left="quit"/>

    <van-list class="cards" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="card" v-for="(v,k) in cards" :key="k" @click="see(v)">
        <div class="title">
          <van-icon name="clock" />
          <span class="time">{{v.createTime}}</span>
        </div>

        <van-divider></van-divider>

        <div>
          <span class="name">{{v.userName}}</span> &nbsp;
          <span class="info">{{v.gender ===  '0' ? '女' : '男'}}</span>
          /
          <span>{{v.age}} 岁</span>
        </div>

        <div>
          <span>{{v.diseaseDesc}}</span>
        </div>
      </div>
    </van-list>

  </section>
</template>

<script>
export default {
  // props: [''],
  computed: {},
  data () {
    return {
      form: {
        page: 0,
        limit: 10
      },
      cards: [],

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
        if (res.code === 0) this.cards.push(...res.bean)

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (res.bean.length < this.form.limit) this.finished = true;
      })
    },
    onLoad () {
      this.form.page++
      this.search()
    },
    see (v) {
      console.log('跳转之前', v)
      v.isDoctor = true
      v.doctorName = v.userName
      this.$router.push({path: '/medical/home/chat', query: v})
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
  watch: {
  }
}
</script>

<style lang='scss' scoped>
@import './index.scss';

.ctn{
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
