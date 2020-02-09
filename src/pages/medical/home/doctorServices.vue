<template>
  <section class="ctn">
    <van-nav-bar title="医生服务" left-arrow @click-left="quit"/>

    <div class="cards">
      <div class="card" v-for="(v, k) in cards" :key="k">

        <div class="info-box" @click="click(3, v)">
          <img :src="v.headImg" alt="" width="65px" height="65px">
          <div class="info">
            <div class="user-info">
              <span class="name">
                {{v.name}}
                <van-tag plain type="success" color="#64BBC3" text-color="#64BBC3">{{v.doctorTypeText}}</van-tag>
              </span>
            </div>

            <div class="hospital-box">
              <span class="hospital">{{v.hospitalName}}</span>
              &nbsp;
              <span class="department">{{v.departmentName}}</span>
            </div>
          </div>
        </div>

        <van-divider />

        <div class="btn">
          <span @click="click(0, v)">在线咨询</span>
          <span @click="click(1, v)">咨询记录</span>
          <span @click="click(2, v)" class="disabled">预约挂号</span>
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
      option2: [],
      form: {
        page: 1,
        limit: 10
      }
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
          this.$router.push({path: '/medical/home/advisoryRecord', query: {id: v.id}}) // 在线咨询
          break
        case 1:
          this.$router.push({path: '/medical/home/chat', query: v})
          break
        case 2:
          break
        case 3:
          this.$router.push({path: '/medical/home/doctorInfo', query: v})
          // 跳转医生详情
          break
      }
    },

    init2 () {
      this.$api.medical.doctorListFollow(this.form).then(res => { // 关注过的医生
        if (res.code === 0) {
          for (let i of res.bean) {
            i.hospitalTypeText = this.findAttrVal(i.hospitalType, this.option2, 'value', 'text') // 医院类型
            i.doctorTypeText = this.findAttrVal(i.doctorType, this.option3, 'value', 'text') // 职称
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
@import './index.scss';
.ctn{
  font-size: 15px;
  & > .cards{
    padding: 10px;
    & > .card{
      margin-bottom: 10px;
      background-color: #fff;
      box-sizing: border-box;
      padding: 15px;
      border-radius: 5px;
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
            color: $h_c;
            font-size: 20px;
          }
        }
        &>.info>.user-info{
          margin-top: 8px;
        }
        &>.info>.hospital-box {
          color: $fz_c;
          margin-top: 6px;
        }
      }

      & > .btn{
        color: $h_c;
        display: flex;
        justify-content: space-between;
        padding: 10px 15px;
      }
      & > .btn > .disabled{
        color: $fz_c;
      }
    }
  }
}
</style>
