<template>
  <div class="main-container">
    <mt-header fixed title="入职登记表">
    </mt-header>
    <div class="app-main">
      <div class="company">
        <p>阿萨德！请如实填写以下信息，以便HR为您办理入职手续。</p>
        <div class="join_table">
          <div class="info-wrap">
            <div class="text-head">基本信息</div>
            <div class="form-groups">
              <mt-field label="用户名" placeholder="请输入用户名"></mt-field>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { api } from '@/config'
import fetch from 'utils/fetch'
export default {
  data() {
    return {
    }
  },
  created() {
    this.listData()
  },
  methods: {
    listData() {
      fetch('post', api.employeeAttrConfig, {}).then((res) => {
      }).catch(() => {
      })
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .main-container
    height: 100%
    .company
      font-size: 1.1rem
      color: #a0a0a0
      .join_table
        position: relative
        overflow: hidden
        margin: 1.1rem 0
        .info-wrap
          margin: 0 0 .8rem
          background: #fff
          .text-head
            width: 100%
            padding: .85rem 1.1rem
            font-size: 1.1rem
          &:nth-of-type(4n+1)
            .text-head
              border-left: .16rem solid #7a8afe
              background: #f8f9fe
</style>
