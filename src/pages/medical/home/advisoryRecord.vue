<template>
  <section class="ctn">
    <van-nav-bar title="咨询记录" left-arrow @click-left="quit"/>
    <div class="cards">
      <div class="card" v-for="(v,k) in cards" :key="k" @click="char(v)">
        <div class="info-box">
          <img :src="v.doctorImg" alt="">

          <div class="info">
            <div class="yi">
              <span class="name">
                {{v.doctorName}}
                <van-tag plain type="success">职称</van-tag>
              </span>
            </div>

            <div>
              <span>{{v.hospitalName}}</span> | 
              <span>{{v.departmentName}}</span>
              <span>{{v.hospitalTypeText}}</span>
            </div>

            <div>
              <p class="info">擅长：{{v.goodAt}}</p>
            </div>
          </div>
        </div>
        <p class="date">{{v.createTime}}</p>
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
      ],
      option2: [],
      option3: [],
      speedProgress: 0
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
  & > .cards{
    & > .card{
      margin: 10px;
      border: 1px solid #888;
      border-radius: 10px;
      font-size: 15px;
      color: #666;

      & > .date{
        border-top: 1px solid #888;
        text-align: right;
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
