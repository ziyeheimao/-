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
      <van-field center clearable label="回复">
        <van-icon class="icon" name="smile-o" slot="button"/>
        <van-icon class="icon" name="add-o" slot="button"/>
      </van-field>
    </div>
  </section>

</template>

<script>
export default {
  components: {},
  data () {
    return {
      chars: [
        {date: '2020-01-01 16:00:23', info: '得了灰指甲~一个传染力俩~问我咋么办!? 马上用亮甲 O(∩_∩)O得了灰指甲~一个传染力俩~问我咋么办!? 马上用亮甲 O(∩_∩)O得了灰指甲~一个传染力俩~问我咋么办!? 马上用亮甲 O(∩_∩)O得了灰指甲~一个传染力俩~问我咋么办!? 马上用亮甲 O(∩_∩)O', type: 0, imgUrl: 'http://img.ea3w.com/393/392461.jpg'},
        {date: '2020-01-01 16:00:23', info: '得了灰指甲~一个传染力俩~问我咋么办!? 马上用亮甲 O(∩_∩)O', type: 1, imgUrl: 'https://n.sinaimg.cn/sinacn17/530/w700h630/20181107/703a-hnprhzv9128002.jpg'},
        {date: '2020-01-01 16:00:23', info: '得了灰指甲~一个传染力俩~问我咋么办!? 马上用亮甲 O(∩_∩)O', type: 0, imgUrl: 'http://img.ea3w.com/393/392461.jpg'},
        {date: '2020-01-01 16:00:23', info: '得了灰指甲~一个传染力俩~问我咋么办!? 马上用亮甲 O(∩_∩)O', type: 1, imgUrl: 'https://n.sinaimg.cn/sinacn17/530/w700h630/20181107/703a-hnprhzv9128002.jpg'},
        {date: '2020-01-01 16:00:23', info: '得了灰指甲~一个传染力俩~问我咋么办!? 马上用亮甲 O(∩_∩)O', type: 1, imgUrl: 'https://n.sinaimg.cn/sinacn17/530/w700h630/20181107/703a-hnprhzv9128002.jpg'},
        {date: '2020-01-01 16:00:23', info: '得了灰指甲~一个传染力俩~问我咋么办!? 马上用亮甲 O(∩_∩)O', type: 1, imgUrl: 'https://n.sinaimg.cn/sinacn17/530/w700h630/20181107/703a-hnprhzv9128002.jpg'},
        {date: '2020-01-01 16:00:23', info: '得了灰指甲~一个传染力俩~问我咋么办!? 马上用亮甲 O(∩_∩)O', type: 1, imgUrl: 'https://n.sinaimg.cn/sinacn17/530/w700h630/20181107/703a-hnprhzv9128002.jpg'},
      ],
      form: {
        doctorId: '',
        limit: 10,
        page: 1
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
    }
  },
  created () {
    this.form.doctorId = this.$route.query.id
    this.init()
  },
  mounted () {},
  watch: {}
}
</script>

<style lang='scss' scoped>
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
}
</style>
