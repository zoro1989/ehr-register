<template>
  <div class="success">
    <img class="img-success" src="data:image/png;base64,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" >
    <p class="qqGt">登记表提交成功！</p>
    <div>HR正在为您火速办理入职~</div>
    <div>
      <a href="javascript:;" class="link" @click="goEdit">修改入职登记表</a>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    goEdit() {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped lang="stylus">
  .success
    text-align: center
    padding: 2.14rem 0;
    line-height: 2.5
    .img-success
      width: 5.7rem
      display: block
      margin: 0 auto
    .qqGt
      font-size: 20px
      color: #1c2438
      margin-top: 18px
      margin-bottom: 4px
    .link
      color: #0bb27a;
</style>
