<template>
  <section class="ctn">
    <van-nav-bar title="登 录" left-arrow @click-left="quit"/>

    <van-cell-group>
      <van-field v-model="form.tel" placeholder="电环" />
      <van-field v-model="form.smsVerifyCode" placeholder="验证码" />
    </van-cell-group>

    <van-button type="primary" size="large" @click="login">登 录</van-button>
  </section>
</template>

<script>
import { setCookie, getCookie } from "@/config/mUtils"
export default {
  data () {
    return {
      form: {
        tel: 15121211213,
        smsVerifyCode: '123456'
      }
    }
  },
  methods: {
    quit () {
      this.$router.go(-1)
    },
    login () {
      this.$api.medical.userLogin(this.form).then(res => {
        console.log(res)
        if (res.code === 0) {
          setCookie("token", res.bean.token)
          console.log(getCookie('token'))
          this.$router.push('/medical/home/index')
        }
      })
    }
  },
  created () {}
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>