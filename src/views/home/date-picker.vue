<template>
  <div>
    <cube-button @click="showDatePicker">{{selectedText}}</cube-button>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  created() {
    this.selectedText = this.value ? moment(this.value).format('YYYY-MM-DD') : '请选择日期'
  },
  data() {
    return {
      selectedText: '请选择日期'
    }
  },
  watch: {
    value(newVal) {
      this.selectedText = newVal ? moment(this.value).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')
    }
  },
  methods: {
    showDatePicker() {
      if (!this.datePicker) {
        console.log(this.value)
        this.datePicker = this.$createDatePicker({
          title: '选择日期',
          min: new Date(1950, 1, 1),
          max: new Date(2050, 12, 31),
          value: this.value ? moment(this.value).toDate() : new Date(),
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        })
      }
      this.datePicker.show()
    },
    selectHandle(date, selectedVal, selectedText) {
      this.selectedText = moment(date).format('YYYY-MM-DD')
      this.$emit('input', this.selectedText)
    },
    cancelHandle() {
    }
  }
}
</script>
