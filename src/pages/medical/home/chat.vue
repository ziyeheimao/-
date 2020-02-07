<template>
  <section class="ctn">
    <van-nav-bar title="xx医生" left-arrow @click-left="quit"/>
    <div class="chats">
      <div class="chat" v-for="(v,k) in chars" :key="k">
        <p class="date">
          {{v.date}}
        </p>
        <div class="info" :class="v.type === 0 ? 'left' : 'right'">
          <img :src="v.imgUrl" alt="">
          <p>{{v.info}}</p>
        </div>
      </div>
    </div>

    <div class="b"></div>
    <div class="b2">
      <van-field v-model="form.message" label="回复">

        <!-- clearable type="textarea" rows="2" -->

        <div slot="button" class="btn">
          <!-- <van-icon class="icon" name="smile-o" slot="button"/> -->
          <!-- <van-icon class="icon" name="add-o" slot="button"/> -->
          <van-icon class="icon" name="photo-o" @click="submit(1)"/>

          <van-button type="default" size="small" color="#4B7DC2" @click="submit(2)">发 送</van-button>
        </div>
      </van-field>

      <input type="file" id="file" style="display: none;" @change="beforeUpdata">
    </div>
  </section>

</template>

<script>
let config = require('../../../../static/sdk/WebIMConfig')
config = config.default.config

import Vue from 'vue';
import { Toast } from 'vant';
Vue.use(Toast);

export default {
  components: {},
  data () {
    return {
      chars: [
        {date: '2020-01-01 16:00:23', info: '得了灰指甲~一个传染力俩~问我咋么办!? 马上用亮甲 O(∩_∩)O  得了灰指甲~一个传染力俩~问我咋么办!? 马上用亮甲 O(∩_∩)O得了灰指甲~一个传染力俩~问我咋么办!? 马上用亮甲 O(∩_∩)O得了灰指甲~一个传染力俩~问我咋么办!? 马上用亮甲 O(∩_∩)O', type: 0, imgUrl: 'http://img.ea3w.com/393/392461.jpg'},
        {date: '2020-01-01 16:00:23', info: '得了灰指甲~一个传染力俩~问我咋么办!? 马上用亮甲 O(∩_∩)O', type: 1, imgUrl: 'https://n.sinaimg.cn/sinacn17/530/w700h630/20181107/703a-hnprhzv9128002.jpg'},
        {date: '2020-01-01 16:00:23', info: '得了灰指甲~一个传染力俩~问我咋么办!? 马上用亮甲 O(∩_∩)O', type: 0, imgUrl: 'http://img.ea3w.com/393/392461.jpg'},
        {date: '2020-01-01 16:00:23', info: '得了灰指甲~一个传染力俩~问我咋么办!? 马上用亮甲 O(∩_∩)O', type: 1, imgUrl: 'https://n.sinaimg.cn/sinacn17/530/w700h630/20181107/703a-hnprhzv9128002.jpg'},
        {date: '2020-01-01 16:00:23', info: '得了灰指甲~一个传染力俩~问我咋么办!? 马上用亮甲 O(∩_∩)O', type: 1, imgUrl: 'https://n.sinaimg.cn/sinacn17/530/w700h630/20181107/703a-hnprhzv9128002.jpg'},
        {date: '2020-01-01 16:00:23', info: '得了灰指甲~一个传染力俩~问我咋么办!? 马上用亮甲 O(∩_∩)O', type: 1, imgUrl: 'https://n.sinaimg.cn/sinacn17/530/w700h630/20181107/703a-hnprhzv9128002.jpg'},
        {date: '2020-01-01 16:00:23', info: '得了灰指甲~一个传染力俩~问我咋么办!? 马上用亮甲 O(∩_∩)O', type: 1, imgUrl: 'https://n.sinaimg.cn/sinacn17/530/w700h630/20181107/703a-hnprhzv9128002.jpg'},
      ],
      form: {
        message: '',
        file: '',

        doctorId: '', //
        limit: 10, //
        page: 1 //
      }
    }
  },
  computed: {},
  methods: {
    quit () {
      this.$router.go(-1)
    },
    init () {
      this.$api.medical.inquiryRecordUserDoctor(this.form.doctorId, this.form).then(res => {
        console.log(res)
      })
    },

    init2 () {
      var conn = {};
      console.log(1111, WebIM, window.WebIM);
      WebIM.config = config;

      // 初始化
      conn = WebIM.conn = new WebIM.default.connection({
        appKey: WebIM.config.appkey,
        isHttpDNS: WebIM.config.isHttpDNS,
        isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
        host: WebIM.config.Host,
        https: WebIM.config.https,
        url: WebIM.config.xmppURL,
        apiUrl: WebIM.config.apiURL,
        isAutoLogin: false,
        heartBeatWait: WebIM.config.heartBeatWait,
        autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
        autoReconnectInterval: WebIM.config.autoReconnectInterval,
        isStropheLog: WebIM.config.isStropheLog,
        delivery: WebIM.config.delivery
      })


      // 监听各种功能回调
      conn.listen({
        onOpened: function (message) {          //连接成功回调
          var myDate = new Date().toLocaleString();
          console.log("%c [opened] 连接已成功建立", "color: green");
          console.log(myDate);
          // rek();
          // alert(myDate + "登陆成功")
        },
        onClosed: function (message) { // 连接关闭回调
          console.log("onclose:" + message);
          console.log(error);
        },
        onTextMessage: function (message) { // 收到文本消息
          console.log('onTextMessage: ', message);
          if (message.ext.conferenceId != undefined) {
            var truthBeTold = window.confirm((message.from + "邀请您加入会议"));
            if (truthBeTold) {
              emedia.mgr.joinConference(message.ext.conferenceId, message.ext.password, "进入会议").then(function () {
                console.log("********加入会议成功*******")
              }).catch(function (error) {
                console.log("加入会议失败")
              })
            }
          }
        },

        onEmojiMessage: function (message) { // 收到表情消息
          console.log('onEmojiMessage: ', message);
        },
        onPictureMessage: function (message) { // 收到图片消息
          console.log('onPicMessage: ', message);
        },
        onCmdMessage: function (message) { // 收到命令消息
          console.log('onCmdMessage: ', message);
        },
        onAudioMessage: function (message) { // 收到音频消息
          console.log('onAudioMessage: ', message);
        },
        onLocationMessage: function (message) { // 收到位置消息
          console.log('onLocMessage: ', message);
        },
        onFileMessage: function (message) { // 收到文件消息
          console.log('onFileMessage: ', message);
        },
        recallMessage: function (message) { // 消息撤回
          console.log('recallMessage', message);
        },
        onVideoMessage: function (message) { // 收到视频消息
          console.log('onVideoMessage: ', message);
          var node = document.getElementById('getVideo');
          var option = {
            url: message.url,
            headers: {
              'Accept': 'audio/mp4'
            },
            onFileDownloadComplete: function (response) {
              var objectURL = WebIM.utils.parseDownloadResponse.call(conn, response);
              node.src = objectURL;
            },
            onFileDownloadError: function () {
              console.log('File down load error.')
            }
          };
          WebIM.utils.download.call(conn, option);
        },
        onPresence: function (message) { // 处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
          var myDate = new Date().toLocaleString();
          console.log('onPresence: ', myDate + JSON.stringify(message));
          switch (message.type) {
            case 'subscribe': // 对方请求添加好友
              var truthBeTold = window.confirm((message.from + "申请添加您为好友:"));
              if (truthBeTold) {
                // 同意对方添加好友
                conn.subscribed({
                  to: message.from,
                  message: "[resp:true]"
                });
                console.log("同意添加好友");
              } else {
                // 拒绝对方添加好友
                conn.unsubscribed({
                  to: message.from,
                  message: "rejectAddFriend" // 拒绝添加好友回复信息
                });
                console.log("拒绝添加好友");
              }
              break;
            case 'subscribed': // 对方同意添加好友，已方同意添加好友
              break;
            case 'unsubscribe': // 对方删除好友
              break;
            case 'unsubscribed': // 被拒绝添加好友，或被对方删除好友成功
              break;
            case 'memberJoinPublicGroupSuccess': // 成功加入聊天室
              console.log('join chat room success' + myDate);
              console.log(new Date().toLocaleString());
              break;
            case 'joinChatRoomFaild': // 加入聊天室失败
              console.log('join chat room faild');
              break;
            case 'joinPublicGroupSuccess': // 意义待查
              console.log('join public group success', message.from);
              break;
            case 'createGroupACK':
              conn.createGroupAsync({
                from: message.from,
                success: function (option) {
                  console.log('Create Group Succeed');
                }
              });
              break;
          }
        },
        onRoster: function (message) { //处理好友申请
          console.log("onRoster", message);
        },
        onInviteMessage: function (message) { //处理群组邀请
          console.log('Invite');
        },
        onOnline: function () { //本机网络连接成功
          console.log("onOnline");
        },
        onOffline: function () { //本机网络掉线
          console.log('offline');
        },
        onError: function (message) { // 失败回调
          console.log('onError: ', message);
        },
        onBlacklistUpdate: function (list) { // 黑名单变动
          // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
          console.log(list);
        },
        onReceivedMessage: function (message) { // 收到消息送达服务器回执
          console.log('onReceivedMessage: ', message);
        },
        onDeliveredMessage: function (message) { // 收到消息送达客户端回执
          console.log('onDeliveredMessage：', message);
        },
        onReadMessage: function (message) { // 收到消息已读回执
          console.log('onReadMessage: ', message);
        },
        onCreateGroup: function (message) { // 创建群组成功回执（需调用createGroupNew）
          console.log('onCreateGroup: ', message);
        },
        onMutedMessage: function (message) { // 如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
          console.log('onMutedMessage: ', message);
        }
      });
    },

    submit (type) {
      switch (type) {
        case 1:
          // console.log('表情', this.form.message)
          document.getElementById('file').click()
          break
        case 2:
          console.log('消息', this.form.message)
          break
      }
    },
    beforeUpdata () {
      let file = document.getElementById('file').files[0]

      let arr = ['image/jpeg', 'image/png']
      if (!arr.includes(file.type)) {
        Toast('请上传 jpg或png 格式图片');
        return
      }
      console.log(file)
    }
  },
  created () {
    this.form.doctorId = this.$route.query.id
    this.init()
    // this.init2()
    console.log(WebIM, 123456, config) // WebIM websdk
  },
  mounted () {},
  watch: {}
}
</script>

<style lang='scss' scoped>
@import './index.scss';

.ctn{
  &>.chats{
    position: relative;
    z-index: 1;
    background-color: #eee;
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
    background-color: #eee;
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
