<template>
  <section class="ctn">
    <van-nav-bar title="医生详情" left-arrow @click-left="quit"/>

    <div class="info">
      <div class="introduction">
        <img :src="info.headImg" alt="">

        <div class="info">
          <div>
            <span class="name">{{info.name}}</span>
            <span>{{info.doctorTypeText}}</span>
          </div>

          <div class="hospitalName">
            <span>{{info.hospitalName}} | {{info.departmentName}}</span>
            <span>{{info.hospitalTypeText}}</span>
          </div>
        </div>
      </div>

      <div class="detail">
        <div class="box">
          <h4>擅长主治</h4>
          <p>{{info.goodAt}}</p>
        </div>

        <div class="box">
          <h4>个人简介</h4>
          <p>{{info.intro}}</p>
        </div>

        <div class="box">
          <h4>
            出诊医院
            <van-tag round plain type="warning">{{info.hospitalTypeText}}</van-tag>
          </h4>
          <p>
            {{info.hospitalName}}
            <br/>
            {{info.address}}
            <br/>
            {{info.departmentName}}
          </p>
        </div>

        <div class="box">
          <h4>服务内容</h4>
          <p>
            {{'在线咨询'}}<van-icon name="photo-o" />
            <br />
            {{'24小时咨询时间，10轮图文追问次数；不满意可申诉退款'}}
          </p>
        </div>
      </div>
    </div>

    <div class="btn">
      <div class="box box1">
        <van-button size="normal" @click="click(0)">
          <van-icon name="comment-o" /> 咨询记录
        </van-button>

        <van-button size="normal" @click="click(1, info.isFollow)">
          <van-icon name="star-o" />{{info.isFollow === 0 ? '关注' : '取消关注'}}
        </van-button>
      </div>
      <div class="box box2">
        <van-button size="normal" type="info" @click="click(2)">在线咨询</van-button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      info: {
        name: '张医生',
        count: 66,
        duration: 3,
        price: 0,
        goodAt: '新型肺炎，肺癌，乳腺癌，肺叶片玻璃体混浊新型肺炎，肺癌，乳腺癌，肺叶片玻璃体混浊新型肺炎，肺癌，乳腺癌，肺叶片玻璃体混浊',
        intro: '1999年毕业于xxx大学，肿瘤学博士，上海第一人民医院重量可注释意识，2016年至2017年在美国滨州州立大学作为访问学者访学一年，以第一作者发表SCI论文20鱼片，2019获得上海市浦江人才计划，主持股价自认科学急金1想，参与国际化年自然科学基金3项',
        address: '上海市虹口区海宁路100号（北部），松江区新松江路650好（南部）',
        date: '2020-01-01',
        doctorTypeText: '主任医师',
        state: '关 注',
        hospitalName: '上海市第一人民医院',
        departmentName: '内科',
        hospitalTypeText: '三甲级',
        id: 1,
        headImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1580753527077&di=3ac1dd5a776ccbd584e60fb97da268bf&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01dee15541f518000001714a0ac456.jpg%40900w_1l_2o_100sh.jpg'
      },

      option2: [], // 医院等级
      option3: [], // 职称等级

      speedProgress: 0 // 字典初始化进度
    }
  },
  computed: {},
  methods: {
    quit () {
      this.$router.go(-1)
    },
    click (type, state) {
      switch (type) {
        case 0:
          this.$router.push('/medical/home/advisoryRecord') // 咨询记录
          break
        case 1:
          if (state === 0) { // 关注
            var req = {doctorId: Number(this.info.id)}
            this.$api.medical.doctorFollow(this.info.id, req).then(res => {
              if (res.code === 0) this.init2(this.$route.query.id) // 刷新页面数据
            })
          } else { // 取关
            var req = {doctorId: Number(this.info.id)}
            this.$api.medical.doctorFollow(this.info.id, req).then(res => {
              if (res.code === 0) this.init2(this.$route.query.id) // 刷新页面数据
            })
          }
          break
        case 2:
          this.$router.push({path: '/medical/home/condition', query: {id: this.info.id}}) // 在线咨询
          break
      }
    },

    // 通过数组对象中的某个对象属性值,获取该对象其他属性值 [{name: 'x', val: 1}, {name: 'z', val: 2}]  -> 通过1获得x
    findAttrVal (data, arr, attrName, targetAttrName) {
      for (let i of arr) {
        if (i[attrName] === data) {
          return i[targetAttrName]
        }
      }
    },
    init1 () {
      return new Promise((resolve, reject) => {
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
              resolve()
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
              resolve()
            }
          }
        })
      })
    },
    init2 (id) { // 获取医生信息
      let req = {id}
      this.$api.medical.doctorDetail(id, req).then(res => {
        if (res.code === 0) {
          let i = this.info = res.bean
          i.doctorTypeText = this.findAttrVal(i.doctorType, this.option3, 'value', 'text') // 职称
          i.hospitalTypeText = this.findAttrVal(i.hospitalType, this.option2, 'value', 'text') // 医院类型
          i.avReplyTime = this.formatTime(i.avReplyTime) // 回复时间
        }
        console.log(res.bean)
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
    },
    asyncInit: async function () {
      await this.init1()
      this.init2(this.$route.query.id)
    }
  },
  created () {
    this.asyncInit()
  },
  mounted () {},
  watch: {}
}
</script>

<style lang='scss' scoped>
.ctn{
  &>.info{
    padding: 15px;
    &>.introduction{
      font-size: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      &>img{
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }
      &>.info{
        flex:1;
        margin-left: 10px;
        & .name{
          font-size: 20px;
        }
        &>.hospitalName{
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
        }
      }
    }
    &>.detail{
      margin-top: 15px;
      &>.box{
        &>h4{
          font-size: 13px;
          color: #555;
        }
        &>p{
          font-size: 16px;
          margin: 8px 0 30px;
          text-indent: 32px;
        }
      }
    }
  }
  &>.btn{
    border-top: 1px solid #eee;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    &>.box{
      // width: 50%;
    }
    &>.box1{
      width: 60%;
      display: flex;
      justify-content: space-between;
    }
    &>.box1>.van-button:first-child{
      flex: 1;
    }
    &>.box1>.van-button:last-child{
      flex: 1;
    }
    &>.box2{
      width: 40%;
    }
    &>.box2>.van-button{
      width: 100%;
    }
  }
}
</style>
