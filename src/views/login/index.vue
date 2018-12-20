<template>
  <div class="login-container">
    <div ref="loginForm" class="login-form">
      <h3 class="title">入职登记表</h3>
      <div class="el-form-item">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <cube-input class="el-input" placeholder="请输入姓名" v-model="loginForm.empName"></cube-input>
      </div>
      <div class="el-form-item">
        <span class="svg-container">
          <svg-icon icon-class="mobile" />
        </span>
        <cube-input class="el-input" placeholder="请输入手机号" type="number" v-model="loginForm.mobile" @keyup.enter.native="handleLogin"></cube-input>
      </div>
      <div>
        <cube-button type="primary" style="width:100%;" @click.native.prevent="handleLogin">登录</cube-button>
      </div>
    </div>
  </div>
</template>

<script>
import { validateTel } from '@/utils/validate'
import { api } from '@/config'
import fetch from 'utils/fetch'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        empName: '王五',
        mobile: '13364549821'
      },
      loading: false,
      redirect: undefined,
      corpId: this.$route.query.corpId || ''
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    handleLogin() {
      if (!validateTel(this.loginForm.mobile)) {
        const toast = this.$createToast({
          time: 1000,
          txt: '请输入正确的手机号'
        })
        toast.show()
        return
      }
      this.loginForm.corpId = this.corpId
      fetch('get', api.employeeAttrQuery, this.loginForm).then((res) => {
        const toast = this.$createToast({
          time: 1000,
          txt: '登录成功'
        })
        toast.show()
        this.$router.push(`/home/index/${res.data}/${this.corpId}`)
      }).catch(() => {
      })
    }
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import "~common/stylus/variable.styl"
  /* reset element-ui css */
  .login-container
    position: fixed
    height: 100%
    width: 100%
    background-color: $color-background-d
    .login-form
      position: absolute
      left: 0
      right: 0
      max-width: 100%
      padding: 35px 35px 15px 35px
      margin: 120px auto
      .title
        font-size: 26px
        color: #eee
        margin: 0px auto 40px auto
        text-align: center
        font-weight: bold
      .el-form-item
        border: 1px solid rgba(255, 255, 255, 0.1)
        background: rgba(0, 0, 0, 0.1)
        border-radius: 5px
        color: #454545
        position: relative
        line-height: 36px
        font-size: 14px
        margin-bottom: 22px;
        .cube-input::after
          content: none
        .el-input
          position: relative
          display: inline-block
          vertical-align: middle
          height: 47px
          background: transparent
          width: 85%
          .cube-input-field
            background-image: none
          input
            background: transparent
            border: 0px
            -webkit-appearance: none
            border-radius: 0px
            padding: 12px 5px 12px 15px
            color: #eee
            height: 47px
            &:-webkit-autofill
              -webkit-box-shadow: 0 0 0px 1000px $color-background-d inset !important
              -webkit-text-fill-color: #fff !important
        .svg-container
          padding: 6px 5px 6px 15px
          color: $color-sub-text
          width: 30px
          display: inline-block
        .show-pwd
          position: absolute
          right: 10px
          top: 7px
          font-size: 16px
          color: $color-sub-text
          cursor: pointer
          user-select: none
</style>
