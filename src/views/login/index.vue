<template>
  <div class="login-container">
    <div ref="loginForm" class="login-form">
      <h3 class="title">入职登记表</h3>
      <div class="el-form-item">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <mt-field class="el-input" placeholder="请输入用户名" v-model="loginForm.username"></mt-field>
      </div>
      <div class="el-form-item">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <mt-field class="el-input" placeholder="请输入密码" :type="pwdType" v-model="loginForm.password" @keyup.enter.native="handleLogin"></mt-field>
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </div>
      <div>
        <mt-button type="primary" style="width:100%;" @click.native.prevent="handleLogin">登录</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import { setToken } from '@/common/js/cache'
import { Toast, Indicator } from 'mint-ui'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined
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
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      if (!isvalidUsername(this.loginForm.username)) {
        Toast('请输入正确的用户名')
        return
      }
      if (this.loginForm.password.length < 5) {
        Toast('密码不能小于5位')
        return
      }
      Indicator.open()
      setTimeout(() => {
        Toast('登录成功')
        setToken('123')
        this.$router.push({ path: this.redirect || '/' })
        Indicator.close()
      }, 2000)
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
        .el-input
          position: relative
          display: inline-block
          vertical-align: middle
          height: 47px
          background: transparent
          width: 85%
          .mint-cell-wrapper
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
