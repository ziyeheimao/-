<template>
  <section class="ctn">
    <van-nav-bar title="医生服务" left-arrow @click-left="quit"/>

    <div class="cards">
      <div class="card" v-for="(v, k) in cards" :key="k">

        <div class="info-box">
          <img :src="v.doctorImg" alt="" width="65px" height="65px">
          <div class="info">
            <div>
              <span class="name">
                {{v.doctorName}}
                <van-tag plain type="success">职称</van-tag>
              </span>
            </div>

            <div>
              <span class="hospital">{{v.hospitalName}}</span>
              ·
              <span class="department">{{v.departmentName}}</span>
              ·
              <span class="hospitalTypeText">{{v.hospitalTypeText}}</span>
            </div>
          </div>
        </div>

        <div class="btn">
          <span @click="click(0, v)">在线咨询</span> | 
          <span @click="click(1, v)">咨询记录</span> | 
          <span @click="click(2, v)">预约挂号</span>
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
      cards: [],
      speedProgress: 0,
      option3: [],
      option2: []
    }
  },
  computed: {},
  methods: {
    quit () {
      this.$router.go(-1)
    },
    click (type, v) {
      switch (type) {
        case 0:
          this.$router.push({path: '/medical/home/condition', query: {id: v.id}}) // 在线咨询
          break
        case 1:
          this.$router.push({path: '/medical/home/chat', query: v})
          break
        case 2:
          break
      }
    },

    init2 () {
      this.$api.medical.inquiryRecordUserList().then(res => {
        if (res.code === 0) {
          for (let i of res.bean) {
            i.hospitalTypeText = this.findAttrVal(i.hospitalType, this.option2, 'value', 'text') // 医院类型
          }
          this.cards = res.bean
        }
      })
    },

    init () {
      this.speedProgress = 0
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
          this.speedProgress += 50
          if (this.speedProgress === 100) {
            this.init2()
          }
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
          this.speedProgress += 50
          if (this.speedProgress === 100) {
            this.init2()
          }
        }
      })
    },
    findAttrVal (data, arr, attrName, targetAttrName) {
      for (let i of arr) {
        if (i[attrName] === data) {
          return i[targetAttrName]
        }
      }
    }
  },
  created () {
    this.init()
  },
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
