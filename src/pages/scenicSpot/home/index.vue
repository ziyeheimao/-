<template>
  <section class='ctn' :style="'height:'+InnerSize.height+'px;'">
    <van-button @click='quit' size="small" type="info" plain class="return-btn" style="min-width:15px;">ㄑ</van-button>
    <van-swipe :autoplay="3000" style="height:190px;">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image"/>
      </van-swipe-item>
    </van-swipe>

    <!--文章-->
    <article v-show='isShgow' class="article">
      <header class="title">
        {{article.name}}

        <van-tag round type="primary"  @click="voice(article)" v-if='this.$route.query.type == 0'>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="9px" height="12px" viewBox="0 0 27.5 37.25" enable-background="new 0 0 27.5 37.25" xml:space="preserve">
            <path fill="#FFFFFF" d="M13.865,0C9.354,0,5.698,3.656,5.698,8.167v9.167h0.021c0.219,4.314,3.776,7.75,8.146,7.75 s7.928-3.436,8.146-7.75h0.021V8.167C22.032,3.656,18.376,0,13.865,0z"/>
            <line fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" x1="7.531" y1="35.604" x2="19.969" y2="35.604"/>
            <path fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" d="M1.531,16.295c0,0,0.688,12.434,12.219,12.809v6.5"/>
            <path fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" d="M25.969,16.295c0,0-0.688,12.434-12.219,12.809v6.5"/>
          </svg>
          &nbsp;
          <span>语音讲解</span>
        </van-tag>


      </header>
      <p class="location">
        <span>
          <b class="b">地址:</b>
          {{article.city + article.state + article.area + article.location}}
        </span>

        <van-tag round type="primary" @click="gps(article)">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="11px" height="11px" viewBox="0 0 35.585 35.324" enable-background="new 0 0 35.585 35.324" xml:space="preserve">
            <path fill="#FFFFFF" d="M25.21,32.806c0,0,7.463-22.499,9.283-26.985c1.818-4.487,0.814-5.515,0.814-5.515s-1.005-1.028-5.533,0.688 C25.248,2.708,2.583,9.651,2.583,9.651s-2.266,0.991-2.548,2.49c-0.282,1.499,1.209,2.489,2.97,3.04 c1.762,0.551,14.021,2.99,14.021,2.99s2.156,12.313,2.666,14.086c0.511,1.773,1.466,3.287,2.97,3.039 C24.167,35.048,25.21,32.806,25.21,32.806z"/>
          </svg>
          &nbsp;
          <span>导航</span>
        </van-tag>
      </p>
      <p class="time" v-if='this.$route.query.type == 0'>
        <span class="b">便捷消息:</span>
        <span class="b badge">{{openState}}</span> {{article.startTime + "-" + article.endTime }}</p>
      <p class="ctn" v-html="article.textIntroduce"></p>
    </article>

    <!-- 语音 -->
    <section class='voice' v-show="isShowVoice">
      <img :src='images[0] ? images[0] : "none"' />
      <h4>{{article.name}}</h4>
      <p @click='details'>详情 <van-icon :name="arrow" /></p>
      <span></span>
      <output>{{audioModule.formatCurrentTime + ' / ' + audioModule.formatDuration}}</output>
      <div class='btn' v-html="playbackStatus.icon" @click='change'></div>


      <audio id="audio" v-if="article.voiceIntroduce">
        <source :src='article.voiceIntroduce'/>
      </audio>

    </section>

    <!-- 模态窗 -->
    <section class='modal' v-show='!isShgow'>
      <article v-show='!isShgow' :style="'max-height:'+(InnerSize.height-60)+'px;' + 'height:'+(InnerSize.height-60)+'px;'">
        <van-icon name="arrow-down"  @click='details'/>
        <header class="title">{{article.name}}</header>
        <p class="ctn" v-html="article.textIntroduce"></p>
      </article>
    </section>
  </section>
</template>

<script>
import axios from "axios";
import { strToH5,getDate, formatTime } from "@/utils/index";
import Vue from 'vue';
import { Toast } from 'vant';

export default {
  components: {},
  // props: [''],
  computed: {
    InnerSize () {
      return this.$store.getters.InnerSize
    },
    openState () {
      let current = getDate().split(':')
      if (typeof this.article.startTime === 'string') {
        let start = toNum(this.article.startTime.split(':'))
        let end = toNum(this.article.endTime.split(':'))

        function toNum (arr) {
          let newArr = []
          for (let i of arr) { newArr.push(Number(i)) }
          return newArr
        }

        if (!this.article.startTime || !this.article.endTime) return ''

        if (
          current[0] < start[0] ||
          (current[0] === start[0] && current[1] < start[1])||
          current[0] > end[0] ||
          (current[0] === end[0] && current[1] > end[1])
        ) return '未开放'

        return '开放中'
      } else {
        return ''
      }
    }
  },
  data () {
    return {
      article: {
        startTime: '',
        endTime: '',
        voiceIntroduce: ''
      }, // 文章内容
      images: [],

      isShgow: true, // 模态窗
      playbackStatus: { // 播放状态ico
        icon: '',
        open: false
      },
      icon: '',
      icons: {
        play: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 80 80" enable-background="new 0 0 80 80" xml:space="preserve">
          <circle fill="#4B9AED" cx="40" cy="40" r="40"/>
          <polygon fill="#FFFFFF" points="31.031,24 31.031,56 56.969,40 "/>
        </svg>`,
        stop: `<svg version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 80 80" enable-background="new 0 0 80 80" xml:space="preserve">
          <circle fill="#4B9AED" cx="40" cy="40" r="40"/>
          <g>
            <rect x="28.995" y="26.975" fill="#FFFFFF" width="8.043" height="26.05"/>
            <rect x="42.962" y="26.975" fill="#FFFFFF" width="8.043" height="26.05"/>
          </g>
        </svg>`
      },
      arrow: 'arrow-up', // 箭头图标
      isShowVoice: false, // 是否展示语音模块

      audioModule: {
        audio: null,
        audioTimer: null,
        duration: '', // 总时长
        currentTime: '', // 播放进度
        formatDuration: '00:00', // 格式化后的时间
        formatCurrentTime: '00:00' // 格式化后的时间
      }
    }
  },
  methods: {
    // 返回
    quit () {
      this.$router.push('/common/map/index')
    },
    // 详情窗口
    details () {
      this.isShgow = !this.isShgow
      if (this.isShgow) this.arrow = 'arrow-up'
      else this.arrow = 'arrow-down'
    },
    init (query) {
      this.$api.mapController.mapDetail(query.id).then(res => {
        this.article = res.bean
        this.images = res.bean.img.split(',')
        this.article.textIntroduce = strToH5(this.article.textIntroduce)

        if (query.voice) this.voice()
      })
    },

    // 切换播放状态
    change () {
      this.audioModule.audio = document.getElementById('audio')
      if (this.playbackStatus.open) { // 暂停
        this.playbackStatus.open = false
        this.playbackStatus.icon = this.icons.play
        this.audioModule.audio.pause()
        clearInterval(this.audioTimer)
      } else { // 播放
        this.playbackStatus.open = true
        this.playbackStatus.icon = this.icons.stop

        this.audioModule.audio.play()

        this.audioModule.duration = Math.round(this.audioModule.audio.duration) // 总播放时间
        this.audioModule.currentTime = Math.round(this.audioModule.audio.currentTime) // 播放进度

        this.audioModule.formatDuration = this.formatMediaTime(this.audioModule.duration)
        this.audioModule.formatCurrentTime = this.formatMediaTime(this.audioModule.currentTime)

        this.audioTimer = setInterval(() => {
          this.audioModule.currentTime++
          this.audioModule.formatCurrentTime = this.formatMediaTime(this.audioModule.currentTime)
        }, 1000)

        this.end()
      }
    },
    // 语音讲解
    voice(article) {
      this.isShowVoice = !this.isShowVoice
      if (!this.isShowVoice) { // 关闭隐藏时暂停播放
        this.playbackStatus.open = false
        this.playbackStatus.icon = this.icons.play
        this.close()
      }
    },
    // 导航
    gps(article) {
      this.$router.push({path: "/common/map/index", query: {latitude: article.latitude, longitude: article.longitude, type: this.$route.query.type }});
    },
    // 结束监听
    end () {
      document.getElementById('audio').addEventListener('ended', () => {
        clearInterval(this.audioTimer)
        this.playbackStatus.icon = this.icons.play
      })
    },
    formatMediaTime (Num) {
      function add0(m) {return m < 10 ? '0' + m : m}
      if (isNaN(Number(Num))) {return Num}

      let min = Math.floor(Num / 60)
      let second = Num - min * 60
      min = add0(min)
      second = add0(second)
      return min + ':' + second
    },

    // 关闭音乐
    close () {
      clearInterval(this.audioTimer)
      if (!this.audioModule.audio) return
      if (!this.audioModule.audio.paused) this.audioModule.audio.pause() // 如处于播放状态时暂停播放
    },

    // 监听地址栏
    hashchange () {
      window.onhashchange = function (e) {
        this.close()
      }
    }
  },
  beforeCreate () {},
  created () {
    this.playbackStatus.icon = this.icons.play
    this.init(this.$route.query)
    this.hashchange()
      window['andioStop'] = result => {
        Toast.success('成功文案');
        this.close()
      }

  },
  beforeMount () {},
  mounted () {
    // window.addEventListener("popstate", function(e) {
    //   this.close()
    // }, false);
  },
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {
    this.close()
  },
  deactivated () {},
  watch: {},
  beforeRouteLeave (to, from, next) { // 导航离开该组件的对应路由时被调用
    console.log(to, from, next)
    this.close()
    next()
  },
}
</script>

<style lang='scss' scoped>
@import '@/style/mixin.scss';
.ctn{
  z-index: 1;
  position: relative;

  // 返回
  &>.van-button{
    z-index: 10;
    position: absolute;
    top: 27px;
    left: 16px;
  }

  // 轮播
  .van-swipe{
    background-color: #999;
    .van-swipe-item img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  // 模态窗
  &>.modal{
    color: #fff;
    position: absolute;
    top: 0;
    width: 100%;
    background-color: rgba(0,0,0,0.75);
    z-index: 10;
    & > article {
      padding: 15px;
      position: relative;
      @include scrollbar;

      & > .van-icon {
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        font-weight: bold;
        font-size: 25px;
        position: absolute;
        top: 30px;
        left: 20px;
      }
      & > .title {
        text-align: center;
        font-size: 20px;
        margin: 30px 0 40px 0;
        font-weight: bold;
      }
      & > .ctn{
        font-size: 14px;
        text-indent: 28px;
      }
    }
  }

  /* 文章 */
  & article.article{
    word-wrap: break-word;
    padding-bottom: 60px;
    margin: 15px;

    & > .title {
      font-size: 20px;
      margin: 3px 0 15px 0;
    }
    & > .location {
      margin-bottom: 5px;
      font-size: 12px;
      & > .van-tag{
        float: right;
      }
    }
    & > .time {
      font-size: 12px;
      & > .badge{
        color: #4B9AED;
        background-color: rgb(238,238,238);
        padding: 2px;
        font-size: 10px
      }
    }
    & > .ctn {
      margin-top: 20px;
      font-size: 14px;
      text-indent: 28px;
    }
    .b{
      font-weight: bold;
    }
    .van-tag{
      height:20px;
    }
  }
  
  /*语音播放*/
  &>.voice{
    z-index: 100;
    width: 100%;
    background-color: #252627ea;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 60px;
    color: #fff;
    padding: 0 12px;
    @include fj;
    align-items: center;
    &>img{
      width: 44px;
      height: 44px;
      object-fit: cover;
    }
    &>.btn{
      width: 40px;
      height: 40px;
      // background: #fff;
      // border-radius: 50%;
    }
    &>h4{
      font-size: 14px;
      max-width: 85px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &>outpu,&>p{
      font-size: 12px;
    }
  }
}
</style>
