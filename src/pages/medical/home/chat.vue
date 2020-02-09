<template>
  <section class="ctn">
    <van-nav-bar :title="info.doctorName" left-arrow @click-left="quit"/>

    <div class="history" v-show="historyBtnActivate === 0">
      <span @click="pullHistory">历史消息</span>
    </div>
    
    <div class="chats">
      <div class="chat" v-for="(v,k) in chars" :key="k">
        <p class="date">
          {{v.date}}
        </p>
        <div class="info" :class="v.type === 0 ? 'left' : 'right'">
          <!-- 头像 -->
          <img :src="v.type === 0 ? huanxin.partyUserHeadImg : huanxin.currentUserHeadImg" alt="">

          <!-- 消息 -->
          <p v-if="!v.img">{{v.info}}</p>

          <!-- 图片消息 -->
          <p v-if="v.img"><img :src="v.img" alt="" width="100%"></p>

        </div>
      </div>
    </div>

    <div class="b"></div>
    <div class="b2">
      <van-field v-model="form.text" @keyup.enter="text" label="回复">
        <!-- clearable type="textarea" rows="2" -->
        <div slot="button" class="btn">
          <van-icon class="icon" name="photo-o" @click="submit(1)"/>

          <van-button type="default" size="small" color="#4B7DC2" @click="submit(2)">发 送</van-button>
        </div>
      </van-field>

      <input type="file" id="file" style="display: none;" @change="img">
    </div>
  </section>
</template>

<script>
import timestampToCommonDate from '../../../utils/formatTime'

import Vue from 'vue';
import { Toast } from 'vant';
Vue.use(Toast);

export default {
  components: {},
  data () {
    return {
      // chars: [
      //   {
      //     date: '2020-01-01 16:00:23',
      //     // info: '得了灰指甲~一个传染力俩~问我咋么办!? 马上用亮甲 O(∩_∩)O',
      //     type: 0,
      //     imgUrl: 'http://img.ea3w.com/393/392461.jpg',
      //     img: 'http://img.ea3w.com/393/392461.jpg'
      //   },
      // ],
      info: { // 对方信息
        // id: 3225,
        // version: 1,
        // createTime: "2020-02-08 19:35:37",
        // createUserId: 13474,
        // updateTime: null,
        // updateUserId: null,
        // isDel: 0,
        // userId: 13474,
        // doctorId: 3212,
        // gender: "0",
        // age: 20,
        // diseaseDesc: "123",
        // touchPatient: "2",
        // attachment: null,
        // userName: null,
        // userImg: null,
        // doctorName: "徐有福1",
        // doctorImg: "http://jzgtraveloss.51dojoy.com/upload/20200205/88acaeb7cb9941ecb75cb2dfd448423e.jpg",
        // doctorType: "0",
        // hospitalName: "浙江大学医学院附属儿童医院",
        // hospitalType: "0",
        // departmentName: "皮肤科",
        // goodAt: "发的是范德萨范德萨范德萨发的是范德萨范德萨范德萨发的是范德萨范德萨范德萨发的是范德萨范德萨范德萨发的是范德萨范德萨范德萨发的是范德萨范德萨范德萨发的是范德萨范德萨范德萨发的是范德萨范德萨范德萨发的是范德萨范德萨范德萨发的是范德萨范德萨范德萨发的是范德萨范德萨范德萨发的是范德萨范德萨范德萨发的是范德萨范德萨范德萨发的是范德萨范德萨范德萨发的是范德萨范德萨范德萨发的是范德萨范德萨范德萨发的是范德萨范德萨范德萨发的是范德萨范德萨范德萨发的是范德萨范德萨范德萨发的是范德萨范德萨范德萨发的是范德萨范德萨范德萨发的是范德萨范德萨范德萨发的是范德萨范德萨范德萨发的是范德萨范德萨范德萨发的是范德萨范德萨范德萨发的是范德萨范德萨范德萨发的是范德萨范德萨范德萨发的是范德萨范德萨范德萨发的是范德萨范德萨范德萨发的是范德萨范德萨范德萨发的是范德萨范德萨范德萨发的是范德萨范德萨范德萨发的是范德萨范德萨范德萨发的是范德萨范德萨范德萨发的是范德萨范德萨范德萨发的是范德萨范德萨范德萨发的是范德萨范德萨范德萨发的是范德萨范德萨范德萨发的是范德萨范德萨范德萨发的是范德萨范德萨范德萨发的是范德萨范德萨范德萨",
        // doctorTypeText: "主任医师",
        // hospitalTypeText: "三甲"
      },

      form: {
        text: '',
        count: 10 // 拉取历史条数
      },
      huanxin: { // 环信
        // currentUserHeadImg // 当前 --- 用户头像
        // currentUserHxAccount // 账号
        // currentUserHxPwd // 密码
        // currentUserId // id
        // partyUserHxAccount // 对方 --- 环信账号
        // partyUserId // 对方用户id
        // partyUserHeadImg // 对方头像
      },
      historyBtnActivate: 0
    }
  },
  computed: {
    chars () {
      return this.$store.getters.ChatRecord
    }
  },
  methods: {
    quit () {
      this.$router.go(-1)
    },
    init () {
      this.info = this.$route.query
      this.form.doctorId = this.$route.query.id // route query数据
      this.historyBtnActivate = 0 // 按钮状态复位
      this.$store.commit('ChatRecord', '') // 聊天记录清空(防止切换医生看到之前聊天记录)
      this.async() // 异步串行
    },

    async: async function() {
      await this.getHX() // 获取对方环信id 相关信息
      this.login() // 登录
      // await this.pullHistory()
    },

    // 获取对方环信
    getHX () {
      return new Promise((resolve, reject) => {
        let req = {}
        if (this.info.isDoctor) { // 医生
          req.type = 1
          req.partyUserId = this.info.userId
        } else { // 用户
          req.type = 0
          req.partyUserId = this.info.doctorId
        }

        this.$api.medical.userHx(req).then(res => {
          console.log('获取环信', res)
          if (res.code === 0) {
            this.huanxin = res.bean
            console.log(res.bean)
            resolve()
          }
        })
      })
    },



    submit (type) {
      switch (type) {
        case 1:
          document.getElementById('file').click()
          break
        case 2:
          this.text()
          break
      }
    },


    // 登录
    login () {
      let options = {
        apiUrl: window.WebIM.config.apiURL,
        user: this.huanxin.currentUserHxAccount,
        pwd: this.huanxin.currentUserHxPwd,
        appKey: window.WebIM.config.appkey
      }
      window.WebIM.conn.open(options)
    },

    //拉取历史消息
    pullHistory () {
      if (this.historyBtnActivate === 1) return
      var options = {
        queue: this.huanxin.partyUserHxAccount.toLowerCase(), // 对方id 如果包含大写字母 改成小写
        isGroup: false,
        count: this.form.count,
        success: (e) => {
          console.log('拉取历史消息成功（结果未作处理', e, e.length)
          if (e.length === 0) {
            this.historyBtnActivate = 1
          }
        },
        fail: function(e){
          console.log('失败', e)
        }
      }
      window.WebIM.conn.fetchHistoryMessages(options)
      this.form.count += 10
    },

    // 登出
    logout () {
      console.log('登出', window.WebIM.conn)
      window.WebIM.conn.close()
    },

    // 获取时间戳
    getDate () {
      return new Date().toLocaleString()
    },

    // 文字信息
    text () {
      var id = window.WebIM.conn.getUniqueId() // 生成本地消息id
      var msg = new WebIM.message('txt', id) // 创建文本消息
      let date = this.getDate()
      msg.set({
        msg: this.form.text, // 消息内容
        to: this.huanxin.partyUserHxAccount, // 接收消息对象（用户id）
        roomType: false,
        ext: { 'time': date }, // 接收消息对象
        success: (id, serverMsgId) => { // 对成功的相关定义，sdk会将消息id登记到日志进行备份处理
          console.log('发送成功', '对方头像',this.huanxin.partyUserHeadImg)
          console.log('我的头像', this.huanxin.currentUserHeadImg)
          this.$store.commit('ChatRecord',{
            date: date,
            info: this.form.text,
            type: 1
          })
          this.form.text = ''
        },
        fail: function (e) { // 对失败的相关定义，sdk会将消息id登记到日志进行备份处理
          console.log('发送失败')
        }
      })

      window.WebIM.conn.send(msg.body)
    },

    // 图片
    img () {
      let input = document.getElementById('file').files[0] // 选择的图片

      let arr = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp']
      if (!arr.includes(input.type)) {
        Toast('只能使用 jpg、png、gif和bmp格式图片')
        return false
      }
      var blob = new Blob([input], {type: input.type})
      var url = window.URL.createObjectURL(blob)
      var id = window.WebIM.conn.getUniqueId() // 生成本地消息id
      let date = this.getDate()
      var msg = new WebIM.message('img', id) // 创建图片消息
      msg.set({
        apiUrl: window.WebIM.config.apiURL,
        file: {data: blob, url: url},
        to: this.huanxin.partyUserHxAccount, // 接收消息对象
        roomType: false,
        ext: { 'time': date }, // 接收消息对象
        onFileUploadError: function (error) {
          console.log('错误', error)
        },
        onFileUploadComplete: function (data) {
          console.log('完成')
        },
        success: (id) => {
          console.log('成功')
          this.$store.commit('ChatRecord',{
            date: date,
            type: 1,
            img: url,
          })
        }
      })
      window.WebIM.conn.send(msg.body)
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
  &>.history{
    padding: 15px;
    text-align: center;
    &>span{
      padding: 5px 30px;
      background-color: #bbb;
      border-radius: 50px;
      color: #fff;
    }
  }
  
  &>.chats{
    position: relative;
    z-index: 1;
    &>.chat{
      padding: 5px 10px;
      &>.date{
        padding: 10px 0 5px;
        text-align: center;
        font-size: 15px;
        color: #888;
      }
      &>.info{
        display: flex;
        justify-content: space-between;
        font-size: 15px;
        &>img{
          width: 60px;
          height: 60px;
          border-radius: 50%;
        }
        &>p{
          flex: 1;
          margin: 0 60px 0 5px;
          padding: 10px;
          border-radius: 5px;
          background-color: #fff;
        }
      }
      &>.info.right{
        flex-direction: row-reverse;
        p{
          margin: 0 5px 0 60px;
        }
      }
    }
  }
  &>.b{
    height: 100px;
  }
}

.b2{
  height: 90px;
  position: absolute;
  bottom: 0;
  z-index: 2;
  width: 100%;
  background-color: #eee;

  .van-field{
    background-color: #fff;
    position: relative;
    top: 10px;
  }
  .icon{
    font-size: 30px;
  }

  & .btn{
    display: flex;
    align-items: center;
    &>.van-button{
      margin-left: 10px;
    }
  }
}

</style>
