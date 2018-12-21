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
                <template v-if="group.groupFlag === 1">
                  <div v-for="(item, index) in model[group.fieldName]" :key="index">
                    <div class="group-title"><span class="left">{{group.fieldLabel}}({{index + 1}})</span><span class="right" @click="deleteGroup(group.fieldName, index)" v-if="group.canClose === 0"><i class="cubeic-delete"></i></span></div>
                    <div v-for="child in group.children" :key="child.id">
                      <cube-form-item :field="{label: child.fieldLabel}">
                        <cube-input :placeholder="'请输入' + child.fieldLabel" v-model="item[child.fieldName]" v-if="child.fieldType === 1 || child.fieldType === 2"></cube-input>
                        <date-picker v-model="item[child.fieldName]" v-if="child.fieldType === 3 || child.fieldType === 4"></date-picker>
                        <cube-select
                          v-if="child.fieldType === 5"
                          v-model="item[child.fieldName]"
                          :options="filterList(child.dictList)">
                        </cube-select>
                        <cube-textarea v-if="child.fieldType === 7" :placeholder="'请输入' + child.fieldLabel" v-model="item[child.fieldName]"></cube-textarea>
                        <p-c-a v-if="child.fieldType === 8" v-model="item[child.fieldPath]"></p-c-a>
                      </cube-form-item>
                    </div>
                  </div>
                  <cube-button class="add-btn" icon="cubeic-add" @click="addGroup(model[group.fieldName], group.children)">继续添加{{group.fieldLabel}}</cube-button>
                </template>
                <template v-else>
                  <div v-for="child in group.children" :key="child.id">
                    <cube-form-item :field="{label: child.fieldLabel}">
                      <cube-input :placeholder="'请输入' + child.fieldLabel" v-model="model[child.fieldName]" v-if="child.fieldType === 1 || child.fieldType === 2"></cube-input>
                      <date-picker v-model="model[child.fieldName]" v-if="child.fieldType === 3 || child.fieldType === 4"></date-picker>
                      <cube-select
                        v-if="child.fieldType === 5"
                        v-model="model[child.fieldName]"
                        :options="filterList(child.dictList)">
                      </cube-select>
                      <cube-textarea v-if="child.fieldType === 7" :placeholder="'请输入' + child.fieldLabel" v-model="model[child.fieldName]"></cube-textarea>
                      <p-c-a v-if="child.fieldType === 8" v-model="model[child.fieldPath]"></p-c-a>
                    </cube-form-item>
                  </div>
                </template>
              </div>
            </div>
          </cube-form>
        </div>
        <cube-button @click="saveForm">保存</cube-button>
      </div>
    </div>
  </div>
</template>
<script>
import DatePicker from './date-picker'
import PCA from './PCA.vue'
import { api } from '@/config'
import fetch from 'utils/fetch'
export default {
  components: {
    DatePicker,
    PCA
  },
  data() {
    return {
      id: this.$route.params.id || '',
      corpId: this.$route.params.corpId || '',
      formGroups: [],
      model: {},
      regionList: [],
      formData: {},
      options: {
        scrollToInvalidField: true,
        layout: 'fresh' // classic fresh
      }
    }
  },
  created() {
    this.listData()
  },
  render(createElement) {
    return createElement('cube-button', {
      on: {
        click: this.showPicker
      }
    }, this.selected.length ? this.selected.join(' ') : 'placeholder')
  },
  methods: {
    listData() {
      fetch('get', api.employeeAttrGet + this.id, {}).then((res) => {
        this.formData = res.data
        let obj = JSON.parse(res.data.data)
        fetch('get', api.employeeAttrConfig + this.corpId, {}).then((res) => {
          res.data.forEach((group) => {
            if (group.groupFlag === 1) {
              obj[group.fieldName] = obj[group.fieldName] ? obj[group.fieldName] : []
              let objChild = {}
              group.children && group.children.forEach((child) => {
                objChild[child.fieldName] = objChild[child.fieldName] ? objChild[child.fieldName] : ''
              })
              obj[group.fieldName].push(objChild)
            } else {
              group.children && group.children.forEach((child) => {
                obj[child.fieldName] = obj[child.fieldName] ? obj[child.fieldName] : ''
              })
            }
          })
          this.model = obj
          console.log(this.model)
          this.formGroups = res.data
        }).catch(() => {
        })
      }).catch(() => {
      })
    },
    filterList(dictList) {
      if (dictList && dictList.length > 0) {
        return dictList.map((item) => {
          let obj = {value: item.value, text: item.label}
          return obj
        })
      } else {
        return []
      }
    },
    validateHandler(result) {
      this.validity = result.validity
      this.valid = result.valid
      console.log('validity', result.validity, result.valid, result.dirty, result.firstInvalidFieldIndex)
    },
    submitHandler(e) {
      console.log('submit')
    },
    saveForm() {
      console.log(this.model)
      this.formData.data = JSON.stringify(this.model)
      fetch('post', api.employeeAttrSave, this.formData).then((res) => {
        this.$router.push('/success/index')
      }).catch(() => {
      })
    },
    addGroup(group, children) {
      let copyGroup = {}
      for (let key in children) {
        copyGroup[key] = ''
      }
      group.push(copyGroup)
    },
    deleteGroup(groupName, index) {
      this.model[groupName].splice(index, 1)
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
          &:nth-of-type(4n+1) .text-head
            border-left: .16rem solid #7a8afe
            background: #f8f9fe
          &:nth-of-type(4n+2) .text-head
            border-left: .16rem solid #43bbff
            background: #f6fbfe
          &:nth-of-type(4n+3) .text-head
            border-left: .16rem solid #23cfc6;
            background: #f6fefb;
          &:nth-of-type(4n+4) .text-head
            border-left: .16rem solid #ff8c00;
            background: #fffcf3;
          .text-head
            width: 100%
            padding: .85rem 1.1rem
            font-size: 1.1rem
          .group-title
            display: flex
            height: 35px
            line-height: 35px
            .left
              flex: 1
            .right
              flex: 0 0 30px
              color: #ff8c00
              font-size: 20px
          .add-btn
            padding-left: 0
            padding-right: 0
            text-align: center
            color: #ff8c00
            background: none
            border: none

</style>
