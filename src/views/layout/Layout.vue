<template>
  <div class="app-wrapper">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view :key="key"/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      popupVisible: false
    }
  },
  computed: {
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import "~common/stylus/mixin.styl"
  .app-wrapper
    clearfix()
    position: relative
    height: 100%
    width: 100%
  .drawer-bg
    background: #000
    opacity: 0.3
    width: 100%
    top: 0
    height: 100%
    position: absolute
    z-index: 999
</style>
