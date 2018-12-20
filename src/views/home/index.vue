<template>
  <div class="main-container">
    <div class="app-main">
      <div class="company">
        <p>阿萨德！请如实填写以下信息，以便HR为您办理入职手续。</p>
        <div class="join_table">
          <cube-form :options="options" :model="model" @validate="validateHandler" @submit="submitHandler">
            <div class="info-wrap" v-if="formGroups && formGroups.length > 0" v-for="group in formGroups" :key="group.id">
              <div class="text-head">{{group.fieldLabel}}</div>
              <div class="form-groups" v-if="group.children">
                <cube-form-item :field="{type: 'input', modelKey: child.fieldName, label: child.fieldLabel, props: { placeholder: '请输入'} }" :key="child.id" v-for="child in group.children" >
                </cube-form-item>
              </div>
            </div>
          </cube-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { api } from '@/config'
import fetch from 'utils/fetch'
let typeMap = {
  1: 'input',
  2: '',
  3: '',
  4: '',
  5: 'select',
  6: '',
}
export default {
  data() {
    return {
      id: this.$route.params.id || '',
      corpId: this.$route.params.corpId || '',
      formGroups: [],
      model: {},
      options: {
        scrollToInvalidField: true,
        layout: 'fresh' // classic fresh
      }
    }
  },
  created() {
    this.listData()
  },
  methods: {
    listData() {
      fetch('get', api.employeeAttrConfig + this.corpId, {}).then((res) => {
        this.formGroups = res.data
      }).catch(() => {
      })
      fetch('get', api.employeeAttrGet + this.id, {}).then((res) => {
      }).catch(() => {
      })
    },
    validateHandler(result) {
      this.validity = result.validity
      this.valid = result.valid
      console.log('validity', result.validity, result.valid, result.dirty, result.firstInvalidFieldIndex)
    },
    submitHandler(e) {
      console.log('submit')
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
            border-left: .16rem solid #7a8afe
            background: #f8f9fe
          .form-groups
            .form-item
              width: 100%

</style>
