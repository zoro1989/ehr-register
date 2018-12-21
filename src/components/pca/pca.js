export const cascader = {
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
      selected: []
    }
  },
  render(createElement) {
    return createElement('cube-button', {
      on: {
        click: this.showPicker
      }
    }, this.selected.length ? this.selected.join(' ') : 'placeholder')
  },
  mounted() {
    this.picker = this.$createCascadePicker({
      title: 'PCA Select',
      data: cityData,
      selectedIndex: this.value,
      onSelect: this.selectHandler
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
