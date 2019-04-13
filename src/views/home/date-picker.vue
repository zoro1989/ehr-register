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
  data() {
    return {
      selectedText: '请选择日期'
    }
  },
  methods: {
    showDatePicker() {
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: '选择日期',
          min: new Date(1950, 1, 1),
          max: new Date(2050, 12, 31),
          value: this.value ? moment(this.value) : new Date(),
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
