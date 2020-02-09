<template>
  <section class="ctn">
    <van-nav-bar title="咨询记录" left-arrow @click-left="quit"/>

    <van-list class="cards" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">

      <div class="card" v-for="(v,k) in cards" :key="k" @click="char(v)">
        <div class="info-box">
          <img :src="v.doctorImg" alt="">

          <div class="info">
            <div>
              <span class="name">
                {{v.doctorName}}
                <van-tag plain type="success" color="#64BBC3" text-color="#64BBC3">{{v.doctorTypeText}}</van-tag>
              </span>
            </div>

            <div class="hospital-info">
              <span>{{v.hospitalName}}</span> | 
              <span>{{v.departmentName}}</span>
              <span>{{v.hospitalTypeText}}</span>
            </div>

            <div>
              <p class="info">擅长：{{v.goodAt}}</p>
            </div>
          </div>
        </div>

        <van-divider />

        <p class="date">{{v.createTime}}</p>
      </div>
    </van-list>
  </section>
</template>

<script>
// import Vue from 'vue';
// import { Toast } from 'vant';
// Vue.use(Toast);

export default {
  components: {},
  data () {
    return {
      cards: [],
      option2: [],
      option3: [],
      speedProgress: 0,

      form: {
        page: 0,
        limit: 10
      },

      // 触底翻页容器
      loading: false,
      finished: false
    }
  },
  computed: {},
  methods: {
    quit () {
      this.$router.go(-1)
    },
    char (v) {
      this.$router.push({path: '/medical/home/chat', query: v})
    },
    init2 () {
      let id = this.$route.query.id
      if (id) { // 有id查 某个单一医生的咨询记录
        let req = { doctorId: id, page: this.form.page, limit: this.form.limit }
        this.$api.medical.inquiryRecordUserDoctor(id, req).then(res => {
          if (res.code === 0) {
            for (let i of res.bean) {
              i.doctorTypeText = this.findAttrVal(i.doctorType, this.option3, 'value', 'text') // 职称
              i.hospitalTypeText = this.findAttrVal(i.hospitalType, this.option2, 'value', 'text') // 医院类型
            }
            this.cards.push(...res.bean)
            this.isPageMax(res)
          }
        })
      } else { // 无id分页查所有咨询记录
        this.$api.medical.inquiryRecordUserList(this.form).then(res => {
          if (res.code === 0) {
            for (let i of res.bean) {
              i.doctorTypeText = this.findAttrVal(i.doctorType, this.option3, 'value', 'text') // 职称
              i.hospitalTypeText = this.findAttrVal(i.hospitalType, this.option2, 'value', 'text') // 医院类型
            }
            this.cards.push(...res.bean)
            this.isPageMax(res)
          }
        })
      }
    },
    // 判断分页 是否还有后续内容
    isPageMax (res) {
      // 加载状态结束
      this.loading = false;
      // 数据全部加载完成
      if (res.bean.length < this.form.limit) this.finished = true;
    },

    init () {
      if (this.speedProgress === 100) {
        this.init2()
        return
      }

      // 医院类型
      this.$api.medical.sysDictSelectItemsByDictType({dictType:'hospital_type'}).then(res => {
        if (res.code === 0) {
          for (let i of res.bean) {
            i.text = i.dictItemName
            i.value = i.dictType
          }
          this.option2 = res.bean
          this.speedProgress += 50
          if (this.speedProgress === 100) this.init2()
        }
      })

      // 医生职称
      this.$api.medical.sysDictSelectItemsByDictType({dictType:'doctor_type'}).then(res => {
        if (res.code === 0) {
          for (let i of res.bean) {
            i.text = i.dictItemName
            i.value = i.dictType
          }
          this.option3 = res.bean
          this.speedProgress += 50
          if (this.speedProgress === 100) this.init2()
        }
      })
    },

    findAttrVal (data, arr, attrName, targetAttrName) {
      for (let i of arr) {
        if (i[attrName] === data) {
          return i[targetAttrName]
        }
      }
    },

    // 滚动容器触发触底事件
    onLoad () {
      this.form.page++
      this.init()
    },
  },
  created () {},
  mounted () {},
  watch: {}
}
</script>

<style lang='scss' scoped>
@import './index.scss';

.ctn{
  & > .cards{
    & > .card{
      background-color: #fff;
      border-radius: 5px;
      margin: 10px;
      font-size: 15px;
      color: #666;

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
          & .name{
            color: $h_c;
            font-size: 20px;
          }
          &>.hospital-info{
            color: $fz_c;
          }
          & .info {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
          }
        }
      }

      & > .date{
        text-align: right;
        padding: 10px 20px 15px;
        color: $fz_c;
      }
    }
  }
}
</style>
