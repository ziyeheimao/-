<template>
  <section class="ctn">
    <van-nav-bar title="找医生" left-arrow @click-left="quit"/>

    <van-dropdown-menu class="btn" :close-on-click-outside='false'>
      <van-dropdown-item v-model="value1" :options="option1"
        @open='open' @close='close' ref="dropdown"/>
      <van-dropdown-item v-model="value2" :options="option2" />
      <van-dropdown-item v-model="value3" :options="option3" />
    </van-dropdown-menu>

    <van-tree-select v-show="isShow" :items="items" :active-id.sync="activeId"
      :main-active-index.sync="activeIndex" @click-item='clickItem'/>

    <van-list class="cards" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="card" v-for="(v,k) in cards" :key="k" @click="doctorInfo(v)">
        <div class="info-box">
          <img :src="v.headImg" alt="">

          <div class="info">
            <div>
              <span class="name">{{v.name}}</span>
              &nbsp;
              <van-tag plain type="success" color="#64BBC3" text-color="#64BBC3">{{v.doctorTypeText}}</van-tag>
            </div>

            <div class="between title">
              <span>{{v.hospitalName}} | {{v.departmentName}}</span>
              <span>{{v.hospitalTypeText}}</span>
            </div>

            <div>
              <span class="info">擅长：{{v.goodAt}}</span>
            </div>

            <div class="between">
              <span>问诊量{{v.inquiryNum}}</span>
              <span>平均回复时长 {{v.avReplyTime}}</span>
            </div>
          </div>
        </div>

        <van-divider></van-divider>

        <div class="btn">
          <van-button type="info" size="small" color="#4B7DC2" @click.stop="consultation(v)">免费咨询</van-button>
        </div>
      </div>
    </van-list>
  </section>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      page: 0,
      limit: 10,
      value1: -1,
      value2: -1,
      value3: -1,
      option1: [
        { text: '全部科室', value: -1 }
      ],
      option2: [
        { text: '全部医院', value: -1 }
      ],
      option3: [
        { text: '全部医生', value: -1 }
      ],

      items: [], // 科室二级选择器

      activeId: 0,
      activeIndex: 0,
      isShow: false,

      cards: [], // 医生卡片
      // 触底翻页容器
      loading: false,
      finished: false
    }
  },
  computed: {},
  methods: {
    onLoad () {
      this.page++
      this.search()
    },

    quit () {
      this.$router.go(-1)
    },
    init () {
      this.$api.medical.departmentAll().then(res => { // 全部科室
        if (res.code === 0) {
          for (let i of res.bean) {
            i.children = i.child
          }
          this.dg(res.bean)
          this.items = [{ text: '全部科室', name: '全部科室', id: -1, value: -1, children: [{text: '全部科室', name: '全部科室', id: -1, value: -1}] }, ...res.bean]

          let id = this.$route.query.id
          if (id) { this.selectedDepartments(id, this.items) }
        }
      })

      // 字典
      let req_hospital_type = {
        dictType: 'hospital_type' // 医院类型
      }
      this.$api.medical.sysDictSelectItemsByDictType(req_hospital_type).then(res => {
        if (res.code === 0) {
          for (let i of res.bean) {
            i.text = i.dictItemName
            i.value = i.dictType
          }
          this.option2.push(...res.bean)
        }
      })

      let req_doctor_type = {
        dictType: 'doctor_type' // 医生职称
      }
      this.$api.medical.sysDictSelectItemsByDictType(req_doctor_type).then(res => {
        if (res.code === 0) {
          for (let i of res.bean) {
            i.text = i.dictItemName
            i.value = i.dictType
          }
          this.option3.push(...res.bean)
        }
      })
    },

    // 初始化已选科室(如果有)
    selectedDepartments (id, arr) {
      for (let i of arr) {
        if (i.id === Number(id)) {
          this.value1 = i.id
          this.option1[0].text = i.text
          this.option1[0].value = i.id
          return
        }
        if (i.child) {
          this.selectedDepartments(id, i.child)
        }
      }
    },
    dg (arr) {
      for (let i of arr) {
        i.text = i.name
        if (i.child) {
          this.dg(i.child)
        }
      }
    },
    clickItem (e) { // 二级科室分类选择
      this.value1 = e.id
      this.option1[0].text = e.text
      this.option1[0].value = e.id
      this.$refs.dropdown.toggle();
    },
    open () { this.isShow = !this.isShow },
    close () { this.isShow = !this.isShow },

    doctorInfo (v) {
      this.$router.push({path: '/medical/home/doctorInfo', query: { id: v.id }})
    },
    consultation (v) {
      this.$router.push({path: '/medical/home/condition', query: {id: v.id}}) // 填写病情
    },
    // 充值搜索的默认参数
    reset () {
      this.limit = 10
      this.page = 1
      this.cards = []
    },

    // 通过数组对象中的某个对象属性值,获取该对象其他属性值 [{name: 'x', val: 1}, {name: 'z', val: 2}]  -> 通过1获得x
    findAttrVal (data, arr, attrName, targetAttrName) {
      for (let i of arr) {
        if (i[attrName] === data) {
          return i[targetAttrName]
        }
      }
    },
    search () { // 搜索医生
      let req = { page: this.page, limit: this.limit, }
      if (this.value1 !== -1) req.departmentId = this.value1 // 科室id
      if (this.value2 !== -1) req.hospitalType = this.value2 + '' // 医院类型
      if (this.value3 !== -1) req.doctorType = this.value3 + '' // 从业职称

      this.$api.medical.doctorList(req).then(res => { // 搜索医生
        if (res.code === 0) {
          for (let i of res.bean) {
            i.doctorTypeText = this.findAttrVal(i.doctorType, this.option3, 'value', 'text') // 职称
            i.hospitalTypeText = this.findAttrVal(i.hospitalType, this.option2, 'value', 'text') // 医院类型
            i.avReplyTime = this.formatTime(i.avReplyTime) // 回复时间
            this.cards.push(i) // 追加内容
          }

          // 加载状态结束
          this.loading = false;

          // 数据全部加载完成
          if (res.bean.length < 10) this.finished = true;
        }
      })
    },

    // 时间戳转时长
    formatTime (value) {
      let seconds = parseInt((value % (1000 * 60)) / 1000)  // 秒数
      let minutes = parseInt((value % (1000 * 60 * 60)) / (1000 * 60))  // 分钟数
      let hours = parseInt((value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))   // 小时数
      let time = [hours, minutes, seconds]
      // 补 0
      time.forEach((el,index) => {
        if(el < 10) {
          time[index] = '0' + el
        }
      })
      return time.join(':')
    }
  },
  created () {
    this.init()
  },
  mounted () {},
  watch: {
    value1 () {
      this.reset() // 清空之前检索结果 并重置搜索参数
      this.search()
    },
    value2 () {
      this.reset() // 清空之前检索结果 并重置搜索参数
      this.search()
    },
    value3 () {
      this.reset() // 清空之前检索结果 并重置搜索参数
      this.search()
    }
  }
}
</script>

<style lang='scss' scoped>
@import './index.scss';

.ctn{
  &>.van-tree-select{
    position: relative;
    z-index: 10000;
  }
  &>.cards{
    padding: 10px;
    font-size: 15px;
    &>.card~.card{
      margin-top: 10px;
    }
    &>.card{
      background-color: #fff;
      padding: 15px;
      border: 1px solid #eee;
      border-radius: 5px;

      &>.info-box{
        display: flex;
        justify-content: space-between;
        &>img{
          border-radius: 50%;
          width: 60px;
          height: 60px;
        }
        &>.info{
          flex: 1;
          margin-left: 10px;

          &>div~div{
            margin-top: 5px;
          }

          &>.between{
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
          }

          & .name{
            font-size: 20px;
            color: $h_c;
          }
          & .title{
            color: $fz_c;
          }
          & .info{
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
          }
        }
      }
      &>.van-divider{
        margin: 10px 0 !important;
      }
      &>.btn{
        text-align: right;
      }
    }
  }
}
</style>
