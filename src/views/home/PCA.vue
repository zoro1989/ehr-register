<template>
  <div>
    <cube-button @click="showPicker">{{selectedText}}</cube-button>
  </div>
</template>
<script>
import { api } from '@/config'
import fetch from 'utils/fetch'
export default {
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      selected: [],
      picker: null
    }
  },
  computed: {
    selectedText() {
      return this.selected.length ? this.selected.join(' ') : '选择地址'
    }
  },
  mounted() {
    fetch.call(this, 'get', api.dictRegion, {}).then((res) => {
      let cityData = res.data
      cityData.forEach(province => {
        province.text = province.label
        province.children && province.children.forEach(city => {
          city.text = city.label
          city.children && city.children.forEach((area) => {
            area.text = area.label
          })
        })
      })
      this.picker = this.$createCascadePicker({
        title: '地点选择',
        data: cityData,
        selectedIndex: this.value,
        onSelect: this.selectHandler
      })
    }).catch(() => {
    })
  },
  methods: {
    showPicker() {
      this.picker.show()
    },
    selectHandler(selectedVal, selectedIndex, selectedTxt) {
      this.selected = selectedTxt
      this.$emit('input', selectedVal)
    }
  }
}
</script>
