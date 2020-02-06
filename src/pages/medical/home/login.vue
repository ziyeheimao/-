<template>
  <div>
    <van-nav-bar title="登 录" left-arrow @click-left="quit"/>

    <van-button type="primary" size="large" @click="login">登 录</van-button>
  </div>
</template>

<script>
import { setCookie, getCookie } from "@/config/mUtils"
export default {
  data () {
    return {}
  },
  methods: {
    quit () {
      this.$router.go(-1)
    },
    login () {
      this.$api.medical.userLogin({smsVerifyCode: '4561', tel: 13011118888}).then(res => {
        console.log(res)
        if (res.code === 0) {
          setCookie("token", res.bean.token)
          console.log(getCookie('token'))
        }
      })
    }
  },
  created () {}
}
</script>
